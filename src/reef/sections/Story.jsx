import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { story } from '../content'
import { WRAP, reducedMotion } from '../shared'

/**
 * Who ריף was — the page's still point. No distortion, no parallax, no
 * playful motion here: words and photograph arrive by slow fades only, with
 * room around them. The energy comes back on the turn: the way draws itself
 * under "להמשיך אותה" and the rest of the page follows it.
 */
export default function Story() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.st-fade',
        { opacity: 0 },
        { opacity: 1, duration: 2, stagger: 0.28, ease: 'power1.out', scrollTrigger: { trigger: '.st-body', start: 'top 75%', once: true } }
      )
      gsap.fromTo(
        '.st-turn',
        { opacity: 0 },
        { opacity: 1, duration: 1.6, stagger: 0.4, ease: 'power1.out', scrollTrigger: { trigger: '.st-statement', start: 'top 80%', once: true } }
      )
      gsap.fromTo(
        '.st-way',
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.st-statement', start: 'top 70%', end: 'bottom 45%', scrub: 0.8 },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="story" dir="rtl" aria-labelledby="story-title" className="relative w-full overflow-hidden bg-white scroll-mt-16">
      <div className={`${WRAP} pt-24 md:pt-36`}>
        <div className="st-body grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] gap-12 lg:gap-24 items-center">
          <figure className="st-fade relative mx-auto w-full max-w-[480px] lg:mx-0">
            <div className="relative overflow-hidden rounded-[1.75rem] aspect-[7/8] bg-surface-2">
              <img src={story.image} alt={story.imageAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </figure>

          <div>
            <h2
              id="story-title"
              className="st-fade font-ragmarom text-navy leading-[0.95] tracking-[-0.015em]"
              style={{ fontSize: 'clamp(3rem, 6vw, 5.75rem)' }}
            >
              {story.title}
            </h2>
            <div className="mt-9 max-w-[34rem] space-y-5">
              {story.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`st-fade font-heebo leading-[1.8] ${i === 0 ? 'font-medium text-navy' : 'text-navy/75'}`}
                  style={{ fontSize: i === 0 ? 'clamp(1.15rem, 1.45vw, 1.35rem)' : 'clamp(1.02rem, 1.15vw, 1.15rem)' }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`st-statement ${WRAP} pt-28 md:pt-44 pb-24 md:pb-36 text-center`}>
        <p className="st-turn font-heebo font-bold text-navy" style={{ fontSize: 'clamp(1.2rem, 1.7vw, 1.6rem)' }}>
          {story.turn}
        </p>
        <p className="mt-6 md:mt-8 font-ragmarom text-navy leading-[0.95] tracking-[-0.015em]" style={{ fontSize: 'clamp(2.7rem, 7vw, 6.5rem)' }}>
          <span className="st-turn block">{story.statement[0]}</span>
          <span className="st-turn relative inline-block text-orange-ink">
            {story.statement[1]}
            <svg aria-hidden="true" viewBox="0 0 600 60" preserveAspectRatio="none" fill="none" className="absolute -bottom-[0.28em] left-[-4%] h-[0.32em] w-[108%]">
              <path
                className="st-way"
                pathLength="1"
                strokeDasharray="1"
                d="M596 30 C 520 6, 450 8, 380 30 S 230 56, 160 32 S 50 10, 4 26"
                stroke="#ff8714"
                strokeWidth="7"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </span>
        </p>
      </div>
    </section>
  )
}
