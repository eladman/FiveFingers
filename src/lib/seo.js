/**
 * Per-route document metadata.
 *
 * With hash routing every page shared the homepage's title and description —
 * so Google and WhatsApp showed identical text for all of them. Now that each
 * page has a real path, each gets its own.
 *
 * These same strings are baked into the prerendered HTML at build time (see
 * scripts/prerender.mjs), so crawlers read the correct metadata without having
 * to execute any JavaScript. This module keeps them in sync during client-side
 * navigation.
 */

export const SITE_URL = 'https://5fingers.org.il'
const SUFFIX = ' | חמש אצבעות'

/** view name → { title, description }. Paths live in router.js. */
export const META = {
  home: {
    path: '/',
    title: 'חמש אצבעות - מצוינות ערכית',
    description:
      'תנועה חינוכית-חברתית הפועלת ברחבי הארץ לפיתוח הדור הבא.',
  },
  liabah: {
    path: '/liabah',
    title: 'קבוצות הנוער · גילאי 10–18' + SUFFIX,
    description:
      'הליבה - מסגרת חינוכית בלתי פורמלית לנוער. אימון פיזי-מנטלי, קבוצה מלכדת ומאמן/ת שמלווה לאורך כל הדרך.',
  },
  'liabah-young': {
    path: '/liabah/young',
    title: 'הקבוצות הצעירות · כיתות ה׳–ו׳' + SUFFIX,
    description:
      'קבוצות חמש אצבעות לכיתות ה׳–ו׳ - הצעד הראשון: חוסן מנטלי, עבודת צוות וכיף אמיתי, בקבוצה קבועה עם מאמן/ת.',
  },
  'liabah-middle': {
    path: '/liabah/middle',
    title: 'קבוצות חטיבת הביניים · כיתות ז׳–ט׳' + SUFFIX,
    description:
      'קבוצות חמש אצבעות לחטיבת הביניים - אתגר פיזי ומנטלי, אחריות אישית ושייכות, בגיל שבו זה משנה הכי הרבה.',
  },
  'liabah-high': {
    path: '/liabah/high',
    title: 'קבוצות התיכון · כיתות י׳–י״ב' + SUFFIX,
    description:
      'קבוצות חמש אצבעות לתיכון - הכנה לשירות משמעותי, מנהיגות ואימון פיזי-מנטלי לקראת הצעד הבא.',
  },
  academy: {
    path: '/academy',
    title: 'המכינה הקדם צבאית · גילאי 18–20' + SUFFIX,
    description:
      'שנה של פיתוח מנהיגות, חוסן פיזי ומנטלי והכנה לשירות משמעותי - המכינה הקדם צבאית של תנועת חמש אצבעות.',
  },
  collabs: {
    path: '/collabs',
    title: 'שיתופי פעולה' + SUFFIX,
    description:
      'סדנאות, הרצאות ותכניות מותאמות לארגונים, רשויות וקהילות - מביאים את שיטת חמש אצבעות אליכם/ן.',
  },
  alumni: {
    path: '/alumni',
    title: 'הבוגרים · תכנית יואב' + SUFFIX,
    description:
      'פיתוח מנהיגות לבוגרי ובוגרות התנועה אחרי השירות - השמה בעמדות מפתח והמשך צמיחה אישית.',
  },
  about: {
    path: '/about',
    title: 'אודות התנועה · הסיפור והשיטה' + SUFFIX,
    description:
      'תנועת חמש אצבעות נוסדה ב-2014. החזון, חמשת הערכים והשיטה החינוכית שמאחורי ״האדם בזירה״.',
  },
  team: {
    path: '/team',
    title: 'הצוות · מאמנים ומדריכים' + SUFFIX,
    description:
      'המאמנים והמאמנות, המדריכים והמדריכות ואנשי המטה שמובילים את תנועת חמש אצבעות - ואיך מצטרפים/ות אליהם.',
  },
  amir: {
    path: '/amir',
    title: 'עמיר מנחם · מייסד התנועה' + SUFFIX,
    description:
      'מייסד ויו״ר תנועת חמש אצבעות, קצין שייטת 13 לשעבר ומגיש ״האדם בזירה״ - הסיפור והשיטה שמאחורי התנועה.',
  },
  memorial: {
    path: '/memorial',
    title: 'היכל הזיכרון' + SUFFIX,
    description:
      'עמוד הנצחה לזכרם של 19 בוגרי תנועת חמש אצבעות שנפלו במלחמת חרבות ברזל.',
  },
}

function setTag(selector, attr, value) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

function setCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

/** Apply title/description/canonical/OG for a view. */
export function applyMeta(view) {
  const meta = META[view] || META.home
  applyRaw(meta.title, meta.description, SITE_URL + (meta.path === '/' ? '/' : meta.path))
}

/**
 * A single fallen person's page. Kept separate because the content is data
 * driven — one entry per person rather than a fixed route.
 */
export function applyPersonMeta(name, slug) {
  applyRaw(
    `${name} ז״ל · היכל הזיכרון${SUFFIX}`,
    `לזכרו של ${name} ז״ל, בוגר תנועת חמש אצבעות שנפל במלחמת חרבות ברזל.`,
    `${SITE_URL}/memorial/${slug}`,
  )
}

function applyRaw(title, description, canonical) {
  document.title = title
  setTag('meta[name="description"]', 'content', description)
  setTag('meta[property="og:title"]', 'content', title)
  setTag('meta[property="og:description"]', 'content', description)
  setTag('meta[name="twitter:title"]', 'content', title)
  setTag('meta[name="twitter:description"]', 'content', description)
  setTag('meta[property="og:url"]', 'content', canonical)
  setCanonical(canonical)
}
