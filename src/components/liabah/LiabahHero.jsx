import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft, ChevronDown } from 'lucide-react'
import { hero } from '../../data/liabahData'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import { PrimaryButton } from './shared'

const IMAGES = [
  '/Hero-Pics/214A0011.jpg',
  '/Hero-Pics/214A0027.jpg',
  '/Hero-Pics/214A0034.jpg',
  '/Hero-Pics/214A0088.jpg',
  '/Hero-Pics/214A0114.jpg',
  '/Hero-Pics/214A0511.jpg',
  '/Hero-Pics/_14A9355.jpg',
]

export default function LiabahHero({ onRegister }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  const [current, setCurrent] = useState(0)

  // Intro reveal sequence
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.fromTo('.lh-eyebrow', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.1)
        .fromTo('.lh-title', { y: 40, opacity: 0, filter: 'blur(10px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }, '-=0.2')
        .fromTo('.lh-accent', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.35, ease: 'power2.inOut' }, '-=0.2')
        .fromTo('.lh-sub', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.05')
        .fromTo('.lh-cta', { y: 14, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out' }, '-=0.05')
        .fromTo('.lh-chrome', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.1')
    }, ref)
    return () => ctx.revert()
  }, [])

  // Auto-advancing slideshow (paused under reduced-motion). Re-runs on `current`
  // so a manual dot click also resets the timer.
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % IMAGES.length)
    }, 5000)
    return () => clearInterval(id)
  }, [reduced, current])

  return (
    <section
      id="liabah-top"
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-dvh overflow-hidden text-white flex flex-col"
    >
      {/* Background slideshow with Ken Burns on the active slide */}
      <div className="absolute inset-0">
        {IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
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
        <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
        <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-black/75 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-orange/10 to-transparent" />
      </div>

      {/* Headline block — vertically centered */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 pt-28 md:pt-32 pb-36">
          <div className="text-center">
            <p className="lh-eyebrow font-heebo text-white/55 tracking-[0.3em] text-sm md:text-base mb-4">
              {hero.eyebrow}
            </p>
            <h1
              className="lh-title leading-none tracking-tight"
              style={{ fontFamily: "'RagMarom', sans-serif", fontSize: 'clamp(4rem, 13vw, 13rem)' }}
            >
              {hero.title}
            </h1>
            <div
              className="lh-accent mx-auto mt-6 rounded-full bg-orange"
              style={{ height: '3px', width: 'clamp(7rem, 18vw, 18rem)', transformOrigin: 'center' }}
            />
            <p
              className="lh-sub font-heebo text-white/85 mt-7 mx-auto max-w-2xl leading-snug"
              style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.8rem)' }}
            >
              {hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 justify-center mt-9">
              <PrimaryButton onClick={onRegister} icon={ChevronLeft} className="lh-cta">
                {hero.primaryCta}
              </PrimaryButton>
              <a
                href="#liabah-essence"
                className="lh-cta flex items-center text-white/75 hover:text-white px-7 py-3.5 rounded-full text-base border border-white/25 hover:border-white/55 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
              >
                גלו עוד
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll-down cue */}
      <a
        href="#liabah-essence"
        aria-label="גלילה למטה"
        className="lh-chrome scroll-indicator absolute left-1/2 bottom-4 z-10 text-white/60 hover:text-white transition-colors"
      >
        <ChevronDown size={26} />
      </a>
    </section>
  )
}
