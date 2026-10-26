// Shared labels for the dashboard. Mirrors the field/interest vocabulary the
// contact form (src/components/ContactModal.jsx) writes into Supabase.

// Hebrew labels for every column we might display in the detail drawer.
// Keys are the snake_case DB columns (see supabase/schema.sql).
export const FIELD_LABELS = {
  name: 'שם מלא',
  phone: 'טלפון',
  email: 'מייל',
  product_type: 'תחום עניין',
  residence: 'מקום מגורים',
  birth_date: 'תאריך לידה',
  experience: 'ניסיון תעסוקתי',
  certificates: 'תעודות',
  child_gender: 'מין הילד/ה',
  child_name: 'שם הילד/ה',
  child_city: 'עיר מגורים',
  child_grade: 'כיתה',
  notes: 'הערות',
  org_name: 'ארגון',
  org_role: 'תפקיד בארגון',
  target_date: 'תאריך מבוקש',
  amir_topic: 'נושא (עמיר)',
  inquiry_details: 'פירוט הפנייה',
  submitted_at: 'נשלח בתאריך',
  source: 'מקור',
  page_url: 'כתובת העמוד',
}

// The extra columns worth showing in the detail drawer, in a sensible order.
// Only non-empty ones are rendered.
export const DETAIL_FIELDS = [
  'residence',
  'birth_date',
  'experience',
  'certificates',
  'child_gender',
  'child_name',
  'child_city',
  'child_grade',
  'org_name',
  'org_role',
  'target_date',
  'amir_topic',
  'inquiry_details',
  'notes',
]

// Columns exported to CSV, in order.
export const CSV_COLUMNS = [
  'created_at',
  'name',
  'phone',
  'email',
  'product_type',
  'staff_notes',
  'child_name',
  'child_city',
  'child_grade',
  'child_gender',
  'residence',
  'birth_date',
  'experience',
  'certificates',
  'org_name',
  'org_role',
  'target_date',
  'amir_topic',
  'inquiry_details',
  'notes',
  'source',
  'page_url',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
]

// Campaign tags from the ad link that brought the lead (see supabase/attribution.sql).
export const ATTRIBUTION_LABELS = {
  utm_source: 'מקור קמפיין',
  utm_medium: 'סוג פרסום',
  utm_campaign: 'שם קמפיין',
  utm_content: 'מודעה',
  utm_term: 'מילת מפתח',
  landing_page: 'עמוד נחיתה',
}

/**
 * The lead's campaign tags, or null. Reads the dedicated `attribution` column,
 * falling back to the full payload in `raw_payload`.
 */
export function getAttribution(row) {
  let a = row?.attribution || row?.raw_payload?.attribution
  // Make writes the column from a JSON string, which can land as a jsonb
  // string rather than an object — unwrap it.
  if (typeof a === 'string') {
    try {
      a = JSON.parse(a)
    } catch {
      return null
    }
  }
  return a && typeof a === 'object' ? a : null
}

/** Short label for the table: "facebook · academy_oct", or '' when untagged. */
export function attributionLabel(row) {
  const a = getAttribution(row)
  if (!a) return ''
  return [a.utm_source, a.utm_campaign].filter(Boolean).join(' · ') || (a.fbclid ? 'facebook' : a.gclid ? 'google' : '')
}
