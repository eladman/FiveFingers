// HubSpot Forms Submission API — a second, non-blocking destination for every
// contact form on the site.
//
// The forms' primary path is unchanged: they POST to the Make.com webhook, which
// writes `contact_submissions` in Supabase and drives the staff dashboard. This
// module runs alongside it so the same lead also appears in HubSpot as a Contact
// Record with a form-submission entry.
//
// The tracking script in index.html is the other half: it sets the `hubspotutk`
// cookie that we forward as `context.hutk`, which is what ties a submission to a
// real visitor session (without it HubSpot shows "No cookie was found for this
// submission" on the record).
//
// Like src/lib/analytics.js: no-ops when unconfigured and never throws into the
// page. A HubSpot outage or a renamed property must never break a live form.

import { HUBSPOT_TEAM_IDS } from '../data/hubspotTeams'

// Public identifiers, not secrets — the portal id is already visible in the
// tracking script URL and the form guid is visible in any HubSpot embed. Kept in
// code rather than env vars so a missing Vercel variable can't silently switch
// HubSpot off in production.
const PORTAL_ID = '26835159'
const FORM_GUID = '0c2a7c8c-df30-47cd-b6d7-212cd642cda7'

// Internal name of the "5F: Subject" property — the program/interest the lead
// picked. Labelled "5F: Subject" in HubSpot, but `subject` on the wire.
const SUBJECT_PROPERTY = 'subject'

// Per-field mapping into real HubSpot contact properties, so the answers land in
// their own columns instead of being flattened into one `message` blob.
//
// `key`      — the raw payload key each form already sends (see YOUTH_GROUP_FIELDS,
//              JOB_APPLICATION_FIELDS, PARTNERSHIP_FIELDS).
// `property` — the property's *internal* name in HubSpot (Settings → Properties →
//              Contact properties → "Internal name", NOT the Hebrew label).
// `label`    — the Hebrew label the form uses for this field. Anything whose label
//              isn't listed here still falls through to `message`, so a new form
//              field is never lost while its HubSpot property is being created.
//
// Deliberately small: it reuses properties the portal already has rather than
// inventing new ones. Everything with no property of its own — מין, כיתה, birth
// date, experience, certificates, requested date, coach — stays readable in
// `message`, which is where all of it lived before this mapping existed.
//
// IMPORTANT: every property below must also be added as a field on the HubSpot
// form itself. A property that exists but isn't on the form makes HubSpot reject
// the whole submission (FIELD_NOT_IN_FORM_DEFINITION) — see the retry in
// submitToHubSpot, which re-sends the lead the old way if that happens.
// `team` isn't here: it's an enumeration keyed by numeric ids, so it needs
// resolving through HUBSPOT_TEAM_IDS rather than a straight copy — see
// buildExtraFields.
const FIELD_MAP = []

// The child's name arrives as one free-text field ("שם פרטי ומשפחה") but is worth
// two columns, exactly like the parent's firstname/lastname.
const CHILD_FIRST_NAME = 'n5f__kid_first_name'
const CHILD_LAST_NAME = 'n5f__kid_last_name'
const CHILD_NAME_LABEL = 'שם הילד/ה'

// "מקור הגעה" — how the lead reached us. Every submission here is by definition
// the website, so it's a constant rather than something the visitor picks.
// `lead_source` is a dropdown, so the value must be the option's *internal*
// value, not its label: the option shown as "אתר" is stored as `referral`.
const SOURCE_PROPERTY = 'lead_source'
const SOURCE_VALUE = 'referral'

// EU endpoint, because the portal is EU-hosted — same reason the tracking script
// is served from js-eu1. The US host would reject these submissions.
const ENDPOINT = `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`

// HubSpot's object type id for Contact — required on every submitted field.
const CONTACT = '0-1'

function readCookie(name) {
  try {
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))
    return match ? decodeURIComponent(match[1]) : null
  } catch {
    return null
  }
}

// "ישראל ישראלי כהן" → { firstname: 'ישראל', lastname: 'ישראלי כהן' }.
// A single-token name yields no lastname, so we simply don't send one.
function splitName(full) {
  const parts = String(full || '').trim().split(/\s+/).filter(Boolean)
  return { firstname: parts[0] || '', lastname: parts.slice(1).join(' ') }
}

// Free-text leftovers — anything the visitor typed that has no column of its own
// (notes, "פירוט הפנייה", the chosen team's summary line …) is rendered as
// readable label: value lines into `message`. Fields already mapped to a real
// property are skipped so nothing is duplicated.
function renderDetails(details, skipLabels = new Set()) {
  if (!details || typeof details !== 'object') return ''
  return Object.entries(details)
    .filter(([label, value]) => !skipLabels.has(label) && String(value ?? '').trim())
    .map(([label, value]) => `${label}: ${String(value).trim()}`)
    .join('\n')
}

