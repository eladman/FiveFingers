import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft } from 'lucide-react'
import { hero } from '../../data/liabahData'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import { PrimaryButton } from './shared'
import Button from '../ui/Button'

const IMAGES = [
  '/Hero-Pics/214A0027.jpg',
  '/Hero-Pics/214A0088.jpg',
  '/Hero-Pics/214A0114.jpg',
  '/Hero-Pics/214A0011.jpg',
  '/Hero-Pics/_14A9355.jpg',
]

function SplitText({ children }) {
  return (
    <>
      {[...children].map((char, i) => (
        <span
          key={i}
          className="lh-char"
          style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
        >
          {char}
        </span>
      ))}
    </>
  )
}

export default function LiabahHero({ onRegister }) {
  const ref = useRef(null)
  const imgRefs = useRef([])
  const reduced = usePrefersReducedMotion()

  // Intro reveal — character stagger identical to homepage Hero
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.lh-word-1 .lh-char, .lh-word-2 .lh-char, .lh-accent, .lh-subtitle, .lh-cta, .scroll-indicator',
          { opacity: 1, y: 0, filter: 'blur(0px)', scaleX: 1 })
        return
      }
      const tl = gsap.timeline()

      tl.fromTo('.lh-word-1 .lh-char',
        { y: 55, opacity: 0, filter: 'blur(14px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.09, duration: 0.95, ease: 'power3.out' },
        0.2
      )
      tl.fromTo('.lh-word-2 .lh-char',
        { y: 55, opacity: 0, filter: 'blur(14px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.06, duration: 0.95, ease: 'power3.out' },
        '-=0.52'
      )
      tl.fromTo('.lh-accent',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.3, ease: 'power2.inOut' },
        '-=0.1'
      )
      tl.fromTo('.lh-subtitle',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
      )
      tl.fromTo('.lh-cta',
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.3, ease: 'power2.out' },
        '-=0.1'
      )
      tl.fromTo('.scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.25 }
      )
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  // Ken Burns slideshow — ref-based like homepage Hero
  useEffect(() => {
    const imgs = imgRefs.current
    if (!imgs.length || reduced) return
    imgs[0].classList.add('ken-burns')
    let current = 0
    const id = setInterval(() => {
      const prev = current
      current = (current + 1) % IMAGES.length
      imgs[prev].style.opacity = '0'
      imgs[prev].classList.remove('ken-burns')
      imgs[current].style.opacity = '1'
      imgs[current].classList.add('ken-burns')
    }, 5000)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <section
      id="liabah-top"
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center"
    >
      {/* ── Background slideshow ── */}
      <div className="absolute inset-0">
        {IMAGES.map((src, i) => (
          <img
            key={src}
            ref={el => imgRefs.current[i] = el}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === 0 ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out, transform 1.2s ease-out',
              willChange: 'opacity, transform',
            }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        {/* Warm-tone color grade */}
        <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
        {/* Dark scrim */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081028]/85 via-[#081028]/25 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-[#081028] to-transparent" />
        {/* Subtle orange warmth at the bottom */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-orange/8 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 text-center select-none">
        {/* Eyebrow */}
        <p className="lh-cta ds-eyebrow text-orange mb-6">
          {hero.eyebrow}
        </p>

        {/* Main headline */}
        <h1
          className="mb-0 flex items-center justify-center gap-[0.25em] text-white tracking-tight"
          style={{
            fontFamily: "'RagMarom', sans-serif",
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            lineHeight: 0.95,
            textShadow: '0 4px 32px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.8)',
          }}
        >
          <span className="lh-word-1"><SplitText>קבוצות</SplitText></span>
          <span className="lh-word-2"><SplitText>הנוער</SplitText></span>
        </h1>

        {/* Orange accent bar */}
        <div
          className="lh-accent mx-auto mt-5 md:mt-7 rounded-full bg-orange"
          style={{ height: '3px', width: 'clamp(6rem, 18vw, 18rem)', transformOrigin: 'center' }}
        />

        {/* Subtitle */}
        <p
          className="lh-subtitle mt-5 md:mt-7"
          style={{
            fontFamily: "'RagMarom', sans-serif",
            color: 'var(--orange)',
            fontSize: 'clamp(1.3rem, 2.8vw, 2.8rem)',
            textShadow: '0 2px 20px rgba(0,0,0,0.9)',
          }}
        >
          {hero.subtitle}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-10 md:mt-14">
          <PrimaryButton onClick={onRegister} icon={ChevronLeft} className="lh-cta">
            {hero.primaryCta}
          </PrimaryButton>
          <Button variant="ghost" href="#liabah-essence" className="lh-cta">
            גלו עוד
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
