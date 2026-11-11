import { useState } from 'react'
import { Check, MessageCircle } from 'lucide-react'
import useReveal from '../../hooks/useReveal'
import { GlowField, SelectField, SubmitButton } from '../../components/contactFields'
import { getAttribution, getAttributionJson, newLeadId } from '../../lib/attribution'
import { trackEvent } from '../../lib/consent'
import { WHATSAPP_HREF } from '../../data/contact'
import { register, PRODUCT_TYPE } from '../content'

const INITIAL = { name: '', phone: '', email: '', cycle: '' }

/**
 * Lead form → the website pipeline: same webhook and payload shape as
 * src/components/ContactModal.jsx. productType "Boost" is one of the exact
 * values Make's "השארת פרטים אתר חדש" scenario routes (dashboard row + email);
 * an unknown value would be accepted and silently dropped.
 */
async function sendLead(form, leadId) {
  const payload = {
    name: form.name,
    phone: form.phone,
    email: form.email,
    productType: PRODUCT_TYPE,
    cycle: form.cycle,
    details: { [register.cycleLabel]: form.cycle },
    submittedAt: new Date().toISOString(),
    source: 'fivefingers-website',
    pageUrl: window.location.href,
    leadId,
    attribution: getAttribution(),
    attributionJson: getAttributionJson(),
  }

  const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn('VITE_MAKE_WEBHOOK_URL not set — skipping Make webhook.', payload)
    await new Promise((r) => setTimeout(r, 900))
    return
  }
  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`)
}

/** Mode A: dunes at dusk behind a white form card. */
export default function Register() {
  const ref = useReveal({ selector: '.rv', y: 48, stagger: 0.1 })
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    const leadId = newLeadId()
    try {
      await sendLead(form, leadId)
      setStatus('success')
      // GTM "Lead" conversion. Never pass name / phone / email here.
      trackEvent('lead_submitted', { lead_id: leadId, form_name: 'hazanek', product_type: PRODUCT_TYPE })
    } catch (err) {
      console.error('Hazanek form submission failed:', err)
      setStatus('error')
    }
  }

  return (
    <section ref={ref} id="register" dir="rtl" className="relative w-full overflow-hidden bg-navy-deep text-white scroll-mt-0">
      <img
        src={register.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: '50% 40%' }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-orange/10 mix-blend-multiply" />
      <div aria-hidden="true" className="absolute inset-0 bg-black/25" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-l from-black/65 via-black/25 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 py-20 md:py-28 lg:min-h-[100svh] flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,480px)] gap-12 lg:gap-20 items-center">
          <div>
            <p className="rv ds-eyebrow text-orange mb-4" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}>{register.kicker}</p>
            <h2
              className="rv font-ragmarom text-white leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(3.4rem, 8vw, 7.5rem)', textShadow: '0 4px 32px rgba(0,0,0,0.85)' }}
            >
              {register.title}
            </h2>
            <p
              className="rv mt-6 max-w-lg font-heebo font-medium text-white/90 leading-relaxed"
              style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)', textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
            >
              {register.text}
            </p>
            <ul className="rv mt-8 flex flex-wrap gap-2.5">
              {register.bullets.map((b) => (
                <li key={b} className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 text-sm font-semibold text-white">
                  <Check size={15} className="text-orange" strokeWidth={3} aria-hidden="true" />
                  <span dir="auto">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rv rounded-[2rem] bg-white text-navy p-7 sm:p-9"
            style={{ boxShadow: '0 30px 90px -20px rgba(0,0,0,0.55)' }}
          >
            {status === 'success' ? (
              <div className="py-8 text-center" role="status">
                <span className="mx-auto w-16 h-16 rounded-full bg-orange flex items-center justify-center shadow-[0_10px_26px_-8px_rgba(255,135,20,0.65)]">
                  <Check size={32} className="text-white" strokeWidth={3} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-heebo font-extrabold text-2xl">{register.success.title}</h3>
                <p className="mt-3 text-navy/70 leading-relaxed">{register.success.text}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate={false}>
                <h3 className="font-heebo font-extrabold text-2xl leading-tight">השאירו פרטים</h3>
                <GlowField label="שם מלא" name="name" type="text" value={form.name} onChange={onChange} autoComplete="name" required />
                <GlowField label="טלפון" name="phone" type="tel" value={form.phone} onChange={onChange} autoComplete="tel" dir="ltr" placeholder="050-000-0000" required />
                <GlowField label="אימייל" name="email" type="email" value={form.email} onChange={onChange} autoComplete="email" dir="ltr" placeholder="name@example.com" required />
                <SelectField label={register.cycleLabel} name="cycle" value={form.cycle} onChange={onChange} options={register.cycleOptions} required />
                <SubmitButton loading={status === 'loading'} label={register.submit} />
                {status === 'error' && (
                  <p role="alert" className="text-sm leading-relaxed text-[#b42318]">
                    {register.error}{' '}
                    <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold underline underline-offset-4">
                      <MessageCircle size={14} aria-hidden="true" /> וואטסאפ
                    </a>
                  </p>
                )}
                <p className="text-xs text-navy/55 leading-relaxed">
                  בשליחת הטופס אתם מאשרים שצוות חמש אצבעות ייצור איתכם קשר.{' '}
                  <a href="/privacy" className="underline underline-offset-2 hover:text-navy">מדיניות הפרטיות</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
