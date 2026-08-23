import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import './dashboard.css'
import Dashboard from './Dashboard.jsx'
import { markInternalVisitor } from '../lib/analytics.js'

// Anyone who opens the staff dashboard is internal — flag this browser so its
// own visits to the public site are excluded from the traffic stats.
markInternalVisitor()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>,
)
