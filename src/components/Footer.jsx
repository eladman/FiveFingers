import logo from '../assets/logo.png'

// Each link resolves to a real destination: an on-page section anchor,
// the dedicated ליבה route, or the contact modal (action: 'contact').
// No dead "#" links are shipped.
const FOOTER_NAV = {
  תנועה: [
    { label: 'ליבה', href: '#liabah' },
    { label: 'מכינה', href: '#programs' },
    { label: 'שת"פ', href: '#programs' },
    { label: 'בוגרים', href: '#programs' },
  ],
  אודות: [
    { label: 'הסיפור שלנו', href: '#about' },
    { label: 'עמיר מנחם', href: '#amir' },
    { label: 'ערכים', href: '#dna' },
    { label: 'חזון', href: '#manifesto' },
    { label: 'מה אנחנו', href: '#who-we-are' },
  ],
  הצטרף: [
    { label: 'הרשמה', action: 'contact' },
    { label: 'מתנדבים', action: 'contact' },
    { label: 'תרומות', action: 'contact' },
    { label: 'יצירת קשר', action: 'contact' },
  ],
}

export default function Footer({ onContactOpen }) {
  return (
    <footer className="rounded-t-[4rem] pt-16 md:pt-20 pb-10 px-8 md:px-16 bg-white border-t border-navy/10">
      <div className="max-w-7xl mx-auto">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div className="md:col-span-1">
            <img src={logo} alt="חמש אצבעות" className="h-12 w-auto mb-5" />
            <p className="text-navy/55 text-sm leading-relaxed mb-7 max-w-xs">
              מפתחים את הדור הבא של מנהיגי ישראל דרך מצוינות ערכית, חוויות אתגריות וקהילה תומכת, מאז 2014.
            </p>

            {/* System operational indicator */}
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="font-mono text-navy/45 text-xs tracking-wide">המערכת פועלת תקין</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_NAV).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-orange-ink font-semibold text-sm mb-5 tracking-wide">{category}</h4>
              {/* .tap-safe already gives each row a 44px box, so the gap shrinks
                  to keep the column's rhythm close to its original density
                  instead of stacking 14px gaps on top of taller targets. */}
              <ul className="space-y-0.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.action === 'contact' ? (
                      <button
                        type="button"
                        onClick={onContactOpen}
                        className="tap-safe text-navy/55 hover:text-navy text-sm transition-colors duration-200 text-right"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="tap-safe text-navy/55 hover:text-navy text-sm transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        {/* NOTE: legal links (תנאי שימוש / מדיניות פרטיות) were removed until real
            pages exist — re-add here once those routes/pages are created. */}
        <div className="border-t border-navy/10 pt-8 flex items-center justify-center">
          <p className="text-navy/40 text-sm text-center">
            © {new Date().getFullYear()} תנועת חמש אצבעות · אמיר מנחם ויורם מנחם. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  )
}
