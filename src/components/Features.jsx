import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* ════════════════════════════════════════════════════════════════
   CARD 1 — מסוגלות (Competence) — Orange featured card
   ════════════════════════════════════════════════════════════════ */
const COMPETENCIES = [
  { label: 'ביטחון עצמי', sub: 'הכרת הכוח האישי שלך' },
  { label: 'התמודדות עם אתגרים', sub: 'גמישות מחשבתית בזמן לחץ' },
  { label: 'צמיחה אישית', sub: 'שיפור מתמיד של הגבולות' },
]

function CompetenceCard() {
  const [items, setItems] = useState(COMPETENCIES)

  useEffect(() => {
    const id = setInterval(() => {
      setItems((prev) => {
        const arr = [...prev]
        arr.unshift(arr.pop())
        return arr
      })
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="rounded-[2rem] p-8 h-full flex flex-col min-h-[320px] md:min-h-[400px]"
      style={{ background: '#ff8714' }}
    >
      {/* Header */}
      <div className="mb-7">
        <span className="font-mono text-white/50 text-xs tracking-widest uppercase">01</span>
        <h3 className="text-white font-bold text-2xl mt-2">מסוגלות</h3>
        <p className="text-white/65 text-sm mt-1 leading-snug">
          בניית יכולת עצמית להתמודד עם כל אתגר
        </p>
      </div>

      {/* Shuffler stack */}
      <div className="relative flex-1 min-h-[190px]">
        {items.map((item, i) => (
          <div
            key={item.label}
            className="absolute inset-x-0 p-4 rounded-2xl"
            style={{
              top: `${i * 62}px`,
              background:
                i === 0
                  ? 'rgba(255,255,255,0.22)'
                  : i === 1
                  ? 'rgba(255,255,255,0.10)'
                  : 'rgba(255,255,255,0.04)',
              border: i === 0 ? '1px solid rgba(255,255,255,0.35)' : '1px solid transparent',
              color: '#fff',
              zIndex: 3 - i,
              opacity: i === 0 ? 1 : i === 1 ? 0.72 : 0.38,
              transform: `scale(${1 - i * 0.04})`,
              transition: 'all 620ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <p className="font-bold text-sm md:text-base leading-tight">{item.label}</p>
            <p className="text-xs mt-1 leading-tight" style={{ opacity: 0.75 }}>
              {item.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   CARD 2 — שייכות (Belonging) — White card
   ════════════════════════════════════════════════════════════════ */
const MESSAGES = [
  'מצאת קבוצה שמאמינה בך...',
  'ביחד מגיעים רחוק יותר...',
  'כולנו חלק ממשהו גדול יותר...',
  'קשרים שנבנים לכל החיים...',
  'הקבוצה היא הבית שלך...',
]

function BelongingCard() {
  const [msgIdx, setMsgIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const msg = MESSAGES[msgIdx]
    let id

    if (!deleting && charIdx < msg.length) {
      id = setTimeout(() => {
        setDisplayed(msg.slice(0, charIdx + 1))
        setCharIdx((c) => c + 1)
      }, 65)
    } else if (!deleting && charIdx === msg.length) {
      id = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIdx > 0) {
      id = setTimeout(() => {
        setDisplayed(msg.slice(0, charIdx - 1))
        setCharIdx((c) => c - 1)
      }, 32)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setMsgIdx((m) => (m + 1) % MESSAGES.length)
    }

    return () => clearTimeout(id)
  }, [charIdx, msgIdx, deleting])

  return (
    <div className="bg-white rounded-[2rem] p-8 h-full flex flex-col min-h-[320px] md:min-h-[400px]">
      {/* Header */}
      <div className="mb-7">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[#ff8714] text-xs tracking-widest uppercase">02</span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8714] animate-pulse" />
            זרם חי
          </span>
        </div>
        <h3 className="text-[#000032] font-bold text-2xl mt-2">שייכות</h3>
        <p className="text-gray-400 text-sm mt-1 leading-snug">
          תחושת חיבור עמוק לקבוצה ולמטרה
        </p>
      </div>

      {/* Typewriter display */}
      <div className="flex-1 flex flex-col justify-center gap-5">
        <div
          className="rounded-2xl p-5 font-mono text-[#000032] text-base leading-relaxed min-h-[80px] flex items-center"
          style={{
            background: '#f8f9fa',
            border: '1px solid #f0f0f0',
          }}
        >
          <span>{displayed}</span>
          <span className="text-[#ff8714] animate-pulse ms-0.5 font-light">|</span>
        </div>

        {/* Progress bar dots */}
        <div className="flex gap-1.5">
          {MESSAGES.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full"
              style={{
                background: i === msgIdx ? '#ff8714' : '#e9ecef',
                flex: i === msgIdx ? 3 : 1,
                transition: 'all 400ms ease',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   CARD 3 — השפעה (Impact) — Dark navy card
   ════════════════════════════════════════════════════════════════ */
const DAYS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש']
const ACTIVE_DAYS = [0, 2, 4]

function ImpactCard() {
  const [highlightedDays, setHighlightedDays] = useState([])
  const [currentDay, setCurrentDay] = useState(null)
  const [saveState, setSaveState] = useState('idle')

  useEffect(() => {
    let timeouts = []

    const run = () => {
      setHighlightedDays([])
      setCurrentDay(null)
      setSaveState('idle')

      let idx = 0
      const clickNext = () => {
        if (idx < ACTIVE_DAYS.length) {
          const day = ACTIVE_DAYS[idx]
          setCurrentDay(day)
          timeouts.push(
            setTimeout(() => {
              setHighlightedDays((p) => [...p, day])
              setCurrentDay(null)
              idx++
              timeouts.push(setTimeout(clickNext, 450))
            }, 400)
          )
        } else {
          timeouts.push(
            setTimeout(() => {
              setSaveState('hover')
              timeouts.push(
                setTimeout(() => {
                  setSaveState('pressed')
                  timeouts.push(
                    setTimeout(() => {
                      setSaveState('saved')
                      timeouts.push(setTimeout(run, 2200))
                    }, 350)
                  )
                }, 500)
              )
            }, 500)
          )
        }
      }

      timeouts.push(setTimeout(clickNext, 600))
    }

    timeouts.push(setTimeout(run, 400))
    return () => timeouts.forEach(clearTimeout)
  }, [])

  return (
    <div
      className="rounded-[2rem] p-8 h-full flex flex-col min-h-[320px] md:min-h-[400px]"
      style={{ background: '#112060' }}
    >
      {/* Header */}
      <div className="mb-7">
        <span className="font-mono text-[#ff8714] text-xs tracking-widest uppercase">03</span>
        <h3 className="text-white font-bold text-2xl mt-2">השפעה</h3>
        <p className="text-white/45 text-sm mt-1 leading-snug">
          פעולה אקטיבית שמשנה מציאות מדי שבוע
        </p>
      </div>

      {/* Week grid + save animation */}
      <div className="flex-1 flex flex-col justify-center gap-6">
        <div className="grid grid-cols-7 gap-2">
          {DAYS.map((d, i) => {
            const isHighlighted = highlightedDays.includes(i)
            const isCurrent = currentDay === i

            return (
              <div
                key={d}
                className="aspect-square flex items-center justify-center rounded-xl text-xs font-bold transition-all duration-300"
                style={{
                  background: isHighlighted
                    ? '#ff8714'
                    : isCurrent
                    ? 'rgba(255,135,20,0.18)'
                    : 'rgba(255,255,255,0.07)',
                  color: isHighlighted
                    ? '#fff'
                    : isCurrent
                    ? '#ff8714'
                    : 'rgba(255,255,255,0.35)',
                  transform: isCurrent ? 'scale(0.92)' : 'scale(1)',
                  boxShadow: isCurrent
                    ? '0 0 0 2px rgba(255,135,20,0.5)'
                    : isHighlighted
                    ? '0 4px 14px rgba(255,135,20,0.38)'
                    : 'none',
                }}
              >
                {d}
              </div>
            )
          })}
        </div>

        <div className="flex justify-center">
          <button
            className="px-8 py-2.5 rounded-full font-bold text-sm transition-all duration-300"
            style={{
              background:
                saveState === 'saved'
                  ? '#ff8714'
                  : saveState === 'pressed' || saveState === 'hover'
                  ? 'rgba(255,135,20,0.85)'
                  : 'rgba(255,255,255,0.09)',
              color:
                saveState === 'saved' || saveState === 'pressed' || saveState === 'hover'
                  ? '#fff'
                  : 'rgba(255,255,255,0.35)',
              transform: saveState === 'pressed' ? 'scale(0.93)' : 'scale(1)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow:
                saveState === 'hover' ? '0 0 0 3px rgba(255,135,20,0.35)' : 'none',
            }}
          >
            {saveState === 'saved' ? '✓ נשמר בהצלחה' : 'שמור לוח זמנים'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   Features Section
   ════════════════════════════════════════════════════════════════ */
export default function Features() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header reveal
      gsap.fromTo(
        '.features-eyebrow',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        }
      )
      gsap.fromTo(
        '.features-headline',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        }
      )
      gsap.fromTo(
        '.features-sub',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          delay: 0.22,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        }
      )

      // Cards staggered rise
      gsap.fromTo(
        '.feature-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.14,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 65%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      id="features"
      className="relative py-16 md:py-28 lg:py-40 px-6 md:px-16 overflow-hidden"
      style={{ background: 'linear-gradient(155deg, #182f6e 0%, #0d1b4b 45%, #081028 100%)' }}
    >
      {/* Subtle orange radial glow — top centre */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 90% 45% at 50% 0%, rgba(255,135,20,0.07) 0%, transparent 65%)' }} />
      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Section header ─────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">

          <div>
            <p className="features-eyebrow font-mono text-[#ff8714] text-xs tracking-widest uppercase mb-4">
              מה אנחנו מפתחים
            </p>
            <h2 className="features-headline text-white font-bold text-5xl md:text-7xl leading-[1.05] tracking-tight">
              שלושה מעגלי
              <br />
              <span className="font-frank italic text-[#ff8714]">צמיחה.</span>
            </h2>
          </div>

          <p className="features-sub text-white/45 text-base md:text-lg leading-relaxed max-w-xs md:max-w-[280px] md:text-right">
            כל אחד מהמעגלים מחזק את האחרים, ויוצר בוגרים שיודעים להוביל שינוי אמיתי.
          </p>

        </div>

        {/* ── Cards grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <div className="feature-card">
            <CompetenceCard />
          </div>
          <div className="feature-card">
            <BelongingCard />
          </div>
          <div className="feature-card">
            <ImpactCard />
          </div>
        </div>

      </div>
    </section>
  )
}
