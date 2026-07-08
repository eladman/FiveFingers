import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft, Brain, Compass, Trophy, ArrowUpLeft } from 'lucide-react'
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion'
import { PrimaryButton, QuietButton, Atmosphere } from '../../academy/shared'
import { COPY, WORLDS, splitChars } from './heroShared'

const WORLD_ICONS = [Brain, Compass, Trophy]

/**
 * V4 — "רשת היכולות" (Capability Bento).
 *
 * The whole B2B offering at a glance: a copy block beside a bento grid that
 * pairs the three content worlds, a proof image, and a headline stat tile.
 * Feels like a product / capability catalog — dense but organized, the way a
 * B2B buyer wants to scan "what do I actually get" in one screen.
 */
export default function HeroCapabilityBento({ onRegister }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.b-eyebrow, .b-char, .b-accent, .b-sub, .b-cta, .b-tile',
          { opacity: 1, y: 0, filter: 'blur(0px)', scaleX: 1, scale: 1 })
        return
      }
      const tl = gsap.timeline()
      tl.fromTo('.b-eyebrow', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }, 0.1)
      tl.fromTo('.b-char', { y: 46, opacity: 0, filter: 'blur(12px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.045, duration: 0.85, ease: 'power3.out' }, 0.2)
      tl.fromTo('.b-accent', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.35, ease: 'power2.inOut' }, '-=0.2')
      tl.fromTo('.b-sub', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1')
      tl.fromTo('.b-cta', { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.35, ease: 'power2.out' }, '-=0.15')
      tl.fromTo('.b-tile', { y: 28, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.07, duration: 0.6, ease: 'power3.out' }, 0.3)
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[100dvh] overflow-hidden bg-surface flex items-center"
    >
      <Atmosphere />

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 pt-28 pb-16 lg:py-16
                      grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-12 lg:gap-14 items-center">
        {/* ── Copy (RTL: right) ── */}
        <div className="text-right">
          <p className="b-eyebrow ds-eyebrow text-orange-ink mb-6">{COPY.eyebrow}</p>
          <h1 className="text-navy tracking-tight"
              style={{ fontFamily: "'RagMarom', sans-serif", fontSize: 'clamp(2.6rem, 5vw, 5.2rem)', lineHeight: 0.94 }}>
            <span className="block">
              {splitChars('כל מה שהארגון', 'a').map(({ ch, key }) => (
                <span key={key} className="b-char" style={{ display: 'inline-block' }}>{ch}</span>
              ))}
            </span>
            <span className="block text-orange">
              {splitChars('צריך, במקום אחד', 'b').map(({ ch, key }) => (
                <span key={key} className="b-char" style={{ display: 'inline-block' }}>{ch}</span>
              ))}
            </span>
          </h1>
          <div className="b-accent mt-6 h-1 w-20 rounded-full bg-orange" style={{ transformOrigin: 'right' }} />
          <p className="b-sub font-heebo text-navy/70 leading-relaxed mt-7 max-w-lg"
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

        {/* ── Bento grid (RTL: left) ── */}
        <div className="grid grid-cols-2 grid-rows-3 gap-4 md:gap-5" style={{ minHeight: 'min(72vh, 560px)' }}>
          {/* Content-world tiles (three, stacked in the right column of the bento) */}
          {WORLDS.map((w, i) => {
            const Icon = WORLD_ICONS[i]
            return (
              <div key={w.title}
                   className="b-tile rounded-2xl bg-white border border-navy/8 p-5 md:p-6 flex flex-col justify-between text-right"
                   style={{ boxShadow: '0 14px 34px -18px rgba(13,27,75,0.28)' }}>
                <span className="inline-flex text-orange"><Icon size={26} strokeWidth={1.75} /></span>
                <div>
                  <h3 className="font-heebo font-bold text-navy leading-tight" style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.35rem)' }}>{w.title}</h3>
                  <p className="font-heebo text-navy/55 mt-1.5 leading-snug" style={{ fontSize: '0.85rem' }}>{w.note}</p>
                </div>
              </div>
            )
          })}

          {/* Proof image — spans two rows */}
          <div className="b-tile row-span-2 rounded-2xl overflow-hidden relative"
               style={{ boxShadow: '0 20px 45px -20px rgba(13,27,75,0.4)' }}>
            <img src="/liba_pics/214A1343.jpg" alt="הכשרת חוסן מנטלי בשטח"
                 className="w-full h-full object-cover" style={{ objectPosition: 'center 35%' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, transparent 45%, rgba(8,16,40,0.62))' }} />
            <div className="absolute bottom-0 inset-x-0 p-5 text-right">
              <p className="font-heebo font-semibold text-white leading-snug" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)' }}>
                למידה מתוך עשייה
              </p>
              <p className="font-heebo text-white/70 mt-0.5" style={{ fontSize: '0.8rem' }}>לא מרצים על מצוינות — מתאמנים בה</p>
            </div>
          </div>

          {/* Stat tile */}
          <div className="b-tile rounded-2xl p-5 md:p-6 flex flex-col justify-between text-right"
               style={{ background: 'linear-gradient(155deg, #1e3578, #0d1b4b)', boxShadow: '0 16px 38px -18px rgba(13,27,75,0.5)' }}>
            <div className="flex items-center justify-between">
              <span className="font-heebo text-white/50" style={{ fontSize: '0.72rem', letterSpacing: '0.14em' }}>במספרים</span>
              <ArrowUpLeft size={18} className="text-orange" />
            </div>
            <div>
              <div className="font-ragmarom text-orange leading-none" style={{ fontSize: 'clamp(2.2rem, 3.4vw, 3rem)' }}>10,000+</div>
              <div className="font-heebo text-white/70 mt-1.5" style={{ fontSize: '0.85rem' }}>בוגרים וחניכים</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
