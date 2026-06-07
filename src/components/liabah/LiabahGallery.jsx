import { useEffect, useState } from 'react'
import { ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { gallery } from '../../data/liabahData'
import { SectionBg, SectionHeading } from './shared'
import useReveal from '../../hooks/useReveal'

// Bento spans (desktop): a big lead tile, then a varied rhythm.
const SPANS = [
  'md:col-span-2 md:row-span-2',
  '',
  '',
  'md:col-span-2',
  'md:col-span-2',
  'md:col-span-2',
]

export default function LiabahGallery() {
  const ref = useReveal({ selector: '.lg-animate', y: 40, stagger: 0.08, duration: 1, start: 'top 82%' })

  // Only real photos are navigable in the lightbox.
  const shots = gallery.filter((g) => g.src)
  const [index, setIndex] = useState(null) // index into `shots`

  const close = () => setIndex(null)
  const next = () => setIndex((i) => (i + 1) % shots.length)
  const prev = () => setIndex((i) => (i - 1 + shots.length) % shots.length)

  useEffect(() => {
    if (index === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') next()      // RTL: left = next
      if (e.key === 'ArrowRight') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, shots.length])

  return (
    <section
      id="liabah-gallery"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#fafaf8]"
    >
      <SectionBg flip />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading eyebrow="מהשטח" title="גלריה" subtitle="רגעים מהשטח" animateClass="lg-animate" />

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[190px] gap-3 md:gap-4 pb-24">
          {gallery.map((img, i) => {
            const span = i === 0 ? 'col-span-2 ' + SPANS[0] : SPANS[i] || ''
            const shotIndex = shots.findIndex((s) => s.id === img.id)
            return (
              <button
                key={img.id}
                onClick={() => shotIndex >= 0 && setIndex(shotIndex)}
                className={`lg-animate group relative overflow-hidden rounded-xl bg-[#000032]/[0.06] h-full ${span} ${
                  img.src
                    ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8714] focus-visible:ring-offset-2'
                    : 'cursor-default'
                }`}
              >
                {img.src ? (
                  <>
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#000032]/0 group-hover:bg-[#000032]/15 transition-colors duration-300" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <ImageIcon size={28} className="text-[#000032]/20" strokeWidth={1.5} />
                    <span className="font-heebo text-[#000032]/25 text-xs">תמונה בקרוב</span>
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
          style={{ background: 'rgba(0,0,0,0.9)' }}
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
            className="max-w-full max-h-[85vh] rounded-lg object-contain"
          />

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-heebo text-white/70 text-sm tabular-nums" dir="ltr">
            {index + 1} / {shots.length}
          </span>
        </div>
      )}
    </section>
  )
}