/**
 * Mirror a contact-form submission into HubSpot.
 *
 * Takes the payload the forms already build for Make.com — no separate shape to
 * keep in sync. Fire-and-forget: resolves to true/false but callers are free to
 * ignore it, and it never rejects.
 */
export async function submitToHubSpot(payload) {
  const core = buildCoreFields(payload)
  const extras = buildExtraFields(payload)

  // Not wired up yet (missing form guid / property name) → do nothing.
  if (!FORM_GUID || !SUBJECT_PROPERTY) {
    console.warn('HubSpot not configured (FORM_GUID / SUBJECT_PROPERTY) — skipping.', payload)
    return false
  }

  const sent = await post([...core, ...extras], payload)
  if (sent !== 'FIELD_NOT_IN_FORM_DEFINITION' || !extras.length) return sent === true

  // A mapped property isn't on the HubSpot form yet, and HubSpot rejects the
  // whole submission over it. Rather than lose the lead, re-send it the old way:
  // core fields only, with every answer as readable lines in `message`.
  console.warn('HubSpot: retrying without mapped properties — add them to the form to get real columns.')
  const fallback = core.filter((f) => f.name !== 'message')
  const message = renderDetails(payload.details)
  if (message) fallback.push({ objectTypeId: CONTACT, name: 'message', value: message })
  return (await post(fallback, payload)) === true
}

// The core four plus the properties that already exist on the form. `city` comes
// from whichever location field the chosen interest collected: youth groups ask
// for the child's city, job applications for the applicant's, and the Liabah map
// form carries the team's city.
function buildCoreFields(payload) {
  const { firstname, lastname } = splitName(payload.name)
  const skip = new Set([CHILD_NAME_LABEL, ...FIELD_MAP.map((f) => f.label)])

  return toFields({
    email: payload.email,
    phone: payload.phone,
    firstname,
    lastname,
    [SUBJECT_PROPERTY]: payload.productType,
    city: payload.childCity || payload.residence || payload.city,
    company: payload.orgName,
    // Only what has no column of its own — notes, "פירוט הפנייה", and any form
    // field added since this mapping was last updated.
    message: renderDetails(payload.details, skip),
  })
}

// The per-interest answers, each in its own HubSpot property.
function buildExtraFields(payload) {
  const child = splitName(payload.childName)

  // The team the visitor picked on the Liabah map, as HubSpot's option id.
  // Unpaired teams resolve to undefined and are dropped by toFields, leaving the
  // dropdown empty — the readable "קבוצה שנבחרה" line in `message` still carries
  // the answer, so a team missing from the table is never a lost answer.
  const team = HUBSPOT_TEAM_IDS[`${payload.city}|${payload.team}`]

  return toFields({
    team,
    [CHILD_FIRST_NAME]: child.firstname,
    [CHILD_LAST_NAME]: child.lastname,
    ...Object.fromEntries(FIELD_MAP.map(({ key, property }) => [property, payload[key]])),
    // Skipped until the property's internal name is filled in above.
    ...(SOURCE_PROPERTY ? { [SOURCE_PROPERTY]: SOURCE_VALUE } : {}),
  })
}

// Omit blanks rather than sending placeholders — an empty value would overwrite
// a good one on a returning contact.
function toFields(mapped) {
  return Object.entries(mapped)
    .filter(([, value]) => String(value ?? '').trim())
    .map(([name, value]) => ({ objectTypeId: CONTACT, name, value: String(value).trim() }))
}

// Returns true on success, the HubSpot error code on a rejection we can act on,
// and false otherwise. Never throws.
async function post(fields, payload) {
  try {
    const hutk = readCookie('hubspotutk')

    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields,
        context: {
          ...(hutk ? { hutk } : {}),
          pageUri: payload.pageUrl || window.location.href,
          pageName: document.title,
        },
      }),
    })

    if (res.ok) return true

    // HubSpot rejects the whole submission if a field isn't on the form
    // (FIELD_NOT_IN_FORM_DEFINITION) or a required one is missing. Its body
    // names the offending field, so surface it for debugging.
    const body = await res.text().catch(() => '')
    console.warn(`HubSpot submission rejected (${res.status}):`, body)
    return body.includes('FIELD_NOT_IN_FORM_DEFINITION') ? 'FIELD_NOT_IN_FORM_DEFINITION' : false
  } catch (err) {
    // Network hiccup, blocked by an ad blocker, cookie access denied — none of
    // these are the visitor's problem.
    console.warn('HubSpot submission failed:', err)
    return false
  }
}
