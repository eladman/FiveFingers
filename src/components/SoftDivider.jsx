/**
 * Soft section seam used across the site (homepage + ליבה page).
 *
 * Default (`blend`): a soft vertical color fade from the section above
 * (`fromColor`) into the section below (`toColor`) — used for low-contrast
 * cream/white seams.
 *
 * `blend={false}`: a crisp two-tone seam (top color meets bottom color at the
 * center). Used where a light section meets a dark band, so the high contrast
 * doesn't produce a washed-out halo.
 *
 * Both keep a subtle centered orange tick as a refined accent.
 */
export default function SoftDivider({ fromColor, toColor, height = 120, blend = true }) {
  const background = blend
    ? `linear-gradient(180deg, ${fromColor} 0%, ${toColor} 100%)`
    : `linear-gradient(180deg, ${fromColor} 0%, ${fromColor} 50%, ${toColor} 50%, ${toColor} 100%)`

  return (
    <div
      aria-hidden="true"
      style={{
        height: `${blend ? height : Math.round(height * 0.55)}px`,
        position: 'relative',
        background,
      }}
    >
      {/* Centered orange tick — a quiet seam marker */}
      <span
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '2px',
          height: '34px',
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(180deg, transparent, #ff8714, transparent)',
          opacity: 0.6,
          borderRadius: '2px',
        }}
      />
    </div>
  )
}
