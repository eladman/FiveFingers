import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ImageIcon, X } from 'lucide-react'
import { gallery } from '../../data/liabahData'
import { SectionBg, SectionHeading } from './shared'

gsap.registerPlugin(ScrollTrigger)

export default function LiabahGallery() {
  const ref = useRef(null)
  const [lightbox, setLightbox] = useState(null) // src of image being viewed

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.lg-animate', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.08, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null) }
    if (lightbox) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <section
      id="liabah-gallery"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#fafaf8]"
    >
      <SectionBg flip />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading title="גלריה" subtitle="רגעים מהשטח" animateClass="lg-animate" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pb-24">
          {gallery.map((img) => (
            <button
              key={img.id}
              onClick={() => img.src && setLightbox(img.src)}
              className={`lg-animate relative aspect-[4/3] overflow-hidden rounded-xl bg-[#000032]/[0.06] ${
                img.src ? 'cursor-pointer group' : 'cursor-default'
              }`}
            >
              {img.src ? (
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <ImageIcon size={28} className="text-[#000032]/20" strokeWidth={1.5} />
                  <span className="font-heebo text-[#000032]/25 text-xs">תמונה בקרוב</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.85)' }}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="סגור"
            className="absolute top-6 left-6 text-white/80 hover:text-white"
          >
            <X size={28} />
          </button>
          <img src={lightbox} alt="" className="max-w-full max-h-full rounded-lg object-contain" />
        </div>
      )}
    </section>
  )
}
