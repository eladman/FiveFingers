import { useEffect, useState } from 'react'
import { qrSvg, LOGO_RATIO } from './qr'

/** The lecture's QR with the logo knocked out of the centre. Fills its parent's width. */
export default function QrCode({ url, className = '' }) {
  const [svg, setSvg] = useState('')
  useEffect(() => {
    let live = true
    qrSvg(url).then((s) => live && setSvg(s))
    return () => {
      live = false
    }
  }, [url])

  const pct = `${LOGO_RATIO * 100}%`
  return (
    <div className={`relative aspect-square w-full ${className}`} role="img" aria-label={`קוד QR לכתובת ${url}`}>
      {svg && <div className="fb-qr absolute inset-0" dangerouslySetInnerHTML={{ __html: svg }} />}
      <div
        className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[18%] bg-white"
        style={{ width: pct, height: pct }}
      >
        <img src="/logo.png" alt="" className="h-[76%] w-[76%] object-contain" />
      </div>
    </div>
  )
}
