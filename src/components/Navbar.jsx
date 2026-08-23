import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.png'
import Button from './ui/Button'
import { onRouteChange, normalizePath } from '../lib/router'

const NAV_LINKS = [
  { label: 'קבוצות הנוער', href: '/liabah' },
  { label: 'מכינה', href: '/academy' },
  { label: 'שיתופי פעולה', href: '/collabs' },
  { label: 'בוגרים', href: '/alumni' },
  { label: 'אודות', href: '/about' },
  { label: 'צוות', href: '/team' },
  // Memorial — an in-app route (src/pages/MemorialPage.jsx). Client-side nav,
  // so it opens instantly with no full page reload. Kept last in the nav.
  { label: 'לזכרם', href: '/memorial' },
]

export default function Navbar({ onContactOpen, forceLifted = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePath, setActivePath] = useState(
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/'
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    const syncPath = () => setActivePath(normalizePath(window.location.pathname))
    window.addEventListener('scroll', onScroll, { passive: true })
    const offRoute = onRouteChange(syncPath)
    return () => {
      window.removeEventListener('scroll', onScroll)
      offRoute()
    }
  }, [])

  // Scroll to the very top when the logo is clicked. Covers the case where we
  // are already on "/" (no navigation fires, so App's router won't scroll).
  const handleLogoClick = () => {
    setMenuOpen(false)
    if (normalizePath(window.location.pathname) === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Option A — Light Frosted Glass: clear glass + white text over the hero,
  // white frosted glass + navy text once scrolled over the warm light sections.
  // `forceLifted` keeps the lifted/navy style from the top on pages whose hero
  // is light (e.g. the צוות faces-wall hero), where white text would vanish.
  const lifted = scrolled || forceLifted
  const mobileLifted = lifted || menuOpen

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <nav
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden lg:flex items-center gap-1 px-3 py-2.5 rounded-full transition-all duration-500 ${
          lifted
            ? 'bg-white/30 backdrop-blur-2xl border border-line shadow-xl shadow-navy/10'
            : 'bg-white/10 backdrop-blur-md border border-white/20'
        }`}
      >
        {/* Logo */}
        <a href="/" onClick={handleLogoClick} className="flex items-center me-3 ms-1 shrink-0">
          <img src={logo} alt="חמש אצבעות" className="h-8 w-auto" />
        </a>

        {/* Links */}
        <div className="flex items-center gap-0.5">
          {NAV_LINKS.map(({ label, href }) => {
            const active = activePath === href
            const linkClass = lifted
              ? active
                ? 'text-navy bg-navy/[0.06] font-semibold'
                : 'text-navy/70 hover:text-navy hover:bg-navy/[0.05]'
              : active
                ? 'text-white bg-white/15 font-semibold'
                : 'text-white/75 hover:text-white hover:bg-white/10'
            return (
              <a
                key={label}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`relative px-3 py-1.5 text-sm transition-colors duration-200 rounded-full whitespace-nowrap ${linkClass}`}
              >
                {label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-1 inset-x-3 h-0.5 rounded-full bg-orange"
                  />
                )}
              </a>
            )
          })}
        </div>

        {/* CTA */}
        <Button variant="primary" size="md" onClick={onContactOpen} className="ms-2 me-1">
          יצירת קשר
        </Button>
      </nav>

      {/* ── Mobile Navbar ── */}
      <nav className="fixed top-0 right-0 left-0 z-50 lg:hidden">
        <div
          className={`mx-4 mt-4 px-4 py-3 rounded-2xl flex items-center justify-between transition-all duration-500 ${
            mobileLifted
              ? 'bg-white/40 backdrop-blur-2xl border border-line shadow-lg shadow-navy/10'
              : 'bg-white/10 backdrop-blur-md border border-white/20'
          }`}
        >
          {/* The logo image is only 22×32, so the anchor carries its own 44px
              hit area (the bar's py-3 already reserves the room — this just
              claims it) rather than leaving a sub-thumb-sized home link. */}
          <a href="/" onClick={handleLogoClick} className="flex items-center min-h-[44px] pe-2">
            <img src={logo} alt="חמש אצבעות" className="h-8 w-auto" />
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors ${
              mobileLifted
                ? 'text-navy hover:bg-navy/5 active:bg-navy/10'
                : 'text-white hover:bg-white/10 active:bg-white/15'
            }`}
            aria-label="תפריט"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {/* The open height is capped to the viewport, not a flat 500px: the panel
            is inside a `fixed` nav, so anything taller than the screen simply
            can't be reached — page scroll doesn't move it. On a landscape phone
            (~390px tall) a full link list + CTA can exceed the screen, which used
            to strand the last links and the יצירת קשר button off-screen with
            `overflow-hidden`. Capping at 100dvh minus the bar (6.5rem) and
            scrolling the overflow makes every item reachable at any height.
            `data-lenis-prevent` keeps that inner scroll away from Lenis (see
            index.css) so the page underneath doesn't move with it. */}
        <div
          data-lenis-prevent
          className={`mx-4 mt-1 bg-white/70 backdrop-blur-2xl border border-line rounded-2xl transition-all duration-300 shadow-xl shadow-navy/10 ${
            menuOpen
              ? 'max-h-[min(31.25rem,calc(100dvh-6.5rem))] opacity-100 overflow-y-auto overscroll-contain'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="p-4">
            {NAV_LINKS.map(({ label, href }) => {
              const active = activePath === href
              return (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center gap-2.5 py-3.5 border-b border-line last:border-0 text-lg transition-colors ${
                    active ? 'text-navy font-bold' : 'text-navy/60 hover:text-navy font-medium'
                  }`}
                >
                  {active && (
                    <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                  )}
                  {label}
                </a>
              )
            })}
            <Button
              variant="primary" size="md"
              onClick={() => { setMenuOpen(false); onContactOpen() }}
              className="w-full mt-4"
            >
              יצירת קשר
            </Button>
          </div>
        </div>
      </nav>
    </>
  )
}
