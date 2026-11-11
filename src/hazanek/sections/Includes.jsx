import { Home, Flame, BadgeCheck } from 'lucide-react'
import useReveal from '../../hooks/useReveal'
import { includes } from '../content'
import { Heading } from '../shared'

const ICONS = { home: Home, shabbat: Flame, free: BadgeCheck }

// Desktop bento: physical prep is the anchor tile (2×2), the rest wrap around it.
const SPANS = {
  physical: 'lg:col-span-2 lg:row-span-2 h-[420px] lg:h-auto',
  mental: 'sm:col-span-2 h-[340px]',
  leadership: 'h-[340px]',
  field: 'h-[340px]',
}

/** What the six weeks hold: four photo tiles, then the three plain facts. */
export default function Includes() {
  const ref = useReveal({ selector: '.rv', y: 48, stagger: 0.09 })

  return (
    <section ref={ref} id="includes" dir="rtl" className="relative w-full overflow-hidden bg-surface-2">
      <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 py-20 md:py-32">
        <Heading kicker={includes.kicker} title={includes.title} />

        <ul className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {includes.featured.map((item) => (
            <li
              key={item.id}
              className={`rv group relative rounded-[2rem] overflow-hidden bg-navy ${SPANS[item.id]} ${item.id === 'physical' ? 'sm:col-span-2' : ''}`}
            >
              <img
                src={item.image}
                alt={item.imageAlt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-brand group-hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <h3 className="ds-card-title text-white" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}>
                  {item.title}
                </h3>
                <p className="mt-2 font-heebo text-white/85 leading-relaxed max-w-md" style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)' }}>
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <ul className="mt-4 md:mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {includes.facts.map((f) => {
            const Icon = ICONS[f.icon]
            return (
              <li
                key={f.id}
                className={`rv rounded-[2rem] p-7 md:p-8 flex items-start gap-5 ${
                  f.highlight
                    ? 'bg-orange text-navy shadow-[0_24px_60px_-20px_rgba(255,135,20,0.55)]'
                    : 'bg-white border border-navy/[0.08] shadow-[0_1px_2px_rgba(0,0,30,0.04),0_8px_24px_rgba(0,0,30,0.05)]'
                }`}
              >
                <span
                  className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${
                    f.highlight ? 'bg-navy text-orange' : 'bg-orange/10 text-orange-ink'
                  }`}
                >
                  <Icon size={22} strokeWidth={2.2} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-heebo font-extrabold text-xl leading-tight text-navy">{f.title}</h3>
                  <p className={`mt-1.5 font-heebo leading-relaxed ${f.highlight ? 'text-navy/85 font-medium' : 'text-navy/65'}`}>
                    {f.text}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
