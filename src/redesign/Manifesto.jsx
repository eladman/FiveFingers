import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * The manifesto — Roosevelt's arena speech, the movement's compass.
 * A single, calm screen: the words fade in once as the section enters
 * view, ending on the movement's own commitment line. No pinning, no
 * long scroll — you read it and move on.
 *
 * Reduced motion: fully lit static text.
 */

// [text, highlighted?] — highlighted words burn orange.
const LINES = [
  [['״השבח', false], ['לאדם', false], ['בזירה,', true]],
  [['זה', false], ['שפניו', false], ['מכוסים', false], ['באבק,', true], ['זיעה', true], ['ודם.', true]],
  [['זה', false], ['שאינו', false], ['מפסיק', false], ['לשאוף', false], ['ולנסות.', false]],
  [['זה', false], ['שמנסה,', true], ['שעושה,', true], ['שיודע', false], ['התלהבות,', false], ['מחויבות', false], ['וחתירה', false], ['למטרה.״', true]],
]

const LINE_SIZES = [
  'clamp(2.6rem, 6.5vw, 7rem)',
  'clamp(2rem, 4.8vw, 5.2rem)',
  'clamp(2rem, 4.8vw, 5.2rem)',
  'clamp(1.6rem, 3.6vw, 4rem)',
]

export default function Manifesto() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.mf-head, .mf-word', { opacity: 1 })
        gsap.set('.mf-outro', { opacity: 1, y: 0 })
        return
      }

      // One gentle reveal when the section scrolls into view — plays once.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 70%',
          once: true,
        },
      })

      tl.fromTo('.mf-head',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
      )
        .fromTo('.mf-word',
        { opacity: 0.13 },
        { opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power2.out' },
        '>-0.2'
      )
        .fromTo('.mf-outro',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
          '>-0.3'
        )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="manifesto"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-white"
    >
      {/* faint radial ember behind the text */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 55%, rgba(255,135,20,0.06) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-10 md:px-16 py-24 md:py-32">
        <header className="mf-head mb-12 md:mb-16 text-right">
          <h2 className="ds-section-title text-navy">נאום האדם בזירה</h2>
          <p className="ds-section-subtitle text-orange-ink mt-4">
            האני מאמין של חמש אצבעות
          </p>
        </header>

        <blockquote>
          {LINES.map((words, li) => (
            <p
              key={li}
              className="font-ragmarom leading-[1.02] text-right"
              style={{ fontSize: LINE_SIZES[li], marginTop: li === 0 ? 0 : '0.35em' }}
            >
              {words.map(([w, hl], wi) => (
                <span
                  key={wi}
                  className={`mf-word inline-block ${hl ? 'text-orange' : 'text-navy'}`}
                  style={{ marginInlineEnd: '0.28em' }}
                >
                  {w}
                </span>
              ))}
            </p>
          ))}
        </blockquote>

        <div className="mf-outro mt-12 md:mt-14 pt-7 border-t border-navy/15 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <p
            className="font-heebo text-navy/75 leading-[1.85] max-w-xl text-right"
            style={{ fontSize: 'clamp(0.95rem, 1.15vw, 1.15rem)' }}
          >
            אנחנו בחמש אצבעות מאמינים שתפקידנו להיכנס לזירה הישראלית ולהשפיע על המציאות,
            ולחנך את דור העתיד לא להסתכל מהצד אלא לפעול למען חברה טובה יותר במדינת ישראל.
          </p>
          <p className="font-heebo text-navy/40 text-sm md:text-base whitespace-nowrap shrink-0">
            תיאודור רוזוולט, 1910
          </p>
        </div>
      </div>
    </section>
  )
}
