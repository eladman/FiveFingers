import { Fragment, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft } from 'lucide-react'
import Button from '../../components/ui/Button'
import {
  AXES,
  YOAV_FACTS,
  YOAV_URL,
  YOAV_TAGLINE,
  YOAV_ARENA,
  YOAV_INTRO,
  YOAV_INTERVIEW,
  YOAV_TRIBUTE,
} from '../../data/alumniData'

gsap.registerPlugin(ScrollTrigger)

/**
 * תוכנית יואב — the flagship alumni program, the main event of the בוגרים page.
 *
 * Reworked to a *white* editorial treatment (the official yoavprogram.com is
 * dark; here it becomes a bright, calm island between the two darker sections
 * so the flagship reads as its own confident statement). Content is drawn from
 * the official site: the belief line ("the person in the arena"), the three
 * program axes (פיתוח → חשיפה → השפעה) as milestones on a single orange spine,
 * the schedule spec strip, and a dignified tribute to יואב שחר ז״ל before the
 * funnel out. Pure #fff base (not the warm surface of the Essence band above)
 * keeps the two adjacent light sections visually distinct.
 */
export default function AlumniYoavV2() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.ayv-lead',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 76%', once: true },
        }
      )

      // The spine draws top-to-bottom as the path reveals.
      gsap.fromTo('.ayv-spine',
        { scaleY: 0 },
        {
          scaleY: 1, transformOrigin: 'top center', duration: 1.3, ease: 'power2.out',
          scrollTrigger: { trigger: '.ayv-journey', start: 'top 74%', once: true },
        }
      )
      // Milestones arrive in sequence — reinforcing the journey, not a grid.
      gsap.fromTo('.ayv-step',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.22, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.ayv-journey', start: 'top 70%', once: true },
        }
      )

      gsap.fromTo('.ayv-foot',
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.14, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.ayv-tribute', start: 'top 84%', once: true },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="alumni-yoav"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-white text-navy"
    >
      {/* soft warm accents — barely-there, keeps the white from feeling clinical */}
      <div
        className="pointer-events-none absolute top-[-8%] right-[-6%] w-[46vw] h-[42vh] rounded-full bg-orange/10 blur-[150px]"
      />
      <div
        className="pointer-events-none absolute bottom-[8%] left-[-8%] w-[42vw] h-[44vh] rounded-full bg-orange/[0.06] blur-[150px]"
      />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 py-24 md:py-32">

        {/* Lead — the one idea, blown up */}
        <div className="max-w-3xl">
          <p className="ayv-lead ds-eyebrow text-orange">תוכנית הדגל של הבוגרים</p>

          <h2 className="ayv-lead ds-section-title text-navy mt-4">
            תוכנית יואב
          </h2>
          <p className="ayv-lead ds-section-subtitle text-navy/75 mt-4">
            {YOAV_TAGLINE}
          </p>

          {/* the belief line — "the person in the arena" */}
          <div className="ayv-lead mt-7 flex gap-4 max-w-2xl">
            <span aria-hidden="true" className="mt-1 w-1 shrink-0 rounded-full bg-orange" />
            <p className="font-heebo text-navy/70 leading-relaxed" style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.3rem)' }}>
              {YOAV_ARENA}
            </p>
          </div>

          <p className="ayv-lead font-heebo text-navy/60 mt-6 leading-relaxed max-w-2xl" style={{ fontSize: 'clamp(0.98rem, 1.2vw, 1.15rem)' }}>
            {YOAV_INTRO}
          </p>

          {/* Program facts — a quiet spec strip */}
          <div className="ayv-lead mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
            {YOAV_FACTS.map((f, i) => (
              <Fragment key={f}>
                {i > 0 && <span aria-hidden="true" className="hidden sm:block w-px h-3.5 bg-navy/15" />}
                <span className="font-heebo text-sm md:text-[0.98rem] font-medium text-navy/70">{f}</span>
              </Fragment>
            ))}
          </div>
        </div>

        {/* The journey — three axes as milestones on one spine */}
        <div className="ayv-journey relative mt-20 md:mt-28 max-w-3xl">
          <p className="ayv-step ds-eyebrow text-orange mb-2 pr-[3.5rem] md:pr-[5rem]">מטרות התוכנית</p>
          <p className="ayv-step font-heebo text-navy/55 mb-10 md:mb-12 pr-[3.5rem] md:pr-[5rem]" style={{ fontSize: 'clamp(0.98rem, 1.1vw, 1.1rem)' }}>
            שלושה צירים מרכזיים שמנחים את המסע שלנו.
          </p>

          {/* the spine, centered under the node column at both breakpoints */}
          <div className="pointer-events-none absolute top-[6.5rem] bottom-0 right-0 w-14 md:w-20 flex justify-center">
            <span
              className="ayv-spine block w-[2px] h-full"
              style={{ background: 'linear-gradient(to bottom, rgba(255,135,20,0.5) 0%, rgba(255,135,20,0.5) 88%, transparent 100%)' }}
            />
          </div>

          {AXES.map((a, i) => {
            const Icon = a.icon
            const last = i === AXES.length - 1
            return (
              <div key={a.title} className="ayv-step relative grid grid-cols-[3.5rem_1fr] md:grid-cols-[5rem_1fr] gap-5 md:gap-9 pb-14 md:pb-16 last:pb-0">
                {/* node on the spine - filled orange at the destination (השפעה) */}
                <div className="flex justify-center">
                  <span
                    className={`relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full ring-1 ${
                      last
                        ? 'bg-orange text-white ring-orange shadow-[0_10px_28px_rgba(255,135,20,0.35)]'
                        : 'bg-white text-orange ring-orange/35 shadow-[0_4px_14px_rgba(13,27,75,0.06)]'
                    }`}
                  >
                    <Icon size={24} strokeWidth={1.9} />
                  </span>
                </div>

                {/* content — un-boxed, editorial */}
                <div className="pt-1 md:pt-1.5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-orange/50 text-sm tracking-widest" dir="ltr">0{i + 1}</span>
                    <h3 className="font-ragmarom text-navy leading-none" style={{ fontSize: 'clamp(1.9rem, 3vw, 2.7rem)' }}>
                      {a.title}
                    </h3>
                  </div>
                  <p className="font-heebo font-semibold text-orange mt-2" style={{ fontSize: '0.98rem' }}>
                    {a.subtitle}
                  </p>
                  <p className="font-heebo text-navy/65 leading-[1.85] mt-3.5 max-w-xl" style={{ fontSize: 'clamp(0.98rem, 1.05vw, 1.08rem)' }}>
                    {a.text}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Dedication — its own dignified moment, on a quiet framed panel */}
        <div className="ayv-tribute mt-20 md:mt-28 max-w-3xl">
          <div className="ayv-foot relative overflow-hidden rounded-[1.6rem] border border-navy/10 bg-surface-2 p-8 md:p-12">
            {/* orange edge — a reverent hairline */}
            <span aria-hidden="true" className="absolute inset-y-0 right-0 w-1 bg-orange/70" />

            <p className="ayv-foot font-heebo text-navy/50 text-sm tracking-wide mb-3">התוכנית קרויה על שמו של</p>
            <p className="ayv-foot font-ragmarom text-navy leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              {YOAV_TRIBUTE.name} <span className="text-navy/35">{YOAV_TRIBUTE.honorific}</span>
            </p>

            <p className="ayv-foot font-heebo text-navy/65 mt-5 leading-[1.85] max-w-2xl" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.12rem)' }}>
              {YOAV_TRIBUTE.bio}
            </p>

            <div className="ayv-foot mt-6 flex flex-wrap gap-2.5">
              {YOAV_TRIBUTE.tags.map((t) => (
                <span key={t} className="rounded-full border border-navy/12 bg-white px-3.5 py-1.5 font-heebo text-[0.82rem] font-medium text-navy/70">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Funnel out */}
        <div className="ayv-tribute mt-14 md:mt-16 max-w-3xl">
          <div className="ayv-foot flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-4">
            <Button
              variant="primary"
              size="lg"
              glow
              icon={ChevronLeft}
              href={YOAV_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              להגשת מועמדות לתוכנית יואב
            </Button>

            {/* secondary link — custom navy (Button ghost is white-on-dark only) */}
            <a
              href={YOAV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-heebo font-semibold text-navy/70 transition-colors hover:text-navy"
            >
              לאתר התוכנית המלא
              <ChevronLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
            </a>
          </div>

          <p className="ayv-foot font-heebo text-navy/45 text-sm mt-5">{YOAV_INTERVIEW}</p>
        </div>
      </div>
    </section>
  )
}
