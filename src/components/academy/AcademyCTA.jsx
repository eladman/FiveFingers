import { Phone, Mail, MessageCircle } from 'lucide-react'
import { MuseumSection, PrimaryButton } from './shared'
import useReveal from '../../hooks/useReveal'

/**
 * Restrained museum close — a calm framed parchment panel with a single primary
 * CTA and quiet contact rows. Deliberately unlike Liabah's navy + orange-glow CTA.
 */
export default function AcademyCTA({ onRegister }) {
  const ref = useReveal({ selector: '.cta-animate', y: 28, stagger: 0.1, duration: 1.1, start: 'top 86%' })

  return (
    <MuseumSection id="academy-cta" bg="white">
      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="border border-navy/15 px-6 md:px-16 py-16 md:py-20 text-center">
          <p
            className="cta-animate font-heebo font-semibold text-navy/45 mb-5"
            style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.82rem)', letterSpacing: '0.28em' }}
          >
            הצטרפות
          </p>
          <h2 className="cta-animate font-ragmarom text-navy leading-[1.05]" style={{ fontSize: 'clamp(2.2rem, 4.4vw, 4rem)' }}>
            רוצים שנה שתשנה את הדרך?
          </h2>
          <p className="cta-animate font-heebo text-navy/60 mt-6 mx-auto max-w-xl leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
            השאירו פרטים ונחזור אליכם עם כל המידע על המיונים והמסלולים.
          </p>

          <div className="cta-animate mt-10">
            <PrimaryButton onClick={() => onRegister?.()} size="lg">להגשת מועמדות</PrimaryButton>
          </div>

          <div className="cta-animate mt-14 pt-10 border-t border-navy/12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <ContactRow icon={MessageCircle} label="וואטסאפ" value="055-685-5850" href="https://wa.me/972556855850" />
            <ContactRow icon={Phone} label="טלפון" value="055-685-5850" href="tel:0556855850" />
            <ContactRow icon={Mail} label="מייל" value="service@5fingers.org.il" href="mailto:service@5fingers.org.il" />
          </div>
        </div>
      </div>
    </MuseumSection>
  )
}

function ContactRow({ icon: Icon, label, value, href }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-1.5 py-3 transition-colors duration-200 group"
    >
      <Icon size={20} className="text-navy/40 group-hover:text-orange transition-colors" />
      <span className="font-heebo text-navy/45 text-xs">{label}</span>
      <span className="font-heebo text-navy font-medium text-sm group-hover:text-orange-ink transition-colors" dir="ltr">{value}</span>
    </a>
  )
}
