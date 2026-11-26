import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowDown } from 'lucide-react'
import Button from '../../components/ui/Button'
import { hero } from '../content'
import { OutlineLink, PathRule, WRAP } from '../shared'

/**
 * No photo: the name, large, on daylight white — and along the bottom the
 * valley's ridges with the way drawing itself across them. The vision
 * section near the end of the page closes on the same motif.
 */
export default function Hero() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-el',
        { y: 44, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.09, duration: 1.2, ease: 'power3.out', delay: 0.1 }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="top" dir="rtl" className="relative w-full overflow-hidden bg-white">
      <div className="relative min-h-[100svh] flex flex-col">
        {/* Valley light: a breath of wheat and field green, no more */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-[20%] -left-[10%] w-[55vw] h-[70vh] rounded-full bg-wheat blur-[120px]" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-[-25%] right-[-10%] w-[45vw] h-[55vh] rounded-full bg-valley-soft/70 blur-[140px]" />

        <div className={`${WRAP} relative z-10 flex-1 flex flex-col items-center justify-center text-center pt-28 md:pt-32 pb-6`}>
          <p className="hero-el ds-eyebrow text-valley mb-5 md:mb-6">{hero.kicker}</p>
          <h1
            className="hero-el font-ragmarom text-navy leading-[0.85] tracking-tight"
            style={{ fontSize: 'clamp(5.5rem, 16vw, 15rem)' }}
          >
            {hero.title}
          </h1>
          <PathRule draw width={132} className="mt-5 md:mt-7 mx-auto" />
          <p
            className="hero-el mt-6 md:mt-8 font-heebo font-medium text-navy leading-snug"
            style={{ fontSize: 'clamp(1.35rem, 2.1vw, 2rem)' }}
          >
            {hero.subtitle}
          </p>
          <p className="hero-el mt-3 font-heebo text-navy/65" style={{ fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)' }}>
            {hero.small}
          </p>

          <div className="hero-el mt-9 md:mt-11 flex flex-wrap items-center justify-center gap-3.5">
            <Button href={hero.primary.href} size="md" icon={ArrowDown}>
              {hero.primary.label}
            </Button>
            <OutlineLink href={hero.secondary.href}>{hero.secondary.label}</OutlineLink>
          </div>
        </div>

        {/* Ridges + the way */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          className="relative block w-full h-[140px] sm:h-[190px] md:h-[240px]"
          fill="none"
        >
          <path d="M0 150 C 200 95, 340 125, 520 92 S 820 50, 1000 88 S 1260 132, 1440 80 L1440 300 L0 300 Z" fill="#eadfc6" />
          <path d="M0 205 C 220 160, 400 200, 600 170 S 900 125, 1080 165 S 1330 195, 1440 160 L1440 300 L0 300 Z" fill="#d5dcc1" />
          <path d="M0 255 C 240 225, 450 262, 660 236 S 1000 200, 1200 236 S 1380 252, 1440 232 L1440 300 L0 300 Z" fill="#b4c7a6" />
          <path
            pathLength="1"
            className="rf-path rf-path-draw"
            d="M1470 290 C 1300 270, 1210 232, 1060 236 S 820 270, 680 228 S 540 160, 430 152 S 260 120, 170 92 S 40 52, -30 30"
            stroke="#ff8714"
            strokeWidth="5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </section>
  )
}
