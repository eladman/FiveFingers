import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Magnetic hover — the element leans toward the cursor while it's nearby and
 * springs back on leave. Desktop pointers only; no-op for touch and under
 * reduced motion.
 *
 * @param {number} strength  how far the element follows, as a fraction of the
 *                           cursor's offset from its center (0.35 ≈ premium-subtle)
 */
export default function useMagnetic(strength = 0.35) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'expo.out' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      gsap.killTweensOf(el)
    }
  }, [strength])

  return ref
}
