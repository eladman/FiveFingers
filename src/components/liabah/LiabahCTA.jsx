import { Phone, Mail, MessageCircle } from 'lucide-react'

/** Final conversion section — registration CTA + contacts. */
export default function LiabahCTA({ onRegister }) {
  return (
    <section
      id="liabah-cta"
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#000032] text-white"
    >
      <div className="pointer-events-none absolute top-[-20%] left-[10%] w-[40vw] h-[50vh] rounded-full bg-[#ff8714]/15 blur-[150px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center py-24 md:py-28">
        <h2
          className="font-heebo font-extrabold leading-tight"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}
        >
          מוכנים להצטרף לליבה?
        </h2>
        <p className="font-heebo text-white/75 mt-5 mx-auto max-w-xl" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.3rem)' }}>
          השאירו פרטים ונחבר אתכם לקבוצה הקרובה אליכם. בואו תהיו חלק ממשהו גדול.
        </p>

        <button
          onClick={onRegister}
          className="group relative overflow-hidden inline-flex items-center gap-2 bg-[#ff8714] text-white font-bold px-10 py-4 rounded-full text-lg mt-9"
          style={{ transition: 'transform 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
          <span className="relative">הרשמה לקבוצה</span>
        </button>

        {/* Contacts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14 max-w-2xl mx-auto">
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
      className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-200 hover:bg-white/[0.08]"
    >
      <Icon size={22} className="text-[#ff8714]" />
      <span className="font-heebo text-white/55 text-sm">{label}</span>
      <span className="font-heebo text-white font-medium text-sm" dir="ltr">{value}</span>
    </a>
  )
}
