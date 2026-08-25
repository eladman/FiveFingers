import { useEffect, useRef } from 'react'
import useReveal from '../hooks/useReveal'

const ARENA_VIDEO = '/hero_section/arena_intro.mp4'
const ARENA_POSTER = '/Hero-Pics/214A0011.jpg'

export default function ManInArena() {
  const ref = useReveal({ selector: '.mia-el', y: 48, stagger: 0.14, duration: 1.4, start: 'top 78%' })
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Honor reduced-motion: hold the poster frame, never play.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      video.pause()
      return
    }

    // Play once the moment the section scrolls into view. No loop —
    // the video naturally freezes on its final (max zoom) frame.
    let played = false
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !played) {
          played = true
          const p = video.play()
          if (p && typeof p.catch === 'function') p.catch(() => {})
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="belief"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-black text-white"
    >
      {/* ── Background video ── */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={ARENA_VIDEO}
          poster={ARENA_POSTER}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {/* Warm-tone color grade */}
        <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
        {/* Dark scrim for text legibility */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/55" />
        {/* Edge feathers — video emerges from / dissolves into the neighbors */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1080px] mx-auto px-6 sm:px-10 md:px-14 py-28 md:py-32 flex flex-col items-center text-center">

        {/* Kicker */}
        <div className="mia-el flex items-center justify-center gap-3 mb-9 md:mb-12">
          <span className="h-px w-8 bg-orange/70" />
          <span className="ds-eyebrow text-[#ff8714]">האדם בזירה</span>
          <span className="h-px w-8 bg-orange/70" />
        </div>

        {/* Cascading quote — the hero of the section */}
        <span
          className="mia-el block w-full font-ragmarom text-white leading-[0.98]"
          style={{ fontSize: 'clamp(2.6rem, 6.4vw, 8rem)', textShadow: '0 2px 28px rgba(0,0,0,0.6)' }}
        >
          ״השבח לאדם בזירה,
        </span>

        <span
          className="mia-el block w-full font-ragmarom text-white leading-[1.02] mt-2"
          style={{ fontSize: 'clamp(1.9rem, 4.4vw, 5.4rem)', textShadow: '0 2px 28px rgba(0,0,0,0.6)' }}
        >
          זה שפניו מכוסים באבק, זיעה ודם.
        </span>

        <span
          className="mia-el block w-full font-ragmarom text-white/70 leading-[1.05] mt-2"
          style={{ fontSize: 'clamp(1.5rem, 3.2vw, 4rem)', textShadow: '0 2px 24px rgba(0,0,0,0.5)' }}
        >
          זה שאינו מפסיק לשאוף ולנסות.
        </span>

        <span
          className="mia-el block w-full font-ragmarom text-white/45 leading-[1.1] mt-2"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 2.6rem)', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
        >
          זה שמנסה, שעושה, שיודע התלהבות, מחויבות וחתירה למטרה.״
        </span>

        {/* Attribution */}
        <p
          className="mia-el font-inter text-white/55 text-sm md:text-base mt-8"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}
        >
          - תיאודור רוזוולט, 1910
        </p>

        {/* Connecting line — the movement's belief, one quiet sentence */}
        <p
          className="mia-el font-heebo text-white/75 leading-relaxed mt-12 md:mt-14 mx-auto max-w-[56ch]"
          style={{ fontSize: 'clamp(1.05rem, 1.35vw, 1.3rem)', textShadow: '0 1px 14px rgba(0,0,0,0.6)' }}
        >
          אנחנו בחמש אצבעות מאמינים שתפקידנו להיכנס לזירה הישראלית ולהשפיע על המציאות - ולחנך
          את דור העתיד להיות אנשים שלא מסתכלים מהצד, אלא פועלים למען חברה טובה יותר במדינת ישראל.
        </p>

      </div>
    </section>
  )
}
