import { useEffect } from 'react'
import TopBar from './sections/TopBar'
import Hero from './sections/Hero'
import Story from './sections/Story'
import Why from './sections/Why'
import What from './sections/What'
import Values from './sections/Values'
import Place from './sections/Place'
import Day from './sections/Day'
import Offer from './sections/Offer'
import Valley from './sections/Valley'
import Partners from './sections/Partners'
import Vision from './sections/Vision'
import Join from './sections/Join'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import { scrollToId } from './shared'

/**
 * /reef — standalone landing page for דרך ריף (no site navbar/footer).
 * Same design system as the main site, turned toward daylight: white and warm
 * off-white surfaces, navy type, Jezreel Valley tones, orange as accent only.
 */
export default function ReefApp() {
  // One delegated handler for every in-page link (#story, #contact …).
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest?.('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href').slice(1)
      if (id && scrollToId(id)) e.preventDefault()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">דילוג לתוכן</a>
      <TopBar />
      <main id="main">
        <Hero />
        <Story />
        <Why />
        <What />
        <Values />
        <Place />
        <Day />
        <Offer />
        <Valley />
        <Partners />
        <Vision />
        <Join />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
