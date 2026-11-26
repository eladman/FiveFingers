import { useMemo } from 'react'
import { CHAPTERS } from '../chapters'
import { scrollToId } from '../shared'

const H = 520
const N = CHAPTERS.length

/** Points down the rail, swaying like a path across fields. */
function points() {
  return CHAPTERS.map((_, i) => ({ x: 14 + Math.sin(i * 1.15) * 7, y: 10 + (i / (N - 1)) * (H - 20) }))
}

/** Catmull-Rom through the points, as cubic Béziers. */
function pathFrom(pts) {
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`
  }
  return d
}

/**
 * The way, as the page's navigation (wide screens): every chapter is a stop
 * on a winding path down the margin, and the path fills as you read. Hover or
 * focus a stop to see its name (never over the content unasked); click to travel there.
 */
export default function WayRail({ index }) {
  const pts = useMemo(points, [])
  const d = useMemo(() => pathFrom(pts), [pts])

  return (
    <nav
      aria-label="פרקים בעמוד"
      data-on={index > 0}
      inert={index === 0}
      className="rf-rail fixed left-5 top-1/2 z-30 -translate-y-1/2"
      style={{ height: H }}
    >
      <svg aria-hidden="true" width="32" height={H} viewBox={`0 0 32 ${H}`} fill="none" className="absolute inset-0">
        <path d={d} stroke="rgba(13,27,75,0.16)" strokeWidth="2" strokeLinecap="round" />
        <path
          d={d}
          pathLength="1"
          stroke="#ff8714"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1"
          strokeDashoffset="1"
          data-rf-progress="path"
        />
      </svg>
      <ol className="relative h-full">
        {CHAPTERS.map((c, i) => {
          const passed = i <= index
          const current = i === index
          return (
            <li key={c.id} className="absolute" style={{ left: pts[i].x, top: pts[i].y, transform: 'translate(-50%, -50%)' }}>
              <button
                type="button"
                onClick={() => scrollToId(c.id)}
                aria-current={current ? 'location' : undefined}
                className="rf-stop group relative grid h-7 w-7 place-items-center rounded-full focus-visible:outline-none"
              >
                <span
                  aria-hidden="true"
                  className={`block rounded-full border-2 transition-all duration-300 ease-brand ${
                    current
                      ? 'h-3.5 w-3.5 border-orange bg-orange shadow-[0_0_0_5px_rgba(255,135,20,0.22)]'
                      : passed
                        ? 'h-2.5 w-2.5 border-orange bg-orange'
                        : 'h-2.5 w-2.5 border-navy/35 bg-white'
                  } group-hover:scale-125 group-focus-visible:scale-125`}
                />
                <span
                  className="rf-stop-label pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-navy px-3 py-1 font-heebo text-[0.82rem] font-semibold text-white shadow-[0_8px_22px_-6px_rgba(8,16,40,0.45)]"
                >
                  {c.label}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
