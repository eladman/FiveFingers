import { useState } from 'react'
import useReveal from '../../hooks/useReveal'
import { place } from '../content'
import { Head, WRAP } from '../shared'

/**
 * The place itself: the rendering, large, with three points you can touch,
 * and beside it the six spaces as a walk-through list. Points and list rows
 * that describe the same space light up together.
 */
export default function Place() {
  const ref = useReveal({ selector: '.rv', y: 40, stagger: 0.07 })
  const [active, setActive] = useState(place.pins[0].id)
  const current = place.pins.find((p) => p.id === active) || place.pins[0]

  return (
    <section ref={ref} id="place" dir="rtl" className="relative w-full overflow-hidden bg-surface scroll-mt-16">
      <div className={`${WRAP} py-20 md:py-32`}>
        <Head kicker={place.kicker} title={place.title} long className="max-w-4xl" />

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-16 items-start">
          <figure className="rv">
            <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] bg-surface-2 ring-1 ring-black/5 shadow-[0_40px_100px_rgba(0,0,30,0.16)]">
              <img
                src={place.image}
                alt={place.imageAlt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {place.pins.map((pin, i) => (
                <button
                  key={pin.id}
                  type="button"
                  className="rf-pin"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  aria-pressed={active === pin.id}
                  aria-label={pin.name}
                  onClick={() => setActive(pin.id)}
                  onMouseEnter={() => setActive(pin.id)}
                >
                  <span className="rf-pin-dot" aria-hidden="true">{i + 1}</span>
                </button>
              ))}
            </div>
            {/* the explanation for the selected point */}
            <figcaption aria-live="polite" className="mt-5 flex items-start gap-3.5 min-h-[4.5rem]">
              <span className="mt-0.5 grid place-items-center shrink-0 w-7 h-7 rounded-full bg-orange text-navy-deep font-heebo font-extrabold text-[13px]" aria-hidden="true">
                {place.pins.indexOf(current) + 1}
              </span>
              <span key={current.id} className="cat-panel-body block">
                <span className="block font-heebo font-bold text-navy text-lg leading-tight">{current.name}</span>
                <span className="block mt-1 font-heebo text-navy/70 leading-relaxed">{current.text}</span>
              </span>
            </figcaption>
          </figure>

          <div>
            <p className="rv ds-eyebrow text-navy/65 mb-2">{place.tourLabel}</p>
            <ol>
              {place.spaces.map((space, i) => {
                const on = space.pin && space.pin === active
                return (
                  <li
                    key={space.name}
                    className="rv flex gap-5 border-b border-navy/10 py-5 md:py-6"
                    onMouseEnter={space.pin ? () => setActive(space.pin) : undefined}
                  >
                    <span
                      className={`font-mono text-sm tabular-nums pt-1.5 transition-colors duration-300 ${on ? 'text-orange-ink' : 'text-navy/40'}`}
                      aria-hidden="true"
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-heebo font-bold text-navy leading-tight" style={{ fontSize: 'clamp(1.25rem, 1.6vw, 1.55rem)' }}>
                        {space.name}
                      </h3>
                      <p className="mt-1.5 font-heebo text-navy/70 leading-relaxed" style={{ fontSize: 'clamp(0.98rem, 1.1vw, 1.1rem)' }}>
                        {space.text}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
