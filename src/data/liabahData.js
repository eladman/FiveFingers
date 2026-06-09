// ─────────────────────────────────────────────────────────────────────────────
//  ליבה (Liabah / Core) — page content
//  Single source of truth. Edit the values below to update the page.
//  Strings marked `TODO` are placeholders awaiting real content from the team.
//  Hebrew copy follows the movement's gender-neutral policy (plural / slash forms).
// ─────────────────────────────────────────────────────────────────────────────

// ── Hero ──────────────────────────────────────────────────────────────────────
export const hero = {
  eyebrow: 'ארגון הליבה',
  title: 'ליבה',
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
      text: 'אתגר גופני שמפתח חוסן, הרגלים ומשמעת. מכל מפגש יוצאים חזקים יותר — בגוף ובמחשבה.',
      imageSrc: '/our_product_pics/core_pic.jpg',
      objectPosition: '50% 20%',
    },
    {
      num: '02',
      title: 'קבוצה',
      text: 'קהילה מלוכדת שמייצרת שייכות וכוח משותף. לומדים שמשיגים יותר ביחד מאשר לבד.',
      imageSrc: '/our_product_pics/collab_pic.jpg',
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
  { value: 67,   suffix: '',  label: 'קבוצות פעילות' },
  { value: 18,   suffix: '',  label: 'אזורים בארץ' },
  { value: 60,   suffix: '',  label: 'מאמנים ומאמנות' },
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
    imageSrc: '', // TODO: '/our_product_pics/...'
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
    imageSrc: '', // TODO
  },
]

// ── A year in Liabah (שנה בליבה) ──────────────────────────────────────────────
export const yearTimeline = [
  { period: 'ספטמבר–אוקטובר', title: 'פתיחת שנה וגיבוש', text: 'היכרות, הצבת יעדים אישיים וקבוצתיים ותחילת המסע.' }, // TODO
  { period: 'נובמבר–ינואר',   title: 'אימונים שבועיים',   text: 'בניית בסיס פיזי-מנטלי קבוע, אתגרים מתגברים ועבודת צוות.' }, // TODO
  { period: 'פברואר–מרץ',     title: 'אירוע שיא חורפי',   text: 'אתגר מאתגר שמגבש את הקבוצה ומוציא את המיטב מכל מתאמן/ת.' }, // TODO
  { period: 'אפריל–מאי',      title: 'מופע ותכנית דגל',   text: 'הצגת התהליך והישגי השנה בפני הקהילה והמשפחות.' }, // TODO
  { period: 'יוני–יולי',      title: 'מסע סיכום',         text: 'אירוע שיא מסכם, חגיגת צמיחה והעברת מקל לשנה הבאה.' }, // TODO
]

// ── What a training session includes (מה כולל האימון) ──────────────────────────
export const trainingItems = [
  { icon: 'Activity',  title: 'אימון גופני',     text: 'מאמץ פיזי הדרגתי שבונה כושר, חוסן ומשמעת.' },     // TODO
  { icon: 'Brain',     title: 'חוסן מנטלי',      text: 'התמודדות עם קושי, יציאה מאזור הנוחות ועמידה ביעדים.' }, // TODO
  { icon: 'Users',     title: 'עבודת צוות',      text: 'משימות קבוצתיות שמחזקות שיתוף פעולה ואמון.' },      // TODO
  { icon: 'Heart',     title: 'שיח ערכי',        text: 'עיבוד החוויה וחיבור לערכי התנועה והמצוינות הערכית.' }, // TODO
]

// ── Coaches (מאמנים) ───────────────────────────────────────────────────────────
export const coaches = [
  { id: 'c1', name: 'רועי רוט',    role: 'מנהל בייס מרכז',  bio: '', imageSrc: '/coachs/roi.JPG' },
  { id: 'c2', name: 'עמית מירן',    role: 'מנהלת בייס שרון', bio: '', imageSrc: '/coachs/amit.JPG' },
  { id: 'c3', name: 'גיא טרנטו',   role: 'מנהל בייס צפון',  bio: '', imageSrc: '/coachs/taranto.JPG' },
]

