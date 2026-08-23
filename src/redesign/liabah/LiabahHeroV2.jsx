import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft } from 'lucide-react'
import Button from '../../components/ui/Button'
import { hero } from '../../data/liabahData'
import { agePages, agePageOrder } from '../../data/liabahAgeData'

gsap.registerPlugin(ScrollTrigger)

/**
 * ליבה hero — "Into the Arena" language, cinematic-lite.
 * One full-bleed action photo (no WebGL — that stays unique to the home
 * ArenaHero), a poster-scale RagMarom composition with char-mask entrance,
 * and a row of three age-band cards so a parent lands straight on their kid's
 * track (young / middle / high) without scrolling. Racks focus into the next
 * scene on scroll-out.
 */

const HERO_IMAGE = '/liba_pics/214A1552.jpg'

// The three age bands, straight from the age-page source so labels/routes stay
// in sync. Parents scan by age, so the age range is the card's headline —
// lifted from each page's meta ("גילאי 10–12 · כיתות ה׳–ו׳") — with the grade
// range ("כיתות ה׳–ו׳") from the eyebrow as the supporting line.
const AGE_CARDS = agePageOrder.map((id, i) => {
  const p = agePages[id]
  return {
    id,
    path: p.path,
    title: p.navLabel,
    age: (p.hero.meta[0]?.split('·')[0] || '').replace('גילאי', '').trim(),
    grades: p.hero.eyebrow.split('·')[1]?.trim() || '',
    index: String(i + 1),
  }
})

