import useReveal from '../../hooks/useReveal'
import { story } from '../content'
import { Head, Para, WRAP } from '../shared'

/**
 * Who ריף was — told to explain why the place exists, not as a memorial.
 * One strong photograph (laughing, mid-wave), short text, one line that turns
 * the story forward.
 */
export default function Story() {
  const ref = useReveal({ selector: '.rv', y: 44, stagger: 0.09 })

  return (
    <section ref={ref} id="story" dir="rtl" className="relative w-full overflow-hidden bg-surface scroll-mt-16">
      <div className={`${WRAP} py-20 md:py-32`}>
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1fr] gap-12 lg:gap-24 items-center">
          <figure className="rv relative w-full max-w-[440px] mx-auto lg:mx-0">
            {/* a field-coloured block set behind the photo, off its corner */}
            <div aria-hidden="true" className="absolute -bottom-5 -left-5 md:-bottom-7 md:-left-7 w-2/3 h-2/3 rounded-[2rem] bg-wheat" />
            <div className="relative overflow-hidden rounded-[2rem] aspect-[7/8] ring-1 ring-black/5 shadow-[0_40px_100px_rgba(0,0,30,0.16)]">
              <img
                src={story.image}
                alt={story.imageAlt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </figure>

          <div>
            <Head kicker={story.kicker} title={story.title} />
            <div className="mt-9 space-y-5 max-w-xl">
              {story.paragraphs.map((p, i) => (
                <Para key={i} lead={i === 0}>{p}</Para>
              ))}
              <p
                className="rv font-heebo font-bold text-navy leading-snug pt-2"
                style={{ fontSize: 'clamp(1.2rem, 1.6vw, 1.5rem)' }}
              >
                {story.turn}
              </p>
            </div>
          </div>
        </div>

        <p
          className="rv mt-20 md:mt-32 text-center font-ragmarom text-navy leading-[0.98] tracking-tight"
          style={{ fontSize: 'clamp(2.5rem, 6.2vw, 6rem)' }}
        >
          <span className="block">{story.statement[0]}</span>
          <span className="block text-orange-ink">{story.statement[1]}</span>
        </p>
      </div>
    </section>
  )
}
