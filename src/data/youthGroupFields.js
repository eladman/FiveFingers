// Youth-group ("קבוצות הנוער") form config — shared by the main ContactModal
// and the Liabah map's per-team interest form so both collect and send the
// exact same fields (and therefore land in Supabase / Make identically).

// The exact interest/product_type value the movement uses for youth groups.
export const YOUTH_GROUP_PRODUCT = 'קבוצות הנוער'

// School grades a youth-group participant can be in (ages 10-18), as a closed
// list so we never get free-text grade values.
export const GRADE_OPTIONS = ['ה׳', 'ו׳', 'ז׳', 'ח׳', 'ט׳', 'י׳', 'י״א', 'י״ב']

// Youth-group sign-ups are done by a parent for their child, so we collect the
// child's details rather than treating the contact as the participant.
// Field `name`s are the payload keys Make maps to Supabase columns.
export const YOUTH_GROUP_FIELDS = [
  { name: 'childGender', label: 'מין', type: 'select', options: ['זכר', 'נקבה'], required: true },
  { name: 'childName', label: 'שם הילד/ה', type: 'text', placeholder: 'שם פרטי ומשפחה', required: true },
  { name: 'childCity', label: 'עיר מגורים', type: 'text', placeholder: 'עיר / יישוב', autoComplete: 'address-level2', required: true },
  { name: 'childGrade', label: 'כיתה של הילד/ה', type: 'select', options: GRADE_OPTIONS, required: true },
  { name: 'notes', label: 'הערות', type: 'textarea', placeholder: 'משהו שנרצה לדעת? (לא חובה)', required: false },
]
