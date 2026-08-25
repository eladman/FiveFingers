import { ChevronLeft } from 'lucide-react'
import Button from '../ui/Button'
import useReveal from '../../hooks/useReveal'

/**
 * Closing CTA — navy band with orange glow (mirrors the Collabs/Liabah close).
 * Drives to the shared contact modal, tagged 'עמיר מנחם'.
 */
export default function AmirCTA({ onBook }) {
  const ref = useReveal({ selector: '.cta-animate', y: 28, stagger: 0.1, duration: 1.1, start: 'top 86%' })

  return (
    <section id="amir-cta" dir="rtl" className="relative w-full overflow-hidden bg-navy text-white">
      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
        <div className="cta-animate mx-auto mb-10 h-px w-16 bg-orange/60" />
        <p
          className="cta-animate font-heebo font-semibold text-orange mb-5"
          style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.82rem)', letterSpacing: '0.28em' }}
        >
          הצעד הראשון
        </p>
        <h2 className="cta-animate font-ragmarom leading-[1.02]" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}>
          בואו נעשה את הצעד הראשון
        </h2>
        <p
          className="cta-animate font-heebo text-white/75 mt-6 mx-auto max-w-xl leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
        >
          להזמנת הרצאה, סדנה או ליווי אישי - השאירו פרטים ונחזור אליכם/ן.
        </p>

        <div className="cta-animate mt-10">
          <Button variant="primary" size="lg" icon={ChevronLeft} onClick={() => onBook?.()}>
            דברו איתי
          </Button>
        </div>
      </div>
    </section>
  )
}
