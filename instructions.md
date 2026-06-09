# Instructions — Git & GitHub Workflow · Five Fingers

מסמך עבודה ל-git/GitHub. המטרה: לעבוד בלי לשבור את האתר שכבר רץ,
ובלי לדרוס עבודה של אחרים. (אושר מול הבחור הבכיר.)

## מודל ה-Branches
- `main`  — הענף הראשי. ממנו Vercel מפרסם לאוויר. ❌ לא דוחפים אליו ישירות.
- `RAN`   — הענף האישי שלך. כאן אתה עובד תמיד.

## פעם ראשונה בלבד (clone לרפו)
```bash
git clone https://github.com/eladman/FiveFingers.git
cd FiveFingers
git checkout RAN            # אם לא קיים מקומית: git checkout -b RAN origin/RAN
npm install                # התקנת התלויות
```

## תחילת כל סשן עבודה — להסתנכרן עם main
```bash
git checkout RAN           # לוודא שאתה על הענף שלך
git pull origin main       # מושך את העדכונים מ-main לתוך RAN
```
> שים לב: הפקודה הזאת מושכת את `main` *לתוך הענף הנוכחי*.
> לכן חובה להיות על `RAN` לפני שמריצים אותה.

## להריץ מקומית
```bash
npm run dev                # שרת פיתוח → http://localhost:5173
```

## תוך כדי עבודה — לשמור מקומית
```bash
git add .
git commit -m "תיאור קצר וברור של מה שעשית"
```
מומלץ קומיטים קטנים ותכופים, לא קומיט ענק אחד בסוף.

## לדחוף ל-GitHub (לענף RAN)
```bash
git push origin RAN
```

## לפרסם ל-main (ולעלות לאוויר)
1. ב-GitHub פותחים Pull Request:  `base = main`  ←  `compare = RAN`
2. הבחור הבכיר עובר על הקוד ועושה merge ל-`main`.
3. עם ה-merge, Vercel מפרסם אוטומטית (הבכיר מטפל ב-Vercel כרגע).

## עבודת "עמוד standalone" (חשוב!)
בונים קטע/עמוד חדש בנפרד קודם, מאמתים שהוא עובד, ורק אז מחברים אותו —
כך לא שוברים את דף הבית החי תוך כדי עבודה.

הניתוב באתר הוא **לפי hash** (ב-`src/main.jsx` וב-`src/App.jsx`):
- `#showcase` → `HeroShowcase`,  `#variants` → `DesignShowcase`  (עמודים standalone)
- `#liabah` → עמוד הליבה,  ברירת מחדל → דף הבית (`App`)

1. **בונים standalone:** יוצרים קומפוננטה חדשה, ומוסיפים ענף hash זמני ב-`main.jsx`
   (בדומה ל-`#showcase`) כדי לצפות בה לבד — למשל `http://localhost:5173/#mysection`.
2. **מחברים:** כשהקטע עובד, מייבאים אותו ל-`App.jsx` ומשבצים אותו ב-`<main>`
   בין שני `<SoftDivider>` (דף הבית), או נותנים לו hash משלו כמו `#liabah`.
3. תמיד עובדים לפי `DESIGN.MD` (צבעים, טיפוגרפיה, אנימציות, כללי RTL).

## עשה / אל תעשה
- ✅ למשוך מ-`main` בתחילת כל סשן — מונע קונפליקטים.
- ✅ הודעות commit קצרות, ברורות, בלשון הווה.
- ✅ לבנות standalone קודם, לחבר רק כשעובד.
- ❌ לא לדחוף ישירות ל-`main`.
- ❌ לא לדחוף `node_modules` / קבצים ענקיים (ה-`.gitignore` אמור לטפל בזה).
- ⚠️ נתקלת ב-merge conflict? עצור, אל תכריח (`--force`), תשאל את הבכיר.
