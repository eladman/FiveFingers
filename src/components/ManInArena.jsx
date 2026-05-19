import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ManInArena() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.mia-el',
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
      id="belief"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#fafaf8]"
    >
      {/* ── Halftone dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #000032 1.2px, transparent 1.2px)',
          backgroundSize: '22px 22px',
          opacity: 0.04,
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8 sm:px-12 md:px-16 py-28 md:py-32 flex flex-col items-start">

        {/* Header — label + title + rule, anchored right (items-start = right in RTL) */}
        <div className="mia-el flex flex-col items-start gap-2.5 mb-10">
          <span className="font-inter font-bold text-[#ff8714] text-xs tracking-[0.22em] uppercase">
            האמונה שלנו
          </span>
          <h2
            className="font-ragmarom text-[#000032] leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 3.8vw, 4.8rem)' }}
          >
            האדם בזירה
          </h2>
          <div className="w-12 h-px bg-[#ff8714]" />
        </div>

        {/* Full-width rule above quote */}
        <div className="mia-el w-full h-px bg-[#000032]/8" />

        {/* Cascading quote lines */}
        <span
          className="mia-el block w-full text-right font-ragmarom text-[#000032] hover:text-[#ff8714] leading-[0.95] pl-5 border-l-2 border-transparent hover:border-[#ff8714] transition-colors duration-300 cursor-default"
          style={{ fontSize: 'clamp(3rem, 7vw, 9rem)', paddingTop: '16px' }}
        >
          ״השבח לאדם בזירה,
        </span>

        <span
          className="mia-el block w-full text-right font-ragmarom text-[#000032] hover:text-[#ff8714] leading-[0.95] pl-5 border-l-2 border-transparent hover:border-[#ff8714] transition-colors duration-300 cursor-default"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 6.5rem)', paddingTop: '8px' }}
        >
          זה שפניו מכוסים באבק, זיעה ודם.
        </span>

        <span
          className="mia-el block w-full text-right font-ragmarom text-[#000032]/60 hover:text-[#ff8714] leading-[0.95] pl-5 border-l-2 border-transparent hover:border-[#ff8714] transition-colors duration-300 cursor-default"
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 4.8rem)', paddingTop: '6px' }}
        >
          זה שאינו מפסיק לשאוף ולנסות.
        </span>

        <span
          className="mia-el block w-full text-right font-ragmarom text-[#000032]/35 hover:text-[#ff8714] leading-[0.95] pl-5 border-l-2 border-transparent hover:border-[#ff8714] transition-colors duration-300 cursor-default"
          style={{
            fontSize: 'clamp(1.1rem, 2.2vw, 3rem)',
            paddingTop: '5px',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(0,0,50,0.08)',
          }}
        >
          זה שמנסה, שעושה, שיודע התלהבות, מחויבות וחתירה למטרה.״
        </span>

        {/* Footer — attribution right, connecting text left */}
        <div className="mia-el w-full flex flex-col-reverse md:flex-row justify-between items-start mt-9 gap-5 md:gap-12">
          {/* Second in RTL row = visual left */}
          <p
            className="font-heebo text-[#000032]/55 leading-[1.8] md:max-w-md text-right"
            style={{ fontSize: 'clamp(0.88rem, 1vw, 1rem)' }}
          >
            אנחנו בחמש אצבעות מאמינים שתפקידנו הוא להיכנס לזירה הישראלית ולהשפיע על המציאות, לכך אנחנו מחנכים גם את דור העתיד. להיות אנשים שלא מסתכלים מהצד, אלא פועלים למען שינוי ויצירת חברה טובה יותר במדינת ישראל
          </p>
          {/* First in RTL row = visual right */}
          <p className="font-inter text-[#000032]/38 text-sm whitespace-nowrap">
            — תיאודור רוזוולט, 1910
          </p>
        </div>

      </div>
    </section>
  )
}
