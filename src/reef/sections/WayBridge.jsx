import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { reducedMotion } from '../shared'

const PATHS = {
  // leaves the underline of "להמשיך אותה" and walks on into the next chapter
  continue: 'M720 0 C 720 70, 900 70, 980 120 S 1060 210, 960 250 S 760 262, 700 300',
  // from the day's last moment down into building your own
  onward: 'M260 0 C 260 80, 470 60, 560 120 S 640 230, 780 250 S 1080 240, 1180 300',
}

/**
 * The way, crossing from one section into the next — drawn as you pass the
 * seam. Decorative; sits on the boundary without taking any space, and stays
 * inside the two sections' padding so it never crosses a line of text.
 */
export default function WayBridge({ variant = 'continue' }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.wb-path',
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 45%', scrub: 0.6 } }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none relative z-10 h-0">
      <svg
        ref={ref}
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        fill="none"
        className="absolute inset-x-0 -top-[76px] h-[150px] w-full md:-top-[110px] md:h-[220px]"
      >
        <path
          className="wb-path"
          pathLength="1"
          strokeDasharray="1"
          d={PATHS[variant]}
          stroke="#ff8714"
          strokeWidth="4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
