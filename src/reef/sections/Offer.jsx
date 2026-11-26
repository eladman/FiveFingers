import { ArrowLeft } from 'lucide-react'
import useReveal from '../../hooks/useReveal'
import { audience, LINKS, offer } from '../content'
import { Head, WRAP } from '../shared'

/**
 * What a group can do here (formats, as cards) and who it is for (audiences,
 * as an editorial list). One surface: two halves of the same answer.
 */
export default function Offer() {
  const cardsRef = useReveal({ selector: '.rv', y: 36, stagger: 0.06 })
  const listRef = useReveal({ selector: '.rv', y: 36, stagger: 0.06 })

  return (
    <div dir="rtl" className="relative w-full bg-surface">
      {/* 08 — formats */}
      <section ref={cardsRef} id="offer" className={`${WRAP} pt-20 md:pt-32 scroll-mt-16`}>
        <Head kicker={offer.kicker} title={offer.title} long />

        <ul className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {offer.items.map((item, i) => (
            <li
              key={item.name}
              className="rv rf-card flex flex-col rounded-3xl border border-line bg-white p-6 md:p-7 sm:min-h-[11rem] lg:min-h-[13.5rem] shadow-[0_1px_2px_rgba(0,0,30,0.04)]"
            >
              <span className="font-mono text-xs tabular-nums text-navy/40" aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className="mt-auto pt-3 sm:pt-8 font-heebo font-extrabold text-navy leading-tight" style={{ fontSize: 'clamp(1.35rem, 1.7vw, 1.65rem)' }}>
                {item.name}
              </h3>
              <p className="mt-2 font-heebo text-navy/70 leading-relaxed text-[0.98rem]">{item.text}</p>
            </li>
          ))}
          <li className="rv">
            <a
              href={LINKS.group}
              target="_blank"
              rel="noopener noreferrer"
              className="group rf-card flex h-full flex-col rounded-3xl bg-navy p-6 md:p-7 sm:min-h-[11rem] lg:min-h-[13.5rem] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              <ArrowLeft size={22} className="text-orange transition-transform duration-300 ease-brand group-hover:-translate-x-1.5" aria-hidden="true" />
              <span className="mt-auto pt-4 sm:pt-8 font-ragmarom leading-none" style={{ fontSize: 'clamp(1.9rem, 2.4vw, 2.4rem)' }}>
                {offer.cta}
              </span>
              <span className="mt-2 font-heebo text-white/75 leading-relaxed text-[0.98rem]">נבנה יחד את היום שמתאים לכם.</span>
            </a>
          </li>
        </ul>
      </section>

      {/* 09 — audiences */}
      <section ref={listRef} id="audience" className={`${WRAP} pt-24 md:pt-36 pb-20 md:pb-32 scroll-mt-16`}>
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-24">
          <Head kicker={audience.kicker} title={audience.title} long className="lg:sticky lg:top-28 lg:self-start" />

          <ul className="border-t border-navy/10">
            {audience.items.map((item) => (
              <li key={item.name} className="rv border-b border-navy/10 py-6 md:py-7 sm:flex sm:items-baseline sm:justify-between sm:gap-8">
                <h3 className="font-ragmarom text-navy leading-none shrink-0" style={{ fontSize: 'clamp(1.9rem, 2.8vw, 2.8rem)' }}>
                  {item.name}
                </h3>
                <p className="mt-2 sm:mt-0 font-heebo text-navy/70 leading-relaxed sm:text-left sm:max-w-[22rem]" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.15rem)' }}>
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
