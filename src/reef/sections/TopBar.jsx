import { useEffect, useRef, useState } from 'react'
import { Route, X } from 'lucide-react'
import { LINKS, nav } from '../content'
import { CHAPTERS } from '../chapters'
import { WRAP, focusRing, scrollToId } from '../shared'

/**
 * The page's own slim bar: the דרך ריף wordmark, a few anchors, one way to
 * talk. Its lower edge is the way, filling as you read. On phones and tablets
 * a button opens every chapter as stops along a path.
 */
export default function TopBar({ index }) {
  const [solid, setSolid] = useState(false)
  const dialogRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openMenu = () => dialogRef.current?.showModal()
  const go = (id) => {
    dialogRef.current?.close()
    // let the dialog release the page before scrolling
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <>
      <header
        dir="rtl"
        className={`fixed top-0 inset-x-0 z-40 transition-[background-color,box-shadow] duration-300 ease-brand ${
          solid ? 'bg-white/[0.96] shadow-[0_1px_0_rgba(13,27,75,0.08)]' : 'bg-transparent'
        }`}
      >
        <div className={`${WRAP} h-16 md:h-[72px] flex items-center justify-between gap-4`}>
          <a
            href="#top"
            aria-label="דרך ריף - לראש העמוד"
            className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-4"
          >
            <svg aria-hidden="true" viewBox="0 0 28 28" width="26" height="26" fill="none" className="transition-transform duration-500 ease-brand group-hover:rotate-[-8deg]">
              <path d="M5 24 C 13 22, 7 14, 14 13 S 17 5, 23 4" stroke="#ff8714" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span className="font-ragmarom text-[1.6rem] md:text-[1.8rem] leading-none text-navy">דרך ריף</span>
          </a>

          <nav aria-label="ניווט בעמוד" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="rf-navlink tap-safe relative font-heebo text-[0.95rem] font-medium rounded text-navy/75 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-4"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openMenu}
              aria-haspopup="dialog"
              className={`lg:hidden inline-flex h-11 items-center gap-2 rounded-full border border-navy/20 bg-white/70 px-4 font-heebo text-sm font-bold text-navy ${focusRing}`}
            >
              <Route size={17} className="text-orange-ink" aria-hidden="true" />
              <span>פרקים</span>
            </button>
            <a
              href={LINKS.group}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center min-h-[44px] rounded-full px-5 md:px-6 font-heebo text-sm font-bold transition-colors duration-300 ease-brand bg-navy text-white hover:bg-navy-light active:scale-[0.97] ${focusRing}`}
            >
              דברו עם גיא
            </a>
          </div>
        </div>
        {/* the way, filling as you read */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden">
          <div
            data-rf-progress="bar"
            className="h-full origin-right bg-orange will-change-transform"
            style={{ transform: 'scaleX(0)', opacity: solid ? 1 : 0, transition: 'opacity 300ms' }}
          />
        </div>
      </header>

      <dialog ref={dialogRef} dir="rtl" aria-label="פרקים בעמוד" className="rf-menu">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-5">
            <span className="font-ragmarom text-[1.6rem] leading-none text-navy">דרך ריף</span>
            <form method="dialog">
              <button
                aria-label="סגירה"
                className={`grid h-11 w-11 place-items-center rounded-full bg-navy text-white ${focusRing}`}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </form>
          </div>
          <ol className="relative flex-1 overflow-y-auto px-5 pb-10 pt-4">
            <span aria-hidden="true" className="absolute top-8 bottom-14 right-[29px] w-[2px] rounded-full bg-navy/12" />
            {CHAPTERS.map((c, i) => {
              const current = i === index
              return (
                <li key={c.id} className="relative">
                  <button
                    type="button"
                    onClick={() => go(c.id)}
                    aria-current={current ? 'location' : undefined}
                    className={`flex w-full items-center gap-5 rounded-2xl py-2.5 pe-3 text-right ${focusRing}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`relative z-10 mr-[3px] block shrink-0 rounded-full border-2 ${
                        current ? 'h-4 w-4 border-orange bg-orange' : i < index ? 'h-3 w-3 border-orange bg-orange' : 'h-3 w-3 border-navy/40 bg-wheat'
                      }`}
                    />
                    <span
                      className={`font-ragmarom leading-none ${current ? 'text-navy' : 'text-navy/70'}`}
                      style={{ fontSize: 'clamp(1.7rem, 7vw, 2.3rem)' }}
                    >
                      {c.label}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </dialog>
    </>
  )
}
