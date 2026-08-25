// Shared material for the שיתופי פעולה (B2B) hero explorations.
// Real stats (catalog "מי אנחנו") + real partner logos (catalog closing page),
// so every version reads as grounded, credible B2B — not placeholder copy.

export const STATS = [
  { value: '50,000+', label: 'שעות אימון והדרכה' },
  { value: '10,000+', label: 'בוגרים וחניכים' },
  { value: '100+', label: 'ארגונים שותפים' },
  { value: '12', label: 'שנות פעילות' },
]

// A curated, recognizable subset for the trust strips (heaviest hitters first).
export const PARTNERS = [
  { src: '/partners/idf.png', name: 'צה״ל' },
  { src: '/partners/defense.png', name: 'משרד הביטחון' },
  { src: '/partners/education.png', name: 'משרד החינוך' },
  { src: '/partners/reichman.png', name: 'אוניברסיטת רייכמן' },
  { src: '/partners/azrieli.png', name: 'קרן עזריאלי' },
  { src: '/partners/tel-aviv-yafo.png', name: 'עיריית תל אביב-יפו' },
]

// The three content worlds (catalog "עולמות התוכן"), distilled for a bento.
export const WORLDS = [
  { title: 'חוסן מנטלי', note: 'האקס-פקטור מול מציאות משתנה' },
  { title: 'מנהיגות מעשית', note: 'להוביל אנשים ורעיונות ולהשפיע' },
  { title: 'מצוינות כתרבות', note: 'למקסם פוטנציאל, בלי להישחק' },
]

// One shared messaging spine — each version frames it differently.
export const COPY = {
  eyebrow: 'בית תוכן והכשרות',
  subtitle:
    'מביאים את שיטת חמש אצבעות לארגונים, צוותים, יחידות וספורטאים - תוכן והכשרות שמייצרים חוסן מנטלי, מנהיגות ומצוינות. מהלכה למעשה.',
  primaryCta: 'לתיאום שיחת ייעוץ',
  secondaryCta: 'איך זה עובד?',
}

// Per-character wrapper for headline reveals (scoped GSAP targets a class).
export function splitChars(text, cls) {
  return [...text].map((ch, i) => ({ ch: ch === ' ' ? ' ' : ch, key: `${cls}-${i}` }))
}
