import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../../components/ui/Button'
import VideoFacade from '../VideoFacade'
import { coach } from '../../data/teamData'

gsap.registerPlugin(ScrollTrigger)

/**
 * הדרך למאמן/ת — the page's signature moment and primary conversion beat.
 * The four entry steps ignite one after another inside a pin (the Liabah
 * journey treatment): giant ghost numerals, four-segment progress, counter.
 * Below the pin: the next-course line + CTA (the old video placeholder and
 * placeholder-date course card were cut — the film returns automatically
 * once coach.videoUrl is set). Mobile / reduced motion: stacked reveals.
 */

export default function TeamPathV2({ onRegister }) {
  const ref = useRef(null)
  const pinRef = useRef(null)
  const segsRef = useRef([])
  const counterRef = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const stages = gsap.utils.toArray('.tp-stage', ref.current)
        gsap.set(stages[0], { opacity: 1, y: 0 })
        gsap.set(stages.slice(1), { opacity: 0, y: 60 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: '+=260%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(3, Math.floor(self.progress * 4))
              segsRef.current.forEach((seg, i) => {
                if (seg) seg.style.opacity = i <= idx ? '1' : '0.22'
              })
              if (counterRef.current) counterRef.current.textContent = `${idx + 1} / 4`
            },
          },
        })

        stages.slice(1).forEach((stage, i) => {
          const prev = stages[i]
          tl.to(prev, { opacity: 0, y: -60, filter: 'blur(6px)', duration: 0.4, ease: 'power2.in' }, i + 0.6)
            .to(stage, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, i + 0.85)
        })
        tl.to({}, { duration: 0.7 })

        return () => tl.scrollTrigger?.kill()
      }
    )

    mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.set('.tp-stage', { opacity: 1, y: 0, clearProps: 'filter' })
      if (reduced) return
      gsap.utils.toArray('.tp-stage, .tp-close', ref.current).forEach((el) => {
        gsap.fromTo(el,
          { y: 44, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%', once: true },
          }
        )
      })
    })

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.tp-close',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.tp-close', start: 'top 82%', once: true },
        }
      )
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="team-coach-path"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-navy-deep"
    >
      {/* faint warm ember */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(255,135,20,0.06) 0%, transparent 65%)' }}
      />

      {/* ── The pinned path ── */}
      <div ref={pinRef} className="relative lg:h-[100dvh] flex flex-col">
        {/* header */}
        <div className="relative z-20 max-w-screen-2xl w-full mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pt-20 lg:pt-28 flex items-end justify-between gap-6">
          <div>
            <p className="ds-eyebrow text-orange mb-3">תהליך הכניסה</p>
            <h2 className="font-ragmarom text-white leading-[0.95]" style={{ fontSize: 'clamp(2.2rem, 4vw, 4.2rem)' }}>
              הדרך <span className="text-orange">למאמן/ת.</span>
            </h2>
          </div>
          <span ref={counterRef} dir="ltr" className="hidden lg:block font-heebo font-bold text-white/50 text-lg tabular-nums shrink-0">
            1 / 4
          </span>
        </div>

        {/* stages */}
        <div className="relative flex-1 flex flex-col lg:block">
          {coach.steps.map((s) => (
            <div
              key={s.n}
              className="tp-stage relative lg:absolute lg:inset-0 flex items-center will-change-transform py-14 lg:py-0"
            >
              <div className="relative w-full max-w-screen-2xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
                {/* giant ghost numeral */}
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -translate-y-1/2 left-6 lg:left-16 font-ragmarom text-white/[0.06] leading-none select-none pointer-events-none"
                  style={{ fontSize: 'clamp(11rem, 28vw, 28rem)' }}
                >
                  {s.n}
                </span>

                <p className="font-heebo font-bold text-orange tracking-[0.3em] text-xs md:text-sm mb-5" dir="ltr" style={{ textAlign: 'right' }}>
                  {s.n}
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

        {/* four-segment progress (desktop) */}
        <div className="hidden lg:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 items-center gap-2 pointer-events-none" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
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

      {/* ── The next course — one line, one door ── */}
      <div className="tp-close relative z-10 max-w-screen-2xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pt-8 lg:pt-20 pb-24 lg:pb-28">
        {/* explainer film — appears only once a real video exists */}
        {coach.videoUrl && (
          <div className="mb-14 max-w-4xl">
            <div
              className="relative w-full rounded-[1.6rem] md:rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)] ring-1 ring-white/10"
              style={{ paddingBottom: '56.25%' }}
            >
              <VideoFacade src={coach.videoUrl} title={coach.videoCaption} />
            </div>
          </div>
        )}

        <div className="border-t border-white/15 pt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-xl">
            <p className="ds-eyebrow text-orange mb-3">{coach.course.eyebrow}</p>
            <p className="font-ragmarom text-white leading-[1.05]" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
              {coach.course.title}. נפתח בקרוב.
            </p>
            <p className="font-heebo text-white/70 leading-relaxed mt-4" style={{ fontSize: 'clamp(0.98rem, 1.15vw, 1.15rem)' }}>
              {coach.course.note} השאירו פרטים ונעדכן אתכם/ן ברגע שנקבע מועד.
            </p>
          </div>
          <div className="shrink-0">
            <Button variant="primary" size="lg" glow onClick={() => onRegister?.('מאמן/ת')}>
              {coach.course.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
