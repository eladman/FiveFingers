import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft, MessageCircle } from 'lucide-react'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import Button from '../ui/Button'
import { HERO, YOAV_URL } from '../../data/alumniData'

function SplitText({ children }) {
  return (
    <>
      {[...children].map((char, i) => (
        <span
          key={i}
          className="al-char"
          style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </>
  )
}

/**
 * Dark cinematic alumni hero — same overlay stack + RagMarom split headline as
 * the site heroes (Hero / AmirHero). Theme: being a בוגר/ת of חמש אצבעות is not
 * the end of the road but the start of it — the handoff into תוכנית יואב.
 *
 * Primary CTA links out to the Yoav site; the secondary opens the contact modal.
 */
export default function AlumniHero({ onContactOpen }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.al-char, .al-eyebrow, .al-accent, .al-sub, .al-cta, .al-scroll',
          { opacity: 1, y: 0, filter: 'blur(0px)', scaleX: 1 })
        return
      }
      const tl = gsap.timeline()
      tl.fromTo('.al-eyebrow', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.1)
      tl.fromTo('.al-char',
        { y: 55, opacity: 0, filter: 'blur(14px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.05, duration: 0.95, ease: 'power3.out' },
        0.2
      )
      tl.fromTo('.al-accent', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.3, ease: 'power2.inOut' }, '-=0.1')
      tl.fromTo('.al-sub', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' })
      tl.fromTo('.al-cta', { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.3, ease: 'power2.out' }, '-=0.1')
      tl.fromTo('.al-scroll', { opacity: 0 }, { opacity: 1, duration: 0.25 })
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="alumni-top"
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0">
        <img
          src={HERO.src}
          alt="בוגרי ובוגרות תנועת חמש אצבעות"
          className={`absolute inset-0 w-full h-full object-cover ${reduced ? '' : 'ken-burns'}`}
          style={{ objectPosition: 'center 30%' }}
          fetchPriority="high"
        />
        {/* Warm-tone color grade */}
        <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
        {/* Dark scrim for text legibility */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Depth gradient — grounds the CTAs, lets the navy section below rise cleanly */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/25" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 text-center select-none">
        <p className="al-eyebrow ds-eyebrow text-orange mb-6">
          בוגרים ובוגרות · תנועת חמש אצבעות
        </p>

        <h1
          className="mb-0 text-white tracking-tight"
          style={{
            fontFamily: "'RagMarom', sans-serif",
            fontSize: 'clamp(2.6rem, 8vw, 8rem)',
            lineHeight: 0.95,
            textShadow: '0 4px 32px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.8)',
          }}
        >
          <SplitText>הדרך רק מתחילה</SplitText>
        </h1>

        <div
          className="al-accent mx-auto mt-5 md:mt-7 rounded-full bg-orange"
          style={{ height: '3px', width: 'clamp(8rem, 22vw, 22rem)', transformOrigin: 'center' }}
        />

        <p
          className="al-sub font-heebo text-white/85 mt-7 mx-auto max-w-2xl leading-relaxed"
          style={{ fontSize: 'clamp(1.05rem, 1.9vw, 1.55rem)', textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
        >
          כשהמסלול נגמר, הקהילה רק מתחילה. תוכנית יואב היא תוכנית הדגל של הבוגרים -
          למקסם את הפוטנציאל ולהשפיע על המציאות שלנו.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-10 md:mt-12">
          <Button
            variant="primary"
            size="lg"
            glow
            icon={ChevronLeft}
            href={YOAV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="al-cta"
          >
            להכיר את תוכנית יואב
          </Button>
          <Button
            variant="ghost"
            size="lg"
            icon={MessageCircle}
            onClick={() => onContactOpen?.('בוגרים')}
            className="al-cta"
          >
            דברו איתנו
          </Button>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="al-scroll absolute left-1/2 -translate-x-1/2 z-10"
        style={{ bottom: 'max(2rem, env(safe-area-inset-bottom, 2rem))' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/25 flex items-start justify-center pt-2">
          <div className="w-1 h-2.5 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
