import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft } from 'lucide-react'
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion'
import { PrimaryButton, QuietButton, Atmosphere } from '../../academy/shared'
import { COPY, PARTNERS, splitChars } from './heroShared'

/**
 * V1 — "פיצול תאגידי" (Corporate Split + Trust Strip).
 *
 * The classic, credibility-forward B2B hero: value-prop headline on a warm-light
 * surface, a framed proof image with an overlapping stat chip, and a partner
 * logo trust strip under the copy. Reads as an enterprise / consulting landing
 * page — structured and restrained, the opposite of the homepage's cinematic
 * full-bleed slideshow.
 */
export default function HeroCorporateSplit({ onRegister }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.b-eyebrow, .b-char, .b-accent, .b-sub, .b-cta, .b-trust, .b-plate',
          { opacity: 1, y: 0, x: 0, filter: 'blur(0px)', scaleX: 1, scale: 1 })
        return
      }
      const tl = gsap.timeline()
      tl.fromTo('.b-plate', { opacity: 0, x: -40, scale: 0.97 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out' }, 0)
      tl.fromTo('.b-eyebrow', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }, 0.15)
      tl.fromTo('.b-char', { y: 46, opacity: 0, filter: 'blur(12px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.045, duration: 0.85, ease: 'power3.out' }, 0.25)
      tl.fromTo('.b-accent', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.35, ease: 'power2.inOut' }, '-=0.2')
      tl.fromTo('.b-sub', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1')
      tl.fromTo('.b-cta', { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.35, ease: 'power2.out' }, '-=0.15')
      tl.fromTo('.b-trust', { y: 14, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: 'power2.out' }, '-=0.1')
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="collabs-top"
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[92dvh] lg:min-h-[100dvh] overflow-hidden bg-surface flex items-start lg:items-center"
    >
      <Atmosphere />

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 pt-28 pb-16 lg:py-16
                      grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
        {/* ── Copy column (RTL: right) ── */}
        <div className="text-right">
          <p className="b-eyebrow ds-eyebrow text-orange-ink mb-6">{COPY.eyebrow}</p>

          <h1
            className="text-navy tracking-tight"
            style={{ fontFamily: "'RagMarom', sans-serif", fontSize: 'clamp(2.7rem, 5.4vw, 5.6rem)', lineHeight: 0.94 }}
          >
            <span className="block">
              {splitChars('מהלכה', 'a').map(({ ch, key }) => (
                <span key={key} className="b-char" style={{ display: 'inline-block' }}>{ch}</span>
              ))}{' '}
              <span className="text-orange">
                {splitChars('למעשה', 'b').map(({ ch, key }) => (
                  <span key={key} className="b-char" style={{ display: 'inline-block' }}>{ch}</span>
                ))}
              </span>
            </span>
          </h1>

          <div className="b-accent mt-6 h-1 w-20 rounded-full bg-orange" style={{ transformOrigin: 'right' }} />

          <p className="b-sub font-heebo text-navy/70 leading-relaxed mt-7 max-w-xl"
             style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)' }}>
            {COPY.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 mt-9">
            <PrimaryButton onClick={() => onRegister?.()} icon={ChevronLeft} className="b-cta">
              {COPY.primaryCta}
            </PrimaryButton>
            <QuietButton href="#collabs-process" className="b-cta">{COPY.secondaryCta}</QuietButton>
          </div>

          {/* ── Trust strip ── */}
          <div className="mt-12 pt-8 border-t border-navy/10">
            <p className="b-trust font-heebo font-semibold text-navy/55 mb-6"
               style={{ fontSize: 'clamp(0.82rem, 1vw, 0.95rem)', letterSpacing: '0.16em' }}>
              כבר עובדים איתנו
            </p>
            <div className="flex flex-wrap items-center gap-x-9 gap-y-6">
              {PARTNERS.map((p) => (
                <img
                  key={p.src}
                  src={p.src}
                  alt={p.name}
                  title={p.name}
                  className="b-trust h-11 md:h-14 w-auto object-contain grayscale opacity-65 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Proof plate (RTL: left) ──
            Mobile: demoted below the copy + partner icons and shown as a
            compact wide banner, so the headline/text lead. Desktop: unchanged. */}
        <div className="b-plate relative order-last lg:order-none mt-6 lg:mt-0">
          <div className="relative rounded-[1.75rem] overflow-hidden aspect-[16/10] sm:aspect-[3/2] lg:aspect-[4/5] max-h-[40vh] lg:max-h-none"
               style={{ boxShadow: '0 30px 70px -20px rgba(13,27,75,0.35)' }}>
            <img src="/our_product_pics/collab_pic.jpg" alt="הכשרה קבוצתית של חמש אצבעות"
                 className="w-full h-full object-cover" style={{ objectPosition: 'center 35%' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, transparent 55%, rgba(8,16,40,0.5))' }} />
            {/* thin brand frame */}
            <div aria-hidden="true" className="absolute inset-3 rounded-[1.4rem] border border-white/20" />
          </div>
        </div>
      </div>
    </section>
  )
}
