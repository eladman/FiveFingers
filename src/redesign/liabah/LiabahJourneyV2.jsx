import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { essence } from '../../data/liabahData'

gsap.registerPlugin(ScrollTrigger)

/**
 * The journey — מסוגלות → שייכות → השפעה, the page's signature moment.
 *
 * One connected path that draws itself. As the section enters view, a single
 * orange spine traces top-to-bottom; each stage node *ignites* the instant the
 * line reaches it (scale + sonar ping), its title wipes up, its copy follows.
 * The whole thing plays as one continuous timeline — the literal "דרך אחת",
 * performed rather than merely fading in. Reduced motion shows everything at
 * rest, immediately.
 *
 * Below, the method triptych — three duotone anchors, now titled in its own
 * right ("שלושה עוגנים. חוויה אחת.").
 */

/** One-line summary per pillar — the first sentence of the full copy. */
const firstSentence = (text) => {
  const s = text.trim().split('. ')[0].trim()
  return s.endsWith('.') ? s : s + '.'
}

export default function LiabahJourneyV2() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // ── Header: eyebrow, title, stage-name kicker ──
        gsap.from('.jr-head > *', {
          y: 30, opacity: 0, duration: 0.65, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: '.jr-head', start: 'top 82%', once: true },
        })

        // ── The journey: one connected, sequential draw ──
        // A single timeline so the spine and each node ignite in lockstep.
        const steps = gsap.utils.toArray('.jr-step')
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: '.jr-path', start: 'top 74%', once: true },
        })

        steps.forEach((step, i) => {
          const q = (sel) => step.querySelector(sel)
          const node  = q('.jr-node')
          const ping  = q('.jr-ping')
          const title = q('.jr-title')
          const text  = q('.jr-text')
          const spine = q('.jr-spine-fill')

          // Node ignites — scale-in with an overshoot, then a sonar ping.
          tl.fromTo(node,
            { scale: 0.4, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.36, ease: 'back.out(2.2)' },
            i === 0 ? 0 : '>-0.22'
          )
          tl.fromTo(ping,
            { scale: 0.8, opacity: 0.6 },
            { scale: 2.4, opacity: 0, duration: 0.65, ease: 'power2.out' },
            '<0.04'
          )
          // Title wipes up.
          tl.fromTo(title,
            { clipPath: 'inset(0% 0% 100% 0%)', y: 22 },
            { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 0.5 },
            '<'
          )
          // Copy follows.
          tl.fromTo(text,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.42 },
            '<0.1'
          )
          // Spine draws down toward the next node.
          if (spine) {
            tl.fromTo(spine,
              { scaleY: 0 },
              { scaleY: 1, duration: 0.5, ease: 'power1.inOut' },
              '<0.06'
            )
          }
        })

        // ── Method triptych ──
        gsap.from('.jr-method-head > *', {
          y: 28, opacity: 0, duration: 0.6, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: '.jr-method-head', start: 'top 84%', once: true },
        })
        gsap.fromTo('.jr-pillar',
          { y: 48, opacity: 0, clipPath: 'inset(0% 0% 14% 0%)' },
          {
            y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)',
            stagger: 0.1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.jr-pillars', start: 'top 82%', once: true },
          }
        )
      })

      // Reduced motion: everything present, at rest.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.jr-head > *, .jr-node, .jr-title, .jr-text, .jr-method-head > *, .jr-pillar',
          { opacity: 1, x: 0, y: 0, scale: 1, clipPath: 'none' })
        gsap.set('.jr-ping', { opacity: 0 })
        gsap.set('.jr-spine-fill', { scaleY: 1 })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="liabah-journey"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-navy-deep"
    >
      {/* ambient depth — a soft top-lift over the deep navy + a warm ember */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(30,53,120,0.28) 0%, rgba(8,16,40,0) 42%)' }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 78% 46% at 50% 26%, rgba(255,135,20,0.08) 0%, transparent 64%)' }}
      />

      {/* ── The journey: one connected path ── */}
      <div className="relative max-w-screen-2xl w-full mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pt-24 lg:pt-32">
        {/* header */}
        <div className="jr-head relative z-20">
          <p className="ds-eyebrow text-orange mb-3">התהליך</p>
          <h2 className="font-ragmarom text-white leading-[0.95]" style={{ fontSize: 'clamp(2.2rem, 4vw, 4.2rem)' }}>
            שלושה שלבים. <span className="text-orange">דרך אחת.</span>
          </h2>
          {/* stage-name kicker — the three beats, at a glance */}
          <div className="mt-6 flex items-center gap-3 font-heebo font-medium text-white/55"
            style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1.05rem)', letterSpacing: '0.04em' }}>
            {essence.stages.map((s, i) => (
              <span key={s.num} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-orange/70" />}
                {s.title}
              </span>
            ))}
          </div>
        </div>

        {/* the path — all three steps at once, threaded by one spine */}
        <div className="jr-path relative mt-16 lg:mt-24">
          {essence.stages.map((s, i) => {
            const last = i === essence.stages.length - 1
            return (
              <div
                key={s.num}
                className="jr-step relative grid grid-cols-[3.25rem_1fr] lg:grid-cols-[4.5rem_1fr] gap-x-6 lg:gap-x-12"
              >
                {/* spine column: node + connecting line */}
                <div className="relative flex flex-col items-center">
                  <span
                    className="jr-node relative z-10 grid place-items-center rounded-full bg-navy-deep border-2 border-orange text-orange font-heebo font-bold shrink-0 h-[3.25rem] w-[3.25rem] lg:h-[4.5rem] lg:w-[4.5rem]"
                    style={{ boxShadow: '0 0 0 6px rgba(255,135,20,0.10), 0 0 34px rgba(255,135,20,0.30)', fontSize: 'clamp(1rem, 1.4vw, 1.4rem)' }}
                    dir="ltr"
                  >
                    {/* sonar ping — fires as the line reaches this node */}
                    <span aria-hidden="true" className="jr-ping pointer-events-none absolute inset-0 rounded-full border border-orange/60" />
                    {i + 1}
                  </span>
                  {!last && (
                    <span aria-hidden="true" className="relative flex-1 w-[3px] overflow-hidden rounded-full bg-white/10">
                      <span
                        className="jr-spine-fill absolute inset-0 origin-top rounded-full bg-gradient-to-b from-orange to-orange/40"
                        style={{ boxShadow: '0 0 14px rgba(255,135,20,0.45)' }}
                      />
                    </span>
                  )}
                </div>

                {/* content */}
                <div className={`relative ${last ? 'pb-2 lg:pb-6' : 'pb-16 lg:pb-28'}`}>
                  <h3
                    className="jr-title relative z-10 font-ragmarom text-white leading-[0.95]"
                    style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', willChange: 'clip-path, transform' }}
                  >
                    {s.title}
                  </h3>
                  <p className="jr-text relative z-10 font-heebo text-white/75 leading-[1.8] mt-4 lg:mt-6 max-w-md" style={{ fontSize: 'clamp(1.02rem, 1.25vw, 1.25rem)' }}>
                    {s.text}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── The method triptych ── */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pt-16 lg:pt-28 pb-24 lg:pb-32">
        {/* method header — gives the block its own footing */}
        <div className="jr-method-head mb-10 lg:mb-16">
          <p className="ds-eyebrow text-orange mb-3">השיטה</p>
          <h2 className="font-ragmarom text-white leading-[0.95]" style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3.6rem)' }}>
            שלושה עוגנים. <span className="text-orange">חוויה אחת.</span>
          </h2>
        </div>

        <div className="jr-pillars grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {essence.pillars.map((p) => (
            <figure
              key={p.title}
              className="jr-pillar group relative overflow-hidden rounded-[1.6rem] lg:rounded-[2rem] ring-1 ring-white/5 transition-transform duration-500 ease-out hover:-translate-y-1.5"
            >
              <div className="relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden">
                <img
                  src={p.imageSrc}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover grayscale-[.55] contrast-[1.05] transition-[filter,transform] duration-700 ease-out group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-[1.05]"
                  style={{ objectPosition: p.objectPosition || '50% 50%' }}
                />
                <div className="absolute inset-0 bg-orange/15 mix-blend-multiply pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/92 via-navy-deep/20 to-transparent pointer-events-none" />
              </div>

              <figcaption className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <h4 className="font-ragmarom text-white leading-none" style={{ fontSize: 'clamp(1.7rem, 2.4vw, 2.4rem)' }}>
                  {p.title}
                </h4>
                {/* orange hairline rule */}
                <span aria-hidden="true" className="mt-4 block h-px w-10 origin-right bg-orange/70 transition-all duration-500 ease-out group-hover:w-16" />
                <p className="font-heebo text-white/70 leading-relaxed mt-4 max-w-sm" style={{ fontSize: 'clamp(0.92rem, 1vw, 1.05rem)' }}>
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
