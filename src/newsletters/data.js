import { supabase } from '../dashboard/supabaseClient.js'

// The list never pulls the HTML (it can be megabytes); the editor loads it on open.
const LIST_COLS = 'id, created_at, updated_at, slug, title, description, is_published, views'

export async function fetchNewsletters() {
  const { data, error } = await supabase.from('newsletters').select(LIST_COLS).order('created_at', { ascending: false })
  return { data: data || [], error }
}

/** The heavy columns: the page itself and the link-preview picture (base64 JPEG). */
export async function fetchContent(id) {
  let { data, error } = await supabase.from('newsletters').select('html, cover').eq('id', id).single()
  // Table from before covers existed (newsletters.sql not re-run yet): still open the HTML.
  if (error && /cover/.test(error.message || '')) ({ data, error } = await supabase.from('newsletters').select('html').eq('id', id).single())
  return { html: data?.html || '', cover: data?.cover || null, error }
}

export async function createNewsletter(fields) {
  const { data, error } = await supabase.from('newsletters').insert(fields).select(LIST_COLS).single()
  return { data, error: friendly(error) }
}

export async function updateNewsletter(id, fields) {
  const { data, error } = await supabase.from('newsletters').update(fields).eq('id', id).select(LIST_COLS).single()
  return { data, error: friendly(error) }
}

export async function deleteNewsletter(id) {
  const { error } = await supabase.from('newsletters').delete().eq('id', id)
  return { error }
}

function friendly(error) {
  if (!error) return null
  if (/cover/.test(error.message || '') && /column|schema cache/.test(error.message || ''))
    return { message: 'חסרה עמודת התמונה בטבלה. הריצו שוב את supabase/newsletters.sql ב-Supabase.' }
  if (error.code === '23505') return { message: 'הכתובת הזו כבר בשימוש בניוזלטר אחר. בחרו כתובת אחרת.' }
  if (error.code === '42P01' || /relation .*newsletters/.test(error.message || ''))
    return { message: 'הטבלה עוד לא נוצרה ב-Supabase. הריצו את supabase/newsletters.sql.' }
  return error
}

export const shareUrl = (slug) => `${location.origin}/newsletter/${slug}`

export const whatsappUrl = (title, slug) =>
  `https://wa.me/?text=${encodeURIComponent(`${title}\n${shareUrl(slug)}`)}`
