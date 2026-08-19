import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HERO_META } from '../../data/aboutData'

gsap.registerPlugin(ScrollTrigger)

/**
 * אודות hero — deliberately NOT the site's poster hero.
 *
 * Every other page opens with a dark full-bleed photo, giant RagMarom and a
 * pair of CTAs. This one is a light typographic title page: warm off-white, a
 * monumental ghost "2014" behind the founding thesis, and no CTA at all — the
 * page's job is to be read, so the only door is the closing band.
 *
 * Motion is quiet to match: the numeral drifts up on a slow scrub while the
 * headline masks in char by char.
 */

function Chars({ text, cls = '' }) {
  return (
    <span aria-hidden="true">
      {[...text].map((ch, i) => (
        <span key={i} className={`abh-char inline-block will-change-transform ${cls}`}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

export default function AboutHeroV2() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo('.abh-ghost',
        { opacity: 0, scale: 1.08, filter: 'blur(14px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.8, ease: 'power2.out' },
        0
      )
        .fromTo('.abh-eyebrow', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.25)
        .fromTo('.abh-line-a .abh-char',
          { yPercent: 112 },
          { yPercent: 0, duration: 1.05, stagger: 0.045 },
          0.35
        )
        .fromTo('.abh-line-b .abh-char',
          { yPercent: 112 },
          { yPercent: 0, duration: 1.05, stagger: 0.045 },
          '-=0.78'
        )
        .fromTo('.abh-rule', { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, '-=0.45')
        .fromTo('.abh-meta', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.55')
        .fromTo('.abh-scroll', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.3')

      /* the numeral drifts against the copy as you leave — depth without a photo */
      gsap.to('.abh-ghost', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.abh-content', {
        yPercent: 8,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about-top"
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center bg-surface text-navy"
    >
      {/* warm glows — the only colour on the page above the fold */}
      <div className="pointer-events-none absolute top-[-14%] right-[6%] w-[55vw] h-[50vh] rounded-full bg-orange/12 blur-[170px]" />
      <div className="pointer-events-none absolute bottom-[-12%] left-[-6%] w-[45vw] h-[45vh] rounded-full bg-orange/8 blur-[150px]" />

      {/* ── The ghost numeral ── the year as the page's only "image".
          LTR-locked: a Hebrew RTL context would otherwise reorder nothing here,
          but dir="ltr" keeps the digits unambiguous at any bidi nesting. */}
      <div
        aria-hidden="true"
        dir="ltr"
        className="abh-ghost pointer-events-none absolute inset-0 flex items-center justify-center select-none will-change-transform"
      >
        <span
          className="font-ragmarom leading-none text-navy/[0.055]"
          style={{ fontSize: 'clamp(13rem, 40vw, 44rem)', letterSpacing: '-0.02em' }}
        >
          2014
        </span>
      </div>

      {/* ── Title-page content ── */}
      <div className="abh-content relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 md:px-16 text-center will-change-transform">
        <p className="abh-eyebrow ds-eyebrow text-orange-ink mb-8 md:mb-10">הסיפור שלנו</p>

        <h1 className="text-navy select-none" aria-label="אפשר לחנך אחרת">
          <span
            className="abh-line-a block overflow-hidden font-ragmarom leading-[0.94] tracking-tight"
            style={{ fontSize: 'clamp(3.6rem, 11vw, 9rem)' }}
          >
            <Chars text="אפשר לחנך" />
          </span>
          <span
            className="abh-line-b block overflow-hidden font-ragmarom leading-[0.94] tracking-tight text-orange-ink mt-1"
            style={{ fontSize: 'clamp(3.6rem, 11vw, 9rem)' }}
          >
            <Chars text="אחרת." />
          </span>
        </h1>

        {/* rule + the founding facts, set like a book's colophon */}
        <div
          className="abh-rule mx-auto mt-12 md:mt-16 h-px bg-navy/15 origin-center"
          style={{ maxWidth: '34rem' }}
        />
        <div className="abh-meta mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-heebo text-navy/50 text-sm md:text-base">
          {HERO_META.map((m, i) => (
            <span key={m} className="inline-flex items-center gap-x-6">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-orange inline-block" aria-hidden="true" />}
              <span>{m}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Scroll hint — navy variant, since this hero is light ── */}
      <div
        className="abh-scroll scroll-indicator absolute left-1/2 -translate-x-1/2 z-10 hidden md:block"
        style={{ bottom: 'max(1.6rem, env(safe-area-inset-bottom, 1.6rem))' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-navy/20 flex items-start justify-center pt-2">
          <div className="w-1 h-2.5 bg-navy/40 rounded-full" />
        </div>
      </div>
    </section>
  )
}
