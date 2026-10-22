import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import '../dashboard/dashboard.css'
import '../feedback/feedback.css'
import './lectures.css'
import LecturesApp from './LecturesApp.jsx'
import { markInternalVisitor } from '../lib/analytics.js'

// Staff browser — exclude its own visits to the public site from traffic stats.
markInternalVisitor()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LecturesApp />
  </StrictMode>,
)
