import QRCode from 'qrcode'

// High error correction so the logo knocked out of the centre (≈22% wide)
// still scans reliably from the back of a lecture hall.
const OPTS = {
  errorCorrectionLevel: 'H',
  color: { dark: '#0d1b4bff', light: '#ffffffff' },
}
export const LOGO_RATIO = 0.22

export const qrSvg = (url) => QRCode.toString(url, { ...OPTS, type: 'svg', margin: 0 })

async function logoDataUrl() {
  const blob = await (await fetch('/logo.png')).blob()
  return new Promise((resolve) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result)
    r.readAsDataURL(blob)
  })
}

function save(href, filename) {
  const a = document.createElement('a')
  a.href = href
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}

/** 1200px PNG with a white quiet zone and the logo — for Keynote / PowerPoint. */
export async function downloadPng(url, filename) {
  const canvas = document.createElement('canvas')
  await QRCode.toCanvas(canvas, url, { ...OPTS, margin: 3, width: 1200 })
  const ctx = canvas.getContext('2d')
  // onload, not img.decode(): decode() waits for a rendered frame, so it can
  // hang in a background tab and the download silently never happens.
  const src = await logoDataUrl()
  const img = new Image()
  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
    img.src = src
  })
  const s = canvas.width * LOGO_RATIO
  const x = (canvas.width - s) / 2
  ctx.fillStyle = '#fff'
  ctx.beginPath()
  ctx.roundRect(x, x, s, s, s * 0.18)
  ctx.fill()
  const pad = s * 0.12
  ctx.drawImage(img, x + pad, x + pad, s - pad * 2, s - pad * 2)
  save(canvas.toDataURL('image/png'), filename)
}

/** Vector version (logo embedded), scales to any size. */
export async function downloadSvg(url, filename) {
  const svg = await QRCode.toString(url, { ...OPTS, type: 'svg', margin: 3 })
  const size = Number(svg.match(/viewBox="0 0 (\d+) /)[1])
  const s = size * LOGO_RATIO
  const x = (size - s) / 2
  const pad = s * 0.12
  const logo = await logoDataUrl()
  const overlay =
    `<rect x="${x}" y="${x}" width="${s}" height="${s}" rx="${s * 0.18}" fill="#fff"/>` +
    `<image href="${logo}" x="${x + pad}" y="${x + pad}" width="${s - pad * 2}" height="${s - pad * 2}"/>`
  const out = svg.replace('</svg>', `${overlay}</svg>`)
  save(URL.createObjectURL(new Blob([out], { type: 'image/svg+xml' })), filename)
}
