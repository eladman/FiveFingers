import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft, ChevronDown } from 'lucide-react'
import { hero } from '../../data/liabahData'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import { PrimaryButton } from './shared'

/**
 * Editorial Split — a clean vertical split: a full-height photo panel beside a
 * solid navy panel that holds the headline. Magazine-cover composure, distinct
 * from the homepage's centered fullscreen slideshow.
 */

const IMAGES = [
  '/Hero-Pics/214A0027.jpg',
  '/Hero-Pics/214A0088.jpg',
  '/Hero-Pics/214A0114.jpg',
  '/Hero-Pics/214A0011.jpg',
  '/Hero-Pics/_14A9355.jpg',
]

export default function LiabahHero({ onRegister }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  const [current, setCurrent] = useState(0)

  // Intro reveal — text slides in from the side, accent rule wipes out.
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.lh-text', { opacity: 1, x: 0 })
        gsap.set('.lh-accent', { scaleX: 1, opacity: 1 })
        return
      }
      gsap.fromTo('.lh-text', { opacity: 0, x: 28 },
        { opacity: 1, x: 0, stagger: 0.12, duration: 0.9, ease: 'expo.out', delay: 0.2 })
      gsap.fromTo('.lh-accent', { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.5 })
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  // Auto-advancing slideshow (paused under reduced-motion).
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % IMAGES.length), 5000)
    return () => clearInterval(id)
  }, [reduced, current])

  return (
    <section
      id="liabah-top"
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-dvh overflow-hidden flex flex-col-reverse md:flex-row"
      style={{ background: '#000032' }}
    >
      {/* ── NAVY TEXT PANEL ── */}
      <div
        className="relative flex flex-col justify-center text-white"
        style={{ flex: '0 0 44%', padding: 'clamp(2.5rem, 6vw, 4.5rem)' }}
      >
        <p
          className="lh-text font-mono"
          style={{
            color: 'rgba(255,135,20,0.9)',
            fontSize: 'clamp(0.62rem, 1vw, 0.74rem)',
            letterSpacing: '0.3em',
          }}
        >
          {hero.eyebrow}
        </p>

        <h1
          className="lh-text"
          style={{
            margin: '1.1rem 0 0',
            fontFamily: "'RagMarom', sans-serif",
            fontSize: 'clamp(2.8rem, 5.5vw, 5.4rem)',
            lineHeight: 1.02,
          }}
        >
          {hero.title}
        </h1>

        <div
          className="lh-accent rounded-full bg-orange"
          style={{
            height: '3px', width: 'clamp(5rem, 12vw, 9rem)',
            transformOrigin: 'right', margin: 'clamp(1.4rem, 3vh, 2.2rem) 0',
          }}
        />

        <p
          className="lh-text font-heebo"
          style={{
            margin: 0, color: 'rgba(255,255,255,0.78)',
            fontSize: 'clamp(1.05rem, 1.7vw, 1.4rem)', lineHeight: 1.6, maxWidth: '34ch',
          }}
        >
          {hero.subtitle}
        </p>

        <div className="lh-text flex flex-wrap items-center gap-4" style={{ marginTop: 'clamp(1.6rem, 3.5vh, 2.6rem)' }}>
          <PrimaryButton onClick={onRegister} icon={ChevronLeft}>
            {hero.primaryCta}
          </PrimaryButton>
          <a
            href="#liabah-essence"
            className="flex items-center text-white/75 hover:text-white px-6 py-3.5 rounded-full text-base border border-white/25 hover:border-white/55 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            גלו עוד
          </a>
        </div>
      </div>

      {/* ── PHOTO PANEL ── */}
      <div className="relative overflow-hidden" style={{ flex: '1 1 56%', minHeight: '40vh' }}>
        {IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover ${i === current && !reduced ? 'ken-burns' : ''}`}
            style={{
              opacity: i === current ? 1 : 0,
              transition: 'opacity 1.3s ease-in-out, transform 1.2s ease-out',
              willChange: 'opacity, transform',
              objectPosition: 'center 25%',
            }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        {/* soft seam shadow toward the navy panel */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(0,0,50,0.4), transparent 22%)' }}
        />
        {/* bottom fade into navy so the whole hero meets the section seam cleanly */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{ height: '30%', background: 'linear-gradient(to top, #000032 0%, rgba(0,0,50,0) 100%)' }}
        />
        {/* slide dots */}
        <div className="absolute bottom-6 left-6 flex gap-1.5">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              aria-label={`תמונה ${i + 1}`}
              onClick={() => setCurrent(i)}
              className="rounded-sm transition-all duration-300"
              style={{
                width: i === current ? '20px' : '6px', height: '3px',
                background: i === current ? '#ff8714' : 'rgba(255,255,255,0.45)',
              }}
            />
          ))}
        </div>
      </div>

      {/* scroll-down cue */}
      <a
        href="#liabah-essence"
        aria-label="גלילה למטה"
        className="scroll-indicator absolute left-1/2 bottom-4 z-10 text-white/55 hover:text-white transition-colors"
        style={{ transform: 'translateX(-50%)' }}
      >
        <ChevronDown size={26} />
      </a>
    </section>
  )
}
