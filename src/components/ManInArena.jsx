import { useEffect, useRef } from 'react'
import useReveal from '../hooks/useReveal'

const ARENA_VIDEO = '/hero_section/arena_intro.mp4'
const ARENA_POSTER = '/Hero-Pics/214A0011.jpg'

export default function ManInArena() {
  const ref = useReveal({ selector: '.mia-el', y: 60, stagger: 0.12, duration: 1.4, start: 'top 70%' })
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
      className="relative w-full overflow-hidden bg-black"
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
        {/* Edge feathers — video emerges from / dissolves into the divider color (#081028) */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* ── Halftone dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1.2px, transparent 1.2px)',
          backgroundSize: '22px 22px',
          opacity: 0.05,
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8 sm:px-12 md:px-16 py-28 md:py-32 flex flex-col items-start">

        {/* Header — title + rule, no eyebrow — heading is iconic enough */}
        <div className="mia-el flex flex-col items-start gap-2.5 mb-10">
          <h2
            className="ds-section-title text-white"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.7)' }}
          >
            האדם בזירה
          </h2>
          <div className="w-12 h-px bg-orange" />
        </div>

        {/* Full-width rule above quote */}
        <div className="mia-el w-full h-px bg-white/15" />

        {/* Cascading quote lines */}
        <span
          className="mia-el block w-full text-right font-ragmarom text-white hover:text-[#ff8714] leading-[0.95] transition-colors duration-300 cursor-default"
          style={{ fontSize: 'clamp(3rem, 7vw, 9rem)', paddingTop: '16px', textShadow: '0 2px 28px rgba(0,0,0,0.6)' }}
        >
          ״השבח לאדם בזירה,
        </span>

        <span
          className="mia-el block w-full text-right font-ragmarom text-white hover:text-[#ff8714] leading-[0.95] transition-colors duration-300 cursor-default"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 6.5rem)', paddingTop: '8px', textShadow: '0 2px 28px rgba(0,0,0,0.6)' }}
        >
          זה שפניו מכוסים באבק, זיעה ודם.
        </span>

        <span
          className="mia-el block w-full text-right font-ragmarom text-white/65 hover:text-[#ff8714] leading-[0.95] transition-colors duration-300 cursor-default"
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 4.8rem)', paddingTop: '6px', textShadow: '0 2px 24px rgba(0,0,0,0.5)' }}
        >
          זה שאינו מפסיק לשאוף ולנסות.
        </span>

        <span
          className="mia-el block w-full text-right font-ragmarom text-white/40 hover:text-[#ff8714] leading-[0.95] transition-colors duration-300 cursor-default"
          style={{
            fontSize: 'clamp(1.1rem, 2.2vw, 3rem)',
            paddingTop: '5px',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(255,255,255,0.15)',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}
        >
          זה שמנסה, שעושה, שיודע התלהבות, מחויבות וחתירה למטרה.״
        </span>

        {/* Footer — attribution right, connecting text left */}
        <div className="mia-el w-full flex flex-col-reverse md:flex-row justify-between items-start mt-9 gap-5 md:gap-12">
          {/* Second in RTL row = visual left */}
          <p
            className="font-heebo text-white/70 leading-[1.8] md:max-w-md text-right"
            style={{ fontSize: 'clamp(0.88rem, 1vw, 1rem)', textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}
          >
            אנחנו בחמש אצבעות מאמינים שתפקידנו הוא להיכנס לזירה הישראלית ולהשפיע על המציאות, לכך אנחנו מחנכים גם את דור העתיד. להיות אנשים שלא מסתכלים מהצד, אלא פועלים למען שינוי ויצירת חברה טובה יותר במדינת ישראל
          </p>
          {/* First in RTL row = visual right */}
          <p className="font-inter text-white/50 text-sm whitespace-nowrap">
            — תיאודור רוזוולט, 1910
          </p>
        </div>

      </div>
    </section>
  )
}
