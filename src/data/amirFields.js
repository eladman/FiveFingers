// "קשר עם עמיר" form config — the category the visitor is reaching out about,
// so עמיר's assistant knows what the call is for before picking up the phone.

// The three offerings on עמיר's page (the ZONES cards in amirData.js), spelled
// exactly like the card titles. Field `name`s are the payload keys Make maps to
// Supabase columns (amirTopic → amir_topic, inquiryDetails → inquiry_details).
export const AMIR_TOPICS = ['הרצאות', 'סדנאות', 'ליווי אישי']

export const AMIR_FIELDS = [
  { name: 'amirTopic', label: 'במה מדובר?', type: 'select', options: AMIR_TOPICS, required: true },
  { name: 'inquiryDetails', label: 'ספרו לנו עוד', type: 'textarea', placeholder: 'קהל, תאריך משוער, מה תרצו להשיג… (לא חובה)', required: false },
]
