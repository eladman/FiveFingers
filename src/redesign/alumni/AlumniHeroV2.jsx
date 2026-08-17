import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../../components/ui/Button'
import { HERO, YOAV_URL } from '../../data/alumniData'

gsap.registerPlugin(ScrollTrigger)

/**
 * בוגרים hero — "Into the Arena" language (the AmirHeroV2 pattern). One
 * full-bleed movement photo, poster-scale RagMarom anchored to the base:
 * "הדרך" giant with "רק מתחילה." as the orange second line, the community
 * numbers as a quiet data strip, and the Yoav funnel as the primary door.
 * Racks focus into the essence sheet on scroll-out.
 */

const META = ['מאז 2014', '+3,000 בוגרים ובוגרות', 'תוכנית יואב · תוכנית הדגל']

function Chars({ text }) {
  return (
    <span aria-hidden="true">
      {[...text].map((ch, i) => (
        <span key={i} className="alh-char inline-block will-change-transform">
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

export default function AlumniHeroV2({ onBook }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      /* entrance choreography */
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo('.alh-photo',
        { scale: 1.08 },
        { scale: 1, duration: 1.6, ease: 'power2.out' },
        0
      )
        .fromTo('.alh-eyebrow', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.1)
        .fromTo('.alh-word-a .alh-char',
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.055 },
          0.15
        )
        .fromTo('.alh-word-b .alh-char',
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.045 },
          '-=0.8'
        )
        .fromTo('.alh-sub',
          { y: 26, opacity: 0, filter: 'blur(8px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7 },
          '-=0.55'
        )
        .fromTo('.alh-cta',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
          '-=0.35'
        )
        .fromTo('.alh-meta',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.25'
        )
        .fromTo('.alh-scroll', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2')

      /* scroll-out: rack focus into the next scene */
      gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
        .to('.alh-stage', { scale: 1.08, ease: 'none' }, 0)
        .to('.alh-content', { yPercent: -22, opacity: 0, filter: 'blur(5px)', ease: 'none' }, 0)
        .to('.alh-out-scrim', { opacity: 0.7, ease: 'none' }, 0)
        .to('.alh-scroll', { opacity: 0, ease: 'none' }, 0)
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="alumni-top"
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-end bg-navy-deep"
    >
      {/* ── Stage: photo + grade ── */}
      <div className="alh-stage absolute inset-0 will-change-transform">
        <img
          src={HERO.src}
          alt=""
          className="alh-photo absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ objectPosition: 'center 30%' }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {/* warm grade + legibility scrims — same stack as the home hero */}
        <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
        <div className="alh-out-scrim absolute inset-0 bg-black" style={{ opacity: 0 }} />
      </div>

      {/* ── Content — poster composition, anchored to the base ── */}
      <div className="alh-content relative z-10 w-full max-w-screen-2xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pb-[clamp(5rem,12vh,9rem)] pt-40 will-change-transform">
        <p className="alh-eyebrow ds-eyebrow text-orange mb-4" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}>
          בוגרים ובוגרות · תנועת חמש אצבעות
        </p>

        <h1 className="text-white select-none" aria-label="הדרך רק מתחילה">
          <span
            className="alh-word-a block overflow-hidden font-ragmarom leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(3.6rem, 14vw, 11rem)', textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}
          >
            <Chars text="הדרך" />
          </span>
          <span
            className="alh-word-b block overflow-hidden font-ragmarom leading-[0.95] text-orange mt-1"
            style={{ fontSize: 'clamp(1.9rem, 5.4vw, 4.6rem)', textShadow: '0 2px 24px rgba(0,0,0,0.7)' }}
          >
            <Chars text="רק מתחילה." />
          </span>
        </h1>

        <p
          className="alh-sub font-heebo text-white/85 mt-6 max-w-xl leading-relaxed"
          style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.35rem)', textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}
        >
          כשהמסלול נגמר, הקהילה רק מתחילה: רשת של אלפי בוגרים ובוגרות, ובליבה
          תוכנית יואב: תוכנית הדגל למקסום הפוטנציאל ולהשפעה על המציאות שלנו.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-9">
          <Button
            variant="primary"
            size="lg"
            glow
            href={YOAV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="alh-cta"
          >
            להכיר את תוכנית יואב
          </Button>
          <Button variant="ghost" size="lg" onClick={() => onBook?.()} className="alh-cta">
            דברו איתנו
          </Button>
        </div>

        {/* data strip */}
        <div
          className="alh-meta mt-12 pt-5 border-t border-white/15 flex flex-wrap items-center gap-x-8 gap-y-2 text-white/60 font-heebo text-sm md:text-base"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}
        >
          {META.map((m, i) => (
            <span key={m} className="inline-flex items-center gap-x-8">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-orange inline-block" aria-hidden="true" />}
              <span>{m}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div
        className="alh-scroll scroll-indicator absolute left-1/2 -translate-x-1/2 z-10 hidden md:block"
        style={{ bottom: 'max(1.6rem, env(safe-area-inset-bottom, 1.6rem))' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/25 flex items-start justify-center pt-2">
          <div className="w-1 h-2.5 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
