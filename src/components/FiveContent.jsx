import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Ynet og:image extracted from the article page
const YNET_IMAGE =
  'https://ynet-pic1.yit.co.il/picserver6/crop_images/2024/11/21/B1HUEGs2fke/B1HUEGs2fke_0_0_1080_1080_0_large.jpg'

// YouTube SVG icon (brand-accurate play button)
function YouTubeIcon({ size = 48 }) {
  return (
    <svg viewBox="0 0 90 63" width={size} height={size * (63 / 90)} aria-hidden="true">
      <path
        fill="#FF0000"
        d="M88.1 9.8C87 5.7 83.8 2.5 79.7 1.4 72.8 0 45 0 45 0S17.2 0 10.3 1.4C6.2 2.5 3 5.7 1.9 9.8 0 17 0 31.5 0 31.5s0 14.5 1.9 21.7c1.1 4.1 4.3 7.2 8.4 8.4C17.2 63 45 63 45 63s27.8 0 34.7-1.4c4.1-1.1 7.3-4.3 8.4-8.4C90 46 90 31.5 90 31.5s0-14.5-1.9-21.7z"
      />
      <path fill="#fff" d="M36 45l23.5-13.5L36 18z" />
    </svg>
  )
}

// Spotify SVG icon
function SpotifyIcon({ size = 28 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="#1DB954" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.518 17.318a.748.748 0 01-1.03.25c-2.82-1.723-6.37-2.112-10.55-1.157a.749.749 0 01-.357-1.455c4.575-1.044 8.497-.595 11.69 1.337a.748.748 0 01.247 1.025zm1.472-3.273a.937.937 0 01-1.288.308c-3.226-1.983-8.144-2.558-11.963-1.4a.937.937 0 01-.545-1.794c4.361-1.325 9.784-.682 13.49 1.597a.937.937 0 01.306 1.289zm.127-3.408C15.57 8.48 9.506 8.27 6.124 9.305a1.124 1.124 0 01-.652-2.15c3.895-1.183 10.368-.955 14.46 1.638a1.124 1.124 0 01-1.215 1.892l-.6-.058z" />
    </svg>
  )
}

// Ynet logo SVG (red wordmark style)
function YnetIcon({ size = 26 }) {
  return (
    <svg viewBox="0 0 60 24" width={size * (60 / 24)} height={size} aria-hidden="true">
      <rect width="60" height="24" rx="4" fill="#E2001A" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill="white"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="14"
      >
        ynet
      </text>
    </svg>
  )
}

