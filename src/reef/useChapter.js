import { useEffect, useState } from 'react'
import { CHAPTERS } from './chapters'

/**
 * Which chapter the reader is in (the last one whose top has passed the
 * upper third of the screen). Only the chapter index is React state — it
 * changes a dozen times per page. The reading progress changes every frame,
 * so it never touches React: it is written straight onto the elements that
 * draw it ([data-rf-progress="bar"] scales, [data-rf-progress="path"] draws).
 */
export default function useChapter() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let raf = 0
    let last = -1
    const measure = () => {
      raf = 0
      const line = window.innerHeight * 0.34
      const tops = CHAPTERS.map((c, i) => {
        if (i === 0) return -Infinity
        const el = document.getElementById(c.id)
        return el ? el.getBoundingClientRect().top : Infinity
      })
      let idx = 0
      tops.forEach((t, i) => {
        if (i > 0 && t <= line) idx = i
      })
      // how far through the current chapter: lets the way fill smoothly between stops
      let frac = 0
      const next = tops[idx + 1]
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (idx === 0) {
        const span = tops[1] + window.scrollY - line
        frac = span > 0 ? window.scrollY / span : 0
      } else if (Number.isFinite(next)) {
        frac = (line - tops[idx]) / Math.max(1, next - tops[idx])
      } else {
        frac = max > 0 && window.scrollY >= max - 2 ? 1 : 0
      }
      frac = Math.min(1, Math.max(0, frac))
      const progress = (idx + frac) / (CHAPTERS.length - 1)

      if (Math.abs(progress - last) > 0.0005) {
        last = progress
        document.querySelectorAll('[data-rf-progress]').forEach((el) => {
          if (el.dataset.rfProgress === 'bar') el.style.transform = `scaleX(${progress})`
          else el.style.strokeDashoffset = String(1 - progress)
        })
      }
      setIndex((s) => (s === idx ? s : idx))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return index
}
