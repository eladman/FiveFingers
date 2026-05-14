import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.png'

const NAV_LINKS = [
  { label: 'מסך הבית', href: '#home' },
  { label: 'ליבה', href: '#liabah' },
  { label: 'אקדמיה', href: '#academy' },
  { label: 'שת"פ', href: '#collabs' },
  { label: 'בוגרים', href: '#alumni' },
  { label: 'עמיר מנחם', href: '#amir' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="px-3 py-1.5 text-sm transition-colors duration-200 rounded-full whitespace-nowrap text-white/70 hover:text-white hover:bg-white/10"
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <MagneticButton className="ms-2 me-1 bg-[#ff8714] text-white px-5 py-2 rounded-full text-sm font-bold">
          יצירת קשר
        </MagneticButton>
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
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-3.5 text-white/60 hover:text-white border-b border-white/8 last:border-0 text-lg font-medium transition-colors"
              >
                {label}
              </a>
            ))}
            <button className="w-full mt-4 bg-[#ff8714] text-white py-3.5 rounded-xl font-bold text-base">
              יצירת קשר
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

/* Magnetic button with sliding overlay */
function MagneticButton({ children, className }) {
  const onEnter = (e) => { e.currentTarget.style.transform = 'scale(1.04)' }
  const onLeave = (e) => { e.currentTarget.style.transform = 'scale(1)' }

  return (
    <button
      className={`group relative overflow-hidden transition-all duration-300 whitespace-nowrap ${className}`}
      style={{ transition: 'transform 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span className="absolute inset-0 bg-white/25 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
      <span className="relative">{children}</span>
    </button>
  )
}
