/**
 * The Jezreel Valley, built in three.js for the /reef hero.
 *
 * A procedural valley seen at morning: a quilt of field plots (wheat, green,
 * plowed soil, fallow) with furrows running their own way in each plot, dirt
 * tracks between them, cypress windbreaks and orchard clumps, hills rising to
 * hazy ridges on the horizon. Across it runs "the way": a dirt road with an
 * orange line drawing itself from the visitor's feet to a marker at the place.
 *
 * Scroll drives `setProgress(0..1)`: the camera travels along the way and
 * arrives above the marker. The pointer adds a small parallax.
 *
 * Everything is generated: no textures, no models, nothing to download beyond
 * three itself. The module is imported lazily by the hero, so the first paint
 * never waits for it.
 */
import {
  BackSide,
  BufferAttribute,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  DirectionalLight,
  DoubleSide,
  FogExp2,
  HemisphereLight,
  IcosahedronGeometry,
  LatheGeometry,
  InstancedMesh,
  MathUtils,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  RingGeometry,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'

/* ── palette (sRGB hex; converted to linear by three) ─────────────────────── */
const SKY_TOP = new Color('#9fbfd4')
const HORIZON = new Color('#f1e4cb')
const HAZE = new Color('#93a9bd')
const FOG_DENSITY = 0.0034

/* ── deterministic noise (CPU) ─────────────────────────────────────────────── */
function hash2(x, z) {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453123
  return s - Math.floor(s)
}
function vnoise(x, z) {
  const ix = Math.floor(x)
  const iz = Math.floor(z)
  const fx = x - ix
  const fz = z - iz
  const ux = fx * fx * (3 - 2 * fx)
  const uz = fz * fz * (3 - 2 * fz)
  const a = hash2(ix, iz)
  const b = hash2(ix + 1, iz)
  const c = hash2(ix, iz + 1)
  const d = hash2(ix + 1, iz + 1)
  return a + (b - a) * ux + (c - a) * uz + (a - b - c + d) * ux * uz
}
function fbm(x, z, oct = 4) {
  let v = 0
  let amp = 0.5
  let f = 1
  for (let i = 0; i < oct; i++) {
    v += amp * vnoise(x * f, z * f)
    f *= 2.03
    amp *= 0.5
  }
  return v
}
const smooth = (a, b, x) => {
  const t = MathUtils.clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}

/** Terrain height: a flat valley floor, a lone rounded hill, ridges far north. */
export function heightAt(x, z) {
  let h = (fbm(x * 0.011, z * 0.011) - 0.5) * 2.4
  // ridges on the horizon (Gilboa / Nazareth hills, loosely)
  const far = smooth(-150, -290, z)
  h += far * (18 + 52 * fbm(x * 0.0075 + 3.1, z * 0.004 + 1.7, 5))
  // a lone rounded hill to the side
  const dx = x + 165
  const dz = z + 150
  h += 34 * Math.exp(-(dx * dx + dz * dz) / (2 * 58 * 58))
  // a lower shoulder on the other side
  const ex = x - 190
  const ez = z + 95
  h += 16 * Math.exp(-(ex * ex + ez * ez) / (2 * 70 * 70))
  return h
}

/* ── shaders ───────────────────────────────────────────────────────────────── */
const TERRAIN_VERT = /* glsl */ `
varying vec3 vWorld;
varying vec3 vNormal;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  vNormal = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}
`

const TERRAIN_FRAG = /* glsl */ `
precision highp float;
varying vec3 vWorld;
varying vec3 vNormal;
uniform vec3 uLight;
uniform vec3 uFog;
uniform vec3 uHaze;
uniform float uFogDensity;
uniform float uTime;

float h1(float n) { return fract(sin(n) * 43758.5453); }
float h2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vn(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(h2(i), h2(i + vec2(1, 0)), u.x), mix(h2(i + vec2(0, 1)), h2(i + vec2(1, 1)), u.x), u.y);
}

vec3 lin(vec3 c) { return pow(c, vec3(2.2)); }

vec3 fieldColor(float h) {
  // wheat, ripe gold, young green, deep green, plowed soil, fallow, pale stubble
  if (h < 0.16) return lin(vec3(0.851, 0.722, 0.420));
  if (h < 0.30) return lin(vec3(0.780, 0.610, 0.330));
  if (h < 0.48) return lin(vec3(0.470, 0.585, 0.270));
  if (h < 0.62) return lin(vec3(0.300, 0.450, 0.240));
  if (h < 0.76) return lin(vec3(0.520, 0.385, 0.265));
  if (h < 0.88) return lin(vec3(0.690, 0.600, 0.430));
  return lin(vec3(0.800, 0.770, 0.560));
}

void main() {
  vec3 N = normalize(vNormal);
  vec2 wp = vWorld.xz;

  // field grid, slightly rotated, rows staggered like real holdings
  float a = 0.32;
  mat2 R = mat2(cos(a), -sin(a), sin(a), cos(a));
  vec2 p = R * wp;
  vec2 size = vec2(26.0, 15.0);
  float row = floor(p.y / size.y);
  p.x += h1(row * 7.13) * size.x;
  vec2 cell = floor(p / size);
  vec2 f = fract(p / size);
  float split = step(0.55, h2(cell + 17.0));
  float sub = split * step(0.5, f.x);
  f.x = mix(f.x, fract(f.x * 2.0), split);
  vec2 sz = vec2(mix(size.x, size.x * 0.5, split), size.y);
  float id = h2(cell + sub * 13.7 + 3.0);
  vec3 col = fieldColor(id);
  col *= 0.92 + 0.16 * vn(wp * 0.08 + id * 10.0);

  // furrows, each plot its own direction
  float ang = h2(cell + sub * 5.1 + 9.0) > 0.5 ? 0.0 : 1.5708;
  vec2 dir = R * vec2(cos(ang), sin(ang));
  float k = dot(wp, dir) * 5.0;
  float fw = fwidth(k);
  float fur = sin(k) * (1.0 - smoothstep(0.6, 2.2, fw));
  col *= 1.0 + fur * 0.075;

  // dirt tracks between plots
  vec2 e = min(f, 1.0 - f) * sz;
  float edge = min(e.x, e.y);
  float ew = fwidth(edge) * 1.5 + 0.25;
  float track = 1.0 - smoothstep(0.35, 0.35 + ew, edge);
  col = mix(col, lin(vec3(0.80, 0.72, 0.58)), track * 0.75);

  // hills turn to scrub and oak woodland
  float slope = 1.0 - N.y;
  float wild = smoothstep(4.0, 11.0, vWorld.y) + smoothstep(0.18, 0.4, slope);
  vec3 scrub = lin(mix(vec3(0.42, 0.45, 0.30), vec3(0.30, 0.36, 0.24), vn(wp * 0.15)));
  scrub = mix(scrub, lin(vec3(0.60, 0.55, 0.42)), vn(wp * 0.05 + 4.0) * 0.5);
  col = mix(col, scrub, clamp(wild, 0.0, 1.0));

  // light: soft lambert + sky fill
  float diff = max(dot(N, normalize(uLight)), 0.0);
  col *= 0.58 + 0.62 * diff;

  // aerial perspective, then exp2 fog (same curve as scene.fog)
  float d = length(vWorld - cameraPosition);
  col = mix(col, uHaze, smoothstep(90.0, 300.0, d) * 0.72);
  float fog = 1.0 - exp(-uFogDensity * uFogDensity * d * d);
  col = mix(col, uFog, clamp(fog, 0.0, 1.0));

  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`

const SKY_VERT = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww;
}
`
const SKY_FRAG = /* glsl */ `
precision highp float;
varying vec3 vDir;
uniform vec3 uTop;
uniform vec3 uHorizon;
uniform vec3 uSun;
void main() {
  vec3 d = normalize(vDir);
  float t = smoothstep(-0.02, 0.42, d.y);
  vec3 col = mix(uHorizon, uTop, t);
  float s = max(dot(d, normalize(uSun)), 0.0);
  col += vec3(1.0, 0.70, 0.35) * (pow(s, 7.0) * 0.22 + pow(s, 90.0) * 0.5);
  col = mix(col, vec3(1.0, 0.98, 0.92), smoothstep(0.9993, 0.9998, s));
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`

const WAY_VERT = /* glsl */ `
attribute float aAlong;
attribute float aSide;
varying float vAlong;
varying float vSide;
varying vec3 vWorld;
void main() {
  vAlong = aAlong;
  vSide = aSide;
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`
const WAY_FRAG = /* glsl */ `
precision highp float;
varying float vAlong;
varying float vSide;
varying vec3 vWorld;
uniform float uDraw;
uniform vec3 uColor;
uniform vec3 uFog;
uniform float uFogDensity;
uniform float uTime;
void main() {
  if (vAlong > uDraw) discard;
  // soft edges across the line
  float edge = 1.0 - smoothstep(0.55, 1.0, abs(vSide));
  // a bright head where the line is still being drawn
  float head = smoothstep(uDraw - 0.035, uDraw, vAlong) * step(uDraw, 0.999);
  vec3 col = uColor * (1.0 + head * 0.6);
  // a faint pulse travelling toward the place
  col += vec3(1.0, 0.6, 0.2) * 0.18 * pow(0.5 + 0.5 * sin(vAlong * 60.0 - uTime * 2.4), 6.0);
  float d = length(vWorld - cameraPosition);
  float fog = 1.0 - exp(-uFogDensity * uFogDensity * d * d * 0.55);
  col = mix(col, uFog, clamp(fog, 0.0, 1.0));
  gl_FragColor = vec4(col, edge);
  #include <colorspace_fragment>
}
`

/* ── the way: control points across the valley floor (x, z) ────────────────── */
const WAY_POINTS = [
  [7, 74], [1, 56], [-6, 38], [2, 18], [9, -2], [0, -24],
  [-9, -44], [-3, -66], [6, -86], [2, -104], [0, -118],
]
// camera rails, authored for framing (x, y-above-ground, z)
const CAM_POINTS = [
  [0, 11, 92], [-2, 10.5, 66], [3, 11.5, 40], [-1, 13, 14],
  [3, 15, -12], [-2, 19, -40], [1, 27, -66], [0, 40, -84],
]
const LOOK_POINTS = [
  [0, 21, -60], [0, 6, -70], [0, 0, -84], [0, 0, -96],
  [0, 0, -106], [0, 0, -112], [0, 0, -117], [0, 0, -118],
]

function buildRibbon(curve, width, lift, samples) {
  const pts = curve.getSpacedPoints(samples)
  const pos = new Float32Array((samples + 1) * 2 * 3)
  const along = new Float32Array((samples + 1) * 2)
  const side = new Float32Array((samples + 1) * 2)
  const idx = []
  const tan = new Vector3()
  for (let i = 0; i <= samples; i++) {
    const p = pts[i]
    const q = pts[Math.min(i + 1, samples)]
    const o = pts[Math.max(i - 1, 0)]
    tan.set(q.x - o.x, 0, q.z - o.z).normalize()
    const nx = -tan.z
    const nz = tan.x
    for (let s = 0; s < 2; s++) {
      const sign = s === 0 ? 1 : -1
      const x = p.x + nx * width * 0.5 * sign
      const z = p.z + nz * width * 0.5 * sign
      const k = (i * 2 + s) * 3
      pos[k] = x
      pos[k + 1] = heightAt(x, z) + lift
      pos[k + 2] = z
      along[i * 2 + s] = i / samples
      side[i * 2 + s] = sign
    }
    if (i < samples) {
      const a = i * 2
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
    }
  }
  const g = new BufferGeometry()
  g.setAttribute('position', new BufferAttribute(pos, 3))
  g.setAttribute('aAlong', new BufferAttribute(along, 1))
  g.setAttribute('aSide', new BufferAttribute(side, 1))
  g.setIndex(idx)
  return { geometry: g, points: pts }
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{ onFrame?: (marker: {x:number,y:number,visible:boolean}) => void, lite?: boolean }} opts
 */
export function createValley(canvas, { onFrame, lite = false } = {}) {
  let renderer
  try {
    // high-density screens are already smooth; skip MSAA there and on phones
    const dense = (window.devicePixelRatio || 1) >= 1.5
    renderer = new WebGLRenderer({ canvas, antialias: !lite && !dense, alpha: false, powerPreference: 'high-performance' })
  } catch {
    return null
  }
  if (!renderer.getContext()) return null
  renderer.outputColorSpace = SRGBColorSpace
  const maxDpr = lite ? 1.25 : 1.5
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr))

  const scene = new Scene()
  scene.background = HORIZON.clone()
  scene.fog = new FogExp2(HORIZON.clone(), FOG_DENSITY)

  const camera = new PerspectiveCamera(42, 1, 0.5, 1400)

  /* sun & light */
  const sunDir = new Vector3(-0.5, 0.16, -0.85).normalize()
  const lightDir = new Vector3(-0.55, 0.62, 0.35).normalize()
  scene.add(new HemisphereLight('#eef3f6', '#8a7a55', 1.1))
  const dl = new DirectionalLight('#fff3df', 1.6)
  dl.position.copy(lightDir).multiplyScalar(100)
  scene.add(dl)

  /* sky dome (follows the camera) */
  const sky = new Mesh(
    new SphereGeometry(900, 32, 16),
    new ShaderMaterial({
      vertexShader: SKY_VERT,
      fragmentShader: SKY_FRAG,
      side: BackSide,
      depthWrite: false,
      uniforms: {
        uTop: { value: SKY_TOP.clone() },
        uHorizon: { value: HORIZON.clone() },
        uSun: { value: sunDir },
      },
    })
  )
  sky.renderOrder = -1
  scene.add(sky)

  /* terrain */
  const W = 620
  const D = 560
  const seg = lite ? 130 : 200
  const tg = new PlaneGeometry(W, D, seg, seg)
  tg.rotateX(-Math.PI / 2)
  tg.translate(0, 0, -150)
  const tp = tg.attributes.position
  for (let i = 0; i < tp.count; i++) {
    tp.setY(i, heightAt(tp.getX(i), tp.getZ(i)))
  }
  tg.computeVertexNormals()
  const terrainMat = new ShaderMaterial({
    vertexShader: TERRAIN_VERT,
    fragmentShader: TERRAIN_FRAG,
    uniforms: {
      uLight: { value: lightDir },
      uFog: { value: HORIZON.clone() },
      uHaze: { value: HAZE.clone() },
      uFogDensity: { value: FOG_DENSITY },
      uTime: { value: 0 },
    },
  })
  scene.add(new Mesh(tg, terrainMat))

  /* the way */
  const wayCurve = new CatmullRomCurve3(WAY_POINTS.map(([x, z]) => new Vector3(x, 0, z)), false, 'centripetal')
  const samples = lite ? 400 : 700
  const road = buildRibbon(wayCurve, 3.4, 0.22, samples)
  const roadMesh = new Mesh(
    road.geometry,
    new MeshLambertMaterial({ color: '#d9c8a4', polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 })
  )
  scene.add(roadMesh)

  const line = buildRibbon(wayCurve, 1.05, 0.32, samples)
  const wayMat = new ShaderMaterial({
    vertexShader: WAY_VERT,
    fragmentShader: WAY_FRAG,
    transparent: true,
    depthWrite: false,
    side: DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -4,
    polygonOffsetUnits: -4,
    uniforms: {
      uDraw: { value: 0 },
      uColor: { value: new Color('#ff8714') },
      uFog: { value: HORIZON.clone() },
      uFogDensity: { value: FOG_DENSITY },
      uTime: { value: 0 },
    },
  })
  const wayMesh = new Mesh(line.geometry, wayMat)
  wayMesh.renderOrder = 2
  scene.add(wayMesh)

  /* the place: a ring on the ground, pulsing */
  const end = wayCurve.getPointAt(1)
  end.y = heightAt(end.x, end.z)
  const ringMat = new MeshBasicMaterial({ color: '#ff8714', transparent: true, opacity: 0.9, depthWrite: false, side: DoubleSide })
  const ring = new Mesh(new RingGeometry(2.2, 2.9, 48), ringMat)
  ring.rotation.x = -Math.PI / 2
  ring.position.set(end.x, end.y + 0.45, end.z)
  scene.add(ring)
  const pulseMat = ringMat.clone()
  const pulse = new Mesh(new RingGeometry(2.6, 3.0, 48), pulseMat)
  pulse.rotation.x = -Math.PI / 2
  pulse.position.copy(ring.position)
  scene.add(pulse)
  const dot = new Mesh(new SphereGeometry(1.1, 20, 12), new MeshBasicMaterial({ color: '#ff8714' }))
  dot.position.set(end.x, end.y + 1.1, end.z)
  scene.add(dot)

  /* trees */
  const nearWay = (x, z, r) => {
    const pts = road.points
    for (let i = 0; i < pts.length; i += 6) {
      const dx = pts[i].x - x
      const dz = pts[i].z - z
      if (dx * dx + dz * dz < r * r) return true
    }
    return false
  }
  const m4 = new Matrix4()
  const o3 = new Object3D()
  const treeMat = new MeshLambertMaterial({ color: '#ffffff' })
  const cypressMat = new MeshLambertMaterial({ color: '#2c4529' })

  // cypress windbreaks along field lines
  const cyp = []
  const rows = lite ? 16 : 30
  const ga = 0.32
  for (let r = 0; r < rows; r++) {
    const ox = (hash2(r, 1.3) - 0.5) * 380
    const oz = -260 + hash2(r, 7.7) * 330
    const along = hash2(r, 3.1) > 0.5
    const dirx = along ? Math.cos(ga) : -Math.sin(ga)
    const dirz = along ? -Math.sin(ga) : -Math.cos(ga)
    const len = 30 + hash2(r, 9.9) * 70
    for (let t = 0; t < len; t += 3.2) {
      const x = ox + dirx * t
      const z = oz + dirz * t
      if (z > 60 || nearWay(x, z, 5)) continue
      if (heightAt(x, z) > 9) continue
      cyp.push([x, z])
    }
  }
  // a cypress: a narrow flame, widest a quarter of the way up
  const prof = [
    [0, 0], [0.62, 0.3], [0.86, 1.4], [0.9, 2.2], [0.8, 3.6], [0.58, 5.0], [0.32, 6.4], [0.08, 7.6], [0, 7.8],
  ].map(([r, y]) => new Vector2(r, y))
  const cypGeo = new LatheGeometry(prof, 8)
  const cypMesh = new InstancedMesh(cypGeo, cypressMat, cyp.length)
  cyp.forEach(([x, z], i) => {
    const s = 0.8 + hash2(x, z) * 0.5
    o3.position.set(x, heightAt(x, z) - 0.2, z)
    o3.scale.set(s, s * (0.9 + hash2(z, x) * 0.4), s)
    o3.rotation.set(0, hash2(x, x) * 6, 0)
    o3.updateMatrix()
    cypMesh.setMatrixAt(i, o3.matrix)
  })
  scene.add(cypMesh)

  // orchard clumps + scattered oaks
  const oaks = []
  const clumps = lite ? 26 : 50
  for (let c = 0; c < clumps; c++) {
    const cx = (hash2(c, 4.4) - 0.5) * 420
    const cz = -280 + hash2(c, 8.8) * 340
    const n = 4 + Math.floor(hash2(c, 2.2) * 10)
    for (let k = 0; k < n; k++) {
      const x = cx + (hash2(c, k + 0.5) - 0.5) * 22
      const z = cz + (hash2(k, c + 0.5) - 0.5) * 16
      if (z > 70 || nearWay(x, z, 5)) continue
      oaks.push([x, z])
    }
  }
  // a few close to the way, so the road feels walked
  for (let i = 0; i < (lite ? 14 : 26); i++) {
    const p = road.points[Math.floor(hash2(i, 0.7) * road.points.length * 0.9)]
    const side = hash2(i, 1.9) > 0.5 ? 1 : -1
    const x = p.x + side * (6 + hash2(i, 5.5) * 10)
    const z = p.z + (hash2(i, 6.6) - 0.5) * 6
    if (!nearWay(x, z, 4.5)) oaks.push([x, z])
  }
  const oakGeo = new IcosahedronGeometry(2.0, 1)
  {
    const a = oakGeo.attributes.position
    for (let i = 0; i < a.count; i++) {
      const x = a.getX(i), y = a.getY(i), z = a.getZ(i)
      const k = 0.82 + 0.36 * hash2(Math.round(x * 10), Math.round(y * 10 + z * 7))
      a.setXYZ(i, x * k, y * k * 0.9, z * k)
    }
    oakGeo.computeVertexNormals()
  }
  oakGeo.translate(0, 2.0, 0)
  const clear = oaks.filter(([x, z]) => {
    for (const [cx, , cz] of CAM_POINTS) {
      if ((cx - x) ** 2 + (cz - z) ** 2 < 15 * 15) return false
    }
    return z < 60
  })
  oaks.length = 0
  oaks.push(...clear)
  const oakMesh = new InstancedMesh(oakGeo, treeMat, oaks.length)
  const tint = new Color()
  oaks.forEach(([x, z], i) => {
    tint.set(['#3d5a33', '#4a6338', '#34512f', '#5b6b3a'][Math.floor(hash2(z, x) * 4)])
    oakMesh.setColorAt(i, tint)
    const s = 0.55 + hash2(x, z) * 0.55
    o3.position.set(x, heightAt(x, z) - 0.3, z)
    o3.scale.set(s * 1.15, s * 0.85, s)
    o3.rotation.set(0, hash2(z, z) * 6, 0)
    o3.updateMatrix()
    oakMesh.setMatrixAt(i, o3.matrix)
  })
  scene.add(oakMesh)

  /* camera rails */
  const toV = ([x, y, z]) => new Vector3(x, heightAt(x, z) + y, z)
  const camCurve = new CatmullRomCurve3(CAM_POINTS.map(toV), false, 'centripetal')
  const lookCurve = new CatmullRomCurve3(LOOK_POINTS.map(([x, y, z]) => new Vector3(x, y + heightAt(x, z), z)))

  /* state */
  let progress = 0
  let progressSmooth = 0
  const pointer = new Vector2()
  const pointerSmooth = new Vector2()
  let draw = 0
  let raf = 0
  let running = false
  let destroyed = false
  const t0 = performance.now()
  const marker = { x: 0, y: 0, visible: false }
  const projected = new Vector3()
  const camPos = new Vector3()
  const lookAt = new Vector3()

  function resize() {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    if (!w || !h) return
    const c = renderer.domElement
    const dpr = renderer.getPixelRatio()
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
      renderer.setSize(w, h, false)
    }
    camera.aspect = w / h
    // portrait screens: widen the lens so the valley still reads as a valley
    camera.fov = w / h < 0.8 ? 58 : w / h < 1.2 ? 50 : 42
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()

  // While nothing is moving (no scroll, no pointer, the way fully drawn) the
  // scene only breathes, so it renders every other frame to spare the GPU.
  let tick = 0
  let lastDraw = -1
  function frame(now) {
    if (!running || destroyed) return
    raf = requestAnimationFrame(frame)
    tick++
    const moving =
      Math.abs(progress - progressSmooth) > 0.0005 ||
      pointer.distanceToSquared(pointerSmooth) > 0.00005 ||
      draw !== lastDraw
    lastDraw = draw
    if (!moving && tick % 2) return
    render(now)
  }

  function render(now = performance.now()) {
    const t = (now - t0) / 1000
    progressSmooth += (progress - progressSmooth) * 0.1
    pointerSmooth.lerp(pointer, 0.05)

    const p = MathUtils.clamp(progressSmooth, 0, 1)
    camCurve.getPointAt(p, camPos)
    lookCurve.getPointAt(p, lookAt)

    // breathing + pointer parallax (fades out as we arrive)
    const calm = 1 - p * 0.7
    camPos.x += pointerSmooth.x * 3.2 * calm + Math.sin(t * 0.21) * 0.35
    camPos.y += -pointerSmooth.y * 1.4 * calm + Math.sin(t * 0.17) * 0.18
    lookAt.x += pointerSmooth.x * 1.6 * calm
    camera.position.copy(camPos)
    camera.lookAt(lookAt)
    sky.position.copy(camPos)

    terrainMat.uniforms.uTime.value = t
    wayMat.uniforms.uTime.value = t
    wayMat.uniforms.uDraw.value = draw

    const pt = (t % 2.4) / 2.4
    pulse.scale.setScalar(1 + pt * 2.2)
    pulseMat.opacity = 0.75 * (1 - pt)

    renderer.render(scene, camera)

    if (onFrame) {
      projected.set(end.x, end.y + 3.2, end.z).project(camera)
      marker.visible = projected.z < 1 && Math.abs(projected.x) < 1.1 && Math.abs(projected.y) < 1.1
      marker.x = (projected.x * 0.5 + 0.5) * canvas.clientWidth
      marker.y = (-projected.y * 0.5 + 0.5) * canvas.clientHeight
      onFrame(marker)
    }
  }

  return {
    start() {
      if (running || destroyed) return
      running = true
      raf = requestAnimationFrame(frame)
    },
    stop() {
      running = false
      cancelAnimationFrame(raf)
    },
    /** Render one frame now (static / reduced-motion use). */
    renderOnce() {
      progressSmooth = progress
      pointerSmooth.copy(pointer)
      render()
    },
    setProgress(v) {
      progress = MathUtils.clamp(v, 0, 1)
    },
    /** -1..1 in both axes, from the centre of the canvas. */
    setPointer(x, y) {
      pointer.set(x, y)
    },
    /** 0..1 — how much of the way is drawn. */
    setDraw(v) {
      draw = MathUtils.clamp(v, 0, 1)
    },
    destroy() {
      destroyed = true
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      scene.traverse((o) => {
        o.geometry?.dispose?.()
        if (o.material) [].concat(o.material).forEach((m) => m.dispose())
      })
      renderer.dispose()
    },
  }
}
