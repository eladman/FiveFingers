// ─────────────────────────────────────────────────────────────────────────────
//  אקדמיית חמש אצבעות (Academy / מכינה) — page content
//  Single source of truth. Edit the values below to update the page.
//  Strings marked `TODO` are placeholders awaiting real content from the team.
//  Hebrew copy follows the movement's gender-neutral policy (plural / slash forms).
//  Seeded with real copy from 5fingers.org.il (/youth/mechina/, /youth/boost/).
// ─────────────────────────────────────────────────────────────────────────────

// ── Hero ──────────────────────────────────────────────────────────────────────
export const hero = {
  eyebrow: 'מכינת חמש אצבעות',
  title: 'המכינה',
  // 1–2 short, punchy sentences — the prestige / transformation hook.
  subtitle: 'שנת י״ג שמעצבת מנהיגים ומנהיגות של מצוינות ערכית, אנשים שבוחרים להיכנס לזירה ולהשפיע.',
  // Main intro video. Leave videoUrl empty ('') to show the placeholder.
  // For YouTube use an embed URL, e.g. 'https://www.youtube.com/embed/XXXXXXXX'.
  videoUrl: '', // TODO: real video embed/URL
  videoPoster: '/mehina_pics/mehina-desert-group.jpg', // shown behind the play button
  primaryCta: 'להגשת מועמדות',
}

// ── Manifesto / identity (מה זו האקדמיה) ───────────────────────────────────────
// Editorial "wall text" — a thesis statement + supporting copy.
export const manifesto = {
  kicker: 'מה זו המכינה',
  // The thesis — shown large, in a narrow measure.
  lead:
    'מכינת חמש אצבעות היא בית לשנת י״ג שמעצבת דור מנהיגים ומנהיגות, אנשים שבוחרים להיכנס לזירה, ' +
    'לקחת אחריות ולהשפיע על המציאות החברתית בישראל מתוך מצוינות ערכית.',
  // Supporting paragraphs (calm two-column block).
  body: [
    'המכינה, שהוקמה בספטמבר 2018, מציבה סטנדרט גבוה של עשייה, חשיבה וערכים. לאורך השנה עוברים ' +
      'החניכים והחניכות תהליך אישי מעמיק: בונים מסוגלות, שייכות והשפעה.',
    'התפיסה הפדגוגית הייחודית משלבת אתגר פיזי-מנטלי, למידה עיונית ועשייה חברתית, והופכת את המכינה ' +
      'לבית של ערכים, חברות עמוקה ומנהיגות אותנטית, הכנה אמיתית לשירות משמעותי ולחיים של השפעה.',
  ],
}

// ── The five educational axes (חמשת הצירים) ─────────────────────────────────────
// Icon names map to lucide-react icons (see AcademyAxes.jsx).
export const axes = [
  { icon: 'Dumbbell', title: 'כלים פיזיים-מנטליים', text: 'חוויות גופניות בהנחיית מאמנים ומאמנות מקצועיים, לפי שיטת חמש אצבעות.' },
  { icon: 'BookOpen', title: 'למידה', text: 'קורסים בפוליטיקה, היסטוריה, אנתרופולוגיה ומיומנויות המאה ה-21.' },
  { icon: 'Hammer', title: 'עשייה', text: 'השתלבות בפרויקטים חברתיים מתוך הקשבה לצרכים הלאומיים.' },
  { icon: 'Users', title: 'תודעה חברתית', text: 'היכרות מעמיקה עם מגוון המגזרים של החברה הישראלית.' },
  { icon: 'Compass', title: 'אחריות', text: 'כלים לניהול פרויקטים ולהובלת יוזמות חברתיות מתוך אחריות אישית.' },
]

// ── Stats (נתונים) ─────────────────────────────────────────────────────────────
// `value` is the number to count up to; `suffix` appended after (e.g. '+').
export const stats = [
  { value: 5,    suffix: '',  label: 'מחזורים מאז 2018' },     // TODO: confirm
  { value: 7,    suffix: '',  label: 'שנות פעילות' },           // TODO: confirm
  { value: 100,  suffix: '+', label: 'בוגרים ובוגרות' },        // TODO: confirm
  { value: 90,   suffix: '%', label: 'משרתים בתפקידי משמעות' }, // TODO: confirm
  { value: 30,   suffix: '+', label: 'בוגרים בתפקידי קצונה' },  // TODO: confirm
]

