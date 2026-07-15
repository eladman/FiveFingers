// Cookieless page-view beacon → Supabase `page_views` table.
// No cookies, no PII — logs only the in-site path and the referrer.
// Safe by design: no-ops if env vars are missing, never throws into the page.

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

let lastPath = null

function currentPath() {
  return window.location.pathname + window.location.hash
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
