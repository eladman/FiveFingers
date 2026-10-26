// Single source of truth for contact details.
// Used by the WhatsApp floating button, the contact modal, and the footer
// so a number/email only ever needs to change in one place.

export const WHATSAPP = '972556855850' // international format (972 = IL)
export const EMAIL = 'service@5fingers.org.il'

// Israeli local display: 9725XXXXXXXX → 05X-XXX-XXXX
export const PHONE_DISPLAY = `0${WHATSAPP.slice(3, 5)}-${WHATSAPP.slice(5, 8)}-${WHATSAPP.slice(8)}`

export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP}`
export const PHONE_HREF = `tel:+${WHATSAPP}`
export const EMAIL_HREF = `mailto:${EMAIL}`

// עמיר's direct line — used whenever someone is reaching out to Amir
// specifically (the "קשר עם עמיר" interest, the /amir page) instead of the
// movement's general number.
export const AMIR_PRODUCT = 'קשר עם עמיר'
export const AMIR_WHATSAPP = '972543030269'
export const AMIR_PHONE_DISPLAY = `0${AMIR_WHATSAPP.slice(3, 5)}-${AMIR_WHATSAPP.slice(5, 8)}-${AMIR_WHATSAPP.slice(8)}`
export const AMIR_WHATSAPP_HREF = `https://wa.me/${AMIR_WHATSAPP}`
export const AMIR_PHONE_HREF = `tel:+${AMIR_WHATSAPP}`
