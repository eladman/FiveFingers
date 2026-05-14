import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhoWeAre from './components/WhoWeAre'
import Programs from './components/Programs'
import Footer from './components/Footer'

export default function App() {
  const [navReady, setNavReady] = useState(false)

  return (
    <div className="antialiased">
      <div style={{ opacity: navReady ? 1 : 0, transition: 'opacity 0.7s ease' }}>
        <Navbar />
      </div>
      <main>
        <Hero onComplete={() => setNavReady(true)} />
        <WhoWeAre />
        <Programs />
      </main>
      <Footer />
    </div>
  )
}
