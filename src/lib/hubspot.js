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

// Public identifiers, not secrets — the portal id is already visible in the
// tracking script URL and the form guid is visible in any HubSpot embed. Kept in
// code rather than env vars so a missing Vercel variable can't silently switch
// HubSpot off in production.
const PORTAL_ID = '26835159'
const FORM_GUID = '0c2a7c8c-df30-47cd-b6d7-212cd642cda7'

// Internal name of the "5F: Subject" property — the program/interest the lead
// picked. Labelled "5F: Subject" in HubSpot, but `subject` on the wire.
const SUBJECT_PROPERTY = 'subject'

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

// Everything the visitor typed beyond the core four fields already lives on the
// payload as a Hebrew label→value map, assembled by each form. Rendering it as
// readable lines into `message` means new form fields flow into HubSpot with no
// change here and no new HubSpot properties to create.
function renderDetails(details) {
  if (!details || typeof details !== 'object') return ''
  return Object.entries(details)
    .filter(([, value]) => String(value ?? '').trim())
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
  try {
    // Not wired up yet (missing form guid / property name) → do nothing.
    if (!FORM_GUID || !SUBJECT_PROPERTY) {
      console.warn('HubSpot not configured (FORM_GUID / SUBJECT_PROPERTY) — skipping.', payload)
      return false
    }

    const { firstname, lastname } = splitName(payload.name)

    // The lean mapping the previous site used. `city` comes from whichever
    // location field the chosen interest collected: youth groups ask for the
    // child's city, job applications for the applicant's, and the Liabah map
    // form carries the team's city.
    const mapped = {
      email: payload.email,
      phone: payload.phone,
      firstname,
      lastname,
      [SUBJECT_PROPERTY]: payload.productType,
      city: payload.childCity || payload.residence || payload.city,
      company: payload.orgName,
      message: renderDetails(payload.details),
    }

    // Omit blanks rather than sending placeholders — an empty value would
    // overwrite a good one on a returning contact.
    const fields = Object.entries(mapped)
      .filter(([, value]) => String(value ?? '').trim())
      .map(([name, value]) => ({ objectTypeId: CONTACT, name, value: String(value).trim() }))

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

    if (!res.ok) {
      // HubSpot rejects the whole submission if a field isn't on the form
      // (FIELD_NOT_IN_FORM_DEFINITION) or a required one is missing. Its body
      // names the offending field, so surface it for debugging.
      const body = await res.text().catch(() => '')
      console.warn(`HubSpot submission rejected (${res.status}):`, body)
      return false
    }

    return true
  } catch (err) {
    // Network hiccup, blocked by an ad blocker, cookie access denied — none of
    // these are the visitor's problem.
    console.warn('HubSpot submission failed:', err)
    return false
  }
}
