import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from '../data/contact'

/**
 * הצהרת נגישות — required by תקנה 35ה (תקנות נגישות השירות, תשע"ג-2013).
 *
 * It lives on its own page (/accessibility), linked from every footer and from
 * the accessibility menu, because the regulation asks for it "במקום בולט".
 *
 * Keep it TRUE. An inaccurate "the site fully complies" line is worse than none:
 * it is evidence against us, not a defence. Update LAST_REVIEWED and the lists
 * below whenever the site is re-checked.
 *
 * COORDINATOR: an organisation employing 25+ people must appoint a רכז/ת נגישות
 * (§19מב) and publish their name, position and contact details here (תקנה
 * 91(ה)). Empty `phone`/`email` fall back to the movement's general line.
 */
const COORDINATOR = {
  name: 'אור לרון',
  role: 'סמנכ״ל כספים',
  phone: '052-557-2090',
  email: 'orlaron@5fingers.org.il',
}
const LAST_REVIEWED = 'אוקטובר 2026'

const DONE = [
  'ניווט מלא באמצעות המקלדת, עם סימון פוקוס בולט וקישור "דלגו לתוכן הראשי" בראש כל עמוד',
  'חלונות קופצים (טופס יצירת קשר, תפריט הנגישות) שומרים את הפוקוס בתוכם, נסגרים במקש Esc ומחזירים את הפוקוס למקום שממנו נפתחו',
  'ניגודיות צבעים של טקסט ברמה AA לפחות (4.5:1) על רקעים בהירים',
  'מבנה כותרות היררכי, אזורי עמוד מסומנים ושפת עמוד מוגדרת (עברית, מימין לשמאל)',
  'טקסט חלופי לתמונות בעלות משמעות, ותוויות לכל שדות הטופס',
  'כיבוד הגדרת "הפחתת תנועה" של מערכת ההפעלה, ואפשרות לעצור אנימציות',
  'התאמה לתצוגה בטלפון נייד ולהגדלת טקסט',
]

const MENU = [
  'הגדלת טקסט (ארבע רמות), ריווח שורות וריווח אותיות',
  'גופן קריא',
  'ניגודיות גבוהה, היפוך צבעים, גווני אפור ורקע בהיר',
  'הדגשת קישורים, כותרות ופוקוס',
  'עצירת אנימציות וסמן עכבר מוגדל',
]

const KNOWN_ISSUES = [
  'חלק מסרטוני הווידאו באתר מוטמעים מ-YouTube וייתכן שאין בהם כתוביות בעברית. נשמח לשלוח תמליל של כל סרטון לפי בקשה.',
  'תכנים של צד שלישי המוטמעים באתר (כגון נגן YouTube ו-WhatsApp) אינם בשליטתנו המלאה.',
]

