import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from '../data/contact'
import { openConsentSettings } from '../lib/consent'

/**
 * מדיניות פרטיות — /privacy, linked from every footer and from the consent banner.
 *
 * Written to describe what the site ACTUALLY does today (forms → Make.com →
 * Supabase + HubSpot, the cookieless page-view counter, HubSpot's tracking
 * cookie, and GTM / Meta Pixel behind the consent banner). When any of that
 * changes, change this page in the same commit. A policy that promises less
 * collection than really happens is worse than none.
 *
 * DRAFT FOR LEGAL REVIEW: wording here was prepared without a lawyer. Before
 * relying on it, have someone with Israeli privacy-law knowledge (חוק הגנת
 * הפרטיות, incl. תיקון 13) review it, and fill in the registered entity's
 * legal name + number in OWNER below.
 */
const OWNER = {
  name: 'תנועת חמש אצבעות',
  // e.g. 'ע"ר 58-000000-0' — the registered association / company number.
  registration: '',
}
const LAST_UPDATED = 'אוקטובר 2026'

const FORM_DATA = [
  'בכל פנייה: שם מלא, טלפון, כתובת דוא"ל ותחום העניין שבחרתם.',
  'בהרשמה לקבוצות הנוער: שם הילד/ה, עיר מגורים, כיתה ומין, והקבוצה שבחרתם במפה, אם בחרתם.',
  'במועמדות לתפקיד בתנועה: מקום מגורים, תאריך לידה, ניסיון תעסוקתי ותעודות.',
  'בפנייה לשיתוף פעולה: שם הארגון, התפקיד שלכם בו והתאריך המבוקש.',
  'כל מה שכתבתם בשדות ההערות והפירוט.',
  'בטופס המשוב אחרי הרצאה: התשובות שלכם, וכתובת דוא"ל רק אם ביקשתם שנחזור אליכם.',
]

const USES = [
  'לחזור אליכם, לענות על הפנייה ולשבץ את הילד/ה בקבוצה מתאימה.',
  'לשלוח הודעת אישור על הפנייה ועדכונים הקשורים אליה.',
  'לטפל במועמדות לתפקיד בתנועה.',
  'לשפר את האתר, ולהבין אילו פרסומים מביאים אלינו פניות.',
]

const PROVIDERS = [
  ['Make.com', 'מעבירה את הפרטים מהטופס למערכות שלנו ושולחת את הודעת האישור.'],
  ['Supabase', 'מסד הנתונים שבו נשמרות הפניות.'],
  ['HubSpot', 'מערכת ניהול הקשר עם פונים (CRM).'],
  ['Google ו־Meta', 'כלי מדידה ופרסום, רק אם אישרתם (פירוט בהמשך).'],
]

