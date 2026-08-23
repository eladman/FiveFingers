import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * First breath after the dark hero — what the הכשרות house believes,
 * in one statement. Pure typography (the IntroV2 language): the old
 * three-pillar card grid is distilled into a masked word-reveal lead
 * plus two short support columns.
 */

const STATEMENT = [
  { t: 'תרבות', hl: false },
  { t: 'חמש', hl: false },
  { t: 'אצבעות', hl: false },
  { t: '-', hl: false },
  { t: 'אצלך', hl: true },
  { t: 'בארגון', hl: true },
]

export default function CollabsEssenceV2() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.ces-word > span',
        { yPercent: 115 },
        {
          yPercent: 0,
          stagger: 0.05,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.ces-statement', start: 'top 78%', once: true },
        }
      )

      gsap.fromTo('.ces-support',
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.14, duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.ces-supportwrap', start: 'top 80%', once: true },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="collabs-essence"
      ref={ref}
      dir="rtl"
      className="relative z-10 w-full overflow-hidden bg-surface text-navy"
    >
      {/* warm glows */}
      <div className="pointer-events-none absolute top-[-12%] right-[10%] w-[55vw] h-[45vh] rounded-full bg-orange/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-8%] w-[45vw] h-[50vh] rounded-full bg-orange/8 blur-[140px]" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 pt-24 md:pt-36 pb-20 md:pb-28">
        <p className="ds-eyebrow text-orange-ink mb-6">מי אנחנו</p>

        {/* lead statement — masked word reveal */}
        <h2
          className="ces-statement font-ragmarom leading-[1.06] text-navy max-w-5xl"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4.6rem)', textWrap: 'balance' }}
        >
          {STATEMENT.map((w, i) => (
            <span key={i} className="ces-word inline-block overflow-hidden align-bottom" style={{ marginInlineEnd: '0.26em' }}>
              <span className={`inline-block will-change-transform ${w.hl ? 'text-orange-ink' : ''}`}>{w.t}</span>
            </span>
          ))}
        </h2>

        {/* support copy — the three old pillars, distilled */}
        <div className="ces-supportwrap grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 mt-12 md:mt-16 max-w-4xl">
          <p className="ces-support font-heebo text-navy/70 leading-[1.85]" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.2rem)' }}>
            כל מפגש הוא חוויה מעצבת שמטמיעה כלים פיזיים ומנטליים דרך התנסות אמיתית. התוכן נבנה מתוך השטח הישראלי ומדבר בשפה שמחברת ומניעה לפעולה.
          </p>
          <p className="ces-support font-heebo text-navy/70 leading-[1.85]" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.2rem)' }}>
            השיטה מוציאה את המיטב מכל אדם ומכל ארגון, ומייצרת תהליך של מימוש פוטנציאל אישי וקבוצתי, הלכה למעשה.
          </p>
        </div>
      </div>
    </section>
  )
}
