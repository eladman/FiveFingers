// All copy for the מכינת הזנק landing page (/hazanek), in one place.
// Hebrew follows the gender-neutral policy in CLAUDE.md: plural for CTAs,
// slash forms where a singular has to stay. Graduate quotes are verbatim from
// the cycle-A summary booklet (trimmed with "…", never reworded).

export const PRODUCT_TYPE = 'Boost' // Make scenario 9424367 routes leads by this exact value

export const NEXT_CYCLE = { start: '27.12', end: '5.2' }
export const NEXT_CYCLE_LABEL = `${NEXT_CYCLE.start} – ${NEXT_CYCLE.end}`

export const hero = {
  title: 'מכינת הזנק',
  subtitle: 'שישה שבועות שיכינו אתכם לשירות משמעותי. הכנה פיזית ומנטלית לצה״ל - בסבסוד מלא.',
  cta: 'להרשמה',
  image: '/hazanek/hero-sunset-deck.webp',
  imageAlt: 'משתתפי מכינת הזנק עומדים במעגל על דק עץ מול השקיעה',
}

export const about = {
  kicker: 'אודות',
  title: 'מוכנים בגוף, בראש ובלב',
  paragraphs: [
    'מכינת הזנק של חמש אצבעות היא תוכנית הכנה קדם-צבאית ממוקדת למסיימי/ות י״ב: שישה שבועות של הכנה פיזית ומנטלית לשירות משמעותי בצה״ל.',
    'המכינה פועלת בשותפות מלאה של חמש אצבעות עם משרד הביטחון, אגף כוח האדם של צה״ל וקרן הדור הבא, ומתקיימת בבית הדור הבא בחוות אהרונסון בעתלית. לצד הבית הקבוע, שבועות השטח מטיילים בכל הארץ - ירושלים, גבול הצפון ועוטף עזה.',
    'התוכנית משלבת אימונים איכותיים, פיתוח מנהיגות ואהבת הארץ, ומטרתה אחת: שתגיעו ליום הגיוס מוכנים - בגוף, בראש ובלב.',
  ],
  image: '/hazanek/group-center.webp',
  imageAlt: 'קבוצת מכינת הזנק עם תיקי שטח מול מרכז חמש אצבעות',
  imageCaption: 'בית הדור הבא · חוות אהרונסון, עתלית',
  partners: [
    { name: 'משרד הביטחון', logo: '/partners/defense.webp' },
    { name: 'אגף כוח האדם, צה״ל', logo: '/partners/idf.webp' },
    { name: 'קרן הדור הבא', logo: '/partners/hadar-habaa.webp' },
  ],
}

export const includes = {
  kicker: 'מה כוללת המכינה',
  title: 'שישה שבועות. הכל בפנים.',
  featured: [
    {
      id: 'physical',
      title: 'הכנה פיזית',
      text: 'אימונים איכותיים, מותאמים לכל רמת כושר.',
      image: '/hazanek/training.webp',
      imageAlt: 'אימון כושר קבוצתי של משתתפי המכינה',
    },
    {
      id: 'mental',
      title: 'הכנה מנטלית',
      text: 'כלים להתמודדות עם לחץ, אתגר ומסגרת צבאית.',
      image: '/hazanek/bonfire.webp',
      imageAlt: 'המשתתפים יושבים סביב מדורה בחולות בלילה',
    },
    {
      id: 'leadership',
      title: 'פיתוח מנהיגות',
      text: 'עבודת צוות, אחריות ומנהיגות אישית.',
      image: '/hazanek/circle-palms.webp',
      imageAlt: 'המשתתפים עומדים במעגל בין עצי דקל',
    },
    {
      id: 'field',
      title: 'שבועות שטח',
      text: 'טיולים ברחבי הארץ - ירושלים, גבול הצפון, עוטף עזה.',
      image: '/hazanek/ridge.webp',
      imageAlt: 'הקבוצה מטפסת על רכס במדבר',
    },
  ],
  facts: [
    { id: 'home', icon: 'home', title: 'בית קבוע', text: 'בית הדור הבא בחוות אהרונסון בעתלית.' },
    { id: 'kosher', icon: 'shabbat', title: 'כשרות ושבת', text: 'המכינה שומרת כשרות ושומרת שבת.' },
    { id: 'free', icon: 'free', title: 'סבסוד מלא', text: 'ההשתתפות ללא עלות.', highlight: true },
  ],
}

export const why = {
  kicker: 'למה דווקא הזנק',
  title: 'בידיים הכי טובות',
  reasons: [
    { title: 'ליווי לאורך כל הדרך', text: 'צוות ומומחים שמלווים כל משתתף/ת לאורך כל הדרך.' },
    { title: 'ניסיון מוכח', text: 'שנתיים של מכינת הזנק ועוד שמונה שנות ניסיון במכינות קדם-צבאיות.' },
    { title: 'גיבוי מלא', text: 'תוכנית איכותית עם גיבוי והשקעה מלאים של כל השותפות.' },
  ],
  video: {
    src: '/hazanek/boost-reel.mp4',
    poster: '/hazanek/boost-reel-poster.webp',
    label: 'צפו: מה זה הזנק',
    duration: '0:26',
  },
}

