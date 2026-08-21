import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { COMMUNITY, STATS } from '../../data/alumniData'

gsap.registerPlugin(ScrollTrigger)

/**
 * First breath after the dark hero — what the alumni community is, in one
 * statement. Masked word-reveal identity line (the IntroV2 language), support
 * copy, the movement-wide numbers as quiet stat blocks (replacing the old
 * separate stats band), and one duotone community photo that gains color on
 * hover (the AmirEssence treatment).
 */

const STATEMENT = [
  { t: 'סיום', hl: false },
  { t: 'המסלול', hl: false },
  { t: 'הוא', hl: false },
  { t: 'לא', hl: false },
  { t: 'קו', hl: false },
  { t: 'הסיום', hl: false },
  { t: '—', hl: false },
  { t: 'אלא', hl: true },
  { t: 'נקודת', hl: true },
  { t: 'הפתיחה.', hl: true },
]

export default function AlumniEssenceV2() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.ale-word > span',
        { yPercent: 115 },
        {
          yPercent: 0,
          stagger: 0.05,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.ale-statement', start: 'top 78%', once: true },
        }
      )

      gsap.fromTo('.ale-support',
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.14, duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.ale-supportwrap', start: 'top 80%', once: true },
        }
      )

      gsap.fromTo('.ale-photo',
        { y: 44, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.ale-photo', start: 'top 82%', once: true },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="alumni-about"
      ref={ref}
      dir="rtl"
      className="relative z-10 w-full overflow-hidden bg-surface text-navy"
    >
      {/* warm glows */}
      <div className="pointer-events-none absolute top-[-12%] right-[10%] w-[55vw] h-[45vh] rounded-full bg-orange/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-8%] w-[45vw] h-[50vh] rounded-full bg-orange/8 blur-[140px]" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 pt-24 md:pt-36 pb-20 md:pb-28">
        <p className="ds-eyebrow text-orange-ink mb-6">קהילת הבוגרים</p>

        {/* lead statement — masked word reveal */}
        <h2
          className="ale-statement font-ragmarom leading-[1.06] text-navy max-w-5xl"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4.6rem)', textWrap: 'balance' }}
        >
          {STATEMENT.map((w, i) => (
            <span key={i} className="ale-word inline-block overflow-hidden align-bottom" style={{ marginInlineEnd: '0.26em' }}>
              <span className={`inline-block will-change-transform ${w.hl ? 'text-orange-ink' : ''}`}>{w.t}</span>
            </span>
          ))}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-20 items-start mt-12 md:mt-16">
          {/* support copy + stats */}
          <div className="ale-supportwrap">
            <p className="ale-support font-heebo text-navy/70 leading-[1.85]" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.2rem)' }}>
              אלפי בוגרים ובוגרות עברו במסגרות של חמש אצבעות, ומהמסלול הם יוצאים
              עם ערכים, כלים וקבוצת שווים שנשארת איתם לחיים. קהילת הבוגרים יוצרת רשת חברתית
              ומקצועית של חיבורים אישיים שמאפשרים תמיכה והמשכיות.
            </p>
            <p className="ale-support font-heebo text-navy/70 leading-[1.85] mt-6" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.2rem)' }}>
              בליבה שלה עומדת <span className="font-semibold text-navy">תוכנית יואב</span>, תוכנית
              הדגל שמלווה צעירות וצעירים בדרך למקסום הפוטנציאל ולהשפעה על המציאות הישראלית.
            </p>

            {/* movement-wide numbers */}
            <div className="ale-support mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:flex sm:flex-wrap sm:gap-x-9 sm:gap-y-10">
              {STATS.map((s) => (
                <div key={s.label} className="border-s-2 border-orange ps-4">
                  <div className="font-ragmarom text-navy leading-none" style={{ fontSize: 'clamp(2rem, 3.4vw, 2.8rem)' }}>
                    {s.plain ? s.value : s.value.toLocaleString('he-IL')}
                    {s.suffix}
                  </div>
                  <div className="font-heebo text-navy/55 mt-1.5 leading-snug text-sm">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* duotone community photo — color on hover */}
          <div className="ale-photo group relative">
            <div className="relative aspect-[4/3] lg:aspect-[4/5] overflow-hidden rounded-[1.6rem] lg:rounded-[2rem]">
              <img
                src={COMMUNITY.src}
                width={COMMUNITY.w}
                height={COMMUNITY.h}
                alt="קהילת הבוגרים של חמש אצבעות"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04]"
                style={{ filter: 'grayscale(0.55) contrast(1.05)' }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0) contrast(1)')}
                onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(0.55) contrast(1.05)')}
              />
              <div className="absolute inset-0 bg-orange/15 mix-blend-multiply pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
