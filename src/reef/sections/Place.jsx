import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft, ChevronRight, Maximize2, MapPin } from 'lucide-react'
import { place } from '../content'
import { Title, WRAP, focusRing, reducedMotion, useSectionMotion } from '../shared'

const ZOOM = 2.1

/**
 * The place itself: the architectural rendering as something you walk
 * through. Its points, the tour bar and the list of spaces all steer one
 * camera — choose a space and the rendering travels in to it; step back out
 * to see the whole compound, which leans gently toward the cursor.
 */
export default function Place() {
  const ref = useRef(null)
  const tiltRef = useRef(null)
  useSectionMotion(ref)
  const [step, setStep] = useState(-1) // -1 = the whole compound
  const pins = place.pins
  const current = step >= 0 ? pins[step] : null

  const goTo = (i) => setStep(i)
  const next = () => setStep((s) => (s + 1 >= pins.length ? -1 : s + 1))
  const prev = () => setStep((s) => (s - 1 < -1 ? pins.length - 1 : s - 1))

  // lean toward the cursor while looking at the whole compound
  useEffect(() => {
    const el = tiltRef.current
    if (!el || reducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.9, ease: 'power3.out' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.9, ease: 'power3.out' })
    const onMove = (e) => {
      if (step >= 0) return
      const r = el.getBoundingClientRect()
      ry(((e.clientX - r.left) / r.width - 0.5) * 7)
      rx(-((e.clientY - r.top) / r.height - 0.5) * 6)
    }
    const onLeave = () => {
      rx(0)
      ry(0)
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    if (step >= 0) onLeave()
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [step])

  const s = current ? ZOOM : 1
  const tx = current ? 50 - current.x : 0
  const ty = current ? 50 - current.y : 0

  return (
    <section ref={ref} id="place" dir="rtl" aria-labelledby="place-title" className="relative w-full overflow-hidden bg-wheat scroll-mt-16">
      <div className={`${WRAP} py-24 md:py-36`}>
        <Title id="place-title" title={place.title} size="md" className="max-w-4xl" />

        <figure className="rv mt-12 md:mt-16" style={{ perspective: '1600px' }}>
          <div ref={tiltRef} className="relative will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
            <div className="relative overflow-hidden rounded-[1.75rem] aspect-[4/3] md:aspect-[16/10] bg-surface-2 shadow-[0_50px_110px_-30px_rgba(8,16,40,0.45)]">
              <div
                className="pl-world absolute inset-0"
                style={{
                  '--s': s,
                  transform: `scale(${s}) translate(${tx}%, ${ty}%)`,
                }}
              >
                <img src={place.image} alt={place.imageAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                {pins.map((pin, i) => (
                  <button
                    key={pin.id}
                    type="button"
                    className="rf-pin pl-pin"
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    aria-pressed={step === i}
                    aria-label={pin.name}
                    onClick={() => goTo(step === i ? -1 : i)}
                  >
                    <span className="rf-pin-dot" aria-hidden="true">{i + 1}</span>
                  </button>
                ))}
              </div>
              {/* the edge darkens a little while we are inside the compound */}
              <div aria-hidden="true" className="pl-vignette pointer-events-none absolute inset-0" data-on={Boolean(current)} />
            </div>

            {/* the tour */}
            <div className="relative z-10 mx-3 -mt-10 md:mx-auto md:-mt-14 md:w-[min(760px,88%)] rounded-[1.4rem] bg-white p-3 md:p-3.5 shadow-[0_24px_60px_-20px_rgba(8,16,40,0.35)]">
              <div className="flex flex-wrap items-center gap-3 md:flex-nowrap md:gap-4">
                <button type="button" onClick={prev} aria-label="התחנה הקודמת" className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface-2 text-navy transition-colors hover:bg-navy hover:text-white ${focusRing}`}>
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
                <div aria-live="polite" className="order-first basis-full px-1 md:order-none md:basis-auto md:min-w-0 md:flex-1 md:px-0">
                  <p className="flex items-center gap-2 font-heebo text-[0.8rem] font-semibold text-valley">
                    <MapPin size={14} aria-hidden="true" />
                    <span>{place.tourLabel}</span>
                    <span className="flex items-center gap-1" aria-hidden="true">
                      {pins.map((p, i) => (
                        <span key={p.id} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-5 bg-orange' : 'w-1.5 bg-navy/20'}`} />
                      ))}
                    </span>
                  </p>
                  <div key={step} className="cat-panel-body mt-0.5">
                    {current ? (
                      <p className="font-heebo text-navy leading-snug">
                        <span className="font-bold">{current.name}</span>
                        <span className="text-navy/70"> · {current.text}</span>
                      </p>
                    ) : (
                      <p className="font-heebo text-navy/70 leading-snug">{place.imageAlt}</p>
                    )}
                  </div>
                </div>
                {current && (
                  <button type="button" onClick={() => goTo(-1)} aria-label="חזרה לתמונה המלאה" className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface-2 text-navy transition-colors hover:bg-navy hover:text-white ${focusRing}`}>
                    <Maximize2 size={17} aria-hidden="true" />
                  </button>
                )}
                <span aria-hidden="true" className="flex-1 md:hidden" />
                <button type="button" onClick={next} aria-label="התחנה הבאה" className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-orange text-navy-deep transition-transform hover:scale-105 active:scale-95 ${focusRing}`}>
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </figure>

        <ul className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
          {place.spaces.map((space) => {
            const pinIndex = pins.findIndex((p) => p.id === space.pin)
            const on = pinIndex >= 0 && pinIndex === step
            const body = (
              <>
                <h3 className="flex items-center gap-2.5 font-heebo font-bold text-navy leading-tight" style={{ fontSize: 'clamp(1.2rem, 1.5vw, 1.45rem)' }}>
                  {pinIndex >= 0 && (
                    <span aria-hidden="true" className={`grid h-6 w-6 place-items-center rounded-full text-[12px] font-extrabold transition-colors ${on ? 'bg-orange text-navy-deep' : 'bg-navy text-white'}`}>
                      {pinIndex + 1}
                    </span>
                  )}
                  {space.name}
                </h3>
                <p className="mt-1.5 font-heebo text-navy/75 leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.1vw, 1.1rem)' }}>
                  {space.text}
                </p>
              </>
            )
            return (
              <li key={space.name} className="rv border-t border-navy/15">
                {pinIndex >= 0 ? (
                  <button
                    type="button"
                    onClick={() => {
                      goTo(pinIndex)
                      tiltRef.current?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'center' })
                    }}
                    aria-pressed={on}
                    className={`group w-full py-6 text-right transition-colors ${focusRing} rounded-lg`}
                  >
                    {body}
                  </button>
                ) : (
                  <div className="py-6">{body}</div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
