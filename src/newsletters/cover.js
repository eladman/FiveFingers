/**
 * The link-preview picture ("cover") for a newsletter: what WhatsApp shows
 * above the title when the link is sent.
 *
 * Staff pick any picture and drag it to frame it; we crop it here in the
 * browser to WhatsApp's 1.91:1 card (1200×630) and compress it under ~290 KB.
 * WhatsApp silently drops preview images much bigger than ~300 KB.
 */

export const COVER_W = 1200
export const COVER_H = 630
const RATIO = COVER_W / COVER_H
const MAX_BYTES = 290 * 1024

/** Big enough for WhatsApp's large preview rather than the small square thumbnail. */
export const MIN_W = 300

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    // Remote pictures must allow CORS or the canvas can't export them. Ones
    // that don't simply fail to load here and aren't offered.
    if (!/^(data|blob):/i.test(src)) img.crossOrigin = 'anonymous'
    img.decoding = 'async'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('image failed to load'))
    img.src = src
  })
}

/**
 * The crop for a source image: a 1.91:1 window, slid along the axis that
 * overflows by fx / fy (0..1). Same maths as CSS `object-fit: cover` with
 * `object-position: fx% fy%`, so the editor's card matches the output.
 */
function crop(iw, ih, fx, fy) {
  let cw = iw
  let ch = ih
  if (iw / ih > RATIO) cw = ih * RATIO
  else ch = iw / RATIO
  return { sx: (iw - cw) * fx, sy: (ih - ch) * fy, cw, ch }
}

/** Renders the framed cover. Returns base64 JPEG (no data: prefix). */
export async function renderCover({ src, fx = 0.5, fy = 0.5 }) {
  const img = await loadImage(src)
  const { sx, sy, cw, ch } = crop(img.naturalWidth, img.naturalHeight, fx, fy)
  const w = Math.round(Math.min(COVER_W, cw))
  const h = Math.round(w / RATIO)

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#fff' // transparent PNGs would turn black as JPEG
  ctx.fillRect(0, 0, w, h)
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(img, sx, sy, cw, ch, 0, 0, w, h)

  let b64 = ''
  for (const q of [0.86, 0.8, 0.72, 0.64, 0.55, 0.45]) {
    const url = canvas.toDataURL('image/jpeg', q)
    b64 = url.slice(url.indexOf(',') + 1)
    if ((b64.length * 3) / 4 <= MAX_BYTES) break
  }
  return b64
}

export const coverDataUrl = (b64) => `data:image/jpeg;base64,${b64}`

/**
 * Pictures already in the newsletter, in page order: <img> tags, og:image and
 * CSS backgrounds. Only embedded (data:) and https pictures; relative paths in
 * an uploaded file point nowhere. Parsing with DOMParser runs no scripts, so
 * pictures a React artifact adds at runtime aren't found. Upload those.
 */
export function findImages(html) {
  if (!html) return []
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const found = []
  doc.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach((m) => found.push(m.getAttribute('content')))
  doc.querySelectorAll('img[src]').forEach((i) => found.push(i.getAttribute('src')))
  const css = [
    ...[...doc.querySelectorAll('style')].map((s) => s.textContent),
    ...[...doc.querySelectorAll('[style]')].map((e) => e.getAttribute('style')),
  ].join('\n')
  for (const m of css.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/g)) found.push(m[2])

  return [...new Set(found.map((s) => (s || '').trim()))]
    .filter((s) => /^https:\/\//i.test(s) || /^data:image\/(png|jpe?g|webp|gif|avif)/i.test(s))
    .slice(0, 40)
}

/** findImages, keeping only the ones that load and are big enough. */
export async function usableImages(html, limit = 8) {
  const results = await Promise.allSettled(findImages(html).map(loadImage))
  return results
    .filter((r) => r.status === 'fulfilled' && r.value.naturalWidth >= MIN_W && r.value.naturalHeight >= MIN_W / RATIO)
    .map((r) => r.value.src)
    .slice(0, limit)
}
