import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft } from 'lucide-react'
import { hook } from '../content'
import { goToRegister } from '../shared'

gsap.registerPlugin(ScrollTrigger)

/**
 * The emotional hook, straight to the teen on the page. Navy-deep picks up
 * where the hero's bottom scrim ends; each line lights up as it scrolls past
 * (scrubbed), then the orange punch line lands. Reduced motion: all lit.
 */
export default function Hook() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.hk-line').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.18 },
          { opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 55%', scrub: true } }
        )
      })
      gsap.fromTo(
        '.hk-punch',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.hk-punch', start: 'top 85%', once: true },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      dir="rtl"
      aria-labelledby="hook-title"
      className="relative w-full overflow-hidden text-white"
      style={{ background: 'linear-gradient(180deg, #050a1a 0%, #081028 55%, #0d1b4b 100%)' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 100%, rgba(255,135,20,0.10) 0%, transparent 70%)' }}
      />
      <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 py-24 md:py-36">
        <p className="ds-eyebrow text-orange mb-8 md:mb-10">{hook.kicker}</p>

        <h2 id="hook-title" className="font-ragmarom leading-[1.02] tracking-tight" style={{ fontSize: 'clamp(2.6rem, 7vw, 6.5rem)' }}>
          {hook.lines.map((l) => (
            <span key={l} className="hk-line block">{l}</span>
          ))}
        </h2>

        <div className="mt-14 md:mt-20 max-w-2xl">
          <p className="hk-punch font-ragmarom text-orange leading-[1.05]" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}>
            {hook.punch}
          </p>
          <p className="hk-punch mt-5 font-heebo text-white/75 leading-relaxed" style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.3rem)' }}>
            {hook.text}
          </p>
          <a
            href="#register"
            onClick={goToRegister}
            className="hk-punch mt-8 inline-flex items-center gap-2 font-heebo font-bold text-white underline decoration-2 underline-offset-[7px] decoration-orange/60 hover:decoration-orange transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
          >
            אני רוצה להזניק
            <ArrowLeft size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
