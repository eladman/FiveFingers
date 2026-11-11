import { useRef, useState } from 'react'
import { Play } from 'lucide-react'
import useReveal from '../../hooks/useReveal'
import { why } from '../content'
import { Heading } from '../shared'

/** Dark navy gradient (Mode B): three reasons beside the recruitment reel. */
export default function Why() {
  const ref = useReveal({ selector: '.rv', y: 48, stagger: 0.1 })

  return (
    <section
      ref={ref}
      id="why"
      dir="rtl"
      className="relative w-full overflow-hidden text-white"
      style={{ background: 'linear-gradient(155deg, #182f6e 0%, #0d1b4b 45%, #081028 100%)' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 90% 45% at 50% 0%, rgba(255,135,20,0.08) 0%, transparent 65%)' }}
      />
      <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-14 lg:gap-24 items-center">
          <div>
            <Heading kicker={why.kicker} title={why.title} dark />
            <ol className="mt-12 border-t border-white/10">
              {why.reasons.map((r, i) => (
                <li key={r.title} className="rv grid grid-cols-[3.5rem_1fr] md:grid-cols-[5rem_1fr] gap-4 py-7 md:py-8 border-b border-white/10">
                  <span className="font-mono text-orange text-sm md:text-base pt-1.5 tabular-nums" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="ds-card-title text-white">{r.title}</h3>
                    <p className="mt-2 font-heebo text-white/70 leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.15vw, 1.15rem)' }}>
                      {r.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rv flex justify-center lg:justify-start">
            <ReelCard />
          </div>
        </div>
      </div>
    </section>
  )
}

/** 9:16 phone-style card. Poster until clicked, then the real video with sound. */
function ReelCard() {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)
  const { video } = why

  const start = () => {
    setPlaying(true)
    // Let React mount the <video> first, then play inside the same user gesture chain.
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}))
  }

  return (
    <div
      className="relative w-[min(330px,78vw)] aspect-[9/16] rounded-[2.4rem] overflow-hidden bg-black ring-1 ring-white/15"
      style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.45), 0 12px 40px -8px rgba(255,135,20,0.18)' }}
    >
      {playing ? (
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          controls
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <button
          type="button"
          onClick={start}
          className="group absolute inset-0 w-full h-full text-right focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange focus-visible:ring-inset rounded-[2.4rem]"
          aria-label={`${video.label} (${video.duration})`}
        >
          <img src={video.poster} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.03]" />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
          {/* Controls live in the bottom bar so they never cover the reel's burned-in captions */}
          <span className="absolute bottom-0 inset-x-0 p-5 flex items-center gap-4">
            <span className="relative shrink-0 w-16 h-16 rounded-full bg-orange flex items-center justify-center shadow-[0_10px_30px_-6px_rgba(255,135,20,0.7)] transition-transform duration-300 ease-brand group-hover:scale-110">
              <span aria-hidden="true" className="absolute inset-0 rounded-full border-2 border-orange/70 motion-safe:animate-ping" style={{ animationDuration: '2.2s' }} />
              <Play size={26} className="text-white fill-white -translate-x-px" aria-hidden="true" />
            </span>
            <span className="flex-1">
              <span className="block font-heebo font-bold text-white text-lg leading-tight">{video.label}</span>
              <span className="block font-mono text-white/65 text-sm mt-0.5" dir="ltr" style={{ textAlign: 'right' }}>{video.duration}</span>
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
