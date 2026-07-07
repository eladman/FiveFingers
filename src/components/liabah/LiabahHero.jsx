import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft } from 'lucide-react'
import { hero, stats } from '../../data/liabahData'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import { PrimaryButton } from './shared'
import Button from '../ui/Button'

// "זירה" hero — a single static action photo (no slideshow), a cinematic
// diagonal navy grade, a kinetic split-color headline, and a diagonal orange
// stat band slashing across the bottom. Sport / youth-movement energy, same
// design-system tokens. Image is git-tracked (public/liba_pics).
const HERO_IMAGE = '/liba_pics/214A1552.jpg'

// First four stats feed the hero band (the fifth — בוגרים — belongs to the
// full LiabahStats section further down the page).
const BAND_STATS = stats.slice(0, 4).map((s) => ({
  ...s,
  display: `${s.value.toLocaleString('en-US')}${s.suffix}`,
}))

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
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          '.lh-photo, .lh-eyebrow, .lh-word-1 .lh-char, .lh-word-2 .lh-char, .lh-subtitle, .lh-cta, .lh-band, .lh-stat',
          { opacity: 1, y: 0, x: 0, filter: 'blur(0px)', scale: 1 }
        )
        return
      }
      const tl = gsap.timeline()

      tl.fromTo('.lh-photo',
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' },
        0
      )
      tl.fromTo('.lh-eyebrow',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0.25
      )
      tl.fromTo('.lh-word-1 .lh-char',
        { y: 60, opacity: 0, filter: 'blur(14px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.09, duration: 0.95, ease: 'power3.out' },
        '-=0.15'
      )
      tl.fromTo('.lh-word-2 .lh-char',
        { y: 60, opacity: 0, filter: 'blur(14px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.06, duration: 0.95, ease: 'power3.out' },
        '-=0.52'
      )
      tl.fromTo('.lh-subtitle',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
        '-=0.2'
      )
      tl.fromTo('.lh-cta',
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.3, ease: 'power2.out' },
        '-=0.1'
      )
      tl.fromTo('.lh-band',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.1'
      )
      tl.fromTo('.lh-stat',
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out' },
        '-=0.3'
      )
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="liabah-top"
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center"
    >
      {/* ── Static action photo + cinematic grade ── */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt=""
          className="lh-photo absolute inset-0 w-full h-full object-cover"
          style={{ willChange: 'transform, opacity' }}
          loading="eager"
        />
        {/* Warm orange grade */}
        <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
        {/* Diagonal navy grade — grounds the headline on the right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(115deg, rgba(8,16,40,0.85) 8%, rgba(8,16,40,0.35) 45%, rgba(8,16,40,0.12) 70%)',
          }}
        />
        {/* Bottom vignette that seats the stat band */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(0deg, rgba(8,16,40,0.9), transparent 45%)' }}
        />
        {/* Top scrim — keeps the transparent navbar's white links legible over
            the bright sky, without darkening the whole diagonal grade */}
        <div
          className="absolute inset-x-0 top-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(8,16,40,0.55), transparent)' }}
        />
        {/* Kinetic orange streaks */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
          <span
            className="absolute"
            style={{
              top: '22%', right: '-10%', width: '45%', height: '2px', transform: 'skewX(-30deg)',
              background: 'linear-gradient(90deg, transparent, rgba(255,135,20,0.5), transparent)',
            }}
          />
          <span
            className="absolute"
            style={{
              top: '30%', right: '5%', width: '30%', height: '2px', opacity: 0.6, transform: 'skewX(-30deg)',
              background: 'linear-gradient(90deg, transparent, rgba(255,135,20,0.5), transparent)',
            }}
          />
        </div>
      </div>

      {/* ── Content (RTL: right-aligned) ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-48 md:pb-52 text-right select-none">
        <p className="lh-eyebrow ds-eyebrow text-orange mb-5 inline-flex items-center gap-3">
          <span aria-hidden="true" className="inline-block w-8 h-0.5 bg-orange" />
          {hero.eyebrow}
        </p>

        <h1
          className="lh-h1 m-0 flex flex-wrap items-baseline gap-x-[0.22em] text-white tracking-tight"
          style={{
            fontFamily: "'RagMarom', sans-serif",
            fontSize: 'clamp(3rem, 8.5vw, 8.5rem)',
            lineHeight: 0.88,
            textShadow: '0 4px 30px rgba(0,0,0,0.85), 0 2px 10px rgba(0,0,0,0.6)',
          }}
        >
          <span className="lh-word-1"><SplitText>קבוצות</SplitText></span>
          <span className="lh-word-2 text-orange"><SplitText>הנוער</SplitText></span>
        </h1>

        <p
          className="lh-subtitle mt-5 max-w-[24ch]"
          style={{
            fontFamily: "'RagMarom', sans-serif",
            color: '#ffffff',
            fontSize: 'clamp(1.2rem, 2.4vw, 2.2rem)',
            lineHeight: 1.2,
            textShadow: '0 2px 20px rgba(0,0,0,0.85)',
          }}
        >
          {hero.subtitle}
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          <PrimaryButton onClick={onRegister} icon={ChevronLeft} className="lh-cta">
            {hero.primaryCta}
          </PrimaryButton>
          <Button variant="ghost" href="#liabah-essence" className="lh-cta">
            גלו עוד
          </Button>
        </div>
      </div>

      {/* ── Diagonal stat band ── */}
      <div
        className="lh-band absolute bottom-0 inset-x-0 z-[4]"
        style={{
          background: 'linear-gradient(100deg, var(--orange-deep), var(--orange-lift))',
          clipPath: 'polygon(0 42%, 100% 0, 100% 100%, 0 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-6 flex flex-wrap gap-x-8 gap-y-3 md:gap-x-14">
          {BAND_STATS.map((s) => (
            <div key={s.label} className="lh-stat text-right text-white">
              <b
                className="block"
                style={{ fontFamily: "'RagMarom', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', lineHeight: 1 }}
              >
                {s.display}
              </b>
              <span
                className="font-heebo font-bold"
                style={{ fontSize: 'clamp(0.72rem, 1vw, 0.9rem)', opacity: 0.95 }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
