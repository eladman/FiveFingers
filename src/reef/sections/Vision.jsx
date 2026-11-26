import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReveal from '../../hooks/useReveal'
import { vision } from '../content'
import { WRAP } from '../shared'

gsap.registerPlugin(ScrollTrigger)

/**
 * The vision, as one sentence someone will say one day. Behind it the motif
 * from the movement's own materials: ridgelines, and the way drawn across
 * them in orange as the section scrolls in.
 */
export default function Vision() {
  const ref = useReveal({ selector: '.rv', y: 44, stagger: 0.1 })
  const artRef = useRef(null)

  useLayoutEffect(() => {
    const road = artRef.current?.querySelector('.vision-road')
    if (!road) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        road,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: artRef.current, start: 'top 85%', end: 'bottom 55%', scrub: 0.6 } }
      )
    }, artRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="vision" dir="rtl" className="relative w-full overflow-hidden bg-wheat scroll-mt-16">
      <div className={`${WRAP} relative z-10 pt-24 md:pt-40 text-center`}>
        <p className="rv ds-eyebrow text-valley mb-6">{vision.kicker}</p>
        <p className="rv font-heebo font-medium text-navy/80" style={{ fontSize: 'clamp(1.3rem, 2.2vw, 2.1rem)' }}>
          {vision.lead}
        </p>
        <h2
          className="rv mt-3 md:mt-4 font-ragmarom text-navy leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(3.2rem, 10.5vw, 10.5rem)' }}
        >
          {vision.quote}
        </h2>

        <div className="mt-10 md:mt-14 mx-auto max-w-2xl space-y-3">
          {vision.lines.map((line, i) => (
            <p
              key={i}
              className={`rv font-heebo leading-relaxed ${i === 0 ? 'font-bold text-navy' : 'text-navy/75'}`}
              style={{ fontSize: i === 0 ? 'clamp(1.2rem, 1.6vw, 1.5rem)' : 'clamp(1.05rem, 1.25vw, 1.25rem)' }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Ridgelines + the way */}
      <svg
        ref={artRef}
        aria-hidden="true"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        className="relative block w-full h-[200px] sm:h-[280px] md:h-[380px] mt-6 md:mt-0"
        fill="none"
      >
        <path d="M0 250 C 180 190, 300 215, 470 175 S 760 120, 930 160 S 1230 215, 1440 150 L1440 420 L0 420 Z" fill="#eadfc6" />
        <path d="M0 305 C 200 255, 380 300, 560 262 S 880 205, 1060 250 S 1320 290, 1440 240 L1440 420 L0 420 Z" fill="#d5dcc1" />
        <path d="M0 360 C 220 322, 420 365, 640 334 S 980 290, 1180 332 S 1360 352, 1440 322 L1440 420 L0 420 Z" fill="#b4c7a6" />
        <path
          className="vision-road"
          pathLength="1"
          strokeDasharray="1"
          d="M1470 395 C 1280 372, 1190 318, 1040 322 S 800 372, 660 318 S 520 232, 410 222 S 250 176, 160 128 S 40 84, -30 40"
          stroke="#ff8714"
          strokeWidth="5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </section>
  )
}
