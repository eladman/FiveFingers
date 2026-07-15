import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HeroShowcase from './HeroShowcase.jsx'
import DesignShowcase from './DesignShowcase.jsx'
import CollabsHeroShowcase from './CollabsHeroShowcase.jsx'
import { initSmoothScroll } from './lib/smoothScroll.js'
import { initAnalytics } from './lib/analytics.js'

// Momentum smooth-scroll for the whole site (no-op under reduced-motion).
initSmoothScroll()

// Cookieless page-view counter (no-op until Supabase env vars are set).
initAnalytics()

const hash = window.location.hash

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {hash === '#variants' ? <DesignShowcase /> :
     hash === '#showcase' ? <HeroShowcase /> :
     hash === '#collabs-hero' ? <CollabsHeroShowcase /> :
     <App />}
  </StrictMode>,
)
