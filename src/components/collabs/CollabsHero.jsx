import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft } from 'lucide-react'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import { PrimaryButton } from '../liabah/shared'
import Button from '../ui/Button'

// Reuses the shared hero plates. Different ordering from the ליבה hero so the
// two dark heroes don't feel identical.
const IMAGES = [
  '/Hero-Pics/214A0511.jpg',
  '/Hero-Pics/214A0088.jpg',
  '/Hero-Pics/214A0034.jpg',
  '/Hero-Pics/214A0114.jpg',
  '/Hero-Pics/214A0027.jpg',
  '/Hero-Pics/_14A9355.jpg',
]

function SplitText({ children }) {
  return (
    <>
      {[...children].map((char, i) => (
        <span
          key={i}
          className="ch-char"
          style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </>
  )
}

/**
 * Dark slideshow hero for the שיתופי פעולה page — converged with the homepage
 * Hero / ליבה / אקדמיה heroes: background Ken Burns slideshow, layered
 * warm-grade + navy gradient stack, per-character RagMarom headline,
 * center-draw orange accent, ds-eyebrow, primary + ghost CTAs, and the shared
 * mouse-pill scroll indicator. Carries the "קמפוס חמש אצבעות / בית תוכן
 * והכשרות" messaging.
 */
export default function CollabsHero({ onRegister }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  const [current, setCurrent] = useState(0)

  // Intro reveal — character stagger identical to the homepage Hero.
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.ch-char, .ch-eyebrow, .ch-accent, .ch-sub, .ch-cta, .scroll-indicator',
          { opacity: 1, y: 0, filter: 'blur(0px)', scaleX: 1 })
        return
      }
      const tl = gsap.timeline()
      tl.fromTo('.ch-eyebrow', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.1)
      tl.fromTo('.ch-char',
        { y: 55, opacity: 0, filter: 'blur(14px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.06, duration: 0.95, ease: 'power3.out' },
        0.2
      )
      tl.fromTo('.ch-accent', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.3, ease: 'power2.inOut' }, '-=0.1')
      tl.fromTo('.ch-sub', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' })
      tl.fromTo('.ch-cta', { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.3, ease: 'power2.out' }, '-=0.1')
      tl.fromTo('.scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 0.25 })
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  // Auto-advancing slideshow (paused under reduced-motion).
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % IMAGES.length)
    }, 5000)
    return () => clearInterval(id)
  }, [reduced, current])

  return (
    <section
      id="collabs-top"
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center"
    >
      {/* ── Background slideshow with Ken Burns on the active slide ── */}
      <div className="absolute inset-0">
        {IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover ${i === current && !reduced ? 'ken-burns' : ''}`}
            style={{
              opacity: i === current ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out, transform 1.2s ease-out',
              willChange: 'opacity, transform',
              objectPosition: 'center 30%',
            }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        {/* Warm-tone color grade */}
        <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
        {/* Dark scrim for text legibility */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Neutral depth gradient — grounds the CTAs and lets the light content
            sheet below rise up cleanly, with no blue cast (matches the homepage hero) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 text-center select-none">
        {/* Eyebrow */}
        <p className="ch-eyebrow ds-eyebrow text-orange mb-6">
          בית תוכן והכשרות
        </p>

        {/* Main headline */}
        <h1
          className="mb-0 text-white tracking-tight"
          style={{
            fontFamily: "'RagMarom', sans-serif",
            fontSize: 'clamp(2.7rem, 8vw, 8rem)',
            lineHeight: 0.95,
            textShadow: '0 4px 32px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.8)',
          }}
        >
          <SplitText>קמפוס חמש אצבעות</SplitText>
        </h1>

        {/* Orange accent line — draws from center */}
        <div
          className="ch-accent mx-auto mt-5 md:mt-7 rounded-full bg-orange"
          style={{ height: '3px', width: 'clamp(8rem, 22vw, 22rem)', transformOrigin: 'center' }}
        />

        {/* Subtitle */}
        <p
          className="ch-sub font-heebo text-white/85 mt-7 mx-auto max-w-3xl leading-relaxed"
          style={{ fontSize: 'clamp(1.05rem, 1.9vw, 1.6rem)', textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
        >
          מביאים את שיטת חמש אצבעות לארגונים, צוותים, יחידות וספורטאים —
          מהלכה למעשה. תוכן והכשרות שמשנים את חוקי המשחק.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-10 md:mt-12">
          <PrimaryButton onClick={() => onRegister?.()} icon={ChevronLeft} className="ch-cta">
            יצירת קשר
          </PrimaryButton>
          <Button variant="ghost" href="#collabs-process" className="ch-cta">
            איך זה עובד?
          </Button>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="scroll-indicator absolute left-1/2 -translate-x-1/2 z-10"
        style={{ bottom: 'max(2rem, env(safe-area-inset-bottom, 2rem))' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/25 flex items-start justify-center pt-2">
          <div className="w-1 h-2.5 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
