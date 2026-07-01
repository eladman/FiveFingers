import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '../../data/academyData'
import { MuseumSection } from './shared'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

/**
 * Cinematic pull-quotes — one large quote at a time, with prev/next and a
 * pausable auto-advance (paused on hover/focus and under reduced-motion).
 */
export default function AcademyTestimonials() {
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = testimonials.length

  const go = (i) => setActive(((i % n) + n) % n)

  useEffect(() => {
    if (paused || reduced) return
    const id = setInterval(() => setActive((a) => (a + 1) % n), 7000)
    return () => clearInterval(id)
  }, [paused, reduced, n])

  const t = testimonials[active]

  return (
    <MuseumSection id="academy-testimonials" frame>
      <div
        className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-28 md:py-40 text-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <p className="ds-eyebrow text-orange-ink mb-10">
          עדויות
        </p>

        {/* Quote — crossfades on change via keyed remount */}
        <blockquote key={t.id} className="animate-[fadeIn_0.5s_ease-out]">
          <span aria-hidden="true" className="block font-ragmarom text-orange/30 leading-none mb-2" style={{ fontSize: '4rem' }}>
            ״
          </span>
          <p
            className="font-ragmarom text-navy leading-[1.3] mx-auto max-w-3xl"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.6rem)' }}
          >
            {t.quote}
          </p>
          <footer className="mt-10">
            <div className="font-heebo font-bold text-navy">{t.name}</div>
            <div className="font-heebo text-orange-ink text-sm mt-1">{t.role}</div>
          </footer>
        </blockquote>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5 mt-12">
          <button
            onClick={() => go(active + 1)}
            aria-label="העדות הבאה"
            className="flex items-center justify-center w-11 h-11 rounded-full border border-navy/20 text-navy hover:border-navy/60 hover:bg-navy/[0.03] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40"
          >
            <ChevronRight size={20} />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="בחירת עדות">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={i === active}
                aria-label={`עדות ${i + 1}`}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 ${
                  i === active ? 'w-7 bg-orange' : 'w-2 bg-navy/20 hover:bg-navy/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(active - 1)}
            aria-label="העדות הקודמת"
            className="flex items-center justify-center w-11 h-11 rounded-full border border-navy/20 text-navy hover:border-navy/60 hover:bg-navy/[0.03] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
      </div>
    </MuseumSection>
  )
}