export const numbers = {
  marquee: ['מוכנים בגוף', 'בראש', 'ובלב'],
  stats: [
    { value: 6, label: 'שבועות', sub: 'של תוכנית מלאה' },
    { value: 10, label: 'שנות ניסיון', sub: 'שנתיים הזנק + 8 שנות מכינות קדם-צבאיות' },
    { value: 6, suffix: '/40', label: 'קצינים מבוגרי מחזור א׳', sub: 'ועוד מעל 10 שיצאו לפיקוד' },
  ],
  cycle: { label: 'המחזור הקרוב', value: NEXT_CYCLE_LABEL },
}

export const press = {
  kicker: 'כתבו עלינו',
  source: 'ynet',
  headline: 'בעקבות הביקוש הגבוה: תוכנית קדם־צבאית חדשה לצעירים שלא התקבלו למכינות',
  quote: 'מדי שנה נרשמים יותר מ־3,000 בני נוער למיוני מכינת חמש אצבעות, אך רק 70 מהם מתקבלים.',
  href: 'https://www.ynet.co.il/activism/article/sywlcidvge',
  linkLabel: 'לכתבה המלאה ב-ynet',
  figure: { big: '3,000', small: 'נרשמים בכל שנה למיוני המכינה', note: 'רק 70 מתקבלים. הזנק פותחת את הדלת לעוד רבים.' },
}

export const voices = {
  kicker: 'בוגרי מחזור א׳',
  title: 'במילים שלהם',
  items: [
    {
      name: 'יובל לרנר',
      role: 'בוגר מחזור א׳',
      moment: 'מסע לילה',
      quote:
        '…תוך כדי ההליכה אני מרים את הראש ורואה את הנוף המטורף שיש מזכרון, רואה את כל הארץ, לילה, חושך, ורואים את כל הארץ מוארת, פשוט עולה לי חיוך על הפנים… ואז שקט, פשוט חוויה רוחנית מטורפת.',
      image: '/hazanek/voice-yuval.webp',
    },
    {
      name: 'זוהר כהן',
      role: 'בוגרת מחזור א׳',
      moment: 'שבוע מסוגלות',
      quote:
        'הרגשתי שאני חייבת להוכיח את עצמי ולא משנה מי עומד מולי אני מנצחת… נשארנו רק אני ועידו שעומדים. ניצחנו. חייכתי ובאמת הבנתי את הכוח שיש לקבוצה.',
      image: '/hazanek/voice-zohar.webp',
    },
    {
      name: 'יערה קרמר',
      role: 'בוגרת מחזור א׳',
      moment: 'על התוכנית כולה',
      quote:
        'החוויה הכי מטורפת ומשוגעת שהייתה לי, היא הוציאה אותי מאזור הנוחות… פגשתי אנשים מיוחדים וכל אחד מהאנשים פה משלים פאזל, החוויה הזאת לא הייתה אותו הדבר בלי כל אחד ואחד פה, תודה על ההזדמנות, זכיתי.',
      image: '/hazanek/voice-yaara.webp',
    },
  ],
}

export const faq = {
  kicker: 'שאלות ותשובות',
  title: 'מה שחשוב לדעת',
  items: [
    {
      q: 'זו מכינה שנתית?',
      a: 'לא. הזנק היא תוכנית ממוקדת של שישה שבועות - הכנה מרוכזת ואיכותית לקראת הגיוס, לא מכינה שנתית.',
    },
    {
      q: 'אני לא בכושר. זה מתאים לי?',
      a: 'כן. התוכנית מתאימה לכל רמת כושר, והאימונים מותאמים אישית לכל משתתף/ת.',
    },
    { q: 'מה עם כשרות ושבת?', a: 'המכינה שומרת כשרות ושומרת שבת.' },
    {
      q: 'איך נרשמים?',
      a: 'ממלאים טופס הרשמה, וצוות חמש אצבעות יוצר איתכם קשר עם רשימת ציוד וכל ההכנה הנדרשת.',
    },
  ],
}

export const register = {
  kicker: 'הרשמה',
  title: 'מוכנים להזנקה?',
  text: 'השאירו פרטים וצוות חמש אצבעות יחזור אליכם עם כל הפרטים, רשימת הציוד וההכנה למחזור הקרוב.',
  bullets: ['ללא עלות', `המחזור הקרוב: ${NEXT_CYCLE_LABEL}`, 'מתאים לכל רמת כושר'],
  image: '/hazanek/register-dunes.webp',
  submit: 'אני רוצה להירשם',
  cycleLabel: 'מועד מחזור מבוקש',
  cycleOptions: [`מחזור דצמבר: ${NEXT_CYCLE_LABEL}`, 'מחזור מאוחר יותר / עוד לא יודעים'],
  success: {
    title: 'קיבלנו. נתראה בהזנקה.',
    text: 'צוות חמש אצבעות יחזור אליכם בקרוב עם כל הפרטים, רשימת הציוד וההכנה למחזור.',
  },
  error: 'משהו השתבש בשליחה. נסו שוב, או כתבו לנו בוואטסאפ.',
}
