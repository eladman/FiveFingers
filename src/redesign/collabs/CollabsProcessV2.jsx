import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * איך זה עובד — the four engagement steps as one quick horizontal strip:
 * ghost numeral, title, one line. A fast beat between the formats and
 * the closing quote, not a destination.
 */

const STEPS = [
  { n: '1', title: 'מכירים', text: 'נדבר, נבין את הצרכים והרצונות של הארגון שלכם.' },
  { n: '2', title: 'בוחרים נושא', text: 'חוסן, מנהיגות או מצוינות — הנושא שרלוונטי עבורכם.' },
  { n: '3', title: 'מדייקים', text: 'הרצאה, סדנה או מחנה — לפי הקהל, הלו״ז והתקציב.' },
  { n: '4', title: 'יוצאים לדרך', text: 'סוגרים פרטים, קובעים תאריך — ואנחנו לוקחים את זה משם.' },
]

export default function CollabsProcessV2() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return
      gsap.fromTo('.cp2-el',
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="collabs-process"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-white"
    >
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 md:px-16 py-20 md:py-28">
        <div className="cp2-el max-w-3xl">
          <p className="ds-eyebrow text-orange-ink mb-3">התהליך</p>
          <h2 className="font-ragmarom text-navy leading-[0.95]" style={{ fontSize: 'clamp(2.2rem, 4vw, 4.2rem)' }}>
            ארבעה צעדים. <span className="text-orange-ink">זה הכול.</span>
          </h2>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
          {STEPS.map((s) => (
            <div key={s.n} className="cp2-el border-t-2 border-navy/10 pt-6 relative group">
              <span
                className="absolute -top-0.5 right-0 h-0.5 w-10 bg-orange origin-right transition-transform duration-500 group-hover:scale-x-[2.2]"
                aria-hidden="true"
              />
              <span className="block font-ragmarom text-navy/20 leading-none transition-colors duration-300 group-hover:text-orange" style={{ fontSize: 'clamp(2.4rem, 3.4vw, 3.4rem)' }}>
                {s.n}
              </span>
              <h3 className="font-heebo font-bold text-navy mt-4" style={{ fontSize: 'clamp(1.2rem, 1.5vw, 1.45rem)' }}>
                {s.title}
              </h3>
              <p className="font-heebo text-navy/60 leading-relaxed mt-2.5" style={{ fontSize: '0.98rem' }}>
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
