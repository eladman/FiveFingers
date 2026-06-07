import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Standardized scroll-reveal for the ליבה page.
 *
 * Returns a ref to attach to a section. Every descendant matching `selector`
 * (default `.reveal`) fades/slides up in a staggered sequence when the section
 * scrolls into view. Honors prefers-reduced-motion (elements just appear).
 *
 * @param {object}  opts
 * @param {string}  opts.selector  CSS selector for the elements to reveal
 * @param {number}  opts.y         start offset in px
 * @param {number}  opts.stagger   delay between items (s)
 * @param {number}  opts.duration  per-item duration (s)
 * @param {string}  opts.start     ScrollTrigger start
 * @param {Array}   deps           extra deps to re-run the effect
 */
export default function useReveal(
  { selector = '.reveal', y = 48, stagger = 0.1, duration = 1.1, start = 'top 82%' } = {},
  deps = []
) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const els = el.querySelectorAll(selector)
    if (!els.length) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      gsap.set(els, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        els,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger,
          duration,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start, once: true },
        }
      )
    }, el)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
