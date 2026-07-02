import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft, Headphones } from 'lucide-react'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import Button from '../ui/Button'
import { PORTRAIT, STAGE } from '../../data/amirData'

function SplitText({ children }) {
  return (
    <>
      {[...children].map((char, i) => (
        <span
          key={i}
          className="am-char"
          style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </>
  )
}

/**
 * Dark cinematic founder hero — same overlay stack + RagMarom split headline as
 * the site heroes (Hero / CollabsHero), but built around a single portrait
 * instead of a slideshow, and leaning into the "האדם בזירה" personal-brand
 * tone. Landscape headshot on desktop; portrait stage shot on mobile.
 *
 * `onBook` → contact modal ('הרצאות'); the ghost CTA jumps to the podcast.
 */
export default function AmirHero({ onBook, podcastHref = '/#belief' }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.am-char, .am-eyebrow, .am-accent, .am-sub, .am-cta, .am-scroll',
          { opacity: 1, y: 0, filter: 'blur(0px)', scaleX: 1 })
        return
      }
      const tl = gsap.timeline()
      tl.fromTo('.am-eyebrow', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.1)
      tl.fromTo('.am-char',
        { y: 55, opacity: 0, filter: 'blur(14px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.06, duration: 0.95, ease: 'power3.out' },
        0.2
      )
      tl.fromTo('.am-accent', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.3, ease: 'power2.inOut' }, '-=0.1')
      tl.fromTo('.am-sub', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' })
      tl.fromTo('.am-cta', { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.3, ease: 'power2.out' }, '-=0.1')
      tl.fromTo('.am-scroll', { opacity: 0 }, { opacity: 1, duration: 0.25 })
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="amir-top"
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center"
    >
      {/* ── Background portrait (responsive: landscape headshot ≥md, portrait stage <md) ── */}
      <div className="absolute inset-0">
        <img
          src={STAGE.src}
          alt="עמיר מנחם על הבמה"
          className={`absolute inset-0 w-full h-full object-cover md:hidden ${reduced ? '' : 'ken-burns'}`}
          style={{ objectPosition: 'center 25%' }}
          fetchPriority="high"
        />
        <img
          src={PORTRAIT.src}
          alt="עמיר מנחם"
          className={`absolute inset-0 w-full h-full object-cover hidden md:block ${reduced ? '' : 'ken-burns'}`}
          style={{ objectPosition: 'center 30%' }}
          fetchPriority="high"
        />
        {/* Warm-tone color grade */}
        <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
        {/* Dark scrim for text legibility */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Depth gradient — grounds the CTAs, lets the light section below rise cleanly */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/25" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 text-center select-none">
        <p className="am-eyebrow ds-eyebrow text-orange mb-6">
          מייסד ויו״ר · תנועת חמש אצבעות
        </p>

        <h1
          className="mb-0 text-white tracking-tight"
          style={{
            fontFamily: "'RagMarom', sans-serif",
            fontSize: 'clamp(3rem, 9vw, 9rem)',
            lineHeight: 0.95,
            textShadow: '0 4px 32px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.8)',
          }}
        >
          <SplitText>עמיר מנחם</SplitText>
        </h1>

        <div
          className="am-accent mx-auto mt-5 md:mt-7 rounded-full bg-orange"
          style={{ height: '3px', width: 'clamp(8rem, 22vw, 22rem)', transformOrigin: 'center' }}
        />

        <p
          className="am-sub font-heebo text-white/85 mt-7 mx-auto max-w-2xl leading-relaxed"
          style={{ fontSize: 'clamp(1.05rem, 1.9vw, 1.55rem)', textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
        >
          יזם, קצין שייטת ומגיש הפודקאסט "האדם בזירה".
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-10 md:mt-12">
          <Button variant="primary" size="lg" glow icon={ChevronLeft} onClick={() => onBook?.()} className="am-cta">
            הזמינו הרצאה
          </Button>
          <Button variant="ghost" size="lg" href={podcastHref} icon={Headphones} className="am-cta">
            האזינו לפודקאסט
          </Button>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="am-scroll absolute left-1/2 -translate-x-1/2 z-10"
        style={{ bottom: 'max(2rem, env(safe-area-inset-bottom, 2rem))' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/25 flex items-start justify-center pt-2">
          <div className="w-1 h-2.5 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
