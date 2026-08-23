import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft } from 'lucide-react'
import Button from '../../../components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

const REGION_ORDER = ['מרכז', 'שרון', 'צפון']

/**
 * Details — where this age band trains, as an editorial directory. The
 * locations are pre-filtered per band, so a parent only sees cities with a
 * group for their kid's grade. A pulled figure opens the section; regions
 * are big headers; cities are clean top-hairline blocks — no drop-shadow
 * cards, no filled panels. Whitespace and rules do the sorting.
 */
export default function AgeDetails({ page, locations, onRegister }) {
  const ref = useRef(null)
  const { details } = page

  const regions = REGION_ORDER
    .map((region) => ({
      region,
      locations: locations.filter((l) => l.region === region),
    }))
    .filter((r) => r.locations.length > 0)

  const cityCount = locations.length
  const groupCount = locations.reduce((n, l) => n + l.teams.length, 0)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.agd-head > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.09, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
        }
      )
      gsap.utils.toArray('.agd-region', ref.current).forEach((block) => {
        gsap.fromTo(block.querySelectorAll('.agd-city'),
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.05, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: block, start: 'top 82%', once: true },
          }
        )
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id={`liabah/${page.id}-details`}
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-surface"
    >
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 pt-24 md:pt-36 pb-20 md:pb-32">

        {/* opening + pulled figure */}
        <div className="agd-head grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 items-end">
          <div className="lg:col-span-7 max-w-3xl">
            <p className="ds-eyebrow text-orange-ink">מיקומים וצוותים</p>
            <h2 className="ds-section-title text-navy mt-4">{details.heading}</h2>
            <p className="font-heebo text-navy/60 mt-6 leading-[1.65]" style={{ fontSize: 'clamp(1.15rem, 1.6vw, 1.5rem)' }}>
              {details.lead}
            </p>
          </div>
          <div className="lg:col-span-5 flex items-end gap-x-10">
            <div>
              <span className="block font-ragmarom text-navy leading-none tabular-nums" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
                {cityCount}
              </span>
              <span className="block font-heebo text-navy/55 mt-2 text-base md:text-lg">יישובים</span>
            </div>
            <div className="w-px self-stretch bg-navy/12" aria-hidden="true" />
            <div>
              <span className="block font-ragmarom text-navy leading-none tabular-nums" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
                {groupCount}
              </span>
              <span className="block font-heebo text-navy/55 mt-2 text-base md:text-lg">קבוצות</span>
            </div>
          </div>
        </div>

        {/* regions */}
        <div className="mt-16 md:mt-24 flex flex-col gap-16 md:gap-24">
          {regions.map(({ region, locations: regionLocs }) => (
            <div key={region} className="agd-region">
              {/* region header */}
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 pb-6 border-b-2 border-navy/85">
                <h3 className="font-ragmarom text-navy leading-none" style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3rem)' }}>
                  אזור ה{region}
                </h3>
              </div>

              {/* cities — top-hairline editorial blocks, no shadow cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 md:gap-x-14">
                {regionLocs.map((loc) => (
                  <div key={loc.id} className="agd-city pt-6 pb-7 border-b border-navy/10">
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="font-heebo font-bold text-navy" style={{ fontSize: 'clamp(1.2rem, 1.5vw, 1.45rem)' }}>
                        {loc.city}
                      </h4>
                      <span className="font-heebo text-navy/40 text-sm tabular-nums shrink-0">
                        {loc.teams.length} קבוצות
                      </span>
                    </div>
                    <p className="font-heebo text-navy/55 text-sm md:text-[0.95rem] mt-1.5">
                      {loc.venue ? `${loc.venue} · ` : ''}ימי {loc.days}
                    </p>
                    {loc.manager && (
                      <p className="font-heebo text-navy/45 text-xs md:text-sm mt-0.5">
                        מנהל/ת אזור · {loc.manager}
                      </p>
                    )}
                    <ul className="mt-3.5 flex flex-col gap-1.5">
                      {loc.teams.map((team) => (
                        <li key={team.name} className="font-heebo text-navy/70 text-[0.9rem] md:text-[0.95rem] flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange/70 shrink-0" aria-hidden="true" />
                          <span className="flex-1 min-w-0">{team.name}</span>
                          <span className="shrink-0 flex items-center gap-2 text-navy/40 text-xs md:text-sm">
                            {team.venue && <span>{team.venue}</span>}
                            {team.hours && <span className="tabular-nums">{team.hours}</span>}
                            {team.note && <span className="text-orange font-semibold">{team.note}</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* didn't find your city — a quiet editorial closer, not a card */}
        <div className="mt-20 md:mt-28 pt-10 border-t-2 border-navy/85 flex flex-col md:flex-row items-start md:items-end justify-between gap-7">
          <div className="max-w-xl">
            <h3 className="font-ragmarom text-navy leading-tight" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.3rem)' }}>
              לא מצאתם קבוצה קרובה?
            </h3>
            <p className="font-heebo text-navy/60 mt-3" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.15rem)' }}>
              אנחנו גדלים כל שנה. השאירו פרטים ונעדכן אתכם/ן כשנפתחת קבוצה באזורכם.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 shrink-0">
            <Button variant="primary" size="md" onClick={onRegister}>
              השאירו פרטים
            </Button>
            <a
              href="#liabah-map"
              className="tap-safe group/link inline-flex items-center gap-2 font-heebo font-bold text-navy hover:text-orange-ink transition-colors"
            >
              למפת כל הקבוצות
              <ArrowLeft size={18} className="text-orange-ink transition-transform duration-300 group-hover/link:-translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
