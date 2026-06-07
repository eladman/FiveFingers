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
  { value: 3000, suffix: '+', label: 'מתאמנים ומתאמנות פעילים' }, // TODO: confirm
  { value: 80,   suffix: '',  label: 'קבוצות פעילות' },           // TODO: confirm
  { value: 12,   suffix: '',  label: 'אזורים בארץ' },             // TODO: confirm
  { value: 120,  suffix: '',  label: 'מאמנים ומאמנות' },          // TODO: confirm
  { value: 1500, suffix: '+', label: 'בוגרים ובוגרות' },          // TODO: confirm
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
  { id: 'c1', name: 'שם המאמן/ת', role: 'מאמן/ת ראשי/ת', bio: 'משפט קצר על הרקע והדרך.', imageSrc: '' }, // TODO
  { id: 'c2', name: 'שם המאמן/ת', role: 'מאמן/ת',         bio: 'משפט קצר על הרקע והדרך.', imageSrc: '' }, // TODO
  { id: 'c3', name: 'שם המאמן/ת', role: 'מאמן/ת',         bio: 'משפט קצר על הרקע והדרך.', imageSrc: '' }, // TODO
  { id: 'c4', name: 'שם המאמן/ת', role: 'מאמן/ת',         bio: 'משפט קצר על הרקע והדרך.', imageSrc: '' }, // TODO
]

// ── Locations + map (מיקומים ומפה) ────────────────────────────────────────────
// `lng`/`lat` are the real geographic coordinates of each group's city. They are
// projected onto the Israel outline automatically (see src/data/israelOutline.js),
// so pins always land in the right place — just edit the coordinates.
export const locations = [
  { id: 'north',  region: 'צפון',      city: 'חיפה והקריות',    hours: 'ימים א׳, ד׳ · 17:00–19:00', lng: 34.989, lat: 32.794 }, // TODO
  { id: 'haifa',  region: 'חוף הכרמל', city: 'זכרון יעקב',      hours: 'ימים ב׳, ה׳ · 17:30–19:30', lng: 34.954, lat: 32.572 }, // TODO
  { id: 'center', region: 'מרכז',      city: 'תל אביב והשרון',  hours: 'ימים א׳, ג׳ · 18:00–20:00', lng: 34.782, lat: 32.085 }, // TODO
  { id: 'jeru',   region: 'ירושלים',   city: 'ירושלים',        hours: 'ימים ב׳, ד׳ · 17:00–19:00', lng: 35.214, lat: 31.768 }, // TODO
  { id: 'shfela', region: 'שפלה',      city: 'מודיעין ובית שמש', hours: 'ימים א׳, ה׳ · 17:30–19:30', lng: 34.990, lat: 31.820 }, // TODO
  { id: 'south',  region: 'דרום',      city: 'באר שבע',        hours: 'ימים ב׳, ה׳ · 17:00–19:00', lng: 34.791, lat: 31.252 }, // TODO
]

// ── Gallery (גלריה) ────────────────────────────────────────────────────────────
// Add image paths to show real photos; empty strings render placeholders.
export const gallery = [
  { id: 'g1', src: '', alt: 'פעילות ליבה' }, // TODO
  { id: 'g2', src: '', alt: 'פעילות ליבה' }, // TODO
  { id: 'g3', src: '', alt: 'פעילות ליבה' }, // TODO
  { id: 'g4', src: '', alt: 'פעילות ליבה' }, // TODO
  { id: 'g5', src: '', alt: 'פעילות ליבה' }, // TODO
  { id: 'g6', src: '', alt: 'פעילות ליבה' }, // TODO
]

// ── FAQ (שאלות נפוצות) ─────────────────────────────────────────────────────────
export const faq = [
  { id: 'f1', q: 'האם הליבה מתאימה לכולם?', a: 'כן. השיטה מותאמת לכל נער/ה, ללא קשר לרקע ספורטיבי קודם — כל אחד ואחת מתקדמים מהנקודה שבה הם נמצאים.' }, // TODO
  { id: 'f2', q: 'מה העלות?', a: 'פרטי העלות משתנים בין הקבוצות והאזורים. השאירו פרטים ונחזור אליכם עם כל המידע.' }, // TODO
  { id: 'f3', q: 'מה קורה במקרה של פציעה?', a: 'בטיחות המתאמנים והמתאמנות היא בראש סדר העדיפויות. הצוות מוסמך ופועל לפי נהלים ברורים בכל מצב.' }, // TODO
  { id: 'f4', q: 'כמה פעמים בשבוע נפגשים?', a: 'הקבוצות נפגשות מספר פעמים בשבוע, בהתאם לגיל ולאזור. הפרטים המלאים מופיעים במידע על המיקומים.' }, // TODO
  { id: 'f5', q: 'איך נרשמים לקבוצה?', a: 'פשוט מאוד — לחצו על "הרשמה לקבוצה", השאירו פרטים, ואנחנו נחזור אליכם ונחבר אתכם לקבוצה הקרובה.' }, // TODO
]
