import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Preloader, { shouldShowPreloader } from './redesign/Preloader'
import Hero from './components/Hero'
import IntroV2 from './redesign/IntroV2'
import Manifesto from './redesign/Manifesto'
import FiveDNA from './redesign/FiveDNA'
import ProgramsV2 from './redesign/ProgramsV2'
import PulseBand from './redesign/PulseBand'
import FinaleCTA from './redesign/FinaleCTA'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'
import AccessibilityWidget from './components/Accessibility/AccessibilityWidget'
import LiabahPage from './pages/LiabahPage'
import AcademyPage from './pages/AcademyPage'
import CollaborationsPage from './pages/CollaborationsPage'
import AmirPage from './pages/AmirPage'
import AlumniPage from './pages/AlumniPage'
import TeamPage from './pages/TeamPage'
import HeroConcepts from './HeroConcepts'
import { WHATSAPP_HREF } from './data/contact'

// Maps the URL hash to a top-level view. Prefix match so in-page anchors
// (e.g. #academy-essence from the hero "גלו עוד") keep the dedicated page
// mounted instead of bouncing back home. New dedicated pages go here.
function resolveView(hash) {
  if (hash.startsWith('#hero-concepts')) return 'concepts'
  if (hash.startsWith('#liabah')) return 'liabah'
  if (hash.startsWith('#academy')) return 'academy'
  if (hash.startsWith('#collabs')) return 'collabs'
  if (hash.startsWith('#amir')) return 'amir'
  if (hash.startsWith('#alumni')) return 'alumni'
  if (hash.startsWith('#team')) return 'team'
  return 'home'
}

// The interest a generic "יצירת קשר" (navbar / footer) should preselect when
// opened from a dedicated page. Values match ContactModal's chips (or its
// aliases). Homepage / concepts have no obvious lane, so they stay empty and
// the modal opens with the full picker.
const VIEW_TO_PRODUCT = {
  liabah: 'קבוצות הנוער',
  academy: 'מכינה',
  collabs: 'שיתוף פעולה',
  amir: 'קשר עם עמיר',
  alumni: 'יואב',
  team: 'מאמן/ת',
}

export default function App() {
  const [navReady, setNavReady] = useState(false)
  // The intro veil (Preloader) shows once per session on the homepage; the
  // hero waits for it before running its entrance choreography.
  const [introDone, setIntroDone] = useState(() => !shouldShowPreloader())
  const [contactOpen, setContactOpen] = useState(false)
  const [contactProduct, setContactProduct] = useState('')
  const [view, setView] = useState(() => resolveView(window.location.hash))

  // #contact is a special case: not a page view, just a request to pop the
  // shared ContactModal open (e.g. the "יצירת קשר" link from the standalone
  // /memorial page, which can't reach React state directly). Strip it from
  // the URL once handled so it doesn't linger or reopen on back/forward.
  const openContactFromHash = () => {
    if (window.location.hash.startsWith('#contact')) {
      setContactProduct('')
      setContactOpen(true)
      history.replaceState(null, '', window.location.pathname + window.location.search)
      return true
    }
    return false
  }

  // Hash-based routing: #liabah / #academy → dedicated page, anything else → homepage.
  useEffect(() => {
    openContactFromHash()
    const onHashChange = () => {
      if (openContactFromHash()) return
      const next = resolveView(window.location.hash)
      setView((prev) => {
        if (prev !== next) window.scrollTo(0, 0)
        if (next === 'home' && prev !== 'home') setNavReady(true)
        return next
      })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Dedicated pages render their own Navbar immediately (no Hero intro to gate it).
  const isDedicatedPage = view === 'liabah' || view === 'academy' || view === 'collabs' || view === 'amir' || view === 'alumni' || view === 'team'
  const navVisible = isDedicatedPage || navReady

  const openContact = (product = '') => {
    setContactProduct(product)
    setContactOpen(true)
  }

  // Standalone design preview — its own switcher chrome, no site navbar/footer.
  if (view === 'concepts') {
    return <HeroConcepts />
  }

  return (
    <div className="antialiased">
      <div style={{ opacity: navVisible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
        {/* no forceLifted pages left — every v2 hero is a dark full-bleed photo */}
        <Navbar onContactOpen={() => openContact(VIEW_TO_PRODUCT[view] || '')} />
      </div>
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        defaultProduct={contactProduct}
      />

      {view === 'liabah' ? (
        <LiabahPage onContactOpen={openContact} />
      ) : view === 'academy' ? (
        <AcademyPage onContactOpen={openContact} />
      ) : view === 'collabs' ? (
        <CollaborationsPage onContactOpen={openContact} />
      ) : view === 'amir' ? (
        <AmirPage onContactOpen={openContact} />
      ) : view === 'alumni' ? (
        <AlumniPage onContactOpen={openContact} />
      ) : view === 'team' ? (
        <TeamPage onContactOpen={openContact} />
      ) : (
        <main>
          {!introDone && <Preloader onDone={() => setIntroDone(true)} />}
          {introDone && <Hero onComplete={() => setNavReady(true)} onContactOpen={openContact} />}
          <IntroV2 />
          <Manifesto />
          <FiveDNA />
          <ProgramsV2 onContactOpen={openContact} />
          <PulseBand />
          <FinaleCTA onContactOpen={openContact} />
        </main>
      )}
      <Footer onContactOpen={() => openContact(VIEW_TO_PRODUCT[view] || '')} />

      {/* Floating WhatsApp button */}
      <a
        href={WHATSAPP_HREF}
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
          boxShadow: 'var(--shadow-md)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.1)'
          e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = 'var(--shadow-md)'
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
