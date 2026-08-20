// Content source of truth for the עמוד צוות (Team / Staff) page.
// Hebrew copy follows the movement's gender-neutral policy (plural / slash forms).
// Placeholder copy that awaits real content is marked with // TODO.

export const hero = {
  eyebrow: 'הצטרפו לצוות',
  // Two words — animated per-character in TeamHero (word-1 / word-2).
  titleWord1: 'להוביל',
  titleWord2: 'בחמש',
  subtitle: 'המקום שבו מובילים ומובילות משפיעים על דור שלם',
  primaryCta: 'השאירו פרטים',
  secondaryCta: 'גלו את התפקידים',
}

// The "מי אנחנו" roster — real people behind the movement, grouped by department.
// Photos/names/bios are placeholders until the real content is supplied; every
// member keeps the same shape (photo, name, title, bio) so real content drops
// straight in later.
function placeholderMembers(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: `member-${i + 1}`,
    photo: '', // TODO: add portrait
    name: 'שם ותפקיד', // TODO: add real name
    title: 'תפקיד יעודכן', // TODO: add real title
    bio: 'תיאור קצר על חבר/ת הצוות יתווסף בהמשך.', // TODO: add real bio
  }))
}

export const roster = {
  eyebrow: 'הכירו את הצוות',
  title: 'האנשים שמניעים את חמש אצבעות',
  lead: 'בורד, הנהלה וצוות מטה, האנשים והאנשות שעומדים מאחורי התנועה.',
  groups: [
    {
      id: 'board',
      title: 'בורד ומנכ״לים',
      members: [
        {
          id: 'amir-menachem',
          photo: '/Amir_pics/amir-portrait.jpg',
          name: 'עמיר מנחם',
          title: 'מייסד ויו״ר',
          bio: 'בן 36, קצין לשעבר בשייטת 13 ומקים תנועת חמש אצבעות',
          instagram: 'https://www.instagram.com/amir_menachem5?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        },
        {
          id: 'ron-olarchik',
          photo: '/team_members/RON.JPG',
          name: 'רון אולארצ\'יק',
          title: 'מנכ״ל',
          bio: 'לאחר שהשתחרר מעוקץ, רון מוביל את התנועה מהשטח ומאמן כבר מעל לעשור',
          instagram: 'https://www.instagram.com/ron.olearchik?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        },
        ...placeholderMembers(2),
      ],
    },
    { id: 'managers', title: 'מנהלים', members: placeholderMembers(3) },
    { id: 'staff', title: 'מטה', members: placeholderMembers(6) },
  ],
}

export const intro = {
  eyebrow: 'הצוות שלנו',
  title: 'חמש אצבעות נבנית מהאנשים שבתוכה',
  lead: 'יש כמה דרכים להוביל אצלנו, ולכל אחת מהן אנחנו מחפשים אנשים ואנשות שרוצים להשפיע.',
  body:
    'מאחורי כל קבוצה, כל חוויה וכל חניך/ה עומדים אנשים שבחרו לקחת אחריות. ' +
    'בין אם דרך אימון ישיר של קבוצה, הדרכה בשטח או תפקיד מטה שמניע את כל התנועה, ' +
    'יש כאן מקום למי שרוצה להוביל ולהשאיר חותם.',
  // The three tracks, teased here and expanded in their own sections below.
  tracks: [
    { id: 'coach', label: 'מאמן/ת', blurb: 'התפקיד המרכזי: להוביל קבוצה ולהיות דמות מופת', target: '#team-coach' },
    { id: 'instructor', label: 'מדריך/ה בהזנק', blurb: 'הדרכה בשטח בתוך חוויות מאתגרות', target: '#team-instructor' },
    { id: 'hq', label: 'תפקידי מטה', blurb: 'טכנולוגיה, סושיאל, ניהול, לוגיסטיקה ועוד', target: '#team-hq' },
  ],
}

export const coach = {
  eyebrow: 'התפקיד המרכזי',
  title: 'מאמן/ת בחמש אצבעות',
  lead: 'המאמן/ת הם הלב של התנועה, דמות מופת שחיה את הערכים ומובילה קבוצה של צעירים וצעירות.',
  body:
    'כמאמנים ומאמנות אתם מלווים קבוצה לאורך זמן: בונים אמון, מציבים אתגרים, ' +
    'ומהווים דוגמה אישית למצוינות ערכית. זו לא עוד עבודה. זו שליחות שמעצבת אנשים.',

  // Explainer video — placeholder for now. When a real embed is ready, set videoUrl
  // to the iframe src; until then the poster + "סרטון בקרוב" placeholder shows.
  videoUrl: '', // TODO: add explainer video embed URL ("מה זה להיות מאמן/ת בחמש")
  videoPoster: '/Hero-Pics/214A0088.jpg',
  videoCaption: 'מה זה להיות מאמן/ת בחמש',

  // Next coaches' course — placeholder until a real date is set.
  course: {
    eyebrow: 'המחזור הקרוב',
    title: 'קורס מאמנים/ות',
    // TODO: replace with the real date + location once published.
    date: 'תאריך יעודכן בקרוב',
    location: 'מיקום יעודכן בקרוב',
    note: 'קורס ההכשרה שמכניס אתכם לעולם האימון של חמש: כלים, ערכים וקבוצה תומכת.',
    cta: 'רוצה לשמוע פרטים',
  },

  // Entry process — placeholder step copy, refined later.
  stepsTitle: 'תהליך הכניסה למאמן/ת',
  steps: [
    { n: '1', title: 'השארת פרטים', text: 'ממלאים את הטופס ואנחנו חוזרים אליכם.' }, // TODO refine
    { n: '2', title: 'שיחת היכרות', text: 'שיחה אישית להכיר אתכם ולספר על התפקיד.' }, // TODO refine
    { n: '3', title: 'קורס מאמנים/ות', text: 'הכשרה מלאה לכלים ולשפה של חמש.' }, // TODO refine
    { n: '4', title: 'כניסה לקבוצה', text: 'מתחילים להוביל קבוצה עם ליווי צמוד.' }, // TODO refine
  ],

  cta: 'רוצים להיות מאמנים/ות?',
}

export const instructor = {
  eyebrow: 'הדרכה בשטח',
  title: 'מדריך/ה בהזנק',
  lead: 'להדריך, להפעיל ולהוביל צעירים וצעירות בתוך החוויות המאתגרות של התנועה.',
  // TODO: replace generic placeholder with precise role description.
  body:
    'תפקיד ההדרכה בהזנק מציב אתכם בקו הראשון של החוויה: ' +
    'מפעילים פעילויות, מלווים קבוצות ברגעים המאתגרים, ' +
    'ומתרגמים את ערכי התנועה לשפה של שטח. מתאים למי שאוהבים אנשים, ' +
    'אנרגיה גבוהה ואחריות. (פירוט מלא על התפקיד יעודכן בקרוב.)',
  cta: 'מעניין אותי',
}

export const hq = {
  eyebrow: 'תפקידי מטה',
  title: 'יש הרבה יותר מדרך אחת להשפיע',
  lead:
    'חמש אצבעות היא גם צוות מטה שמניע את כל התנועה, ומחפש כל הזמן אנשים ואנשות מוכשרים.',
  body:
    'מאחורי הקלעים פועל צוות שמאפשר לכל השאר לקרות: טכנולוגיה, סושיאל, ניהול, לוגיסטיקה ועוד. ' +
    'אם יש לכם כישרון ורצון להשפיע, כנראה שיש לנו מקום בשבילכם.',
  departments: [
    { id: 'tech', title: 'טכנולוגיה', text: 'פיתוח, מוצר ומערכות שמניעים את התנועה', icon: 'Cpu' },
    { id: 'social', title: 'סושיאל ותוכן', text: 'סיפור הסיפור של חמש ברשתות ובמדיה', icon: 'Megaphone' },
    { id: 'management', title: 'ניהול', text: 'הובלת תהליכים, אנשים ופרויקטים', icon: 'Briefcase' },
    { id: 'logistics', title: 'לוגיסטיקה', text: 'תפעול, ציוד ומבצעים בשטח', icon: 'Truck' },
    { id: 'more', title: 'ועוד המון', text: 'גיוס, כספים, שותפויות, וכל מה שתדמיינו', icon: 'Sparkles' },
  ],
  cta: 'רוצים להתחבר? השאירו פרטים',
}

export const cta = {
  eyebrow: 'הצטרפות',
  title: 'רוצים להיות חלק מהצוות?',
  lead: 'השאירו פרטים ונחזור אליכם עם כל המידע על התפקידים והדרך להצטרף.',
  button: 'השאירו פרטים',
}
