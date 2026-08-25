// Content source of truth for the עמיר מנחם founder page.
// Kept separate from the section components (mirrors src/data/liabahData.js)
// so copy edits and the "to be sent later" links live in one place.
//
// Media lives in /public/Amir_pics/. The PNG stills were converted to optimized
// JPGs (amir-portrait / amir-stage / amir-studio); the three .mp4s are portrait
// 9:16 reels used as click-to-play (not autoplay — 5–10 MB each).

import { Mic2, Rocket, Compass } from 'lucide-react'

/** Founder portrait (landscape 3:2, clean seamless backdrop). Hero desktop + intro. */
export const PORTRAIT = { src: '/Amir_pics/amir-portrait.jpg', w: 1600, h: 1067 }
/** Seated stage / microphone shot (portrait 2:3). Hero mobile + intro tall card. */
export const STAGE = { src: '/Amir_pics/amir-stage.jpg', w: 1066, h: 1600 }
/** TV / broadcast studio context shot (landscape 4:3). "בתקשורת" credibility strip. */
export const STUDIO = { src: '/Amir_pics/amir-studio.jpg', w: 1400, h: 1050 }

// "מי זה עמיר?" — identity (from amir.md), written as a flowing paragraph.
export const BIO_PARAGRAPH =
  'עמיר בן 36, קצין שייטת 13 לשעבר, מייסד ויו״ר תנועת חמש אצבעות, יזם סדרתי ומגיש הפודקאסט ״האדם בזירה״. עם נסיון של מעל 1,000 הרצאות בכל רחבי הארץ, עמיר פועל היום גם בפאן האישי למימוש פוטנציאל וליווי של גילאי 20 ומעלה ליזמות ומימוש פוטנציאל.'

// Compact credibility chips (value + label).
export const STATS = [
  { value: '2014', label: 'הקמת התנועה' },
  { value: '+3,000', label: 'משתתפים ברחבי הארץ' },
  { value: '+1,000', label: 'הרצאות ברחבי הארץ' },
]

// "הזירות שלנו" — the three offerings. `contactLabel` tags the shared ContactModal;
// a zone with `href` instead links out (workshop 0→1 site — sent later).
export const ZONES = [
  {
    icon: Mic2,
    title: 'הרצאות',
    badge: 'גילאי 20 ומעלה',
    text: 'הרצאות בנושא מסוגלות, חוסן, מימוש פוטנציאל והאדם בזירה. מיועדות לגילאי 20 ומעלה. שילוב של סיפור אישי, שיטה ותובנות שמניעות לפעולה.',
    imageSrc: '/Amir_pics/amir-stage.jpg',
    // Tall portrait (2:3) cropped into a 4:3 frame — bias to the top so the face isn't cut off.
    imagePosition: 'top',
    cta: 'הזמינו הרצאה',
    contactLabel: 'קשר עם עמיר',
  },
  {
    icon: Rocket,
    title: 'סדנאות',
    badge: 'סדנת ⁦0→1⁩',
    text: 'איך הופכים שאיפות למעשים ולוקחים את הצעד הראשון מרעיון למציאות. סדנה מעשית שמלווה אתכם/ן מנקודת ההתחלה ועד המהלך הראשון בשטח.',
    imageSrc: '/Amir_pics/workshop.jpeg',
    imagePosition: 'right 68%',
    cta: 'לפרטים על הסדנה',
    href: 'https://amir-personal.vercel.app/',
  },
  {
    icon: Compass,
    title: 'ליווי אישי',
    badge: 'יזמים/ות צעירים/ות',
    text: 'ליווי מקצועי ליזמים/ות צעירים/ות בתחילת דרכם, שרוצים/ות לצאת לצעד הראשון: מיקוד, כלים וחשיבה שמקצרים את הדרך מרעיון לעשייה.',
    imageSrc: '/Amir_pics/amir-studio.jpg',
    cta: 'לתיאום ליווי',
    contactLabel: 'קשר עם עמיר',
  },
]

// Vertical 9:16 reels — click-to-play feature clips.
export const REELS = [
  { src: '/Amir_pics/IMG_3864.mp4', poster: PORTRAIT.src },
  { src: '/Amir_pics/IMG_3866.mp4', poster: STAGE.src },
  { src: '/Amir_pics/IMG_3865.mp4', poster: STUDIO.src },
]

// "עולמות תוכן" — where to follow Amir. Podcast is already featured on the
// homepage ("האדם בזירה" / ManInArena); Instagram + YouTube links arrive later.
export const SOCIALS = [
  {
    key: 'podcast',
    title: 'פודקאסט',
    label: 'חמש אצבעות | האדם בזירה',
    href: 'https://open.spotify.com/show/1pkoB14iPwztzO8LXkqGaR?si=a787a5babe4c4d28',
  },
  {
    key: 'instagram',
    title: 'אינסטגרם',
    label: 'עקבו אחרי הרגעים מהשטח',
    href: 'https://www.instagram.com/amir_menachem5?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
  },
  {
    key: 'youtube',
    title: 'הרצאה מלאה',
    label: 'הרצאה בבה״ד 1 · יוטיוב',
    href: 'https://www.youtube.com/watch?v=dn48dteg1x8',
  },
]
