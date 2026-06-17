import { useEffect, useState } from 'react'
import { ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { gallery } from '../../data/academyData'
import { MuseumSection, MuseumHeading } from './shared'
import useReveal from '../../hooks/useReveal'

/**
 * Museum gallery — an even, matted/framed grid (no bento), generous gaps.
 * Keeps the lightbox (Escape / arrow nav).
 */
export default function AcademyGallery() {
  const ref = useReveal({ selector: '.lg-animate', y: 28, stagger: 0.07, duration: 1, start: 'top 84%' })

  const shots = gallery.filter((g) => g.src)
  const [index, setIndex] = useState(null)

  const close = () => setIndex(null)
  const next = () => setIndex((i) => (i + 1) % shots.length)
  const prev = () => setIndex((i) => (i - 1 + shots.length) % shots.length)

  useEffect(() => {
    if (index === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') next()
      if (e.key === 'ArrowRight') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, shots.length])

  return (
    <MuseumSection id="academy-gallery" watermark flip>
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <MuseumHeading kicker="מהשטח" title="גלריה" animateClass="lg-animate" />

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
          {gallery.map((img) => {
            const shotIndex = shots.findIndex((s) => s.id === img.id)
            return (
              <button
                key={img.id}
                onClick={() => shotIndex >= 0 && setIndex(shotIndex)}
                className={`lg-animate group relative overflow-hidden aspect-[4/5] bg-navy/[0.04] border border-navy/12 p-2 ${
                  img.src
                    ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 focus-visible:ring-offset-2'
                    : 'cursor-default'
                }`}
              >
                {img.src ? (
                  <span className="block relative w-full h-full overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </span>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <ImageIcon size={26} className="text-navy/20" strokeWidth={1.5} />
                    <span className="font-heebo text-navy/25 text-xs">תמונה בקרוב</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      {index !== null && shots[index] && (
        <div
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-[fadeIn_0.2s_ease-out]"
          style={{ background: 'rgba(8,8,12,0.92)' }}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            aria-label="סגור"
            className="absolute top-6 left-6 text-white/80 hover:text-white rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X size={28} />
          </button>

          {shots.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                aria-label="הבא"
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronRight size={26} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                aria-label="הקודם"
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronLeft size={26} />
              </button>
            </>
          )}

          <img
            src={shots[index].src}
            alt={shots[index].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[85vh] object-contain"
          />

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-heebo text-white/70 text-sm tabular-nums" dir="ltr">
            {index + 1} / {shots.length}
          </span>
        </div>
      )}
    </MuseumSection>
  )
}
