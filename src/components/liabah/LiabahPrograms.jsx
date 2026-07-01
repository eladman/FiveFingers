import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ImageIcon } from 'lucide-react'
import { programsByAge } from '../../data/liabahData'
import { SectionBg, SectionHeading, PrimaryButton } from './shared'

gsap.registerPlugin(ScrollTrigger)

const CLIP_EVEN = 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)'
const CLIP_ODD = 'polygon(0% 0%, 94% 0%, 100% 100%, 6% 100%)'

export default function LiabahPrograms({ onRegister }) {
  const ref = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const heading = ref.current.querySelectorAll('.lp-heading')
      const rows = ref.current.querySelectorAll('.lp-row')

      if (reduced) {
        gsap.set([...heading, ...ref.current.querySelectorAll('.lp-animate, .lp-card')], { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo('.lp-heading', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })

      rows.forEach((row) => {
        gsap.fromTo(row.querySelectorAll('.lp-animate'), { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 80%' },
        })

        // Subtle image parallax
        const img = row.querySelector('.lp-parallax')
        if (img) {
          gsap.fromTo(img, { yPercent: -6 }, {
            yPercent: 6, ease: 'none',
            scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true },
          })
        }
      })

      // Mobile compact cards — gentle fade-up per card
      ref.current.querySelectorAll('.lp-card').forEach((card) => {
        gsap.fromTo(card, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
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
        <SectionHeading eyebrow="המסלולים" title="תכניות לפי גילאים" subtitle="מסלול שמתאים לכל שלב" animateClass="lp-heading" />

        {/* ── Mobile: compact stacked cards (title + ages overlaid on a short banner) ── */}
        <div className="md:hidden flex flex-col gap-4 pb-12">
          {programsByAge.map((prog) => (
            <article
              key={prog.id}
              className="lp-card relative overflow-hidden rounded-xl border border-navy/10 bg-white shadow-[0_4px_16px_-8px_rgba(13,27,75,0.16)]"
            >
              {/* Banner — real photo, or a branded orange gradient until one is added */}
              <div className="relative aspect-[21/9] overflow-hidden">
                {prog.imageSrc ? (
                  <img
                    src={prog.imageSrc}
                    alt={prog.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff8714] to-[#e0750f]">
                    <div
                      className="absolute inset-0 opacity-[0.18]"
                      style={{
                        backgroundImage: 'radial-gradient(circle, #ffffff 1.4px, transparent 1.4px)',
                        backgroundSize: '18px 18px',
                      }}
                    />
                  </div>
                )}
                {/* Legibility scrim under the title */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b4b]/80 via-[#0d1b4b]/20 to-transparent" />
                {/* Title + ages, overlaid bottom-right */}
                <div className="absolute inset-x-0 bottom-0 p-3 text-right">
                  <h3 className="font-heebo font-extrabold text-white leading-tight text-[1.3rem]">
                    {prog.title}
                  </h3>
                  <span className="inline-block font-heebo font-medium text-white/80 text-xs">
                    {prog.ages}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="px-3 py-3 flex flex-col gap-3 text-right">
                <p className="font-heebo text-navy/65 text-[0.85rem] leading-relaxed">
                  {prog.description}
                </p>
                <PrimaryButton onClick={onRegister} size="sm" className="w-full">הרשמה לקבוצה</PrimaryButton>
              </div>
            </article>
          ))}
        </div>

        {/* ── Desktop: alternating angled-clip rows ── */}
        <div className="hidden md:flex md:flex-col">
          {programsByAge.map((prog, i) => {
            const isEven = i % 2 === 0
            const clip = isEven ? CLIP_EVEN : CLIP_ODD
            const imageOrder = isEven ? 'order-2' : 'order-1'
            const textOrder = isEven ? 'order-1' : 'order-2'
            const isLast = i === programsByAge.length - 1

            return (
              <div
                key={prog.id}
                className={`lp-row grid md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-20 ${
                  !isLast ? 'border-b border-navy/8' : 'pb-24'
                }`}
              >
                {/* Image */}
                <div className={`lp-animate ${imageOrder}`}>
                  <div className="relative">
                    {/* Offset accent shape — solid behind a real image, soft tint when empty */}
                    <div
                      className={prog.imageSrc ? 'absolute bg-orange' : 'absolute bg-orange/15'}
                      style={{
                        inset: 0,
                        clipPath: clip,
                        transform: isEven ? 'translate(14px, 14px)' : 'translate(-14px, 14px)',
                      }}
                    />
                    <div
                      className="relative aspect-[4/3] overflow-hidden"
                      style={{ clipPath: clip }}
                    >
                      {prog.imageSrc ? (
                        <img
                          src={prog.imageSrc}
                          alt={prog.title}
                          className="lp-parallax absolute inset-x-0 w-full object-cover"
                          style={{ top: '-10%', height: '120%' }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-surface border border-navy/10 flex flex-col items-center justify-center gap-3">
                          <ImageIcon size={32} className="text-navy/20" strokeWidth={1.5} />
                          <span className="font-heebo text-navy/30 text-sm">תמונה בקרוב</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className={`lp-animate ${textOrder} flex flex-col gap-5 text-right`}>
                  <h3
                    className="font-heebo font-extrabold text-navy leading-[0.95] tracking-tight"
                    style={{ fontSize: 'clamp(2.2rem, 3.6vw, 4rem)' }}
                  >
                    {prog.title}
                  </h3>
                  <span className="self-start inline-flex items-center rounded-full bg-orange/10 text-[#ff8714] font-heebo font-semibold px-4 py-1.5" style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)' }}>
                    {prog.ages}
                  </span>
                  <p className="font-heebo text-navy/65 leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)' }}>
                    {prog.description}
                  </p>
                  <div>
                    <PrimaryButton onClick={onRegister}>הרשמה לקבוצה</PrimaryButton>
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
