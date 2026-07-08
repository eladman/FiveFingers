import { Phone, Mail, MessageCircle } from 'lucide-react'
import { PrimaryButton } from '../academy/shared'
import useReveal from '../../hooks/useReveal'
import { cta } from '../../data/teamData'
import {
  WHATSAPP_HREF, PHONE_HREF, EMAIL, EMAIL_HREF, PHONE_DISPLAY,
} from '../../data/contact'

/** Final conversion section — a navy band with a single primary CTA + contacts. */
export default function TeamCTA({ onRegister }) {
  const ref = useReveal({ selector: '.tcta-animate', y: 40, stagger: 0.1, duration: 1.1, start: 'top 85%' })

  return (
    <section
      id="team-cta"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-navy text-white"
    >
      <div className="pointer-events-none absolute top-[-20%] left-[10%] w-[40vw] h-[50vh] rounded-full bg-orange/15 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[-20%] right-[10%] w-[36vw] h-[44vh] rounded-full bg-orange/10 blur-[150px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center py-24 md:py-28">
        <p
          className="tcta-animate font-heebo font-semibold text-orange mb-3 uppercase"
          style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', letterSpacing: '0.22em' }}
        >
          {cta.eyebrow}
        </p>
        <h2 className="tcta-animate font-ragmarom leading-[0.95]" style={{ fontSize: 'clamp(2.8rem, 5vw, 5.5rem)' }}>
          {cta.title}
        </h2>
        <div className="tcta-animate mt-5 mx-auto h-1 rounded-full bg-orange" style={{ width: 'clamp(3.5rem, 7vw, 6rem)' }} />
        <p className="tcta-animate font-heebo text-white/75 mt-5 mx-auto max-w-xl" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.3rem)' }}>
          {cta.lead}
        </p>

        <div className="tcta-animate mt-9">
          <PrimaryButton onClick={() => onRegister?.()} size="lg">{cta.button}</PrimaryButton>
        </div>

        <div className="tcta-animate grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14 max-w-2xl mx-auto">
          <ContactCard icon={MessageCircle} label="וואטסאפ" value={PHONE_DISPLAY} href={WHATSAPP_HREF} />
          <ContactCard icon={Phone} label="טלפון" value={PHONE_DISPLAY} href={PHONE_HREF} />
          <ContactCard icon={Mail} label="מייל" value={EMAIL} href={EMAIL_HREF} />
        </div>
      </div>
    </section>
  )
}

function ContactCard({ icon: Icon, label, value, href }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-200 hover:bg-white/[0.08] hover:border-orange/40 hover:-translate-y-0.5"
    >
      <Icon size={22} className="text-orange" />
      <span className="font-heebo text-white/55 text-sm">{label}</span>
      <span className="font-heebo text-white font-medium text-sm" dir="ltr">{value}</span>
    </a>
  )
}
