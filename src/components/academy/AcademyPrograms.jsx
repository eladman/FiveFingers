import { useRef, useState } from 'react'
import { ChevronLeft, Check, ImageIcon } from 'lucide-react'
import { programs } from '../../data/academyData'
import { MuseumSection, MuseumHeading, PrimaryButton } from './shared'
import useReveal from '../../hooks/useReveal'

// Signature parallelogram frame (shared with the home Programs section).
const CLIP_EVEN = 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)'
const CLIP_ODD = 'polygon(0% 0%, 94% 0%, 100% 100%, 6% 100%)'

/**
 * Program "tracks" as an institutional comparison selector: a segmented tablist
 * (מכינה / הזנק / כרמל) that swaps a detail panel, plus a compact comparison row.
 * Keyboard-accessible (roving tabindex + arrow keys, RTL-aware).
 */
export default function AcademyPrograms({ onRegister }) {
  const ref = useReveal({ selector: '.pr-animate', y: 28, stagger: 0.08, duration: 1, start: 'top 82%' })
  const [active, setActive] = useState(0)
  const tabRefs = useRef([])
  const prog = programs[active]

  const onKeyDown = (e) => {
    // RTL: ArrowLeft → next, ArrowRight → previous
    let next = null
    if (e.key === 'ArrowLeft') next = (active + 1) % programs.length
    if (e.key === 'ArrowRight') next = (active - 1 + programs.length) % programs.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = programs.length - 1
    if (next !== null) {
      e.preventDefault()
      setActive(next)
      tabRefs.current[next]?.focus()
    }
  }

  return (
    <MuseumSection id="academy-programs" bg="surface-2">
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <MuseumHeading
          kicker="המסלולים"
          title="בחרו את המסלול"
          lead="שלושה מסלולים, סטנדרט אחד של מצוינות."
          animateClass="pr-animate"
        />

        {/* Segmented tablist */}
        <div
          role="tablist"
          aria-label="מסלולי המכינה"
          className="pr-animate mt-14 inline-flex w-full md:w-auto mx-auto justify-center rounded-full border border-navy/15 p-1.5 bg-white"
          onKeyDown={onKeyDown}
        >
          {programs.map((p, i) => {
            const selected = i === active
            return (
              <button
                key={p.id}
                ref={(el) => (tabRefs.current[i] = el)}
                role="tab"
                id={`prog-tab-${p.id}`}
                aria-selected={selected}
                aria-controls={`prog-panel-${p.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`relative flex-1 md:flex-none min-h-[44px] px-5 md:px-8 py-2.5 rounded-full font-heebo font-semibold text-sm md:text-base transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 ${
                  selected ? 'bg-navy text-white' : 'text-navy/60 hover:text-navy'
                }`}
              >
                {p.tab}
              </button>
            )
          })}
        </div>

        {/* Detail panel */}
        <div
          role="tabpanel"
          id={`prog-panel-${prog.id}`}
          aria-labelledby={`prog-tab-${prog.id}`}
          key={prog.id}
          className="mt-12 animate-[fadeIn_0.35s_ease-out]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-start">
            {/* Left (RTL: right) — narrative */}
            <div className="text-right">
              <h3
                className="font-ragmarom text-navy leading-tight"
                style={{ fontSize: 'clamp(2rem, 3.4vw, 3.2rem)' }}
              >
                {prog.title}
              </h3>
              <p className="font-heebo text-orange-ink font-semibold mt-2" style={{ fontSize: '1rem' }}>
                {prog.ages}
              </p>
              <p className="font-heebo text-navy/65 leading-relaxed mt-6" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.18rem)' }}>
                {prog.description}
              </p>
              <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {prog.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2.5 font-heebo text-navy/75" style={{ fontSize: '0.98rem' }}>
                    <Check size={17} className="text-orange shrink-0" strokeWidth={2.5} />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <PrimaryButton onClick={() => onRegister?.(prog.contactTag)} icon={ChevronLeft}>
                  להגשת מועמדות
                </PrimaryButton>
              </div>
            </div>

            {/* Right (RTL: left) — signature parallelogram photo + spec sheet */}
            <div className="flex flex-col gap-8">
              <ProgramFrame even={active % 2 === 0} src={prog.imageSrc} alt={prog.title} />
              <dl className="border-t border-navy/12">
                <SpecRow term="משך" value={prog.duration} />
                <SpecRow term="מיקוד" value={prog.focus} />
                <SpecRow term="למי מתאים" value={prog.forWhom} />
                <SpecRow term="תקופה" value={prog.ages} />
              </dl>
            </div>
          </div>
        </div>
      </div>
    </MuseumSection>
  )
}

function ProgramFrame({ even, src, alt }) {
  const clip = even ? CLIP_EVEN : CLIP_ODD
  return (
    <div className="relative">
      {/* Offset orange backing frame */}
      <div
        aria-hidden="true"
        className="absolute bg-orange"
        style={{ inset: 0, clipPath: clip, transform: even ? 'translate(14px, 14px)' : 'translate(-14px, 14px)' }}
      />
      <div className="relative aspect-[4/3] overflow-hidden bg-surface" style={{ clipPath: clip }}>
        {src ? (
          <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-navy/[0.05] flex flex-col items-center justify-center gap-3">
            <ImageIcon size={32} className="text-navy/20" strokeWidth={1.5} />
            <span className="font-heebo text-navy/25 text-sm">תמונה בקרוב</span>
          </div>
        )}
      </div>
    </div>
  )
}

function SpecRow({ term, value }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-4 border-b border-navy/12 text-right">
      <dt className="font-heebo font-semibold text-navy/45 text-sm whitespace-nowrap" style={{ letterSpacing: '0.06em' }}>
        {term}
      </dt>
      <dd className="font-heebo text-navy leading-snug">{value}</dd>
    </div>
  )
}
