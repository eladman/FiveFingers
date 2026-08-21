// Content source of truth for the אודות (About) page — the movement's story,
// told as one continuous read rather than a stack of marketing sections.
//
// Every factual claim here traces to a source in the repo:
//  · 2014 · עמיר מנחם (עם אביו יורם) · "מיזם מקומי → תנועה ארצית" · ~3,000 חניכים/ות
//    → אתר חמש/משפך תרבות - תנועת חמש אצבעות 2025-26 (אוגוסט 25).md
//  · האקדמיה הוקמה בספטמבר 2018 → src/data/academyData.js
//  · מעגל ההשפעה (חניכים → מדריכים → מאמנים → מובילים) → משפך תרבות
//  · החזון (חברה מבוססת אמון) + האדם בזירה → משפך תרבות, חלק א׳
//
// The story centers on Amir Menachem as founder; Yoram Menachem is his father
// and is named once in the body as a supporting figure, never in a title.
// Deliberately NOT claimed, because no source supports it:
// the first group's location and size, the origin of the name "חמש אצבעות",
// and the year each other ספינה launched. Only 2014 and 2018 carry a year —
// the other two movements are named beats. Add real years to STORY[].marker
// when the movement supplies them.

/** Two photos that break up the read. One intimate, one at scale. */
export const PHOTOS = {
  early: {
    src: '/Hero-Pics/amir_talking_2.jpg',
    w: 2673,
    h: 1782,
    alt: 'מאמן בשיחה עם מעגל חניכים וחניכות בחורש',
    caption: 'מעגל שיחה — הפורמט שלא השתנה מאז היום הראשון.',
  },
  today: {
    src: '/Hero-Pics/214A0114.jpg',
    w: 1600,
    h: 1067,
    alt: 'חניכים וחניכות של חמש אצבעות באימון קבוצתי',
    caption: 'היום: אלפי חניכים וחניכות, מאותו רעיון בדיוק.',
  },
}

/** Hero data strip — the three facts that frame the whole story. */
export const HERO_META = ['נוסדה 2014', 'עמיר מנחם', 'כ-3,000 חניכים וחניכות']

/**
 * The founder card, dropped into the story where he's first introduced. Kept
 * out of the nav — this is the in-context door to his dedicated page (#amir).
 */
export const FOUNDER = {
  href: '#amir',
  eyebrow: 'המייסד',
  name: 'עמיר מנחם',
  role: 'מייסד ויו״ר התנועה · קצין שייטת 13 לשעבר · מגיש ״האדם בזירה״',
  teaser: 'מעל 1,000 הרצאות, פודקאסט, וליווי אישי — הסיפור והשיטה שמאחורי חמש אצבעות.',
  cta: 'עוד על עמיר',
  photo: { src: '/Amir_pics/amir-portrait.jpg', w: 1600, h: 1067, alt: 'עמיר מנחם, מייסד תנועת חמש אצבעות' },
}

/** The opening paragraph, set larger than the body — the story's way in. */
export const LEAD =
  'בשנת 2014 יצא עמיר מנחם, יחד עם אביו יורם, לדרך עם טענה אחת, פשוטה ועקשנית: ' +
  'אפשר לחנך אחרת. לא עוד חוג ולא עוד שיעור — מסגרת שמאמנת אופי.'

/**
 * The story in four movements. `marker` renders as a hanging numeral when we
 * can actually date the beat; otherwise the `label` carries it alone.
 * `photo` inserts one of PHOTOS after that movement.
 */
export const STORY = [
  {
    id: 'start',
    marker: '2014',
    label: 'ההתחלה',
    paras: [
      'הוא רצה לאתגר את המציאות החינוכית הקיימת ולחנך דור חדש על בסיס תפיסת עולם של ' +
        'מצוינות ערכית. מה שיצא מזה היה קבוצה אחת: מאמץ פיזי אמיתי, שיחה ערכית שלא ' +
        'מפחדת מהשאלות הקשות, וחבורה שלא מוותרת על אף אחד ואחת.',
      'שלושת הדברים האלה — חוויה מאתגרת, קבוצה מלוכדת ומאמן/ת שחיים את הערכים לפני ' +
        'שהם מדברים עליהם — לא השתנו מאז. הם עדיין השיטה.',
    ],
    founder: FOUNDER,
    photo: 'early',
  },
  {
    id: 'growth',
    label: 'הצמיחה',
    paras: [
      'ואז קרה הדבר שהפך מיזם לתנועה: החניכים לא עזבו. הם נשארו והפכו למדריכים ' +
        'צעירים, המדריכים הפכו למאמנים, והמאמנים הפכו למובילי התנועה. כל אחד ואחת ' +
        'עוברים את התהליך — ואז מובילים בו אחרים.',
      'זה מנוע ההשפעה של חמש אצבעות, והוא הסיבה שהצמיחה לא הייתה מקרית. היא נולדה ' +
        'מתוך אמונה, תשוקה והתמדה — ומעשרות אנשים שפועלים יום אחרי יום מתוך תחושת שליחות.',
    ],
  },
  {
    id: 'academy',
    marker: '2018',
    label: 'ההרחבה',
    paras: [
      'בספטמבר 2018 נפתחה מכינת חמש אצבעות הקדם-צבאית לשנת י״ג. הליווי כבר ' +
        'לא נעצר בגיל 18: שנה שלמה של התפתחות גופנית-מנטלית, חיים כקבוצה ולמידה על ' +
        'מנהיגות, ציונות והיסטוריה.',
    ],
  },
  {
    id: 'today',
    label: 'היום',
    paras: [
      'ממיזם מקומי לתנועה ארצית של כ-3,000 חניכים וחניכות. התנועה פועלת כצי של ספינות ' +
        'שמכסה את כל הדרך: הליבה (12–18), המכינה (18–20), ארגון הבוגרים ותוכנית יואב ' +
        '(21+), ושיתופי פעולה שמטמיעים את השיטה בבתי ספר, ברשויות, ביחידות צבאיות ובארגונים.',
    ],
    photo: 'today',
  },
]

/**
 * Where the story is going — the last beat of the read, set as a statement
 * rather than another section.
 */
export const VISION = {
  label: 'ולאן מכאן',
  statement: 'חברה מבוססת אמון, שנשענת על תרבות של מצוינות ערכית.',
  body:
    'המשימה שנגזרת מהחזון פשוטה לניסוח וקשה לביצוע: לאפשר לכל צעיר וצעירה בישראל לממש ' +
    'את הפוטנציאל הגלום בהם, ולהפוך להיות האדם בזירה — מי שלא צופה מהיציע, אלא פועל ' +
    'כדי להשפיע לטובה על המציאות.',
}

/** The closing band — one line, one door. */
export const CLOSE = {
  title: 'הסיפור הבא',
  titleAccent: 'הוא שלכם/ן.',
  body: 'מגיל 12 ועד אחרי הצבא — לכל שלב יש מסגרת. דברו איתנו ונכוון אתכם/ן למקום הנכון.',
  cta: 'דברו איתנו',
}
