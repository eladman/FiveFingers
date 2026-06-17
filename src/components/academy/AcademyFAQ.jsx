import { useState } from 'react'
import { Plus } from 'lucide-react'
import { faq } from '../../data/academyData'
import { MuseumSection, MuseumHeading } from './shared'
import useReveal from '../../hooks/useReveal'

/** Minimal FAQ — hairline rows, no tinted blocks. */
export default function AcademyFAQ() {
  const ref = useReveal({ selector: '.fq-animate', y: 24, stagger: 0.06, duration: 1, start: 'top 84%' })
  const [open, setOpen] = useState(null)

  return (
    <MuseumSection id="academy-faq">
      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <MuseumHeading kicker="שאלות נפוצות" title="כל מה שחשוב לדעת" animateClass="fq-animate" />

        <div className="mt-14 border-t border-navy/12">
          {faq.map((item) => {
            const isOpen = open === item.id
            return (
              <div key={item.id} className="fq-animate border-b border-navy/12">
                <button
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 text-right py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30 focus-visible:ring-inset"
                >
                  <span className="font-heebo font-bold text-navy text-base md:text-lg">{item.q}</span>
                  <Plus
                    size={20}
                    className={`text-orange shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="font-heebo text-navy/60 leading-relaxed pb-6 max-w-2xl">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </MuseumSection>
  )
}
