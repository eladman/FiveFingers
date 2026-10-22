/** '2026-10-22' → '22.10.2026' */
export function formatDate(iso) {
  if (!iso) return ''
  const [y, m, d] = String(iso).slice(0, 10).split('-')
  return `${d}.${m}.${y}`
}