// ── Locations + map (מיקומים ומפה) ────────────────────────────────────────────
// `lng`/`lat` are the real geographic coordinates of each city. They are
// projected onto the Israel outline automatically (see src/data/israelOutline.js),
// so pins always land in the right place — just edit the coordinates.
//   city  — city name (shown on the map, list, and detail panel)
//   days  — workout days for the city's groups (from teams.csv)
//   teams — the group names that run in the city (shown in the detail panel)
//   manager — optional מנהל/ת אזור object { name, role, image, bio }; null → hidden
// Generated from teams.csv — edit team names / days there and keep this in sync.
export const locations = [
  {
    id: 'tel-aviv', city: 'תל אביב', days: 'ראשון ורביעי', lng: 34.7818, lat: 32.0853, manager: null,
    teams: ['תל אביב ילדים (ו-ח)', 'תל אביב נערים (ט-י)', 'תל אביב נוער בנים (י-יב)', 'תל אביב נוער בנות (י-יב)'],
  },
  {
    id: 'tel-mond', city: 'תל מונד', days: 'ראשון ורביעי', lng: 34.917, lat: 32.250, manager: null,
    teams: ['תל מונד ילדים (ז-ט)', 'תל מונד נוער בנים (י-יב)'],
  },
  {
    id: 'raanana', city: 'רעננה', days: 'ראשון ורביעי', lng: 34.8707, lat: 32.1847, manager: null,
    teams: ['רעננה ילדים (ו-ז)', 'רעננה נערים (ח-ט)', 'רעננה נערות (ח-ט)', 'רעננה נוער בנים (י-יב)', 'רעננה נוער בנות (י-יב)'],
  },
  {
    id: 'ramat-yishai', city: 'רמת ישי', days: 'ראשון ורביעי', lng: 35.170, lat: 32.7035, manager: null,
    teams: ['רמת ישי ג-ד', 'רמת ישי ה-ו'],
  },
  {
    id: 'kiryat-ono', city: 'קרית אונו', days: 'שני וחמישי', lng: 34.855, lat: 32.0556, manager: null,
    teams: ['קרית אונו נערים (ז-ט)', 'קרית אונו נוער בנים (י-יב)', 'קרית אונו בנות (י-יב)'],
  },
  {
    id: 'kiryat-tivon', city: 'קריית טבעון', days: 'ראשון ורביעי', lng: 35.1236, lat: 32.7197, manager: null,
    teams: ['קריית טבעון ילדים (ז-ט)', 'קריית טבעון נוער בנים (י-יב)', 'קריית טבעון בנות (י-יב)'],
  },
  {
    id: 'petah-tikva', city: 'פתח תקווה', days: 'ראשון ורביעי', lng: 34.8878, lat: 32.0840, manager: null,
    teams: ['פתח תקווה בנים (י-יב)'],
  },
  {
    id: 'emek-yizrael', city: 'עמק יזרעאל', days: 'שני וחמישי', lng: 35.290, lat: 32.620, manager: null,
    teams: ['עמק יזרעאל ילדים (ז-ט)', 'עמק יזרעאל ילדות (ז׳-ט׳)', 'עמק יזרעאל נערים (י)', 'עמק יזרעאל נוער בנים (יא-יב)', 'עמק יזרעאל נוער בנות (י-יב)'],
  },
  {
    id: 'emek-hefer-west', city: 'עמק חפר מערב', days: 'ראשון ורביעי', lng: 34.875, lat: 32.390, manager: null,
    teams: ['עמק חפר מערב ילדים (ז-ח)', 'עמק חפר נערים (ט-י)', 'עמק חפר בנים (יא-יב)', 'עמק חפר בנות (י-יב)'],
  },
  {
    id: 'emek-hefer-east', city: 'עמק חפר מזרח', days: 'שני וחמישי', lng: 34.990, lat: 32.370, manager: null,
    teams: ['עמק חפר מזרח ילדים (ז-ט)', 'עמק חפר מזרח נוער בנים', 'עמק חפר מזרח נוער בנות (י׳-י״ב)'],
  },
  {
    id: 'kfar-saba', city: 'כפר סבא', days: 'ראשון ורביעי', lng: 34.907, lat: 32.175, manager: null,
    teams: ['כפר סבא ילדים (ז-ח)', 'כפר סבא נערים (ט-י)', 'כפר סבא נערות (ט)', 'כפר סבא נוער בנים (יא-יב)', 'כפר סבא נוער בנות (י-יב)'],
  },
  {
    id: 'kfar-yona', city: 'כפר יונה', days: 'ראשון ורביעי', lng: 34.933, lat: 32.317, manager: null,
    teams: ['כפר יונה ילדים (ו-ז)', 'כפר יונה נערים (ח-ט)', 'כפר יונה נוער בנים', 'כפר יונה נוער בנות'],
  },
  {
    id: 'kochav-yair', city: 'כוכב יאיר', days: 'ראשון ורביעי', lng: 35.005, lat: 32.225, manager: null,
    teams: ['כוכב יאיר ילדים (ז-ח)', 'כוכב יאיר נערים (ט-י)', 'כוכב יאיר נערות (ט-י)', 'כוכב יאיר נוער בנים (יא-יב)', 'כוכב יאיר בנות (יא-יב)'],
  },
  {
    id: 'jerusalem', city: 'ירושלים', days: 'שני וחמישי', lng: 35.2137, lat: 31.7683, manager: null,
    teams: ['ירושלים בנים (י-יב)'],
  },
  {
    id: 'zichron', city: 'זכרון יעקב', days: 'שני וחמישי', lng: 34.954, lat: 32.572, manager: null,
    teams: ['זכרון יעקב ילדים (ו-ז)', 'זכרון יעקב חטיבות (ח-ט)', 'זכרון יעקב נוער בנים (י-יב)', 'זכרון יעקב נוער בנות (י-יב)'],
  },
  {
    id: 'herzliya', city: 'הרצליה', days: 'שני וחמישי', lng: 34.844, lat: 32.166, manager: null,
    teams: ['הרצליה יסודי', 'הרצליה ילדים (ו-ז)', 'הרצליה נערים (ח-ט)', 'הרצליה נוער בנים (י-יב)', 'הרצליה נוער בנות (י-יב)'],
  },
  {
    id: 'hod-hasharon', city: 'הוד השרון', days: 'שני וחמישי', lng: 34.889, lat: 32.150, manager: null,
    teams: ['הוד השרון ילדים (ז-ח)', 'הוד השרון נערים (ט-י)', 'הוד השרון נוער בנים (יא-יב)', 'הוד השרון נוער בנות (י-יב)'],
  },
  {
    id: 'givat-shmuel', city: 'גבעת שמואל', days: 'שני וחמישי', lng: 34.848, lat: 32.077, manager: null,
    teams: ['גבעת שמואל ילדים (ו-ז)', 'גבעת שמואל נערים (ח-ט)', 'גבעת שמואל נוער בנים (י-יב)'],
  },
  {
    id: 'even-yehuda', city: 'אבן יהודה', days: 'שני וחמישי', lng: 34.888, lat: 32.270, manager: null,
    teams: ['אבן יהודה ילדים', 'אבן יהודה נערים', 'אבן יהודה נוער בנים (יא-יב)', 'אבן יהודה נוער בנות (י-יב)'],
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
