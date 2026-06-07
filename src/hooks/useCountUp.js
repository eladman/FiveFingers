import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Counts a number up from 0 → `target` when the element scrolls into view.
 * Respects `prefers-reduced-motion`: jumps straight to the final value.
 *
 * @param {number} target   final value
 * @param {number} duration seconds (default 2)
 * @returns {[number, React.RefObject]} [displayed value, ref to attach]
 */
export default function useCountUp(target, duration = 2) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      setValue(target)
      return
    }

    const obj = { n: 0 }
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: () => setValue(Math.round(obj.n)),
      })
    }, el)

    return () => ctx.revert()
  }, [target, duration])

  return [value, ref]
}
