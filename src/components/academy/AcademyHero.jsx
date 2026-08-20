import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft } from 'lucide-react'
import { hero } from '../../data/academyData'
import { PrimaryButton } from './shared'
import Button from '../ui/Button'

// Academy slideshow set (used when there is no direct background video).
const IMAGES = [
  '/mehina_pics/mehina-desert-group.jpg',
  '/mehina_pics/mehina-huddle.jpg',
  '/mehina_pics/mehina-team-girls.jpg',
  '/mehina_pics/mehina-shirts-night.jpg',
]

// A direct video file plays as the background; YouTube/empty URLs fall back to the slideshow.
const isDirectVideo = (url) => !!url && /\.(mp4|webm|ogg)(\?|$)/i.test(url)

function SplitText({ children }) {
  return (
    <>
      {[...children].map((char, i) => (
        <span
          key={i}
          className="hero-char"
          style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
        >
          {char}
        </span>
      ))}
    </>
  )
}

/**
 * Full-bleed cinematic hero, converged with the homepage Hero: background
 * slideshow (Ken Burns) or direct video, layered warm-grade/scrim overlays,
 * per-character RagMarom headline, center-draw orange accent, primary + ghost
 * CTAs. Like the homepage hero, the dark base has no seam divider below it — the
 * first section floats up over it as a sheet.
 */
export default function AcademyHero({ onRegister }) {
  const ref = useRef(null)
  const imgRefs = useRef([])
  const video = isDirectVideo(hero.videoUrl)

  // Headline intro (run once)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.hero-char, .hero-accent, .hero-eyebrow, .hero-subtitle, .hero-cta', {
          opacity: 1, y: 0, scaleX: 1, filter: 'blur(0px)',
        })
        return
      }
      const tl = gsap.timeline()
      tl.fromTo('.hero-eyebrow', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.1)
      tl.fromTo(
        '.hero-char',
        { y: 55, opacity: 0, filter: 'blur(14px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.09, duration: 0.95, ease: 'power3.out' },
        0.2
      )
      tl.fromTo('.hero-accent', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.3, ease: 'power2.inOut' }, '-=0.1')
      tl.fromTo('.hero-subtitle', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' })
      tl.fromTo('.hero-cta', { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.3, ease: 'power2.out' }, '-=0.1')
      tl.fromTo('.scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 0.25 })
    }, ref)
    return () => ctx.revert()
  }, [])

  // Background slideshow + Ken Burns (skipped under reduced motion or when a video plays)
  useEffect(() => {
    if (video) return
    const imgs = imgRefs.current.filter(Boolean)
    if (!imgs.length) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

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
  }, [video])

  return (
    <section
      ref={ref}
      dir="rtl"
      id="academy-top"
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0">
        {video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={hero.videoPoster}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={hero.videoUrl} />
          </video>
        ) : (
          IMAGES.map((src, i) => (
            <img
              key={src}
              ref={(el) => (imgRefs.current[i] = el)}
              src={src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: i === 0 ? 1 : 0,
                transition: 'opacity 1.2s ease-in-out, transform 1.2s ease-out',
                willChange: 'opacity, transform',
              }}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))
        )}
        {/* Warm-tone color grade */}
        <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
        {/* Dark scrim for text legibility */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Neutral depth gradient — grounds the CTAs and the sheet that floats up below, with no blue cast (matches the homepage hero) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 text-center select-none">
        <p className="hero-eyebrow ds-eyebrow text-orange mb-6">
          {hero.eyebrow} · שנת י״ג
        </p>

        <h1
          className="font-ragmarom text-white tracking-tight"
          style={{
            fontFamily: "'RagMarom', sans-serif",
            fontSize: 'clamp(3rem, 9vw, 9.5rem)',
            lineHeight: 0.95,
            textShadow: '0 4px 32px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.8)',
          }}
        >
          <SplitText>{hero.title}</SplitText>
        </h1>

        {/* Orange accent line — draws from center */}
        <div
          className="hero-accent mx-auto mt-5 md:mt-7 rounded-full bg-orange"
          style={{ height: '3px', width: 'clamp(8rem, 22vw, 22rem)', transformOrigin: 'center' }}
        />

        <p
          className="hero-subtitle font-heebo text-white/85 mt-7 mx-auto max-w-2xl leading-relaxed"
          style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.5rem)', textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
        >
          {hero.subtitle}
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-10 md:mt-12">
          <PrimaryButton onClick={onRegister} icon={ChevronLeft} className="hero-cta">
            {hero.primaryCta}
          </PrimaryButton>
          <Button variant="ghost" href="#academy-manifesto" className="hero-cta">
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
