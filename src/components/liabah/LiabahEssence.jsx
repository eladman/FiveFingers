import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, ImageIcon } from 'lucide-react'
import { hero, essence } from '../../data/liabahData'
import { SectionBg, SectionHeading } from './shared'

gsap.registerPlugin(ScrollTrigger)

// ─── 3D Stage Carousel ───────────────────────────────────────────────────────
function StagesCarousel({ stages }) {
  const [active, setActive] = useState(1) // center card starts at index 1
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setActive(prev => (prev + 1) % stages.length)
    }, 3000)
    return () => clearInterval(id)
  }, [paused, stages.length])

  const getCardStyle = (i) => {
    const n = stages.length
    // offset: 0=center, 1=left-side (next in RTL), n-1=right-side (prev in RTL)
    const offset = ((i - active) % n + n) % n

    if (offset === 0) {
      return {
        transform: 'translateX(-50%) translateZ(90px) rotateY(0deg) scale(1)',
        opacity: 1,
        zIndex: 10,
        pointerEvents: 'none',
        boxShadow:
          '0 24px 64px -12px rgba(0,0,50,0.18), 0 10px 28px -6px rgba(255,135,20,0.13)',
        background: 'linear-gradient(150deg, #ffffff 0%, #fff7ee 100%)',
      }
    }

    // In RTL: offset n-1 is to the RIGHT (prev stage), offset 1 is to the LEFT (next stage)
    const isRight = offset === n - 1
    const xPx = isRight ? 250 : -250

    return {
      transform: `translateX(calc(-50% + ${xPx}px)) translateZ(-110px) scale(0.86)`,
      opacity: 0.72,
      zIndex: 5,
      pointerEvents: 'auto',
      cursor: 'pointer',
      boxShadow: '0 6px 24px -4px rgba(0,0,50,0.07)',
      background: '#ffffff',
    }
  }

  return (
    <div className="w-full pb-4">
      {/* Carousel stage */}
      <div
        className="relative mx-auto"
        style={{ perspective: '1400px', height: '420px', maxWidth: '900px' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {stages.map((s, i) => {
          const isActive = ((i - active + stages.length) % stages.length) === 0
          const cardStyle = getCardStyle(i)

          return (
            <div
              key={s.num}
              onClick={() => { if (!isActive) setActive(i) }}
              dir="rtl"
              className="absolute top-0 left-1/2 w-[300px] md:w-[340px] rounded-2xl px-10 py-9"
              style={{
                ...cardStyle,
                transition: 'all 0.52s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              {/* Step number */}
              <span className="block font-heebo text-[0.6rem] font-bold tracking-[0.28em] text-[#ff8714] mb-5">
                {s.num}
              </span>

              {/* Title */}
              <h3
                className="font-heebo font-black text-[#000032] leading-[0.9] mb-4 tracking-tight"
                style={{ fontSize: 'clamp(2.6rem, 4.5vw, 3.6rem)' }}
              >
                {s.title}
              </h3>

              {/* Orange accent bar */}
              <div
                className={`h-[3px] rounded-full mb-4 transition-all duration-500 self-end ${
                  isActive ? 'w-10 bg-[#ff8714]' : 'w-5 bg-[#ff8714]/40'
                }`}
                style={{ marginRight: 0 }}
              />

              {/* Description */}
              <p
                className={`font-heebo leading-relaxed transition-colors duration-500 ${
                  isActive ? 'text-[#000032]/68' : 'text-[#000032]/45'
                }`}
                style={{ fontSize: '0.9rem' }}
              >
                {s.text}
              </p>

              {/* Inactive overlay */}
              {!isActive && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/0 to-white/20 pointer-events-none" />
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function LiabahEssence() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.es-animate',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="liabah-essence"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#fafaf8]"
    >
      <SectionBg />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading
          title={essence.heading}
          subtitle={essence.subheading}
          animateClass="es-animate"
        />

        {/* Intro row: paragraph (right) + video (left) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center pb-16">
          {/* Right column in RTL: text */}
          <p
            className="es-animate font-heebo text-[#000032]/70 leading-relaxed"
            style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.3rem)' }}
          >
            {essence.paragraph}
          </p>

          {/* Left column in RTL: video */}
          <div className="es-animate">
            <div
              className="relative w-full overflow-hidden rounded-2xl border border-[#000032]/10 shadow-xl shadow-[#000032]/10"
              style={{ aspectRatio: '16 / 9', background: '#000' }}
            >
              {hero.videoUrl ? (
                <iframe
                  src={hero.videoUrl}
                  title="סרטון ליבה"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  {hero.videoPoster && (
                    <img
                      src={hero.videoPoster}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover opacity-55"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/35" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="flex items-center justify-center w-18 h-18 rounded-full bg-[#ff8714] shadow-lg shadow-[#ff8714]/40"
                      style={{ width: '4.5rem', height: '4.5rem' }}>
                      <Play size={26} className="text-white ms-1" fill="white" />
                    </div>
                    <span className="font-heebo text-white/70 text-sm">סרטון בקרוב</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 3-stage carousel */}
        <div className="es-animate pb-20">
          <StagesCarousel stages={essence.stages} />
        </div>

        {/* Method pillars — image cards */}
        <div className="es-animate text-center mb-12">
          <h3
            className="font-heebo font-extrabold text-[#000032]"
            style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)' }}
          >
            השיטה שלנו
          </h3>
          <p className="font-heebo text-[#000032]/55 mt-3" style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)' }}>
            שלושה עמודי תווך שעובדים יחד
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-24">
          {essence.pillars.map((p) => (
            <div
              key={p.title}
              className="es-animate group flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm border border-[#000032]/8 hover:shadow-xl hover:border-[#ff8714]/25 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#000032]/[0.06]">
                {p.imageSrc ? (
                  <img
                    src={p.imageSrc}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: p.objectPosition || '50% 50%' }}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <ImageIcon size={28} className="text-[#000032]/20" strokeWidth={1.5} />
                    <span className="font-heebo text-[#000032]/25 text-sm">תמונה בקרוב</span>
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-3 p-6 text-right flex-1">
                <h4
                  className="font-heebo font-extrabold text-[#000032] leading-tight"
                  style={{ fontSize: 'clamp(1.3rem, 1.8vw, 1.6rem)' }}
                >
                  {p.title}
                </h4>
                <div className="w-8 h-[3px] rounded-full bg-[#ff8714] mr-auto" style={{ marginRight: 0 }} />
                <p className="font-heebo text-[#000032]/65 leading-relaxed" style={{ fontSize: '0.92rem' }}>
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
