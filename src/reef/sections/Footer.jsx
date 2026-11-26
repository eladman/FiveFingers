import { footer, LINKS, partners } from '../content'
import { InstagramIcon, WRAP } from '../shared'

const linkCls =
  'tap-safe font-heebo text-navy/70 hover:text-navy text-[0.95rem] underline-offset-4 hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2'

/** A light footer: the three partners, the page's links, the line the page ends on. */
export default function Footer() {
  return (
    <footer dir="rtl" className="relative w-full bg-white border-t border-line">
      <div className={`${WRAP} pt-14 md:pt-20 pb-10`}>
        <p
          className="font-ragmarom text-navy leading-none tracking-tight text-balance"
          style={{ fontSize: 'clamp(2rem, 4.2vw, 3.8rem)' }}
        >
          {footer.line}
        </p>

        <div className="mt-10 md:mt-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <ul className="flex flex-wrap items-center gap-x-9 gap-y-6">
            {partners.logos.map((p) => (
              <li key={p.name}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={p.name}
                  className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-4"
                >
                  <img src={p.logo} alt="" loading="lazy" className="h-14 md:h-16 w-auto object-contain" />
                </a>
              </li>
            ))}
          </ul>

          <nav aria-label="קישורים">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-1">
              {footer.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkCls}>{l.label}</a>
                </li>
              ))}
              <li>
                <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className={`${linkCls} gap-2`}>
                  <InstagramIcon size={17} />
                  Instagram
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-line">
        <div className={`${WRAP} py-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-navy/60 text-xs`}>
          <p>© {new Date().getFullYear()} דרך ריף · תנועת חמש אצבעות</p>
          <p>{footer.credit}</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <li><a href="/accessibility" className={`${linkCls} !text-xs`}>הצהרת נגישות</a></li>
            <li><a href="/privacy" className={`${linkCls} !text-xs`}>מדיניות פרטיות</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
