import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin } from 'lucide-react'
import useReveal from '../../hooks/useReveal'
import { LINKS, valley } from '../content'
import { Head, OutlineLink, Para, WRAP } from '../shared'

gsap.registerPlugin(ScrollTrigger)

/** The valley: one wide, quiet frame of the fields, then where the place stands. */
export default function Valley() {
  const ref = useReveal({ selector: '.rv', y: 40, stagger: 0.08 })
  const frameRef = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.valley-drift',
        { yPercent: -6 },
        { yPercent: 6, ease: 'none', scrollTrigger: { trigger: frameRef.current, start: 'top bottom', end: 'bottom top', scrub: true } }
      )
    }, frameRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="valley" dir="rtl" className="relative w-full overflow-hidden bg-white scroll-mt-16">
      <div className={`${WRAP} py-20 md:py-32`}>
        <figure ref={frameRef} className="rv relative overflow-hidden rounded-[2rem] aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/10] bg-surface-2 ring-1 ring-black/5 shadow-[0_40px_100px_rgba(0,0,30,0.16)]">
          <img
            src={valley.image}
            alt={valley.imageAlt}
            loading="lazy"
            className="valley-drift absolute inset-x-0 -top-[8%] w-full h-[116%] object-cover"
            style={{ objectPosition: '50% 42%' }}
          />
          <figcaption className="absolute bottom-4 right-4 md:bottom-6 md:right-6 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-xs md:text-sm font-semibold text-navy shadow-[0_8px_24px_rgba(0,0,30,0.12)]">
            <MapPin size={15} className="text-valley" aria-hidden="true" />
            {valley.place}
          </figcaption>
        </figure>

        <div className="mt-12 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
          <Head kicker={valley.kicker} title={valley.title} />
          <div className="max-w-xl lg:pt-12">
            <div className="space-y-5">
              {valley.paragraphs.map((p, i) => (
                <Para key={i} lead={i === 0}>{p}</Para>
              ))}
            </div>
            <div className="rv mt-9">
              <OutlineLink href={LINKS.maps} external icon={MapPin}>
                {valley.cta}
              </OutlineLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
