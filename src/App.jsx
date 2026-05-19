import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhoWeAre from './components/WhoWeAre'
import ManInArena from './components/ManInArena'
import Programs from './components/Programs'
import FiveContent from './components/FiveContent'
import Footer from './components/Footer'
import SectionDivider from './components/SectionDivider'
import ContactModal from './components/ContactModal'

export default function App() {
  const [navReady, setNavReady] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <div className="antialiased">
      <div style={{ opacity: navReady ? 1 : 0, transition: 'opacity 0.7s ease' }}>
        <Navbar onContactOpen={() => setContactOpen(true)} />
      </div>
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <main>
        <Hero onComplete={() => setNavReady(true)} />
        <SectionDivider fromColor="#111111" toColor="#fafaf8" />
        <WhoWeAre />
        <SectionDivider fromColor="#fafaf8" toColor="#fafaf8" />
        <ManInArena />
        <SectionDivider fromColor="#fafaf8" toColor="#fafaf8" reverse />
        <Programs />
        <SectionDivider fromColor="#fafaf8" toColor="#ffffff" />
        <FiveContent />
      </main>
      <Footer />
    </div>
  )
}
