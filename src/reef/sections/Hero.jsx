import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, MapPin } from 'lucide-react'
import Button from '../../components/ui/Button'
import { hero } from '../content'
import { OutlineLink } from '../shared'

gsap.registerPlugin(ScrollTrigger)

const POSTER = '/reef/valley-poster.webp'
// the poster's own size, and where the place's marker sits in it (fractions)
const POSTER_SIZE = [1585, 1000]
const POSTER_MARK = [0.5005, 0.6293]

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * The way, in 3D. A three.js Jezreel Valley at morning; the orange way draws
 * itself from the visitor's feet to the place, and scrolling flies the camera
 * along it until it arrives above נהלל. The name sits in the sky over the
 * vanishing point.
 *
 * Without WebGL the hero shows a still of the same valley; under reduced
 * motion it renders one still frame and never pins.
 */
export default function Hero() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const labelRef = useRef(null)
  const valleyRef = useRef(null)
  const progressRef = useRef(0)
  const drawnRef = useRef(false)
  const ctasRef = useRef(null)

  /* ── the scene ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    const label = labelRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lite = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches

    // the place's label rides on the marker — in the scene, or on the still
    const onFrame = (m) => {
      label.style.transform = `translate3d(${m.x}px, ${m.y}px, 0) translate(-50%, -100%)`
      const ctas = ctasRef.current
      const clear = progressRef.current > 0.12 || !ctas || m.y - 64 > ctas.getBoundingClientRect().bottom
      label.dataset.on = m.visible && drawnRef.current && clear ? 'true' : 'false'
    }

    let disposed = false
    let cleanup = () => {}

    // no WebGL: the still of the valley, its marker labelled where it stands (object-fit: cover)
    const showPoster = () => {
      section.dataset.mode = 'poster'
      drawnRef.current = true
      const place = () => {
        const W = section.clientWidth
        const H = section.clientHeight
        const k = Math.max(W / POSTER_SIZE[0], H / POSTER_SIZE[1])
        const w = POSTER_SIZE[0] * k
        const h = POSTER_SIZE[1] * k
        onFrame({ x: (W - w) / 2 + POSTER_MARK[0] * w, y: (H - h) / 2 + POSTER_MARK[1] * h, visible: progressRef.current < 0.05 })
      }
      place()
      // the CTAs are still rising when we mount; measure again once they have landed
      const settle = setTimeout(place, 2000)
      window.addEventListener('resize', place)
      window.addEventListener('scroll', place, { passive: true })
      cleanup = () => {
        clearTimeout(settle)
        window.removeEventListener('resize', place)
        window.removeEventListener('scroll', place)
      }
    }

    if (!hasWebGL()) {
      showPoster()
      return () => cleanup()
    }

    import('../valley/valleyScene.js')
      .then(({ createValley }) => {
        if (disposed) return
        const valley = createValley(canvas, { lite, onFrame })
        if (!valley) {
          showPoster()
          return
        }
        valleyRef.current = valley
        valley.setProgress(progressRef.current)

        if (reduced) {
          valley.setDraw(1)
          drawnRef.current = true
          valley.renderOnce()
          section.dataset.mode = 'gl'
          const ro = new ResizeObserver(() => valley.renderOnce())
          ro.observe(canvas)
          cleanup = () => {
            ro.disconnect()
            valley.destroy()
          }
          return
        }

        // run only while the hero is on screen and the tab is visible
        const io = new IntersectionObserver(([e]) => (e.isIntersecting ? valley.start() : valley.stop()), {
          threshold: 0,
        })
        io.observe(section)
        const onVis = () => (document.hidden ? valley.stop() : valley.start())
        document.addEventListener('visibilitychange', onVis)

        // first frame in, then the way draws itself to the place
        requestAnimationFrame(() => {
          section.dataset.mode = 'gl'
        })
        const drawState = { v: 0 }
        const drawTween = gsap.to(drawState, {
          v: 1,
          duration: 3.4,
          delay: 0.5,
          ease: 'power2.inOut',
          onUpdate: () => valley.setDraw(drawState.v),
          onComplete: () => {
            drawnRef.current = true
          },
        })

        // pointer parallax — fine pointers only
        const fine = window.matchMedia('(pointer: fine)').matches
        const onMove = (e) => {
          valley.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
        }
        if (fine) window.addEventListener('pointermove', onMove, { passive: true })

        cleanup = () => {
          io.disconnect()
          document.removeEventListener('visibilitychange', onVis)
          window.removeEventListener('pointermove', onMove)
          drawTween.kill()
          valley.destroy()
        }
      })
      .catch(() => {
        if (!disposed) showPoster()
      })

    return () => {
      disposed = true
      cleanup()
      valleyRef.current = null
    }
  }, [])

  /* ── entrance + the flight along the way ─────────────────────────────── */
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const section = sectionRef.current
    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hv-char',
        { yPercent: 105 },
        { yPercent: 0, duration: 1.25, stagger: 0.07, ease: 'expo.out', delay: 0.25 }
      )
      gsap.fromTo(
        '.hv-in',
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.09, ease: 'expo.out', delay: 0.7 }
      )

      mm.add({ wide: '(min-width: 768px)', narrow: '(max-width: 767px)' }, ({ conditions }) => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: conditions.wide ? '+=110%' : '+=85%',
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            onUpdate: (self) => {
              progressRef.current = self.progress
              valleyRef.current?.setProgress(self.progress)
            },
          },
        })
        tl.to('.hv-copy', { yPercent: -14, opacity: 0, duration: 0.28 }, 0)
          .to('.hv-cue', { opacity: 0, duration: 0.1 }, 0)
          .to('.hv-poster', { scale: 1.08, duration: 1 }, 0)
          .fromTo('.hv-arrive', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.2 }, 0.42)
          .to('.hv-veil', { opacity: 1, duration: 0.22 }, 0.78)
      })
    }, section)

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [])

  const chars = [...hero.title]

  return (
    <section
      ref={sectionRef}
      id="top"
      dir="rtl"
      data-mode="loading"
      className="rf-hero relative w-full h-[100svh] min-h-[560px] overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* still of the same valley: shown until the scene is live, and instead of it without WebGL */}
      <img
        src={POSTER}
        alt=""
        aria-hidden="true"
        decoding="async"
        fetchPriority="high"
        className="hv-poster absolute inset-0 w-full h-full object-cover"
      />
      <canvas ref={canvasRef} className="hv-canvas absolute inset-0 w-full h-full" aria-hidden="true" />

      {/* the place, labelled where it stands in the valley */}
      <div ref={labelRef} data-on="false" className="rf-marker absolute top-0 left-0 z-[5] pointer-events-none" aria-hidden="true">
        <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/92 px-3.5 py-1.5 font-heebo text-sm font-bold text-navy shadow-[0_10px_30px_-8px_rgba(8,16,40,0.45)]">
          <MapPin size={15} className="text-orange-ink" />
          {hero.kicker}
        </span>
        <span className="mx-auto mt-1 block h-5 w-px bg-white/90" />
      </div>

      {/* legibility: a whisper of light behind the type, nothing more */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[62%]"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 30%, rgba(246,241,230,0.55), rgba(246,241,230,0) 70%)' }}
      />

      <div className="hv-copy relative z-10 flex h-full flex-col items-center px-5 pt-[calc(64px+7svh)] md:pt-[calc(72px+6vh)] text-center">
        <h1
          id="hero-title"
          aria-label={hero.title}
          className="font-ragmarom text-navy leading-[0.82] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(5rem, 14vw, 12.5rem)' }}
        >
          {/* the reveal mask: headroom above the tight line box so the letters' tops aren't clipped */}
          <span aria-hidden="true" className="inline-flex overflow-hidden pt-[0.1em] -mt-[0.1em] pb-[0.06em]">
            {chars.map((ch, i) => (
              <span key={i} className="hv-char inline-block will-change-transform" style={{ whiteSpace: 'pre' }}>
                {ch}
              </span>
            ))}
          </span>
        </h1>
        <p
          className="hv-in mt-4 md:mt-5 font-heebo font-semibold text-navy leading-snug"
          style={{ fontSize: 'clamp(1.2rem, 2vw, 1.85rem)' }}
        >
          {hero.subtitle}
        </p>
        <p className="hv-in mt-1.5 font-heebo font-medium text-navy/75" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.2rem)' }}>
          {hero.small}
        </p>
        <div ref={ctasRef} className="hv-in mt-7 md:mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href={hero.primary.href} size="md" icon={ArrowDown}>
            {hero.primary.label}
          </Button>
          <OutlineLink href={hero.secondary.href} className="!bg-white/70 backdrop-blur-sm">
            {hero.secondary.label}
          </OutlineLink>
        </div>
      </div>

      {/* arriving at the place */}
      <p
        className="hv-arrive pointer-events-none absolute inset-x-0 bottom-[12svh] z-30 px-5 text-center font-ragmarom text-navy leading-[0.95]"
        style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', opacity: 0 }}
        aria-hidden="true"
      >
        {hero.small}
      </p>

      {/* scroll cue: a short way that keeps walking */}
      <div aria-hidden="true" className="hv-cue absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <span className="rf-cue block h-12 w-[2px] overflow-hidden rounded-full bg-navy/15">
          <span className="block h-1/2 w-full rounded-full bg-orange" />
        </span>
      </div>

      {/* the valley softens into the page below as the flight lands */}
      <div aria-hidden="true" className="hv-veil pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[28%] bg-gradient-to-b from-white/0 to-white" style={{ opacity: 0 }} />
    </section>
  )
}
