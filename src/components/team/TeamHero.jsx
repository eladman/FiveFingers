import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft } from 'lucide-react'
import { hero } from '../../data/teamData'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import { PrimaryButton, QuietButton, Atmosphere } from '../academy/shared'

// Static face-wall — a masonry of real team & coach portraits that bleeds off
// the inline-start (RTL: left) edge and crops at the bottom. NOT a slideshow:
// the images never cycle. Faces + group shots communicate the collective "our
// team" feel. Orange-tinted tiles (indices 1 & 5) add the brand accent.
const MOSAIC = [
  { src: '/team_hero/office.png' },
  { src: '/team_hero/_14A9346.jpg', tint: true },
  { src: '/Hero-Pics/214A0511.jpg' },
  { src: '/Hero-Pics/214A0027.jpg' },
  { src: '/team_hero/_14A9355.jpg' },
  { src: '/team_hero/_14A9373.jpg', tint: true },
  { src: '/Hero-Pics/214A0088.jpg' },
  { src: '/coachs/idan.JPG' },
]

function SplitText({ children }) {
  return (
    <>
      {[...children].map((char, i) => (
        <span
          key={i}
          className="th-char"
          style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
        >
          {char}
        </span>
      ))}
    </>
  )
}

/**
 * Team page hero — the "קיר הפנים" (Faces Wall) concept, light "בליד" variant.
 * A warm-light surface (matching the אקדמיה museum system) with the shared
 * atmosphere; a masonry of team faces bleeds off the left and fades into the
 * surface; the headline and the recruit CTAs sit on the
 * right. Same design system as the site, but a distinctly collective feel —
 * and static (no Ken-Burns cycling). The navbar is forced to its lifted/navy
 * style over this light hero (see App → Navbar `forceLifted`).
 */
export default function TeamHero({ onRegister }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          '.th-word-1 .th-char, .th-word-2 .th-char, .th-eyebrow, .th-sub, .th-cta, .th-tile, .scroll-indicator',
          { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }
        )
        return
      }
      const tl = gsap.timeline()

      tl.fromTo('.th-tile',
        { opacity: 0, y: 30, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.85, ease: 'power3.out' },
        0
      )
      tl.fromTo('.th-eyebrow',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0.2
      )
      tl.fromTo('.th-word-1 .th-char',
        { y: 55, opacity: 0, filter: 'blur(14px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.09, duration: 0.95, ease: 'power3.out' },
        '-=0.15'
      )
      tl.fromTo('.th-word-2 .th-char',
        { y: 55, opacity: 0, filter: 'blur(14px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.06, duration: 0.95, ease: 'power3.out' },
        '-=0.52'
      )
      tl.fromTo('.th-sub',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
        '-=0.2'
      )
      tl.fromTo('.th-cta',
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

  return (
    <section
      id="team-top"
      ref={ref}
      dir="rtl"
      className="relative w-full h-[100dvh] overflow-hidden bg-surface"
    >
      <Atmosphere />

      <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-2">
        {/* ── Text column (RTL: right) ── */}
        <div className="flex flex-col justify-center text-right px-6 md:px-12 lg:px-16 pt-28 pb-10 lg:py-2">
          <p className="th-eyebrow ds-eyebrow text-orange-ink mb-5">
            {hero.eyebrow}
          </p>

          <h1
            className="mb-0 flex items-center gap-[0.25em] text-navy tracking-tight"
            style={{
              fontFamily: "'RagMarom', sans-serif",
              fontSize: 'clamp(3rem, 7vw, 6.6rem)',
              lineHeight: 0.92,
            }}
          >
            <span className="th-word-1"><SplitText>{hero.titleWord1}</SplitText></span>
            <span className="th-word-2 text-orange"><SplitText>{hero.titleWord2}</SplitText></span>
          </h1>

          <p
            className="th-sub mt-5 max-w-[22ch]"
            style={{
              fontFamily: "'RagMarom', sans-serif",
              color: 'var(--orange-ink)',
              fontSize: 'clamp(1.2rem, 2vw, 1.9rem)',
              lineHeight: 1.25,
            }}
          >
            {hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <PrimaryButton onClick={() => onRegister?.()} icon={ChevronLeft} className="th-cta">
              {hero.primaryCta}
            </PrimaryButton>
            <QuietButton href="#team-intro" className="th-cta">
              {hero.secondaryCta}
            </QuietButton>
          </div>
        </div>

        {/* ── Bleed column (RTL: left) — masonry that crops at the edges ── */}
        <div className="relative order-first lg:order-none h-[52vh] lg:h-full overflow-hidden">
          <div style={{ columnCount: 2, columnGap: '14px', padding: '14px' }}>
            {MOSAIC.map(({ src, tint }, i) => (
              <div
                key={src}
                className="th-tile relative rounded-2xl overflow-hidden"
                style={{
                  breakInside: 'avoid',
                  marginBottom: '14px',
                  boxShadow: '0 16px 40px rgba(13,27,75,0.14)',
                  background: '#e9e7e2',
                }}
              >
                <img src={src} alt="" className="block w-full" loading={i < 3 ? 'eager' : 'lazy'} />
                {tint && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ background: 'var(--orange)', mixBlendMode: 'multiply', opacity: 0.13 }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Fade the mosaic into the surface — right edge (into the text) + bottom */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute inset-y-0 right-0 w-24 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #fafaf8, transparent)' }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #fafaf8, transparent)' }}
          />
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="scroll-indicator absolute left-1/2 -translate-x-1/2 z-10"
        style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-navy/25 flex items-start justify-center pt-2">
          <div className="w-1 h-2.5 bg-navy/40 rounded-full" />
        </div>
      </div>
    </section>
  )
}