const COOKIES = [
  {
    name: 'מונה צפיות של האתר',
    when: 'תמיד',
    what: 'סופר אילו עמודים נצפו ומאיזה אתר הגעתם, עם מזהה אקראי שנשמר בדפדפן שלכם. בלי עוגיות ובלי פרטים מזהים.',
  },
  {
    name: 'מקור קמפיין',
    when: 'תמיד',
    what: 'אם הגעתם מקישור במודעה, הדפדפן שלכם שומר עד 30 יום מאיזה קמפיין הגעתם. המידע נשלח אלינו רק יחד עם טופס שבחרתם לשלוח, ולא מועבר ל־Google או ל־Meta.',
  },
  {
    name: 'HubSpot',
    when: 'תמיד',
    what: 'עוגייה שמקשרת בין הביקורים שלכם באתר לבין פנייה שתשלחו, כדי שנדע באילו עמודים ביקרתם לפני הפנייה.',
  },
  {
    name: 'Google Tag Manager ו־Meta Pixel',
    when: 'רק אחרי אישור',
    what: 'מודדים אילו מודעות מביאות פניות, ומאפשרים ל־Meta להציג את המודעות שלנו לאנשים שעשויים להתעניין. נטענים רק אם לחצתם "מאשרים" בהודעת העוגיות.',
  },
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

export default function PrivacyPage() {
  const link = 'text-navy font-semibold underline underline-offset-4 decoration-orange hover:decoration-2'

  return (
    <main className="bg-surface pt-36 md:pt-44 pb-24 px-6 md:px-12">
      <article dir="rtl" className="max-w-3xl mx-auto font-heebo">
        <p className="ds-eyebrow text-orange-ink mb-4">פרטיות</p>
        <h1 className="font-heebo font-extrabold text-navy text-4xl md:text-5xl leading-tight">מדיניות פרטיות</h1>
        <p className="mt-6 text-navy/80 text-lg leading-relaxed">
          בעמוד הזה מוסבר איזה מידע אנחנו אוספים באתר 5fingers.org.il, למה, עם מי אנחנו משתפים אותו, ואילו
          זכויות יש לכם/ן לגביו.
        </p>

        <Section title="מי אחראי על המידע">
          <p>
            האתר מופעל בידי {OWNER.name}
            {OWNER.registration && ` (${OWNER.registration})`}. לכל שאלה על המידע שלכם אפשר לפנות אלינו בפרטים
            שבסוף העמוד.
          </p>
        </Section>

        <Section title="מידע שאתם/ן מוסרים/ות לנו">
          <p>כשממלאים טופס באתר, אנחנו מקבלים את מה שכתבתם בו:</p>
          <List items={FORM_DATA} />
          <p>
            אין חובה חוקית למסור את המידע. בלי פרטי התקשרות בסיסיים לא נוכל לחזור אליכם.
          </p>
        </Section>

        <Section title="ילדים ובני נוער">
          <p>
            רבים מהמשתתפים/ות בתנועה הם קטינים. טופס ההרשמה לקבוצות הנוער מיועד למילוי בידי הורה או אפוטרופוס.
            אם אתם/ן מתחת לגיל 18 ורוצים/ות להצטרף, נשמח שתמלאו את הטופס יחד עם הורה. אם נמסרו לנו פרטים של
            קטין/ה בלי ידיעת ההורים, פנו אלינו ונמחק אותם.
          </p>
        </Section>

        <Section title="למה אנחנו משתמשים במידע">
          <List items={USES} />
          <p>איננו מוכרים את המידע שלכם, ואיננו מעבירים אותו לגורמים אחרים לצורכי שיווק שלהם.</p>
        </Section>

        <Section title="עם מי המידע משותף">
          <p>
            כדי להפעיל את האתר אנחנו נעזרים בספקי שירות, שמעבדים את המידע בשבילנו ורק לצורך השירות שהם נותנים לנו:
          </p>
          <ul className="space-y-2">
            {PROVIDERS.map(([name, what]) => (
              <li key={name}>
                <strong className="text-navy">{name}:</strong> {what}
              </li>
            ))}
          </ul>
          <p>
            חלק מהספקים שומרים את המידע בשרתים מחוץ לישראל, למשל באיחוד האירופי. נעביר מידע לרשויות רק אם
            החוק מחייב אותנו.
          </p>
        </Section>

        <Section title="עוגיות וכלי מדידה">
          <ul className="space-y-4">
            {COOKIES.map((c) => (
              <li key={c.name}>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <strong className="text-navy">{c.name}</strong>
                  <span className="text-sm text-navy/60">{c.when}</span>
                </div>
                <p className="mt-1">{c.what}</p>
              </li>
            ))}
          </ul>
          <p>
            אפשר לשנות את הבחירה שלכם בכל רגע.{' '}
            <button type="button" onClick={openConsentSettings} className={link}>
              לשינוי הגדרות העוגיות
            </button>
            . אפשר גם למחוק עוגיות דרך הגדרות הדפדפן.
          </p>
        </Section>

        <Section title="כמה זמן נשמר המידע">
          <p>
            אנחנו שומרים פרטי פנייה כל עוד הם נדרשים כדי לטפל בה ולקיים את הקשר איתכם/ן בתנועה, ולפי מה שהחוק
            מחייב. אפשר לבקש מאיתנו למחוק אותם בכל עת.
          </p>
        </Section>

        <Section title="הזכויות שלכם/ן">
          <p>
            לפי חוק הגנת הפרטיות, התשמ&quot;א-1981, אתם/ן רשאים/ות לעיין במידע שנשמר עליכם/ן, ולבקש לתקן אותו
            אם אינו נכון, שלם, ברור או מעודכן. אפשר גם לבקש שנמחק את המידע, ולהפסיק לקבל מאיתנו הודעות בכל עת.
            כתבו לנו ונטפל בבקשה בהקדם.
          </p>
        </Section>

        <Section title="אבטחת מידע">
          <p>
            אנחנו נוקטים אמצעים סבירים להגנה על המידע: הגישה למערכות מוגבלת לצוות שזקוק לה, והמידע עובר בחיבור
            מוצפן. אין אבטחה מושלמת, ואם יתגלה אירוע אבטחה שנוגע למידע שלכם/ן, נפעל כפי שהחוק מחייב.
          </p>
        </Section>

        <Section title="יצירת קשר בנושא פרטיות">
          <ul className="space-y-2">
            <li><strong className="text-navy">דוא&quot;ל:</strong> <a href={EMAIL_HREF} className={link} dir="ltr">{EMAIL}</a></li>
            <li><strong className="text-navy">טלפון:</strong> <a href={PHONE_HREF} className={link} dir="ltr">{PHONE_DISPLAY}</a></li>
          </ul>
        </Section>

        <p className="mt-14 pt-6 border-t border-navy/10 text-navy/65 text-sm">
          עדכון אחרון של המדיניות: {LAST_UPDATED}. אם נשנה את המדיניות, נעדכן את העמוד הזה ואת התאריך.
        </p>
      </article>
    </main>
  )
}
