import useReveal from '../../hooks/useReveal'
import { voices } from '../content'
import { Heading, LightAtmosphere } from '../shared'

/** Cycle-A graduates, in their own words (from the cycle-A summary booklet). */
export default function Voices() {
  const ref = useReveal({ selector: '.rv', y: 48, stagger: 0.12 })

  return (
    <section ref={ref} id="voices" dir="rtl" className="relative w-full overflow-hidden bg-surface">
      <LightAtmosphere />
      <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 pb-20 md:pb-32 pt-4 md:pt-8">
        <Heading kicker={voices.kicker} title={voices.title} />

        <ul className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {voices.items.map((v) => (
            <li key={v.name} className="rv">
              <figure className="h-full flex flex-col rounded-[2rem] overflow-hidden bg-white border border-navy/[0.08] shadow-[0_1px_2px_rgba(0,0,30,0.04),0_12px_36px_-12px_rgba(0,0,30,0.12)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-navy">
                  <img src={v.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  <span className="absolute top-4 right-4 rounded-full bg-black/45 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white">
                    {v.moment}
                  </span>
                </div>
                <blockquote className="flex-1 p-7 md:p-8">
                  <span aria-hidden="true" className="block font-ragmarom text-orange leading-none h-8" style={{ fontSize: '4rem' }}>״</span>
                  <p className="font-heebo text-navy/80 leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.1vw, 1.1rem)' }}>
                    {v.quote}
                  </p>
                </blockquote>
                <figcaption className="px-7 md:px-8 pb-7 md:pb-8 flex items-center gap-3">
                  <span className="w-8 h-1 rounded-full bg-orange" aria-hidden="true" />
                  <span>
                    <span className="block font-heebo font-bold text-navy">{v.name}</span>
                    <span className="block font-heebo text-sm text-navy/60">{v.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
