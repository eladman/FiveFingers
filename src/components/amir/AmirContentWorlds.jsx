import { useRef, useState } from 'react'
import { Play, ChevronLeft, Headphones, Instagram, Youtube } from 'lucide-react'
import { MuseumSection, MuseumHeading } from '../academy/shared'
import useReveal from '../../hooks/useReveal'
import { REELS, SOCIALS, STUDIO } from '../../data/amirData'

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
    <div className="cw-animate relative overflow-hidden rounded-[2rem] bg-navy ring-1 ring-navy/[0.08] shadow-[0_30px_80px_rgba(0,0,30,0.16)]" style={{ aspectRatio: '9 / 16' }}>
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
          <span className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
          <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-orange text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play size={26} className="ms-1" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  )
}

/**
 * "עולמות תוכן" — where to follow Amir. A strip of three portrait reels
 * (click-to-play), a row of channel links (podcast / Instagram / YouTube), and a
 * quiet "בתקשורת" credibility note over the broadcast-studio shot.
 */
export default function AmirContentWorlds() {
  const ref = useReveal({ selector: '.cw-animate', y: 32, stagger: 0.08, duration: 1, start: 'top 82%' })

  return (
    <MuseumSection id="amir-content" bg="white">
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <MuseumHeading
          kicker="עולמות תוכן"
          title="להישאר מחוברים"
          lead="רגעים מהשטח, פרקים והרצאות — כל התוכן במקום אחד"
          align="start"
          animateClass="cw-animate"
        />

        {/* Reels — mobile: horizontal snap scroll; sm+: 3-column grid */}
        <div className="mt-14 md:mt-20">
          {/* Mobile carousel */}
          <div
            className="sm:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {REELS.map((r) => (
              <div key={r.src} className="flex-none w-[80vw] snap-center">
                <ReelCard src={r.src} poster={r.poster} />
              </div>
            ))}
          </div>
          {/* Desktop grid */}
          <div className="hidden sm:grid grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto sm:max-w-none">
            {REELS.map((r) => (
              <ReelCard key={r.src} src={r.src} poster={r.poster} />
            ))}
          </div>
        </div>

        {/* Channels */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {SOCIALS.map((s) => {
            const Icon = SOCIAL_ICONS[s.key] || Headphones
            const external = s.href.startsWith('http')
            return (
              <a
                key={s.key}
                href={s.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 rounded-2xl bg-white ring-1 ring-navy/[0.08] px-6 py-5 transition-all duration-300 hover:ring-orange/40 hover:shadow-[0_18px_44px_rgba(0,0,30,0.10)]"
              >
                <span className="flex items-center justify-center w-12 h-12 shrink-0 rounded-full bg-orange/10 text-orange transition-colors duration-300 group-hover:bg-orange group-hover:text-white">
                  <Icon size={22} strokeWidth={1.9} />
                </span>
                <span className="flex-1 text-right">
                  <span className="block font-heebo font-bold text-navy" style={{ fontSize: '1.1rem' }}>{s.title}</span>
                  <span className="block font-heebo text-navy/55" style={{ fontSize: '0.9rem' }}>{s.label}</span>
                </span>
                <ChevronLeft size={20} className="shrink-0 text-navy/30 transition-all duration-300 group-hover:text-orange group-hover:-translate-x-1" />
              </a>
            )
          })}
        </div>

        {/* "בתקשורת" credibility note */}
        <div className="cw-animate mt-16 md:mt-20 relative overflow-hidden rounded-[2rem] ring-1 ring-navy/[0.08]">
          <img
            src={STUDIO.src}
            width={STUDIO.w}
            height={STUDIO.h}
            alt="עמיר מנחם באולפן שידור"
            loading="lazy"
            className="w-full h-full object-cover"
            style={{ aspectRatio: '21 / 9' }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-navy/85 via-navy/45 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 md:px-12 max-w-md text-right">
              <p className="ds-eyebrow text-orange mb-3">בתקשורת</p>
              <p className="font-ragmarom text-white leading-tight" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}>
                מהבמה לאולפן — ומשם לשטח
              </p>
            </div>
          </div>
        </div>
      </div>
    </MuseumSection>
  )
}
