// ─────────────────────────────────────────────────────────────────────────────
//  ליבה (Liabah / Core) — page content
//  Single source of truth. Edit the values below to update the page.
//  Strings marked `TODO` are placeholders awaiting real content from the team.
//  Hebrew copy follows the movement's gender-neutral policy (plural / slash forms).
// ─────────────────────────────────────────────────────────────────────────────

// ── Hero ──────────────────────────────────────────────────────────────────────
export const hero = {
  eyebrow: 'תנועת חמש אצבעות',
  title: 'קבוצות הנוער',
  // 1–2 short, punchy sentences — the "cool to belong to" hook.
  subtitle: 'המקום שבו בני ובנות נוער הופכים לאנשים שבוחרים להיכנס לזירה.',
  // Main intro video. Leave videoUrl empty ('') to show the placeholder.
  // For YouTube use an embed URL, e.g. 'https://www.youtube.com/embed/XXXXXXXX'.
  videoUrl: '', // TODO: real video embed/URL
  videoPoster: '/Hero-Pics/214A0011.jpg', // shown behind the play button
  primaryCta: 'הרשמה לקבוצה',
}

// ── Essence (מה זה ליבה) ───────────────────────────────────────────────────────
export const essence = {
  heading: 'מה הן קבוצות הנוער?',
  subheading: 'מסגרת חינוכית בלתי פורמלית שמקדמת כל נער/ה למקסום הפוטנציאל שלו/ה',
  // The intro paragraph supplied by the CEO (verbatim).
  paragraph:
    'קבוצות הנוער של חמש אצבעות הן מסגרת חינוכית בלתי פורמלית שמקדמת כל נער/ה למקסום הפוטנציאל שלו/ה. ' +
    'במסגרת הפעילות עוברים המתאמנים והמתאמנות תהליך חינוכי המורכב משלושה שלבים: מסוגלות – שייכות – השפעה. ' +
    'התהליך בא לידי ביטוי באמצעות שיטה ייחודית המשלבת בין האימון הפיזי-מנטלי, השייכות לקבוצה והחיבור האישי למאמן. ' +
    'מטרתו לבנות בסיס אישיותי-ערכי רחב, להקנות כלים להתמודדות עם האתגרים הקיימים ולאפשר לבני ובנות הנוער ' +
    'למקסם את הפוטנציאל שלהם למען השפעה וקידום החברה הישראלית.',
  // The 3-stage journey.
  stages: [
    { num: '1', title: 'מסוגלות', text: 'בונים ביטחון ויכולת אישית דרך אתגר פיזי-מנטלי הדרגתי.' },
    { num: '2', title: 'שייכות', text: 'נהיים חלק מקבוצה מלוכדת עם מטרה משותפת ואמון הדדי.' },
    { num: '3', title: 'השפעה', text: 'לוקחים אחריות ופועלים לקידום הסביבה והחברה הישראלית.' },
  ],
  // The method's 3 pillars.
  pillars: [
    {
      num: '1',
      title: 'אימון פיזי-מנטלי',
      text: ' תהליך חינוכי שבו הפעילות הגופנית משמשת ככלי לפיתוח מנטלי. אימון נבנה כך שלא רק ישפר את הכושר, אלא גם יחזק ערכים, אופי והרגלים. המטרה היא שהיכולות שנרכשות באימון יבואו לידי ביטוי בבית הספר, בצבא, בעבודה ובחיים בכלל.',
      imageSrc: '/liba_pics/214A0223.jpg',
      objectPosition: '50% 20%',
    },
    {
      num: '2',
      title: 'קבוצה',
      text: 'קהילה מלוכדת שמייצרת שייכות וכוח משותף. לומדים שמשיגים יותר ביחד מאשר לבד.',
      imageSrc: '/our_product_pics/core_pic.jpg',
      objectPosition: '50% 20%',
    },
    {
      num: '3',
      title: 'מאמן/ת',
      text: 'דמות מובילה שמהווה מודל ומלווה כל מתאמן/ת. מישהו/י שרואה אותך, מאמין/ה בך ודוחף/ת אותך קדימה.',
      imageSrc: '/our_method_pics/_14A9052 copy.jpg',
      objectPosition: '50% 20%',
    },
  ],
}

