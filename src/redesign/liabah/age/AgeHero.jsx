import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import Button from '../../../components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

/**
 * Age-band page hero — the LiabahHeroV2 language at a lighter weight:
 * one full-bleed photo, a two-line RagMarom poster title with word-mask
 * entrance (no per-char animation here — that stays unique to the parent
 * page), a breadcrumb back to קבוצות הנוער, and the band facts as a
 * data strip. Racks focus into the overview on scroll-out.
 */
export default function AgeHero({ page, onRegister }) {
  const ref = useRef(null)
  const { hero } = page

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo('.agh-photo', { scale: 1.08 }, { scale: 1, duration: 1.6, ease: 'power2.out' }, 0)
        .fromTo('.agh-crumb', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.1)
        .fromTo('.agh-line-a', { yPercent: 110 }, { yPercent: 0, duration: 1.05 }, 0.2)
        .fromTo('.agh-line-b', { yPercent: 110 }, { yPercent: 0, duration: 1.05 }, '-=0.8')
        .fromTo('.agh-sub',
          { y: 26, opacity: 0, filter: 'blur(8px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7 },
          '-=0.55'
        )
        .fromTo('.agh-cta', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, '-=0.35')
        .fromTo('.agh-meta', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.25')

      gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
        .to('.agh-stage', { scale: 1.08, ease: 'none' }, 0)
        .to('.agh-content', { yPercent: -22, opacity: 0, filter: 'blur(5px)', ease: 'none' }, 0)
        .to('.agh-out-scrim', { opacity: 0.7, ease: 'none' }, 0)
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id={`liabah/${page.id}-top`}
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-end bg-navy-deep"
    >
      {/* ── Stage: photo + grade ── */}
      <div className="agh-stage absolute inset-0 will-change-transform">
        <img
          src={hero.imageSrc}
          alt=""
          className="agh-photo absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ objectPosition: hero.imagePosition }}
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        <div className="agh-out-scrim absolute inset-0 bg-black" style={{ opacity: 0 }} />
      </div>

      {/* ── Content — poster composition, anchored to the base ── */}
      <div className="agh-content relative z-10 w-full max-w-screen-2xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pb-[clamp(5rem,12vh,9rem)] pt-40 will-change-transform">
        {/* breadcrumb back to the parent page */}
        <a
          href="#liabah"
          className="agh-crumb tap-safe inline-flex items-center gap-1.5 font-heebo text-sm md:text-base text-white/60 hover:text-white transition-colors"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}
        >
          <ArrowRight size={16} className="text-orange" aria-hidden="true" />
          קבוצות הנוער
        </a>

        <p className="ds-eyebrow text-orange mt-6 mb-4" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}>
          {hero.eyebrow}
        </p>

        <h1 className="text-white select-none" aria-label={`${hero.titleA} — ${hero.titleB}`}>
          <span className="block overflow-hidden" aria-hidden="true">
            <span
              className="agh-line-a block font-ragmarom leading-[0.95] tracking-tight will-change-transform"
              style={{ fontSize: 'clamp(3rem, 11vw, 9rem)', textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}
            >
              {hero.titleA}
            </span>
          </span>
          <span className="block overflow-hidden mt-1" aria-hidden="true">
            <span
              className="agh-line-b block font-ragmarom leading-[1.0] text-orange will-change-transform"
              style={{ fontSize: 'clamp(1.7rem, 4.6vw, 4rem)', textShadow: '0 2px 24px rgba(0,0,0,0.7)' }}
            >
              {hero.titleB}
            </span>
          </span>
        </h1>

        <p
          className="agh-sub font-heebo text-white/85 mt-6 max-w-xl leading-relaxed"
          style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.35rem)', textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}
        >
          {hero.subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-9">
          <Button variant="primary" size="lg" glow onClick={onRegister} className="agh-cta">
            הרשמה לקבוצה
          </Button>
          <Button variant="ghost" size="lg" href={`#liabah/${page.id}-overview`} className="agh-cta">
            גלו עוד
          </Button>
        </div>

        {/* data strip — the band facts */}
        <div
          className="agh-meta mt-12 pt-5 border-t border-white/15 flex flex-wrap items-center gap-x-8 gap-y-2 text-white/60 font-heebo text-sm md:text-base"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}
        >
          {hero.meta.map((m, i) => (
            <span key={m} className="inline-flex items-center gap-x-8">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-orange inline-block" aria-hidden="true" />}
              <span>{m}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
