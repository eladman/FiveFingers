import useReveal from '../../hooks/useReveal'
import { partners } from '../content'
import { Head, Para, WRAP } from '../shared'

/**
 * Partners to the way — three marks at equal weight and equal height, each
 * in an identical cell. A partnership, not a sponsor wall.
 */
export default function Partners() {
  const ref = useReveal({ selector: '.rv', y: 36, stagger: 0.08 })

  return (
    <section ref={ref} id="partners" dir="rtl" className="relative w-full overflow-hidden bg-surface scroll-mt-16">
      <div className={`${WRAP} py-20 md:py-32`}>
        <Head kicker={partners.kicker} title={partners.title} center />
        <Para className="mt-8 mx-auto max-w-2xl text-center" lead>{partners.text}</Para>

        <ul className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          {partners.logos.map((p) => (
            <li key={p.name} className="rv">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rf-card flex h-full items-center gap-6 rounded-3xl border border-line bg-white px-6 py-5 sm:flex-col sm:justify-center sm:py-10 md:py-14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
              >
                <img src={p.logo} alt="" loading="lazy" className="h-16 w-16 sm:h-24 sm:w-auto md:h-28 sm:max-w-[70%] shrink-0 object-contain" />
                <span className="font-heebo font-semibold text-navy/80 sm:text-center text-base md:text-lg">{p.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