// ── Stats (נתונים) ─────────────────────────────────────────────────────────────
// `value` is the number to count up to; `suffix` appended after (e.g. '+').
export const stats = [
  { value: 2500, suffix: '+', label: 'מתאמנים ומתאמנות פעילים' },
  { value: 74,   suffix: '',  label: 'קבוצות פעילות' },
  { value: 19,   suffix: '',  label: 'אזורים בארץ' },
  { value: 60,   suffix: '',  label: 'מאמנים ואנשי צוות' },
  { value: 3000, suffix: '+', label: 'בוגרים ובוגרות' },
]

// ── Programs by age (תכניות לפי גילאים) ────────────────────────────────────────
export const programsByAge = [
  {
    id: 'young',
    title: 'הקבוצות הצעירות',
    ages: 'גילאי 10–12 · כיתות ה׳–ו׳',
    description:
      'הצעד הראשון בתנועה, היכרות עם השיטה דרך משחק, תנועה ואתגר מותאם גיל, בקבוצה תומכת.', // TODO
    imageSrc: '/plans_pics/kids_liba.jpg',
  },
  {
    id: 'middle',
    title: 'חטיבת הביניים',
    ages: 'גילאי 12–15 · כיתות ז׳–ט׳',
    description:
      'יסודות השיטה הפיזית-מנטלית: בונים חוסן, הרגלים ויכולת עבודה בצוות בתקופת גיבוש זהות משמעותית.', // TODO
    imageSrc: '/our_product_pics/core_pic.jpg',
  },
  {
    id: 'high',
    title: 'התיכון',
    ages: 'גילאי 15–18 · כיתות י׳–י״ב',
    description:
      'העמקת המנהיגות והאחריות האישית, הכנה לקראת השירות המשמעותי ולחיים של השפעה.', // TODO
    imageSrc: '/plans_pics/high_schools. .jpg',
  },
]

// ── What a training session includes (מה כולל האימון) ──────────────────────────
export const trainingItems = [
  { icon: 'Activity',  title: 'אימון גופני',     text: 'מאמץ פיזי הדרגתי שבונה כושר, חוסן ומשמעת.' },     // TODO
  { icon: 'Brain',     title: 'חוסן מנטלי',      text: 'התמודדות עם קושי, יציאה מאזור הנוחות ועמידה ביעדים.' }, // TODO
  { icon: 'Users',     title: 'עבודת צוות',      text: 'משימות קבוצתיות שמחזקות שיתוף פעולה ואמון.' },      // TODO
  { icon: 'Heart',     title: 'שיח ערכי',        text: 'עיבוד החוויה וחיבור לערכי התנועה והמצוינות הערכית.' }, // TODO
]

