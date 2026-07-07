import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft } from 'lucide-react'
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion'
import { PrimaryButton, QuietButton, Atmosphere } from '../../academy/shared'
import { COPY, splitChars } from './heroShared'

// Ruled meta row — the "annual report / capability statement" credibility line.
const META = [
  { k: 'מאז', v: '2014' },
  { k: 'פריסה', v: 'ארצית' },
  { k: 'ארגונים', v: '100+' },
  { k: 'שעות הדרכה', v: '50K+' },
]

/**
 * V3 — "עמוד השער" (Editorial Ledger).
 *
 * A quiet, premium capability-statement cover: a hairline-ruled meta row up top,
 * an oversized RagMarom headline, generous whitespace, and a single restrained
 * framed image. No photographic drama — the authority comes from typography,
 * rules and restraint. Reads like the cover of a consulting one-pager.
 */
export default function HeroEditorialLedger({ onRegister }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.b-meta, .b-rule, .b-eyebrow, .b-char, .b-sub, .b-cta, .b-plate, .b-foot',
          { opacity: 1, y: 0, x: 0, filter: 'blur(0px)', scaleX: 1 })
        return
      }
      const tl = gsap.timeline()
      tl.fromTo('.b-rule', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }, 0)
      tl.fromTo('.b-meta', { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'power2.out' }, 0.2)
      tl.fromTo('.b-eyebrow', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.35)
      tl.fromTo('.b-char', { y: 50, opacity: 0, filter: 'blur(12px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.035, duration: 0.9, ease: 'power3.out' }, 0.45)
      tl.fromTo('.b-plate', { opacity: 0, y: 34, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }, 0.5)
      tl.fromTo('.b-sub', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.4')
      tl.fromTo('.b-cta', { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.35, ease: 'power2.out' }, '-=0.2')
      tl.fromTo('.b-foot', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.1')
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[100dvh] overflow-hidden bg-surface flex flex-col"
    >
      <Atmosphere watermark flip />

      <div className="relative z-10 flex-1 flex flex-col max-w-screen-xl mx-auto w-full px-6 md:px-12 lg:px-20 pt-28 lg:pt-32 pb-10">
        {/* ── Ruled meta row ── */}
        <div>
          <div className="b-rule h-px w-full bg-navy/20" style={{ transformOrigin: 'right' }} />
          <div className="flex flex-wrap gap-x-10 gap-y-3 py-4">
            {META.map((m) => (
              <div key={m.k} className="b-meta flex items-baseline gap-2">
                <span className="font-heebo text-navy/45" style={{ fontSize: '0.72rem', letterSpacing: '0.14em' }}>{m.k}</span>
                <span className="font-heebo font-bold text-navy" style={{ fontSize: '0.95rem' }}>{m.v}</span>
              </div>
            ))}
          </div>
          <div className="b-rule h-px w-full bg-navy/20" style={{ transformOrigin: 'right' }} />
        </div>

        {/* ── Body: headline + framed plate ── */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center py-10 lg:py-0">
          <div className="text-right">
            <p className="b-eyebrow ds-eyebrow text-orange-ink mb-6">{COPY.eyebrow}</p>
            <h1 className="text-navy" style={{ fontFamily: "'RagMarom', sans-serif", fontSize: 'clamp(3rem, 6.5vw, 7rem)', lineHeight: 0.9, letterSpacing: '-0.02em' }}>
              <span className="block">
                {splitChars('בית תוכן', 'a').map(({ ch, key }) => (
                  <span key={key} className="b-char" style={{ display: 'inline-block' }}>{ch}</span>
                ))}
              </span>
              <span className="block">
                {splitChars('להכשרות ', 'b').map(({ ch, key }) => (
                  <span key={key} className="b-char" style={{ display: 'inline-block' }}>{ch}</span>
                ))}
                <span className="text-orange">
                  {splitChars('לארגונים', 'c').map(({ ch, key }) => (
                    <span key={key} className="b-char" style={{ display: 'inline-block' }}>{ch}</span>
                  ))}
                </span>
              </span>
            </h1>
            <p className="b-sub font-heebo text-navy/65 leading-relaxed mt-8 max-w-lg"
               style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.28rem)' }}>
              {COPY.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 mt-9">
              <PrimaryButton onClick={() => onRegister?.()} icon={ChevronLeft} className="b-cta">
                {COPY.primaryCta}
              </PrimaryButton>
              <QuietButton href="#" className="b-cta">{COPY.secondaryCta}</QuietButton>
            </div>
          </div>

          {/* Restrained framed plate */}
          <div className="b-plate relative order-first lg:order-none">
            <div className="relative rounded-2xl overflow-hidden border border-navy/10"
                 style={{ aspectRatio: '3 / 4', boxShadow: '0 24px 55px -22px rgba(13,27,75,0.3)' }}>
              <img src="/liba_pics/214A9700.jpg" alt="הכשרת מנהיגות של חמש אצבעות"
                   className="w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
            </div>
            <div aria-hidden="true" className="absolute -bottom-3 -left-3 h-16 w-16 border-b-2 border-l-2 border-orange rounded-bl-2xl hidden lg:block" />
          </div>
        </div>

        {/* ── Foot rule ── */}
        <div className="b-foot flex items-center justify-between pt-5 border-t border-navy/15">
          <span className="font-heebo text-navy/40" style={{ fontSize: '0.72rem', letterSpacing: '0.14em' }}>
            קמפוס חמש אצבעות
          </span>
          <span className="font-heebo text-navy/40" style={{ fontSize: '0.72rem', letterSpacing: '0.14em' }}>
            תוכן · הכשרות · מדידה
          </span>
        </div>
      </div>
    </section>
  )
}