// ── Programs / tracks (מסלולים) ────────────────────────────────────────────────
// `contactTag` is passed to the ContactModal so each track is tracked separately.
export const programs = [
  {
    id: 'mechina',
    tab: 'מכינה',
    title: 'מכינה · שנה א׳',
    ages: 'שנת י״ג · ספטמבר–יולי',
    contactTag: 'מכינה',
    duration: 'שנה מלאה',
    focus: 'מצוינות ערכית ומנהיגות',
    forWhom: 'בוגרי/ות תיכון לפני השירות',
    description:
      'שנת המכינה הקדם-צבאית, תהליך אישי וערכי מעמיק שבונה מסוגלות, מנהיגות ואחריות חברתית, ' +
      'ומכין את החניכים והחניכות לשירות משמעותי ולחיים של השפעה.',
    highlights: ['תהליך אישי מלא', 'חמשת הצירים החינוכיים', 'עשייה חברתית', 'הכנה לשירות'],
    imageSrc: '/mehina_pics/mehina-desert-group.jpg',
  },
  {
    id: 'boost',
    tab: 'הזנק',
    title: 'הזנק',
    ages: 'קדם-צבאי מרוכז · 3–4 שבועות · מועדים לאורך כל השנה',
    contactTag: 'הזנק',
    duration: '3–4 שבועות',
    focus: 'הכנה פיזית-מנטלית מרוכזת',
    forWhom: 'לקראת גיוס קרוב',
    description:
      'תוכנית קדם-צבאית חדשנית ויוקרתית בת שלושה עד ארבעה שבועות, במגוון מועדים לאורך כל השנה: ' +
      'היכרות עם החברה הישראלית, הכנה פיזית-מנטלית, פיתוח מנהיגות, חוויית שטח וניווט, ' +
      'בליווי מדריכים ומומחים מהשורה הראשונה.',
    highlights: ['היכרות עם החברה הישראלית', 'כושר וחוסן', 'מנהיגות', 'ניווט וחוויית שטח'],
    imageSrc: '/mehina_pics/mehina-huddle.jpg',
  },
  {
    id: 'carmel',
    tab: 'כרמל',
    title: 'כרמל · שנה ב׳',
    ages: 'שנה שנייה · המשך התהליך',
    contactTag: 'כרמל',
    duration: 'שנה שנייה',
    focus: 'העמקת מנהיגות והשפעה',
    forWhom: 'בוגרי/ות שנה א׳',
    description:
      'מסלול ההמשך לבוגרי השנה הראשונה, העמקת המנהיגות, הרחבת ההשפעה והובלת יוזמות חברתיות ' +
      'מתוך אחריות ובגרות גוברת.',
    highlights: ['הובלת יוזמות', 'אחריות מורחבת', 'ליווי בוגרים', 'השפעה בקהילה'],
    imageSrc: '/mehina_pics/mehina-shirts-night.jpg',
  },
]

// ── A year in the Academy (שנה באקדמיה) ────────────────────────────────────────
export const journey = [
  { period: 'ספטמבר–אוקטובר', title: 'פתיחת שנה וגיבוש', text: 'היכרות, הצבת יעדים אישיים וקבוצתיים ותחילת המסע המשותף.' }, // TODO
  { period: 'נובמבר–ינואר',   title: 'אימון ולמידה',     text: 'בניית בסיס פיזי-מנטלי, קורסים והעמקה בצירים החינוכיים.' }, // TODO
  { period: 'פברואר–מרץ',     title: 'עשייה חברתית',     text: 'השתלבות בפרויקטים חברתיים והובלת יוזמות בקהילה.' }, // TODO
  { period: 'אפריל–מאי',      title: 'אתגרי שיא',        text: 'חוויות שטח, ניווטים ואתגרים מעצבים שמגבשים את הקבוצה.' }, // TODO
  { period: 'יוני–יולי',      title: 'סיכום והכנה לשירות', text: 'עיבוד התהליך, חגיגת צמיחה והכוונה לקראת שירות משמעותי.' }, // TODO
]

// ── Admissions / screening (מיונים) ────────────────────────────────────────────
// Two separate tracks. Informational only — CTAs open the contact form.
export const admissions = {
  heading: 'תהליך המיון',
  subheading: 'שני מסלולים: למועמדים ומועמדות מישראל ומחו״ל',
  steps: [
    { num: '1', title: 'הגשת מועמדות', text: 'מילוי פרטים ראשוני והיכרות עם המסלול המתאים.' },
    { num: '2', title: 'יום מיון', text: 'מפגש אישי וקבוצתי להיכרות הדדית ובחינת התאמה.' },
    { num: '3', title: 'קבלה ושיבוץ', text: 'הודעת קבלה והשתלבות במחזור הקרוב.' },
  ],
  tracks: [
    {
      id: 'israel',
      label: 'מועמדים/ות מישראל',
      text: 'מסלול מיון לבוגרי ובוגרות תיכון בישראל המבקשים שנת מכינה משמעותית לפני השירות.',
      contactTag: 'מכינה',
    },
    {
      id: 'overseas',
      label: 'מועמדים/ות מחו״ל',
      text: 'מסלול ייעודי המותאם תרבותית ושפתית למועמדים ומועמדות מחו״ל המעוניינים בחוויה ישראלית מעצבת.',
      contactTag: 'מכינה',
    },
  ],
}