// ── Locations + map (מיקומים ומפה) ────────────────────────────────────────────
// `lng`/`lat` are the real geographic coordinates of each area. They are
// projected onto the Israel outline automatically (see src/data/israelOutline.js),
// so pins always land in the right place — just edit the coordinates.
//   city    — area name (shown on the map, list, and detail panel)
//   region  — 'מרכז' | 'שרון' | 'צפון' — groups the mobile region tabs
//   manager — מנהל/ת אזור (area manager), shown at the top of the detail panel
//   venue   — the area's main training location (מיקום). '' when groups train in
//             several places — then each team carries its own `venue`.
//   days    — workout days for the area's groups (ימים)
//   teams   — the groups that run in the area, one per row of the source sheet:
//             { name, coach, hours, venue?, note? }
//               coach  — מאמן 1 (may be '' when unassigned)
//               hours  — שעות אימונים, e.g. '17:00-18:30' ('' when not yet set)
//               venue  — only when it differs from the area `venue`
//               note   — status flag, e.g. 'יפתח במהלך השנה' / 'לא קיים'
// Generated from "team_coachs.html" (current teams sheet). Grade markers in each
// `name` are load-bearing — age-band filtering + the map label parse them.
export const locations = [
  {
    id: 'emek-hefer-east', city: 'עמק חפר מזרח', region: 'שרון', lng: 34.99, lat: 32.37,
    manager: 'מתן רון', venue: 'בת חפר', days: 'שני וחמישי',
    teams: [
      { name: "ילדים (ז'-ח')", coach: 'מתן רון', hours: '17:00-18:30' },
      { name: 'נערים (ט-י)', coach: 'מתן רון', hours: '17:00-18:30' },
      { name: 'בנים (יא-יב)', coach: 'מתן רון', hours: '18:30-20:30' },
      { name: 'בנות (י-יב)', coach: 'עמית מירן', hours: '18:30-20:30' },
    ],
  },
  {
    id: 'emek-hefer-west', city: 'עמק חפר מערב', region: 'שרון', lng: 34.875, lat: 32.39,
    manager: 'מתן רון', venue: 'רופין', days: 'ראשון ורביעי',
    teams: [
      { name: 'ילדים (ז-ח)', coach: 'מתן רון', hours: '17:00-18:30' },
      { name: 'נערים (ט-י)', coach: 'ערן מובשוביץ', hours: '17:00-18:30' },
      { name: 'בנים (יא-יב)', coach: 'ערן מובשוביץ', hours: '18:30-20:30' },
      { name: 'בנות (יא-יב)', coach: 'מתן רון', hours: '18:30-20:30' },
    ],
  },
  {
    id: 'even-yehuda', city: 'אבן יהודה', region: 'שרון', lng: 34.888, lat: 32.27,
    manager: 'עמית בן עמי', venue: '', days: 'שני וחמישי',
    teams: [
      { name: 'נוער בנים (יא-יב)', coach: 'אבדר', venue: 'רופין', hours: '18:30-20:30' },
      { name: 'נוער בנות (יא-יב)', coach: 'מיטל', venue: 'ראלף', hours: '18:30-20:30' },
      { name: 'נערים נערות (ט-י)', coach: 'אבדר', venue: 'ראלף', hours: '18:30-20:00' },
      { name: 'ילדים (ז-ח)', coach: 'מיטל', venue: 'הכביש הישן', hours: '17:00-18:15' },
      { name: 'יסודי (ה-ו)', coach: 'מיטל', venue: 'הכביש הישן', hours: '17:00-18:00' },
    ],
  },
  {
    id: 'tel-mond', city: 'תל מונד', region: 'שרון', lng: 34.917, lat: 32.25,
    manager: 'עמית בן עמי', venue: 'פארק היערות', days: 'שני וחמישי',
    teams: [
      { name: 'נוער בנים (יא-יב)', coach: 'רועי גונן', hours: '18:30-20:30' },
      { name: 'נערים נערות (ט-י)', coach: 'עמית בן עמי', hours: '18:30-20:00' },
      { name: 'ילדים (ז-ח)', coach: 'עמית בן עמי', hours: '17:00-18:15' },
      { name: 'יסודי (ה-ו)', coach: 'עמית בן עמי', hours: '17:00-18:00' },
    ],
  },
  {
    id: 'kfar-yona', city: 'כפר יונה', region: 'שרון', lng: 34.933, lat: 32.317,
    manager: 'עמית בן עמי', venue: 'פארק שרונה', days: 'ראשון ורביעי',
    teams: [
      { name: 'נוער בנים (יא-יב)', coach: 'אבדר', hours: '18:30-20:30' },
      { name: 'נוער בנות (יא-יב)', coach: 'עמית מירן', hours: '18:30-20:30' },
      { name: 'נערים נערות (ט-י)', coach: 'אבדר', hours: '18:30-20:00' },
      { name: 'ילדים (ז-ח)', coach: 'קליינר', hours: '17:00-18:15' },
      { name: 'יסודי (ה-ו)', coach: 'קליינר', hours: '17:00-18:00' },
    ],
  },
  {
    id: 'zichron', city: 'זכרון יעקב', region: 'צפון', lng: 34.954, lat: 32.572,
    manager: 'גיא טרנטו', venue: 'פארק המושבה זכרון', days: 'ראשון ורביעי',
    teams: [
      { name: 'יסודי (ה-ו)', coach: 'עדן', hours: '', note: 'לא קיים' },
      { name: 'ילדים (ז-ח)', coach: 'תאבת', hours: '17:00-18:30' },
      { name: "נערים (ט')", coach: 'עדן', hours: '18:30-20:30' },
      { name: 'נוער בנים (י-יב)', coach: 'עדן', hours: '18:30-20:30' },
      { name: 'נוער בנות (י-יב)', coach: 'תאבת', hours: '18:30-20:30' },
    ],
  },
  {
    id: 'ramat-yishai', city: 'רמת ישי', region: 'צפון', lng: 35.17, lat: 32.7035,
    manager: 'גיא טרנטו', venue: 'ארזים- רמת ישי', days: 'ראשון ורביעי',
    teams: [
      { name: "(ג'-ד')", coach: '', hours: '13:30-14:30' },
      { name: "(ה'-ו')", coach: 'יניב שורר', hours: '14:30-15:30' },
    ],
  },
  {
    id: 'kiryat-tivon', city: 'קריית טבעון', region: 'צפון', lng: 35.1236, lat: 32.7197,
    manager: 'גיא טרנטו', venue: 'בית ספר צל אורנים', days: 'ראשון ורביעי',
    teams: [
      { name: 'נוער בנים (י-יב)', coach: 'בנטל', hours: '18:30-20:30' },
      { name: 'נוער בנות (י-יב)', coach: 'אור פרץ', hours: '18:30-20:30' },
      { name: 'ילדים (ז-ט)', coach: 'בנטל', hours: '17:00-18:15' },
    ],
  },
  {
    id: 'emek-yizrael', city: 'עמק יזרעאל', region: 'צפון', lng: 35.29, lat: 32.62,
    manager: 'גיא טרנטו', venue: 'נהלל- אולם ספורט', days: 'שני וחמישי',
    teams: [
      { name: 'נוער בנים (יא-יב)', coach: 'גיא טרנטו', hours: '18:30-20:30' },
      { name: 'נוער בנות (י-יב)', coach: 'גיל טל', hours: '18:30-20:30' },
      { name: 'נערים (ט-י)', coach: 'אור פרץ', hours: '17:00-18:30' },
      { name: 'ילדים (ז-ח)', coach: 'יניב שורר', hours: '17:00-18:30' },
      { name: 'ילדות (ז-ט)', coach: 'גיל טל', hours: '17:00-18:30' },
    ],
  },
  {
    id: 'tel-aviv', city: 'תל אביב', region: 'מרכז', lng: 34.7818, lat: 32.0853,
    manager: 'עידן ילין', venue: 'ספורטק ת"א', days: 'ראשון ורביעי',
    teams: [
      { name: 'יסודי (ה-ו)', coach: 'עידן ילין', hours: '17:00-18:00' },
      { name: 'ילדים + ילדות (ז-ח)', coach: 'עידן ילין', hours: '17:00-18:15' },
      { name: 'נערים + נערות (ט-י)', coach: 'עמית ברקן', hours: '18:30-20:00' },
      { name: 'בנים (יא-יב)', coach: 'עומר גרסטן', hours: '18:30-20:30' },
      { name: 'בנות (יא-יב)', coach: 'גל רוזנקרנץ', hours: '18:30-20:30' },
    ],
  },
  {
    id: 'herzliya', city: 'הרצליה', region: 'שרון', lng: 34.844, lat: 32.166,
    manager: 'עידן ילין', venue: 'פארקר הרצליה', days: 'שני וחמישי',
    teams: [
      { name: 'ילדים + ילדות (ז-ח)', coach: 'עידן ילין', hours: '17:00-18:15' },
      { name: 'נערים + נערות (ט-י)', coach: 'עידן ילין', hours: '18:30-20:00' },
      { name: 'בנים (יא-יב)', coach: 'עומר גרסטן', hours: '18:30-20:30' },
      { name: 'בנות (יא-יב)', coach: 'עידן ילין', hours: '18:30-20:30' },
    ],
  },
  {
    id: 'jerusalem', city: 'ירושלים', region: 'מרכז', lng: 35.2137, lat: 31.7683,
    manager: 'עידן ילין', venue: 'גן סאקר', days: 'שני וחמישי',
    teams: [
      { name: 'בנים (י-יב)', coach: 'רם אסא', hours: '18:30-20:30' },
      { name: 'בנות (י-יב)', coach: 'שיראל ברמן', hours: '18:30-20:30' },
      { name: 'ילדים (ז-ט)', coach: 'רם אסא', hours: '17:00-18:15' },
    ],
  },
  {
    id: 'raanana', city: 'רעננה', region: 'שרון', lng: 34.8707, lat: 32.1847,
    manager: 'בן שטראובר', venue: 'פארק רעננה', days: 'ראשון ורביעי',
    teams: [
      { name: 'ילדים (ז-ח)', coach: 'יובל המלך', hours: '17:00-18:15' },
      { name: 'נערים (ט-י)', coach: 'שגב', hours: '17:00-18:30' },
      { name: 'נערות (ט-י)', coach: 'נויה', hours: '18:30-20:00' },
      { name: 'בנים (יא-יב)', coach: 'שטראובר', hours: '18:30-20:30' },
      { name: 'בנות (יא-יב)', coach: 'שגב', hours: '18:30-20:30' },
    ],
  },
  {
    id: 'hod-hasharon', city: 'הוד השרון', region: 'שרון', lng: 34.889, lat: 32.15,
    manager: 'בן שטראובר', venue: 'פארק אקולוגי', days: 'שני וחמישי',
    teams: [
      { name: 'ילדים (ז-ח)', coach: 'יובל המלך', hours: '17:00-18:15' },
      { name: 'נערים + נערות (ט-י)', coach: 'טנקל', hours: '17:00-18:30' },
      { name: 'בנים (יא-יב)', coach: 'שטראובר', hours: '18:30-20:30' },
      { name: 'בנות (יא-יב)', coach: 'שגב', hours: '18:30-20:30' },
    ],
  },
  {
    id: 'kochav-yair', city: 'כוכב יאיר', region: 'שרון', lng: 35.005, lat: 32.225,
    manager: "קורן קופלוביץ'", venue: 'אתלטיקה כ"י', days: 'ראשון ורביעי',
    teams: [
      { name: 'ילדים (ז-ח בנים + ז-ט בנות)', coach: 'רם אסא', hours: '17:00-18:15' },
      { name: 'נערים (ט-י)', coach: 'קורן', hours: '18:30-20:00' },
      { name: 'בנים (יא-יב)', coach: 'בן שטראובר', hours: '18:30-20:30' },
      { name: 'בנות (י-יב)', coach: 'מאיה אברך', hours: '18:30-20:30' },
    ],
  },
  {
    id: 'kfar-saba', city: 'כפר סבא', region: 'שרון', lng: 34.907, lat: 32.175,
    manager: "קורן קופלוביץ'", venue: 'ספורטק כפר סבא', days: 'שני וחמישי',
    teams: [
      { name: 'יסודי (ה-ו)', coach: 'קורן', hours: '17:00-18:00', note: 'יפתח במהלך השנה' },
      { name: 'ילדים (ז-ח בנים + ז-ט בנות)', coach: 'קורן', hours: '17:00-18:15' },
      { name: 'נערים (ט-י)', coach: 'ניר פנר', hours: '18:30-20:00' },
      { name: 'בנים (יא-יב)', coach: 'אורי לוי', hours: '18:30-20:30' },
      { name: 'בנות (י-יב)', coach: 'קורן', hours: '18:30-20:30' },
    ],
  },
  {
    id: 'kiryat-ono', city: 'קרית אונו', region: 'מרכז', lng: 34.855, lat: 32.0556,
    manager: "קורן קופלוביץ'", venue: 'רייספלד', days: 'ראשון ורביעי',
    teams: [
      { name: 'ילדים (ז-ח)', coach: 'נועם להט', hours: '17:00-18:15' },
      { name: 'נערים ונערות (ט-י)', coach: 'כפיר שמחה', hours: '17:00-18:15' },
      { name: 'בנים (יא-יב)', coach: 'כפיר שמחה', hours: '18:30-20:30' },
    ],
  },
  {
    id: 'givat-shmuel', city: 'גבעת שמואל', region: 'מרכז', lng: 34.848, lat: 32.077,
    manager: "קורן קופלוביץ'", venue: 'פארק דרום', days: 'שני וחמישי',
    teams: [
      { name: 'יסודי (ה-ו)', coach: 'נועם להט', hours: '18:00-19:00', note: 'יפתח במהלך השנה' },
      { name: 'ילדים (ז-ח)', coach: 'נועם להט', hours: '18:00-19:15' },
      { name: 'נערים (ט-י)', coach: 'נועם להט', hours: '19:30-21:00' },
      { name: 'בנים (יא-יב)', coach: 'כפיר שמחה', hours: '19:30-21:15' },
    ],
  },
]

