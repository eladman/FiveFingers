// Closed lists the assistant picks from when creating a lecture.
// `key` is what the database stores (CHECK-constrained in supabase/lectures.sql);
// `label` is display-only, so wording can change without touching data.

export const AUDIENCES = [
  { key: 'pre_army', label: 'מכינות וטרום צבא' },
  { key: 'army', label: 'צבא' },
  { key: 'business', label: 'חברות עסקיות' },
  { key: 'other', label: 'אחר' },
]

export const CATEGORIES = [
  { key: 'leadership', label: 'מנהיגות והובלה' },
  { key: 'education', label: 'חינוך' },
  { key: 'entrepreneurship', label: 'יזמות ועשייה' },
  { key: 'personal_growth', label: 'התפתחות אישית ומצוינות' },
  { key: 'israeli_society', label: 'חברה ישראלית ואחריות חברתית' },
]

const byKey = (list) => Object.fromEntries(list.map((x) => [x.key, x.label]))
export const AUDIENCE_LABEL = byKey(AUDIENCES)
export const CATEGORY_LABEL = byKey(CATEGORIES)
