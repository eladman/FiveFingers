import { useEffect, useState } from 'react'
import { LINKS, nav } from '../content'
import { WRAP } from '../shared'

/** The page's own slim bar: the דרך ריף wordmark, a few anchors, one way to talk. */
export default function TopBar() {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      dir="rtl"
      className={`fixed top-0 inset-x-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-brand ${
        solid ? 'bg-white/85 backdrop-blur-xl border-line' : 'bg-transparent border-transparent'
      }`}
    >
      <div className={`${WRAP} h-16 md:h-[72px] flex items-center justify-between gap-6`}>
        <a
          href="#top"
          aria-label="דרך ריף - לראש העמוד"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-4"
        >
          <svg aria-hidden="true" viewBox="0 0 28 28" width="26" height="26" fill="none">
            <path d="M5 24 C 13 22, 7 14, 14 13 S 17 5, 23 4" stroke="#ff8714" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className={`font-ragmarom text-[1.6rem] md:text-[1.8rem] leading-none transition-colors duration-300 text-navy`}>דרך ריף</span>
        </a>

        <nav aria-label="ניווט בעמוד" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`tap-safe font-heebo text-[0.95rem] font-medium rounded text-navy/70 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-4`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={LINKS.group}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center min-h-[44px] rounded-full px-5 md:px-6 font-heebo text-sm font-bold transition-colors duration-300 ease-brand bg-navy text-white hover:bg-navy-light active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2`}
        >
          דברו עם גיא
        </a>
      </div>
    </header>
  )
}
