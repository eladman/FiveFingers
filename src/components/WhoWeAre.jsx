import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function WhoWeAre() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.wwa-el',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 70%',
          },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="who-we-are"
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center bg-[#fafaf8]"
    >
      {/* ── Atmospheric glows ── */}
      <div className="pointer-events-none absolute bottom-[-10%] left-[20%] w-[70vw] h-[50vh] rounded-full bg-[#ff8714]/14 blur-[160px]" />
      <div className="pointer-events-none absolute top-[-10%] right-[-5%] w-[40vw] h-[60vh] rounded-full bg-[#ff8714]/8 blur-[140px]" />

      {/* ── Full-bleed two-column layout ── */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-[1fr_2.2fr] gap-0 md:min-h-[100dvh]">

        {/* ── Text column — right ── */}
        <div className="flex flex-col justify-start gap-10 px-6 sm:px-10 md:px-14 lg:px-20 pt-24 pb-20 border-b md:border-b-0 md:border-l border-[#000032]/8">

          {/* Main heading */}
          <div className="wwa-el">
            <h2
              className="font-inter font-extrabold text-[#000032] leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 4.2vw, 4.8rem)' }}
            >
              מי אנחנו
            </h2>
            <p
              className="font-frank italic text-[#ff8714] mt-3 leading-snug"
              style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2.4rem)' }}
            >
              הכירו את התנועה
            </p>
          </div>

          {/* Divider */}
          <div className="wwa-el w-full h-px bg-[#000032]/10" />

          {/* Vision */}
          <div className="wwa-el flex flex-col gap-3">
            <span className="font-inter font-bold text-[#ff8714] text-xs tracking-[0.22em] uppercase">
              חזון
            </span>
            <h3
              className="font-inter font-bold text-[#000032] leading-tight"
              style={{ fontSize: 'clamp(1.3rem, 1.8vw, 1.9rem)' }}
            >
              חברה מבוססת אמון
            </h3>
            <p
              className="font-heebo text-[#000032]/65 leading-relaxed"
              style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.15rem)' }}
            >
              אמון של האדם בעצמו/ה, בקהילה שאליה הוא/היא משתייך/ת ולבסוף בין כלל הגורמים בחברה הישראלית.
            </p>
          </div>

          {/* Mission */}
          <div className="wwa-el flex flex-col gap-3">
            <span className="font-inter font-bold text-[#ff8714] text-xs tracking-[0.22em] uppercase">
              המשימה שלנו
            </span>
            <h3
              className="font-inter font-bold text-[#000032] leading-tight"
              style={{ fontSize: 'clamp(1.3rem, 1.8vw, 1.9rem)' }}
            >
              מימוש פוטנציאל
            </h3>
            <p
              className="font-heebo text-[#000032]/65 leading-relaxed"
              style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.15rem)' }}
            >
              לבנות אנשים חזקים ואכפתיים שישפיעו על החברה הישראלית.
            </p>
          </div>

        </div>

        {/* ── Video column — left ── */}
        <div className="wwa-el flex items-center justify-center p-8 md:p-12 lg:p-16">
          <div className="w-full">
            <div
              className="relative w-full rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,30,0.18)] ring-1 ring-black/8"
              style={{ paddingBottom: '56.25%' }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/jOdf0gJrZug?rel=0&modestbranding=1"
                title="מי אנחנו — חמש אצבעות"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
