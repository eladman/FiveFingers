import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STAGE, STATS } from '../../data/amirData'

gsap.registerPlugin(ScrollTrigger)

/**
 * First breath after the dark hero — who Amir is, in one statement.
 * A masked word-reveal identity line (the IntroV2 language), support copy,
 * the credibility numbers as quiet stat blocks, and one duotone stage
 * portrait that gains color on hover (the TeamEssence treatment).
 */

const STATEMENT = [
  { t: 'קצין', hl: false },
  { t: 'שייטת,', hl: false },
  { t: 'יזם', hl: false },
  { t: 'סדרתי,', hl: false },
  { t: 'מייסד', hl: false },
  { t: 'חמש', hl: false },
  { t: 'אצבעות', hl: false },
  { t: '—', hl: false },
  { t: 'והאדם', hl: true },
  { t: 'בזירה.', hl: true },
]

export default function AmirEssenceV2() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.aes-word > span',
        { yPercent: 115 },
        {
          yPercent: 0,
          stagger: 0.05,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.aes-statement', start: 'top 78%', once: true },
        }
      )

      gsap.fromTo('.aes-support',
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.14, duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.aes-supportwrap', start: 'top 80%', once: true },
        }
      )

      gsap.fromTo('.aes-photo',
        { y: 44, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.aes-photo', start: 'top 82%', once: true },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="amir-about"
      ref={ref}
      dir="rtl"
      className="relative z-10 w-full overflow-hidden bg-surface text-navy"
    >
      {/* warm glows */}
      <div className="pointer-events-none absolute top-[-12%] right-[10%] w-[55vw] h-[45vh] rounded-full bg-orange/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-8%] w-[45vw] h-[50vh] rounded-full bg-orange/8 blur-[140px]" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 pt-24 md:pt-36 pb-20 md:pb-28">
        <p className="ds-eyebrow text-orange-ink mb-6">מי זה עמיר?</p>

        {/* lead statement — masked word reveal */}
        <h2
          className="aes-statement font-ragmarom leading-[1.06] text-navy max-w-5xl"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4.6rem)', textWrap: 'balance' }}
        >
          {STATEMENT.map((w, i) => (
            <span key={i} className="aes-word inline-block overflow-hidden align-bottom" style={{ marginInlineEnd: '0.26em' }}>
              <span className={`inline-block will-change-transform ${w.hl ? 'text-orange-ink' : ''}`}>{w.t}</span>
            </span>
          ))}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-20 items-start mt-12 md:mt-16">
          {/* support copy + stats */}
          <div className="aes-supportwrap">
            <p className="aes-support font-heebo text-navy/70 leading-[1.85]" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.2rem)' }}>
              עמיר בן 36, קצין שייטת 13 לשעבר, מייסד ויו״ר תנועת חמש אצבעות, יזם סדרתי ומגיש הפודקאסט
              ״האדם בזירה״ — עם ניסיון של מעל 1,000 הרצאות בכל רחבי הארץ.
            </p>
            <p className="aes-support font-heebo text-navy/70 leading-[1.85] mt-6" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.2rem)' }}>
              היום עמיר פועל גם בפאן האישי — הרצאות, סדנאות וליווי של גילאי 20 ומעלה בדרך ליזמות
              ולמימוש פוטנציאל.
            </p>

            {/* credibility numbers */}
            <div className="aes-support mt-12 flex flex-wrap gap-10 sm:gap-14">
              {STATS.map((s) => (
                <div key={s.label} className="border-s-2 border-orange ps-4">
                  <div className="font-ragmarom text-navy leading-none" style={{ fontSize: 'clamp(2rem, 3.4vw, 2.8rem)' }}>
                    {s.value}
                  </div>
                  <div className="font-heebo text-navy/55 mt-1.5 leading-snug text-sm">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* duotone stage portrait — color on hover */}
          <div className="aes-photo group relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] lg:rounded-[2rem]">
              <img
                src={STAGE.src}
                width={STAGE.w}
                height={STAGE.h}
                alt="עמיר מנחם על הבמה, מרצה"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-[1.04]"
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
