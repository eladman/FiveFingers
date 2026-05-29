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
import AccessibilityWidget from './components/Accessibility/AccessibilityWidget'

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

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/972556855850"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="שלחו לנו הודעה בוואטסאפ"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.1)'
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.32)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)'
        }}
      >
        <svg viewBox="0 0 32 32" width="32" height="32" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.668 4.8 1.832 6.8L2 30l7.4-1.8A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.55 11.55 0 0 1-5.888-1.608l-.424-.252-4.392 1.064 1.104-4.272-.276-.44A11.572 11.572 0 0 1 4.4 16C4.4 9.59 9.59 4.4 16 4.4S27.6 9.59 27.6 16 22.41 27.6 16 27.6zm6.36-8.68c-.348-.176-2.06-1.016-2.38-1.132-.32-.116-.552-.176-.784.176-.232.348-.9 1.132-1.104 1.368-.2.232-.404.26-.752.088-.348-.176-1.472-.544-2.804-1.728-1.036-.924-1.736-2.064-1.94-2.412-.2-.348-.02-.536.152-.708.156-.156.348-.404.524-.608.172-.2.228-.348.344-.58.116-.232.06-.436-.028-.612-.088-.176-.784-1.892-1.076-2.592-.284-.68-.572-.588-.784-.6-.204-.008-.436-.012-.668-.012-.232 0-.608.088-.928.436-.316.348-1.212 1.184-1.212 2.888s1.24 3.352 1.412 3.584c.176.228 2.44 3.724 5.912 5.224.828.356 1.472.568 1.976.728.832.264 1.588.228 2.184.14.668-.1 2.06-.844 2.352-1.66.292-.816.292-1.516.204-1.66-.084-.148-.316-.232-.664-.408z"/>
        </svg>
      </a>

      <AccessibilityWidget />
    </div>
  )
}
