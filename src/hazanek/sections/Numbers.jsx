import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft } from 'lucide-react'
import useCountUp from '../../hooks/useCountUp'
import { numbers } from '../content'
import { goToRegister, Ltr } from '../shared'

gsap.registerPlugin(ScrollTrigger)

/**
 * Orange drench, after the home page's PulseBand: a slow RagMarom marquee,
 * then the program's numbers counting up in navy (≈7:1 on orange).
 */
export default function Numbers() {
  const ref = useRef(null)
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.set(trackRef.current, { xPercent: -50 })
      gsap.to(trackRef.current, { xPercent: 0, duration: 30, ease: 'none', repeat: -1 })
      gsap.fromTo(
        '.nb-stat',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.nb-stats', start: 'top 82%', once: true },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const row = (hidden) => (
    <div className="flex items-center shrink-0" dir="rtl" aria-hidden={hidden || undefined}>
      {[...numbers.marquee, ...numbers.marquee].map((w, i) => (
        <span key={i} className="inline-flex items-center">
          <span className="font-ragmarom text-navy whitespace-nowrap" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)', lineHeight: 1.1 }}>
            {w}
          </span>
          <span className="mx-[0.55em] w-[0.32em] h-[0.32em] rounded-full bg-navy/30 inline-block shrink-0" aria-hidden="true" />
        </span>
      ))}
    </div>
  )

  return (
    <section ref={ref} dir="rtl" aria-label="הזנק במספרים" className="relative w-full overflow-hidden bg-orange">
      <div className="pt-12 md:pt-16 pb-8 md:pb-12 overflow-hidden" dir="ltr" aria-hidden="true">
        <div ref={trackRef} className="flex w-max will-change-transform">
          {row(false)}
          {row(true)}
        </div>
      </div>

      <div className="nb-stats max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 pb-14 md:pb-20">
        <div className="border-t-2 border-navy/20 pt-10 md:pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
          {numbers.stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}

          <div className="nb-stat text-right">
            <div className="font-ragmarom text-navy leading-none tabular-nums" style={{ fontSize: 'clamp(2.6rem, 4.6vw, 4.6rem)' }}>
              {numbers.cycle.value}
            </div>
            <div className="font-heebo font-bold text-navy mt-3 text-lg">{numbers.cycle.label}</div>
            <a
              href="#register"
              onClick={goToRegister}
              className="mt-2 inline-flex items-center gap-1.5 font-heebo font-bold text-navy underline decoration-2 underline-offset-[6px] decoration-navy/30 hover:decoration-navy transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
            >
              שריינו מקום
              <ArrowLeft size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ value, suffix = '', label, sub }) {
  const [n, ref] = useCountUp(value, 1.6)
  return (
    <div ref={ref} className="nb-stat text-right">
      <div className="font-ragmarom text-navy leading-none tabular-nums" style={{ fontSize: 'clamp(3.4rem, 6vw, 6rem)' }}>
        <Ltr>
          {n}
          {suffix && <span className="text-navy/55" style={{ fontSize: '0.55em' }}>{suffix}</span>}
        </Ltr>
      </div>
      <div className="font-heebo font-bold text-navy mt-3 text-lg">{label}</div>
      <div className="font-heebo text-navy/75 mt-1 leading-snug">{sub}</div>
    </div>
  )
}
