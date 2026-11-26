import { useMemo, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import Button from '../../components/ui/Button'
import { GUY, audience, come, offer } from '../content'
import { Title, WRAP, WhatsAppIcon, focusRing, useSectionMotion } from '../shared'

const BASE = 'היי גיא, יש לנו קבוצה ונשמח לבנות יחד יום בדרך ריף.'

/**
 * What a group can do here and who it is for — as a working tool, not a
 * catalogue. Pick the kinds of day that interest you and who you are; the
 * message to גיא is written for you as you choose. Choosing is optional:
 * with nothing picked the button still opens the same conversation.
 */
export default function Offer() {
  const ref = useRef(null)
  useSectionMotion(ref)
  const [formats, setFormats] = useState([])
  const [who, setWho] = useState('')

  const toggle = (name) => setFormats((f) => (f.includes(name) ? f.filter((x) => x !== name) : [...f, name]))

  const href = useMemo(() => {
    const lines = [BASE]
    if (who) lines.push(`אנחנו: ${who}`)
    if (formats.length) lines.push(`מה מעניין אותנו: ${formats.join(', ')}`)
    return `https://wa.me/${GUY.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`
  }, [formats, who])

  const picked = [who, ...formats].filter(Boolean)

  return (
    <section ref={ref} id="offer" dir="rtl" aria-labelledby="offer-title" className="relative w-full bg-wheat scroll-mt-16">
      <div className={`${WRAP} py-24 md:py-36`}>
        <Title id="offer-title" title={offer.title} accent className="max-w-4xl" />

        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-12 lg:gap-14">
          <div className="space-y-16">
            {/* formats: plots you can sow */}
            <fieldset>
              <legend className="font-ragmarom text-navy leading-none" style={{ fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)' }}>
                {offer.kicker}
              </legend>
              <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 md:gap-x-10 border-t border-navy/20 md:border-t-0">
                {offer.items.map((item, i) => {
                  const on = formats.includes(item.name)
                  return (
                    <li key={item.name} className={`rv border-b border-navy/20 ${i < 2 ? 'md:border-t' : ''}`}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(item.name)}
                        className={`group relative flex w-full items-start gap-4 overflow-hidden px-1 md:px-3 py-5 text-right ${focusRing}`}
                      >
                        <span aria-hidden="true" className="rf-sow absolute inset-0" data-on={on} style={{ '--plot': '#ffd9b0', '--ang': `${[0, 90, 35, -30, 60, -60, 15][i % 7]}deg` }} />
                        <span
                          aria-hidden="true"
                          className={`relative mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors duration-300 ${
                            on ? 'border-navy bg-navy text-white' : 'border-navy/40 text-transparent group-hover:border-navy'
                          }`}
                        >
                          <Check size={14} strokeWidth={3} />
                        </span>
                        <span className="relative">
                          <span className="block font-heebo font-extrabold text-navy leading-tight" style={{ fontSize: 'clamp(1.2rem, 1.5vw, 1.4rem)' }}>
                            {item.name}
                          </span>
                          <span className="mt-1 block font-heebo text-navy/80 leading-relaxed text-[0.98rem]">{item.text}</span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </fieldset>

            {/* who you are: one plot */}
            <fieldset>
              <legend className="font-ragmarom text-navy leading-none" style={{ fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)' }}>
                {audience.kicker}
              </legend>
              <p className="rv mt-3 font-heebo font-medium text-navy/80" style={{ fontSize: 'clamp(1.05rem, 1.25vw, 1.2rem)' }}>
                {audience.title}
              </p>
              <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 md:gap-x-10 border-t border-navy/20 md:border-t-0">
                {audience.items.map((item, i) => {
                  const on = who === item.name
                  return (
                    <li key={item.name} className={`rv border-b border-navy/20 ${i < 2 ? 'md:border-t' : ''}`}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => setWho(on ? '' : item.name)}
                        className={`group relative flex w-full items-baseline justify-between gap-4 overflow-hidden px-1 md:px-3 py-4 text-right ${focusRing}`}
                      >
                        <span aria-hidden="true" className="rf-sow absolute inset-0" data-on={on} style={{ '--plot': '#c9d3a3', '--ang': `${[90, 0, -40, 50, 20, -70][i % 6]}deg` }} />
                        <span className="relative flex items-center gap-3">
                          <span
                            aria-hidden="true"
                            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors duration-300 ${
                              on ? 'border-valley bg-valley' : 'border-navy/40 group-hover:border-navy'
                            }`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full bg-white transition-opacity ${on ? 'opacity-100' : 'opacity-0'}`} />
                          </span>
                          <span className="font-ragmarom text-navy leading-none" style={{ fontSize: 'clamp(1.45rem, 1.9vw, 1.8rem)' }}>{item.name}</span>
                        </span>
                        <span className="relative text-left font-heebo text-[0.92rem] leading-snug text-navy/80">{item.text}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </fieldset>
          </div>

          {/* the day you are building, on a navy ground band, and the one person to build it with */}
          <aside id="come" aria-labelledby="come-title" className="relative -mx-5 sm:-mx-8 md:mx-0 bg-navy text-white md:rounded-[1.75rem] scroll-mt-20">
            <div aria-hidden="true" className="rf-furrows pointer-events-none absolute inset-0 opacity-[0.06] md:rounded-[1.75rem]" />
            <div className="relative px-5 sm:px-8 py-10 md:p-9 lg:sticky lg:top-24">
              <h3 id="come-title" className="font-ragmarom leading-[0.98]" style={{ fontSize: 'clamp(1.9rem, 2.7vw, 2.6rem)' }}>
                <span className="block">{come.title[0]}</span>
                <span className="block text-orange">{come.title[1]}</span>
              </h3>
              <div className="mt-5 space-y-2">
                {come.paragraphs.map((p) => (
                  <p key={p} className="font-heebo text-white/85 leading-relaxed">{p}</p>
                ))}
              </div>

              <div className="mt-6 min-h-[2.5rem]" aria-live="polite">
                {picked.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5" aria-label="מה בחרתם">
                    {picked.map((p) => (
                      <li key={p} className="cat-panel-body rounded-full bg-white/12 px-3 py-1 font-heebo text-sm font-semibold text-white">
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6">
                <Button href={href} target="_blank" rel="noopener noreferrer" size="lg" icon={WhatsAppIcon} className="w-full">
                  {come.cta}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
