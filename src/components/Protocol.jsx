import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* ─── SVG Animation: Rotating Concentric Rings ─────────────── */
function GeometricSVG() {
  return (
    <svg viewBox="0 0 200 200" width="160" height="160" className="overflow-visible mx-auto">
      {/* Outer dashed ring */}
      <g style={{ transformOrigin: '100px 100px', animation: 'rotateGeo 12s linear infinite' }}>
        <circle cx="100" cy="100" r="82" fill="none" stroke="#ff8714" strokeWidth="1" strokeDasharray="14 7" opacity="0.55" />
      </g>
      {/* Middle ring */}
      <g style={{ transformOrigin: '100px 100px', animation: 'rotateGeoRev 7s linear infinite' }}>
        <circle cx="100" cy="100" r="58" fill="none" stroke="#ff8714" strokeWidth="1.5" strokeDasharray="7 11" opacity="0.8" />
        <circle cx="100" cy="100" r="44" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.15" />
      </g>
      {/* Inner ring */}
      <g style={{ transformOrigin: '100px 100px', animation: 'rotateGeo 5s linear infinite' }}>
        <circle cx="100" cy="100" r="28" fill="none" stroke="#ff8714" strokeWidth="2" strokeDasharray="4 8" opacity="0.9" />
      </g>
      {/* Center dot */}
      <circle cx="100" cy="100" r="7" fill="#ff8714" />
      <circle cx="100" cy="100" r="3.5" fill="#0d1b4b" />
      {/* Pulse ring */}
      <circle cx="100" cy="100" r="7" fill="none" stroke="#ff8714" strokeWidth="2"
        style={{ animation: 'pulseRing 2s ease-out infinite' }} />
    </svg>
  )
}

/* ─── SVG Animation: Scanning Laser Grid ───────────────────── */
function ScannerSVG() {
  const dots = []
  for (let r = 0; r < 6; r++)
    for (let c = 0; c < 8; c++)
      dots.push({ x: c * 30 + 15, y: r * 26 + 13 })

  return (
    <svg viewBox="0 0 240 156" width="220" height="140" className="mx-auto">
      <defs>
        <linearGradient id="scanGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#ff8714" stopOpacity="0" />
          <stop offset="45%"  stopColor="#ff8714" stopOpacity="0.9" />
          <stop offset="55%"  stopColor="#ff8714" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ff8714" stopOpacity="0" />
        </linearGradient>
        <filter id="scanGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="2.5" fill="#ffffff" opacity="0.2" />
      ))}

      {/* Animated scan stripe */}
      <rect
        x="0" y="0" width="240" height="5" rx="2.5"
        fill="url(#scanGrad)"
        filter="url(#scanGlow)"
        style={{ animation: 'scanDown 2.6s ease-in-out infinite' }}
      />
    </svg>
  )
}

/* ─── SVG Animation: EKG Waveform ──────────────────────────── */
function WaveformSVG() {
  return (
    <svg viewBox="0 0 420 80" width="100%" height="72" className="max-w-sm mx-auto overflow-visible">
      <path
        d="M0,40 L70,40 L82,40 L92,8 L102,72 L112,40 L125,40
           L185,40 L197,40 L207,8 L217,72 L227,40 L240,40
           L300,40 L312,40 L322,8 L332,72 L342,40 L355,40 L420,40"
        fill="none"
        stroke="#ff8714"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1400"
        strokeDashoffset="0"
        style={{ animation: 'ekg 3.2s ease-in-out infinite' }}
      />
      {/* Moving pulse dot */}
      <circle cx="342" cy="40" r="4.5" fill="#ff8714">
        <animate attributeName="opacity" values="1;0;1" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="r" values="4.5;9;4.5" dur="3.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

/* ─── Protocol steps data ───────────────────────────────────── */
const STEPS = [
  {
    num: '01',
    title: 'חוויה',
    desc: 'חוויות אתגריות פיזיות ומנטליות שבונות מסוגלות, עוצמה אישית ויכולת התמודדות עם כל אתגר.',
    bg: 'linear-gradient(160deg, #1e3578 0%, #0d1b4b 55%, #081028 100%)',
    Animation: GeometricSVG,
  },
  {
    num: '02',
    title: 'קבוצה',
    desc: 'קהילה מגובשת עם מטרה משותפת — תמיכה הדדית, משוב אמיתי וצמיחה יחד לאורך כל הדרך.',
    bg: 'linear-gradient(160deg, #213d82 0%, #0f2057 55%, #09163e 100%)',
    Animation: ScannerSVG,
  },
  {
    num: '03',
    title: 'מאמן',
    desc: 'דמות מובילה שמגלמת את ערכי התנועה, מנחה, מאתגרת ומשמשת כמודל לחיקוי אמיתי.',
    bg: 'linear-gradient(160deg, #172e68 0%, #0a1640 55%, #06102e 100%)',
    Animation: WaveformSVG,
  },
]

/* ─── Protocol Section ──────────────────────────────────────── */
export default function Protocol() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')

      // As card[i] becomes fully visible, scale/blur all previous cards
      cards.forEach((card, i) => {
        if (i === 0) return
        const prevCards = cards.slice(0, i)

        gsap.to(prevCards, {
          scale: 0.92 - (i - 1) * 0.02,
          filter: 'blur(12px)',
          opacity: 0.45,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 15%',
            scrub: 1.5,
          },
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef}>
      {/* Section header (not pinned — scrolls normally) */}
      <div className="py-20 md:py-28 px-8 text-center" style={{ background: 'linear-gradient(180deg, #1a2f6b 0%, #0d1b4b 100%)' }}>
        <p className="font-mono text-[#ff8714] text-xs tracking-widest uppercase mb-3">
          המתודולוגיה שלנו
        </p>
        <h2 className="text-white font-bold text-4xl md:text-5xl leading-tight">
          שלוש אבני
          <br />
          <span className="font-frank italic text-[#ff8714]">הבניין.</span>
        </h2>
      </div>

      {STEPS.map((step, i) => (
        <div
          key={step.num}
          className="protocol-card w-full min-h-screen flex items-center justify-center px-8"
          style={{ background: step.bg, position: 'sticky', top: '80px', zIndex: i + 1 }}
        >
          <div className="max-w-xl mx-auto text-center py-24">
            {/* Animation */}
            <div className="mb-10">
              <step.Animation />
            </div>

            {/* Step number */}
            <span className="font-mono text-[#ff8714] text-sm tracking-[0.3em]">{step.num}</span>

            {/* Title */}
            <h3 className="text-white font-frank italic text-6xl md:text-8xl mt-3 mb-6 leading-none">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-white/55 text-lg md:text-xl leading-relaxed">{step.desc}</p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 mt-10">
              <div className="w-12 h-px bg-[#ff8714]/30" />
              <div className="w-2 h-2 rounded-full bg-[#ff8714]/50" />
              <div className="w-12 h-px bg-[#ff8714]/30" />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
