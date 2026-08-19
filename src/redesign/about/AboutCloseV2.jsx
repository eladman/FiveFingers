import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../../components/ui/Button'
import useMagnetic from '../useMagnetic'
import { CLOSE } from '../../data/aboutData'

gsap.registerPlugin(ScrollTrigger)

/**
 * The close — one line, one door. Deliberately a compact navy band rather than
 * another full-height photo finale: the story has already been told, so this is
 * a colophon, not a second climax. It also gives the light editorial page its
 * one dark note, right before the footer.
 */
export default function AboutCloseV2({ onBook }) {
  const ref = useRef(null)
  const magnetRef = useMagnetic(0.3)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      gsap.fromTo('.abc-el',
        { y: 34, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about-cta"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden text-white"
      style={{ background: 'linear-gradient(180deg, #1e3578 0%, #0d1b4b 55%, #081028 100%)' }}
    >
      <div className="pointer-events-none absolute top-[-20%] left-[-6%] w-[45vw] h-[60vh] rounded-full bg-orange/12 blur-[160px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 py-24 md:py-32 text-center">
        <h2
          className="abc-el font-ragmarom text-white leading-[1.02]"
          style={{ fontSize: 'clamp(2.3rem, 5.5vw, 4.6rem)', textWrap: 'balance' }}
        >
          {CLOSE.title} <span className="text-orange">{CLOSE.titleAccent}</span>
        </h2>
        <p
          className="abc-el font-heebo text-white/70 mt-6 max-w-xl mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 1.3vw, 1.2rem)' }}
        >
          {CLOSE.body}
        </p>

        <div className="abc-el mt-10">
          <span ref={magnetRef} className="inline-block">
            <Button variant="primary" size="lg" glow onClick={() => onBook?.()}>
              {CLOSE.cta}
            </Button>
          </span>
        </div>
      </div>
    </section>
  )
}
