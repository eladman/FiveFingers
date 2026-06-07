import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ImageIcon } from 'lucide-react'
import { programsByAge } from '../../data/liabahData'
import { SectionBg, SectionHeading } from './shared'

gsap.registerPlugin(ScrollTrigger)

const CLIP_EVEN = 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)'
const CLIP_ODD = 'polygon(0% 0%, 94% 0%, 100% 100%, 6% 100%)'

export default function LiabahPrograms({ onRegister }) {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.lp-heading', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
      ref.current.querySelectorAll('.lp-row').forEach((row) => {
        gsap.fromTo(row.querySelectorAll('.lp-animate'), { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 80%' },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="liabah-programs"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#ffffff]"
    >
      <SectionBg watermark={false} />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading title="תכניות לפי גילאים" subtitle="מסלול שמתאים לכל שלב" animateClass="lp-heading" />

        <div className="flex flex-col">
          {programsByAge.map((prog, i) => {
            const isEven = i % 2 === 0
            const clip = isEven ? CLIP_EVEN : CLIP_ODD
            const imageOrder = isEven ? 'order-2' : 'order-1'
            const textOrder = isEven ? 'order-1' : 'order-2'
            const isLast = i === programsByAge.length - 1

            return (
              <div
                key={prog.id}
                className={`lp-row grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-20 ${
                  !isLast ? 'border-b border-[#000032]/8' : 'pb-24'
                }`}
              >
                {/* Image */}
                <div className={`lp-animate ${imageOrder}`}>
                  <div className="relative">
                    <div
                      className="absolute bg-[#ff8714]"
                      style={{
                        inset: 0,
                        clipPath: clip,
                        transform: isEven ? 'translate(14px, 14px)' : 'translate(-14px, 14px)',
                      }}
                    />
                    <div className="relative aspect-[4/3] overflow-hidden" style={{ clipPath: clip }}>
                      {prog.imageSrc ? (
                        <img src={prog.imageSrc} alt={prog.title} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 bg-[#000032]/[0.07] flex flex-col items-center justify-center gap-3">
                          <ImageIcon size={32} className="text-[#000032]/20" strokeWidth={1.5} />
                          <span className="font-heebo text-[#000032]/25 text-sm">תמונה בקרוב</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className={`lp-animate ${textOrder} flex flex-col gap-5 text-right`}>
                  <h3
                    className="font-heebo font-extrabold text-[#000032] leading-[0.95] tracking-tight"
                    style={{ fontSize: 'clamp(2.2rem, 3.6vw, 4rem)' }}
                  >
                    {prog.title}
                  </h3>
                  <p className="font-heebo text-[#ff8714] leading-none" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.5rem)' }}>
                    {prog.ages}
                  </p>
                  <p className="font-heebo text-[#000032]/65 leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)' }}>
                    {prog.description}
                  </p>
                  <div>
                    <button
                      onClick={onRegister}
                      className="inline-block font-heebo font-bold text-white bg-[#ff8714] px-8 py-3.5 rounded-xl text-base hover:bg-[#e07610] transition-colors duration-200"
                    >
                      הרשמה לקבוצה
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
