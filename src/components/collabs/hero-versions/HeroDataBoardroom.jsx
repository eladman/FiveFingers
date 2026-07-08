import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft } from 'lucide-react'
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion'
import Button from '../../ui/Button'
import { COPY, STATS, PARTNERS, splitChars } from './heroShared'

/**
 * V2 — "חדר הישיבות" (Navy Data Boardroom).
 *
 * Enterprise dark, but a SOLID navy gradient — no photo slideshow — so it can't
 * be confused with the homepage hero. Data-forward: a 2×2 grid of glass stat
 * cards carries the credibility, a fine hairline grid + a single orange glow set
 * the boardroom tone, and partner logos ride a bottom bar on white chips.
 */
export default function HeroDataBoardroom({ onRegister }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.b-eyebrow, .b-char, .b-accent, .b-sub, .b-cta, .b-stat, .b-logo',
          { opacity: 1, y: 0, filter: 'blur(0px)', scaleX: 1, scale: 1 })
        return
      }
      const tl = gsap.timeline()
      tl.fromTo('.b-eyebrow', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }, 0.1)
      tl.fromTo('.b-char', { y: 52, opacity: 0, filter: 'blur(14px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.05, duration: 0.9, ease: 'power3.out' }, 0.2)
      tl.fromTo('.b-accent', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.35, ease: 'power2.inOut' }, '-=0.2')
      tl.fromTo('.b-sub', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1')
      tl.fromTo('.b-cta', { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.35, ease: 'power2.out' }, '-=0.1')
      tl.fromTo('.b-stat', { y: 26, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out' }, 0.35)
      tl.fromTo('.b-logo', { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: 'power2.out' }, '-=0.2')
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col"
      style={{ background: 'linear-gradient(160deg, #1e3578 0%, #0d1b4b 42%, #081028 100%)' }}
    >
      {/* Hairline grid + orange glow */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '68px 68px',
      }} />
      <div aria-hidden="true" className="absolute -top-[10%] -right-[8%] w-[45vw] h-[55vh] rounded-full pointer-events-none"
           style={{ background: 'rgba(255,135,20,0.14)', filter: 'blur(150px)' }} />

      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 pt-28 pb-10 lg:py-16
                        grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          {/* ── Copy (RTL: right) ── */}
          <div className="text-right">
            <p className="b-eyebrow ds-eyebrow text-orange mb-6">{COPY.eyebrow}</p>
            <h1 className="text-white tracking-tight"
                style={{ fontFamily: "'RagMarom', sans-serif", fontSize: 'clamp(2.7rem, 5.6vw, 5.8rem)', lineHeight: 0.94 }}>
              <span className="block">
                {splitChars('השיטה שמשנה', 'a').map(({ ch, key }) => (
                  <span key={key} className="b-char" style={{ display: 'inline-block' }}>{ch}</span>
                ))}
              </span>
              <span className="block text-orange">
                {splitChars('את חוקי המשחק', 'b').map(({ ch, key }) => (
                  <span key={key} className="b-char" style={{ display: 'inline-block' }}>{ch}</span>
                ))}
              </span>
            </h1>
            <div className="b-accent mt-6 h-1 w-20 rounded-full bg-orange" style={{ transformOrigin: 'right' }} />
            <p className="b-sub font-heebo text-white/70 leading-relaxed mt-7 max-w-xl"
               style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)' }}>
              {COPY.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 mt-9">
              <Button variant="primary" onClick={() => onRegister?.()} icon={ChevronLeft} className="b-cta">
                {COPY.primaryCta}
              </Button>
              <Button variant="secondary" href="#" className="b-cta">{COPY.secondaryCta}</Button>
            </div>
          </div>

          {/* ── Stat cards (RTL: left) ── */}
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            {STATS.map((s) => (
              <div key={s.label}
                   className="b-stat rounded-2xl p-6 md:p-7 text-right"
                   style={{
                     background: 'rgba(255,255,255,0.055)',
                     border: '1px solid rgba(255,255,255,0.12)',
                     backdropFilter: 'blur(10px)',
                     WebkitBackdropFilter: 'blur(10px)',
                   }}>
                <div className="font-ragmarom text-orange leading-none"
                     style={{ fontSize: 'clamp(2.1rem, 3.6vw, 3.2rem)' }}>{s.value}</div>
                <div className="font-heebo text-white/65 mt-3 leading-snug"
                     style={{ fontSize: 'clamp(0.85rem, 1vw, 1rem)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Partner bar ── */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-6 flex flex-wrap items-center gap-x-4 gap-y-3 justify-center lg:justify-start">
          <span className="b-logo font-heebo text-white/40 me-2" style={{ fontSize: '0.72rem', letterSpacing: '0.16em' }}>
            נבחרנו על ידי
          </span>
          {PARTNERS.map((p) => (
            <div key={p.src} className="b-logo flex items-center justify-center rounded-lg bg-white/95 px-3.5 h-11">
              <img src={p.src} alt={p.name} title={p.name} className="max-h-6 w-auto object-contain" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
