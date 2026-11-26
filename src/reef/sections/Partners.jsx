import { useRef } from 'react'
import { ArrowUpLeft } from 'lucide-react'
import { partners } from '../content'
import { Para, Title, WRAP, useSectionMotion } from '../shared'

/**
 * Partners to the way — three marks at equal weight, joined by the way
 * itself: a partnership, not a sponsor wall.
 */
export default function Partners() {
  const ref = useRef(null)
  useSectionMotion(ref)

  return (
    <section ref={ref} id="partners" dir="rtl" aria-labelledby="partners-title" className="relative w-full overflow-hidden bg-white scroll-mt-16">
      <div className={`${WRAP} pb-24 md:pb-36`}>
        <div className="border-t border-navy/12 pt-16 md:pt-24 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-8 lg:gap-24 items-end">
          <Title id="partners-title" title={partners.title} />
          <Para lead className="max-w-xl">{partners.text}</Para>
        </div>

        <ul className="relative mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-3">
          {/* the way, joining the three */}
          <svg aria-hidden="true" viewBox="0 0 1200 40" preserveAspectRatio="none" fill="none" className="pointer-events-none absolute inset-x-[8%] top-1/2 hidden h-10 w-[84%] -translate-y-1/2 sm:block">
            <path d="M1196 20 C 1050 2, 930 38, 800 20 S 560 2, 400 22 S 150 38, 4 18" stroke="#ff8714" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
          {partners.logos.map((p) => (
            <li key={p.name} className="rv relative">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mx-auto flex flex-row items-center gap-5 rounded-3xl px-4 py-6 sm:flex-col sm:gap-6 sm:py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
              >
                <span className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-white shadow-[0_18px_40px_-16px_rgba(8,16,40,0.35)] ring-1 ring-navy/8 transition-transform duration-500 ease-brand group-hover:-translate-y-1.5 sm:h-36 sm:w-36">
                  <img src={p.logo} alt="" loading="lazy" className="h-14 w-14 object-contain sm:h-20 sm:w-20" />
                </span>
                <span className="flex items-center gap-1.5 font-heebo font-semibold text-navy/85 text-base md:text-lg sm:text-center">
                  {p.name}
                  <ArrowUpLeft size={16} className="text-orange-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