// ── Gallery (גלריה) ────────────────────────────────────────────────────────────
// Add image paths to show real photos; empty strings render placeholders.
export const gallery = [
  { id: 'g1', src: '/liba_pics/214A0223.jpg', alt: 'פעילות קבוצות הנוער' },
  { id: 'g2', src: '/liba_pics/214A9628.jpg', alt: 'פעילות קבוצות הנוער' },
  { id: 'g3', src: '/liba_pics/214A9700.jpg', alt: 'פעילות קבוצות הנוער' },
  { id: 'g4', src: '/liba_pics/214A0052.jpg', alt: 'פעילות קבוצות הנוער' },
  { id: 'g5', src: '/liba_pics/214A1343.jpg', alt: 'פעילות קבוצות הנוער' },
  { id: 'g6', src: '/liba_pics/214A0405-2.jpg', alt: 'פעילות קבוצות הנוער' },
  { id: 'g7', src: '/liba_pics/214A1552.jpg', alt: 'פעילות קבוצות הנוער' },
  { id: 'g8', src: '/liba_pics/214A0362.jpg', alt: 'פעילות קבוצות הנוער' },
  { id: 'g9', src: '/liba_pics/214A0005.jpg', alt: 'פעילות קבוצות הנוער' },
]

// ── FAQ (שאלות נפוצות) ─────────────────────────────────────────────────────────
export const faq = [
  { id: 'f1', q: 'האם זה מתאים לכולם?', a: 'כן. השיטה מותאמת לכל נער/ה, ללא קשר לרקע ספורטיבי קודם. כל אחד ואחת מתקדמים מהנקודה שבה הם נמצאים.' }, // TODO
  { id: 'f2', q: 'מה העלות?', a: 'פרטי העלות משתנים בין הקבוצות והאזורים. השאירו פרטים ונחזור אליכם עם כל המידע.' }, // TODO
  { id: 'f3', q: 'מה קורה במקרה של פציעה?', a: 'בטיחות המתאמנים והמתאמנות היא בראש סדר העדיפויות. הצוות מוסמך ופועל לפי נהלים ברורים בכל מצב.' }, // TODO
  { id: 'f4', q: 'כמה פעמים בשבוע נפגשים?', a: 'הקבוצות נפגשות מספר פעמים בשבוע, בהתאם לגיל ולאזור. הפרטים המלאים מופיעים במידע על המיקומים.' }, // TODO
  { id: 'f5', q: 'איך נרשמים לקבוצה?', a: 'פשוט מאוד: לחצו על "הרשמה לקבוצה", השאירו פרטים, ואנחנו נחזור אליכם ונחבר אתכם לקבוצה הקרובה.' }, // TODO
]
