import { useState, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'
import { faq } from '../../data/liabahData'

gsap.registerPlugin(ScrollTrigger)

/**
 * FAQ — editorial list: no card boxes, just hairline rules and generous
 * type. Same accessible grid-rows accordion as before, quieter chrome.
 */
export default function LiabahFAQV2() {
  const ref = useRef(null)
  const [open, setOpen] = useState(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return
      gsap.fromTo('.fq2-el',
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.08, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="liabah-faq"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-surface-2"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 md:px-16 py-24 md:py-32">
        <div className="fq2-el">
          <p className="ds-eyebrow text-orange-ink mb-3">שאלות נפוצות</p>
          <h2 className="ds-section-title text-navy">כל מה שחשוב לדעת</h2>
        </div>

        <div className="mt-12 md:mt-16 border-t border-navy/10">
          {faq.map((item) => {
            const isOpen = open === item.id
            return (
              <div key={item.id} className="fq2-el border-b border-navy/10">
                <button
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 text-right py-6 md:py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-lg"
                >
                  <span
                    className={`font-heebo font-bold transition-colors duration-300 ${isOpen ? 'text-orange-ink' : 'text-navy'}`}
                    style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.45rem)' }}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    size={22}
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-ink' : 'text-navy/40'}`}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="font-heebo text-navy/65 leading-[1.85] pb-7 max-w-2xl"
                      style={{ fontSize: 'clamp(0.98rem, 1.15vw, 1.15rem)' }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
