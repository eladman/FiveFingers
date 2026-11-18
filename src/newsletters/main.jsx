import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import '../dashboard/dashboard.css'
import '../lectures/lectures.css'
import './newsletters.css'
import NewslettersApp from './NewslettersApp.jsx'
import { markInternalVisitor } from '../lib/visits.js'

// Staff browser — exclude its own visits to the public site from traffic stats.
markInternalVisitor()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NewslettersApp />
  </StrictMode>,
)
