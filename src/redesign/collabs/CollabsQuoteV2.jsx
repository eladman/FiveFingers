import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * The proof — the מנכ״לית pull-quote set as a compact monument (the home
 * Manifesto language): oversized outlined quotation mark, ruled paper
 * texture, words revealing once on scroll. Absorbs the old dark team band;
 * one line about the team leads into the quote.
 */

const LINES = [
  'העבודה עם חמש אצבעות',
  'הייתה משמעותית ומדויקת.',
  'ראיתי מקרוב מקצועיות, מחויבות',
  'ויכולת אמיתית להניע תהליכים.',
]

export default function CollabsQuoteV2() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.cq2-head, .cq2-mark, .cq2-line, .cq2-outro', { opacity: 1, y: 0 })
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
      })

      tl.fromTo('.cq2-head', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' })
        .fromTo('.cq2-mark', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.1, ease: 'power3.out' }, '<0.05')
        .fromTo('.cq2-line', { opacity: 0.13 }, { opacity: 1, stagger: 0.14, duration: 0.65, ease: 'power2.out' }, '>-0.5')
        .fromTo('.cq2-outro', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }, '>-0.3')
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="collabs-team"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-surface-2"
    >
      {/* ruled baseline texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'linear-gradient(rgba(13,27,75,0.028) 1px, transparent 1px)',
          backgroundSize: '100% 2.1rem',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 65% 45% at 50% 62%, rgba(255,135,20,0.05) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 sm:px-10 md:px-16 py-24 md:py-32">
        <div className="grid items-start gap-4 sm:gap-8 md:gap-12" style={{ gridTemplateColumns: 'auto 1fr' }}>
          {/* oversized outlined quotation mark */}
          <div
            className="cq2-mark font-ragmarom select-none leading-[0.7] mt-1"
            style={{
              fontSize: 'clamp(4rem, 12vw, 13rem)',
              color: 'transparent',
              WebkitTextStroke: '2px var(--orange)',
            }}
            aria-hidden="true"
          >
            ״
          </div>

          <div className="min-w-0 text-right">
            <h2 className="cq2-head ds-eyebrow text-orange-ink flex items-center justify-end gap-3 mb-7">
              <span>אנשים שחיים את השיטה</span>
              <span className="inline-block w-8 h-0.5 bg-orange shrink-0" />
            </h2>

            <blockquote>
              {LINES.map((line, i) => (
                <p
                  key={i}
                  className="cq2-line font-ragmarom text-navy leading-[1.15]"
                  style={{ fontSize: 'clamp(1.6rem, 3.4vw, 3.2rem)', marginTop: i === 0 ? 0 : '0.18em' }}
                >
                  {line}
                </p>
              ))}
            </blockquote>

            <div className="cq2-outro mt-10 pt-6 border-t border-navy/15 flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-10">
              <p className="font-heebo text-navy/70 leading-[1.85] max-w-xl text-right" style={{ fontSize: 'clamp(0.95rem, 1.15vw, 1.15rem)' }}>
                צוות המדריכים שלנו מגיע מעולמות החינוך, הצבא והספורט — אנשים שעברו את מסלול ההכשרה
                של חמש אצבעות וחיים את השיטה בעצמם.
              </p>
              <cite className="font-heebo not-italic font-bold text-navy whitespace-nowrap shrink-0 text-sm md:text-base">
                שירלי רימון ברכה · מנכ״לית
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
