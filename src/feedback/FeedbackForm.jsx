import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Check, Headphones, Instagram, Mic2, Send, Loader2 } from 'lucide-react'
import { isValidEmail } from './api'
import { formatDate } from './format'

/**
 * Participant view — what the audience opens from the QR after the lecture.
 *
 * Phone-first, one question per screen (the Apple-direct rule: one idea gets
 * the whole stage). Single-pick questions auto-advance; the rest wait for
 * "המשך". The progress bar is rising pillars — the logo's five fingers.
 *
 * `onSubmit(answers)` is async and resolves to `{ error? }`; on error the
 * answers are kept and the listener can retry.
 */
export default function FeedbackForm({ lecture, questions, onSubmit }) {
  const [step, setStep] = useState(-1) // -1 welcome · 0..n-1 questions · n done
  const [answers, setAnswers] = useState({})
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)
  const advanceTimer = useRef(null)
  const n = questions.length
  const q = questions[step]
  const isLast = step === n - 1

  useEffect(() => () => clearTimeout(advanceTimer.current), [])

  const set = (id, value) => setAnswers((a) => ({ ...a, [id]: value }))
  const answered = q ? isAnswered(q, answers) : true
  const canNext = q ? (q.required ? answered : isOptionalValid(q, answers)) : true

  const submit = async () => {
    setSending(true)
    setSendError(false)
    const { error } = await onSubmit(answers)
    setSending(false)
    if (error) setSendError(true)
    else setStep(n)
  }

  const next = () => {
    clearTimeout(advanceTimer.current)
    if (!canNext || sending) return
    if (isLast) submit()
    else setStep((s) => Math.min(s + 1, n - 1))
  }
  const back = () => {
    clearTimeout(advanceTimer.current)
    setSendError(false)
    setStep((s) => Math.max(s - 1, -1))
  }

  // Single-pick questions move on by themselves after a beat, so a phone user
  // can fly through with one thumb. The last question always waits for "שליחה".
  const pickAndAdvance = (id, value) => {
    set(id, value)
    clearTimeout(advanceTimer.current)
    if (!isLast) advanceTimer.current = setTimeout(() => setStep((s) => Math.min(s + 1, n - 1)), 420)
  }

  return (
    <div className="fb-stage relative min-h-[100dvh] text-white overflow-hidden" dir="rtl">
      <div className="fb-glow" aria-hidden="true" />

      {step === -1 && <Welcome lecture={lecture} count={n} onStart={() => setStep(0)} />}

      {q && (
        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-xl flex-col px-5 pb-6 pt-5">
          <header className="flex items-center justify-between gap-4">
            <button type="button" onClick={back} className="fb-icon-btn" aria-label="לשאלה הקודמת">
              <ChevronRight size={20} />
            </button>
            <Progress current={step} total={n} />
            <img src="/logo.png" alt="חמש אצבעות" className="h-8 w-8 object-contain" />
          </header>

          <main key={q.id} className="fb-in flex flex-1 flex-col justify-center py-8">
            <p className="ds-eyebrow text-orange mb-4">
              שאלה {step + 1} מתוך {n}
              {!q.required && <span className="text-white/45"> · לא חובה</span>}
            </p>
            <h1 className="font-ragmarom text-[clamp(2rem,7.6vw,3.2rem)] leading-[1.05] tracking-[-0.01em]">
              {q.title}
            </h1>
            {q.subtitle && <p className="mt-3 text-white/60 text-base">{q.subtitle}</p>}

            <div className="mt-9">
              {q.type === 'scale' && (
                <ScaleFingers value={answers[q.id]} labels={q.labels} onPick={(v) => pickAndAdvance(q.id, v)} />
              )}
              {q.type === 'multi' && (
                <Multi q={q} value={answers[q.id] || []} onChange={(v) => set(q.id, v)} />
              )}
              {q.type === 'choice' && (
                <Choice
                  q={q}
                  value={answers[q.id]}
                  otherText={answers[q.otherId] || ''}
                  onPick={(v) => {
                    const isOther = q.options.find((o) => o.value === v)?.other
                    if (isOther) set(q.id, v)
                    else pickAndAdvance(q.id, v)
                  }}
                  onOtherText={(t) => set(q.otherId, t)}
                />
              )}
              {q.type === 'text' && (
                <TextAnswer value={answers[q.id] || ''} placeholder={q.placeholder} onChange={(v) => set(q.id, v)} onSubmit={next} />
              )}
              {q.type === 'yesno' && (
                <YesNo
                  q={q}
                  value={answers[q.id]}
                  email={answers[q.emailId] || ''}
                  // "כן" opens the email field, so it never auto-advances.
                  onPick={(v) => (v ? set(q.id, v) : pickAndAdvance(q.id, v))}
                  onEmail={(e) => set(q.emailId, e)}
                />
              )}
            </div>
          </main>

          <footer>
            {sendError && (
              <p className="mb-3 rounded-2xl bg-white/[0.06] px-4 py-3 text-center text-sm text-white/80" role="alert">
                השליחה לא הצליחה. בדקו את החיבור לאינטרנט ונסו שוב — התשובות נשמרו כאן.
              </p>
            )}
            <button type="button" onClick={next} disabled={!canNext || sending} className="fb-primary w-full">
              {isLast ? (
                sending ? (
                  <>שולחים… <Loader2 size={18} className="animate-spin" /></>
                ) : (
                  <>{sendError ? 'ניסיון נוסף' : 'שליחה'} <Send size={18} className="-scale-x-100" /></>
                )
              ) : (
                <>{answered || q.required ? 'המשך' : 'דלגו'} <ChevronLeft size={20} /></>
              )}
            </button>
          </footer>
        </div>
      )}

      {step === n && <Done />}
    </div>
  )
}

