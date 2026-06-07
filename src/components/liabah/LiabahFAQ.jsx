import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faq } from '../../data/liabahData'
import { SectionBg, SectionHeading } from './shared'

/** Accessible FAQ accordion. */
export default function LiabahFAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section
      id="liabah-faq"
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#ffffff]"
    >
      <SectionBg watermark={false} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading title="שאלות נפוצות" subtitle="כל מה שחשוב לדעת" />

        <div className="flex flex-col gap-3 pb-24">
          {faq.map((item) => {
            const isOpen = open === item.id
            return (
              <div key={item.id} className="rounded-xl border border-[#000032]/10 bg-white overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-right px-6 py-5"
                >
                  <span className="font-heebo font-bold text-[#000032] text-base md:text-lg">{item.q}</span>
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
                    <p className="font-heebo text-[#000032]/65 leading-relaxed px-6 pb-5">{item.a}</p>
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
