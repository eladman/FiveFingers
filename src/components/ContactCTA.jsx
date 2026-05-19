import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin } from 'lucide-react'

const CONTACT_ITEMS = [
  { icon: Phone, label: 'טלפון', value: '050-000-0000', href: 'tel:050-000-0000' },
  { icon: Mail, label: 'אימייל', value: 'info@fivefingers.co.il', href: 'mailto:info@fivefingers.co.il' },
  { icon: MapPin, label: 'מיקום', value: 'ישראל', href: '#' },
]

export default function ContactCTA() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-el',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 68%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={ref} className="py-32 md:py-40 bg-white px-8 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Label */}
        <p className="contact-el font-mono text-[#ff8714] text-xs tracking-widest uppercase mb-5">
          בואו נדבר
        </p>

        {/* Headline */}
        <h2 className="contact-el text-[#0d1b4b] font-ragmarom text-5xl md:text-7xl leading-tight mb-6">
          מוכנים לצעד
          <br />
          <span className="font-ragmarom text-[#ff8714]">הבא?</span>
        </h2>

        {/* Sub */}
        <p className="contact-el text-gray-400 text-lg md:text-xl leading-relaxed mb-12 max-w-lg mx-auto">
          בין אם אתם צעירים/ות שרוצים/ות להצטרף, הורים שמחפשים את המסלול הנכון, או ארגון שמעוניין בשיתוף פעולה — אנחנו כאן.
        </p>

        {/* CTA buttons */}
        <div className="contact-el flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <MagneticBtn primary>יצירת קשר</MagneticBtn>
          <MagneticBtn>הצטרפו לתנועה</MagneticBtn>
        </div>

        {/* Contact info cards */}
        <div className="contact-el grid grid-cols-1 sm:grid-cols-3 gap-5">
          {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-gray-50 hover:bg-[#0d1b4b] border border-transparent hover:border-[#0d1b4b] transition-all duration-300"
            >
              <Icon
                size={22}
                className="text-[#ff8714] group-hover:text-[#ff8714] transition-colors"
              />
              <p className="text-gray-400 group-hover:text-white/50 text-xs transition-colors">{label}</p>
              <p className="text-[#0d1b4b] group-hover:text-white font-semibold text-sm transition-colors">
                {value}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function MagneticBtn({ children, primary }) {
  const onEnter = (e) => { e.currentTarget.style.transform = 'scale(1.04)' }
  const onLeave = (e) => { e.currentTarget.style.transform = 'scale(1)' }

  return (
    <button
      className={`group relative overflow-hidden px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 ${
        primary
          ? 'bg-[#ff8714] text-white'
          : 'bg-[#0d1b4b] text-white'
      }`}
      style={{ transition: 'transform 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
      <span className="relative">{children}</span>
    </button>
  )
}