// ── Testimonials (עדויות) ──────────────────────────────────────────────────────
export const testimonials = [
  { id: 't1', name: 'בוגר/ת מחזור ב׳', role: 'בוגר/ת המכינה', quote: 'השנה הזו שינתה לי את הדרך. הגעתי לשירות עם ביטחון פנימי, מצפן ערכי ברור וחברים לכל החיים, ועם הידיעה שאני יכול/ה להוביל ולהשפיע, לא רק להיגרר.' }, // TODO: real quote
  { id: 't2', name: 'הורה לחניך/ה', role: 'משפחה', quote: 'ראינו את הילד/ה שלנו צומחים בתוך שנה לאדם אחראי, בוגר ובעל שליחות. ההשקעה, הליווי האישי והסטנדרט הגבוה ניכרים בכל פרט. אין מתנה גדולה מזו.' }, // TODO: real quote
  { id: 't3', name: 'בוגר/ת מחזור א׳', role: 'בתפקיד קצונה', quote: 'הכלים שקיבלתי במכינה מלווים אותי עד היום: בפיקוד, בהובלת אנשים ובהתמודדות עם רגעים קשים. למדתי מה זה לקחת אחריות באמת.' }, // TODO: real quote
]

// ── Gallery (גלריה) ────────────────────────────────────────────────────────────
// Add image paths to show real photos; empty strings render placeholders.
export const gallery = [
  { id: 'g1', src: '/mehina_pics/mehina-desert-group.jpg', alt: 'מחזור המכינה במכתש עם דגלי ישראל' },
  { id: 'g2', src: '/mehina_pics/mehina-huddle.jpg', alt: 'חניכי וחניכות המכינה במעגל גיבוש' },
  { id: 'g3', src: '/mehina_pics/mehina-team-girls.jpg', alt: 'קבוצת המכינה אחרי אימון' },
  { id: 'g4', src: '/mehina_pics/mehina-shirts-night.jpg', alt: 'חולצות מכינת חמש אצבעות' },
  { id: 'g5', src: '/mehina_pics/mehina-gear.jpg', alt: 'חלוקת ציוד המכינה' },
  { id: 'g6', src: '/Hero-Pics/214A0088.jpg', alt: 'פעילות המכינה' },
  { id: 'g7', src: '/liba_pics/214A1552.jpg', alt: 'פעילות המכינה' },
  { id: 'g8', src: '/Hero-Pics/214A0034.jpg', alt: 'פעילות המכינה' },
  { id: 'g9', src: '/Hero-Pics/214A0511.jpg', alt: 'פעילות המכינה' },
]

// ── FAQ (שאלות נפוצות) ─────────────────────────────────────────────────────────
export const faq = [
  { id: 'f1', q: 'למי מיועדת המכינה?', a: 'לבוגרי ובוגרות תיכון בישראל ומחו״ל המחפשים שנה משמעותית ומעצבת לפני השירות, מתוך מחויבות למצוינות ערכית ומנהיגות.' }, // TODO
  { id: 'f2', q: 'מתי נפתחת ההרשמה?', a: 'ההרשמה למחזור הקרוב מתבצעת דרך אתר מועצת המכינות בתחילת שנת הלימודים. השאירו פרטים ונעדכן אתכם בכל שלב.' }, // TODO
  { id: 'f3', q: 'מהו תהליך המיון?', a: 'התהליך כולל הגשת מועמדות, יום מיון אישי וקבוצתי, וקבלה. קיימים שני מסלולים נפרדים: למועמדים מישראל ולמועמדים מחו״ל.' }, // TODO
  { id: 'f4', q: 'מה ההבדל בין המכינה להזנק?', a: 'המכינה היא שנת י״ג מלאה, וההזנק היא תוכנית קדם-צבאית מרוכזת בת שלושה עד ארבעה שבועות, במגוון מועדים לאורך כל השנה. שתיהן בנויות על שיטת חמש אצבעות.' }, // TODO
  { id: 'f5', q: 'יש מסלול למועמדים/ות מחו״ל?', a: 'כן. קיים מסלול ייעודי המותאם תרבותית ושפתית למועמדים ומועמדות מחו״ל. צרו קשר ונתאים לכם את התהליך.' }, // TODO
]
