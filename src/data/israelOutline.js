// Real outline of Israel — border coordinates [lng, lat].
// Used to draw an accurate map silhouette and to place location pins by real
// geographic coordinates. The same `project()` is used for the land outline,
// the two inland seas (Kinneret + Dead Sea) and the pins, so everything stays
// registered to the same map. Traced clockwise from Rosh HaNikra on the
// Mediterranean, east along the Lebanon border, south down the Jordan/Arava
// rift to Eilat, then north-west along the Egyptian border and up the coast.
// The two seas are drawn as concave notches in the eastern edge (the Jordan
// rift), matching the recognisable silhouette, with water bodies nestled in.
const RING = [
  // ── North: Mediterranean coast → Lebanon → panhandle (west → east) ──
  [35.102, 33.083], // Rosh HaNikra (Mediterranean)
  [35.185, 33.090],
  [35.270, 33.105],
  [35.360, 33.060],
  [35.455, 33.085],
  [35.512, 33.112],
  [35.552, 33.242], // border juts north toward Metula
  [35.586, 33.281], // Metula — northernmost point (narrow panhandle)
  // ── East side of the panhandle, south (Golan) ──
  [35.598, 33.230],
  [35.640, 33.170],
  [35.680, 33.090],
  [35.695, 33.000],
  // ── Sea of Galilee (Kinneret) — concave notch in the east edge ──
  [35.688, 32.920], // approach
  [35.628, 32.905], // north shore
  [35.560, 32.858], // north-west shore
  [35.540, 32.792], // west shore
  [35.568, 32.725], // south-west shore
  [35.635, 32.712],
  [35.688, 32.708], // back to the east edge
  // ── East: Jordan rift valley, south (jagged waist) ──
  [35.660, 32.600],
  [35.600, 32.470],
  [35.560, 32.380],
  [35.545, 32.270],
  [35.540, 32.130],
  [35.535, 32.010],
  [35.545, 31.910],
  [35.560, 31.830], // bulge east, north of the Dead Sea
  // ── Dead Sea — deep concave notch in the east edge (west shore) ──
  [35.560, 31.770], // north-east corner of the sea
  [35.470, 31.750], // cut sharply in — north-west shore
  [35.418, 31.630], // west shore
  [35.408, 31.490], // west shore
  [35.425, 31.390], // by the Lisan
  [35.398, 31.290],
  [35.382, 31.185],
  [35.400, 31.115], // slight jut at the south
  [35.372, 31.055], // south end of the sea
  // ── Arava valley, south to Eilat ──
  [35.300, 30.850],
  [35.220, 30.600],
  [35.175, 30.400],
  [35.135, 30.100],
  [35.000, 29.740],
  [34.920, 29.552], // Eilat — Gulf of Aqaba, southernmost point
  // ── South-west: Egyptian border, north-west ──
  [34.948, 29.690],
  [35.008, 30.130],
  [34.898, 30.400],
  [34.700, 30.705],
  [34.522, 30.910],
  [34.400, 31.100],
  [34.270, 31.220], // Rafah / south Gaza coast
  // ── West: Mediterranean coast, south → north ──
  [34.360, 31.360],
  [34.488, 31.600],
  [34.560, 31.685],
  [34.645, 31.810],
  [34.705, 31.960],
  [34.762, 32.082], // Tel Aviv
  [34.822, 32.270],
  [34.878, 32.450],
  [34.912, 32.600],
  [34.958, 32.762],
  [34.982, 32.830], // Haifa bay
  [35.022, 32.905],
  [35.070, 33.010],
  [35.102, 33.083], // back to Rosh HaNikra
]

// Sea of Galilee (Kinneret) — nestled in its notch, traced clockwise.
const KINNERET = [
  [35.560, 32.858],
  [35.628, 32.872],
  [35.648, 32.815],
  [35.638, 32.752],
  [35.598, 32.718],
  [35.548, 32.732],
  [35.535, 32.792],
  [35.548, 32.850],
  [35.560, 32.858],
]

// Dead Sea (Yam HaMelach) — nestled in its notch, elongated, traced clockwise.
const DEAD_SEA = [
  [35.468, 31.748], // north tip
  [35.548, 31.720],
  [35.558, 31.590],
  [35.548, 31.470],
  [35.508, 31.410], // Lisan
  [35.458, 31.398],
  [35.436, 31.318],
  [35.414, 31.228],
  [35.396, 31.148],
  [35.376, 31.070], // south tip
  [35.390, 31.185],
  [35.400, 31.320],
  [35.392, 31.490],
  [35.404, 31.630],
  [35.468, 31.748],
]

// Geographic bounding box (from the land ring — it fully contains the seas).
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

/** Turn a [lng, lat] ring into an SVG path string in viewBox coordinates. */
function ringToPath(ring) {
  return (
    ring
      .map(([lng, lat], i) => {
        const { x, y } = project(lng, lat)
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
      })
      .join(' ') + ' Z'
  )
}

/** The land outline as an SVG path string. */
export const ISRAEL_PATH = ringToPath(RING)

/** Sea of Galilee (Kinneret) as an SVG path string. */
export const KINNERET_PATH = ringToPath(KINNERET)

/** Dead Sea as an SVG path string. */
export const DEAD_SEA_PATH = ringToPath(DEAD_SEA)
