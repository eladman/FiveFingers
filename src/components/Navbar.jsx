import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.png'
import Button from './ui/Button'

const NAV_LINKS = [
  { label: 'קבוצות הנוער', href: '#liabah' },
  { label: 'מכינה', href: '#academy' },
  { label: 'שיתופי פעולה', href: '#collabs' },
  { label: 'בוגרים', href: '#alumni' },
  { label: 'צוות', href: '#team' },
  { label: 'עמיר מנחם', href: '#amir' },
]

export default function Navbar({ onContactOpen }) {
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

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <nav
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden lg:flex items-center gap-1 px-3 py-2.5 rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-black/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40'
            : 'bg-black/25 backdrop-blur-md'
        }`}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center me-3 ms-1 shrink-0">
          <img src={logo} alt="חמש אצבעות" className="h-8 w-auto" />
        </a>

        {/* Links */}
        <div className="flex items-center gap-0.5">
          {NAV_LINKS.map(({ label, href }) => {
            const active = activeHash === href
            return (
              <a
                key={label}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`px-3 py-1.5 text-sm transition-colors duration-200 rounded-full whitespace-nowrap ${
                  active ? 'text-white bg-white/10 font-semibold' : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
              </a>
            )
          })}
        </div>

        {/* CTA */}
        <Button variant="primary" size="sm" onClick={onContactOpen} className="ms-2 me-1">
          יצירת קשר
        </Button>
      </nav>

      {/* ── Mobile Navbar ── */}
      <nav className="fixed top-0 right-0 left-0 z-50 lg:hidden">
        <div
          className={`mx-4 mt-4 px-4 py-3 rounded-2xl flex items-center justify-between transition-all duration-500 ${
            scrolled || menuOpen
              ? 'bg-black/90 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/40'
              : 'bg-black/30 backdrop-blur-md'
          }`}
        >
          <a href="#home">
            <img src={logo} alt="חמש אצבעות" className="h-8 w-auto" />
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors text-white hover:bg-white/10 active:bg-white/15"
            aria-label="תפריט"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={`mx-4 mt-1 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${
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
                  className={`block py-3.5 border-b border-white/8 last:border-0 text-lg font-medium transition-colors ${
                    active ? 'text-orange' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {label}
                </a>
              )
            })}
            <button
              onClick={() => { setMenuOpen(false); onContactOpen() }}
              className="w-full mt-4 bg-orange text-white py-3.5 rounded-xl font-bold text-base"
            >
              יצירת קשר
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}