function Section({ title, children }) {
  return (
    <section className="mt-12">
      <h2 className="font-heebo font-bold text-navy text-xl md:text-2xl mb-4">{title}</h2>
      <div className="text-navy/80 leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

function List({ items }) {
  return (
    <ul className="list-disc pr-5 space-y-2 marker:text-orange">
      {items.map((t) => <li key={t}>{t}</li>)}
    </ul>
  )
}

export default function AccessibilityPage() {
  const phone = COORDINATOR.phone || PHONE_DISPLAY
  // 05X-XXX-XXXX → tel:+9725XXXXXXXX, matching PHONE_HREF's international form.
  const phoneHref = COORDINATOR.phone ? `tel:+972${COORDINATOR.phone.replace(/\D/g, '').slice(1)}` : PHONE_HREF
  const email = COORDINATOR.email || EMAIL
  const emailHref = COORDINATOR.email ? `mailto:${COORDINATOR.email}` : EMAIL_HREF
  const link = 'text-navy font-semibold underline underline-offset-4 decoration-orange hover:decoration-2'

  return (
    <main className="bg-surface pt-36 md:pt-44 pb-24 px-6 md:px-12">
      <article dir="rtl" className="max-w-3xl mx-auto font-heebo">
        <p className="ds-eyebrow text-orange-ink mb-4">נגישות</p>
        <h1 className="font-heebo font-extrabold text-navy text-4xl md:text-5xl leading-tight">הצהרת נגישות</h1>
        <p className="mt-6 text-navy/80 text-lg leading-relaxed">
          תנועת חמש אצבעות רואה חשיבות רבה בכך שכל צעיר/ה, הורה ושותף/ה יוכלו להשתמש באתר בקלות ובשוויון,
          כולל אנשים עם מוגבלות. השקענו בהנגשת האתר ואנו ממשיכים לשפר אותו.
        </p>

        <Section title="מסגרת והיקף">
          <p>
            האתר מונגש בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ&quot;ח-1998, לתקנות שוויון זכויות לאנשים
            עם מוגבלות (התאמות נגישות לשירות), התשע&quot;ג-2013, ולתקן הישראלי ת&quot;י 5568 (המבוסס על הנחיות
            WCAG 2.0) ברמה AA. ההצהרה חלה על האתר 5fingers.org.il.
          </p>
          <p>
            אנו פועלים לעמוד בדרישות התקן במלואן. אם תמצאו חלק שאינו נגיש, נשמח שתעדכנו אותנו ונפעל לתקן אותו.
          </p>
        </Section>

        <Section title="התאמות הנגישות שבוצעו באתר">
          <List items={DONE} />
        </Section>

        <Section title="תפריט הנגישות">
          <p>
            בפינת המסך מופיע כפתור נגישות. התפריט הוא כלי עזר נוסף, ואינו מחליף את הנגשת האתר עצמו. ההגדרות
            נשמרות בדפדפן שלכם/ן:
          </p>
          <List items={MENU} />
        </Section>

        <Section title="אופן הבדיקה">
          <p>
            האתר נבדק בכלי בדיקה אוטומטיים ובבדיקה ידנית של ניווט במקלדת, בדפדפן Chrome במחשב ובתצוגת טלפון נייד.
          </p>
        </Section>

        <Section title="מגבלות ידועות">
          <List items={KNOWN_ISSUES} />
        </Section>

        <Section title="נגישות בפעילויות התנועה">
          <p>
            לפרטים על הסדרי הנגישות בפעילויות, במפגשים ובאירועים של התנועה, או לבקשת התאמה לפעילות מסוימת,
            פנו אלינו בפרטים שלמטה. כדאי לפנות מראש כדי שנוכל להיערך.
          </p>
        </Section>

        <Section title={COORDINATOR.name ? 'רכז/ת הנגישות ופניות בנושא נגישות' : 'פניות בנושא נגישות'}>
          <p>
            נתקלתם/ן בבעיית נגישות באתר או בפעילות? רוצים/ות לבקש התאמה? נשמח לשמוע ולטפל בהקדם.
            כדי שנוכל לעזור, כתבו לנו באיזה עמוד מדובר ומה הבעיה.
          </p>
          <ul className="space-y-2">
            {COORDINATOR.name && (
              <li>
                <strong className="text-navy">רכז/ת נגישות:</strong> {COORDINATOR.name}
                {COORDINATOR.role && `, ${COORDINATOR.role}`}
              </li>
            )}
            <li><strong className="text-navy">טלפון:</strong> <a href={phoneHref} className={link} dir="ltr">{phone}</a></li>
            <li><strong className="text-navy">דוא&quot;ל:</strong> <a href={emailHref} className={link} dir="ltr">{email}</a></li>
            <li>
              <strong className="text-navy">WhatsApp:</strong>{' '}
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={link}>
                שליחת הודעה<span className="sr-only"> (נפתח בחלון חדש)</span>
              </a>
            </li>
          </ul>
        </Section>

        <p className="mt-14 pt-6 border-t border-navy/10 text-navy/65 text-sm">
          עדכון אחרון של ההצהרה: {LAST_REVIEWED}
        </p>
      </article>
    </main>
  )
}
