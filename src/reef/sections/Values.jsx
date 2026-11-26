import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { values } from '../content'
import { Title, WRAP, reducedMotion, useSectionMotion } from '../shared'

// Five pillars rising out of the field — the hand in the movement's mark,
// each a different crop, orange only at the top.
const PILLARS = [
  { h: 54, bg: '#f6f1e6', ang: 0 },
  { h: 66, bg: '#dcc39c', ang: 90 },
  { h: 78, bg: '#c9d3a3', ang: 30 },
  { h: 90, bg: '#e9f0e8', ang: -40 },
  { h: 100, bg: '#ff8714', ang: 60 },
]

/** The five values, grown rather than listed: they rise once as the section arrives. */
export default function Values() {
  const ref = useRef(null)
  useSectionMotion(ref)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const mm = gsap.matchMedia()
    mm.add({ wide: '(min-width: 768px)', narrow: '(max-width: 767px)' }, ({ conditions }) => {
      // clip, not scale: the names inside must never stretch
      const grow = { clipPath: conditions.wide ? 'inset(92% 0% 0% 0% round 1.6rem 1.6rem 0.5rem 0.5rem)' : 'inset(0% 0% 0% 86% round 1rem)' }
      const full = { clipPath: conditions.wide ? 'inset(0% 0% 0% 0% round 1.6rem 1.6rem 0.5rem 0.5rem)' : 'inset(0% 0% 0% 0% round 1rem)' }
      const trigger = { trigger: '.vl-field', start: conditions.wide ? 'top 72%' : 'top 80%', once: true }
      gsap.fromTo('.vl-pillar', grow, { ...full, duration: 1.3, ease: 'expo.out', stagger: 0.13, scrollTrigger: trigger })
      gsap.fromTo('.vl-name', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.13, delay: 0.35, scrollTrigger: trigger })
    }, el)
    return () => mm.revert()
  }, [])

  return (
    <section ref={ref} id="values" dir="rtl" aria-labelledby="values-title" className="relative w-full overflow-hidden bg-valley text-white scroll-mt-16">
      {/* furrows across the whole section, barely there */}
      <div aria-hidden="true" className="rf-furrows pointer-events-none absolute inset-0 opacity-[0.07]" />
      <div className={`${WRAP} relative py-24 md:py-36`}>
        <Title id="values-title" title={values.title} tone="white" className="mx-auto max-w-4xl text-center" />

        <ol className="vl-field mt-14 md:mt-20 flex flex-col gap-2.5 md:h-[480px] lg:h-[540px] md:flex-row md:items-end md:gap-4 lg:gap-5">
          {values.items.map((name, i) => {
            const p = PILLARS[i]
            return (
              <li
                key={name}
                className="relative h-[68px] md:flex md:h-full md:flex-1 md:items-end"
                style={{ '--h': `${p.h}%`, '--w': `${54 + i * 11.5}%` }}
              >
                <div
                  className="vl-pillar rf-crop relative flex h-full w-[var(--w)] items-center rounded-2xl px-5 md:h-[var(--h)] md:w-full md:items-start md:rounded-b-lg md:rounded-t-[1.6rem] md:px-6 md:py-6 lg:px-7 lg:py-7"
                  style={{ '--plot': p.bg, '--ang': `${p.ang}deg` }}
                >
                  <span className="vl-name font-ragmarom text-navy-deep leading-none" style={{ fontSize: 'clamp(1.9rem, 3.1vw, 3.2rem)' }}>
                    {name}
                  </span>
                </div>
              </li>
            )
          })}
        </ol>
        {/* the ground they grow from */}
        <div aria-hidden="true" className="hidden md:block h-[3px] rounded-full bg-[#1f4532]" />

        <p
          className="rv mt-12 md:mt-16 mx-auto max-w-3xl text-center font-heebo font-medium text-white leading-relaxed"
          style={{ fontSize: 'clamp(1.15rem, 1.6vw, 1.5rem)' }}
        >
          {values.text}
        </p>
      </div>
    </section>
  )
}
