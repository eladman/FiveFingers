// Which campaign brought a lead in.
//
// Ads link to the site with UTM parameters (?utm_source=facebook&utm_campaign=…),
// but those vanish from the URL as soon as the visitor moves to another page, and
// the form is often filled in a few pages — or a few days — later. So the first
// thing we do on load is copy them aside, and the contact forms attach them to
// the lead they send to Make.com.
//
// Independent of the consent banner on purpose: this stays on the visitor's own
// device (localStorage, no cookie) and only travels with a form they chose to
// submit to us — it never goes to Google or Meta. It's what lets us count leads
// per campaign ourselves, for visitors who declined tracking too.

const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid']
const STORE_KEY = 'ff_attribution'
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000 // a click older than a month no longer explains a lead

/** Called once at startup, before any navigation can drop the query string. */
export function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search)
    const found = {}
    for (const key of KEYS) {
      const value = params.get(key)
      if (value) found[key] = value.slice(0, 200)
    }
    if (!Object.keys(found).length) return

    // Latest campaign wins: a newer ad click replaces an older one.
    localStorage.setItem(
      STORE_KEY,
      JSON.stringify({ ...found, landing_page: window.location.pathname, captured_at: new Date().toISOString() }),
    )
  } catch {
    // storage blocked or a malformed URL — the lead simply arrives without a source
  }
}

/** The stored campaign details, or null when the visitor didn't come from a tagged link. */
export function getAttribution() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORE_KEY) || 'null')
    if (!stored) return null
    if (Date.now() - new Date(stored.captured_at).getTime() > MAX_AGE_MS) {
      localStorage.removeItem(STORE_KEY)
      return null
    }
    return stored
  } catch {
    return null
  }
}

/** Random id shared by a lead's form payload and its `lead_submitted` event. */
export function newLeadId() {
  try {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID()
  } catch {
    /* fall through */
  }
  return 'lead-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}
