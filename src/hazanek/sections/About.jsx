import useReveal from '../../hooks/useReveal'
import { about } from '../content'
import { Heading, LightAtmosphere } from '../shared'

/** Light editorial (Mode C): the story on the right, the home base on the left. */
export default function About() {
  const ref = useReveal({ selector: '.rv', y: 48, stagger: 0.1 })

  return (
    <section ref={ref} id="about" dir="rtl" className="relative w-full overflow-hidden bg-surface">
      <LightAtmosphere />
      <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-20 items-center">
          <div>
            <Heading kicker={about.kicker} title={about.title} />
            <div className="mt-9 space-y-5 max-w-xl">
              {about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`rv font-heebo leading-relaxed ${i === 0 ? 'text-navy font-medium' : 'text-navy/70'}`}
                  style={{ fontSize: i === 0 ? 'clamp(1.15rem, 1.5vw, 1.4rem)' : 'clamp(1rem, 1.15vw, 1.15rem)' }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          <figure className="rv relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,30,0.18)] ring-1 ring-black/5 aspect-[4/3]">
              <img
                src={about.image}
                alt={about.imageAlt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <figcaption className="absolute bottom-4 right-4 md:bottom-6 md:right-6 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-xs md:text-sm font-semibold text-navy shadow-[0_8px_24px_rgba(0,0,30,0.12)]">
              {about.imageCaption}
            </figcaption>
          </figure>
        </div>

        {/* Partners */}
        <div className="rv mt-16 md:mt-24 pt-10 border-t border-navy/10 flex flex-col md:flex-row md:items-center gap-8 md:gap-14">
          <p className="ds-eyebrow text-navy/55 shrink-0">בשותפות מלאה עם</p>
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
            {about.partners.map((p) => (
              <li key={p.name} className="flex items-center gap-3.5">
                <img src={p.logo} alt="" loading="lazy" className="h-12 md:h-14 w-auto object-contain" />
                <span className="font-heebo font-semibold text-navy/80 text-sm md:text-base">{p.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
