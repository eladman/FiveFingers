import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

/**
 * The active Lenis instance (or null under reduced-motion / before init).
 * Lets things like modals pause momentum scroll so a wheel/touch gesture
 * over an overlay can't drive the page underneath — body.style.overflow
 * alone doesn't stop Lenis, since it scrolls the page via its own RAF loop
 * rather than native browser scrolling.
 */
export function getLenis() {
  return lenisInstance
}

/**
 * Site-wide momentum smooth-scroll, driven by Lenis and synced to GSAP
 * ScrollTrigger so every scrubbed/pinned animation stays frame-locked to
 * the real scroll position.
 *
 * Honors prefers-reduced-motion: when the user opts out we skip Lenis
 * entirely and the browser keeps its native (instant / CSS-smooth) scroll,
 * so nothing here can induce motion sickness.
 *
 * Runs once at module init from main.jsx. Returns the Lenis instance (or
 * null when reduced-motion is on) in case a caller needs lenis.scrollTo.
 */
export function initSmoothScroll() {
  // Recompute every ScrollTrigger's start/end once late-loading assets settle.
  // The RagMarom display font (font-display:swap) and the lazy panel images
  // change layout height *after* components measure their triggers in
  // useLayoutEffect. Without this, FiveDNA's pin locks at a stale scroll
  // position and the Manifesto section above it never clears — the two visually
  // merge. The triggers set invalidateOnRefresh, so each refresh also
  // recomputes their pin distances. Runs regardless of reduced-motion.
  const refresh = () => ScrollTrigger.refresh()
  document.fonts?.ready.then(refresh)
  window.addEventListener('load', refresh)

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return null

  const lenis = new Lenis({
    duration: 1.1,
    // expo-out — quick to react, long graceful settle (the "glide")
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })
  lenisInstance = lenis

  // Keep ScrollTrigger's cached positions in step with Lenis, and let GSAP's
  // ticker drive Lenis' RAF loop (single rAF for the whole site).
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  // Smooth in-page anchor jumps through Lenis. Hashes that don't resolve to an
  // element on the page (e.g. #liabah / #academy) are the app's view router —
  // leave those alone so navigation still works.
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]')
    if (!link) return
    const id = link.getAttribute('href').slice(1)
    if (!id) return
    const target = document.getElementById(id)
    if (!target) return
    e.preventDefault()
    lenis.scrollTo(target)
  })

  return lenis
}
