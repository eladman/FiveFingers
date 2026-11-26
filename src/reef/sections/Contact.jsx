import { useRef } from 'react'
import { Mail, Phone } from 'lucide-react'
import Button from '../../components/ui/Button'
import { contact, GUY, LINKS } from '../content'
import { InstagramIcon, OutlineLink, Title, WhatsAppIcon, WRAP, useSectionMotion } from '../shared'

const rowLink =
  'tap-safe font-heebo font-semibold text-navy underline-offset-4 decoration-orange decoration-2 hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2'

/** One person to talk to, and every way to reach them. */
export default function Contact() {
  const ref = useRef(null)
  useSectionMotion(ref)

  return (
    <section ref={ref} id="contact" dir="rtl" aria-labelledby="contact-title" className="relative w-full overflow-hidden bg-white scroll-mt-16">
      <div className={`${WRAP} py-24 md:py-36`}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-14 lg:gap-24 items-end">
          <div>
            <Title id="contact-title" title={contact.title} size="xl" />
            <div className="rv mt-10 flex flex-wrap items-center gap-3.5">
              <Button href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" size="lg" icon={WhatsAppIcon}>
                {contact.whatsappCta}
              </Button>
              <OutlineLink href={LINKS.email} icon={Mail}>
                {contact.emailCta}
              </OutlineLink>
            </div>
          </div>

          <div className="rv">
            <p className="font-ragmarom text-navy leading-none" style={{ fontSize: 'clamp(2.4rem, 3.6vw, 3.6rem)' }}>
              {GUY.name}
            </p>
            <p className="mt-2 font-heebo text-navy/70 text-lg">{GUY.role}</p>
            <dl className="mt-7 border-t-2 border-navy">
              <Row label="טלפון" icon={Phone}>
                <a href={LINKS.phone} dir="ltr" className={`${rowLink} tabular-nums`}>{GUY.phoneDisplay}</a>
              </Row>
              <Row label="WhatsApp" icon={WhatsAppIcon}>
                <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" dir="ltr" className={`${rowLink} tabular-nums`}>
                  {GUY.phoneDisplay}
                </a>
              </Row>
              <Row label="מייל" icon={Mail}>
                <a href={LINKS.email} dir="ltr" className={`${rowLink} break-all`}>{GUY.email}</a>
              </Row>
              <Row label="Instagram" icon={InstagramIcon}>
                <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" dir="ltr" className={rowLink}>
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

function Row({ label, icon: Icon, children }) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-navy/12 py-1.5">
      <dt className="flex items-center gap-2.5 font-heebo text-navy/70 text-[0.98rem]">
        <Icon size={17} className="text-valley" aria-hidden="true" />
        {label}
      </dt>
      <dd className="m-0 text-left">{children}</dd>
    </div>
  )
}
