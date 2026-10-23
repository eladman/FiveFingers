// Marketing tags — Google Tag Manager, and through it the Meta Pixel for the ad
// campaign — load ONLY after the visitor opts in on the consent banner.
//
// This is stricter than Google's Consent Mode alone: with Consent Mode, GTM still
// loads and each tag has to be configured to wait for consent, which depends on
// whoever manages the container getting every tag right. Here nothing from Google
// or Meta reaches the page until the visitor says yes, so a misconfigured tag in
// GTM can never fire for someone who declined. Matters doubly because part of our
// audience is under 18.
//
// The choice is kept in localStorage (no cookie of our own) and can be changed
// later from the footer's "הגדרות עוגיות" link. Like analytics.js: never throws
// into the page.

const GTM_ID = 'GTM-N2TKVV56'
const CONSENT_KEY = 'ff_consent' // 'granted' | 'denied' — absent = not asked yet

/** Fired with detail 'granted' | 'denied' whenever the visitor decides. */
export const CONSENT_EVENT = 'app:consent'
/** Fired by the footer link to show the banner again. */
export const CONSENT_OPEN_EVENT = 'app:consent-open'

let gtmLoaded = false

export function getConsent() {
  try {
    const value = localStorage.getItem(CONSENT_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    /* storage blocked — the choice still applies for this page view */
  }
  if (value === 'granted') loadTagManager()
  else revokeConsent()
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }))
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))
}

/** Called once at startup: returning visitors who already agreed get GTM right away. */
export function initConsent() {
  if (getConsent() === 'granted') loadTagManager()
}

function gtag() {
  window.dataLayer = window.dataLayer || []
  // Consent Mode reads the `arguments` object itself, not an array — keep it.
  window.dataLayer.push(arguments)
}

// Google's standard snippet (the <head> part GTM shows on setup), loaded
// on demand. The <noscript> iframe half is intentionally omitted: it would load
// GTM for no-JS visitors without any way to ask them first.
function loadTagManager() {
  if (gtmLoaded) return
  gtmLoaded = true
  try {
    window.dataLayer = window.dataLayer || []
    // Explicit consent signals for Google tags inside the container. We only
    // get here after a yes, so everything is granted.
    gtag('consent', 'default', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    })
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
    document.head.appendChild(script)
  } catch {
    // a tag manager must never break the page
  }
}

// Withdrawing mid-visit: GTM is already running in this tab, so tell its Google
// tags to stop; trackEvent stops pushing site events on its own. From the next
// page load GTM isn't loaded at all.
function revokeConsent() {
  if (!gtmLoaded) return
  try {
    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    })
  } catch {
    /* nothing to undo */
  }
}

/**
 * Push a site event to GTM's dataLayer — e.g. `lead_submitted`, which the
 * campaign manager wires to Meta's "Lead" event inside GTM.
 *
 * No-op without consent, so nothing queues up to be sent later. Never pass
 * personal details (name, phone, email) here: whatever is in the dataLayer can
 * be forwarded to any tag in the container.
 */
export function trackEvent(event, params = {}) {
  if (getConsent() !== 'granted') return
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...params })
  } catch {
    /* tracking must never break the page */
  }
}
