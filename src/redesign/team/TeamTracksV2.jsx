import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/**
 * שלוש דרכים להוביל — the recruitment tracks as ProgramsV2 cinematic rows:
 * unclip on scrub, inner parallax, overlapping text card, alternating
 * sides. Absorbs the old track-teaser cards, the מדריך/ה section and the
 * תפקידי מטה department grid (departments become quiet chips on row 3).
 */

const TRACKS = [
  {
    id: 'coach',
    badge: 'התפקיד המרכזי',
    title: 'מאמן/ת',
    text: 'הלב של התנועה, דמות מופת שחיה את הערכים, בונה אמון ומובילה קבוצה של צעירים וצעירות לאורך זמן. זו לא עוד עבודה. זו שליחות שמעצבת אנשים.',
    image: '/coachs/coach_pic.jpg',
    tag: 'מאמן/ת',
    cta: 'רוצה לשמוע פרטים',
  },
  {
    id: 'instructor',
    badge: 'הדרכה בשטח',
    title: 'מדריך/ה בהזנק',
    text: 'הקו הראשון של החוויה: להפעיל, ללוות קבוצות ברגעים המאתגרים ולתרגם את ערכי התנועה לשפה של שטח. למי שאוהבים אנשים, אנרגיה גבוהה ואחריות.',
    image: '/Hero-Pics/214A0027.jpg',
    tag: 'הדרכה בהזנק',
    cta: 'מעניין אותי',
  },
  {
    id: 'hq',
    badge: 'מאחורי הקלעים',
    title: 'תפקידי מטה',
    text: 'הצוות שמאפשר לכל השאר לקרות. אם יש לכם כישרון ורצון להשפיע, כנראה שיש לנו מקום בשבילכם.',
    image: '/team_hero/office.png',
    tag: 'צוות מטה',
    cta: 'רוצים להתחבר',
    chips: ['טכנולוגיה', 'סושיאל ותוכן', 'ניהול', 'לוגיסטיקה', 'ועוד המון'],
  },
]

export default function TeamTracksV2({ onRegister }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.ttr-heading',
        { y: 46, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        }
      )

      gsap.utils.toArray('.ttr-row', ref.current).forEach((row) => {
        const frame = row.querySelector('.ttr-frame')
        const img = row.querySelector('.ttr-img')

        gsap.fromTo(frame,
          { clipPath: 'inset(10% 6% 10% 6% round 2rem)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 2rem)',
            ease: 'none',
            scrollTrigger: { trigger: row, start: 'top 92%', end: 'top 45%', scrub: 0.6 },
          }
        )
        gsap.fromTo(img,
          { yPercent: -9 },
          {
            yPercent: 9,
            ease: 'none',
            scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 1 },
          }
        )
        gsap.fromTo(row.querySelectorAll('.ttr-el'),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.09, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 68%', once: true },
          }
        )
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="team-tracks"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-surface"
    >
      <div className="pointer-events-none absolute top-[5%] left-[-10%] w-[45vw] h-[45vh] rounded-full bg-orange/8 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[10%] right-[-8%] w-[40vw] h-[40vh] rounded-full bg-orange/10 blur-[150px]" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 pt-24 md:pt-32 pb-16 md:pb-24">

        <div className="ttr-heading max-w-3xl">
          <h2 className="ds-section-title text-navy">שלוש דרכים להוביל</h2>
          <p className="ds-section-subtitle text-orange-ink mt-4">
            בשטח, מול קבוצה או מאחורי הקלעים. בחרו את הדרך שלכם.
          </p>
        </div>

        <div className="mt-16 md:mt-24 flex flex-col gap-24 md:gap-36">
          {TRACKS.map((track, i) => {
            const even = i % 2 === 0
            return (
              <article
                key={track.id}
                id={`team-${track.id}`}
                className="ttr-row grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center"
              >
                {/* image — spans 8 columns, side alternates */}
                <div className={`lg:row-start-1 ${even ? 'lg:col-start-1' : 'lg:col-start-5'} lg:col-span-8`}>
                  <div className="ttr-frame relative overflow-hidden rounded-[2rem] group" style={{ clipPath: 'inset(0% 0% 0% 0% round 2rem)' }}>
                    <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden">
                      <img
                        src={track.image}
                        alt={track.title}
                        loading="lazy"
                        decoding="async"
                        className="ttr-img absolute inset-[-10%] w-[120%] h-[120%] max-w-none object-cover will-change-transform group-hover:scale-[1.04] transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent opacity-70" />
                    </div>
                  </div>
                </div>

                {/* text card — overlaps the image edge on desktop */}
                <div className={`lg:row-start-1 ${even ? 'lg:col-start-8' : 'lg:col-start-1'} lg:col-span-5 relative z-10`}>
                  <div className="bg-surface/95 backdrop-blur rounded-[1.6rem] lg:rounded-[2rem] lg:shadow-[0_24px_60px_rgba(0,0,30,0.14)] p-0 lg:p-10">
                    <span className="ttr-el inline-flex items-center rounded-full bg-orange/10 text-orange-ink font-heebo font-semibold px-4 py-1.5 text-sm md:text-base">
                      {track.badge}
                    </span>
                    <h3
                      className="ttr-el font-ragmarom text-navy leading-[0.98] mt-4"
                      style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)' }}
                    >
                      {track.title}
                    </h3>
                    <p
                      className="ttr-el font-heebo text-navy/70 leading-[1.8] mt-4"
                      style={{ fontSize: 'clamp(0.98rem, 1.1vw, 1.15rem)' }}
                    >
                      {track.text}
                    </p>
                    {track.chips && (
                      <div className="ttr-el flex flex-wrap gap-2 mt-5">
                        {track.chips.map((chip) => (
                          <span key={chip} className="rounded-full border border-navy/15 text-navy/65 font-heebo px-3.5 py-1 text-sm">
                            {chip}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="ttr-el mt-6">
                      <button
                        type="button"
                        onClick={() => onRegister?.(track.tag)}
                        className="tap-safe group/link inline-flex items-center gap-2.5 font-heebo font-bold text-navy text-lg"
                      >
                        <span className="relative">
                          {track.cta}
                          <span className="absolute -bottom-1 right-0 h-[2px] w-full bg-orange origin-right scale-x-100 group-hover/link:scale-x-0 transition-transform duration-300" />
                          <span className="absolute -bottom-1 right-0 h-[2px] w-full bg-navy origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 delay-150" />
                        </span>
                        <ArrowLeft size={20} className="text-orange-ink transition-transform duration-300 group-hover/link:-translate-x-1.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
