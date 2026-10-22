import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import QrCode from './QrCode'
import { lectureUrl } from './data'
import { questionsFor } from '../feedback/questions'

/**
 * Full-screen projector slide for the end of the lecture — one statement,
 * one QR. Opens in browser fullscreen; Esc or ✕ closes it.
 */
export default function PresentSlide({ lecture, onClose }) {
  const ref = useRef(null)
  // Latest onClose without re-running the fullscreen effect on every render.
  const closeRef = useRef(onClose)
  closeRef.current = onClose
  const url = lectureUrl(lecture.code)
  const shortUrl = url.replace(/^https?:\/\//, '')
  const count = questionsFor(lecture.audience).length

  useEffect(() => {
    ref.current?.requestFullscreen?.().catch(() => {})
    const onKey = (e) => e.key === 'Escape' && closeRef.current()
    const onFs = () => !document.fullscreenElement && closeRef.current()
    window.addEventListener('keydown', onKey)
    document.addEventListener('fullscreenchange', onFs)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('fullscreenchange', onFs)
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    }
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-navy-deep"
      dir="rtl"
      role="dialog"
      aria-label="מצב הצגה"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute left-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
        aria-label="סגירת מצב הצגה"
      >
        <X size={20} />
      </button>

      {/* 16:9 stage, scaled to fit any screen */}
      <div
        className="relative overflow-hidden"
        style={{
          width: 'min(100vw, 177.78vh)',
          height: 'min(56.25vw, 100vh)',
          background: 'radial-gradient(120% 90% at 85% 10%, var(--navy-light) 0%, var(--navy) 45%, var(--navy-deep) 100%)',
        }}
      >
        <div className="fb-glow" aria-hidden="true" />
        <div className="relative z-10 grid h-full grid-cols-[1.25fr_1fr] items-center gap-[5%] px-[6%]">
          <div className="text-white">
            <p className="ds-eyebrow text-orange" style={{ fontSize: 'min(1.4vw, 2.5vh)', marginBottom: '3%' }}>
              עמיר מנחם · {lecture.title}
            </p>
            <h1 className="font-ragmarom leading-[0.92] tracking-[-0.02em]" style={{ fontSize: 'min(7vw, 12.4vh)' }}>
              רגע לפני
              <br />
              שיוצאים <span className="text-orange">לזירה.</span>
            </h1>
            <p className="text-white/70" style={{ fontSize: 'min(2vw, 3.6vh)', marginTop: '4%' }}>
              סרקו ותנו לנו משוב — {count} שאלות, פחות משתי דקות.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full max-w-[44vh] rounded-[2vh] bg-white p-[6%] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <QrCode url={url} />
            </div>
            <p className="font-inter tracking-wide text-white/60" dir="ltr" style={{ fontSize: 'min(1.4vw, 2.5vh)', marginTop: '6%' }}>
              {shortUrl}
            </p>
          </div>
        </div>

        <img src="/logo.png" alt="חמש אצבעות" className="absolute bottom-[5%] right-[6%] z-10 w-[4%] object-contain" />
        <div className="absolute bottom-0 left-[6%] z-10 flex h-[9%] items-end gap-[0.6vw]" aria-hidden="true">
          {[40, 55, 70, 85, 100].map((h, i) => (
            <span key={i} className="w-[0.9vw] rounded-t-full" style={{ height: `${h}%`, background: i === 4 ? 'var(--orange)' : 'rgba(255,255,255,0.14)' }} />
          ))}
        </div>
      </div>
    </div>
  )
}
