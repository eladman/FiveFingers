import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VideoFacade from '../VideoFacade'
import { hero } from '../../data/liabahData'

gsap.registerPlugin(ScrollTrigger)

/**
 * First breath after the dark hero — what ליבה is, in one statement.
 * Pure typography: a masked word-reveal lead + two short support columns
 * (the IntroV2 language). The old video placeholder, 3D carousel and
 * pillar cards were cut — the journey section now carries that weight.
 * The film block returns automatically once `hero.videoUrl` is set.
 */

const STATEMENT = [
  { t: 'מסגרת', hl: false },
  { t: 'חינוכית', hl: false },
  { t: 'בלתי־פורמלית', hl: false },
  { t: 'שמקדמת', hl: false },
  { t: 'כל', hl: false },
  { t: 'נער/ה', hl: false },
  { t: 'למקסום', hl: true },
  { t: 'הפוטנציאל', hl: true },
  { t: 'שלו/ה.', hl: false },
]

export default function LiabahEssenceV2() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.les-word > span',
        { yPercent: 115 },
        {
          yPercent: 0,
          stagger: 0.05,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.les-statement', start: 'top 78%', once: true },
        }
      )

      gsap.fromTo('.les-support',
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.14, duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.les-supportwrap', start: 'top 80%', once: true },
        }
      )

      // Film block only exists once hero.videoUrl is set.
      if (ref.current.querySelector('.les-film')) {
        gsap.fromTo('.les-film',
          { y: 60, opacity: 0, scale: 0.97 },
          {
            y: 0, opacity: 1, scale: 1, duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.les-film', start: 'top 82%', once: true },
          }
        )
      }
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="liabah-essence"
      ref={ref}
      dir="rtl"
      className="relative z-10 w-full overflow-hidden bg-surface text-navy"
    >
      {/* warm glows */}
      <div className="pointer-events-none absolute top-[-12%] right-[10%] w-[55vw] h-[45vh] rounded-full bg-orange/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-8%] w-[45vw] h-[50vh] rounded-full bg-orange/8 blur-[140px]" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 pt-24 md:pt-36 pb-20 md:pb-28">
        <p className="ds-eyebrow text-orange-ink mb-6">מה הן קבוצות הנוער?</p>

        {/* lead statement — masked word reveal */}
        <h2
          className="les-statement font-ragmarom leading-[1.06] text-navy max-w-5xl"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4.6rem)', textWrap: 'balance' }}
        >
          {STATEMENT.map((w, i) => (
            <span key={i} className="les-word inline-block overflow-hidden align-bottom" style={{ marginInlineEnd: '0.26em' }}>
              <span className={`inline-block will-change-transform ${w.hl ? 'text-orange-ink' : ''}`}>{w.t}</span>
            </span>
          ))}
        </h2>

        {/* support copy */}
        <div className="les-supportwrap grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 mt-12 md:mt-16 max-w-4xl">
          <p className="les-support font-heebo text-navy/70 leading-[1.85]" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.2rem)' }}>
            השיטה הייחודית שלנו משלבת בין האימון הפיזי־מנטלי, השייכות לקבוצה מלוכדת והחיבור האישי למאמן/ת, שילוב שבונה בסיס אישיותי־ערכי רחב.
          </p>
          <p className="les-support font-heebo text-navy/70 leading-[1.85]" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.2rem)' }}>
            המטרה: להקנות כלים להתמודדות עם אתגרים, ולאפשר לבני ובנות הנוער למקסם את הפוטנציאל שלהם למען השפעה וקידום החברה הישראלית.
          </p>
        </div>

        {/* the film — appears only once a real video exists */}
        {hero.videoUrl && (
          <div className="les-film mt-16 md:mt-28">
            <div
              className="relative w-full rounded-[1.6rem] md:rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,30,0.18)] ring-1 ring-black/8"
              style={{ paddingBottom: '56.25%' }}
            >
              <VideoFacade src={hero.videoUrl} title="סרטון קבוצות הנוער" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
