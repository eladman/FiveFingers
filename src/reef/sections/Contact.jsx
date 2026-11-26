import { Mail } from 'lucide-react'
import Button from '../../components/ui/Button'
import useReveal from '../../hooks/useReveal'
import { contact, GUY, LINKS } from '../content'
import { Head, InstagramIcon, OutlineLink, WhatsAppIcon, WRAP } from '../shared'

const rowLink =
  'tap-safe font-heebo font-semibold text-navy underline-offset-4 hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2'

/** One person to talk to, and every way to reach him. */
export default function Contact() {
  const ref = useReveal({ selector: '.rv', y: 40, stagger: 0.08 })

  return (
    <section ref={ref} id="contact" dir="rtl" className="relative w-full overflow-hidden bg-surface scroll-mt-16">
      <div className={`${WRAP} py-20 md:py-32`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div>
            <Head kicker={contact.kicker} title={contact.title} />
            <div className="rv mt-10 flex flex-wrap items-center gap-3.5">
              <Button href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" icon={WhatsAppIcon}>
                {contact.whatsappCta}
              </Button>
              <OutlineLink href={LINKS.email} icon={Mail}>
                {contact.emailCta}
              </OutlineLink>
            </div>
          </div>

          <div className="rv rounded-[2rem] border border-line bg-white p-7 md:p-10 shadow-[0_8px_24px_rgba(0,0,30,0.06)]">
            <p className="font-ragmarom text-navy leading-none" style={{ fontSize: 'clamp(2.2rem, 3.2vw, 3.2rem)' }}>
              {GUY.name}
            </p>
            <p className="mt-2 font-heebo text-navy/65 text-lg">{GUY.role}</p>

            <dl className="mt-7 border-t border-navy/10">
              <Row label="טלפון">
                <a href={LINKS.phone} dir="ltr" className={`${rowLink} tabular-nums`}>{GUY.phoneDisplay}</a>
              </Row>
              <Row label="WhatsApp">
                <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" dir="ltr" className={`${rowLink} tabular-nums`}>
                  {GUY.phoneDisplay}
                </a>
              </Row>
              <Row label="מייל">
                <a href={LINKS.email} dir="ltr" className={`${rowLink} break-all`}>{GUY.email}</a>
              </Row>
              <Row label="Instagram">
                <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" dir="ltr" className={`${rowLink} gap-2`}>
                  <InstagramIcon size={18} className="text-valley" />
                  {LINKS.instagramHandle}
                </a>
              </Row>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

function Row({ label, children }) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-navy/10 py-1.5">
      <dt className="font-heebo text-navy/60 text-[0.95rem]">{label}</dt>
      <dd className="m-0 text-left">{children}</dd>
    </div>
  )
}
