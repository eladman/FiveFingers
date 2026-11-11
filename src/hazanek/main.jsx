import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import HazanekApp from './HazanekApp.jsx'
import { captureAttribution } from '../lib/attribution.js'
import { initConsent } from '../lib/consent.js'

// Keep the campaign's UTM tags before anything can drop the query string.
captureAttribution()
// Google Tag Manager, only for visitors who agree on the consent banner — this
// page is a campaign target, so its Lead conversion has to be measurable.
initConsent()
// Cookieless page-view counter, loaded lazily so a content blocker can only
// switch it off, never the page.
import('../lib/visits.js').then((m) => m.initAnalytics()).catch(() => {})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HazanekApp />
  </StrictMode>,
)
