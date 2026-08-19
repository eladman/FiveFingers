// ─────────────────────────────────────────────────────────────────────────────
//  ליבה — עמודי קבוצות הגיל (Age-band pages) content
//  Three dedicated pages: ליבה צעירה (#liabah/young) · חטיבת הביניים
//  (#liabah/middle) · התיכון (#liabah/high).
//  Single source of truth for those pages. The locations/teams themselves live
//  in liabahData.js — this file only *filters* them per age band (see
//  locationsForBand below), so editing a group there updates the age pages too.
//  Strings marked `TODO` are placeholders awaiting real content from the team —
//  in particular every year-plan entry is EXAMPLE data.
//  Hebrew copy follows the movement's gender-neutral policy (plural / slash forms).
// ─────────────────────────────────────────────────────────────────────────────

import { locations } from './liabahData'

// ── Grade parsing ─────────────────────────────────────────────────────────────
// Team names carry their grades in free text: "(ז-ח)", "י׳-י״ב", "ט׳", "ה -ו",
// "(ו-ז-ח)". We normalize geresh/quote marks, then read the grade range off the
// end of the name. Teams with no explicit grades fall back to keyword defaults.

const GRADE_VALUES = { 'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9, 'י': 10, 'יא': 11, 'יב': 12 }

// Keyword fallbacks when a team name has no grade letters (e.g. "כוכב יאיר ילדים").
// Ordered most-specific first.
const KEYWORD_GRADES = [
  { re: /יסודי/, range: [5, 6] },
  { re: /ילד/, range: [7, 8] },      // ילדים / ילדות
  { re: /נער/, range: [9, 10] },     // נערים / נערות
  { re: /נוער|בנים|בנות/, range: [11, 12] },
]

export function parseTeamGrades(name) {
  const clean = name.replace(/[׳״'"]/g, '').trim()
  // A run of grade letters separated by dashes (or, in a few sheet entries,
  // plain spaces) at the end of the name, optionally wrapped in parens:
  // "(ז-ח)", "ה -ו", "ט", "(יא יב)", "י-יא-יב".
  const m = clean.match(/(?:^|[\s(])((?:יב|יא|[ג-י])(?:\s*[-\s]\s*(?:יב|יא|[ג-י]))*)\)?\s*$/)
  if (m) {
    const grades = m[1].split(/[-\s]+/).map((g) => GRADE_VALUES[g]).filter(Boolean)
    if (grades.length) return [Math.min(...grades), Math.max(...grades)]
  }
  const kw = KEYWORD_GRADES.find(({ re }) => re.test(clean))
  return kw ? kw.range : null
}

// ── Bands ─────────────────────────────────────────────────────────────────────
// Grade windows per page. A team appears on every page its range touches, so a
// (ו-ח) group shows on both the young and the middle page — exactly what a
// parent searching for their kid's grade expects.
export const AGE_BANDS = {
  young: { min: 1, max: 6 },
  middle: { min: 7, max: 9 },
  high: { min: 10, max: 12 },
}

export function locationsForBand(bandId) {
  const band = AGE_BANDS[bandId]
  return locations
    .map((loc) => ({
      ...loc,
      teams: loc.teams.filter((t) => {
        const range = parseTeamGrades(t.name)
        return range && range[1] >= band.min && range[0] <= band.max
      }),
    }))
    .filter((loc) => loc.teams.length > 0)
}

// ── Page order + shared bits ──────────────────────────────────────────────────
export const agePageOrder = ['young', 'middle', 'high']

// ── Page content ──────────────────────────────────────────────────────────────
export const agePages = {
  // ═══ ליבה צעירה · גילאי 10–12 ═══
  young: {
    id: 'young',
    hash: '#liabah/young',
    navLabel: 'ליבה צעירה',
    hero: {
      eyebrow: 'ליבה צעירה · כיתות ה׳–ו׳',
      titleA: 'ליבה צעירה',
      titleB: 'הצעד הראשון לזירה',
      subtitle:
        'בגילאי 10–12 הכול מתחיל. דרך משחק, תנועה ואתגר מותאם גיל, הילדים והילדות בונים ביטחון, הרגלים בריאים וחברויות אמיתיות — ומגלים כמה כיף להתאמץ.',
      imageSrc: '/plans_pics/kids_liba.jpg',
      imagePosition: '50% 30%',
      meta: ['גילאי 10–12 · כיתות ה׳–ו׳', 'שני אימונים בשבוע', 'קבוצה קבועה ומאמן/ת צמוד/ה'],
    },
    // Parent-facing "why now" — shown inside the overview section.
    whyAgeLead: 'בגיל היסודי נבנים ההרגלים, הביטחון והחברויות שמלווים לכל החיים.',
    forParents: [
      { title: 'חלון הזדמנויות', text: 'בגיל היסודי נבנים ההרגלים והביטחון העצמי. מה שנטמע עכשיו מחזיק לשנים קדימה.' }, // TODO
      { title: 'תנועה במקום מסך', text: 'פעמיים בשבוע של תנועה, אוויר וחברים אמיתיים — הפסקה אמיתית מהמסכים.' }, // TODO
      { title: 'מסגרת שרואה אותם', text: 'קבוצה בגודל נכון ומאמן/ת שמכיר/ה כל ילד/ה — בשם, בקצב ובחוזקות.' }, // TODO
    ],
    overview: {
      heading: 'איך נראה אימון בליבה הצעירה?',
      lead:
        'היכרות ראשונה עם השיטה של הליבה, בגובה העיניים של גיל היסודי: הרבה משחק ותנועה, אתגרים קטנים שנערמים להצלחות גדולות, וקבוצה שהופכת לבית.',
      training: [
        { icon: 'Activity', title: 'תנועה ומשחק', text: 'אימון גופני שבנוי כמו משחק — תחנות, אתגרים קבוצתיים והרבה צחוק.' }, // TODO
        { icon: 'Sprout', title: 'אתגר מותאם גיל', text: 'כל ילד/ה מתקדם/ת מהנקודה שלו/ה, בלי השוואות ועם הרבה הצלחות קטנות.' }, // TODO
        { icon: 'Users', title: 'קבוצה קבועה', text: 'אותם חברים, אותו מאמן/ת, כל שבוע — ככה נבנית שייכות אמיתית.' }, // TODO
        { icon: 'Heart', title: 'שיח קצר וערכי', text: 'כמה דקות בסוף כל אימון שמחברות את החוויה לערך אחד פשוט וברור.' }, // TODO
      ],
      goalsHeading: 'מה נרצה להשיג השנה',
      goals: [
        { title: 'ביטחון ומסוגלות', text: 'ילד/ה שיודע/ת להגיד "אני מסוגל/ת" — כי הוכיח/ה את זה לעצמו/ה באימון.' }, // TODO
        { title: 'אהבת התנועה', text: 'הרגל של פעילות גופנית שמגיע מהנאה, לא מכפייה — בסיס לאורח חיים בריא.' }, // TODO
        { title: 'שייכות ראשונה', text: 'חוויית קבוצה ראשונה ומשמעותית: מקום שבו מחכים לך ואתה/את חשוב/ה בו.' }, // TODO
      ],
    },
    yearPlan: {
      heading: 'איך נראית שנה בליבה הצעירה?',
      lead: 'שגרת אימונים קבועה, ולאורך השנה נקודות שיא שהילדים והילדות מחכים להן.',
      // TODO: EXAMPLE DATA — replace months/events with the real annual plan.
      note: 'התוכנית להמחשה — האירועים והתאריכים המדויקים מתפרסמים בתחילת כל שנת פעילות.',
      items: [
        { month: 'ספטמבר', title: 'אימון פתיחה חגיגי', text: 'נפגשים, מכירים את הקבוצה והמאמן/ת ופותחים את השנה בגדול.', big: true }, // TODO
        { month: 'אוקטובר', title: 'גיבוש קבוצתי', text: 'משחקי צוות ואתגרים שהופכים אוסף ילדים לקבוצה.', big: false }, // TODO
        { month: 'דצמבר', title: 'אתגר חנוכה', text: 'אימון מיוחד לחג — תחנות אור, משימות קבוצתיות והפתעות.', big: true }, // TODO
        { month: 'פברואר', title: 'שבוע ערכים', text: 'שבוע שבו כל אימון מוקדש לערך אחד מחמשת ערכי התנועה.', big: false }, // TODO
        { month: 'מרץ', title: 'אימון משפחות', text: 'ההורים מוזמנים להתאמן יחד עם הילדים ולהרגיש את השיטה על עצמם.', big: true }, // TODO
        { month: 'אפריל', title: 'יום שטח ראשון', text: 'יוצאים מהמגרש אל הטבע — מסע קטן ראשון של הקבוצה.', big: true }, // TODO
        { month: 'יוני', title: 'מופע סיום שנה', text: 'הקבוצה מציגה מה שנבנה השנה — והמשפחות באות לראות ולהתרגש.', big: true }, // TODO
      ],
    },
    details: {
      heading: 'איפה מתאמנים?',
      lead: 'קבוצות ליבה צעירה פועלות בכל רחבי הארץ. מצאו את הקבוצה הקרובה אליכם.',
    },
    finale: {
      title: 'מתחילים את הצעד הראשון?',
      titleAccent: 'הצעד הראשון',
      subtitle: 'השאירו פרטים ונחבר אתכם/ן לקבוצת ליבה צעירה הקרובה אליכם.',
      imageSrc: '/liba_pics/214A1343.jpg',
    },
    gallery: [
      { src: '/liba_pics/214A0052.jpg', alt: 'פעילות ליבה צעירה' },
      { src: '/plans_pics/kids_liba.jpg', alt: 'פעילות ליבה צעירה' },
      { src: '/liba_pics/214A0005.jpg', alt: 'פעילות ליבה צעירה' },
    ],
  },

  // ═══ חטיבת הביניים · גילאי 12–15 ═══
  middle: {
    id: 'middle',
    hash: '#liabah/middle',
    navLabel: 'חטיבת הביניים',
    hero: {
      eyebrow: 'חטיבת הביניים · כיתות ז׳–ט׳',
      titleA: 'חטיבת הביניים',
      titleB: 'כאן נבנה החוסן',
      subtitle:
        'גיל ההתבגרות הוא בדיוק הרגע לבנות חוסן, הרגלים וזהות. באימון הפיזי-מנטלי בני ובנות הנוער לומדים להתמודד עם קושי — ומגלים שהם מסוגלים להרבה יותר.',
      imageSrc: '/our_product_pics/core_pic.jpg',
      imagePosition: '50% 25%',
      meta: ['גילאי 12–15 · כיתות ז׳–ט׳', 'שני אימונים בשבוע', 'קבוצות בנים ובנות'],
    },
    whyAgeLead: 'בין ילדות לבגרות, קבוצה שמציבה רף של מאמץ, כבוד ואחריות היא ההשפעה הכי חזקה שיש.',
    forParents: [
      { title: 'הגיל שמעצב זהות', text: 'בתקופה שבה הכול משתנה, קבוצה יציבה ומאמן/ת קבוע/ה הם עוגן אמיתי.' }, // TODO
      { title: 'חוסן במקום חשש', text: 'התמודדות מדורגת עם קושי בונה ביטחון שמחזיק גם בבית הספר וגם בחברה.' }, // TODO
      { title: 'לחץ חברתי מהסוג הטוב', text: 'סביבה שבה הנורמה היא מאמץ, כבוד ואחריות — והחברים מושכים למעלה.' }, // TODO
    ],
    overview: {
      heading: 'איך נראה אימון בחטיבה?',
      lead:
        'כאן נכנסים לעומק השיטה הפיזית-מנטלית: אימון שדורש יותר, שיח שמעמיק יותר, וקבוצה שלומדת לנצח ולהפסיד ביחד — ולקום מחר לאימון הבא.',
      training: [
        { icon: 'Activity', title: 'אימון פיזי-מנטלי', text: 'כושר, כוח וטכניקה — ובתוכם עבודה על משמעת, התמדה והרגלים.' }, // TODO
        { icon: 'Flame', title: 'יציאה מאזור הנוחות', text: 'אתגרים מדורגים שמלמדים להישאר רגועים ומדויקים גם כשקשה.' }, // TODO
        { icon: 'Users', title: 'עבודת צוות', text: 'משימות קבוצתיות שבהן מצליחים רק ביחד — ולומדים לסמוך זה על זה.' }, // TODO
        { icon: 'MessageCircle', title: 'שיח ערכי', text: 'עיבוד החוויה אחרי כל אימון: מה למדנו על עצמנו ואיך זה פוגש את החיים.' }, // TODO
      ],
      goalsHeading: 'מה נרצה להשיג השנה',
      goals: [
        { title: 'חוסן מנטלי', text: 'יכולת להתמודד עם תסכול, כישלון ולחץ — ולצאת מהם חזקים יותר.' }, // TODO
        { title: 'הרגלי מצוינות', text: 'דייקנות, התמדה ואחריות אישית שמחלחלות מהאימון אל הלימודים והבית.' }, // TODO
        { title: 'שייכות ואחריות', text: 'מעבר מ"אני" ל"אנחנו": לקיחת תפקיד בקבוצה ואכפתיות כלפי החברים.' }, // TODO
      ],
    },
    yearPlan: {
      heading: 'איך נראית שנה בחטיבה?',
      lead: 'שגרה של שני אימונים בשבוע, ולאורכה מסעות ואירועי שיא שבונים את הקבוצה.',
      // TODO: EXAMPLE DATA — replace months/events with the real annual plan.
      note: 'התוכנית להמחשה — האירועים והתאריכים המדויקים מתפרסמים בתחילת כל שנת פעילות.',
      items: [
        { month: 'ספטמבר', title: 'פתיחת שנה והצבת יעדים', text: 'כל מתאמן/ת מגדיר/ה יעד אישי לשנה — ומתחילים לעבוד.', big: true }, // TODO
        { month: 'נובמבר', title: 'מסע סתיו', text: 'המסע הקבוצתי הראשון של השנה: ניווט, בישולי שטח ולילה בטבע.', big: true }, // TODO
        { month: 'דצמבר', title: 'אתגר חורף', text: 'סדרת אימונים מיוחדת — מתאמנים גם כשקר, גם כשחושך.', big: false }, // TODO
        { month: 'פברואר', title: 'שבוע ערכים', text: 'צוללים לחמשת ערכי התנועה — ערך אחד בכל אימון.', big: false }, // TODO
        { month: 'אפריל', title: 'מסע אביב', text: 'מסע השיא של השנה: יומיים של שטח, אתגר וגיבוש.', big: true }, // TODO
        { month: 'מאי', title: 'משימת השפעה קהילתית', text: 'הקבוצה יוזמת ומבצעת פרויקט למען הקהילה המקומית.', big: false }, // TODO
        { month: 'יוני', title: 'אירוע שיא וסיום שנה', text: 'מסכמים את השנה מול המשפחות — וחוגגים את הדרך שנעשתה.', big: true }, // TODO
      ],
    },
    details: {
      heading: 'איפה מתאמנים?',
      lead: 'קבוצות חטיבת הביניים פועלות בכל רחבי הארץ. מצאו את הקבוצה הקרובה אליכם.',
    },
    finale: {
      title: 'מוכנים ומוכנות להיכנס לזירה?',
      titleAccent: 'לזירה?',
      subtitle: 'השאירו פרטים ונחבר אתכם/ן לקבוצת החטיבה הקרובה אליכם.',
      imageSrc: '/liba_pics/214A9628.jpg',
    },
    gallery: [
      { src: '/liba_pics/214A0223.jpg', alt: 'אימון חטיבת הביניים' },
      { src: '/liba_pics/214A0405-2.jpg', alt: 'אימון חטיבת הביניים' },
      { src: '/liba_pics/214A9628.jpg', alt: 'אימון חטיבת הביניים' },
    ],
  },

  // ═══ התיכון · גילאי 15–18 ═══
  high: {
    id: 'high',
    hash: '#liabah/high',
    navLabel: 'התיכון',
    hero: {
      eyebrow: 'התיכון · כיתות י׳–י״ב',
      titleA: 'התיכון',
      titleB: 'מנהיגות נבנית כאן',
      subtitle:
        'בשנים שלפני הגיוס לוקחים אחריות אמיתית: מתאמנים ברמה גבוהה, מובילים את הצעירים ומתכוננים לשירות משמעותי ולחיים של השפעה.',
      imageSrc: '/plans_pics/high_schools. .jpg',
      imagePosition: '50% 30%',
      meta: ['גילאי 15–18 · כיתות י׳–י״ב', 'שני אימונים בשבוע', 'הכנה לשירות משמעותי'],
    },
    whyAgeLead: 'בשנים שלפני הגיוס נקבע מי תהיו. אנחנו כאן כדי שתגיעו מוכנים — בגוף, בראש ובערכים.',
    forParents: [
      { title: 'בסיס אמיתי לקראת הצבא', text: 'יכולת פיזית ומנטלית שנבנית בהדרגה לאורך שנים — בלי קיצורי דרך.' }, // TODO
      { title: 'אחריות ומנהיגות בפועל', text: 'תפקידי הובלה בקבוצה וחניכת המתאמנים הצעירים — לא רק לדבר על מנהיגות, לחיות אותה.' }, // TODO
      { title: 'עוגן בשנים עמוסות', text: 'בין בגרויות, רישיון ולחצים — מקום קבוע שמזכיר מה באמת חשוב.' }, // TODO
    ],
    overview: {
      heading: 'איך נראה אימון בתיכון?',
      lead:
        'הרמה עולה: אימונים אינטנסיביים יותר, אחריות אישית וקבוצתית גדולה יותר, ושיח בגובה העיניים על שירות, מנהיגות והחיים שאחרי.',
      training: [
        { icon: 'Dumbbell', title: 'אימון ברמה גבוהה', text: 'כוח, סיבולת ועבודה טכנית — הבסיס הפיזי לקראת השירות.' }, // TODO
        { icon: 'Brain', title: 'חוסן מנטלי מתקדם', text: 'תפקוד תחת לחץ, קבלת החלטות בעומס ועמידה ביעדים לאורך זמן.' }, // TODO
        { icon: 'Compass', title: 'הובלה וחניכה', text: 'המתאמנים הבוגרים מובילים תרגילים וחונכים את הקבוצות הצעירות.' }, // TODO
        { icon: 'Flag', title: 'הכנה לשירות', text: 'שיח מכוון על שירות משמעותי, בחירת מסלול ומה זה להיות "האיש שבזירה".' }, // TODO
      ],
      goalsHeading: 'מה נרצה להשיג השנה',
      goals: [
        { title: 'מוכנות לשירות משמעותי', text: 'להגיע לצו הראשון וליום הגיוס בשיא — פיזית, מנטלית וערכית.' }, // TODO
        { title: 'מנהיגות בפועל', text: 'כל מתאמן/ת לוקח/ת תפקיד אמיתי: הובלת אימון, חניכה או פרויקט השפעה.' }, // TODO
        { title: 'בגרות ערכית', text: 'זהות יציבה של מצוינות ערכית — לדעת מי אני ולמה אני פועל/ת.' }, // TODO
      ],
    },
    yearPlan: {
      heading: 'איך נראית שנה בתיכון?',
      lead: 'שגרת אימונים תובענית, מסעות גדולים ותחנות הכנה ממוקדות לקראת הגיוס.',
      // TODO: EXAMPLE DATA — replace months/events with the real annual plan.
      note: 'התוכנית להמחשה — האירועים והתאריכים המדויקים מתפרסמים בתחילת כל שנת פעילות.',
      items: [
        { month: 'ספטמבר', title: 'פתיחת שנה ויעדים אישיים', text: 'מגדירים יעדים לשנה — כושר, תפקיד והשפעה — ובונים תוכנית אישית.', big: true }, // TODO
        { month: 'אוקטובר', title: 'מסע ניווטים', text: 'ניווט לילה קבוצתי: מפה, לחץ זמן והחלטות בשטח.', big: true }, // TODO
        { month: 'דצמבר', title: 'שבוע מנהיגות', text: 'המתאמנים/ות מתכננים ומובילים את האימונים בעצמם.', big: true }, // TODO
        { month: 'ינואר', title: 'אימון משותף עם בוגרי התנועה', text: 'נפגשים עם בוגרים ובוגרות אחרי צבא — ושומעים איך זה באמת נראה.', big: false }, // TODO
        { month: 'מרץ', title: 'מסע אביב — המסע הגדול', text: 'שיא השנה: מסע רב-יומי שמזקק את כל מה שנבנה.', big: true }, // TODO
        { month: 'מאי', title: 'הכנה ממוקדת לגיוס', text: 'לשכבת י״ב: חידוד פיזי ומנטלי אחרון לפני ההתייצבות.', big: false }, // TODO
        { month: 'יוני', title: 'טקס סיום ומעבר', text: 'נפרדים מהמתגייסים והמתגייסות — ומעבירים את ההובלה הלאה.', big: true }, // TODO
      ],
    },
    details: {
      heading: 'איפה מתאמנים?',
      lead: 'קבוצות התיכון פועלות בכל רחבי הארץ. מצאו את הקבוצה הקרובה אליכם.',
    },
    finale: {
      title: 'בוחרים להוביל?',
      titleAccent: 'להוביל?',
      subtitle: 'השאירו פרטים ונחבר אתכם/ן לקבוצת התיכון הקרובה אליכם.',
      imageSrc: '/liba_pics/214A9700.jpg',
    },
    gallery: [
      { src: '/liba_pics/214A1552.jpg', alt: 'אימון קבוצות התיכון' },
      { src: '/liba_pics/214A0362.jpg', alt: 'אימון קבוצות התיכון' },
      { src: '/liba_pics/214A9700.jpg', alt: 'אימון קבוצות התיכון' },
    ],
  },
}