function Chars({ text }) {
  return (
    <span aria-hidden="true">
      {[...text].map((ch, i) => (
        <span key={i} className="lhv2-char inline-block will-change-transform">
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

export default function LiabahHeroV2({ onRegister }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      /* entrance choreography */
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo('.lhv2-photo',
        { scale: 1.08 },
        { scale: 1, duration: 1.6, ease: 'power2.out' },
        0
      )
        .fromTo('.lhv2-word-a .lhv2-char',
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.055 },
          0.15
        )
        .fromTo('.lhv2-word-b .lhv2-char',
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.045 },
          '-=0.8'
        )
        .fromTo('.lhv2-sub',
          { y: 26, opacity: 0, filter: 'blur(8px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7 },
          '-=0.55'
        )
        .fromTo('.lhv2-cta',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.35'
        )
        // ── The age picker is its own beat: it only begins once the title +
        // subtitle + CTA above have settled. Label + rule-wipe first, then the
        // cards stagger in (40ms apart per Material motion guidance). Adding a
        // small explicit gap (+=0.05) keeps it reading as a distinct section.
        .addLabel('picker', '+=0.05')
        .fromTo('.lhv2-picker-rule',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: 'power3.inOut', transformOrigin: 'right' },
          'picker'
        )
        .fromTo('.lhv2-picker-label',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 },
          'picker+=0.1'
        )
        .fromTo('.lhv2-card',
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.08 },
          'picker+=0.2'
        )
        .fromTo('.lhv2-scroll', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.15')

      /* scroll-out: rack focus into the essence sheet */
      gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
        .to('.lhv2-stage', { scale: 1.08, ease: 'none' }, 0)
        .to('.lhv2-content', { yPercent: -22, opacity: 0, filter: 'blur(5px)', ease: 'none' }, 0)
        .to('.lhv2-out-scrim', { opacity: 0.7, ease: 'none' }, 0)
        .to('.lhv2-scroll', { opacity: 0, ease: 'none' }, 0)
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="liabah-top"
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-end bg-navy-deep"
    >
      {/* ── Stage: photo + grade ── */}
      <div className="lhv2-stage absolute inset-0 will-change-transform">
        <img
          src={HERO_IMAGE}
          alt=""
          className="lhv2-photo absolute inset-0 w-full h-full object-cover will-change-transform"
          loading="eager"
          decoding="async"
        />
        {/* warm grade + legibility scrims — same stack as the home hero */}
        <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
        <div className="lhv2-out-scrim absolute inset-0 bg-black" style={{ opacity: 0 }} />
      </div>

      {/* ── Content — poster composition, anchored to the base ── */}
      <div className="lhv2-content relative z-10 w-full max-w-screen-2xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pb-[clamp(3.5rem,9vh,7rem)] pt-36 will-change-transform">
        <p className="ds-eyebrow text-orange mb-4" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}>
          {hero.eyebrow}
        </p>

        <h1 className="text-white select-none" aria-label="קבוצות הנוער, המקום שבו נכנסים לזירה">
          <span
            className="lhv2-word-a block overflow-hidden font-ragmarom leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(3.4rem, 12vw, 9.5rem)', textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}
          >
            <Chars text="קבוצות הנוער" />
          </span>
          <span
            className="lhv2-word-b block overflow-hidden font-ragmarom leading-[0.95] text-orange mt-1"
            style={{ fontSize: 'clamp(1.6rem, 4.2vw, 3.6rem)', textShadow: '0 2px 24px rgba(0,0,0,0.7)' }}
          >
            <Chars text="כאן נכנסים לזירה" />
          </span>
        </h1>

        <p
          className="lhv2-sub font-heebo text-white/85 mt-5 max-w-xl leading-relaxed"
          style={{ fontSize: 'clamp(1.02rem, 1.4vw, 1.28rem)', textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}
        >
          {hero.subtitle}
        </p>

        <div className="mt-7">
          <Button variant="primary" size="lg" glow onClick={onRegister} className="lhv2-cta">
            {hero.primaryCta}
          </Button>
        </div>

        {/* ── Age-band picker — jump straight to the right track. Reveals as
            its own beat, after the title above (see entrance timeline). ── */}
        <div className="mt-10">
          {/* wipe-in rule stands in for the old static border-top. The
              scale-x-0 initial state (cleared under reduced-motion) keeps it
              from flashing full-width before — or during a StrictMode
              remount of — the entrance. */}
          <div className="lhv2-picker-rule h-px w-full max-w-4xl bg-white/20 origin-right scale-x-0 motion-reduce:scale-x-100" />

          <p
            className="lhv2-picker-label ds-eyebrow text-white/55 mt-6 mb-4 opacity-0 motion-reduce:opacity-100"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}
          >
            בחרו את קבוצת הגיל
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-4xl">
            {AGE_CARDS.map((c) => (
              <a
                key={c.id}
                href={c.path}
                aria-label={`${c.title}, גילאי ${c.age}, ${c.grades}`}
                className="lhv2-card group relative flex flex-col justify-between min-h-[9rem] rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-md p-5 overflow-hidden opacity-0 motion-reduce:opacity-100 transition-all duration-300 hover:bg-white/[0.12] hover:border-orange/60 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/70"
              >
                {/* orange wash rises from the base on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-orange/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* top row: grade range */}
                <span className="relative flex items-center justify-between">
                  <span className="font-heebo text-white/55 text-xs md:text-sm">{c.grades}</span>
                </span>

                {/* headline: the age range parents scan for */}
                <span
                  className="relative font-heebo font-extrabold text-orange leading-none tabular-nums mt-3"
                  style={{ fontSize: 'clamp(2.1rem, 3.4vw, 2.9rem)', direction: 'ltr' }}
                >
                  {c.age}
                </span>

                {/* bottom row: band name + arrow */}
                <span className="relative flex items-center justify-between mt-3">
                  <span className="font-ragmarom text-white leading-none text-lg md:text-xl">
                    {c.title}
                  </span>
                  <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white transition-all duration-300 group-hover:bg-orange group-hover:text-navy-deep group-hover:-translate-x-1">
                    <ArrowLeft size={16} aria-hidden="true" />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div
        className="lhv2-scroll scroll-indicator absolute left-1/2 -translate-x-1/2 z-10 hidden md:block"
        style={{ bottom: 'max(1.6rem, env(safe-area-inset-bottom, 1.6rem))' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/25 flex items-start justify-center pt-2">
          <div className="w-1 h-2.5 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
