import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HeroShowcase from './HeroShowcase.jsx'
import DesignShowcase from './DesignShowcase.jsx'
import CollabsHeroShowcase from './CollabsHeroShowcase.jsx'
import { initSmoothScroll } from './lib/smoothScroll.js'
import { initAnalytics } from './lib/analytics.js'
import { initConsent, trackEvent } from './lib/consent.js'
import { captureAttribution } from './lib/attribution.js'
import { onRouteChange } from './lib/router.js'

// Momentum smooth-scroll for the whole site (no-op under reduced-motion).
initSmoothScroll()

// Cookieless page-view counter (no-op until Supabase env vars are set).
initAnalytics()

// Keep the ad campaign's UTM tags before any navigation drops the query string.
captureAttribution()

// Google Tag Manager — only for visitors who agreed on the consent banner.
// GTM sees the first page load by itself; later pages are SPA route changes it
// can't see, so announce each one (a trigger for page-view tags inside GTM).
initConsent()
onRouteChange(() => trackEvent('virtual_page_view', { page_path: window.location.pathname }))

const hash = window.location.hash

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {hash === '#variants' ? <DesignShowcase /> :
     hash === '#showcase' ? <HeroShowcase /> :
     hash === '#collabs-hero' ? <CollabsHeroShowcase /> :
     <App />}
  </StrictMode>,
)
