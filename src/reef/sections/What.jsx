import { Compass, Dumbbell, HeartHandshake, MessagesSquare, Mountain, Users } from 'lucide-react'
import useReveal from '../../hooks/useReveal'
import { what } from '../content'
import { Head, Para, WRAP } from '../shared'

const ICONS = {
  body: Dumbbell,
  lead: Compass,
  content: MessagesSquare,
  challenge: Mountain,
  team: Users,
  action: HeartHandshake,
}

/** What the centre is: a short introduction, then the six things that happen here. */
export default function What() {
  const ref = useReveal({ selector: '.rv', y: 40, stagger: 0.07 })

  return (
    <section ref={ref} id="what" dir="rtl" className="relative w-full overflow-hidden bg-surface scroll-mt-16">
      <div className={`${WRAP} py-20 md:py-32`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
          <Head kicker={what.kicker} title={what.title} />
          <div className="space-y-5 max-w-xl lg:pt-12">
            <Para lead>{what.lead}</Para>
            {what.paragraphs.map((p, i) => (
              <Para key={i}>{p}</Para>
            ))}
          </div>
        </div>

        <ul className="mt-16 md:mt-24 grid grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-12">
          {what.pillars.map((p) => {
            const Icon = ICONS[p.key]
            return (
              <li key={p.key} className="rv border-t border-navy/10 py-7 md:py-10">
                <Icon size={24} strokeWidth={1.6} className="text-valley" aria-hidden="true" />
                <h3
                  className="mt-4 md:mt-5 font-ragmarom text-navy leading-none"
                  style={{ fontSize: 'clamp(2rem, 3.4vw, 3.4rem)' }}
                >
                  {p.name}
                </h3>
                <p className="mt-3 font-heebo text-navy/70 leading-relaxed max-w-[26ch]" style={{ fontSize: 'clamp(0.98rem, 1.1vw, 1.1rem)' }}>
                  {p.text}
                </p>
              </li>
            )
          })}
        </ul>

        <p
          className="rv mt-10 md:mt-16 flex flex-wrap justify-center gap-x-[0.35em] gap-y-1 font-ragmarom leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)' }}
        >
          {what.closing.map((word, i) => (
            <span key={word} className={['text-navy/30', 'text-navy/50', 'text-navy/75', 'text-orange-ink'][i]}>
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
