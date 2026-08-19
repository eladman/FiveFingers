import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Overview — the training, told editorially. No icon-card grid: the four
 * elements read as a numbered ledger with hairline rules and oversized
 * RagMarom numerals, and the season's goals sit beneath as a three-part
 * statement. Type scale and whitespace carry the hierarchy, not boxes.
 */
export default function AgeOverview({ page }) {
  const ref = useRef(null)
  const { overview } = page

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.ago-head > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
        }
      )
      gsap.utils.toArray('.ago-row', ref.current).forEach((row) => {
        gsap.fromTo(row.querySelectorAll('.ago-row-el'),
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.06, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 86%', once: true },
          }
        )
        const rule = row.querySelector('.ago-rule')
        if (rule) {
          gsap.fromTo(rule,
            { scaleX: 0 },
            {
              scaleX: 1, duration: 1.1, ease: 'power3.out', transformOrigin: 'right center',
              scrollTrigger: { trigger: row, start: 'top 88%', once: true },
            }
          )
        }
      })
      gsap.fromTo('.ago-goal',
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.ago-goals', start: 'top 80%', once: true },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id={`liabah/${page.id}-overview`}
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-surface"
    >
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 pt-24 md:pt-36 pb-20 md:pb-32">

        {/* opening statement */}
        <div className="ago-head max-w-4xl">
          <p className="ds-eyebrow text-orange-ink">האימון</p>
          <h2 className="ds-section-title text-navy mt-4">{overview.heading}</h2>
          <p className="font-heebo text-navy/60 mt-6 leading-[1.65] max-w-2xl" style={{ fontSize: 'clamp(1.15rem, 1.7vw, 1.6rem)' }}>
            {overview.lead}
          </p>
        </div>

        {/* the training — editorial ledger */}
        <div className="mt-16 md:mt-24">
          {overview.training.map((item, i) => (
            <div key={item.title} className="ago-row relative pt-8 md:pt-10 pb-8 md:pb-10">
              {/* hairline rule that draws in */}
              <span className="ago-rule absolute top-0 right-0 left-0 h-px bg-navy/12 origin-right" aria-hidden="true" />
              <div className="grid grid-cols-[auto_1fr] md:grid-cols-[10rem_1fr] gap-x-6 md:gap-x-12 items-baseline">
                <span
                  className="ago-row-el font-ragmarom text-orange/35 leading-none select-none tabular-nums"
                  style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)' }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="max-w-2xl">
                  <h3
                    className="ago-row-el font-ragmarom text-navy leading-tight"
                    style={{ fontSize: 'clamp(1.7rem, 3vw, 2.7rem)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="ago-row-el font-heebo text-navy/60 leading-[1.75] mt-3"
                    style={{ fontSize: 'clamp(1rem, 1.15vw, 1.2rem)' }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <span className="block h-px bg-navy/12" aria-hidden="true" />
        </div>

        {/* the goals — a three-part statement */}
        <div className="ago-goals mt-24 md:mt-36">
          <h3
            className="font-ragmarom text-navy leading-[0.98] max-w-3xl"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}
          >
            {overview.goalsHeading}
          </h3>
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
            {overview.goals.map((goal) => (
              <div key={goal.title} className="ago-goal">
                <span className="block h-[3px] w-12 bg-orange" aria-hidden="true" />
                <h4 className="font-heebo font-bold text-navy mt-5" style={{ fontSize: 'clamp(1.3rem, 1.6vw, 1.6rem)' }}>
                  {goal.title}
                </h4>
                <p className="font-heebo text-navy/60 leading-[1.75] mt-3" style={{ fontSize: 'clamp(1rem, 1.1vw, 1.12rem)' }}>
                  {goal.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
