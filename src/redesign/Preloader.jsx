import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/**
 * Brand-stamped entry: five pillars (the five fingers) fill orange in
 * sequence over deep navy, the wordmark surfaces, then the whole veil wipes
 * upward and hands off to the hero.
 *
 * Shows once per browser session. Skipped entirely under reduced motion.
 * Calls onDone exactly once — the hero waits for it before its own entrance.
 */
const SESSION_KEY = 'ff-intro-seen'

export function shouldShowPreloader() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return !sessionStorage.getItem(SESSION_KEY)
  } catch {
    return true
  }
}

export default function Preloader({ onDone }) {
  const ref = useRef(null)
  const doneRef = useRef(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      try { sessionStorage.setItem(SESSION_KEY, '1') } catch { /* private mode */ }
      onDone?.()
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => setGone(true),
      })

      tl.fromTo('.pl-bar', { scaleY: 0 }, {
        scaleY: 1,
        duration: 0.55,
        stagger: 0.09,
        ease: 'power4.out',
      }, 0.1)
        .fromTo('.pl-word', { y: 26, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.5,
        }, '-=0.35')
        .to('.pl-inner', {
          y: -40, opacity: 0, duration: 0.45, ease: 'power2.in',
        }, '+=0.35')
        .to(ref.current, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.75,
          ease: 'power4.inOut',
          onStart: finish,
        }, '-=0.15')
    }, ref)

    // Hard ceiling — never trap the visitor behind the veil.
    const failsafe = setTimeout(() => { finish(); setGone(true) }, 3200)
    return () => { clearTimeout(failsafe); ctx.revert() }
  }, [onDone])

  if (gone) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 z-[90] flex items-center justify-center"
      style={{ background: '#081028', clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      <div className="pl-inner flex flex-col items-center gap-7">
        {/* five fingers */}
        <div className="flex items-end gap-2.5" dir="rtl">
          {[34, 46, 56, 50, 30].map((h, i) => (
            <span
              key={i}
              className="pl-bar w-[9px] rounded-full bg-orange"
              style={{ height: h, transformOrigin: 'bottom', transform: 'scaleY(0)' }}
            />
          ))}
        </div>
        <span
          className="pl-word font-ragmarom text-white"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', opacity: 0 }}
        >
          חמש אצבעות
        </span>
      </div>
    </div>
  )
}
