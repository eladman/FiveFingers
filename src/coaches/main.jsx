import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './coaches.css'
import CoachesCourseApp from './CoachesCourseApp.jsx'
import { captureAttribution } from '../lib/attribution.js'

// Same UTM capture + cookieless page-view counter as the main site. The counter
// is loaded lazily: content blockers block files named "analytics", and a
// static import would take the whole page down with it.
captureAttribution()
import('../lib/analytics.js').then((m) => m.initAnalytics()).catch(() => {})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CoachesCourseApp />
  </StrictMode>,
)
