import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { vision } from '../content'
import { WRAP, reducedMotion, useSectionMotion } from '../shared'

/**
 * The vision, as one sentence someone will say one day — written out letter
 * by letter as you reach it. Under it the valley again, the bookend to the
 * hero: the end of the way seen from above, the frame descending onto the
 * place as you scroll.
 */
export default function Vision() {
  const ref = useRef(null)
  useSectionMotion(ref)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.vi-ch',
        { opacity: 0.12 },
        { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: '.vi-quote', start: 'top 80%', end: 'bottom 45%', scrub: 0.5 } }
      )
      // descend onto the place: the frame settles from high and wide to close
      gsap.fromTo(
        '.vi-land',
        { scale: 1.28, yPercent: -6 },
        { scale: 1, yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.vi-art', start: 'top bottom', end: 'bottom bottom', scrub: true } }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="vision" dir="rtl" aria-labelledby="vision-title" className="relative w-full overflow-hidden bg-wheat scroll-mt-16">
      <div className={`${WRAP} relative z-10 pt-28 md:pt-44 text-center`}>
        <p className="rv font-heebo font-medium text-navy/80" style={{ fontSize: 'clamp(1.3rem, 2.2vw, 2.1rem)' }}>
          {vision.lead}
        </p>
        <h2
          id="vision-title"
          aria-label={vision.quote}
          className="vi-quote mt-3 md:mt-4 font-ragmarom text-navy leading-[0.9] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(3.2rem, 10.5vw, 10.5rem)' }}
        >
          <span aria-hidden="true">
            {vision.quote.split(' ').map((word, wi, arr) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {[...word].map((ch, i) => (
                  <span key={i} className="vi-ch">{ch}</span>
                ))}
                {wi < arr.length - 1 && <span className="vi-ch">&nbsp;</span>}
              </span>
            ))}
          </span>
        </h2>

        <div className="mt-10 md:mt-14 mx-auto max-w-2xl space-y-3">
          {vision.lines.map((line, i) => (
            <p
              key={i}
              className={`rv font-heebo leading-relaxed ${i === 0 ? 'font-bold text-navy' : 'text-navy/80'}`}
              style={{ fontSize: i === 0 ? 'clamp(1.2rem, 1.6vw, 1.5rem)' : 'clamp(1.05rem, 1.25vw, 1.25rem)' }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* the bookend: the end of the way, seen from above — rendered from the same valley as the hero */}
      <div aria-hidden="true" className="vi-art relative mt-10 md:mt-6 h-[52svh] min-h-[320px] w-full overflow-hidden">
        <img
          src="/reef/valley-arrival.webp"
          alt=""
          loading="lazy"
          className="vi-land absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: '50% 35%',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 34%, #000 70%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, #000 34%, #000 70%, transparent 100%)',
          }}
        />
      </div>
    </section>
  )
}
