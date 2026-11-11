import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, animate as motionAnimate } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { getAttribution, getAttributionJson, newLeadId } from '../lib/attribution.js'

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

/* ─── Magnetic Button ─── */
function MagneticButton({ children, className = '', href, onClick, type, disabled }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 200, damping: 20 })
  const y = useSpring(0, { stiffness: 200, damping: 20 })
  const [glowPos, setGlowPos] = useState({ x: '50%', y: '50%' })

  const handleMouse = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * 0.15)
    y.set(dy * 0.15)
    setGlowPos({ x: `${((e.clientX - rect.left) / rect.width) * 100}%`, y: `${((e.clientY - rect.top) / rect.height) * 100}%` })
  }, [x, y])

  const handleLeave = useCallback(() => { x.set(0); y.set(0) }, [x, y])

  const Tag = href ? 'a' : type ? 'button' : 'div'
  const props = href ? { href } : type ? { type, disabled } : {}

  return (
    <motion.div ref={ref} style={{ x, y }} onMouseMove={handleMouse} onMouseLeave={handleLeave} className="inline-block">
      <Tag {...props} onClick={onClick} className={`relative overflow-hidden ${className}`}>
        <span
          className="pointer-events-none absolute inset-0 opacity-0 hover-parent-glow transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at ${glowPos.x} ${glowPos.y}, rgba(255,255,255,0.15) 0%, transparent 60%)` }}
        />
        {children}
      </Tag>
    </motion.div>
  )
}

function Section({ children, className = '', id }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.section>
  )
}

