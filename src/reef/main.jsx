import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import './reef.css'
import ReefApp from './ReefApp.jsx'

// Cookieless page-view counter, loaded lazily so a content blocker can only
// switch it off, never the page. No lead form and no ad pixels here, so the
// page needs neither the consent banner nor UTM capture.
import('../lib/visits.js').then((m) => m.initAnalytics()).catch(() => {})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReefApp />
  </StrictMode>,
)
