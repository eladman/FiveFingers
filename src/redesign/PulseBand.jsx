import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useCountUp from '../hooks/useCountUp'

gsap.registerPlugin(ScrollTrigger)

/**
 * Full orange drench — the movement's pulse. An endless value marquee in
 * RagMarom rolls across the band, with the movement's real numbers
 * counting up underneath. Navy on orange (≈7:1) throughout.
 */

const WORDS = ['מצוינות מקצועית', 'הסתגלות', 'גריט', 'אחריות יוזמת', 'שייכות ומשמעות']

const STATS = [
  { value: 12, suffix: '', label: 'שנות פעילות' },
  { value: 5000, suffix: '+', label: 'בוגרים, חניכים וחניכות' },
  { value: 100, suffix: '+', label: 'שיתופי פעולה' },
]

function MarqueeRow() {
  const content = WORDS.map((w, i) => (
    <span key={i} className="inline-flex items-center">
      <span className="font-ragmarom text-navy whitespace-nowrap" style={{ fontSize: 'clamp(2.6rem, 6vw, 6rem)', lineHeight: 1.1 }}>
        {w}
      </span>
      <span className="mx-[0.6em] w-[0.35em] h-[0.35em] rounded-full bg-navy/30 inline-block shrink-0" aria-hidden="true" />
    </span>
  ))
  return content
}

export default function PulseBand() {
  const ref = useRef(null)
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (!reduced) {
        // seamless loop — track holds two identical halves; each cycle travels
        // exactly one half-width, flowing rightward (RTL reading direction)
        gsap.set(trackRef.current, { xPercent: -50 })
        gsap.to(trackRef.current, {
          xPercent: 0,
          duration: 36,
          ease: 'none',
          repeat: -1,
        })

        gsap.fromTo('.pb-stat',
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.pb-stats', start: 'top 82%', once: true },
          }
        )
      }
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      dir="rtl"
      aria-label="הערכים והמספרים של התנועה"
      className="relative w-full overflow-hidden bg-orange"
    >
      {/* marquee */}
      <div className="pt-14 md:pt-20 pb-10 md:pb-14 overflow-hidden" dir="ltr">
        <div
          ref={trackRef}
          className="flex w-max will-change-transform"
        >
          <div className="flex items-center shrink-0" dir="rtl">
            <MarqueeRow />
          </div>
          <div className="flex items-center shrink-0" dir="rtl" aria-hidden="true">
            <MarqueeRow />
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="pb-stats max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 pb-16 md:pb-24">
        <div className="border-t-2 border-navy/20 pt-10 md:pt-14 grid grid-cols-1 sm:grid-cols-3 gap-y-10 gap-x-8">
          {STATS.map((s) => (
            <PulseStat key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PulseStat({ value, suffix, label }) {
  const [n, ref] = useCountUp(value)
  return (
    <div ref={ref} className="pb-stat text-center sm:text-right">
      <div
        className="font-ragmarom text-navy leading-none tabular-nums"
        style={{ fontSize: 'clamp(3.4rem, 6.5vw, 6.5rem)' }}
      >
        {n.toLocaleString('he-IL')}{suffix}
      </div>
      <div className="font-heebo font-semibold text-navy/75 mt-3" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.2rem)' }}>
        {label}
      </div>
    </div>
  )
}