/* ─── Navbar ─── */
function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => setScrolled(window.scrollY > 50), { passive: true })
  }

  const links = [
    { label: 'מי אנחנו', href: '#about' },
    { label: 'למה להצטרף', href: '#why' },
    { label: 'מה בקורס', href: '#curriculum' },
    { label: 'למי מתאים', href: '#target' },
    { label: 'שאלות ותשובות', href: '#faq' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy/98 backdrop-blur-md shadow-2xl' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-18 md:h-20">
          {/* Logo - right side in RTL */}
          <a href="#" className="flex items-center gap-2 group shrink-0">
            <img src="/coaches_course/logo.png" alt="חמש אצבעות" className="h-10 md:h-12 w-auto" />
          </a>

          {/* Desktop links - centered */}
          <div className="hidden md:flex items-center gap-1 absolute right-1/2 translate-x-1/2">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="animated-underline text-white/80 hover:text-white px-3 py-2 text-sm font-light transition-colors whitespace-nowrap"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA - left side in RTL */}
          <a
            href="#register"
            className="hidden md:inline-block bg-orange hover:bg-orange-hover text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange/20 shrink-0"
          >
            להגשת מועמדות
          </a>

          {/* Mobile CTA + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href="#register"
              className="bg-orange hover:bg-orange-hover text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
            >
              להגשת מועמדות
            </a>
            <button onClick={() => setOpen(!open)} className="text-white p-2" aria-label="תפריט">
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`block h-0.5 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-navy border-t border-white/10 overflow-hidden"
            >
              <div className="py-4 flex flex-col gap-2">
                {links.map(l => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-white/80 hover:text-white px-4 py-2 text-base transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#register"
                  onClick={() => setOpen(false)}
                  className="mx-4 mt-2 bg-orange text-white px-6 py-3 rounded-lg text-center font-semibold"
                >
                  להגשת מועמדות
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

/* ─── Hero ─── */
function Hero() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.7, 0.95])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax zoom */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <img
          src="/coaches_course/AE8I6828.webp"
          alt="קורס מאמנים"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <motion.div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/60 to-navy" style={{ opacity: overlayOpacity }} />
      <div className="absolute inset-0 grain-overlay" />

      {/* Content with parallax offset */}
      <motion.div className="relative z-10 max-w-5xl mx-auto px-6 text-center" style={{ y: contentY }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-8 inline-flex items-center gap-3"
        >
          <span className="text-white text-lg md:text-2xl font-bold tracking-wide">
            המחזור הבא
          </span>
          <span className="text-white/40 text-lg md:text-2xl font-light">|</span>
          <span className="text-orange text-lg md:text-2xl font-semibold">
            ההרשמה פתוחה
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-tight mb-6"
        >
          קורס מאמנים
          <br />
          <span className="gradient-text">חמש אצבעות</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 80, damping: 12 }}
          className="text-white text-2xl md:text-4xl max-w-3xl mx-auto mb-10 font-bold leading-snug tracking-tight"
        >
          {"ההזדמנות שלך לאמן ולהשפיע על המציאות".split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              className="inline-block ml-2"
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton
            href="#register"
            className="bg-orange hover:bg-orange-hover text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-2xl hover:shadow-orange/30 block"
          >
            להגשת מועמדות לקורס
          </MagneticButton>
          <MagneticButton
            href="#about"
            className="border-2 border-white/30 hover:border-white/60 text-white px-10 py-4 rounded-xl text-lg font-light transition-all hover:bg-white/5 block"
          >
            מידע נוסף
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 inset-x-0 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs tracking-widest">גלול למטה</span>
          <svg className="w-5 h-5 text-orange/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─── Video Player (play on scroll into view) ─── */
function VideoPlayer() {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { margin: '-100px', once: false })
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const hasInteracted = useRef(false)

  // Track any user interaction on the page
  useEffect(() => {
    const markInteracted = () => { hasInteracted.current = true }
    document.addEventListener('click', markInteracted, { once: true })
    document.addEventListener('touchstart', markInteracted, { once: true })
    document.addEventListener('scroll', markInteracted, { once: true })
    return () => {
      document.removeEventListener('click', markInteracted)
      document.removeEventListener('touchstart', markInteracted)
      document.removeEventListener('scroll', markInteracted)
    }
  }, [])

  useEffect(() => {
    if (!videoRef.current) return
    if (isInView) {
      if (hasInteracted.current) {
        videoRef.current.muted = false
        setIsMuted(false)
      }
      videoRef.current.play().catch(() => {
        // Browser blocked unmuted autoplay - fall back to muted
        if (!videoRef.current) return
        videoRef.current.muted = true
        setIsMuted(true)
        videoRef.current.play()
      })
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [isInView])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  return (
    <div ref={containerRef} className="relative h-full">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        src="/coaches_course/video.mp4"
      />

      {/* Play/Pause - center overlay */}
      <button
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center cursor-pointer group/play"
        aria-label={isPlaying ? 'עצור' : 'נגן'}
      >
        <div className={`w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 group-hover/play:bg-black/60 group-hover/play:scale-110 ${isPlaying ? 'opacity-0 group-hover/play:opacity-100' : 'opacity-100'}`}>
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 mr-[-2px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </button>

      {/* Mute/Unmute - bottom corner, always visible on mobile */}
      <button
        onClick={toggleMute}
        className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all cursor-pointer z-10"
        aria-label={isMuted ? 'הפעל צליל' : 'השתק'}
      >
        {isMuted ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>
    </div>
  )
}

/* ─── Why Join ─── */
const whyCards = [
  {
    num: '01',
    title: 'קריירה עם שליחות',
    desc: 'לא עוד סתם עבודה - קריירה שתשפיע עליכם ותפתח אתכם. משכורת ותנאים מצוינים לצד השפעה על הדור הבא.',
    accent: 'from-orange to-orange-light',
    bgAccent: 'bg-orange',
  },
  {
    num: '02',
    title: 'קהילה של מצוינות',
    desc: 'תהיו חלק מקהילה של אנשים שדוחפים אחד את השני קדימה. קשרים שנשארים לכל החיים.',
    accent: 'from-navy to-navy-light',
    bgAccent: 'bg-navy',
  },
  {
    num: '03',
    title: 'חוסן מנטלי',
    desc: 'דרך העברת התכנים תפתחו בעצמכם את העולם הפיזי-מנטלי שיעזור לך באתגרים הבאים בחיים.',
    accent: 'from-orange to-orange-light',
    bgAccent: 'bg-orange',
  },
  {
    num: '04',
    title: 'מסתכלים על המציאות בעיניים',
    desc: 'יוצאים לשטח ומעבירים: אימונים, סדנאות, הרצאות, מחנות אימון, פוגשים אנשים מעוררי השראה - הכל על מנת לפתח את הדור הבא.',
    accent: 'from-navy to-navy-light',
    bgAccent: 'bg-navy',
  },
]

function WhyJoin() {
  return (
    <Section id="why" className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange/[0.03] blur-3xl" />
        <div className="absolute -left-20 top-1/4 w-[400px] h-[400px] rounded-full bg-navy/[0.03] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Intro - combined layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-16 md:mb-20">
          <motion.div variants={fadeUp} className="flex items-start gap-6">
            <div className="hidden md:block w-1 self-stretch bg-gradient-to-b from-orange to-orange/0 rounded-full mt-2" />
            <div>
              <span className="text-orange text-xs font-bold tracking-[0.25em] uppercase mb-3 block">למה דווקא אנחנו</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-navy leading-tight">
                למה להצטרף<br />
                <span className="gradient-text">לקורס מאמנים?</span>
              </h2>
              <span className="inline-block mt-4 px-4 py-1.5 bg-orange/10 text-orange font-bold text-sm rounded-full">ההרשמה פתוחה</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="relative">
            <div className="absolute -top-3 -right-3 w-16 h-16 border-2 border-orange/15 rounded-xl -z-1" />
            <p className="text-charcoal/70 text-lg md:text-xl font-light leading-relaxed text-justify">
              קורס המאמנים הוא השער שלך להצטרף אלינו למשפחה. בקורס תעברו הכשרה משמעותית ומקצועית, שתכין אתכם להוביל קבוצות, לפתח אנשים, ולבנות קריירה לטווח ארוך - עם משכורת ותנאים מצוינים.
            </p>
            <div className="w-20 h-1 bg-gradient-to-l from-orange to-orange/0 rounded-full mt-6" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-10 items-stretch">
          {/* Cards - 2x2 bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyCards.map((card, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                custom={i}
                className="group relative overflow-hidden rounded-2xl bg-cream p-7 md:p-8 flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange/8"
              >
                {/* Large watermark number */}
                <span className="absolute -bottom-3 left-4 text-[5.5rem] font-display font-black leading-none select-none pointer-events-none text-navy/[0.04] transition-colors duration-500 group-hover:text-orange/[0.08]">
                  {card.num}
                </span>

                <h3 className="font-display text-xl md:text-2xl font-bold text-navy mb-2 relative z-10">{card.title}</h3>
                <p className="leading-relaxed text-base relative z-10 text-charcoal/55 font-light">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Video - left side in RTL */}
          <motion.div variants={scaleIn} custom={1} className="order-first lg:order-last">
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-gray-100 h-full max-h-[500px] lg:max-h-none mx-auto lg:mx-0 w-64 sm:w-72 lg:w-full">
              <VideoPlayer />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

/* ─── Not For Everyone ─── */
function NotForEveryone() {
  return (
    <Section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src="/coaches_course/group-running.webp" alt="" className="w-full h-full object-cover ken-burns" />
        <div className="absolute inset-0 bg-navy/90" />
        <div className="absolute inset-0 grain-overlay" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          variants={{
            hidden: { clipPath: 'circle(0% at 50% 50%)' },
            visible: { clipPath: 'circle(75% at 50% 50%)', transition: { duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] } },
          }}
        >
          <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            זה לא מתאים לכל אחד.
            <br />
            <span className="gradient-text">אבל אם זה מתאים לך -</span>
            <br />
            החיים שלך עומדים להשתנות.
          </h2>
        </motion.div>
        <motion.div variants={fadeUp} custom={1}>
          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10">
            הסטנדרטים שלנו גבוהים, הקצב מהיר, והשפעה שלנו על הדור הבא היא עצומה.
            <br />
            אם אתם קוראים את זה ומרגישים שזה בשבילכם - אולי גם אתם תוכלו להצטרף אלינו לדרך.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} custom={2}>
          <MagneticButton
            href="#register"
            className="inline-block bg-orange hover:bg-orange-hover text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-2xl hover:shadow-orange/30"
          >
            רוצים להצטרף לקורס!
          </MagneticButton>
        </motion.div>
      </div>
    </Section>
  )
}

/* ─── What Awaits (Curriculum) ─── */
const curriculumItems = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
    title: 'הכשרה מקצועית',
    desc: 'הכשרה בשיטת חמש אצבעות - חיבור בין העולם הפיזי והמנטלי שמפתחת מצוינות ערכית.',
    span: true,
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
      </svg>
    ),
    title: 'חוויה של אימונים על עצמנו',
    desc: 'אימונים פיזיים-מנטליים לפי השיטה של חמש אצבעות - תחוו על עצמכם את מה שתעבירו למתאמנים.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H20.25" />
      </svg>
    ),
    title: 'כלים מקצועיים',
    desc: 'תקבלו כלים מעשיים ומקצועיים - איך להיות מאמנים טובים יותר בשטח ולמצות את הפוטצניאל של המתאמנים שלך.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'מנהיגות והשפעה',
    desc: 'כלים למנהיגות, להשפעה על המציאות ולמקסם את הפוטנציאל של המתאמנים.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: 'תצטרפו לקהילת המאמנים',
    desc: 'תקבלו חניכה אישית ממאמן לאורך הקורס. בנוסף, תיפגשו עם צוות המאמנים ותזכו לקבל מהנסיון שלהם.',
  },
]

