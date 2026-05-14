import logo from '../assets/logo.png'

const FOOTER_NAV = {
  תנועה: ['ליבה', 'אקדמיה', 'שת"פ', 'בוגרים'],
  אודות: ['עמיר מנחם', 'ערכים', 'חזון', 'היסטוריה'],
  הצטרף: ['הרשמה', 'מתנדבים', 'תרומות', 'שאלות נפוצות'],
}

export default function Footer() {
  return (
    <footer className="rounded-t-[4rem] pt-16 md:pt-20 pb-10 px-8 md:px-16" style={{ background: 'linear-gradient(180deg, #111111 0%, #0a0a0a 50%, #060606 100%)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div className="md:col-span-1">
            <img src={logo} alt="חמש אצבעות" className="h-12 w-auto mb-5" />
            <p className="text-white/45 text-sm leading-relaxed mb-7 max-w-xs">
              מפתחים את הדור הבא של מנהיגי ישראל דרך מצוינות ערכית, חוויות אתגריות וקהילה תומכת — מאז 2014.
            </p>

            {/* System operational indicator */}
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="font-mono text-white/35 text-xs tracking-wide">המערכת פועלת תקין</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_NAV).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[#ff8714] font-semibold text-sm mb-5 tracking-wide">{category}</h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/40 hover:text-white/80 text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-white/25 text-sm">
            © {new Date().getFullYear()} תנועת חמש אצבעות — אמיר מנחם ויורם מנחם. כל הזכויות שמורות.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/25 hover:text-white/55 text-xs transition-colors">תנאי שימוש</a>
            <a href="#" className="text-white/25 hover:text-white/55 text-xs transition-colors">מדיניות פרטיות</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
