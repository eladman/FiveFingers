import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReveal from '../../hooks/useReveal'
import { day } from '../content'
import { Head, WRAP } from '../shared'

gsap.registerPlugin(ScrollTrigger)

/**
 * A day here, as an experience rather than a schedule: the verbs lead, the
 * hours are small. On wide screens a photo frame stays put while the day
 * scrolls past it and changes with the moment; on phones each photo sits
 * with the moment it belongs to. The orange line is "the way", filling as
 * the day goes on.
 */
export default function Day() {
  const ref = useReveal({ selector: '.rv', y: 36, stagger: 0.06 })
  const listRef = useRef(null)
  const [active, setActive] = useState(0)

  // Which moment is at the middle of the screen.
  useEffect(() => {
    const items = listRef.current?.querySelectorAll('[data-stop]')
    if (!items?.length || !('IntersectionObserver' in window)) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.stop))
        })
      },
      { rootMargin: '-48% 0px -48% 0px' }
    )
    items.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // The line fills from the first moment to the last, tied to scroll.
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const fill = list.querySelector('.rf-day-fill')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(fill, { scaleY: 1 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: list, start: 'top 55%', end: 'bottom 55%', scrub: 0.4 } }
      )
    }, list)
    return () => ctx.revert()
  }, [])

  const activeImage = day.stops[active].image

  return (
    <section ref={ref} id="day" dir="rtl" className="relative w-full bg-white scroll-mt-16">
      <div className={`${WRAP} py-20 md:py-32`}>
        <Head kicker={day.kicker} title={day.title} />

        <div className="mt-12 md:mt-20 grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-24">
          <ol ref={listRef} className="relative">
            {/* the way */}
            <span aria-hidden="true" className="absolute top-3 bottom-3 right-[7px] w-px bg-navy/10" />
            <span aria-hidden="true" className="rf-day-fill absolute top-3 bottom-3 right-[6px] w-[3px] rounded-full bg-orange origin-top" />

            {day.stops.map((stop, i) => {
              const on = i === active
              const img = day.images[stop.image]
              return (
                <li key={stop.time} data-stop={i} className="relative pr-10 md:pr-14 pb-10 md:pb-14 lg:pb-20 last:pb-0">
                  <span
                    aria-hidden="true"
                    className={`absolute right-0 top-[0.7rem] w-[15px] h-[15px] rounded-full border-[3px] transition-colors duration-300 ${
                      i <= active ? 'bg-orange border-orange' : 'bg-white border-navy/25'
                    }`}
                  />
                  <div>
                    <p className="font-mono text-sm tabular-nums text-navy/65" dir="ltr" style={{ textAlign: 'right' }}>
                      {stop.time}
                    </p>
                    <h3
                      className={`mt-1 font-ragmarom leading-none transition-colors duration-500 ease-brand ${on ? 'text-navy' : 'text-navy lg:text-navy/45'}`}
                      style={{ fontSize: 'clamp(2.4rem, 4.4vw, 4.4rem)' }}
                    >
                      {stop.verb}
                    </h3>
                    <p className="mt-3 font-heebo text-navy/70 leading-relaxed" style={{ fontSize: 'clamp(1.05rem, 1.3vw, 1.3rem)' }}>
                      {stop.text}
                    </p>
                  </div>

                  {/* phones + tablets: the photo travels with its moment */}
                  {stop.show && (
                    <div className="lg:hidden mt-6 overflow-hidden rounded-3xl aspect-[4/3] ring-1 ring-black/5 shadow-[0_24px_60px_rgba(0,0,30,0.14)]">
                      <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  )}
                </li>
              )
            })}
          </ol>

          {/* wide screens: one frame that stays, and changes with the day */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative overflow-hidden rounded-[2rem] h-[min(72vh,640px)] bg-surface-2 ring-1 ring-black/5 shadow-[0_40px_100px_rgba(0,0,30,0.16)]">
                {Object.entries(day.images).map(([key, img]) => (
                  <img
                    key={key}
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    data-on={key === activeImage}
                    aria-hidden={key !== activeImage}
                    className="rf-day-photo absolute inset-0 w-full h-full object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <p
          className="rv mt-20 md:mt-28 mx-auto max-w-5xl text-center font-ragmarom text-navy leading-[0.98] tracking-tight text-balance"
          style={{ fontSize: 'clamp(2.3rem, 5.4vw, 5rem)' }}
        >
          {day.closing}
        </p>
      </div>
    </section>
  )
}