function Curriculum() {
  return (
    <Section id="curriculum" className="py-24 md:py-32 bg-sand">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="text-center mb-14">
          <span className="text-orange text-sm font-semibold tracking-widest uppercase mb-4 block">תוכנית הלימודים</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-navy">
            אז מה מחכה לך בקורס?
          </h2>
          <span className="inline-block mt-5 px-4 py-1.5 bg-orange/10 text-orange font-bold text-sm rounded-full">ההרשמה פתוחה</span>
          <div className="w-16 h-1 bg-orange mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Hero card - full width */}
        <motion.div
          variants={scaleIn}
          custom={0}
          className="group relative bg-white rounded-3xl p-8 md:p-10 mb-5 overflow-hidden border border-transparent hover:border-orange/20 transition-all duration-500 hover:shadow-xl hover:shadow-orange/5"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-orange/10 flex items-center justify-center text-orange shrink-0 group-hover:bg-orange group-hover:text-white transition-all duration-500">
              {curriculumItems[0].icon}
            </div>
            <div className="flex-1">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-navy mb-2">{curriculumItems[0].title}</h3>
              <p className="text-charcoal/55 font-light leading-relaxed text-lg">{curriculumItems[0].desc}</p>
            </div>
            <span className="text-orange/[0.04] font-display text-7xl md:text-8xl font-black absolute left-6 bottom-2 md:bottom-4 select-none leading-none">01</span>
          </div>
        </motion.div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {curriculumItems.slice(1).map((item, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              custom={i + 1}
              className="group relative bg-white rounded-2xl p-7 md:p-8 border border-transparent hover:border-orange/20 transition-all duration-500 hover:shadow-xl hover:shadow-orange/5 hover:-translate-y-1 overflow-hidden"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange shrink-0 group-hover:bg-orange group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-navy mb-2">{item.title}</h3>
                  <p className="text-charcoal/55 font-light leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
              <span className="text-orange/[0.04] font-display text-7xl font-black absolute left-4 bottom-1 select-none leading-none">0{i + 2}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ─── Who Is It For (Ideal Candidate) ─── */
function WhoIsItFor() {
  return (
    <Section className="relative py-28 md:py-36 bg-white overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-navy/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered header */}
        <motion.div variants={fadeUp} custom={0} className="text-center mb-16 md:mb-20">
          <span className="text-orange text-sm font-semibold tracking-[0.2em] uppercase mb-5 block">מתאים לך?</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-navy mb-5 leading-tight">
            אז למי זה יכול להתאים?
          </h2>
          <p className="text-charcoal/50 text-lg md:text-xl font-light max-w-2xl mx-auto">
            הקורס מתאים לצעירים וצעירות (גילאי 23-35) שרוצים להפוך את האהבה שלהם לספורט לדרך של הובלה, חינוך והשפעה.
          </p>
        </motion.div>

        {/* Cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16 md:mb-20">
          {targetCards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i + 1}
              className="group relative bg-white rounded-2xl p-6 md:p-7 flex items-center gap-5 shadow-[0_2px_20px_rgba(27,37,65,0.06)] hover:shadow-[0_8px_40px_rgba(232,134,42,0.12)] transition-all duration-500 border border-transparent hover:border-orange/20"
            >
              <div className="absolute top-0 right-0 h-full w-1 bg-orange rounded-r-2xl scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange/15 to-orange/5 flex items-center justify-center text-orange shrink-0 group-hover:from-orange group-hover:to-orange-hover group-hover:text-white transition-all duration-500">
                {card.icon}
              </div>
              <p className="text-navy font-semibold text-sm md:text-base leading-relaxed">{card.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Photo collage - 3 images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          <motion.div variants={scaleIn} custom={1} className="col-span-2 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/coaches_course/Updated.webp"
              alt="קבוצת מאמנים"
              className="w-full h-[260px] md:h-[320px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
          <motion.div variants={scaleIn} custom={2} className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/coaches_course/beach-training.webp"
              alt="אימון בחוף"
              className="w-full h-[260px] md:h-[320px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
          <motion.div variants={scaleIn} custom={3} className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/coaches_course/coaching-session.webp"
              alt="מפגש אימון"
              className="w-full h-[260px] md:h-[320px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

/* ─── About The Course ─── */
/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = '', label }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString('he-IL'))
  const [display, setDisplay] = useState('0')
  const lineScale = useSpring(0, { stiffness: 100, damping: 20 })

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => setDisplay(v))
    return unsubscribe
  }, [rounded])

  useEffect(() => {
    if (isInView) {
      motionAnimate(count, target, { duration: 2, ease: [0.25, 0.46, 0.45, 0.94] })
      setTimeout(() => lineScale.set(1), 1800)
    }
  }, [isInView, target, count, lineScale])

  return (
    <div ref={ref} className="text-center">
      <span className="font-display text-4xl md:text-5xl font-black text-navy">{display}{suffix}</span>
      <motion.div className="w-12 h-[3px] bg-orange mx-auto mt-2 mb-2 rounded-full origin-center" style={{ scaleX: lineScale }} />
      <span className="text-charcoal/60 text-sm font-light">{label}</span>
    </div>
  )
}

function AboutCourse() {
  return (
    <Section id="about" className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div variants={scaleIn} custom={0} className="relative order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/coaches_course/AE8I7127.webp"
                alt="אימון קבוצתי"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={0} className="order-1 lg:order-2">
            <span className="text-orange text-sm font-semibold tracking-widest uppercase mb-4 block">מה זה חמש אצבעות בכלל?</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-8 leading-tight">
              מי אנחנו
            </h2>
            <div className="space-y-5 text-justify">
              <p className="text-charcoal/70 text-lg font-light leading-relaxed">
                חמש אצבעות היא תנועה חינוכית-חברתית שפועלת לפיתוח בני נוער וצעירים דרך ספורט, אתגר והובלה.
              </p>
              <p className="text-charcoal/70 text-lg font-light leading-relaxed">
                אנחנו מאמינים שספורט הוא הרבה יותר מאימון פיזי.
                הוא דרך לבנות חוסן, משמעת, אחריות, עבודת צוות ויכולת להוביל אחרים.
              </p>
              <p className="text-charcoal/70 text-lg font-light leading-relaxed">
                המשימה שלנו היא להצמיח דור של אנשים חזקים, ערכיים ומשפיעים יותר – על עצמם, על הקבוצה ועל החברה הישראלית.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Animated stats */}
        <motion.div variants={fadeUp} custom={2} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-navy/10">
          <AnimatedCounter target={3000} suffix="+" label="בני נוער" />
          <AnimatedCounter target={4000} suffix="+" label="בוגרים פעילים" />
          <AnimatedCounter target={12} label="שנות פעילות" />
          <AnimatedCounter target={8} label="מפגשים בקורס" />
        </motion.div>
      </div>
    </Section>
  )
}

/* ─── Testimonials ─── */
const testimonials = [
  { img: '/coaches_course/IMG_4594.webp', name: 'בוגר מחזור 3', quote: 'הקורס שינה לי את החיים. מצאתי קריירה עם משמעות אמיתית.' },
  { img: '/coaches_course/IMG_4511.webp', name: 'בוגרת מחזור 4', quote: 'הקהילה פה היא משהו שלא חוויתי בשום מקום אחר. משפחה אמיתית.' },
  { img: '/coaches_course/_R3A5134.webp', name: 'בוגר מחזור 2', quote: 'למדתי כאן דברים על עצמי שלא ידעתי שקיימים. חוויה מעצבת.' },
]

export function Testimonials() {
  return (
    <Section id="testimonials" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="text-center mb-16 md:mb-20">
          <span className="text-orange text-sm font-semibold tracking-widest uppercase mb-4 block">בוגרים מספרים</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-navy">
            מה אומרים המאמנים שלנו?
          </h2>
          <div className="w-16 h-1 bg-orange mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              custom={i}
              className="group relative bg-cream rounded-2xl overflow-hidden border border-transparent hover:border-orange/20 transition-all duration-500 hover:shadow-xl"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-orange/80 group-hover:border-orange transition-all duration-500 cursor-pointer">
                    <svg className="w-6 h-6 text-white mr-[-2px]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-charcoal/70 font-light leading-relaxed mb-4 text-sm">"{t.quote}"</p>
                <p className="text-navy font-semibold">{t.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ─── Target Audience ─── */
const targetCards = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
    title: 'בעלי רקע בהדרכה, פיקוד או הובלת קבוצות',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'ספורטאים או אנשים עם חיבור אמיתי לעולם האימון',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: 'מי שמחפשים מסלול עם משמעות, אתגר ואנשים איכותיים',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: 'מי שרוצים לבנות קריירה בעולם האימון, החינוך או ההובלה',
  },
]


/* ─── FAQ ─── */
const faqItems = [
  { q: 'מתי מתחיל הקורס?', a: 'מועד פתיחת המחזור הבא יפורסם בקרוב. השאירו פרטים בטופס ונעדכן אתכם ראשונים.' },
  { q: 'כמה זמן נמשך הקורס?', a: 'הקורס הינו 8 מפגשים.' },
  { q: 'באיזה ימים מתקיים הקורס?', a: 'הקורס מתקיים בימי שישי, בנוסף תקחו חלק בהתנסויות בשטח בימי ראשון/שני' },
  { q: 'האם יש תשלום על הקורס?', a: 'אתם לא משלמים, אנחנו משלמים לך :). ההשתתפות מותנית בהתחייבות לשנה.' },
  { q: 'איפה מתקיים הקורס?', a: 'מטה חמש אצבעות, הצדף 2, ארנה הרצליה.' },
  { q: 'האם צריך ניסיון קודם באימון?', a: 'לא. הקורס מיועד גם למי שלא אימן בעבר אך מגיע עם מוטיבציה, רקע ספורטיבי ורצון להוביל.' },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <Section id="faq" className="relative py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-cream" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="text-center mb-14 md:mb-18">
          <span className="text-orange text-sm font-semibold tracking-widest uppercase mb-4 block">שאלות נפוצות</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-navy">
            שאלות ותשובות
          </h2>
        </motion.div>

        <div className="divide-y divide-navy/10">
          {faqItems.map((item, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 md:py-7 text-right cursor-pointer group"
              >
                <span className="font-display text-lg md:text-xl font-semibold text-navy group-hover:text-orange transition-colors duration-300">{item.q}</span>
                <span
                  className={`text-orange text-2xl font-light shrink-0 mr-6 transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}
                >
                  +
                </span>
              </button>
              <div className={`faq-answer ${openIndex === i ? 'open' : ''}`}>
                <div>
                  <p className="pb-6 md:pb-7 text-charcoal/60 font-light leading-relaxed text-base md:text-lg">
                    {item.a}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ─── Registration Form ─── */
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzhfa7wRRs4zt1ZCJ2D84DnLPUZUb__2UYLjXaub9bX61jdzotFk5PtvTo3UlJ9bVcrOA/exec'

// The course team's sheet ("קורס מאמנים"). no-cors: the response is opaque, so
// only a network failure is detectable here.
function sendToSheet(data) {
  return fetch(GOOGLE_SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      sport: data.sport,
      city: data.city,
      age: data.age,
      timestamp: new Date().toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    }),
  })
}

// The website's lead pipeline — same webhook and payload shape as
// src/components/ContactModal.jsx (column mapping in supabase/README.md).
async function sendToWebsitePipeline(data) {
  const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn('VITE_MAKE_WEBHOOK_URL not set — skipping Make webhook.')
    return
  }
  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.fullName,
      phone: data.phone,
      email: data.email,
      productType: 'קורס מאמנים',
      residence: data.city,
      experience: data.sport,
      age: data.age,
      details: { 'ספורט וקורסים': data.sport, 'מקום מגורים': data.city, 'גיל': data.age },
      submittedAt: new Date().toISOString(),
      source: 'fivefingers-website',
      pageUrl: window.location.href,
      leadId: newLeadId(),
      attribution: getAttribution(),
      attributionJson: getAttributionJson(),
    }),
  })
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`)
}
function RegistrationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [submitted, setSubmitted] = useState(false)

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const onSubmit = async (data) => {
    setSubmitting(true)
    setSubmitError(false)
    // Two destinations: the course team's Google Sheet (as before), and the
    // website's lead pipeline (Make.com → contact_submissions / dashboard) with
    // the same payload shape as ContactModal. Only if both fail do we show an
    // error — either one alone means the lead reached us.
    const results = await Promise.allSettled([sendToSheet(data), sendToWebsitePipeline(data)])
    results.forEach((r) => { if (r.status === 'rejected') console.error('Coaches form send failed:', r.reason) })
    if (results.some((r) => r.status === 'fulfilled')) setSubmitted(true)
    else setSubmitError(true)
    setSubmitting(false)
  }

  const inputClass =
    'w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all text-right'
  const errorClass = 'border-red-500 ring-2 ring-red-500/50'

  return (
    <Section id="register" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src="/coaches_course/_R3A0699.webp" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/95" />
        <div className="absolute inset-0 grain-overlay" />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="text-center mb-12">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            המיון הקרוב לקורס מאמנים
            <br />
            <span className="gradient-text">יוצא לדרך</span>
          </h2>
          <span className="inline-block mb-4 px-4 py-1.5 bg-orange/20 text-orange font-bold text-sm rounded-full">ההרשמה פתוחה</span>
          <p className="text-white/60 text-lg font-light">המקומות מוגבלים - זה הזמן שלך להצטרף</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/10"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">הטופס נשלח בהצלחה!</h3>
              <p className="text-white/60 font-light">נחזור אליך בהקדם. תודה שהגשת מועמדות!</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              variants={fadeIn}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 space-y-5 border border-white/10"
            >
              <div>
                <label className="block text-white/80 text-sm mb-2 font-light">שם מלא *</label>
                <input
                  {...register('fullName', { required: true })}
                  placeholder="שם פרטי ושם משפחה"
                  className={`${inputClass} ${errors.fullName ? errorClass : ''}`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/80 text-sm mb-2 font-light">דוא"ל *</label>
                  <input
                    type="email"
                    {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                    placeholder="your@email.com"
                    dir="ltr"
                    className={`${inputClass} text-left ${errors.email ? errorClass : ''}`}
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2 font-light">טלפון *</label>
                  <input
                    type="tel"
                    {...register('phone', { required: true, pattern: /^0[2-9]\d?-?\d{7}$/ })}
                    placeholder="05X-XXXXXXX"
                    dir="ltr"
                    className={`${inputClass} text-left ${errors.phone ? errorClass : ''}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2 font-light">באיזה ספורט אתם עוסקים ואיזה קורסים עשיתם? *</label>
                <textarea
                  {...register('sport', { required: true })}
                  rows={3}
                  placeholder="ספרו לנו על הרקע הספורטיבי שלך..."
                  className={`${inputClass} resize-none ${errors.sport ? errorClass : ''}`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/80 text-sm mb-2 font-light">מקום מגורים *</label>
                  <input
                    {...register('city', { required: true })}
                    placeholder="עיר/ישוב"
                    className={`${inputClass} ${errors.city ? errorClass : ''}`}
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2 font-light">גיל *</label>
                  <input
                    type="number"
                    {...register('age', { required: true, min: 16, max: 99 })}
                    placeholder="לדוגמה: 24"
                    dir="ltr"
                    className={`${inputClass} text-left ${errors.age ? errorClass : ''}`}
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                animate={submitting ? {} : {
                  boxShadow: [
                    '0 0 20px rgba(232,134,42,0.15)',
                    '0 0 40px rgba(232,134,42,0.4)',
                    '0 0 20px rgba(232,134,42,0.15)',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className={`shimmer-btn w-full bg-orange hover:bg-orange-hover text-white py-4 rounded-xl text-lg font-bold transition-all mt-4 cursor-pointer ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {submitting ? 'שולח...' : 'להגשת מועמדות'}
              </motion.button>

              {submitError && (
                <p className="text-red-400 text-sm text-center">אירעה שגיאה בשליחת הטופס. אנא נסו שנית.</p>
              )}

              <p className="text-white/30 text-xs text-center font-light">
                הפרטים שלך ישמרו בסודיות מלאה ולא ישותפו עם גורם שלישי
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-navy-dark py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/coaches_course/logo.png" alt="חמש אצבעות" className="h-8 w-auto" />
            <span className="text-white/30 text-sm">|</span>
            <span className="text-white/30 text-sm font-light">קורס מאמנים</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/five_fingers_israel" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-orange transition-colors" aria-label="אינסטגרם">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/5ivefingers" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-orange transition-colors" aria-label="פייסבוק">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="https://www.tiktok.com/@five_fingers_israel" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-orange transition-colors" aria-label="טיקטוק">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.99a8.21 8.21 0 004.77 1.52V7.06a4.84 4.84 0 01-1-.37z" />
              </svg>
            </a>
          </div>

          <p className="text-white/20 text-sm font-light">
            © {new Date().getFullYear()} חמש אצבעות. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ─── Gallery Card with 3D tilt ─── */
function GalleryCard({ src, width }) {
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)')

  const handleMouse = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTransform(`rotateY(${x * 16}deg) rotateX(${-y * 12}deg)`)
  }, [])

  return (
    <div
      className="shrink-0 rounded-2xl overflow-hidden shadow-lg shadow-black/30 group"
      style={{ width, height: 192, transform, transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setTransform('rotateX(0deg) rotateY(0deg)')}
    >
      <img src={src} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}

/* ─── Gallery Strip (between sections) ─── */
function GalleryStrip() {
  const images = [
    '/coaches_course/AE8I7158.webp',
    '/coaches_course/_R3A3806-Enhanced-NR.webp',
    '/coaches_course/group-running.webp',
    '/coaches_course/_R3A6151.webp',
    '/coaches_course/pressure-privilege.webp',
    '/coaches_course/_R3A4699.webp',
    '/coaches_course/beach-group.webp',
    '/coaches_course/_R3A6284.webp',
    '/coaches_course/Updated.webp',
  ]

  const CARD_W = 288   // w-72
  const GAP = 20       // gap-5
  const COUNT = images.length
  const SET_WIDTH = COUNT * (CARD_W + GAP) // exact px for one set

  const trackRef = useRef(null)
  const hovered = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let offset = 0
    const speed = 0.5
    let raf

    function step() {
      offset -= speed * (hovered.current ? 0.08 : 1)
      if (Math.abs(offset) >= SET_WIDTH) offset += SET_WIDTH
      track.style.transform = `translateX(${offset}px)`
      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  // 8 copies - enough to always fill even ultrawide screens
  const repeated = Array.from({ length: 8 }, () => images).flat()

  return (
    <div
      dir="ltr"
      className="py-6 bg-navy overflow-hidden"
      onMouseEnter={() => { hovered.current = true }}
      onMouseLeave={() => { hovered.current = false }}
    >
      <div ref={trackRef} className="flex will-change-transform" style={{ gap: `${GAP}px`, perspective: '600px' }}>
        {repeated.map((src, i) => (
          <GalleryCard key={i} src={src} width={CARD_W} />
        ))}
      </div>
    </div>
  )
}

/* ─── Scroll Ignition Line ─── */
function ScrollIgnitionLine() {
  const { scrollYProgress } = useScroll()
  const height = useTransform(scrollYProgress, [0.08, 0.88], ['0%', '100%'])
  const opacity = useTransform(scrollYProgress, [0.06, 0.1, 0.85, 0.9], [0, 1, 1, 0])

  return (
    <motion.div className="fixed left-5 top-0 bottom-0 z-40 w-[3px] hidden md:block pointer-events-none" style={{ opacity }}>
      <motion.div
        className="w-full bg-gradient-to-b from-transparent via-orange to-orange rounded-full origin-top relative"
        style={{ height }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-orange shadow-[0_0_12px_4px_rgba(232,134,42,0.6)]" />
      </motion.div>
    </motion.div>
  )
}

/* ─── App ─── */
function App() {
  return (
    <div className="font-heebo w-full overflow-x-clip">
      <ScrollIgnitionLine />
      <Navbar />
      <Hero />
      <AboutCourse />
      <WhyJoin />
      <NotForEveryone />
      <GalleryStrip />
      <Curriculum />
      <WhoIsItFor />
      <FAQ />
      <RegistrationForm />
      <Footer />

    </div>
  )
}

export default App
