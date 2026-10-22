import { supabase } from './supabaseClient'
import { SITE_URL } from '../lib/seo'

const PAGE_SIZE = 1000 // Supabase caps every response at 1000 rows by default

/** The public link a lecture's QR points to. */
export const lectureUrl = (code) => `${SITE_URL}/f/${code}`

export async function fetchLectures() {
  const { data, error } = await supabase
    .from('lectures')
    .select('*')
    .order('lecture_date', { ascending: false })
    .order('created_at', { ascending: false })
  return { data: data || [], error }
}

// Every response, page by page down the identity id (keyset — same approach as
// src/dashboard/Traffic.jsx, so a single select can't silently truncate).
export async function fetchAllFeedback() {
  const rows = []
  let beforeId = null
  for (;;) {
    let query = supabase.from('lecture_feedback').select('*').order('id', { ascending: false }).limit(PAGE_SIZE)
    if (beforeId !== null) query = query.lt('id', beforeId)
    const { data, error } = await query
    if (error) return { data: [], error }
    if (data.length === 0) return { data: rows, error: null }
    rows.push(...data)
    beforeId = data[data.length - 1].id
  }
}

// Short, URL-safe, no look-alikes (0/o, 1/l/i) — the link is also read aloud.
const ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789'
function randomCode(len = 6) {
  const bytes = crypto.getRandomValues(new Uint8Array(len))
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('')
}

export async function createLecture(fields) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const { data, error } = await supabase
      .from('lectures')
      .insert({ ...fields, code: randomCode() })
      .select()
      .single()
    if (!error) return { data }
    if (error.code !== '23505') return { error } // anything but a code collision
  }
  return { error: { message: 'לא הצלחנו ליצור קישור ייחודי. נסו שוב.' } }
}

export async function updateLecture(id, patch) {
  const { data, error } = await supabase.from('lectures').update(patch).eq('id', id).select().single()
  return { data, error }
}

export async function deleteLecture(id) {
  const { error } = await supabase.from('lectures').delete().eq('id', id)
  return { error }
}
