// Content source of truth for the בוגרים (Alumni) page.
// Kept separate from the section components (mirrors src/data/amirData.js)
// so copy edits and the outbound Yoav links live in one place.
//
// The page shows a few movement-wide graduate numbers, short context, and then
// funnels to תוכנית יואב — the flagship program for חמש אצבעות alumni — linking
// out to the dedicated site. Content summarized from https://www.yoavprogram.com/.
//
// Images are placeholders reused from existing folders; drop real alumni photos
// into /public/alumni_pics/ and repoint HERO / COMMUNITY when available.

import { Sprout, Compass, Target } from 'lucide-react'

/** Outbound link — the dedicated תוכנית יואב site. Every Yoav CTA points here. */
export const YOAV_URL = 'https://www.yoavprogram.com/'

/** Hero background (landscape). Placeholder from the movement hero set. */
export const HERO = { src: '/Hero-Pics/214A0011.jpg', w: 1600, h: 1067 }
/** Community context shot for the intro card. Placeholder from ליבה set. */
export const COMMUNITY = { src: '/liba_pics/214A0405-2.jpg', w: 1600, h: 1067 }
/** Speaker with a circle of young adults in the forest — backs the finale
    photo push-in (the ערב מורשת theater shot clashed with the headline: the
    projected title on its screen fought the CTA copy). */
export const FINALE = { src: '/Hero-Pics/amir_talking_2.jpg', w: 2673, h: 1782 }

// "בוגרים במספרים" — animated counters. Numeric `value` so useCountUp can animate;
// `plain: true` skips the thousands separator (so 2014 reads as a year, not 2,014).
export const STATS = [
  { value: 2014, label: 'שנת ההקמה', plain: true },
  { value: 3000, suffix: '+', label: 'בוגרים ובוגרות' },
  { value: 35, label: 'משתתפים במחזור' },
  { value: 2, label: 'מחזורי יואב בשנה' },
]

// The three axes that guide the Yoav journey (from the site's מטרות התוכנית).
export const AXES = [
  {
    icon: Sprout,
    title: 'פיתוח',
    subtitle: 'התפתחות ולמידה אישית',
    text: 'נעמיק בתהליך ההתפתחות האישית — נעמוד על הנרטיבים, התפיסות ומרכיבי הזהות שמשפיעים עלינו, נדייק את הרצונות והשאיפות ונחזק את היכולת לעמוד מול אתגרים.',
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
    text: 'נלמד להפוך את החוזקות והכישורים האישיים לתובנות מעשיות, ונבין איך לתרגם אותן להשפעה אמיתית על החברה הישראלית — הלכה למעשה.',
  },
]

// Quick program facts, rendered as pill chips under the Yoav section.
export const YOAV_FACTS = [
  'גילאי 22–29',
  '10 מפגשים',
  'אחת לשבועיים',
  'מחיר מסובסד',
  'מרכז הארץ',
]
