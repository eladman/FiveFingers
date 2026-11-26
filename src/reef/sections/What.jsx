import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { what } from '../content'
import { Para, Title, WRAP, reducedMotion, useSectionMotion } from '../shared'

// each pillar is a plot in the valley, with its own crop and furrow direction
const FIELDS = {
  body: { bg: '#d9b86b', ang: 0 },
  lead: { bg: '#a9bf7c', ang: 90 },
  content: { bg: '#dcc39c', ang: 35 },
  challenge: { bg: '#b98f63', ang: -30 },
  team: { bg: '#c9d3a3', ang: 60 },
  action: { bg: '#ffb46b', ang: -60 },
}

/** What the centre is, then the six things that happen here, as six plots. */
export default function What() {
  const ref = useRef(null)
  useSectionMotion(ref)

  // the closing verbs light up one after another as they cross the screen
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.wh-verb',
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.25,
          ease: 'none',
          scrollTrigger: { trigger: '.wh-verbs', start: 'top 85%', end: 'bottom 55%', scrub: 0.5 },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="what" dir="rtl" aria-labelledby="what-title" className="relative w-full overflow-hidden bg-[#eef2f1] scroll-mt-16">
      <div className={`${WRAP} py-24 md:py-36`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
          <Title id="what-title" title={what.title} />
          <div className="space-y-5 max-w-xl lg:pt-4">
            <Para lead>{what.lead}</Para>
            {what.paragraphs.map((p, i) => (
              <Para key={i}>{p}</Para>
            ))}
          </div>
        </div>

        <ul className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 md:gap-x-10 border-t border-navy/15 md:border-t-0">
          {what.pillars.map((p, i) => {
            const f = FIELDS[p.key]
            return (
              <li
                key={p.key}
                className={`rv rf-plot group relative overflow-hidden border-b border-navy/15 ${i < 2 ? 'md:border-t' : ''}`}
                style={{ '--plot': f.bg, '--ang': `${f.ang}deg` }}
              >
                <span aria-hidden="true" className="rf-plot-fill absolute inset-0" />
                <div className="relative flex items-baseline justify-between gap-6 px-1 md:px-5 py-6 md:py-8">
                  <h3 className="font-ragmarom text-navy leading-none transition-transform duration-500 ease-brand group-hover:-translate-x-2" style={{ fontSize: 'clamp(2.3rem, 4.2vw, 4rem)' }}>
                    {p.name}
                  </h3>
                  <p className="max-w-[17rem] text-left font-heebo text-navy/75 leading-snug transition-colors duration-500 group-hover:text-navy" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.15rem)' }}>
                    {p.text}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>

        <p
          className="wh-verbs mt-16 md:mt-24 flex flex-wrap justify-center gap-x-[0.32em] gap-y-1 font-ragmarom leading-none tracking-[-0.02em]"
          style={{ fontSize: 'clamp(2.6rem, 7.2vw, 6.75rem)' }}
        >
          {what.closing.map((word, i) => (
            <span key={word} className={`wh-verb ${i === what.closing.length - 1 ? 'text-orange-ink' : 'text-navy'}`}>
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
