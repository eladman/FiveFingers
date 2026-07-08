import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.png'
import Button from './ui/Button'

const NAV_LINKS = [
  { label: 'קבוצות הנוער', href: '#liabah' },
  { label: 'מכינה', href: '#academy' },
  { label: 'שיתופי פעולה', href: '#collabs' },
  // Memorial — a standalone static page in public/memorial/ (full navigation,
  // not an in-page hash anchor). Pointed at the explicit file so it resolves
  // identically in Vite dev, vite preview, and Vercel. Centered per the design.
  { label: 'לזכרם', href: '/memorial/index.html' },
  { label: 'בוגרים', href: '#alumni' },
  { label: 'צוות', href: '#team' },
  { label: 'עמיר מנחם', href: '#amir' },
]

export default function Navbar({ onContactOpen, forceLifted = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHash, setActiveHash] = useState(
    typeof window !== 'undefined' ? window.location.hash || '#home' : '#home'
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    const onHashChange = () => setActiveHash(window.location.hash || '#home')
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  // Scroll to the very top when the logo is clicked. Covers the case where the
  // hash is already #home (no hashchange fires, so App's router won't scroll).
  const handleLogoClick = () => {
    setMenuOpen(false)
    if (window.location.hash === '#home' || window.location.hash === '') {
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
        <a href="#home" onClick={handleLogoClick} className="flex items-center me-3 ms-1 shrink-0">
          <img src={logo} alt="חמש אצבעות" className="h-8 w-auto" />
        </a>

        {/* Links */}
        <div className="flex items-center gap-0.5">
          {NAV_LINKS.map(({ label, href }) => {
            const active = activeHash === href
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
          <a href="#home" onClick={handleLogoClick}>
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
        <div
          className={`mx-4 mt-1 bg-white/70 backdrop-blur-2xl border border-line rounded-2xl overflow-hidden transition-all duration-300 shadow-xl shadow-navy/10 ${
            menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4">
            {NAV_LINKS.map(({ label, href }) => {
              const active = activeHash === href
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
