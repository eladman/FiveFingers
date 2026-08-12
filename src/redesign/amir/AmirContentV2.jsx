import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, ChevronLeft, Headphones, Instagram, Youtube } from 'lucide-react'
import { REELS, SOCIALS } from '../../data/amirData'

gsap.registerPlugin(ScrollTrigger)

/**
 * עולמות תוכן — the "studio" band. A dark navy-gradient scene (Mode B) that
 * carries the האדם בזירה broadcast tone: three portrait reels (click-to-play,
 * no autoplay — 5–10 MB each) and the channels as quiet glass rows.
 */

const SOCIAL_ICONS = { podcast: Headphones, instagram: Instagram, youtube: Youtube }

/** A portrait 9:16 reel — poster + play button until tapped, then the video plays. */
function ReelCard({ src, poster }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const start = () => {
    setPlaying(true)
    // Play after the element is un-hidden.
    requestAnimationFrame(() => videoRef.current?.play())
  }

  return (
    <div
      className="act-reel relative overflow-hidden rounded-[1.6rem] md:rounded-[2rem] bg-navy-deep ring-1 ring-white/10 shadow-[0_30px_80px_rgba(0,0,10,0.45)]"
      style={{ aspectRatio: '9 / 16' }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        controls={playing}
        preload="none"
        onPause={() => setPlaying(false)}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {!playing && (
        <button
          type="button"
          onClick={start}
          aria-label="נגן/י את הסרטון"
          className="group absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-inset"
        >
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-orange text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play size={26} className="ms-1" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  )
}

export default function AmirContentV2() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.act-heading',
        { y: 46, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
        }
      )
      gsap.fromTo('.act-reel',
        { y: 54, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.act-reels', start: 'top 80%', once: true },
        }
      )
      gsap.fromTo('.act-channel',
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.act-channels', start: 'top 85%', once: true },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="amir-content"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden"
      style={{ background: 'linear-gradient(155deg, #1e3578 0%, #0d1b4b 45%, #081028 100%)' }}
    >
      {/* top orange radial accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 90% 45% at 50% 0%, rgba(255,135,20,0.07) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 py-24 md:py-32">

        <div className="act-heading max-w-3xl">
          <p className="ds-eyebrow text-orange mb-4">עולמות תוכן</p>
          <h2 className="ds-section-title text-white" style={{ textShadow: '0 2px 24px rgba(0,0,0,0.5)' }}>
            להישאר מחוברים
          </h2>
          <p className="ds-section-subtitle text-white/70 mt-4">
            רגעים מהשטח, פרקים והרצאות. כל התוכן במקום אחד.
          </p>
        </div>

        {/* Reels — mobile: horizontal snap scroll; sm+: 3-column grid */}
        <div className="act-reels mt-14 md:mt-20">
          <div
            className="sm:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {REELS.map((r) => (
              <div key={r.src} className="flex-none w-[76vw] snap-center">
                <ReelCard src={r.src} poster={r.poster} />
              </div>
            ))}
          </div>
          <div className="hidden sm:grid grid-cols-3 gap-6 md:gap-8">
            {REELS.map((r) => (
              <ReelCard key={r.src} src={r.src} poster={r.poster} />
            ))}
          </div>
        </div>

        {/* Channels — quiet glass rows */}
        <div className="act-channels mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {SOCIALS.map((s) => {
            const Icon = SOCIAL_ICONS[s.key] || Headphones
            const external = s.href.startsWith('http')
            return (
              <a
                key={s.key}
                href={s.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="act-channel group flex items-center gap-4 rounded-2xl bg-white/5 ring-1 ring-white/10 px-6 py-5 transition-all duration-300 hover:bg-white/10 hover:ring-orange/50"
              >
                <span className="flex items-center justify-center w-12 h-12 shrink-0 rounded-full bg-orange/15 text-orange transition-colors duration-300 group-hover:bg-orange group-hover:text-white">
                  <Icon size={22} strokeWidth={1.9} />
                </span>
                <span className="flex-1 text-right min-w-0">
                  <span className="block font-heebo font-bold text-white text-[1.1rem]">{s.title}</span>
                  <span className="block font-heebo text-white/55 text-[0.9rem] truncate">{s.label}</span>
                </span>
                <ChevronLeft size={20} className="shrink-0 text-white/30 transition-all duration-300 group-hover:text-orange group-hover:-translate-x-1" />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
