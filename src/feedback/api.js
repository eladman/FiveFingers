// Public-side data access for the feedback form (anon key, no session).
// RLS (supabase/lectures.sql) lets anon read a lecture's public columns and
// INSERT a response into an open lecture — nothing else.

import { createClient } from '@supabase/supabase-js'
import { questionsFor } from './questions'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isConfigured = Boolean(url && anonKey)

const supabase = isConfigured
  ? createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } })
  : null

/** The lecture code from /f/<code> (or ?l=<code> as a fallback). */
export function codeFromLocation() {
  const m = location.pathname.match(/^\/f\/([a-z0-9]+)\/?$/i)
  if (m) return m[1].toLowerCase()
  return new URLSearchParams(location.search).get('l')?.toLowerCase() || null
}

/** → { lecture } | { notFound: true } | { error } */
export async function fetchLecture(code) {
  if (!supabase) return { error: 'not-configured' }
  const { data, error } = await supabase
    .from('lectures')
    .select('id, code, title, lecture_date, audience, is_open')
    .eq('code', code)
    .maybeSingle()
  if (error) return { error: error.message }
  if (!data) return { notFound: true }
  return { lecture: data }
}

/** Shape the form's answers into a `lecture_feedback` row. */
export function toRow(lecture, answers) {
  const row = { lecture_id: lecture.id }
  for (const q of questionsFor(lecture.audience)) {
    const v = answers[q.id]
    if (q.type === 'text') {
      row[q.id] = v?.trim() ? v.trim() : null
    } else if (q.type === 'choice') {
      row[q.id] = v ?? null
      if (q.otherId) {
        const other = q.options.find((o) => o.other)
        const text = answers[q.otherId]?.trim()
        row[q.otherId] = other && v === other.value && text ? text : null
      }
    } else if (q.type === 'yesno') {
      row[q.id] = v ?? null
      if (q.emailOnYes) row[q.emailId] = v === true ? answers[q.emailId]?.trim() || null : null
    } else {
      row[q.id] = v ?? null
    }
  }
  return row
}

export async function submitFeedback(lecture, answers) {
  if (!supabase) return { error: 'not-configured' }
  // No .select(): anon can't read rows back, so ask for return=minimal.
  const { error } = await supabase.from('lecture_feedback').insert(toRow(lecture, answers))
  return error ? { error: error.message } : {}
}

// Soft guard against double submits from the same device. Not security —
// just stops an accidental second tap from counting twice.
const doneKey = (id) => `ff_feedback_${id}`
export function alreadyAnswered(id) {
  try {
    return localStorage.getItem(doneKey(id)) === '1'
  } catch {
    return false
  }
}
export function markAnswered(id) {
  try {
    localStorage.setItem(doneKey(id), '1')
  } catch {
    /* storage blocked — the guard simply doesn't apply */
  }
}

export const isValidEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s || '').trim())
