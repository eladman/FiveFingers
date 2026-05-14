import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const NEUTRAL_TEXT = 'רוב תנועות הנוער מתמקדות ב: פעילויות ובידור.'
const BOLD_PREFIX = 'אנחנו מתמקדים ב:'
const BOLD_HIGHLIGHT = 'מצוינות ערכית'
const BOLD_SUFFIX = 'שמשנה מציאות.'

const TAGS = ['מסוגלות', 'שייכות', 'השפעה']

export default function Philosophy() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on the texture
      gsap.to('.phil-bg-img', {
        y: '18%',
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Word-by-word fade-up reveal
      gsap.fromTo(
        '.phil-word',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.045,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 62%' },
        }
      )

      // Tags fade in
      gsap.fromTo(
        '.phil-tag',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.phil-tags', start: 'top 80%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative py-36 md:py-52 overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a2f6b 0%, #0d1b4b 40%, #081028 100%)' }}>
      {/* Orange radial glow — top */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,135,20,0.06) 0%, transparent 60%)' }} />
      {/* ── Texture + parallax ── */}
      <div className="phil-bg-img absolute inset-0 -top-24 -bottom-24">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-[#ff8714]/60" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 md:px-16 text-center">
        {/* Neutral statement */}
        <p className="text-white/35 text-lg md:text-xl leading-relaxed mb-10 overflow-hidden">
          {NEUTRAL_TEXT.split(' ').map((word, i) => (
            <span key={i} className="phil-word inline-block ms-2">
              {word}
            </span>
          ))}
        </p>

        {/* Bold statement */}
        <div className="text-3xl md:text-5xl lg:text-6xl font-frank italic leading-tight text-white overflow-hidden">
          {BOLD_PREFIX.split(' ').map((word, i) => (
            <span key={i} className="phil-word inline-block ms-3">
              {word}
            </span>
          ))}
          {'  '}
          <span className="phil-word inline-block ms-3 text-[#ff8714]">
            {BOLD_HIGHLIGHT}
          </span>
          {'  '}
          {BOLD_SUFFIX.split(' ').map((word, i) => (
            <span key={i} className="phil-word inline-block ms-3">
              {word}
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="phil-tags flex justify-center flex-wrap gap-3 mt-16">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="phil-tag font-mono text-[#ff8714]/55 text-xs tracking-[0.2em] uppercase border border-[#ff8714]/20 px-5 py-2.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-transparent to-[#ff8714]/60" />
    </section>
  )
}
