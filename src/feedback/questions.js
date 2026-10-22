// The lecture-feedback questionnaire — the single place to edit questions.
//
// The form (FeedbackForm.jsx) and the staff results (src/lectures/) both render
// from these lists, so a question's wording, options and order live only here.
// Each `id` is also a column in `lecture_feedback` (supabase/lectures.sql) —
// adding a question means adding it here AND adding its column there.
//
// Option answers are stored as their `value` key; `label` is display-only.
//
// Supported `type`s:
//   scale  — 1–5, drawn as the five rising "fingers" of the logo
//   multi  — pick up to `max`; an `exclusive` option clears the others
//   choice — pick one; an option with `other: true` reveals a text field
//            saved to `otherId`
//   text   — free text
//   yesno  — yes / no; `emailOnYes` reveals a required email field (`emailId`)

const opt = (value, label, extra) => ({ value, label, ...extra })

export const GENERAL_QUESTIONS = [
  {
    id: 'meaningful',
    type: 'scale',
    title: 'עד כמה ההרצאה הייתה משמעותית עבורך?',
    labels: ['בכלל לא', 'מאוד'],
    required: true,
  },
  {
    id: 'takeaways',
    type: 'multi',
    max: 2,
    title: 'מה בעיקר לקחת מההרצאה?',
    subtitle: 'אפשר לבחור עד 2',
    required: true,
    options: [
      opt('knowledge', 'ידע או נקודות מבט חדשות'),
      opt('inspiration', 'השראה ומוטיבציה'),
      opt('tools', 'כלים מעשיים'),
      opt('food_for_thought', 'חומר למחשבה'),
      opt('no_value', 'לא הרגשתי שקיבלתי ערך משמעותי', { exclusive: true }),
    ],
  },
  // ← audience-specific questions are inserted here (see questionsFor)
  {
    id: 'key_insight',
    type: 'text',
    title: 'מה הדבר המרכזי שנשאר איתך מההרצאה?',
    placeholder: 'משפט, רעיון, רגע…',
    required: false,
  },
  {
    id: 'topic',
    type: 'choice',
    title: 'על איזה נושא היית רוצה לשמוע יותר?',
    required: true,
    otherId: 'topic_other',
    options: [
      opt('leadership', 'מנהיגות והובלת אנשים'),
      opt('entrepreneurship', 'יזמות והפיכת רעיונות למציאות'),
      opt('comfort_zone', 'התפתחות אישית ויציאה מאזור הנוחות'),
      opt('grit', 'מצוינות, התמדה והתמודדות עם כישלונות'),
      opt('education', 'חינוך ועיצוב דור העתיד'),
      opt('israeli_society', 'החברה הישראלית ואחריות חברתית'),
      opt('amir_story', 'הסיפור האישי של עמיר והדרך להקמת חמש אצבעות'),
      opt('other', 'אחר', { other: true }),
    ],
  },
  {
    id: 'recommend',
    type: 'scale',
    title: 'עד כמה היית ממליץ/ה לאחרים לשמוע את ההרצאה ששמעת?',
    labels: ['בכלל לא', 'בהחלט'],
    required: true,
  },
  {
    id: 'wants_more',
    type: 'yesno',
    title: 'האם היית רוצה להיחשף לתכנים נוספים של עמיר?',
    required: true,
    emailOnYes: true,
    emailId: 'email',
  },
]

export const AUDIENCE_QUESTIONS = {
  pre_army: [
    {
      id: 'action_intent',
      type: 'choice',
      title: 'האם ההרצאה עוררה בך רצון לפעול או לשנות משהו בהתנהלות שלך?',
      required: true,
      options: [
        opt('yes_clear', 'כן, ואני יודע/ת מה ארצה לעשות אחרת'),
        opt('yes_unclear', 'כן, אבל עדיין לא ברור לי איך'),
        opt('not_really', 'לא במיוחד'),
      ],
    },
  ],
  army: [
    {
      id: 'army_relevance',
      type: 'scale',
      title: 'עד כמה התכנים בהרצאה היו רלוונטיים לאתגרים שאת/ה פוגש/ת במסגרת השירות הצבאי?',
      labels: ['בכלל לא', 'מאוד'],
      required: true,
    },
    {
      id: 'army_leadership',
      type: 'choice',
      title: 'האם ההרצאה גרמה לך לחשוב אחרת על האופן שבו את/ה מוביל/ה, מקבל/ת החלטות או לוקח/ת אחריות?',
      required: true,
      options: [
        opt('significant', 'כן, במידה משמעותית'),
        opt('somewhat', 'כן, במידה מסוימת'),
        opt('not_really', 'לא במיוחד'),
      ],
    },
  ],
}

/** The full question list a listener sees for a lecture of this audience. */
export function questionsFor(audience) {
  const extra = AUDIENCE_QUESTIONS[audience] || []
  const at = GENERAL_QUESTIONS.findIndex((q) => q.id === 'takeaways') + 1
  return [...GENERAL_QUESTIONS.slice(0, at), ...extra, ...GENERAL_QUESTIONS.slice(at)]
}

/** Every question that can appear in any lecture — for cross-lecture views. */
export const ALL_QUESTIONS = [
  ...GENERAL_QUESTIONS,
  ...Object.values(AUDIENCE_QUESTIONS).flat(),
]

/** value → label for an option question. */
export function optionLabel(q, value) {
  return q.options?.find((o) => o.value === value)?.label ?? value
}
