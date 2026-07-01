import { ChevronLeft } from 'lucide-react'
import { admissions } from '../../data/academyData'
import { MuseumSection, MuseumHeading, QuietButton } from './shared'
import useReveal from '../../hooks/useReveal'

/**
 * Admissions — process steps + two candidate tracks, in the calm museum system
 * (hairlines, whitespace, no colored icon chips). Informational only.
 */
export default function AcademyAdmissions({ onRegister }) {
  const ref = useReveal({ selector: '.adm-animate', y: 28, stagger: 0.08, duration: 1, start: 'top 84%' })

  return (
    <MuseumSection id="academy-admissions" bg="white">
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <MuseumHeading
          kicker="מיונים"
          title={admissions.heading}
          lead={admissions.subheading}
          align="start"
          animateClass="adm-animate"
        />

        {/* Process steps — ruled list */}
        <div className="mt-16 border-t border-navy/12">
          {admissions.steps.map((step) => (
            <div
              key={step.num}
              className="adm-animate grid grid-cols-[3.5rem_1fr] md:grid-cols-[5rem_14rem_1fr] gap-x-6 md:gap-x-10 gap-y-1 items-baseline py-7 border-b border-navy/12"
            >
              <span className="font-ragmarom text-navy/25 leading-none" style={{ fontSize: 'clamp(1.6rem, 2.2vw, 2.2rem)' }}>
                {step.num}
              </span>
              <h3 className="font-heebo font-bold text-navy" style={{ fontSize: 'clamp(1.15rem, 1.6vw, 1.5rem)' }}>
                {step.title}
              </h3>
              <p className="col-span-2 md:col-span-1 font-heebo text-navy/60 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>

        {/* Candidate tracks */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {admissions.tracks.map((track) => (
            <div key={track.id} className="adm-animate flex flex-col gap-5 bg-white p-8 md:p-10 rounded-2xl border border-navy/12 text-right">
              <h3 className="ds-card-title text-navy">
                {track.label}
              </h3>
              <p className="font-heebo text-navy/60 leading-relaxed flex-1" style={{ fontSize: '1.02rem' }}>
                {track.text}
              </p>
              <div>
                <QuietButton onClick={() => onRegister?.(track.contactTag)} icon={ChevronLeft}>
                  להגשת מועמדות
                </QuietButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MuseumSection>
  )
}