export default function FiveContent() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fcontent-heading',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 1.3, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        }
      )
      gsap.fromTo(
        '.fcontent-item',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 1.3, ease: 'power3.out',
          scrollTrigger: { trigger: '.fcontent-grid', start: 'top 78%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="five-content"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-white"
    >
      {/* ── Atmospheric glows ── */}
      <div className="pointer-events-none absolute top-[-5%] left-[-5%] w-[40vw] h-[50vh] rounded-full bg-[#ff8714]/8 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[10%] right-[5%] w-[45vw] h-[40vh] rounded-full bg-[#ff8714]/6 blur-[160px]" />

      {/* ── Halftone dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #000032 1.2px, transparent 1.2px)',
          backgroundSize: '22px 22px',
          opacity: 0.04,
        }}
      />


      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

        {/* ── Section heading ── */}
        <div className="text-center pt-24 pb-16">
          <h2
            className="fcontent-heading font-inter font-extrabold text-[#000032] leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 5rem)' }}
          >
            תוכן חמש
          </h2>
          <p
            className="fcontent-heading font-frank italic text-[#ff8714] mt-3 leading-snug"
            style={{ fontSize: 'clamp(1.2rem, 2vw, 2.2rem)' }}
          >
            האזינו, צפו וקראו
          </p>
          <div className="fcontent-heading mt-5 mx-auto w-14 h-1 rounded-full bg-[#ff8714]" />
        </div>

        {/* ── Content grid — 3 equal columns ── */}
        <div className="fcontent-grid grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pb-24">

          {/* ── Spotify podcast card ── */}
          <div className="fcontent-item flex flex-col rounded-2xl overflow-hidden border border-[#000032]/8 bg-[#fafaf8]">
            {/* Card header */}
            <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-[#000032]/8">
              <SpotifyIcon size={24} />
              <h3
                className="font-inter font-bold text-[#000032]"
                style={{ fontSize: 'clamp(1rem, 1.3vw, 1.2rem)' }}
              >
                פודקאסט חמש אצבעות
              </h3>
            </div>
            {/* Embed fills remaining height */}
            <div className="flex-1 p-4 flex flex-col gap-3">
              <p className="font-heebo text-[#000032]/60 leading-relaxed text-sm">
                האזינו לפרק האחרון של הפודקאסט שלנו — שיחות מעמיקות על חינוך, מנהיגות ערכית ואנשים שנכנסים לזירה.
              </p>
              <iframe
                style={{ borderRadius: '10px', flex: 1, minHeight: '352px' }}
                src="https://open.spotify.com/embed/show/1pkoB14iPwztzO8LXkqGaR?utm_source=generator&theme=0"
                width="100%"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="פודקאסט חמש אצבעות"
              />
            </div>
          </div>

          {/* ── Ynet article card ── */}
          <a
            href="https://www.ynet.co.il/activism/article/sjuqy53fkg"
            target="_blank"
            rel="noopener noreferrer"
            className="fcontent-item group flex flex-col rounded-2xl overflow-hidden border border-[#000032]/8 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Cover image */}
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <img
                src={YNET_IMAGE}
                alt="כתבה על תנועת חמש אצבעות ב-Ynet"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <YnetIcon size={22} />
              </div>
            </div>
            {/* Card body */}
            <div className="flex flex-col gap-3 p-5 bg-[#fafaf8] group-hover:bg-[#0d1b4b] transition-colors duration-300 flex-1">
              <h3
                className="font-inter font-bold text-[#000032] group-hover:text-white transition-colors duration-300"
                style={{ fontSize: 'clamp(1rem, 1.3vw, 1.25rem)' }}
              >
                כתבה ב-Ynet
              </h3>
              <p className="font-heebo text-[#000032]/60 group-hover:text-white/60 leading-relaxed transition-colors duration-300 text-sm">
                קראו על תנועת חמש אצבעות וההשפעה שלנו על הנוער הישראלי.
              </p>
              <span className="mt-auto inline-block font-inter font-bold text-white bg-[#ff8714] px-5 py-2 rounded-xl text-sm self-start">
                לקריאת הכתבה &larr;
              </span>
            </div>
          </a>

          {/* ── YouTube card ── */}
          <a
            href="https://www.youtube.com/@Five_Fingers_Israel"
            target="_blank"
            rel="noopener noreferrer"
            className="fcontent-item group flex flex-col rounded-2xl overflow-hidden border border-[#000032]/8 hover:shadow-xl transition-shadow duration-300"
          >
            {/* YouTube branded cover */}
            <div
              className="relative w-full flex items-center justify-center"
              style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #0f0f0f 0%, #282828 100%)' }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.15) 30px, rgba(255,255,255,0.15) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,0.15) 30px, rgba(255,255,255,0.15) 31px)',
                }}
              />
              <div className="relative flex flex-col items-center gap-3">
                <YouTubeIcon size={56} />
                <span className="font-inter font-bold text-white/80 tracking-wide text-sm">
                  Five Fingers Israel
                </span>
              </div>
            </div>
            {/* Card body */}
            <div className="flex flex-col gap-3 p-5 bg-[#fafaf8] group-hover:bg-[#0d1b4b] transition-colors duration-300 flex-1">
              <h3
                className="font-inter font-bold text-[#000032] group-hover:text-white transition-colors duration-300"
                style={{ fontSize: 'clamp(1rem, 1.3vw, 1.25rem)' }}
              >
                ערוץ חמש ביוטיוב
              </h3>
              <p className="font-heebo text-[#000032]/60 group-hover:text-white/60 leading-relaxed transition-colors duration-300 text-sm">
                צפו בסרטוני תנועת חמש אצבעות — תכניות, אירועים ורגעים שמגדירים את הדרך.
              </p>
              <span className="mt-auto inline-block font-inter font-bold text-white bg-[#ff8714] px-5 py-2 rounded-xl text-sm self-start">
                לערוץ שלנו &larr;
              </span>
            </div>
          </a>

        </div>

      </div>
    </section>
  )
}
