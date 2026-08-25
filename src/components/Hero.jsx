import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from './ui/Button'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = [
  '/Hero-Pics/amir_talking_2.jpg',
  '/Hero-Pics/erev_moreshet.jpg',
  '/Hero-Pics/214A0011.jpg',
  '/Hero-Pics/214A0034.jpg',
  '/Hero-Pics/214A0114.jpg',
  '/Hero-Pics/_14A9355.jpg',
]

function SplitText({ children, wordClass }) {
  return (
    <span className={wordClass}>
      {[...children].map((char, i) => (
        <span
          key={i}
          className="hero-char"
          style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}

export default function Hero({ onComplete, onContactOpen }) {
  const ref = useRef(null)
  const imgRefs = useRef([])
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Word 1: "חמש" — chars stagger right-to-left (RTL natural order)
      tl.fromTo(
        '.hero-word-1 .hero-char',
        { y: 55, opacity: 0, filter: 'blur(14px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.09, duration: 0.95, ease: 'power3.out' },
        0.2
      )

      // Word 2: "אצבעות" — overlaps slightly
      tl.fromTo(
        '.hero-word-2 .hero-char',
        { y: 55, opacity: 0, filter: 'blur(14px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.06, duration: 0.95, ease: 'power3.out' },
        '-=0.52'
      )

      // Orange accent line draws from center outward
      tl.fromTo(
        '.hero-accent',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.3, ease: 'power2.inOut' },
        '-=0.1'
      )

      // Subtitle rises in
      tl.fromTo(
        '.hero-subtitle',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
      )

      // CTAs + navbar fire together
      tl.fromTo(
        '.hero-cta',
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.3, ease: 'power2.out' },
        '-=0.1'
      )
      tl.call(() => onCompleteRef.current?.(), [], '<')

      // Scroll indicator
      tl.fromTo(
        '.scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.25 }
      )
    }, ref)

    return () => ctx.revert()
  }, []) // run once on mount only

  useEffect(() => {
    const imgs = imgRefs.current
    if (!imgs.length) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return // static first image, no slideshow/Ken Burns

    imgs[0].classList.add('ken-burns')
    let current = 0
    const id = setInterval(() => {
      const prev = current
      current = (current + 1) % imgs.length
      imgs[prev].style.opacity = '0'
      imgs[prev].classList.remove('ken-burns')
      imgs[current].style.opacity = '1'
      imgs[current].classList.add('ken-burns')
    }, 5000)
    return () => clearInterval(id)
  }, [])

  // Scroll-out parallax — as the hero leaves, the image plane drifts up slower
  // than the page (depth), the headline lifts + blurs away like a rack focus,
  // and an extra scrim deepens so the section dissolves into WhoWeAre below.
  // Scrubbed to the real scroll position; skipped entirely under reduced-motion.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      tl.to('.hero-bg', { yPercent: 16, ease: 'none' }, 0)
        .to('.hero-content', { yPercent: -26, opacity: 0, filter: 'blur(6px)', ease: 'none' }, 0)
        .to('.hero-scrim', { opacity: 0.55, ease: 'none' }, 0)
        .to('.scroll-indicator', { opacity: 0, ease: 'none' }, 0)
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={ref}
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center"
    >
      {/* ── Background slideshow ── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Parallax image plane — oversized top/bottom so the scroll-out drift
            never exposes an edge inside the section's clip. */}
        <div
          className="hero-bg absolute left-0 right-0"
          style={{ top: '-8%', height: '116%', willChange: 'transform' }}
        >
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
              decoding="async"
            />
          ))}
        </div>
        {/* Warm-tone color grade */}
        <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
        {/* Dark scrim for text legibility */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Neutral depth gradient — grounds the CTAs and the floating sheet below, with no blue cast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        {/* Deepens on scroll-out to dissolve the hero into the sheet below */}
        <div className="hero-scrim absolute inset-0 bg-black" style={{ opacity: 0 }} />
      </div>

      {/* ── Content ── */}
      <div
        className="hero-content relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 text-center select-none"
        style={{ willChange: 'transform, opacity, filter' }}
      >
        {/* Main headline — single line */}
        <h1
          className="mb-0 flex items-center justify-center gap-[0.25em] text-white tracking-tight"
          style={{
            fontFamily: "'RagMarom', sans-serif",
            fontSize: 'clamp(3rem, 9vw, 9.5rem)',
            lineHeight: 0.95,
            textShadow: '0 4px 32px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.8)',
          }}
        >
          <span className="hero-word-1"><SplitText>חמש</SplitText></span>
          <span className="hero-word-2"><SplitText>אצבעות</SplitText></span>
        </h1>

        {/* Orange accent line */}
        <div
          className="hero-accent mx-auto mt-5 md:mt-7 rounded-full bg-orange"
          style={{
            height: '3px',
            width: 'clamp(8rem, 22vw, 22rem)',
            transformOrigin: 'center',
          }}
        />

        {/* Subtitle */}
        <p
          className="hero-subtitle text-orange mt-5 md:mt-7"
          style={{
            fontFamily: "'RagMarom', sans-serif",
            fontSize: 'clamp(1.6rem, 4.5vw, 4.5rem)',
            textShadow: '0 2px 20px rgba(0,0,0,0.9)',
          }}
        >
          מצוינות ערכית
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-10 md:mt-14">
          <Button variant="primary" size="lg" onClick={() => onContactOpen?.()} className="hero-cta">
            הצטרפו אלינו
          </Button>

          <Button variant="ghost" href="#who-we-are" className="hero-cta">
            גלו עוד
          </Button>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="scroll-indicator absolute left-1/2 -translate-x-1/2 z-10" style={{ bottom: 'max(2rem, env(safe-area-inset-bottom, 2rem))' }}>
        <div className="w-6 h-10 rounded-full border-2 border-white/25 flex items-start justify-center pt-2">
          <div className="w-1 h-2.5 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}

