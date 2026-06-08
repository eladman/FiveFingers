// Single source of truth for contact details.
// Used by the WhatsApp floating button, the contact modal, and the footer
// so a number/email only ever needs to change in one place.

export const WHATSAPP = '972556855850' // international format (972 = IL)
export const EMAIL = 'info@fivefingers.co.il'

// Israeli local display: 9725XXXXXXXX → 05X-XXX-XXXX
export const PHONE_DISPLAY = `0${WHATSAPP.slice(3, 5)}-${WHATSAPP.slice(5, 8)}-${WHATSAPP.slice(8)}`

export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP}`
export const PHONE_HREF = `tel:+${WHATSAPP}`
export const EMAIL_HREF = `mailto:${EMAIL}`
