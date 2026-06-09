import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faq } from '../../data/liabahData'
import { SectionBg, SectionHeading } from './shared'
import useReveal from '../../hooks/useReveal'

/** Accessible FAQ accordion. */
export default function LiabahFAQ() {
  const ref = useReveal({ selector: '.fq-animate', y: 36, stagger: 0.08, duration: 1, start: 'top 82%' })
  const [open, setOpen] = useState(null)

  return (
    <section
      id="liabah-faq"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#ffffff]"
    >
      <SectionBg watermark={false} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading eyebrow="שאלות נפוצות" title="כל מה שחשוב לדעת" animateClass="fq-animate" />

        <div className="flex flex-col gap-3 pb-24">
          {faq.map((item) => {
            const isOpen = open === item.id
            return (
              <div
                key={item.id}
                className={`fq-animate rounded-xl border overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'border-orange/60 bg-orange/[0.035] shadow-sm'
                    : 'border-navy/10 bg-white hover:border-orange/30'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-right px-6 py-5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-inset"
                >
                  <span className="font-heebo font-bold text-navy text-base md:text-lg">{item.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-[#ff8714] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="font-heebo text-navy/65 leading-relaxed px-6 pb-5">{item.a}</p>
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
