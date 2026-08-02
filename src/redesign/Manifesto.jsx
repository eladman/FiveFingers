import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * The manifesto — Roosevelt's arena speech, the movement's compass.
 *
 * "Monument" treatment: the quote is the centerpiece, set like an
 * inscription on warm paper — an oversized outlined quotation mark
 * anchoring the block, ruled baseline texture behind, key phrases
 * burning orange. The words reveal once as the section scrolls in.
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

// Per-line scale + how much the non-highlighted text recedes — the eye
// travels from the loud opening line down to the quiet resolution.
const LINE_STYLES = [
  { size: 'clamp(2.6rem, 6vw, 6.4rem)', dim: 'text-navy' },
  { size: 'clamp(2rem, 4.4vw, 4.7rem)', dim: 'text-navy' },
  { size: 'clamp(1.7rem, 3.4vw, 3.6rem)', dim: 'text-navy/65' },
  { size: 'clamp(1.35rem, 2.7vw, 2.9rem)', dim: 'text-navy/55' },
]

export default function Manifesto() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.mf-head, .mf-mark, .mf-word', { opacity: 1 })
        gsap.set('.mf-outro', { opacity: 1, y: 0 })
        return
      }

      // One gentle reveal when the section scrolls into view — plays once.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 68%',
          once: true,
        },
      })

      tl.fromTo('.mf-head',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
      )
        .fromTo('.mf-mark',
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.1, ease: 'power3.out' },
          '<0.05'
        )
        .fromTo('.mf-word',
          { opacity: 0.13 },
          { opacity: 1, stagger: 0.07, duration: 0.65, ease: 'power2.out' },
          '>-0.5'
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
      className="relative w-full overflow-hidden bg-surface-2"
    >
      {/* ruled baseline texture — the "inscribed page" */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'linear-gradient(rgba(13,27,75,0.028) 1px, transparent 1px)',
          backgroundSize: '100% 2.1rem',
        }}
      />
      {/* faint warm ember low behind the block */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 65% 45% at 50% 62%, rgba(255,135,20,0.05) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 w-full max-w-[1120px] mx-auto px-6 sm:px-10 md:px-16 py-24 md:py-32">
        <div
          className="grid items-start gap-4 sm:gap-8 md:gap-14"
          style={{ gridTemplateColumns: 'auto 1fr' }}
        >
          {/* oversized outlined quotation mark — the monument anchor */}
          <div
            className="mf-mark font-ragmarom select-none leading-[0.7] mt-1"
            style={{
              fontSize: 'clamp(5rem, 16vw, 18rem)',
              color: 'transparent',
              WebkitTextStroke: '2px var(--orange)',
            }}
            aria-hidden="true"
          >
            ״
          </div>

          {/* body */}
          <div className="min-w-0 text-right">
            <h2 className="mf-head ds-eyebrow text-orange-ink flex items-center justify-end gap-3 mb-7 md:mb-9">
              <span>נאום האדם בזירה</span>
              <span className="inline-block w-8 h-0.5 bg-orange shrink-0" />
            </h2>

            <blockquote>
              {LINES.map((words, li) => (
                <p
                  key={li}
                  className={`font-ragmarom leading-[1.05] ${LINE_STYLES[li].dim}`}
                  style={{ fontSize: LINE_STYLES[li].size, marginTop: li === 0 ? 0 : '0.28em' }}
                >
                  {words.map(([w, hl], wi) => (
                    <span
                      key={wi}
                      className={`mf-word inline-block ${hl ? 'text-orange' : ''}`}
                      style={{ marginInlineEnd: '0.26em' }}
                    >
                      {w}
                    </span>
                  ))}
                </p>
              ))}
            </blockquote>

            <div className="mf-outro mt-11 md:mt-12 pt-6 border-t border-navy/15 flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-10">
              <p
                className="font-heebo text-navy/72 leading-[1.85] max-w-xl text-right"
                style={{ fontSize: 'clamp(0.95rem, 1.15vw, 1.15rem)' }}
              >
                אנחנו בחמש אצבעות מאמינים שתפקידנו להיכנס לזירה הישראלית ולהשפיע על המציאות,
                ולחנך את דור העתיד לא להסתכל מהצד אלא לפעול למען חברה טובה יותר במדינת ישראל.
              </p>
              <cite className="font-heebo not-italic font-bold text-navy whitespace-nowrap shrink-0 text-sm md:text-base">
                תיאודור רוזוולט, 1910
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
