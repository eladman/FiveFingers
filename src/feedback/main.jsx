import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import './feedback.css'
import FeedbackApp from './FeedbackApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FeedbackApp />
  </StrictMode>,
)
