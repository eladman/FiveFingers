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
  'inquiry_details',
  'notes',
  'source',
  'page_url',
]
