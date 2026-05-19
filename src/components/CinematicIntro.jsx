import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function SplitText({ children, wordClass }) {
  return (
    <span className={wordClass}>
      {[...children].map((char, i) => (
        <span
          key={i}
          className="intro-char"
          style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export default function CinematicIntro({ onComplete }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Phase 1: Image fades in from black
      tl.fromTo(
        '.intro-image',
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power2.inOut' }
      )

      // Phase 2: Cinematic letterbox bars slide in
      tl.fromTo(
        '.intro-bar-top',
        { scaleY: 0 },
        { scaleY: 1, duration: 0.45, ease: 'power2.inOut' },
        '-=0.6'
      )
      tl.fromTo(
        '.intro-bar-bottom',
        { scaleY: 0 },
        { scaleY: 1, duration: 0.45, ease: 'power2.inOut' },
        '<'
      )

      // Phase 3: "חמש" — character-by-character, right-to-left (RTL natural order)
      tl.fromTo(
        '.intro-word-1 .intro-char',
        { y: 55, opacity: 0, filter: 'blur(14px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.09,
          duration: 0.95,
          ease: 'power3.out',
        },
        '+=0.15'
      )

      // Phase 4: "אצבעות" — overlaps slightly
      tl.fromTo(
        '.intro-word-2 .intro-char',
        { y: 55, opacity: 0, filter: 'blur(14px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.06,
          duration: 0.95,
          ease: 'power3.out',
        },
        '-=0.5'
      )

      // Phase 5: Orange accent line draws in
      tl.fromTo(
        '.intro-accent',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.55, ease: 'power2.inOut' },
        '-=0.2'
      )

      // Phase 6: Subtitle rises in
      tl.fromTo(
        '.intro-subtitle',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out' },
        '-=0.1'
      )

      // Phase 7: Hold for impact
      tl.to({}, { duration: 0.65 })

      // Phase 8: Letterbox bars retract
      tl.to('.intro-bar-top', { scaleY: 0, duration: 0.5, ease: 'power2.inOut' })
      tl.to('.intro-bar-bottom', { scaleY: 0, duration: 0.5, ease: 'power2.inOut' }, '<')

      // Phase 9: Entire overlay fades out
      tl.to(
        '.cinematic-overlay',
        { opacity: 0, duration: 0.65, ease: 'power2.inOut' },
        '+=0.05'
      )

      // Done — hand off to App
      tl.call(() => onComplete())
    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="cinematic-overlay fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      style={{ pointerEvents: 'all' }}
    >
      {/* Background image */}
      <img
        className="intro-image absolute inset-0 w-full h-full object-cover"
        src="/Hero-Pics/214A0011.jpg"
        alt=""
        loading="eager"
        style={{ opacity: 0 }}
      />

      {/* Scrim layers (match Hero.jsx) */}
      <div className="absolute inset-0 bg-[#ff8714]/10 mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Cinematic letterbox bars */}
      <div
        className="intro-bar-top absolute top-0 inset-x-0 bg-black"
        style={{ height: '11vh', transformOrigin: 'top', scaleY: 0 }}
      />
      <div
        className="intro-bar-bottom absolute bottom-0 inset-x-0 bg-black"
        style={{ height: '11vh', transformOrigin: 'bottom', scaleY: 0 }}
      />

      {/* Title block */}
      <div className="relative z-10 text-center px-4 select-none" dir="rtl">
        <h1 className="leading-none mb-0" style={{ lineHeight: 1 }}>
          {/* Word 1 */}
          <span
            className="intro-word-1 block font-ragmarom text-white tracking-tight"
            style={{
              fontSize: 'clamp(4.5rem, 14vw, 13rem)',
              textShadow: '0 4px 32px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.8)',
              lineHeight: 0.95,
            }}
          >
            <SplitText wordClass="">חמש</SplitText>
          </span>

          {/* Word 2 */}
          <span
            className="intro-word-2 block font-ragmarom text-white tracking-tight"
            style={{
              fontSize: 'clamp(4.5rem, 14vw, 13rem)',
              textShadow: '0 4px 32px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.8)',
              lineHeight: 0.95,
            }}
          >
            <SplitText wordClass="">אצבעות</SplitText>
          </span>
        </h1>

        {/* Orange accent line */}
        <div
          className="intro-accent mx-auto mt-5 md:mt-7 rounded-full bg-[#ff8714]"
          style={{
            height: '3px',
            width: 'clamp(8rem, 22vw, 22rem)',
            transformOrigin: 'center',
            scaleX: 0,
            opacity: 0,
          }}
        />

        {/* Subtitle */}
        <p
          className="intro-subtitle font-ragmarom text-[#ff8714] mt-5 md:mt-7"
          style={{
            fontSize: 'clamp(1.5rem, 4.5vw, 4.5rem)',
            textShadow: '0 2px 20px rgba(0,0,0,0.9)',
            opacity: 0,
          }}
        >
          חינוך למצוינות
        </p>
      </div>
    </div>
  )
}
