import { Phone, Mail, MessageCircle, ChevronLeft } from 'lucide-react'
import { PrimaryButton } from '../liabah/shared'
import useReveal from '../../hooks/useReveal'

// Partnership contact (the catalog's listed contact person).
const PHONE = '052-2519191'
const EMAIL = 'nir@5fingers.org.il'
const WHATSAPP = 'https://wa.me/972522519191'

/** Closing CTA — navy band with orange glow, mirroring the Liabah close. */
export default function CollabsCTA({ onRegister }) {
  const ref = useReveal({ selector: '.cta-animate', y: 28, stagger: 0.1, duration: 1.1, start: 'top 86%' })

  return (
    <section id="collabs-cta" dir="rtl" className="relative w-full overflow-hidden bg-navy text-white">
      {/* Atmospheric glows */}
      <div className="pointer-events-none absolute top-[-20%] right-[8%] w-[45vw] h-[60vh] rounded-full bg-orange/15 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[8%] w-[40vw] h-[50vh] rounded-full bg-orange/10 blur-[150px]" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
        <p
          className="cta-animate font-heebo font-semibold text-orange mb-5"
          style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.82rem)', letterSpacing: '0.28em' }}
        >
          יוצאים לדרך
        </p>
        <h2 className="cta-animate font-ragmarom leading-[1.02]" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}>
          רוצים להביא את חמש אצבעות לארגון שלכם?
        </h2>
        <p
          className="cta-animate font-heebo text-white/75 mt-6 mx-auto max-w-xl leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
        >
          נשמח לשמוע על המטרות שלכם ולבנות יחד את התהליך המתאים בדיוק עבורכם.
        </p>

        <div className="cta-animate mt-10">
          <PrimaryButton onClick={() => onRegister?.()} icon={ChevronLeft} size="lg">
            דברו איתנו
          </PrimaryButton>
        </div>

        <div className="cta-animate mt-14 pt-10 border-t border-white/12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <ContactRow icon={MessageCircle} label="וואטסאפ" value={PHONE} href={WHATSAPP} />
          <ContactRow icon={Phone} label="טלפון" value={PHONE} href={`tel:${PHONE.replace(/-/g, '')}`} />
          <ContactRow icon={Mail} label="מייל" value={EMAIL} href={`mailto:${EMAIL}`} />
        </div>
      </div>
    </section>
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
      <Icon size={20} className="text-white/45 group-hover:text-orange transition-colors" />
      <span className="font-heebo text-white/45 text-xs">{label}</span>
      <span className="font-heebo text-white font-medium text-sm group-hover:text-orange transition-colors" dir="ltr">{value}</span>
    </a>
  )
}
