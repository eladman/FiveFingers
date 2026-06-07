import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft } from 'lucide-react'
import { hero } from '../../data/liabahData'

const IMAGES = [
  '/Hero-Pics/214A0011.jpg',
  '/Hero-Pics/214A0027.jpg',
  '/Hero-Pics/214A0034.jpg',
  '/Hero-Pics/214A0088.jpg',
  '/Hero-Pics/214A0114.jpg',
  '/Hero-Pics/214A0511.jpg',
  '/Hero-Pics/_14A9355.jpg',
]

export default function LiabahHero({ onRegister }) {
  const ref = useRef(null)
  const imgRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.fromTo('.lh-eyebrow', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.1)
        .fromTo('.lh-title', { y: 40, opacity: 0, filter: 'blur(10px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }, '-=0.2')
        .fromTo('.lh-accent', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.35, ease: 'power2.inOut' }, '-=0.2')
        .fromTo('.lh-sub', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.05')
        .fromTo('.lh-cta', { y: 14, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out' }, '-=0.05')
    }, ref)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    let current = 0
    const imgs = imgRefs.current
    if (!imgs.length) return
    const id = setInterval(() => {
      const prev = current
      current = (current + 1) % imgs.length
      imgs[prev].style.opacity = '0'
      imgs[current].style.opacity = '1'
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="liabah-top"
      ref={ref}
      dir="rtl"
      className="relative w-full overflow-hidden text-white"
    >
      {/* Background slideshow (same as home hero) */}
      <div className="absolute inset-0">
        {IMAGES.map((src, i) => (
          <img
            key={src}
            ref={el => imgRefs.current[i] = el}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === 0 ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
              willChange: 'opacity',
              objectPosition: 'center 30%',
            }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <div className="absolute inset-0 bg-[#ff8714]/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-1/5 bg-gradient-to-t from-black/65 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#ff8714]/8 to-transparent" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 pt-28 md:pt-36 pb-12 md:pb-16">
        {/* Headline block */}
        <div className="text-center">
          <p className="lh-eyebrow font-heebo text-white/55 tracking-[0.3em] text-sm md:text-base mb-4">
            {hero.eyebrow}
          </p>
          <h1
            className="lh-title leading-none tracking-tight"
            style={{ fontFamily: "'RagMarom', sans-serif", fontSize: 'clamp(3.5rem, 11vw, 11rem)' }}
          >
            {hero.title}
          </h1>
          <div
            className="lh-accent mx-auto mt-6 rounded-full bg-[#ff8714]"
            style={{ height: '3px', width: 'clamp(7rem, 18vw, 18rem)', transformOrigin: 'center' }}
          />
          <p
            className="lh-sub font-heebo text-white/80 mt-7 mx-auto max-w-2xl leading-snug"
            style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.7rem)' }}
          >
            {hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-9">
            <button
              onClick={onRegister}
              className="lh-cta group relative overflow-hidden flex items-center gap-2.5 bg-[#ff8714] text-white font-bold px-8 py-3.5 rounded-full text-base"
              style={{ transition: 'transform 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
              <span className="relative">{hero.primaryCta}</span>
              <ChevronLeft size={18} className="relative shrink-0" />
            </button>
            <a
              href="#liabah-essence"
              className="lh-cta flex items-center text-white/70 hover:text-white px-7 py-3.5 rounded-full text-base border border-white/20 hover:border-white/50 transition-all duration-300"
            >
              גלו עוד
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
