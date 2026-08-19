import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/**
 * The year plan — how the season is structured and when the peaks land.
 * A dark editorial ledger: oversized month labels on the right, the event
 * on the left, hairline rules between. אירוע שיא moments get an orange
 * rule and a star tag so the season's shape reads in a glance — no cards.
 */
export default function AgeYearPlan({ page }) {
  const ref = useRef(null)
  const { yearPlan } = page

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.agy-head > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
        }
      )
      gsap.utils.toArray('.agy-item', ref.current).forEach((item) => {
        gsap.fromTo(item.querySelectorAll('.agy-el'),
          { y: 26, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.05, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 88%', once: true },
          }
        )
        gsap.fromTo(item.querySelector('.agy-rule'),
          { scaleX: 0 },
          {
            scaleX: 1, duration: 1.1, ease: 'power3.out', transformOrigin: 'right center',
            scrollTrigger: { trigger: item, start: 'top 90%', once: true },
          }
        )
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id={`liabah/${page.id}-year`}
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-navy-deep text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-light/30 via-transparent to-transparent" />
      <div className="pointer-events-none absolute top-[12%] right-[-12%] w-[45vw] h-[45vh] rounded-full bg-orange/10 blur-[170px]" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 pt-24 md:pt-36 pb-24 md:pb-32">

        <div className="agy-head max-w-4xl">
          <p className="ds-eyebrow text-orange">תוכנית שנתית</p>
          <h2 className="ds-section-title text-white mt-4">{yearPlan.heading}</h2>
          <p className="font-heebo text-white/60 mt-6 leading-[1.65] max-w-2xl" style={{ fontSize: 'clamp(1.15rem, 1.7vw, 1.6rem)' }}>
            {yearPlan.lead}
          </p>
        </div>

        {/* editorial timeline */}
        <ol className="mt-14 md:mt-20">
          {yearPlan.items.map((item) => (
            <li
              key={`${item.month}-${item.title}`}
              className="agy-item relative pt-8 md:pt-11 pb-8 md:pb-11"
            >
              <span
                className={`agy-rule absolute top-0 right-0 left-0 h-px origin-right ${item.big ? 'bg-orange/55' : 'bg-white/12'}`}
                aria-hidden="true"
              />
              <div className="grid grid-cols-[5rem_1fr] md:grid-cols-[13rem_1fr] gap-x-5 md:gap-x-12 items-baseline">
                {/* month */}
                <span
                  className={`agy-el font-ragmarom leading-none ${item.big ? 'text-orange' : 'text-white/40'}`}
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.6rem)' }}
                >
                  {item.month}
                </span>

                {/* event */}
                <div className="max-w-2xl">
                  {item.big && (
                    <span className="agy-el inline-flex items-center gap-1.5 font-heebo text-orange text-sm font-semibold mb-2.5">
                      <Star size={14} fill="currentColor" aria-hidden="true" />
                      אירוע שיא
                    </span>
                  )}
                  <h3
                    className={`agy-el font-ragmarom leading-tight ${item.big ? 'text-white' : 'text-white/85'}`}
                    style={{ fontSize: item.big ? 'clamp(1.7rem, 3vw, 2.6rem)' : 'clamp(1.35rem, 2.1vw, 1.9rem)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="agy-el font-heebo text-white/55 leading-[1.75] mt-2.5" style={{ fontSize: 'clamp(1rem, 1.1vw, 1.15rem)' }}>
                    {item.text}
                  </p>
                </div>
              </div>
            </li>
          ))}
          <li aria-hidden="true"><span className="block h-px bg-white/12" /></li>
        </ol>

        <p className="mt-12 font-heebo text-white/40 text-sm md:text-base max-w-2xl">
          {yearPlan.note}
        </p>
      </div>
    </section>
  )
}
