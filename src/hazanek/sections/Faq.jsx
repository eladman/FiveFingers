import { useState } from 'react'
import { Plus } from 'lucide-react'
import useReveal from '../../hooks/useReveal'
import { faq } from '../content'
import { Heading } from '../shared'

/** Hairline accordion, same pattern as the Academy FAQ. */
export default function Faq() {
  const ref = useReveal({ selector: '.rv', y: 24, stagger: 0.06, duration: 1, start: 'top 84%' })
  const [open, setOpen] = useState(0)

  return (
    <section ref={ref} id="faq" dir="rtl" className="relative w-full overflow-hidden bg-surface-2">
      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 md:px-10 py-20 md:py-28">
        <Heading kicker={faq.kicker} title={faq.title} center />

        <div className="mt-12 md:mt-14 border-t border-navy/12">
          {faq.items.map((item, i) => {
            const isOpen = open === i
            const panelId = `faq-panel-${i}`
            return (
              <div key={item.q} className="rv border-b border-navy/12">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full flex items-center justify-between gap-6 text-right py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30 focus-visible:ring-inset"
                  >
                    <span className="font-heebo font-bold text-navy text-lg md:text-xl">{item.q}</span>
                    <Plus
                      size={22}
                      className={`text-orange-ink shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  inert={!isOpen || undefined}
                >
                  <div className="overflow-hidden">
                    <p className="font-heebo text-navy/70 leading-relaxed pb-6 max-w-2xl text-base md:text-lg">{item.a}</p>
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
