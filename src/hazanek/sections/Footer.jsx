import { openConsentSettings } from '../../lib/consent'
import { WHATSAPP_HREF, PHONE_HREF, PHONE_DISPLAY, EMAIL, EMAIL_HREF } from '../../data/contact'

const linkCls =
  'text-white/65 hover:text-white text-sm underline-offset-4 hover:underline transition-colors duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange'

/** Minimal footer: who we are, how to reach us, the legal links. */
export default function Footer() {
  return (
    <footer dir="rtl" className="relative w-full bg-navy-deep text-white">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 py-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <a href="/" className="flex items-center gap-3 self-start rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange">
          <img src="/logo.png" alt="" className="h-10 w-auto" />
          <span>
            <span className="block font-heebo font-extrabold text-lg leading-none">חמש אצבעות</span>
            <span className="block text-white/55 text-sm mt-1">לאתר התנועה</span>
          </span>
        </a>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <li><a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={linkCls}>וואטסאפ</a></li>
          <li><a href={PHONE_HREF} className={linkCls} dir="ltr">{PHONE_DISPLAY}</a></li>
          <li><a href={EMAIL_HREF} className={linkCls} dir="ltr">{EMAIL}</a></li>
        </ul>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 py-5 flex flex-wrap items-center justify-between gap-4 text-white/45 text-xs">
          <p>© {new Date().getFullYear()} תנועת חמש אצבעות</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li><a href="/accessibility" className={linkCls}>הצהרת נגישות</a></li>
            <li><a href="/privacy" className={linkCls}>מדיניות פרטיות</a></li>
            <li>
              <button type="button" onClick={openConsentSettings} className={linkCls}>הגדרות עוגיות</button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
