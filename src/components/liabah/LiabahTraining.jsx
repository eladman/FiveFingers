import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Activity, Brain, Users, Heart } from 'lucide-react'
import { trainingItems } from '../../data/liabahData'
import { SectionBg, SectionHeading } from './shared'

gsap.registerPlugin(ScrollTrigger)

const ICONS = { Activity, Brain, Users, Heart }

/** "What a training session includes" — icon cards. */
export default function LiabahTraining() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.lt-animate', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="liabah-training"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#ffffff]"
    >
      <SectionBg watermark={false} />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading title="מה כולל האימון" subtitle="ארבעה רכיבים בכל מפגש" animateClass="lt-animate" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-24">
          {trainingItems.map((item) => {
            const Icon = ICONS[item.icon] || Activity
            return (
              <div
                key={item.title}
                className="lt-animate group rounded-2xl border border-[#000032]/8 bg-white p-7 text-right shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#ff8714]/30"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#ff8714]/10 mb-5 transition-colors duration-300 group-hover:bg-[#ff8714]">
                  <Icon size={26} className="text-[#ff8714] transition-colors duration-300 group-hover:text-white" strokeWidth={1.75} />
                </div>
                <h3 className="font-heebo font-bold text-[#000032] text-xl mb-2">{item.title}</h3>
                <p className="font-heebo text-[#000032]/65 leading-relaxed">{item.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
