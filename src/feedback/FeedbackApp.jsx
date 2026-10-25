import { useEffect, useMemo, useState } from 'react'
import FeedbackForm, { Done } from './FeedbackForm'
import { questionsFor } from './questions'
import {
  alreadyAnswered,
  codeFromLocation,
  fetchLecture,
  isConfigured,
  markAnswered,
  submitFeedback,
} from './api'

/**
 * Public feedback page, reached from a lecture's QR: /f/<code>.
 * Loads the lecture, picks its audience's questions, and hands off to the form.
 */
export default function FeedbackApp() {
  const code = useMemo(codeFromLocation, [])
  const [state, setState] = useState({ status: 'loading' })

  useEffect(() => {
    if (!isConfigured) return setState({ status: 'error' })
    if (!code) return setState({ status: 'notFound' })
    fetchLecture(code).then((res) => {
      if (res.error) setState({ status: 'error' })
      else if (res.notFound) setState({ status: 'notFound' })
      else if (!res.lecture.is_open) setState({ status: 'closed', lecture: res.lecture })
      else if (alreadyAnswered(res.lecture.id)) setState({ status: 'answered', lecture: res.lecture })
      else setState({ status: 'ready', lecture: res.lecture })
    })
  }, [code])

  useEffect(() => {
    if (state.lecture) document.title = `משוב — ${state.lecture.title}`
  }, [state.lecture])

  const { status, lecture } = state

  if (status === 'ready') {
    return (
      <FeedbackForm
        lecture={lecture}
        questions={questionsFor(lecture.audience)}
        onSubmit={async (answers) => {
          const res = await submitFeedback(lecture, answers)
          if (!res.error) markAnswered(lecture.id)
          // Staff closed the lecture while this form was open — RLS rejects the
          // insert. Say so, instead of the form's "check your connection".
          else if (/row-level security/i.test(res.error)) setState({ status: 'closed', lecture })
          return res
        }}
      />
    )
  }

  return (
    <div className="fb-stage relative min-h-[100dvh] overflow-hidden text-white" dir="rtl">
      <div className="fb-glow" aria-hidden="true" />
      {status === 'loading' && (
        <div className="relative z-10 flex min-h-[100dvh] items-center justify-center">
          <img src="/logo.png" alt="טוען…" className="h-14 w-14 animate-pulse object-contain" />
        </div>
      )}
      {status === 'answered' && <Done again />}
      {status === 'closed' && (
        <Message eyebrow={lecture.title} title="המשוב להרצאה הזו נסגר." text="תודה שבאתם להקשיב. נתראה בהרצאה הבאה." />
      )}
      {status === 'notFound' && (
        <Message eyebrow="משוב הרצאה" title="הקישור לא נמצא." text="בדקו שסרקתם את הקוד הנכון, או בקשו מהצוות קישור חדש." />
      )}
      {status === 'error' && (
        <Message eyebrow="משוב הרצאה" title="משהו השתבש." text="לא הצלחנו לטעון את הטופס. נסו לרענן את העמוד בעוד רגע." />
      )}
    </div>
  )
}

function Message({ eyebrow, title, text }) {
  return (
    <div className="fb-in relative z-10 mx-auto flex min-h-[100dvh] max-w-xl flex-col justify-center px-6">
      <img src="/logo.png" alt="חמש אצבעות" className="mb-10 h-12 w-12 object-contain" />
      <p className="ds-eyebrow text-orange mb-4">{eyebrow}</p>
      <h1 className="font-ragmarom text-[clamp(2.6rem,11vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">{title}</h1>
      <p className="mt-5 text-lg text-white/70">{text}</p>
    </div>
  )
}
