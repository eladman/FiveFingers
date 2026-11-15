import { useEffect, useRef, useState } from 'react'
import { Home, Flame, BadgeCheck, Plus, X, Check } from 'lucide-react'
import useReveal from '../../hooks/useReveal'
import { includes } from '../content'
import { Heading, goToRegister } from '../shared'

const ICONS = { home: Home, shabbat: Flame, free: BadgeCheck }

// Desktop bento: physical prep is the anchor tile (2×2), the rest wrap around it.
const SPANS = {
  physical: 'sm:col-span-2 lg:col-span-2 lg:row-span-2 h-[420px] lg:h-auto',
  mental: 'sm:col-span-2 h-[340px]',
  leadership: 'h-[340px]',
  field: 'h-[340px]',
}

/** What the six weeks hold: four photo tiles (each opens a detail sheet), then the three plain facts. */
export default function Includes() {
  const ref = useReveal({ selector: '.rv', y: 48, stagger: 0.09 })
  const [openId, setOpenId] = useState(null)
  const openItem = includes.featured.find((i) => i.id === openId)

  return (
    <section ref={ref} id="includes" dir="rtl" className="relative w-full overflow-hidden bg-surface-2">
      <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 py-20 md:py-32">
        <Heading kicker={includes.kicker} title={includes.title} />

        <ul className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {includes.featured.map((item) => (
            <li key={item.id} className={`rv relative ${SPANS[item.id]}`}>
              <button
                type="button"
                onClick={() => setOpenId(item.id)}
                aria-haspopup="dialog"
                className="group absolute inset-0 w-full h-full text-right rounded-[2rem] overflow-hidden bg-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-surface-2"
              >
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-brand group-hover:scale-105"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                {/* Open affordance — testers expected these to open */}
                <span
                  aria-hidden="true"
                  className="absolute top-5 left-5 w-11 h-11 rounded-full bg-white/15 border border-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 ease-brand group-hover:bg-orange group-hover:border-orange group-hover:rotate-90"
                >
                  <Plus size={20} strokeWidth={2.5} />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-6 md:p-8 block">
                  <span className="block ds-card-title text-white" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}>
                    {item.title}
                  </span>
                  <span className="block mt-2 font-heebo text-white/85 leading-relaxed max-w-md" style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)' }}>
                    {item.text}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-heebo font-bold text-sm text-orange">
                    לפרטים נוספים
                    <span aria-hidden="true">←</span>
                  </span>
                </span>
              </button>
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

      <DetailSheet item={openItem} onClose={() => setOpenId(null)} />
    </section>
  )
}

/**
 * Native <dialog> (focus trap, Esc, inert background for free). Bottom sheet on
 * phones, centered panel from md up. A big photo with thumbnails to swap it,
 * then what actually happens, a graduate's line, and the way to the form.
 */
function DetailSheet({ item, onClose }) {
  const dialogRef = useRef(null)
  const [shot, setShot] = useState(0)

  useEffect(() => {
    const dlg = dialogRef.current
    if (!dlg) return
    if (item) {
      setShot(0)
      if (!dlg.open) dlg.showModal()
      document.documentElement.style.overflow = 'hidden'
    } else if (dlg.open) {
      dlg.close()
    }
    return () => { document.documentElement.style.overflow = '' }
  }, [item])

  const d = item?.details
  const gallery = d?.gallery ?? []
  const current = gallery[shot] ?? gallery[0]

  return (
    <dialog
      ref={dialogRef}
      dir="rtl"
      aria-labelledby="hz-sheet-title"
      onClose={onClose}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      className="hz-dialog p-0 m-0 md:m-auto bg-transparent max-w-none max-h-none w-full h-full md:h-auto md:w-[min(960px,92vw)]"
    >
      {item && d && (
        <div className="hz-sheet absolute md:relative inset-x-0 bottom-0 max-h-[92svh] md:max-h-[88vh] overflow-y-auto overscroll-contain rounded-t-[2rem] md:rounded-[2rem] bg-surface text-navy shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
          <div className="grid md:grid-cols-[1.05fr_1fr]">
            {/* Media */}
            <div className="relative bg-navy">
              <div className="relative h-[40svh] md:h-full md:min-h-[580px]">
                <img key={current?.src} src={current?.src} alt={current?.alt ?? ''} className="hz-sheet absolute inset-0 w-full h-full object-cover" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              {gallery.length > 1 && (
                <ul className="absolute bottom-4 inset-x-4 flex gap-2.5" aria-label="תמונות נוספות">
                  {gallery.map((g, i) => (
                    <li key={g.src}>
                      <button
                        type="button"
                        onClick={() => setShot(i)}
                        aria-label={`תמונה ${i + 1}: ${g.alt}`}
                        aria-current={i === shot ? 'true' : undefined}
                        className={`block w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden ring-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-orange ${
                          i === shot ? 'ring-orange scale-105' : 'ring-white/40 opacity-75 hover:opacity-100'
                        }`}
                      >
                        <img src={g.src} alt="" loading="lazy" className="w-full h-full object-cover" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Copy */}
            <div className="relative p-7 sm:p-9 md:p-10">
              <button
                type="button"
                onClick={onClose}
                aria-label="סגירה"
                className="absolute top-5 left-5 w-10 h-10 rounded-full bg-navy/[0.06] hover:bg-navy/[0.12] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
              >
                <X size={20} aria-hidden="true" />
              </button>
              <p className="ds-eyebrow text-orange-ink mb-3">{includes.kicker}</p>
              <h3 id="hz-sheet-title" className="font-ragmarom text-navy leading-none" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)' }}>
                {item.title}
              </h3>
              <p className="mt-5 font-heebo font-medium text-navy/85 leading-relaxed text-lg">{d.lead}</p>

              <ul className="mt-6 space-y-3.5">
                {d.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 font-heebo text-navy/75 leading-relaxed">
                    <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-orange/15 text-orange-ink flex items-center justify-center">
                      <Check size={13} strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {d.quote && (
                <figure className="mt-8 border-r-[3px] border-orange pr-4">
                  <blockquote className="font-heebo text-navy leading-relaxed">״{d.quote.text}״</blockquote>
                  <figcaption className="mt-2 text-sm font-semibold text-navy/55">{d.quote.name}</figcaption>
                </figure>
              )}

              <a
                href="#register"
                onClick={(e) => {
                  e.preventDefault()
                  dialogRef.current?.close() // fires onClose → parent clears the item
                  document.documentElement.style.overflow = ''
                  goToRegister(e)
                }}
                className="btn-cta mt-9 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white"
              >
                אני רוצה להירשם
                <span aria-hidden="true">←</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
