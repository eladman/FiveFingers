import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowUpLeft, MapPin } from 'lucide-react'
import { LINKS, valley } from '../content'
import { OutlineLink, Para, Title, WRAP, reducedMotion, useSectionMotion } from '../shared'

/**
 * The valley: the march with flags through the fields, full width, drifting
 * a little slower than the page. Then where the place stands, and how to get there.
 */
export default function Valley() {
  const ref = useRef(null)
  const frameRef = useRef(null)
  useSectionMotion(ref)

  useLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.va-img',
        { yPercent: -6 },
        { yPercent: 6, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="valley" dir="rtl" aria-labelledby="valley-title" className="relative w-full overflow-hidden bg-white scroll-mt-16">
      <figure ref={frameRef} className="relative h-[78svh] min-h-[440px] w-full overflow-hidden bg-surface-2">
        <img
          src={valley.image}
          alt={valley.imageAlt}
          loading="lazy"
          className="va-img absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover will-change-transform"
          style={{ objectPosition: '50% 22%' }}
        />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-white/60 via-white/20 to-transparent" />
        <div className={`${WRAP} relative h-full pt-12 md:pt-16`}>
          <Title id="valley-title" title={valley.title} size="lg" accent />
        </div>
        <figcaption className="absolute bottom-5 left-5 md:bottom-8 md:left-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-heebo text-sm font-bold text-navy shadow-[0_12px_30px_-10px_rgba(8,16,40,0.4)]">
          <MapPin size={15} className="text-orange-ink" aria-hidden="true" />
          {valley.place}
        </figcaption>
      </figure>

      <div className={`${WRAP} py-16 md:py-24`}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10 lg:gap-24 items-end">
          <div className="space-y-5 max-w-2xl">
            {valley.paragraphs.map((p, i) => (
              <Para key={i} lead={i === 0}>{p}</Para>
            ))}
          </div>
          <div className="rv lg:justify-self-end">
            <OutlineLink href={LINKS.maps} external icon={ArrowUpLeft}>
              {valley.cta}
            </OutlineLink>
          </div>
        </div>
      </div>
    </section>
  )
}
