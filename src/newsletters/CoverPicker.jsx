import { useEffect, useRef, useState } from 'react'
import { ImagePlus, Move, X } from 'lucide-react'
import { MIN_W, loadImage, usableImages } from './cover'

const DEFAULT_COVER = '/new_link_logo.jpg'

/**
 * Picks the picture WhatsApp shows for the newsletter link. The value is
 * { src, fx, fy } (fx/fy frame the picture, 0..1) or null for the generic
 * Five Fingers image. The card mimics a sent WhatsApp message, so staff see
 * the preview the families will see; drag the picture to frame it.
 */
export default function CoverPicker({ value, onChange, html, title, description }) {
  const fileInput = useRef(null)
  const [suggestions, setSuggestions] = useState([])
  const [error, setError] = useState('')
  const [warning, setWarning] = useState('')

  // Pictures already inside the newsletter, offered as one-tap choices.
  useEffect(() => {
    let live = true
    const t = setTimeout(() => {
      usableImages(html).then((srcs) => live && setSuggestions(srcs))
    }, 400)
    return () => {
      live = false
      clearTimeout(t)
    }
  }, [html])

  async function choose(src) {
    setError('')
    setWarning('')
    try {
      const img = await loadImage(src)
      if (img.naturalWidth < MIN_W) setWarning('התמונה קטנה, ובוואטסאפ היא עלולה להופיע כתמונה ממוזערת. עדיף תמונה ברוחב 1200 פיקסלים לפחות.')
      onChange({ src, fx: 0.5, fy: 0.5 })
    } catch {
      setError('לא הצלחנו לקרוא את התמונה. נסו קובץ JPG או PNG.')
    }
  }

  function takeFile(file) {
    if (!file) return
    if (!file.type.startsWith('image/')) return setError('זה לא קובץ תמונה.')
    const reader = new FileReader()
    reader.onload = () => choose(reader.result)
    reader.onerror = () => setError('לא הצלחנו לקרוא את הקובץ.')
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <WhatsAppCard cover={value} onFrame={(fx, fy) => onChange({ ...value, fx, fy })} title={title} description={description} />

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => fileInput.current?.click()} className="dash-btn-ghost">
          <ImagePlus size={16} /> {value ? 'החלפת תמונה' : 'העלאת תמונה'}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange(null)
              setWarning('')
            }}
            className="dash-btn-ghost"
          >
            <X size={16} /> בלי תמונה משלי
          </button>
        )}
        <input
          ref={fileInput}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          hidden
          onChange={(e) => {
            takeFile(e.target.files?.[0])
            e.target.value = ''
          }}
        />
      </div>

      {suggestions.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold text-navy/55">או בחרו תמונה מתוך הניוזלטר</p>
          <div className="nl-cover-options">
            {suggestions.map((src) => (
              <button
                key={src.length > 200 ? src.slice(0, 120) + src.length : src}
                type="button"
                onClick={() => choose(src)}
                aria-pressed={value?.src === src}
                aria-label="בחירת התמונה הזו"
              >
                <img src={src} alt="" crossOrigin={/^data:/.test(src) ? undefined : 'anonymous'} />
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {warning && <p className="mt-2 text-sm text-orange-ink">{warning}</p>}
    </div>
  )
}

/** A sent WhatsApp message with the link preview, as families will see it. */
function WhatsAppCard({ cover, onFrame, title, description }) {
  const box = useRef(null)
  const img = useRef(null)
  const drag = useRef(null)
  const [overflow, setOverflow] = useState(null) // which axis can be dragged
  const host = location.host

  function measure() {
    const el = img.current
    const b = box.current
    if (!el || !b || !cover) return setOverflow(null)
    const scale = Math.max(b.clientWidth / el.naturalWidth, b.clientHeight / el.naturalHeight)
    const ox = el.naturalWidth * scale - b.clientWidth
    const oy = el.naturalHeight * scale - b.clientHeight
    setOverflow(ox > 1 ? { axis: 'x', px: ox } : oy > 1 ? { axis: 'y', px: oy } : null)
  }

  useEffect(() => {
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  })

  const fx = cover?.fx ?? 0.5
  const fy = cover?.fy ?? 0.5
  const clamp = (v) => Math.min(1, Math.max(0, v))

  function nudge(delta) {
    if (!overflow) return
    if (overflow.axis === 'x') onFrame(clamp(fx + delta), fy)
    else onFrame(fx, clamp(fy + delta))
  }

  const dragProps = overflow && {
    onPointerDown(e) {
      e.currentTarget.setPointerCapture(e.pointerId)
      drag.current = { x: e.clientX, y: e.clientY, fx, fy }
    },
    onPointerMove(e) {
      const d = drag.current
      if (!d) return
      // Dragging the picture right reveals more of its left side.
      if (overflow.axis === 'x') onFrame(clamp(d.fx - (e.clientX - d.x) / overflow.px), d.fy)
      else onFrame(d.fx, clamp(d.fy - (e.clientY - d.y) / overflow.px))
    },
    onPointerUp() {
      drag.current = null
    },
    onPointerCancel() {
      drag.current = null
    },
    onKeyDown(e) {
      const step = e.shiftKey ? 0.1 : 0.03
      const keys = overflow.axis === 'x' ? { ArrowLeft: -step, ArrowRight: step } : { ArrowUp: -step, ArrowDown: step }
      if (keys[e.key] == null) return
      e.preventDefault()
      nudge(keys[e.key])
    },
    tabIndex: 0,
    role: 'slider',
    'aria-label': 'מיקום התמונה',
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-valuenow': Math.round((overflow.axis === 'x' ? fx : fy) * 100),
  }

  return (
    <div className="nl-wa">
      <div className="nl-wa-bubble">
        <div className="nl-wa-preview">
          <div ref={box} className="nl-wa-image" data-draggable={overflow ? overflow.axis : undefined} {...dragProps}>
            <img
              ref={img}
              src={cover?.src || DEFAULT_COVER}
              alt=""
              draggable={false}
              crossOrigin={cover && !/^data:/.test(cover.src) ? 'anonymous' : undefined}
              onLoad={measure}
              style={{ objectPosition: `${fx * 100}% ${fy * 100}%` }}
            />
            {overflow && (
              <span className="nl-wa-hint">
                <Move size={13} /> גררו כדי למקם
              </span>
            )}
            {!cover && <span className="nl-wa-hint">תמונת ברירת המחדל</span>}
          </div>
          <div className="nl-wa-text" dir="auto">
            <p className="nl-wa-title">{title || 'כותרת הניוזלטר'}</p>
            {description && <p className="nl-wa-desc">{description}</p>}
            <p className="nl-wa-host" dir="ltr">{host}</p>
          </div>
        </div>
        <p className="nl-wa-msg" dir="auto">
          {title || 'כותרת הניוזלטר'}
          <br />
          <span dir="ltr">https://{host}/newsletter/…</span>
        </p>
      </div>
    </div>
  )
}
