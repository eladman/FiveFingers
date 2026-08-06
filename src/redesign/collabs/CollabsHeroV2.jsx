import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../../components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

/**
 * שיתופי פעולה hero — "Into the Arena" language, cinematic-lite, B2B voice.
 * One full-bleed training photo, the poster-scale "מהלכה למעשה" with
 * char-mask entrance, and the movement's B2B numbers as a quiet data strip
 * (replaces the old separate stats section). Racks focus on scroll-out.
 */

const HERO_IMAGE = '/our_product_pics/collab_pic.jpg'

// Real numbers from the catalog's "מי אנחנו" page.
const META = ['50,000+ שעות אימון והדרכה', '10,000+ בוגרים וחניכים', '100+ ארגונים שותפים']

function Chars({ text }) {
  return (
    <span aria-hidden="true">
      {[...text].map((ch, i) => (
        <span key={i} className="chv2-char inline-block will-change-transform">
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

export default function CollabsHeroV2({ onRegister }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      /* entrance choreography */
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo('.chv2-photo',
        { scale: 1.08 },
        { scale: 1, duration: 1.6, ease: 'power2.out' },
        0
      )
        .fromTo('.chv2-word-a .chv2-char',
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.055 },
          0.15
        )
        .fromTo('.chv2-word-b .chv2-char',
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.045 },
          '-=0.8'
        )
        .fromTo('.chv2-sub',
          { y: 26, opacity: 0, filter: 'blur(8px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7 },
          '-=0.55'
        )
        .fromTo('.chv2-cta',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
          '-=0.35'
        )
        .fromTo('.chv2-meta',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.25'
        )
        .fromTo('.chv2-scroll', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2')

      /* scroll-out: rack focus into the essence sheet */
      gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
        .to('.chv2-stage', { scale: 1.08, ease: 'none' }, 0)
        .to('.chv2-content', { yPercent: -22, opacity: 0, filter: 'blur(5px)', ease: 'none' }, 0)
        .to('.chv2-out-scrim', { opacity: 0.7, ease: 'none' }, 0)
        .to('.chv2-scroll', { opacity: 0, ease: 'none' }, 0)
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="collabs-top"
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-end bg-navy-deep"
    >
      {/* ── Stage: photo + grade ── */}
      <div className="chv2-stage absolute inset-0 will-change-transform">
        <img
          src={HERO_IMAGE}
          alt=""
          className="chv2-photo absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ objectPosition: 'center 30%' }}
          loading="eager"
          decoding="async"
        />
        {/* warm grade + legibility scrims — same stack as the home hero */}
        <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        <div className="chv2-out-scrim absolute inset-0 bg-black" style={{ opacity: 0 }} />
      </div>

      {/* ── Content — poster composition, anchored to the base ── */}
      <div className="chv2-content relative z-10 w-full max-w-screen-2xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pb-[clamp(5rem,12vh,9rem)] pt-40 will-change-transform">
        <p className="ds-eyebrow text-orange mb-4" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}>
          בית תוכן והכשרות · לארגונים, צוותים ויחידות
        </p>

        <h1 className="text-white select-none" aria-label="מהלכה למעשה — הכשרות חמש אצבעות לארגונים">
          <span
            className="chv2-word-a block overflow-hidden font-ragmarom leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(3.6rem, 14vw, 11rem)', textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}
          >
            <Chars text="מהלכה למעשה" />
          </span>
          <span
            className="chv2-word-b block overflow-hidden font-ragmarom leading-[0.95] text-orange mt-1"
            style={{ fontSize: 'clamp(1.7rem, 4.6vw, 4rem)', textShadow: '0 2px 24px rgba(0,0,0,0.7)' }}
          >
            <Chars text="שיטת חמש אצבעות, אצלכם" />
          </span>
        </h1>

        <p
          className="chv2-sub font-heebo text-white/85 mt-6 max-w-xl leading-relaxed"
          style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.35rem)', textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}
        >
          תוכן והכשרות שמייצרים חוסן מנטלי, מנהיגות ומצוינות — לארגונים, צוותים, יחידות וספורטאים.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-9">
          <Button variant="primary" size="lg" glow onClick={onRegister} className="chv2-cta">
            לתיאום שיחת ייעוץ
          </Button>
          <Button variant="ghost" size="lg" href="#collabs-worlds" className="chv2-cta">
            מה תקבלו
          </Button>
        </div>

        {/* data strip */}
        <div
          className="chv2-meta mt-12 pt-5 border-t border-white/15 flex flex-wrap items-center gap-x-8 gap-y-2 text-white/60 font-heebo text-sm md:text-base"
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
        className="chv2-scroll scroll-indicator absolute left-1/2 -translate-x-1/2 z-10 hidden md:block"
        style={{ bottom: 'max(1.6rem, env(safe-area-inset-bottom, 1.6rem))' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/25 flex items-start justify-center pt-2">
          <div className="w-1 h-2.5 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
