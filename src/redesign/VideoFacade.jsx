import { useState } from 'react'

/**
 * A click-to-play video facade.
 *
 * Until the user clicks, only a poster image (part of the parent document) is
 * shown — no live cross-origin iframe. A live YouTube iframe swallows wheel
 * events whenever the cursor is over it, which starves Lenis (smoothWheel
 * drives the page from window wheel events) and makes scrolling past the
 * section feel stuck. Keeping the embed unmounted until someone deliberately
 * watches keeps scrolling fluid.
 *
 * The parent supplies the aspect-ratio wrapper (`position: relative` +
 * padding-bottom), so per-context styling (shadow, ring, theme) stays with the
 * caller; this component only fills that box with `absolute inset-0` content.
 *
 * @param src     Embed URL to load on play (e.g. a YouTube /embed/ URL).
 * @param title   iframe title / accessible label for the play button.
 * @param poster  Optional explicit poster image; falls back to the YouTube
 *                thumbnail derived from `src` when omitted.
 * @param label   Optional aria-label override for the play button.
 */
export default function VideoFacade({ src, title, poster, label }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 w-full h-full"
        src={withAutoplay(src)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  const img = poster || youTubePoster(src)

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={label || (title ? `נגן - ${title}` : 'נגן את הסרט')}
      className="group absolute inset-0 w-full h-full cursor-pointer bg-navy-deep"
    >
      {img && (
        <img
          src={img}
          alt={title || ''}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <span className="absolute inset-0 bg-navy-deep/25 transition-colors duration-300 group-hover:bg-navy-deep/15" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-center justify-center w-[4.5rem] h-[4.5rem] md:w-24 md:h-24 rounded-full bg-orange shadow-[0_10px_40px_rgba(255,135,20,0.5)] transition-transform duration-300 group-hover:scale-110">
          <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 md:w-9 md:h-9 translate-x-[2px]" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  )
}

// Derive a YouTube thumbnail from an embed / watch / short URL. Returns null
// for non-YouTube URLs, in which case the facade shows its navy fallback.
function youTubePoster(src) {
  const m = String(src).match(/(?:embed\/|v=|youtu\.be\/)([\w-]{11})/)
  return m ? `https://img.youtube.com/vi/${m[1]}/maxresdefault.jpg` : null
}

// Append autoplay=1, respecting any existing query string on the src.
function withAutoplay(src) {
  return src + (src.includes('?') ? '&' : '?') + 'autoplay=1'
}
