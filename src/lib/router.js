/**
 * Path-based routing.
 *
 * The site used to route on hash fragments (#liabah, #memorial-n8). Google has
 * not treated a fragment as a distinct URL since 2015, so every page collapsed
 * into "/" in the index — ~25 pages showing up as one. Real paths give each
 * page its own indexable address.
 *
 * Navigation is captured by ONE delegated click listener rather than a <Link>
 * component, because MemorialPage builds its markup as HTML strings; a React
 * component could never reach those anchors. Anything matching <a href="/...">
 * is intercepted, wherever it came from.
 *
 * In-page anchors (#contact, #join, #liabah-map) are deliberately left alone —
 * they are scroll targets, not pages, and smoothScroll.js already owns them.
 */

import { ROSTER } from '../data/fallen'

/** Fired after an in-app navigation. Pairs with popstate for back/forward. */
export const NAVIGATE_EVENT = 'app:navigate'

/** Exact path → view name. Mirrors the views App.jsx renders. */
const PATH_TO_VIEW = {
  '/': 'home',
  '/liabah': 'liabah',
  '/liabah/young': 'liabah-young',
  '/liabah/middle': 'liabah-middle',
  '/liabah/high': 'liabah-high',
  '/academy': 'academy',
  '/collabs': 'collabs',
  '/amir': 'amir',
  '/alumni': 'alumni',
  '/about': 'about',
  '/team': 'team',
  '/memorial': 'memorial',
  '/hero-concepts': 'concepts',
}

/** Every real page, for the sitemap and the prerender step. */
export const ROUTE_PATHS = Object.keys(PATH_TO_VIEW).filter((p) => p !== '/hero-concepts')

/** Trailing slashes are cosmetic; "/liabah/" and "/liabah" are the same page. */
export function normalizePath(p) {
  if (!p) return '/'
  const clean = p.replace(/\/+$/, '')
  return clean === '' ? '/' : clean
}

export function resolveView(pathname = window.location.pathname) {
  const p = normalizePath(pathname)
  // Both the hall (/memorial) and each person (/memorial/<slug>) render the
  // same component — it switches internally without remounting.
  if (p === '/memorial' || p.startsWith('/memorial/')) return 'memorial'
  return PATH_TO_VIEW[p] || 'home'
}

/** ROSTER index for /memorial/<slug>; -1 means the hall itself. */
export function memorialIndexFromPath(pathname = window.location.pathname) {
  const p = normalizePath(pathname)
  if (!p.startsWith('/memorial/')) return -1
  const slug = p.slice('/memorial/'.length)
  return ROSTER.findIndex((r) => r.id === slug)
}

/** Canonical path for a person, falling back to the hall for a bad index. */
export function memorialPath(index) {
  const entry = ROSTER[index]
  return entry ? `/memorial/${entry.id}` : '/memorial'
}

export function navigate(to, { replace = false } = {}) {
  const url = new URL(to, window.location.origin)
  const target = url.pathname + url.search + url.hash
  const current = window.location.pathname + window.location.search + window.location.hash
  if (target !== current) {
    if (replace) history.replaceState(null, '', target)
    else history.pushState(null, '', target)
  }
  window.dispatchEvent(new CustomEvent(NAVIGATE_EVENT))
}

let installed = false

/**
 * Intercept internal link clicks so they route in-app instead of reloading.
 * Deliberately permissive about WHERE the anchor came from, and deliberately
 * strict about which clicks it claims.
 */
export function installLinkInterception() {
  if (installed) return
  installed = true

  document.addEventListener('click', (e) => {
    // Let the browser handle modified clicks — open-in-new-tab must keep working.
    if (e.defaultPrevented || e.button !== 0) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

    const a = e.target.closest?.('a')
    if (!a) return

    const href = a.getAttribute('href')
    // "//example.com" is protocol-relative and external despite the leading slash.
    if (!href || !href.startsWith('/') || href.startsWith('//')) return
    if (a.target && a.target !== '_self') return
    if (a.hasAttribute('download')) return

    // A path with a file extension is a real asset (/dashboard.html) and needs
    // a genuine page load, not a client-side view swap.
    const { pathname } = new URL(href, window.location.origin)
    if (/\.[a-z0-9]+$/i.test(pathname)) return

    e.preventDefault()
    navigate(href)
  })
}

/** Subscribe to back/forward and in-app navigation alike. Returns an unsubscribe. */
export function onRouteChange(fn) {
  window.addEventListener('popstate', fn)
  window.addEventListener(NAVIGATE_EVENT, fn)
  return () => {
    window.removeEventListener('popstate', fn)
    window.removeEventListener(NAVIGATE_EVENT, fn)
  }
}
