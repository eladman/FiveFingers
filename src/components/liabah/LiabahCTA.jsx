import { Phone, Mail, MessageCircle } from 'lucide-react'
import { PrimaryButton } from './shared'
import useReveal from '../../hooks/useReveal'

/** Final conversion section — registration CTA + contacts. */
export default function LiabahCTA({ onRegister }) {
  const ref = useReveal({ selector: '.cta-animate', y: 40, stagger: 0.1, duration: 1.1, start: 'top 85%' })

  return (
    <section
      id="liabah-cta"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#000032] text-white"
    >
      <div className="pointer-events-none absolute top-[-20%] left-[10%] w-[40vw] h-[50vh] rounded-full bg-[#ff8714]/15 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[-20%] right-[10%] w-[36vw] h-[44vh] rounded-full bg-[#ff8714]/10 blur-[150px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center py-24 md:py-28">
        <p
          className="cta-animate font-heebo font-semibold text-[#ff8714] mb-3"
          style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', letterSpacing: '0.22em' }}
        >
          הצטרפות
        </p>
        <h2
          className="cta-animate font-ragmarom leading-[0.95]"
          style={{ fontSize: 'clamp(2.4rem, 4.6vw, 4.2rem)' }}
        >
          מוכנים להצטרף לליבה?
        </h2>
        <p className="cta-animate font-heebo text-white/75 mt-5 mx-auto max-w-xl" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.3rem)' }}>
          השאירו פרטים ונחבר אתכם לקבוצה הקרובה אליכם. בואו תהיו חלק ממשהו גדול.
        </p>

        <div className="cta-animate mt-9">
          <PrimaryButton onClick={onRegister} size="lg">הרשמה לקבוצה</PrimaryButton>
        </div>

        {/* Contacts */}
        <div className="cta-animate grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14 max-w-2xl mx-auto">
          <ContactCard icon={MessageCircle} label="וואטסאפ" value="055-685-5850" href="https://wa.me/972556855850" />
          <ContactCard icon={Phone} label="טלפון" value="055-685-5850" href="tel:0556855850" />
          <ContactCard icon={Mail} label="מייל" value="info@5fingers.org.il" href="mailto:info@5fingers.org.il" />
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
      className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-200 hover:bg-white/[0.08] hover:border-[#ff8714]/40 hover:-translate-y-0.5"
    >
      <Icon size={22} className="text-[#ff8714]" />
      <span className="font-heebo text-white/55 text-sm">{label}</span>
      <span className="font-heebo text-white font-medium text-sm" dir="ltr">{value}</span>
    </a>
  )
}
