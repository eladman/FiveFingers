import { User } from 'lucide-react'
import { coaches } from '../../data/liabahData'
import { SectionBg, SectionHeading } from './shared'
import useReveal from '../../hooks/useReveal'

/** The coaches grid — photo + name + one-line bio. */
export default function LiabahCoaches() {
  const ref = useReveal({ selector: '.lc-animate', y: 50, stagger: 0.1, duration: 1.1, start: 'top 80%' })

  return (
    <section
      id="liabah-coaches"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-surface"
    >
      <SectionBg />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading eyebrow="הצוות" title="המאמנים והמאמנות" subtitle="הדמויות שמובילות את הדרך" animateClass="lc-animate" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-24">
          {coaches.map((coach) => {
            const isPlaceholder = !coach.imageSrc && coach.name === 'שם המאמן/ת'
            return (
              <div key={coach.id} className="lc-animate group text-center">
                {/* Photo / placeholder */}
                <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-navy/[0.04] border border-navy/8 mb-4 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-navy/10 group-hover:-translate-y-1.5">
                  {coach.imageSrc ? (
                    <>
                      <img
                        src={coach.imageSrc}
                        alt={coach.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-orange/10">
                        <User size={28} className="text-orange" strokeWidth={1.5} />
                      </div>
                      <span className="font-heebo text-navy/35 text-xs">בקרוב</span>
                    </div>
                  )}
                </div>
                {isPlaceholder ? (
                  <p className="font-heebo text-navy/45 text-sm">מאמן/ת בקרוב</p>
                ) : (
                  <>
                    <h3 className="font-heebo font-bold text-navy text-lg">{coach.name}</h3>
                    <p className="font-heebo text-[#b35600] text-sm mt-0.5">{coach.role}</p>
                    <p className="font-heebo text-navy/60 text-sm leading-relaxed mt-2">{coach.bio}</p>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
