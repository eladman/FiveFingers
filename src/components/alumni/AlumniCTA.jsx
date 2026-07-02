import { ChevronLeft, MessageCircle } from 'lucide-react'
import Button from '../ui/Button'
import useReveal from '../../hooks/useReveal'
import { YOAV_URL } from '../../data/alumniData'

/**
 * Closing CTA — navy band with orange glow (mirrors AmirCTA). Primary drives to
 * the Yoav site; secondary opens the shared contact modal.
 */
export default function AlumniCTA({ onContactOpen }) {
  const ref = useReveal({ selector: '.cta-animate', y: 28, stagger: 0.1, duration: 1.1, start: 'top 86%' })

  return (
    <section id="alumni-cta" dir="rtl" className="relative w-full overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute top-[-25%] left-[8%] w-[38vw] h-[55vh] rounded-full bg-orange/10 blur-[160px]" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
        <div className="cta-animate mx-auto mb-10 h-px w-16 bg-orange/60" />
        <p
          className="cta-animate font-heebo font-semibold text-orange mb-5"
          style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.82rem)', letterSpacing: '0.28em' }}
        >
          המחזור הבא כבר בדרך
        </p>
        <h2 className="cta-animate font-ragmarom leading-[1.02]" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}>
          מוכנים לצעד הבא?
        </h2>
        <p
          className="cta-animate font-heebo text-white/75 mt-6 mx-auto max-w-xl leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
        >
          הצטרפו לתוכנית יואב או דברו איתנו כדי להבין אם התוכנית מתאימה לכם/ן.
        </p>

        <div className="cta-animate mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            icon={ChevronLeft}
            href={YOAV_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            להגשת מועמדות
          </Button>
          <Button
            variant="secondary"
            size="lg"
            icon={MessageCircle}
            onClick={() => onContactOpen?.('בוגרים')}
          >
            דברו איתנו
          </Button>
        </div>
      </div>
    </section>
  )
}
