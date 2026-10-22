import { downloadTable } from '../dashboard/csv'
import { ALL_QUESTIONS, optionLabel } from '../feedback/questions'
import { AUDIENCE_LABEL, CATEGORY_LABEL } from '../feedback/taxonomy'
import { formatDate } from '../feedback/format'

// One row per response, joined with its lecture; option keys → Hebrew labels.
export function exportResponses(rows, lectures, filename) {
  const byId = new Map(lectures.map((l) => [l.id, l]))
  const header = [
    'התקבל',
    'הרצאה',
    'תאריך הרצאה',
    'קהל יעד',
    'קטגוריה',
    ...ALL_QUESTIONS.flatMap((q) => [
      q.title,
      ...(q.otherId ? [`${q.title} — אחר`] : []),
      ...(q.emailOnYes ? ['מייל'] : []),
    ]),
  ]
  const body = rows.map((r) => {
    const l = byId.get(r.lecture_id) || {}
    return [
      new Date(r.created_at).toLocaleString('he-IL'),
      l.title,
      formatDate(l.lecture_date),
      AUDIENCE_LABEL[l.audience],
      CATEGORY_LABEL[l.category],
      ...ALL_QUESTIONS.flatMap((q) => [
        cell(q, r[q.id]),
        ...(q.otherId ? [r[q.otherId] || ''] : []),
        ...(q.emailOnYes ? [r[q.emailId] || ''] : []),
      ]),
    ]
  })
  downloadTable(header, body, filename)
}

function cell(q, v) {
  if (v == null) return ''
  if (q.type === 'yesno') return v ? 'כן' : 'לא'
  if (Array.isArray(v)) return v.map((x) => optionLabel(q, x)).join(' | ')
  if (q.options) return optionLabel(q, v)
  return v
}
