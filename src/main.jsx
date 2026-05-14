import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HeroShowcase from './HeroShowcase.jsx'

const isShowcase = window.location.hash === '#showcase'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isShowcase ? <HeroShowcase /> : <App />}
  </StrictMode>,
)
