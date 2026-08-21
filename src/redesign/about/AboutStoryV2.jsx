import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LEAD, STORY, PHOTOS, VISION } from '../../data/aboutData'

gsap.registerPlugin(ScrollTrigger)

/**
 * The story — one continuous editorial read, not a stack of sections.
 *
 * A single narrow measure (~40rem) carries the whole narrative; the four
 * movements are separated by hanging markers rather than headings, two photos
 * break out wider to give the read a pulse, and it lands on the vision as its
 * closing statement. Deliberately quiet: fades and rises only, no scrub
 * theatrics — the hero already spent the page's motion budget.
 */
export default function AboutStoryV2() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.utils.toArray('.abs-rise').forEach((el) => {
        gsap.fromTo(el,
          { y: 34, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.95, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        )
      })

      gsap.fromTo('.abs-vision-word > span',
        { yPercent: 115 },
        {
          yPercent: 0, stagger: 0.05, duration: 0.9, ease: 'power4.out',
          scrollTrigger: { trigger: '.abs-vision', start: 'top 80%', once: true },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about-story"
      ref={ref}
      dir="rtl"
      className="relative z-10 w-full overflow-hidden bg-surface-2 text-navy"
    >
      <div className="pointer-events-none absolute top-[20%] left-[-10%] w-[45vw] h-[50vh] rounded-full bg-orange/8 blur-[160px]" />

      {/* The read. One measure for the prose; photos break out of it below. */}
      <div className="relative z-10 max-w-[46rem] mx-auto px-6 sm:px-10 pt-24 md:pt-36 pb-8">
        <p
          className="abs-rise font-heebo text-navy leading-[1.7]"
          style={{ fontSize: 'clamp(1.25rem, 2vw, 1.7rem)' }}
        >
          {LEAD}
        </p>
      </div>

      {STORY.map((mv) => (
        <div key={mv.id}>
          <div className="relative z-10 max-w-[46rem] mx-auto px-6 sm:px-10">
            {/* hanging marker — the movement's name, and its year when we have one */}
            <div className="abs-rise flex items-baseline gap-4 mt-14 md:mt-20 mb-6">
              {mv.marker && (
                <span
                  dir="ltr"
                  className="font-ragmarom text-orange-ink leading-none"
                  style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)' }}
                >
                  {mv.marker}
                </span>
              )}
              <span className="ds-eyebrow text-navy/40">{mv.label}</span>
              <span aria-hidden="true" className="flex-1 h-px bg-navy/10" />
            </div>

            {mv.paras.map((p, i) => (
              <p
                key={i}
                className="abs-rise font-heebo text-navy/75 leading-[1.95] mt-5 first:mt-0"
                style={{ fontSize: 'clamp(1.02rem, 1.15vw, 1.18rem)' }}
              >
                {p}
              </p>
            ))}

            {/* Founder card — the in-context door to עמיר's dedicated page,
                kept out of the nav and dropped where the story introduces him. */}
            {mv.founder && (
              <a
                href={mv.founder.href}
                className="abs-rise group relative mt-10 flex flex-col sm:flex-row items-stretch overflow-hidden rounded-[1.4rem] bg-white border border-line shadow-sm shadow-navy/5 transition-all duration-300 hover:shadow-xl hover:shadow-navy/10 hover:-translate-y-0.5 hover:border-orange/30"
              >
                {/* Portrait */}
                <div className="relative shrink-0 sm:w-44 md:w-52">
                  <img
                    src={mv.founder.photo.src}
                    width={mv.founder.photo.w}
                    height={mv.founder.photo.h}
                    alt={mv.founder.photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-52 w-full sm:h-full object-cover"
                    style={{ objectPosition: 'center 22%' }}
                  />
                </div>

                {/* Copy */}
                <div className="flex flex-1 flex-col justify-center p-6 md:p-7">
                  <span className="ds-eyebrow text-orange-ink">{mv.founder.eyebrow}</span>
                  <h3 className="font-ragmarom text-navy leading-tight mt-2" style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)' }}>
                    {mv.founder.name}
                  </h3>
                  <p className="font-heebo text-navy/55 text-sm leading-relaxed mt-1.5">
                    {mv.founder.role}
                  </p>
                  <p className="font-heebo text-navy/75 leading-relaxed mt-3" style={{ fontSize: 'clamp(0.98rem, 1.1vw, 1.08rem)' }}>
                    {mv.founder.teaser}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-4 font-heebo font-semibold text-orange-ink group-hover:text-orange transition-colors">
                    {mv.founder.cta}
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
                  </span>
                </div>
              </a>
            )}
          </div>

          {/* photo breaks the measure — wider, with a caption in the margin */}
          {mv.photo && (
            <figure className="abs-rise relative z-10 max-w-5xl mx-auto px-6 sm:px-10 mt-14 md:mt-20">
              <div className="overflow-hidden rounded-[1.4rem] md:rounded-[2rem]">
                <img
                  src={PHOTOS[mv.photo].src}
                  width={PHOTOS[mv.photo].w}
                  height={PHOTOS[mv.photo].h}
                  alt={PHOTOS[mv.photo].alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[16/10] md:aspect-[2/1] object-cover"
                  style={{ objectPosition: 'center 40%' }}
                />
              </div>
              <figcaption className="font-heebo text-navy/45 text-sm mt-4">
                {PHOTOS[mv.photo].caption}
              </figcaption>
            </figure>
          )}
        </div>
      ))}

      {/* ── The last beat: where the story is going ── */}
      <div className="abs-vision relative z-10 max-w-[46rem] mx-auto px-6 sm:px-10 mt-20 md:mt-28 pt-14 md:pt-20 border-t border-line pb-24 md:pb-36">
        <p className="abs-rise ds-eyebrow text-orange-ink mb-7">{VISION.label}</p>

        <h2
          className="font-ragmarom leading-[1.08] text-navy"
          style={{ fontSize: 'clamp(1.9rem, 4.2vw, 3.4rem)', textWrap: 'balance' }}
        >
          {VISION.statement.split(' ').map((w, i) => (
            <span key={i} className="abs-vision-word inline-block overflow-hidden align-bottom" style={{ marginInlineEnd: '0.26em' }}>
              <span className="inline-block will-change-transform">{w}</span>
            </span>
          ))}
        </h2>

        <p
          className="abs-rise font-heebo text-navy/75 leading-[1.95] mt-7"
          style={{ fontSize: 'clamp(1.02rem, 1.15vw, 1.18rem)' }}
        >
          {VISION.body}
        </p>
      </div>
    </section>
  )
}
