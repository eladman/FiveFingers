import useReveal from '../../hooks/useReveal'
import { values } from '../content'
import { Head, WRAP } from '../shared'

// Five pillars, rising — the hand in the movement's mark, in the valley's
// colours: wheat, soil, field, deep blue, and orange only at the top.
const PILLARS = [
  { h: '52%', w: '60%', cls: 'bg-wheat text-navy', num: 'text-navy/45' },
  { h: '64%', w: '70%', cls: 'bg-earth-soft text-navy', num: 'text-navy/50' },
  { h: '76%', w: '80%', cls: 'bg-valley text-white', num: 'text-white/60' },
  { h: '88%', w: '90%', cls: 'bg-navy text-white', num: 'text-white/55' },
  { h: '100%', w: '100%', cls: 'bg-orange text-navy-deep', num: 'text-navy-deep/60' },
]

/** The five values, shown as something that is built up — not as a bullet list. */
export default function Values() {
  const ref = useReveal({ selector: '.rv', y: 40, stagger: 0.08 })

  return (
    <section ref={ref} id="values" dir="rtl" className="relative w-full overflow-hidden bg-white scroll-mt-16">
      <div className={`${WRAP} py-20 md:py-32`}>
        <Head kicker={values.kicker} title={values.title} center />

        {/* md+: five columns rising toward the reading direction */}
        <ol className="hidden md:flex items-end gap-4 lg:gap-5 mt-16 lg:mt-20 h-[440px] lg:h-[500px]">
          {values.items.map((name, i) => (
            <li
              key={name}
              className={`rv flex-1 flex flex-col justify-between rounded-t-[1.75rem] rounded-b-xl px-5 lg:px-7 py-6 lg:py-7 ${PILLARS[i].cls}`}
              style={{ height: PILLARS[i].h }}
            >
              <span className={`font-mono text-sm tabular-nums ${PILLARS[i].num}`} aria-hidden="true">
                0{i + 1}
              </span>
              <span className="font-ragmarom leading-none" style={{ fontSize: 'clamp(1.9rem, 3.2vw, 3.3rem)' }}>
                {name}
              </span>
            </li>
          ))}
        </ol>

        {/* phones: the same five, as steps that widen */}
        <ol className="md:hidden mt-12 space-y-2.5">
          {values.items.map((name, i) => (
            <li
              key={name}
              className={`rv flex items-center justify-between rounded-2xl px-5 h-[68px] ${PILLARS[i].cls}`}
              style={{ width: PILLARS[i].w }}
            >
              <span className="font-ragmarom text-[2rem] leading-none">{name}</span>
              <span className={`font-mono text-xs tabular-nums ${PILLARS[i].num}`} aria-hidden="true">
                0{i + 1}
              </span>
            </li>
          ))}
        </ol>

        <p
          className="rv mt-12 md:mt-16 mx-auto max-w-3xl text-center font-heebo font-medium text-navy leading-relaxed"
          style={{ fontSize: 'clamp(1.15rem, 1.6vw, 1.5rem)' }}
        >
          {values.text}
        </p>
      </div>
    </section>
  )
}
