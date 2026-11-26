import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { day } from '../content'
import { Title, WRAP, reducedMotion, useSectionMotion } from '../shared'

const toMin = (t) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}
const START = toMin(day.stops[0].time)
const END = toMin(day.stops[day.stops.length - 1].time)

/** The sun's arc from the first moment of the day to the last. */
function SunArc({ sunRef, className = '' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 240 120" className={className} fill="none">
      <path d="M12 116 A 108 108 0 0 1 228 116" stroke="rgba(13,27,75,0.16)" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" />
      <path className="dy-arc" d="M12 116 A 108 108 0 0 1 228 116" pathLength="1" strokeDasharray="1" strokeDashoffset="1" stroke="#ff8714" strokeWidth="3" strokeLinecap="round" />
      <line x1="0" y1="116" x2="240" y2="116" stroke="rgba(13,27,75,0.22)" strokeWidth="2" />
      <g ref={sunRef} style={{ transform: 'translate(12px, 116px)' }}>
        <circle r="13" fill="rgba(255,135,20,0.22)" />
        <circle r="7.5" fill="#ff8714" />
      </g>
    </svg>
  )
}

/**
 * A day here, as an experience rather than a schedule. A sun crosses its arc
 * from the first moment to the last as you scroll; the clock reads the
 * moment you are in; the photograph is that moment; and the light of the
 * whole section warms from morning to afternoon.
 */
export default function Day() {
  const ref = useRef(null)
  const listRef = useRef(null)
  const sunWide = useRef(null)
  const sunNarrow = useRef(null)
  const [active, setActive] = useState(0)
  useSectionMotion(ref)

  // which moment is in the middle of the screen
  useEffect(() => {
    const items = listRef.current?.querySelectorAll('[data-stop]')
    if (!items?.length || !('IntersectionObserver' in window)) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.stop))),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    items.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // the sun, the arc and the light follow the scroll continuously
  useLayoutEffect(() => {
    const el = ref.current
    const place = (p) => {
      const a = Math.PI * (1 - p)
      const x = 120 + Math.cos(a) * 108
      const y = 116 - Math.sin(a) * 108
      ;[sunWide.current, sunNarrow.current].forEach((g) => g && (g.style.transform = `translate(${x}px, ${y}px)`))
      el.querySelectorAll('.dy-arc').forEach((arc) => (arc.style.strokeDashoffset = String(1 - p)))
    }
    if (reducedMotion()) {
      place(1)
      return
    }
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 55%',
          end: 'bottom 55%',
          scrub: 0.5,
          onUpdate: (self) => place(self.progress),
        },
      })
      gsap.fromTo('.dy-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: listRef.current, start: 'top 55%', end: 'bottom 55%', scrub: 0.4 } })
    }, el)
    place(0)
    return () => ctx.revert()
  }, [])

  const stop = day.stops[active]
  const activeImage = stop.image
  const pct = (toMin(stop.time) - START) / (END - START)

  return (
    <section ref={ref} id="day" dir="rtl" aria-labelledby="day-title" className="relative w-full scroll-mt-16"
      style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 18%, #f6ead2 100%)' }}>
      <div className={`${WRAP} py-24 md:py-36`}>
        <Title id="day-title" title={day.title} />

        {/* phones: a small sky that stays with you through the day */}
        <div className="lg:hidden sticky top-16 z-10 -mx-5 sm:-mx-8 mt-10 flex items-center justify-between gap-4 bg-white/[0.97] px-5 sm:px-8 py-3 shadow-[0_1px_0_rgba(13,27,75,0.08)]">
          <span className="font-mono text-2xl tabular-nums text-navy" dir="ltr">{stop.time}</span>
          <SunArc sunRef={sunNarrow} className="h-10 w-20" />
        </div>

        <div className="mt-10 md:mt-20 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-10 lg:gap-24">
          <ol ref={listRef} className="relative">
            <span aria-hidden="true" className="absolute top-3 bottom-3 right-[7px] w-px bg-navy/15" />
            <span aria-hidden="true" className="dy-fill absolute top-3 bottom-3 right-[6px] w-[3px] origin-top rounded-full bg-orange" />
            {day.stops.map((s, i) => {
              const on = i === active
              const img = day.images[s.image]
              return (
                <li key={s.time} data-stop={i} className="relative pr-10 md:pr-14 pb-12 md:pb-16 lg:pb-24 last:pb-0">
                  <span
                    aria-hidden="true"
                    className={`absolute right-0 top-[0.55rem] h-[15px] w-[15px] rounded-full border-[3px] transition-colors duration-300 ${
                      i <= active ? 'border-orange bg-orange' : 'border-navy/25 bg-white'
                    }`}
                  />
                  <p className="font-mono text-sm tabular-nums text-navy/65" dir="ltr" style={{ textAlign: 'right' }}>
                    {s.time}
                  </p>
                  <h3
                    className={`mt-1 font-ragmarom leading-none transition-[color,transform] duration-700 ease-brand ${on ? 'text-navy lg:-translate-x-2' : 'text-navy lg:text-navy/55'}`}
                    style={{ fontSize: 'clamp(2.6rem, 5vw, 5rem)' }}
                  >
                    {s.verb}
                  </h3>
                  <p className="mt-3 font-heebo text-navy/75 leading-relaxed" style={{ fontSize: 'clamp(1.05rem, 1.3vw, 1.3rem)' }}>
                    {s.text}
                  </p>
                  {s.show && (
                    <div className="lg:hidden mt-6 overflow-hidden rounded-3xl aspect-[4/3] shadow-[0_24px_60px_-18px_rgba(8,16,40,0.3)]">
                      <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
                    </div>
                  )}
                </li>
              )
            })}
          </ol>

          {/* wide screens: the sky, the clock and the moment */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="flex items-end justify-between gap-6">
                <span className="font-mono tabular-nums text-navy leading-none" dir="ltr" style={{ fontSize: 'clamp(3rem, 4.4vw, 4.4rem)' }}>
                  {stop.time}
                </span>
                <SunArc sunRef={sunWide} className="w-[min(240px,50%)]" />
              </div>
              <div className="mt-5 relative overflow-hidden rounded-[1.75rem] h-[min(60vh,560px)] bg-surface-2 shadow-[0_50px_110px_-34px_rgba(8,16,40,0.4)]">
                {Object.entries(day.images).map(([key, img]) => (
                  <img
                    key={key}
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    data-on={key === activeImage}
                    aria-hidden={key !== activeImage}
                    className="rf-day-photo absolute inset-0 h-full w-full object-cover"
                  />
                ))}
                {/* the hour, as light across the frame */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 transition-[background] duration-1000"
                  style={{ background: `linear-gradient(${200 - pct * 140}deg, rgba(255,190,110,${0.08 + pct * 0.16}), rgba(255,190,110,0) 55%)` }}
                />
              </div>
            </div>
          </div>
        </div>

        <p
          className="rv mt-24 md:mt-32 mx-auto max-w-5xl text-center font-ragmarom text-navy leading-[0.98] tracking-[-0.015em] text-balance"
          style={{ fontSize: 'clamp(2.4rem, 5.4vw, 5rem)' }}
        >
          {day.closing}
        </p>
      </div>
    </section>
  )
}
