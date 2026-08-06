import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { essence } from '../../data/liabahData'

gsap.registerPlugin(ScrollTrigger)

/**
 * The journey — מסוגלות → שייכות → השפעה, the page's signature moment.
 *
 * Desktop: the stage pins and the three phases ignite one after another
 * (crossfade + drift) while a three-segment progress bar fills — a vertical
 * cousin of the home FiveDNA train, so the home keeps its horizontal
 * signature. Mobile / reduced motion: plain stacked reveals.
 *
 * Below the pin, the method triptych: three duotone photos, one line each.
 */

/** One-line summary per pillar — the first sentence of the full copy. */
const firstSentence = (text) => {
  const s = text.trim().split('. ')[0].trim()
  return s.endsWith('.') ? s : s + '.'
}

export default function LiabahJourneyV2() {
  const ref = useRef(null)
  const pinRef = useRef(null)
  const segsRef = useRef([])
  const counterRef = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const stages = gsap.utils.toArray('.jr-stage', ref.current)
        // First stage visible, the rest waiting below.
        gsap.set(stages[0], { opacity: 1, y: 0 })
        gsap.set(stages.slice(1), { opacity: 0, y: 60 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: '+=220%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              const idx = Math.min(2, Math.floor(self.progress * 3))
              segsRef.current.forEach((seg, i) => {
                if (seg) seg.style.opacity = i <= idx ? '1' : '0.22'
              })
              if (counterRef.current) counterRef.current.textContent = `${idx + 1} / 3`
            },
          },
        })

        // Two hand-offs, each with reading room before it.
        stages.slice(1).forEach((stage, i) => {
          const prev = stages[i]
          tl.to(prev, { opacity: 0, y: -60, filter: 'blur(6px)', duration: 0.4, ease: 'power2.in' }, i + 0.6)
            .to(stage, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, i + 0.85)
        })
        tl.to({}, { duration: 0.7 }) // hold the last stage before unpinning

        return () => tl.scrollTrigger?.kill()
      }
    )

    // Mobile + reduced motion: simple reveals, no pin.
    mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.set('.jr-stage', { opacity: 1, y: 0, clearProps: 'filter' })
      if (reduced) return
      gsap.utils.toArray('.jr-stage, .jr-pillar', ref.current).forEach((el) => {
        gsap.fromTo(el,
          { y: 44, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%', once: true },
          }
        )
      })
    })

    // Triptych reveal (desktop — mobile handled above).
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.jr-pillar',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.jr-pillars', start: 'top 78%', once: true },
        }
      )
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="liabah-journey"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-navy-deep"
    >
      {/* faint warm ember */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(255,135,20,0.06) 0%, transparent 65%)' }}
      />

      {/* ── The pinned journey ── */}
      <div ref={pinRef} className="relative lg:h-[100dvh] flex flex-col">
        {/* header */}
        <div className="relative z-20 max-w-screen-2xl w-full mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pt-20 lg:pt-28 flex items-end justify-between gap-6">
          <div>
            <p className="ds-eyebrow text-orange mb-3">התהליך</p>
            <h2 className="font-ragmarom text-white leading-[0.95]" style={{ fontSize: 'clamp(2.2rem, 4vw, 4.2rem)' }}>
              שלושה שלבים. <span className="text-orange">דרך אחת.</span>
            </h2>
          </div>
          <span ref={counterRef} dir="ltr" className="hidden lg:block font-heebo font-bold text-white/50 text-lg tabular-nums shrink-0">
            1 / 3
          </span>
        </div>

        {/* stages */}
        <div className="relative flex-1 flex flex-col lg:block">
          {essence.stages.map((s, i) => (
            <div
              key={s.num}
              className="jr-stage relative lg:absolute lg:inset-0 flex items-center will-change-transform py-16 lg:py-0"
            >
              <div className="relative w-full max-w-screen-2xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
                {/* giant ghost numeral */}
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -translate-y-1/2 left-6 lg:left-16 font-ragmarom text-white/[0.06] leading-none select-none pointer-events-none"
                  style={{ fontSize: 'clamp(11rem, 28vw, 28rem)' }}
                >
                  {s.num}
                </span>

                <p className="font-heebo font-bold text-orange tracking-[0.3em] text-xs md:text-sm mb-5" dir="ltr" style={{ textAlign: 'right' }}>
                  {s.num}
                </p>
                <h3 className="font-ragmarom text-white leading-[0.95]" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}>
                  {s.title}
                </h3>
                <p className="font-heebo text-white/75 leading-[1.8] mt-6 max-w-md" style={{ fontSize: 'clamp(1.05rem, 1.3vw, 1.3rem)' }}>
                  {s.text}
                </p>
                <div className="mt-8 h-1 w-14 rounded-full bg-orange" />
              </div>
            </div>
          ))}
        </div>

        {/* three-segment progress (desktop) */}
        <div className="hidden lg:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 items-center gap-2 pointer-events-none" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              ref={(el) => (segsRef.current[i] = el)}
              className="h-[7px] w-12 rounded-full bg-orange"
              style={{
                opacity: i === 0 ? 1 : 0.22,
                transition: 'opacity 380ms cubic-bezier(0.25,0.46,0.45,0.94)',
              }}
            />
          ))}
        </div>
      </div>

      {/* ── The method triptych ── */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pt-8 lg:pt-24 pb-24 lg:pb-32">
        <div className="jr-pillars grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {essence.pillars.map((p) => (
            <figure key={p.title} className="jr-pillar group relative overflow-hidden rounded-[1.6rem] lg:rounded-[2rem]">
              <div className="relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden">
                <img
                  src={p.imageSrc}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04]"
                  style={{ filter: 'grayscale(0.55) contrast(1.05)', objectPosition: p.objectPosition || '50% 50%' }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0) contrast(1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(0.55) contrast(1.05)')}
                />
                <div className="absolute inset-0 bg-orange/15 mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/15 to-transparent pointer-events-none" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <h4 className="font-ragmarom text-white leading-none" style={{ fontSize: 'clamp(1.7rem, 2.4vw, 2.4rem)' }}>
                  {p.title}
                </h4>
                <p className="font-heebo text-white/70 leading-relaxed mt-3 max-w-sm" style={{ fontSize: 'clamp(0.92rem, 1vw, 1.05rem)' }}>
                  {firstSentence(p.text)}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
