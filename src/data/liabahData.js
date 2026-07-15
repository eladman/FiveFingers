// ─────────────────────────────────────────────────────────────────────────────
//  ליבה (Liabah / Core) — page content
//  Single source of truth. Edit the values below to update the page.
//  Strings marked `TODO` are placeholders awaiting real content from the team.
//  Hebrew copy follows the movement's gender-neutral policy (plural / slash forms).
// ─────────────────────────────────────────────────────────────────────────────

// ── Hero ──────────────────────────────────────────────────────────────────────
export const hero = {
  eyebrow: 'הליבה',
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
  heading: 'מה זה ליבה?',
  subheading: 'מסגרת חינוכית בלתי פורמלית שמקדמת כל נער/ה למקסום הפוטנציאל שלו/ה',
  // The intro paragraph supplied by the ליבה CEO (verbatim).
  paragraph:
    'ארגון הליבה הוא מסגרת חינוכית בלתי פורמלית שמקדמת כל נער/ה למקסום הפוטנציאל שלו/ה. ' +
    'במסגרת הפעילות עוברים המתאמנים והמתאמנות תהליך חינוכי המורכב משלושה שלבים: מסוגלות – שייכות – השפעה. ' +
    'התהליך בא לידי ביטוי באמצעות שיטה ייחודית המשלבת בין האימון הפיזי-מנטלי, השייכות לקבוצה והחיבור האישי למאמן. ' +
    'מטרתו לבנות בסיס אישיותי-ערכי רחב, להקנות כלים להתמודדות עם האתגרים הקיימים ולאפשר לבני ובנות הנוער ' +
    'למקסם את הפוטנציאל שלהם למען השפעה וקידום החברה הישראלית.',
  // The 3-stage journey.
  stages: [
    { num: '01', title: 'מסוגלות', text: 'בונים ביטחון ויכולת אישית דרך אתגר פיזי-מנטלי הדרגתי.' },
    { num: '02', title: 'שייכות', text: 'נהיים חלק מקבוצה מלוכדת עם מטרה משותפת ואמון הדדי.' },
    { num: '03', title: 'השפעה', text: 'לוקחים אחריות ופועלים לקידום הסביבה והחברה הישראלית.' },
  ],
  // The method's 3 pillars.
  pillars: [
    {
      num: '01',
      title: 'אימון פיזי-מנטלי',
      text: ' תהליך חינוכי שבו הפעילות הגופנית משמשת ככלי לפיתוח מנטלי. אימון נבנה כך שלא רק ישפר את הכושר, אלא גם יחזק ערכים, אופי והרגלים. המטרה היא שהיכולות שנרכשות באימון יבואו לידי ביטוי בבית הספר, בצבא, בעבודה ובחיים בכלל.',
      imageSrc: '/liba_pics/214A0223.jpg',
      objectPosition: '50% 20%',
    },
    {
      num: '02',
      title: 'קבוצה',
      text: 'קהילה מלוכדת שמייצרת שייכות וכוח משותף. לומדים שמשיגים יותר ביחד מאשר לבד.',
      imageSrc: '/our_product_pics/core_pic.jpg',
      objectPosition: '50% 20%',
    },
    {
      num: '03',
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
    title: 'ליבה צעירה',
    ages: 'גילאי 10–12 · כיתות ה׳–ו׳',
    description:
      'הצעד הראשון בעולם הליבה — היכרות עם השיטה דרך משחק, תנועה ואתגר מותאם גיל, בקבוצה תומכת.', // TODO
    imageSrc: '/plans_pics/kids_liba.jpg',
  },
  {
    id: 'middle',
    title: 'חטיבת הביניים',
    ages: 'גילאי 12–15 · כיתות ז׳–ט׳',
    description:
      'יסודות השיטה הפיזית-מנטלית — בונים חוסן, הרגלים ויכולת עבודה בצוות בתקופת גיבוש זהות משמעותית.', // TODO
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

// ── Coaches (מאמנים) ───────────────────────────────────────────────────────────
// `region` matches a location's `region` (below) so the map's city detail panel
// can show the right regional coach. `bio` is a TODO placeholder pending real copy.
// `imgPosition` (CSS object-position) keeps the face in frame across the square
// grid tile, the 4:3 mobile carousel, and the wide city-detail banner — the
// source photos are headshot crops with the face in the upper third.
export const coaches = [
  { id: 'c1', name: 'רועי רוט',    role: 'מנהל מחוז מרכז',  region: 'מרכז', bio: 'קצין בשייטת 13 במילואים,מאמן 4 שנים בתנועה ומוביל צוותים, בשלוש שנים האחרונות מוביל את אזור המרכז', imageSrc: '/coachs/roi.JPG', imgPosition: '50% 22%' }, // TODO
  { id: 'c2', name: 'עמית מירן',    role: ' מנהלת מחוז צפון', region: 'שרון', bio: 'לשעבר מפקדת פלוגה בקורס מדריכי כושר בצה״ל, סטודנטית לתואר ראשון בתל אביב. מאמנת 3 שנים בתנועה ובמקביל מנהלת את אזור השרון והצפון', imageSrc: '/coachs/amit.JPG', imgPosition: '50% 25%' }, // TODO
  { id: 'c3', name: 'גיא טרנטו',   role: 'מנהל בייס צפון',  region: 'צפון', bio: 'טקסט קצר על המאמן/ת יתווסף כאן בקרוב.', imageSrc: '/coachs/taranto.JPG', imgPosition: '50% 20%' }, // TODO
]

// ── Locations + map (מיקומים ומפה) ────────────────────────────────────────────
// `lng`/`lat` are the real geographic coordinates of each area. They are
// projected onto the Israel outline automatically (see src/data/israelOutline.js),
// so pins always land in the right place — just edit the coordinates.
//   city    — area name (shown on the map, list, and detail panel)
//   region  — 'מרכז' | 'שרון' | 'צפון' — groups the mobile region tabs
//   manager — area lead (מנהל/ת בייס), shown as the area lead in the detail panel
//   venue   — where the groups train (מיקום)
//   days    — workout days for the area's groups
//   teams   — the groups that run in the area: { name, coach }. `coach` (מאמן 1)
//             is stored for reference; the panel currently lists names only.
// Generated from "קבוצות שנה 13.html" (year-13 planning sheet). Groups explicitly
// flagged as not starting were dropped; groups without an assigned coach are kept.
export const locations = [
  {
    id: 'emek-hefer-east', city: 'עמק חפר מזרח', region: 'שרון', lng: 34.99, lat: 32.37,
    manager: 'מתן רון', venue: 'בת חפר', days: 'שני וחמישי',
    teams: [ { name: "עמק חפר מזרח (ז'-ח')", coach: 'מתן רון' }, { name: 'עמק חפר מזרח נערים (ט-י)', coach: 'מתן רון' }, { name: 'עמק חפר מזרח בנים (י - יא)', coach: 'מתן רון' }, { name: 'עמק חפר מזרח בנות (י - יב)', coach: 'עמית מירן' } ],
  },
  {
    id: 'emek-hefer-west', city: 'עמק חפר מערב', region: 'שרון', lng: 34.875, lat: 32.39,
    manager: 'מתן רון', venue: 'רופין', days: 'ראשון ורביעי',
    teams: [ { name: 'עמק חפר מערב יסודי (ה -ו)', coach: '' }, { name: 'עמק חפר מערב (ז-ח)', coach: 'מתן רון' }, { name: 'עמק חפר מערב נערות (ט-י)', coach: 'מתן רון' }, { name: 'עמק חפר מערב נערים (ט-י)', coach: 'ערן מובשוביץ' }, { name: 'עמק חפר מערב בנים (יא - יב)', coach: 'מתן רון' }, { name: 'עמק חפר מערב בנות (יא - יב)', coach: 'מתן רון' } ],
  },
  {
    id: 'even-yehuda', city: 'אבן יהודה', region: 'שרון', lng: 34.888, lat: 32.27,
    manager: 'עמית בן עמי', venue: 'ראלף / הכביש הישן', days: 'שני וחמישי',
    teams: [ { name: 'נוער בנים (י-יב)', coach: 'אבדר' }, { name: 'נוער בנות (י-יב)', coach: 'מיטל' }, { name: 'נערים נערות (ט)', coach: 'אבדר' }, { name: 'ילדים (ו-ח)', coach: 'מיטל' } ],
  },
  {
    id: 'tel-mond', city: 'תל מונד', region: 'שרון', lng: 34.917, lat: 32.25,
    manager: 'עמית בן עמי', venue: 'פארק היערות', days: 'שני וחמישי',
    teams: [ { name: 'תל מונד נוער (יא-יב)', coach: 'רועי גונן' }, { name: 'תל מונד נערים נערות (ט-י)', coach: 'עמית בן עמי' }, { name: 'תל מונד ילדים (ו-ז-ח)', coach: 'עמית בן עמי' } ],
  },
  {
    id: 'kfar-yona', city: 'כפר יונה', region: 'שרון', lng: 34.933, lat: 32.317,
    manager: 'עמית בן עמי', venue: 'פארק שרונה', days: 'ראשון ורביעי',
    teams: [ { name: 'נוער בנים (יא-יב)', coach: 'רועי גונן' }, { name: 'נוער בנות (יא-יב)', coach: 'עמית מירן' }, { name: 'נערים נערות (ט-י)', coach: 'אבדר' }, { name: 'ילדים (ז-ח)', coach: 'קליינר' }, { name: 'יסודי (ה-ו)', coach: 'קליינר' } ],
  },
  {
    id: 'zichron', city: 'זכרון יעקב', region: 'צפון', lng: 34.954, lat: 32.572,
    manager: 'עדן בראון', venue: 'פארק המושבה זכרון', days: 'שני וחמישי',
    teams: [ { name: 'זכרון יסודי ה-ו', coach: 'עדן' }, { name: 'זכרון ילדים ז-ח', coach: 'עדן' }, { name: 'זכרון נערים ט׳', coach: 'עדן' }, { name: 'זכרון נוער בנים י׳-י״ב', coach: 'גיא בארי' }, { name: 'זכרון נוער בנות י׳-י״ב', coach: 'אור כהן' } ],
  },
  {
    id: 'ramat-yishai', city: 'רמת ישי', region: 'צפון', lng: 35.17, lat: 32.7035,
    manager: 'יניב שורר', venue: 'ארזים- רמת ישי', days: 'ראשון ורביעי',
    teams: [ { name: "רמת ישי ג'-ד'", coach: 'תאבט' }, { name: "רמת ישי ה'-ו'", coach: 'יניב שורר' } ],
  },
  {
    id: 'kiryat-tivon', city: 'קריית טבעון', region: 'צפון', lng: 35.1236, lat: 32.7197,
    manager: 'גיא טרנטו', venue: 'בית ספר צל אורנים', days: 'ראשון ורביעי',
    teams: [ { name: 'טבעון נוער בנים (י\'-י"ב)', coach: 'בנטל' }, { name: 'טבעון נוער בנות (י\'-י"ב)', coach: 'אור פרץ' }, { name: "טבעון ילדים (ז'-ט')", coach: 'בנטל' } ],
  },
  {
    id: 'emek-yizrael', city: 'עמק יזרעאל', region: 'צפון', lng: 35.29, lat: 32.62,
    manager: 'גיא טרנטו', venue: 'נהלל- אולם ספורט', days: 'שני וחמישי',
    teams: [ { name: 'עמק יזרעאל נוער בנים (י"א י"ב)', coach: 'גיא טרנטו' }, { name: 'עמק יזרעאל נוער בנות ( י\'-י"ב)', coach: 'גיל טל' }, { name: "עמק יזרעאל נערים (ט'-י')", coach: 'אור פרץ' }, { name: "עמק יזרעאל ילדים (ז'-ח')", coach: 'יניב שורר' }, { name: "עמק יזרעאל ילדות (ז'-ט')", coach: 'גיל טל' } ],
  },
  {
    id: 'tel-aviv', city: 'תל אביב', region: 'מרכז', lng: 34.7818, lat: 32.0853,
    manager: 'עידן ילין', venue: 'ספורטק ת"א', days: 'ראשון ורביעי',
    teams: [ { name: 'תל אביב יסודי ה-ו', coach: 'עידן ילין' }, { name: 'תל אביב ילדים ז-ח', coach: 'עידן ילין' }, { name: 'תל אביב נערים ט-י', coach: 'עידן ילין' }, { name: 'תל אביב בנים יא-יב', coach: 'עומר גרסטן' }, { name: 'תל אביב בנות יא-יב', coach: 'גל רוזנקרנץ' } ],
  },
  {
    id: 'herzliya', city: 'הרצליה', region: 'שרון', lng: 34.844, lat: 32.166,
    manager: 'עידן ילין', venue: 'פארקר הרצליה', days: 'שני וחמישי',
    teams: [ { name: 'הרצליה ילדים ז-ח', coach: 'עידן ילין' }, { name: 'הרצליה נערים ט-י', coach: 'אמיר סיבור' }, { name: 'הרצליה בנים יא-יב', coach: 'עומר גרסטן' }, { name: 'הרצליה בנות יא-יב', coach: 'עידן ילין' } ],
  },
  {
    id: 'raanana', city: 'רעננה', region: 'שרון', lng: 34.8707, lat: 32.1847,
    manager: 'בן שטראובר', venue: 'פארק רעננה', days: 'ראשון ורביעי',
    teams: [ { name: 'רעננה ילדים (ז-ח)', coach: 'יובל המלך' }, { name: 'רעננה נערים (ט-י)', coach: 'שגב' }, { name: 'רעננה נערות (ט-י)', coach: '' }, { name: 'רעננה בנים (יא-יב)', coach: 'שטראובר' }, { name: 'רעננה בנות (יא-יב)', coach: '' } ],
  },
  {
    id: 'hod-hasharon', city: 'הוד השרון', region: 'שרון', lng: 34.889, lat: 32.15,
    manager: 'בן שטראובר', venue: 'פארק אקולוגי', days: 'שני וחמישי',
    teams: [ { name: 'הודש ילדים (ז-ח)', coach: 'יובל המלך' }, { name: 'הודש נערים (ט-י)', coach: 'שגב' }, { name: 'הודש נערות (ט-י)', coach: '' }, { name: 'הודש בנים (יא-יב)', coach: 'שטראובר' }, { name: 'הודש בנות (יא-יב)', coach: '' } ],
  },
  {
    id: 'kochav-yair', city: 'כוכב יאיר', region: 'שרון', lng: 35.005, lat: 32.225,
    manager: "קורן קופלוביץ'", venue: 'אתלטיקה כ"י', days: 'ראשון ורביעי',
    teams: [ { name: 'כוכב יאיר ילדים', coach: 'רם אסא' }, { name: 'כוכב יאיר נערים (ט-י)', coach: 'עמית ברקן' }, { name: 'כוכב יאיר בנים (יא-יב)', coach: 'רועי רוט' }, { name: 'כוכב יאיר בנות', coach: '' } ],
  },
  {
    id: 'kfar-saba', city: 'כפר סבא', region: 'שרון', lng: 34.907, lat: 32.175,
    manager: "קורן קופלוביץ'", venue: 'ספורטק כפר סבא', days: 'שני וחמישי',
    teams: [ { name: 'כפר סבא ילדים (ז-ח)', coach: 'קורן' }, { name: 'כפר סבא ילדות (ז-ט)', coach: 'קורן' }, { name: 'כפר סבא נערים (ט-י)', coach: '' }, { name: 'כפר סבא בנים (יא-יב)', coach: 'רועי רוט' }, { name: 'כפר סבא בנות (יא-יב)', coach: 'קורן' } ],
  },
  {
    id: 'jerusalem', city: 'ירושלים', region: 'מרכז', lng: 35.2137, lat: 31.7683,
    manager: "קורן קופלוביץ'", venue: 'גן סאקר', days: 'שני וחמישי',
    teams: [ { name: 'ירושלים בנים (י-יב)', coach: 'רם אסא' } ],
  },
  {
    id: 'kiryat-ono', city: 'קרית אונו', region: 'מרכז', lng: 34.855, lat: 32.0556,
    manager: 'כפיר שמחה', venue: 'רייספלד', days: 'ראשון ורביעי',
    teams: [ { name: 'קריית אונו ילדים (ו׳-ח׳)', coach: 'אורי לוי' }, { name: 'קריית אונו נערים (ט׳-י׳)', coach: 'נועם להט' }, { name: 'קריית אונו בנים (יא-יב)', coach: 'כפיר שמחה' }, { name: 'קריית אונו בנות (י-יב)', coach: '' } ],
  },
  {
    id: 'givat-shmuel', city: 'גבעת שמואל', region: 'מרכז', lng: 34.848, lat: 32.077,
    manager: 'כפיר שמחה', venue: 'פארק דרום', days: 'שני וחמישי',
    teams: [ { name: 'גב״ש ילדים (ז-ח)', coach: 'נועם להט' }, { name: 'גב״ש נערים (ט-י)', coach: 'נועם להט' }, { name: 'גב״ש בנים (יא-יב)', coach: 'כפיר שמחה' } ],
  },
  {
    id: 'petah-tikva', city: 'פתח תקווה', region: 'מרכז', lng: 34.8878, lat: 32.084,
    manager: 'כפיר שמחה', venue: '', days: 'שני וחמישי',
    teams: [ { name: 'פתח תקווה בנים (י-יב׳)', coach: 'אורי לוי' } ],
  },
]

// ── Gallery (גלריה) ────────────────────────────────────────────────────────────
// Add image paths to show real photos; empty strings render placeholders.
export const gallery = [
  { id: 'g1', src: '/liba_pics/214A0223.jpg', alt: 'פעילות ליבה' },
  { id: 'g2', src: '/liba_pics/214A9628.jpg', alt: 'פעילות ליבה' },
  { id: 'g3', src: '/liba_pics/214A9700.jpg', alt: 'פעילות ליבה' },
  { id: 'g4', src: '/liba_pics/214A0052.jpg', alt: 'פעילות ליבה' },
  { id: 'g5', src: '/liba_pics/214A1343.jpg', alt: 'פעילות ליבה' },
  { id: 'g6', src: '/liba_pics/214A0405-2.jpg', alt: 'פעילות ליבה' },
  { id: 'g7', src: '/liba_pics/214A1552.jpg', alt: 'פעילות ליבה' },
  { id: 'g8', src: '/liba_pics/214A0362.jpg', alt: 'פעילות ליבה' },
  { id: 'g9', src: '/liba_pics/214A0005.jpg', alt: 'פעילות ליבה' },
]

// ── FAQ (שאלות נפוצות) ─────────────────────────────────────────────────────────
export const faq = [
  { id: 'f1', q: 'האם הליבה מתאימה לכולם?', a: 'כן. השיטה מותאמת לכל נער/ה, ללא קשר לרקע ספורטיבי קודם — כל אחד ואחת מתקדמים מהנקודה שבה הם נמצאים.' }, // TODO
  { id: 'f2', q: 'מה העלות?', a: 'פרטי העלות משתנים בין הקבוצות והאזורים. השאירו פרטים ונחזור אליכם עם כל המידע.' }, // TODO
  { id: 'f3', q: 'מה קורה במקרה של פציעה?', a: 'בטיחות המתאמנים והמתאמנות היא בראש סדר העדיפויות. הצוות מוסמך ופועל לפי נהלים ברורים בכל מצב.' }, // TODO
  { id: 'f4', q: 'כמה פעמים בשבוע נפגשים?', a: 'הקבוצות נפגשות מספר פעמים בשבוע, בהתאם לגיל ולאזור. הפרטים המלאים מופיעים במידע על המיקומים.' }, // TODO
  { id: 'f5', q: 'איך נרשמים לקבוצה?', a: 'פשוט מאוד — לחצו על "הרשמה לקבוצה", השאירו פרטים, ואנחנו נחזור אליכם ונחבר אתכם לקבוצה הקרובה.' }, // TODO
]
