import useReveal from '../../hooks/useReveal'
import { why } from '../content'
import { Head, Para, WRAP } from '../shared'

/**
 * Why the place exists. The words sit on white; the valley rises out of the
 * white underneath them (the photo's pale dusk sky is masked into the page).
 */
export default function Why() {
  const ref = useReveal({ selector: '.rv', y: 44, stagger: 0.09 })

  return (
    <section ref={ref} id="why" dir="rtl" className="relative w-full overflow-hidden bg-white scroll-mt-16">
      <div className={`${WRAP} pt-20 md:pt-32`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
          <Head kicker={why.kicker} title={why.title} />
          <div className="space-y-5 max-w-xl lg:pt-12">
            {why.paragraphs.map((p, i) => (
              <Para key={i} lead={i === 0}>{p}</Para>
            ))}
          </div>
        </div>

        <p
          className="rv mt-20 md:mt-28 text-center font-ragmarom text-navy leading-[0.92] tracking-tight"
          style={{ fontSize: 'clamp(3rem, 9vw, 9rem)' }}
        >
          <span className="block">{why.statement[0]}</span>
          <span className="block text-orange-ink">{why.statement[1]}</span>
        </p>

        <figure className="rv relative -mt-6 md:-mt-16 overflow-hidden rounded-b-[2rem] aspect-[4/5] sm:aspect-[3/2] lg:aspect-[16/9]">
          <img
            src={why.image}
            alt={why.imageAlt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: '50% 30%',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 42%)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, #000 42%)',
            }}
          />
        </figure>
      </div>
      <div className="h-16 md:h-24" />
    </section>
  )
}
