import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowLeft } from 'lucide-react'
import Button from '../../components/ui/Button'
import { hero, NEXT_CYCLE_LABEL } from '../content'
import { goToRegister } from '../shared'

/**
 * One big statement over the sunset circle (DESIGN.MD Mode A). Type is
 * anchored to the base of the frame so the photo's sky and sun stay clear.
 */
export default function Hero() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-el',
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1.3, ease: 'power3.out', delay: 0.15 }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      id="top"
      dir="rtl"
      className="relative w-full h-[100svh] min-h-[620px] overflow-hidden bg-navy-deep text-white"
    >
      {/* Photo + overlay stack */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={hero.image}
          alt={hero.imageAlt}
          fetchPriority="high"
          className="ken-burns absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: '50% 45%', animationDuration: '14s' }}
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
      <div aria-hidden="true" className="absolute inset-0 bg-black/30" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      {/* RTL text sits on the right — deepen that side so the title clears the crowd */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-l from-black/55 via-black/15 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-orange/10 to-transparent" />

      {/* Top bar */}
      <header className="absolute top-0 inset-x-0 z-20">
        <div className="max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 pt-5 md:pt-7 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="חמש אצבעות - לאתר התנועה">
            <img src="/logo.png" alt="" className="h-9 md:h-11 w-auto" />
            <span className="font-heebo font-extrabold text-white text-base md:text-lg leading-none">חמש אצבעות</span>
          </a>
          <a
            href="#register"
            onClick={goToRegister}
            className="hidden sm:inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-5 py-2 text-sm font-bold text-white hover:bg-white/20 hover:border-white/50 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {hero.cta}
          </a>
        </div>
      </header>

      {/* Statement */}
      <div className="relative z-10 h-full max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 flex flex-col justify-end pb-14 md:pb-20">
        <p className="hero-el ds-eyebrow text-orange mb-4 md:mb-5" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}>
          תנועת חמש אצבעות · הכנה לשירות משמעותי
        </p>
        <h1
          className="hero-el font-ragmarom text-white leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(4rem, 13vw, 12rem)', textShadow: '0 4px 32px rgba(0,0,0,0.6)' }}
        >
          {hero.title}
        </h1>
        <p
          className="hero-el mt-5 md:mt-7 max-w-2xl font-heebo font-medium text-white/90 leading-snug"
          style={{ fontSize: 'clamp(1.15rem, 1.9vw, 1.65rem)', textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
        >
          {hero.subtitle}
        </p>

        <div className="hero-el mt-8 md:mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          {/* Button drops onClick when it renders an <a>; capture-phase handler gets through ...rest */}
          <Button href="#register" onClickCapture={goToRegister} size="lg" icon={ArrowLeft} glow>
            {hero.cta}
          </Button>
          <p className="font-heebo text-white/85 text-sm md:text-base" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}>
            <span className="font-semibold text-white">המחזור הקרוב </span>
            <span className="font-bold text-white tabular-nums">{NEXT_CYCLE_LABEL}</span>
            <span className="mx-2.5 text-orange" aria-hidden="true">•</span>
            בסבסוד מלא
          </p>
        </div>
      </div>
    </section>
  )
}
