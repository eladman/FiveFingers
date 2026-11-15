import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import ConsentBanner from '../components/ConsentBanner'
import Hero from './sections/Hero'
import Hook from './sections/Hook'
import About from './sections/About'
import Includes from './sections/Includes'
import Why from './sections/Why'
import Numbers from './sections/Numbers'
import Press from './sections/Press'
import Voices from './sections/Voices'
import Faq from './sections/Faq'
import Register from './sections/Register'
import Footer from './sections/Footer'
import { hero } from './content'
import { goToRegister } from './shared'

/** /hazanek — standalone landing page for מכינת הזנק (no site navbar/footer). */
export default function HazanekApp() {
  return (
    <>
      <a href="#main" className="skip-link">דילוג לתוכן</a>
      <main id="main">
        <Hero />
        <Hook />
        <Voices />
        <About />
        <Includes />
        <Why />
        <Numbers />
        <Press />
        <Faq />
        <Register />
      </main>
      <Footer />
      <StickyCta />
      <ConsentBanner />
    </>
  )
}

/**
 * Floating register pill on every screen size (team feedback): appears once the
 * hero has scrolled away, and steps aside while the form itself is on screen.
 * Centered on phones, bottom-left corner from md up.
 */
function StickyCta() {
  const [heroGone, setHeroGone] = useState(false)
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    const heroEl = document.getElementById('top')
    const formEl = document.getElementById('register')
    if (!heroEl || !formEl || !('IntersectionObserver' in window)) return
    const heroObs = new IntersectionObserver(([e]) => setHeroGone(!e.isIntersecting), { threshold: 0.15 })
    const formObs = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.1 })
    heroObs.observe(heroEl)
    formObs.observe(formEl)
    return () => { heroObs.disconnect(); formObs.disconnect() }
  }, [])

  const show = heroGone && !formVisible

  return (
    <div
      className={`fixed inset-x-0 z-50 flex justify-center md:justify-end px-4 md:px-8 pointer-events-none transition-all duration-300 ease-brand ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ bottom: 'max(16px, calc(env(safe-area-inset-bottom, 0px) + 10px))' }}
      aria-hidden={!show}
    >
      <a
        href="#register"
        onClick={goToRegister}
        tabIndex={show ? 0 : -1}
        className={`btn-cta inline-flex items-center gap-2 rounded-full px-8 py-3.5 md:px-9 md:py-4 md:text-lg font-bold text-white shadow-[0_14px_40px_-10px_rgba(255,135,20,0.75)] ${show ? 'pointer-events-auto' : ''}`}
      >
        {hero.cta}
        <ArrowLeft size={18} aria-hidden="true" />
      </a>
    </div>
  )
}
