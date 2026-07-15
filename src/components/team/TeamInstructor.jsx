import { ChevronLeft } from 'lucide-react'
import { MuseumSection, QuietButton } from '../academy/shared'
import useReveal from '../../hooks/useReveal'
import { instructor } from '../../data/teamData'

/**
 * מדריך/ה בהזנק — a lighter, secondary track. Editorial two-column: copy on the
 * RTL-right, a field photo on the left. Copy is a generic placeholder for now.
 */
export default function TeamInstructor({ onRegister }) {
  const ref = useReveal({ selector: '.tin-animate', y: 28, stagger: 0.1, duration: 1.1, start: 'top 84%' })

  return (
    <MuseumSection id="team-instructor" bg="white">
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <div className="text-right order-2 lg:order-1">
            <p className="tin-animate ds-eyebrow text-orange-ink mb-5">{instructor.eyebrow}</p>
            <h2 className="tin-animate ds-section-title text-navy">{instructor.title}</h2>
            <div className="tin-animate mt-6 h-1 rounded-full bg-orange w-16" />
            <p className="tin-animate ds-section-subtitle text-[#ff8714] mt-7">{instructor.lead}</p>
            <p className="tin-animate font-heebo text-navy/70 text-lg leading-relaxed mt-6">{instructor.body}</p>
            <div className="tin-animate mt-9">
              <QuietButton icon={ChevronLeft} onClick={() => onRegister?.('הדרכה בהזנק')}>
                {instructor.cta}
              </QuietButton>
            </div>
          </div>

          {/* Photo */}
          <div className="tin-animate order-1 lg:order-2">
            <div className="relative w-full overflow-hidden rounded-[2rem] border border-navy/10 shadow-xl shadow-navy/10" style={{ aspectRatio: '4 / 5' }}>
              <img
                src="/Hero-Pics/214A0027.jpg"
                alt="מדריך/ה בפעילות שטח של חמש אצבעות"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </MuseumSection>
  )
}
