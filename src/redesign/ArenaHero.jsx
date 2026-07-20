import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../components/ui/Button'
import { createHeroGL } from './heroGL'
import { getLenis } from '../lib/smoothScroll'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = [
  '/Hero-Pics/214A0011.jpg',
  '/Hero-Pics/214A0027.jpg',
  '/Hero-Pics/214A0034.jpg',
  '/Hero-Pics/214A0088.jpg',
  '/Hero-Pics/214A0114.jpg',
  '/Hero-Pics/214A0511.jpg',
  '/Hero-Pics/_14A9355.jpg',
]

function Chars({ text, className }) {
  return (
    <span className={className} aria-hidden="true">
      {[...text].map((ch, i) => (
        <span key={i} className="ah-char inline-block will-change-transform">
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

/**
 * The Arena hero. A WebGL displacement slideshow (pointer ripple +
 * scroll-velocity warp) under a poster-scale RagMarom composition.
 * Falls back to a plain crossfade when WebGL is unavailable, and to a
 * static frame under reduced motion.
 *
 * `start` gates the entrance choreography (the preloader hands off to it).
 */
export default function ArenaHero({ start = true, onComplete, onContactOpen }) {
  const ref = useRef(null)
  const canvasRef = useRef(null)
  const glRef = useRef(null)
  const [glFailed, setGlFailed] = useState(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* ---- WebGL slideshow ---- */
  useEffect(() => {
    if (reduced) { setGlFailed(true); return }
    const canvas = canvasRef.current
    const gl = createHeroGL(canvas, IMAGES, {
      onReady: () => gsap.to(canvas, { opacity: 1, duration: 0.9, ease: 'power2.out' }),
    })
    if (!gl) { setGlFailed(true); return }
    glRef.current = gl

    // Run only while the hero is on screen / tab visible.
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? gl.start() : gl.stop()),
      { threshold: 0.01 }
    )
    io.observe(canvas)
    const onVis = () => (document.hidden ? gl.stop() : gl.start())
    document.addEventListener('visibilitychange', onVis)

    // Pointer ripple.
    const section = ref.current
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      gl.pointer((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height)
    }
    section.addEventListener('pointermove', onMove, { passive: true })

    // Scroll-velocity warp — Lenis emits velocity; fall back to a scroll diff.
    const lenis = getLenis()
    let velCleanup = () => {}
    if (lenis) {
      const onScroll = ({ velocity }) => gl.scrollVelocity(velocity / 60)
      lenis.on('scroll', onScroll)
      velCleanup = () => lenis.off?.('scroll', onScroll)
    } else {
      let lastY = window.scrollY
      const onScroll = () => {
        gl.scrollVelocity((window.scrollY - lastY) / 60)
        lastY = window.scrollY
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      velCleanup = () => window.removeEventListener('scroll', onScroll)
    }

    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      section.removeEventListener('pointermove', onMove)
      velCleanup()
      gl.destroy()
      glRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ---- entrance choreography ---- */
  useLayoutEffect(() => {
    if (reduced) { onCompleteRef.current?.(); return }
    if (!start) {
      // Hold everything hidden until the preloader hands off.
      gsap.set('.ah-char', { yPercent: 110 })
      gsap.set('.ah-sub, .ah-cta, .ah-meta, .ah-scroll', { opacity: 0 })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.fromTo('.ah-word-a .ah-char',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, stagger: 0.055 },
        0.15
      )
        .fromTo('.ah-word-b .ah-char',
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.04 },
          '-=0.75'
        )
        .fromTo('.ah-sub',
          { y: 26, opacity: 0, filter: 'blur(8px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7 },
          '-=0.55'
        )
        .fromTo('.ah-cta',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
          '-=0.35'
        )
        .add(() => onCompleteRef.current?.(), '<')
        .fromTo('.ah-meta',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.25'
        )
        .fromTo('.ah-scroll', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2')
    }, ref)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start])

  /* ---- scroll-out: rack focus into the next scene ---- */
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
        .to('.ah-stage', { scale: 1.08, ease: 'none' }, 0)
        .to('.ah-content', { yPercent: -22, opacity: 0, filter: 'blur(5px)', ease: 'none' }, 0)
        .to('.ah-out-scrim', { opacity: 0.7, ease: 'none' }, 0)
        .to('.ah-scroll', { opacity: 0, ease: 'none' }, 0)
    }, ref)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      id="home"
      ref={ref}
      dir="rtl"
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-end bg-navy-deep"
    >
      {/* ── Stage: WebGL canvas (or crossfade fallback) ── */}
      <div className="ah-stage absolute inset-0 will-change-transform">
        {!glFailed ? (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0 }}
            aria-hidden="true"
          />
        ) : (
          <FallbackSlides reduced={reduced} />
        )}
        {/* warm grade + legibility scrims */}
        <div className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        <div className="ah-out-scrim absolute inset-0 bg-black" style={{ opacity: 0 }} />
      </div>

      {/* ── Content — poster composition, anchored to the base ── */}
      <div className="ah-content relative z-10 w-full max-w-screen-2xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pb-[clamp(5rem,12vh,9rem)] pt-40 will-change-transform">
        <h1 className="text-white select-none" aria-label="חמש אצבעות — חינוך למצוינות">
          <span className="ah-word-a block overflow-hidden font-ragmarom leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(4rem, 15vw, 12rem)', textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}>
            <Chars text="חמש אצבעות" />
          </span>
          <span className="ah-word-b block overflow-hidden font-ragmarom leading-[0.95] text-orange mt-1"
            style={{ fontSize: 'clamp(1.9rem, 5.2vw, 4.4rem)', textShadow: '0 2px 24px rgba(0,0,0,0.7)' }}>
            <Chars text="חינוך למצוינות" />
          </span>
        </h1>

        <p
          className="ah-sub font-heebo text-white/85 mt-6 max-w-xl leading-relaxed"
          style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.35rem)', textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}
        >
          תנועה חינוכית־חברתית שמלווה צעירים וצעירות אל תוך הזירה: לחיים של יוזמה, חוסן ומצוינות ערכית.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-9">
          <Button variant="primary" size="lg" glow onClick={() => onContactOpen?.()} className="ah-cta">
            הצטרפו אלינו
          </Button>
          <Button variant="ghost" size="lg" href="#manifesto" className="ah-cta">
            למה אנחנו כאן
          </Button>
        </div>

        {/* data strip */}
        <div className="ah-meta mt-12 pt-5 border-t border-white/15 flex flex-wrap items-center gap-x-8 gap-y-2 text-white/60 font-heebo text-sm md:text-base"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}>
          <span>מאז 2014</span>
          <span className="w-1 h-1 rounded-full bg-orange inline-block" aria-hidden="true" />
          <span>כ־3,000 חניכים וחניכות</span>
          <span className="w-1 h-1 rounded-full bg-orange inline-block" aria-hidden="true" />
          <span>בכל רחבי הארץ</span>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div className="ah-scroll scroll-indicator absolute left-1/2 -translate-x-1/2 z-10 hidden md:block"
        style={{ bottom: 'max(1.6rem, env(safe-area-inset-bottom, 1.6rem))' }}>
        <div className="w-6 h-10 rounded-full border-2 border-white/25 flex items-start justify-center pt-2">
          <div className="w-1 h-2.5 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}

/* Plain crossfade — no WebGL / reduced motion. */
function FallbackSlides({ reduced }) {
  const imgRefs = useRef([])

  useEffect(() => {
    if (reduced) return
    const imgs = imgRefs.current.filter(Boolean)
    if (imgs.length < 2) return
    let current = 0
    const id = setInterval(() => {
      const prev = current
      current = (current + 1) % imgs.length
      imgs[prev].style.opacity = '0'
      imgs[current].style.opacity = '1'
    }, 5200)
    return () => clearInterval(id)
  }, [reduced])

  const list = reduced ? IMAGES.slice(0, 1) : IMAGES
  return (
    <>
      {list.map((src, i) => (
        <img
          key={src}
          ref={(el) => (imgRefs.current[i] = el)}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: i === 0 ? 1 : 0, transition: 'opacity 1.2s ease-in-out' }}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
      ))}
    </>
  )
}
