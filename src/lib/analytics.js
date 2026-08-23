// Cookieless page-view beacon → Supabase `page_views` table.
// No cookies, no PII — logs only the in-site path, the referrer, and two
// anonymous random IDs (a persistent visitor id + a per-session id) so the
// dashboard can count UNIQUE visitors instead of raw hits.
//
// "Cookieless" is preserved: we use localStorage/sessionStorage (never a
// Cookie header) and the IDs are random UUIDs with no personal information.
// Safe by design: no-ops if env vars are missing, never throws into the page.

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const VISITOR_KEY = 'ff_vid' // persistent, anonymous — one per browser
const SESSION_KEY = 'ff_sid' // resets when the tab/session ends
const INTERNAL_KEY = 'ff_internal' // '1' on staff/collaborator browsers

let lastPath = null

function currentPath() {
  return window.location.pathname + window.location.hash
}

function randomId() {
  try {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID()
  } catch {
    /* fall through */
  }
  // Fallback for older browsers — good enough for an anonymous analytics id.
  return 'x-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

// Read-or-create a random id in the given Web Storage. Returns null if storage
// is unavailable (private mode, blocked) — the beacon still fires without it.
function persistentId(storage, key) {
  try {
    let id = storage.getItem(key)
    if (!id) {
      id = randomId()
      storage.setItem(key, id)
    }
    return id
  } catch {
    return null
  }
}

// Marks this browser as internal (staff/collaborator) so the dashboard can
// exclude it. Called once when the staff dashboard app loads.
export function markInternalVisitor() {
  try {
    localStorage.setItem(INTERNAL_KEY, '1')
  } catch {
    /* storage blocked — nothing we can do, and nothing to break */
  }
}

function isInternal() {
  try {
    return localStorage.getItem(INTERNAL_KEY) === '1'
  } catch {
    return false
  }
}

export function trackPageView() {
  try {
    // Not configured yet → silently do nothing.
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return

    // Never track the staff dashboard itself.
    if (window.location.pathname.startsWith('/dashboard')) return

    const path = currentPath()
    if (path === lastPath) return // dedupe rapid repeats (e.g. double hashchange)
    lastPath = path

    fetch(`${SUPABASE_URL}/rest/v1/page_views`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        path,
        referrer: document.referrer || null,
        visitor_id: persistentId(localStorage, VISITOR_KEY),
        session_id: persistentId(sessionStorage, SESSION_KEY),
        is_internal: isInternal(),
      }),
      keepalive: true,
    }).catch(() => {}) // network hiccups must never surface to the user
  } catch {
    // analytics must never break the page
  }
}

// Track the initial load + every SPA hash-route change.
export function initAnalytics() {
  trackPageView()
  window.addEventListener('hashchange', trackPageView)
}
