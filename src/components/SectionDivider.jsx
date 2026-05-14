export default function SectionDivider({ fromColor, toColor, reverse = false }) {
  const clip = reverse
    ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 20%)'
    : 'polygon(0% 0%, 100% 0%, 100% 20%, 0% 100%)'

  return (
    <div aria-hidden="true" style={{ height: '80px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: toColor }} />
      <div style={{ position: 'absolute', inset: 0, background: fromColor, clipPath: clip }} />
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {reverse
          ? <line x1="0" y1="20" x2="100" y2="100" stroke="#ff8714" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
          : <line x1="100" y1="20" x2="0" y2="100" stroke="#ff8714" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        }
      </svg>
    </div>
  )
}
