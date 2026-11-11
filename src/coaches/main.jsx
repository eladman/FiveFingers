import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './coaches.css'
import CoachesCourseApp from './CoachesCourseApp.jsx'
import { captureAttribution } from '../lib/attribution.js'

// Same UTM capture + cookieless page-view counter as the main site. The counter
// is loaded lazily, so a content blocker can only switch it off, never the page.
captureAttribution()
import('../lib/visits.js').then((m) => m.initAnalytics()).catch(() => {})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CoachesCourseApp />
  </StrictMode>,
)