/* ─── Validation ───────────────────────────────────────────── */

function isAnswered(q, answers) {
  const v = answers[q.id]
  switch (q.type) {
    case 'text':
      return typeof v === 'string' && v.trim().length > 0
    case 'multi':
      return Array.isArray(v) && v.length > 0
    case 'choice': {
      if (v === undefined || v === null) return false
      const other = q.options.find((o) => o.value === v)?.other
      return !other || Boolean(answers[q.otherId]?.trim())
    }
    case 'yesno':
      if (typeof v !== 'boolean') return false
      return !(v && q.emailOnYes) || isValidEmail(answers[q.emailId])
    default:
      return v !== undefined && v !== null
  }
}

/** An optional question may be skipped, but a half-filled answer must be valid. */
function isOptionalValid(q, answers) {
  const v = answers[q.id]
  if (v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length)) return true
  return q.type === 'text' ? true : isAnswered(q, answers)
}

/* ─── Welcome ─────────────────────────────────────────────── */

function Welcome({ lecture, count, onStart }) {
  return (
    <div className="relative z-10 flex min-h-[100dvh] flex-col">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/Amir_pics/amir-stage.webp"
          alt=""
          className="h-full w-full object-cover opacity-55"
          style={{ objectPosition: 'center 20%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/85 to-navy-deep/10" />
      </div>

      <div className="relative mx-auto flex w-full max-w-xl flex-1 flex-col justify-end px-6 pb-8 pt-6">
        <img src="/logo.png" alt="חמש אצבעות" className="absolute top-6 right-6 h-10 w-10 object-contain" />

        <div className="fb-in">
          <p className="ds-eyebrow text-orange mb-4">עמיר מנחם · {lecture.title}</p>
          <h1 className="font-ragmarom text-[clamp(3rem,13vw,5rem)] leading-[0.95] tracking-[-0.02em]">
            תודה שהייתם
            <br />
            <span className="text-orange">בזירה.</span>
          </h1>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-white/75">
            עכשיו תורכם. {count} שאלות קצרות, פחות משתי דקות — וזה עוזר לנו להשתפר.
          </p>

          <button type="button" onClick={onStart} className="fb-primary mt-8 w-full">
            בואו נתחיל <ChevronLeft size={20} />
          </button>
          <p className="mt-4 text-center text-sm text-white/45">
            {formatDate(lecture.lecture_date)} · אנונימי, אלא אם תבחרו להשאיר מייל
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Progress — rising pillars ──────────────────────────── */

function Progress({ current, total }) {
  return (
    <div
      className="flex items-end gap-1.5 h-7"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      aria-label={`שאלה ${current + 1} מתוך ${total}`}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className="w-2.5 rounded-full transition-all duration-500 ease-brand"
          style={{
            height: `${45 + (i / Math.max(total - 1, 1)) * 55}%`,
            background: i <= current ? 'var(--orange)' : 'rgba(255,255,255,0.16)',
            boxShadow: i === current ? '0 0 14px rgba(255,135,20,0.6)' : 'none',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Question types ─────────────────────────────────────── */

function ScaleFingers({ value, labels, onPick }) {
  return (
    <div>
      <div className="flex items-end justify-between gap-3 h-48" role="radiogroup" aria-label="דירוג מ־1 עד 5">
        {[1, 2, 3, 4, 5].map((v) => (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={value === v}
            aria-label={`${v} מתוך 5`}
            onClick={() => onPick(v)}
            className="fb-finger group flex-1"
            style={{ height: `${44 + v * 11}%` }}
            data-lit={(value !== undefined && v <= value) || undefined}
          >
            <span className="fb-finger-num">{v}</span>
          </button>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-sm text-white/50">
        <span>{labels[0]}</span>
        <span>{labels[1]}</span>
      </div>
    </div>
  )
}

function OptionButton({ on, disabled, onClick, children, role = 'radio' }) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={on}
      disabled={disabled}
      onClick={onClick}
      className="fb-option"
      data-on={on || undefined}
    >
      <span>{children}</span>
      <span className="fb-check">{on && <Check size={16} strokeWidth={3} />}</span>
    </button>
  )
}

function Multi({ q, value, onChange }) {
  const exclusive = q.options.find((o) => o.exclusive)?.value
  const toggle = (v) => {
    if (value.includes(v)) return onChange(value.filter((x) => x !== v))
    if (v === exclusive) return onChange([v])
    const rest = value.filter((x) => x !== exclusive)
    if (rest.length >= q.max) return
    onChange([...rest, v])
  }
  const full = value.filter((x) => x !== exclusive).length >= q.max
  return (
    <div className="flex flex-col gap-3" role="group" aria-label={q.subtitle}>
      {q.options.map((o) => {
        const on = value.includes(o.value)
        return (
          <OptionButton
            key={o.value}
            role="checkbox"
            on={on}
            disabled={!on && full && !o.exclusive}
            onClick={() => toggle(o.value)}
          >
            {o.label}
          </OptionButton>
        )
      })}
    </div>
  )
}

function Choice({ q, value, otherText, onPick, onOtherText }) {
  const otherOn = q.options.find((o) => o.value === value)?.other
  return (
    <div className="flex flex-col gap-3" role="radiogroup">
      {q.options.map((o) => (
        <OptionButton key={o.value} on={value === o.value} onClick={() => onPick(o.value)}>
          {o.label}
        </OptionButton>
      ))}
      {otherOn && (
        <input
          className="fb-field fb-in"
          placeholder="על מה הייתם רוצים לשמוע?"
          aria-label="נושא אחר"
          maxLength={200}
          value={otherText}
          onChange={(e) => onOtherText(e.target.value)}
          autoFocus
        />
      )}
    </div>
  )
}

function TextAnswer({ value, placeholder, onChange, onSubmit }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value.slice(0, 1000))}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          onSubmit()
        }
      }}
      rows={4}
      placeholder={placeholder}
      className="fb-field fb-textarea"
      aria-label="התשובה שלכם"
      autoFocus
    />
  )
}

function YesNo({ q, value, email, onPick, onEmail }) {
  const showEmail = value === true && q.emailOnYes
  const bad = showEmail && email.trim().length > 3 && !isValidEmail(email)
  return (
    <div>
      <div className="grid grid-cols-2 gap-3" role="radiogroup">
        {[
          [true, 'כן'],
          [false, 'לא'],
        ].map(([v, label]) => (
          <button
            key={label}
            type="button"
            role="radio"
            aria-checked={value === v}
            onClick={() => onPick(v)}
            className="fb-option fb-option-center"
            data-on={value === v || undefined}
          >
            {label}
          </button>
        ))}
      </div>
      {showEmail && (
        <div className="fb-in mt-6">
          <label className="mb-2 block text-white/70" htmlFor="fb-email">לאן לשלוח?</label>
          <input
            id="fb-email"
            className="fb-field"
            type="email"
            inputMode="email"
            autoComplete="email"
            dir="ltr"
            style={{ textAlign: 'right' }}
            placeholder="name@example.com"
            value={email}
            onChange={(e) => onEmail(e.target.value)}
            aria-invalid={bad || undefined}
            autoFocus
          />
          {bad && <p className="mt-2 text-sm text-orange">נראה שחסר משהו בכתובת המייל</p>}
        </div>
      )}
    </div>
  )
}

/* ─── Done ───────────────────────────────────────────────── */

const PODCAST_URL = 'https://open.spotify.com/show/1pkoB14iPwztzO8LXkqGaR'
const INSTAGRAM_URL = 'https://www.instagram.com/amir_menachem5'


export function Done({ again = false }) {
  return (
    <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <div className="fb-in flex flex-col items-center">
        <div className="fb-done-mark">
          <Check size={34} strokeWidth={3} />
        </div>
        <p className="ds-eyebrow text-orange mt-8 mb-4">{again ? 'כבר קיבלנו ממך משוב' : 'המשוב התקבל'}</p>
        <h1 className="font-ragmarom text-[clamp(3rem,13vw,5rem)] leading-[0.95] tracking-[-0.02em]">
          תודה.
          <br />
          עכשיו — <span className="text-orange">לזירה.</span>
        </h1>
        <p className="mt-5 max-w-xs text-lg text-white/70">
          ההמשך מתחיל מחר בבוקר. בינתיים, עוד קצת מעמיר:
        </p>

        <div className="mt-8 grid w-full max-w-sm gap-3">
          <a href={PODCAST_URL} target="_blank" rel="noopener noreferrer" className="fb-link">
            <Headphones size={20} className="text-orange" />
            <span className="flex-1 text-right">לפודקאסט ״האדם בזירה״</span>
            <ChevronLeft size={18} className="text-white/40" />
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="fb-link">
            <Instagram size={20} className="text-orange" />
            <span className="flex-1 text-right">לאינסטגרם של עמיר</span>
            <ChevronLeft size={18} className="text-white/40" />
          </a>
          <a href="/amir" className="fb-link">
            <Mic2 size={20} className="text-orange" />
            <span className="flex-1 text-right">לעמוד של עמיר</span>
            <ChevronLeft size={18} className="text-white/40" />
          </a>
        </div>
      </div>
    </div>
  )
}
