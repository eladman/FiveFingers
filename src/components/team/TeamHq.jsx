import { Cpu, Megaphone, Briefcase, Truck, Sparkles, ChevronLeft } from 'lucide-react'
import { MuseumSection, MuseumHeading, PrimaryButton } from '../academy/shared'
import useReveal from '../../hooks/useReveal'
import { hq } from '../../data/teamData'

// Map data icon names → lucide components (keeps teamData icon-library-agnostic).
const ICONS = { Cpu, Megaphone, Briefcase, Truck, Sparkles }

/**
 * תפקידי מטה — conveys that there are many more ways to contribute beyond the
 * field roles. A light section with a department card grid and a "leave details"
 * closing CTA.
 */
export default function TeamHq({ onRegister }) {
  const ref = useReveal({ selector: '.thq-animate', y: 28, stagger: 0.08, duration: 1.1, start: 'top 84%' })

  return (
    <MuseumSection id="team-hq" bg="surface" watermark flip>
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <MuseumHeading
          kicker={hq.eyebrow}
          title={hq.title}
          lead={hq.lead}
          align="center"
          animateClass="thq-animate"
        />

        <p className="thq-animate font-heebo text-navy/70 text-lg leading-relaxed max-w-3xl mx-auto text-center mt-7">
          {hq.body}
        </p>

        {/* Department cards */}
        <div className="thq-animate grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {hq.departments.map((dept) => {
            const Icon = ICONS[dept.icon] || Sparkles
            return (
              <div
                key={dept.id}
                className="group flex flex-col rounded-2xl border border-navy/12 bg-white/60 p-7 text-right transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-lg hover:shadow-navy/5"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange/10 text-orange-ink mb-5">
                  <Icon size={24} />
                </div>
                <h3 className="ds-card-title text-navy">{dept.title}</h3>
                <p className="font-heebo text-navy/60 text-base leading-relaxed mt-2">{dept.text}</p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="thq-animate text-center mt-14">
          <PrimaryButton size="lg" icon={ChevronLeft} onClick={() => onRegister?.('צוות מטה')}>
            {hq.cta}
          </PrimaryButton>
        </div>
      </div>
    </MuseumSection>
  )
}
