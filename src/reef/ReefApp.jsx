import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
import WayRail from './sections/WayRail'
import WayBridge from './sections/WayBridge'
import useChapter from './useChapter'

/**
 * /reef — standalone landing page for דרך ריף (no site navbar/footer).
 * A journey along "the way" across the Jezreel Valley: a three.js valley you
 * fly over in the hero, then the valley's own materials (field plots, furrows,
 * wheat, green, soil) carrying the sections. Navy is ink; orange is only the
 * way, the actions and a statement's turning phrase. The chapters are stops on the way (rail + phone menu).
 */
/** The bar and the rail are the only things that follow the reading position,
 *  so they own that state; the page itself never re-renders on scroll. */
function Chrome() {
  const index = useChapter()
  return (
    <>
      <TopBar index={index} />
      <WayRail index={index} />
    </>
  )
}

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

  // Pins are measured before fonts and lazy images settle; measure again once they have.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <div className="rf-page">
      <a href="#main" className="skip-link">דילוג לתוכן</a>
      <Chrome />
      <main id="main">
        <Hero />
        <Story />
        <WayBridge variant="continue" />
        <Why />
        <What />
        <Values />
        <Place />
        <Day />
        <WayBridge variant="onward" />
        <Offer />
        <Valley />
        <Partners />
        <Vision />
        <Join />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
