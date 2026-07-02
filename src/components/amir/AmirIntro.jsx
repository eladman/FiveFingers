import { MuseumSection, MuseumHeading } from '../academy/shared'
import useReveal from '../../hooks/useReveal'
import { STAGE, BIO_PARAGRAPH, STATS } from '../../data/amirData'

/**
 * "מי זה עמיר?" — light editorial intro. Tall portrait card (stage/microphone
 * shot) beside the identity bullets and a row of credibility stat chips.
 * Museum layout, shared atmosphere, RagMarom heading — same family as the
 * program pages.
 */
export default function AmirIntro() {
  const ref = useReveal({ selector: '.intro-animate', y: 30, stagger: 0.08, duration: 1, start: 'top 82%' })

  return (
    <MuseumSection id="amir-about" bg="white" flip>
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <MuseumHeading
          title="מי זה עמיר?"
          align="start"
          animateClass="intro-animate"
        />

        <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Portrait card — landscape on mobile, tall on desktop */}
          <div className="intro-animate relative lg:order-1">
            <div className="group relative overflow-hidden rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,30,0.18)] ring-1 ring-navy/[0.06]">
              <img
                src={STAGE.src}
                width={STAGE.w}
                height={STAGE.h}
                alt="עמיר מנחם על הבמה, מרצה"
                loading="lazy"
                className="w-full h-auto object-cover object-top transition-transform duration-[600ms] ease-brand group-hover:scale-105 aspect-[3/2] lg:aspect-[4/5]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent" />
            </div>
          </div>

          {/* Bio + stats */}
          <div className="text-right lg:order-2">
            <p className="intro-animate font-ragmarom text-navy leading-snug" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)' }}>
              {BIO_PARAGRAPH}
            </p>

            <div className="intro-animate mt-10 flex flex-wrap gap-8 sm:gap-12">
              {STATS.map((s) => (
                <div key={s.label} className="border-s-2 border-orange ps-4">
                  <div className="font-ragmarom text-navy leading-none" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
                    {s.value}
                  </div>
                  <div className="font-heebo text-navy/55 mt-1 leading-snug" style={{ fontSize: '0.82rem' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MuseumSection>
  )
}
