import { Play, Calendar, MapPin, ChevronLeft } from 'lucide-react'
import Button from '../ui/Button'
import useReveal from '../../hooks/useReveal'
import { coach } from '../../data/teamData'

/**
 * The מאמן/ת centerpiece — a navy feature band (the ליבה rhythm) that carries the
 * heaviest content: explainer video placeholder, the next-course card, and the
 * entry-process step timeline. This is the page's primary conversion moment.
 */
export default function TeamCoach({ onRegister }) {
  const ref = useReveal({ selector: '.tc-animate', y: 32, stagger: 0.08, duration: 1.1, start: 'top 82%' })

  return (
    <section
      id="team-coach"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-navy text-white"
    >
      {/* Orange atmosphere glows */}
      <div className="pointer-events-none absolute top-[-15%] right-[6%] w-[42vw] h-[48vh] rounded-full bg-orange/15 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[-15%] left-[8%] w-[38vw] h-[44vh] rounded-full bg-orange/10 blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
        {/* Heading */}
        <div className="max-w-3xl">
          <p className="tc-animate ds-eyebrow text-orange mb-4">{coach.eyebrow}</p>
          <h2 className="tc-animate font-ragmarom leading-[0.95]" style={{ fontSize: 'clamp(2.6rem, 5vw, 5rem)' }}>
            {coach.title}
          </h2>
          <div className="tc-animate mt-6 h-1 rounded-full bg-orange w-16" />
          <p className="tc-animate font-heebo text-orange text-xl md:text-2xl mt-7 leading-relaxed">
            {coach.lead}
          </p>
          <p className="tc-animate font-heebo text-white/75 text-lg leading-relaxed mt-5">
            {coach.body}
          </p>
        </div>

        {/* Video + course card */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 md:gap-8 mt-14 items-stretch">
          {/* Explainer video (placeholder until coach.videoUrl is set) */}
          <div className="tc-animate">
            <div
              className="relative w-full h-full overflow-hidden rounded-2xl border border-white/10 shadow-xl shadow-black/30"
              style={{ aspectRatio: '16 / 9', background: '#000' }}
            >
              {coach.videoUrl ? (
                <iframe
                  src={coach.videoUrl}
                  title={coach.videoCaption}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  {coach.videoPoster && (
                    <img
                      src={coach.videoPoster}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6">
                    <div
                      className="flex items-center justify-center rounded-full bg-orange shadow-lg shadow-orange/40"
                      style={{ width: '4.5rem', height: '4.5rem' }}
                    >
                      <Play size={26} className="text-white ms-1" fill="white" />
                    </div>
                    <span className="font-heebo text-white/85 text-base font-medium">{coach.videoCaption}</span>
                    <span className="font-heebo text-white/50 text-sm">סרטון בקרוב</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Next course card */}
          <div className="tc-animate">
            <div className="h-full flex flex-col rounded-2xl border border-white/12 bg-white/[0.04] p-7 md:p-8">
              <p className="ds-eyebrow text-orange mb-3">{coach.course.eyebrow}</p>
              <h3 className="ds-card-title text-white">{coach.course.title}</h3>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 font-heebo text-white/80">
                  <Calendar size={18} className="text-orange shrink-0" />
                  <span>{coach.course.date}</span>
                </div>
                <div className="flex items-center gap-3 font-heebo text-white/80">
                  <MapPin size={18} className="text-orange shrink-0" />
                  <span>{coach.course.location}</span>
                </div>
              </div>

              <p className="font-heebo text-white/60 text-sm leading-relaxed mt-5 flex-1">
                {coach.course.note}
              </p>

              <Button
                variant="primary"
                className="mt-7 w-full"
                icon={ChevronLeft}
                onClick={() => onRegister?.('מאמן/ת')}
              >
                {coach.course.cta}
              </Button>
            </div>
          </div>
        </div>

        {/* Entry-process step timeline */}
        <div className="mt-20">
          <h3 className="tc-animate font-ragmarom text-white text-center" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
            {coach.stepsTitle}
          </h3>

          <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {/* Connector line (desktop) */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-7 right-[12.5%] left-[12.5%] h-px bg-white/15"
            />
            {coach.steps.map((step) => (
              <li key={step.n} className="tc-animate relative flex flex-col items-center text-center">
                <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-navy border-2 border-orange">
                  <span className="font-ragmarom text-orange text-xl">{step.n}</span>
                </div>
                <h4 className="font-heebo font-bold text-white text-lg mt-5">{step.title}</h4>
                <p className="font-heebo text-white/60 text-sm leading-relaxed mt-2 max-w-[15rem]">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Section CTA */}
        <div className="tc-animate text-center mt-16">
          <p className="font-ragmarom text-white text-2xl md:text-3xl mb-6">{coach.cta}</p>
          <Button variant="primary" size="lg" icon={ChevronLeft} glow onClick={() => onRegister?.('מאמן/ת')}>
            השאירו פרטים
          </Button>
        </div>
      </div>
    </section>
  )
}
