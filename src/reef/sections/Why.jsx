import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { why } from '../content'
import { Para, Title, WRAP, reducedMotion, useSectionMotion } from '../shared'

/**
 * Why the place exists. Then the statement "להפוך את התקווה לפעולה" set over
 * the photograph — a trainee carrying a friend down a dirt track in the
 * fields. Deliberately gentle: no pin, no mask; the picture settles a touch
 * as you pass and the words rise once.
 */
export default function Why() {
  const ref = useRef(null)
  const stageRef = useRef(null)
  useSectionMotion(ref)

  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.why-img',
        { scale: 1.06 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: stage, start: 'top bottom', end: 'center center', scrub: true } }
      )
      gsap.fromTo(
        '.why-words',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: stage, start: 'top 55%', once: true } }
      )
    }, stage)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="why" dir="rtl" aria-labelledby="why-title" className="relative w-full bg-white scroll-mt-16">
      <div className={`${WRAP} pt-24 md:pt-36 pb-16 md:pb-24`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
          <Title id="why-title" title={why.title} />
          <div className="space-y-5 max-w-xl lg:pt-4">
            {why.paragraphs.map((p, i) => (
              <Para key={i} lead={i === 0}>{p}</Para>
            ))}
          </div>
        </div>
      </div>

      <div ref={stageRef} className="relative h-[88svh] min-h-[480px] w-full overflow-hidden bg-navy-deep">
        <img
          src={why.image}
          alt={why.imageAlt}
          loading="lazy"
          className="why-img absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{ objectPosition: '50% 34%' }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-navy-deep/30" />
        <div className="absolute inset-0 grid place-items-center px-4">
          <p
            className="why-words font-ragmarom text-center text-white leading-[0.9] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(3.1rem, 10.5vw, 10rem)', textShadow: '0 6px 50px rgba(8,16,40,0.35)' }}
          >
            <span className="block">{why.statement[0]}</span>
            <span className="block text-orange">{why.statement[1]}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
