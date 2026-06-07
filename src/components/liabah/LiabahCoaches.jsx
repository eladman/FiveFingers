import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { User } from 'lucide-react'
import { coaches } from '../../data/liabahData'
import { SectionBg, SectionHeading } from './shared'

gsap.registerPlugin(ScrollTrigger)

/** The coaches grid — photo + name + one-line bio. */
export default function LiabahCoaches() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.lc-animate', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="liabah-coaches"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#fafaf8]"
    >
      <SectionBg />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading title="המאמנים והמאמנות" subtitle="הדמויות שמובילות את הדרך" animateClass="lc-animate" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-24">
          {coaches.map((coach) => (
            <div key={coach.id} className="lc-animate text-center">
              {/* Photo / placeholder */}
              <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-[#000032]/[0.06] mb-4">
                {coach.imageSrc ? (
                  <img src={coach.imageSrc} alt={coach.name} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <User size={36} className="text-[#000032]/20" strokeWidth={1.5} />
                    <span className="font-heebo text-[#000032]/25 text-xs">תמונה בקרוב</span>
                  </div>
                )}
              </div>
              <h3 className="font-heebo font-bold text-[#000032] text-lg">{coach.name}</h3>
              <p className="font-heebo text-[#ff8714] text-sm mt-0.5">{coach.role}</p>
              <p className="font-heebo text-[#000032]/60 text-sm leading-relaxed mt-2">{coach.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
