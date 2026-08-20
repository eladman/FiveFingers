import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { journey } from '../../data/academyData'
import { MuseumHeading, Atmosphere } from './shared'

gsap.registerPlugin(ScrollTrigger)

/**
 * The year as a cinematic horizontal "gallery walk". On desktop (with motion) the
 * section pins and the chapter track translates horizontally as you scroll. On
 * mobile or with prefers-reduced-motion it degrades to a plain vertical stack.
 */
export default function AcademyJourney() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!mql.matches || reduced) return // vertical fallback — no JS

    const section = sectionRef.current
    const track = trackRef.current

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - section.clientWidth

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // Progress bar
      gsap.fromTo('.jr-progress', { scaleX: 0 }, {
        scaleX: 1, ease: 'none', transformOrigin: 'right',
        scrollTrigger: {
          trigger: section, start: 'top top', end: () => `+=${getDistance()}`, scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} dir="rtl" id="academy-year" className="relative w-full bg-surface-2 overflow-hidden">
      <Atmosphere />
      <div className="relative z-10 lg:h-dvh flex flex-col">
        <div className="max-w-5xl mx-auto w-full px-6 md:px-10 pt-24 lg:pt-28 pb-8">
          <MuseumHeading kicker="המסע" title="שנה במכינה" lead="מספטמבר ועד הסיום, תחנות בשנה אחת." align="start" />
        </div>

        {/* Track: horizontal on lg (translated by GSAP), vertical stack otherwise.
            The overflow container is LTR so the track anchors to the left and
            starts at chapter 01 (an LTR track inside the RTL section would anchor
            right and start mid-way). */}
        <div dir="ltr" className="flex-1 flex items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex flex-col lg:flex-row gap-6 lg:gap-10 px-6 md:px-10 lg:pl-[max(2.5rem,calc((100vw-64rem)/2))] w-full lg:w-max pb-16 lg:pb-0"
          >
            {journey.map((item, i) => (
              <article
                key={item.period}
                dir="rtl"
                className="shrink-0 w-full lg:w-[clamp(20rem,32vw,30rem)] bg-white border border-navy/12 rounded-[1.5rem] p-8 md:p-10"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-ragmarom text-orange/80 leading-none" style={{ fontSize: 'clamp(2.4rem, 3vw, 3.4rem)' }}>
                    {i + 1}
                  </span>
                  <span className="font-heebo font-semibold text-navy/45 text-sm" style={{ letterSpacing: '0.06em' }}>
                    {item.period}
                  </span>
                </div>
                <div className="mt-6 h-px w-full bg-navy/12" />
                <h3 className="ds-card-title text-navy mt-6">
                  {item.title}
                </h3>
                <p className="font-heebo text-navy/65 leading-relaxed mt-3" style={{ fontSize: '1.02rem' }}>
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Progress bar (desktop horizontal only) */}
        <div className="hidden lg:block max-w-5xl mx-auto w-full px-6 md:px-10 pb-10">
          <div className="h-0.5 w-full bg-navy/10 overflow-hidden">
            <div className="jr-progress h-full w-full bg-orange origin-right" style={{ transform: 'scaleX(0)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
