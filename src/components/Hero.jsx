import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft } from 'lucide-react'

const IMAGES = [
  '/Hero-Pics/214A0011.jpg',
  '/Hero-Pics/214A0027.jpg',
  '/Hero-Pics/214A0034.jpg',
  '/Hero-Pics/214A0088.jpg',
  '/Hero-Pics/214A0114.jpg',
  '/Hero-Pics/214A0511.jpg',
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

export default function Hero({ onComplete }) {
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
    let current = 0
    const imgs = imgRefs.current
    if (!imgs.length) return
    const id = setInterval(() => {
      const prev = current
      current = (current + 1) % imgs.length
      imgs[prev].style.opacity = '0'
      imgs[current].style.opacity = '1'
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="home"
      ref={ref}
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
              transition: 'opacity 1.2s ease-in-out',
              willChange: 'opacity',
            }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        {/* Warm-tone color grade */}
        <div className="absolute inset-0 bg-[#ff8714]/10 mix-blend-multiply" />
        {/* Dark scrim for text legibility */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-1/5 bg-gradient-to-t from-black/65 to-transparent" />
        {/* Subtle orange warmth at the very bottom */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#ff8714]/8 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 text-center select-none">
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
          className="hero-accent mx-auto mt-5 md:mt-7 rounded-full bg-[#ff8714]"
          style={{
            height: '3px',
            width: 'clamp(8rem, 22vw, 22rem)',
            transformOrigin: 'center',
          }}
        />

        {/* Subtitle */}
        <p
          className="hero-subtitle text-[#ff8714] mt-5 md:mt-7"
          style={{
            fontFamily: "'RagMarom', sans-serif",
            fontSize: 'clamp(1.6rem, 4.5vw, 4.5rem)',
            textShadow: '0 2px 20px rgba(0,0,0,0.9)',
          }}
        >
          חינוך למצוינות
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-10 md:mt-14">
          <MagneticCTA
            className="hero-cta"
            primary
            href="#contact"
            icon={<ChevronLeft size={18} className="shrink-0" />}
          >
            הצטרפו אלינו
          </MagneticCTA>

          <a
            href="#features"
            className="hero-cta flex items-center gap-2 text-white/70 hover:text-white active:text-white px-7 py-3.5 rounded-full text-base border border-white/20 hover:border-white/50 active:border-white/50 active:scale-[0.97] transition-all duration-300"
          >
            גלו עוד
          </a>
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

function MagneticCTA({ children, icon, primary, href, className }) {
  const onEnter = (e) => { e.currentTarget.style.transform = 'scale(1.04)' }
  const onLeave = (e) => { e.currentTarget.style.transform = 'scale(1)' }

  return (
    <a
      href={href}
      className={`${className ?? ''} group relative overflow-hidden flex items-center gap-2.5 px-8 py-3.5 rounded-full text-base font-bold transition-all duration-300 active:scale-[0.97] ${
        primary ? 'bg-[#ff8714] text-white' : 'bg-white/10 text-white border border-white/20'
      }`}
      style={{ transition: 'transform 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
      <span className="relative">{children}</span>
      {icon && <span className="relative">{icon}</span>}
    </a>
  )
}
