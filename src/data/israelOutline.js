// Real outline of Israel — border coordinates [lng, lat] (Natural Earth, admin-0).
// Used to draw an accurate map silhouette and to place location pins by real
// geographic coordinates. The same `project()` is used for both, so pins always
// land in the right place relative to the shape.
const RING = [
  [35.719918, 32.709192], [35.545665, 32.393992], [35.18393, 32.532511],
  [34.974641, 31.866582], [35.225892, 31.754341], [34.970507, 31.616778],
  [34.927408, 31.353435], [35.397561, 31.489086], [35.420918, 31.100066],
  [34.922603, 29.501326], [34.265433, 31.219361], [34.556372, 31.548824],
  [34.488107, 31.605539], [34.752587, 32.072926], [34.955417, 32.827376],
  [35.098457, 33.080539], [35.126053, 33.0909], [35.460709, 33.08904],
  [35.552797, 33.264275], [35.821101, 33.277426], [35.836397, 32.868123],
  [35.700798, 32.716014], [35.719918, 32.709192],
]

// Geographic bounding box.
const lngs = RING.map((p) => p[0])
const lats = RING.map((p) => p[1])
const minLng = Math.min(...lngs)
const maxLng = Math.max(...lngs)
const minLat = Math.min(...lats)
const maxLat = Math.max(...lats)

// Latitude correction so longitude degrees aren't drawn wider than they are
// (equirectangular distortion). At Israel's mean latitude, 1° lng ≈ cos(lat)° lat.
const K = Math.cos(((minLat + maxLat) / 2) * (Math.PI / 180))

const projW = (maxLng - minLng) * K
const projH = maxLat - minLat
const SCALE = 1000 / projH // normalize height to 1000 viewBox units

export const VIEWBOX_W = projW * SCALE
export const VIEWBOX_H = 1000

/** Project [lng, lat] → { x, y } in viewBox units (y grows downward). */
export function project(lng, lat) {
  return {
    x: (lng - minLng) * K * SCALE,
    y: (maxLat - lat) * SCALE,
  }
}

/** The outline as an SVG path string in viewBox coordinates. */
export const ISRAEL_PATH =
  RING.map(([lng, lat], i) => {
    const { x, y } = project(lng, lat)
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ') + ' Z'
