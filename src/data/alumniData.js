// Content source of truth for the בוגרים (Alumni) page.
// Kept separate from the section components (mirrors src/data/amirData.js)
// so copy edits and the outbound Yoav links live in one place.
//
// The page shows a few movement-wide graduate numbers, short context, and then
// funnels to תוכנית יואב — the flagship program for חמש אצבעות alumni — linking
// out to the dedicated site. Content summarized from https://www.yoavprogram.com/.
//
// Real alumni photos live in /public/Bogrim/.

import { Sprout, Compass, Target } from 'lucide-react'

/** Outbound link — the dedicated תוכנית יואב site. Every Yoav CTA points here. */
export const YOAV_URL = 'https://www.yoavprogram.com/'

/** Hero background (landscape). Alumni photo. */
export const HERO = { src: '/Bogrim/_14A4788-2.jpg', w: 1600, h: 1067 }
/** Community context shot for the intro card. Alumni photo. */
export const COMMUNITY = { src: '/Bogrim/_14A4652.jpg', w: 1600, h: 1067 }
/** Finale photo push-in. Alumni photo. */
export const FINALE = { src: '/Bogrim/_14A4777.jpg', w: 1600, h: 1067 }

// "בוגרים במספרים" — animated counters. Numeric `value` so useCountUp can animate.
// Kept evergreen (no founding-year / open-cycle values) so the page never needs
// per-cycle updates; the Yoav CTA links out to the live program site instead.
export const STATS = [
  { value: 5000, suffix: '+', label: 'בוגרים ובוגרות' },
  { value: 35, label: 'משתתפים במחזור' },
  { value: 2, label: 'מחזורי יואב בשנה' },
]

/** One-line promise (the official hero tagline). */
export const YOAV_TAGLINE = 'למקסם את הפוטנציאל שלך · להשפיע על המציאות שלנו.'

/** The belief line — the "person in the arena" idea the program is built on. */
export const YOAV_ARENA = 'כי אלה שמאמינים שהם יכולים לשנות את המציאות - הם אלה שבאמת יעשו את זה.'

/** Intro paragraph (מי אנחנו, condensed). */
export const YOAV_INTRO =
  'תוכנית ייחודית לצעירות וצעירים בגילאי 22–29, שמלווה תהליך של התפתחות אישית, חשיפה לעומק החברה הישראלית ואתגריה, ויצירת השפעה אמיתית בשטח.'

/** Acceptance note — surfaced from the official site (interview-gated). */
export const YOAV_INTERVIEW = 'הקבלה לתוכנית מותנית במעבר ראיון אישי עם צוות התוכנית.'

/** יואב שחר ז״ל — the man the program is named for (from לזכרו של יואב). */
export const YOAV_TRIBUTE = {
  name: 'יואב שחר',
  honorific: 'ז״ל',
  lead: 'התוכנית נקראת על שמו של יואב שחר ז״ל ושואבת השראה מהאדם שהיה.',
  bio: 'לוחם, קצין ומפקד בשייטת 13; איש עסקים ומנכ״ל; ומייסד עמותת העטלף (יוצאי שייטת 13), שעמד בראשה כחמש-עשרה שנים. לאורך חייו הנחה, ייעץ וכיוון אנשים רבים לבחור בדרך הנכונה להם - כשהעשייה והנתינה תמיד לנגד עיניו.',
  tags: ['לוחם ומפקד בשייטת 13', 'מנכ״ל ואיש עסקים', 'מייסד עמותת העטלף'],
}

// The three axes that guide the Yoav journey (from the site's מטרות התוכנית).
export const AXES = [
  {
    icon: Sprout,
    title: 'פיתוח',
    subtitle: 'התפתחות ולמידה אישית',
    text: 'נעמיק בתהליך ההתפתחות האישית: נעמוד על הנרטיבים, התפיסות ומרכיבי הזהות שמשפיעים עלינו, נדייק את הרצונות והשאיפות ונחזק את היכולת לעמוד מול אתגרים.',
  },
  {
    icon: Compass,
    title: 'חשיפה',
    subtitle: 'חשיפה למורכבויות החברה',
    text: 'נחשף לעומק החברה הישראלית ואתגריה, לצד המורכבויות הגלובליות, מתוך שאיפה להבין את הסביבה בה אנחנו חיים ואת האתגרים שעומדים בפנינו.',
  },
  {
    icon: Target,
    title: 'השפעה',
    subtitle: 'כניסה לזירה החברתית',
    text: 'נלמד להפוך את החוזקות והכישורים האישיים לתובנות מעשיות, ונבין איך לתרגם אותן להשפעה אמיתית על החברה הישראלית, הלכה למעשה.',
  },
]

// Quick program facts — a quiet spec strip under the Yoav lead.
// Matches the official site's מבנה התוכנית (schedule + logistics).
export const YOAV_FACTS = [
  'גילאי 22–29',
  '10 מפגשים',
  'אחת לשבועיים · ימי רביעי',
  '18:00–22:00',
  'מרכז הארץ',
  'מחיר מסובסד',
]
