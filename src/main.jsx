import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HeroShowcase from './HeroShowcase.jsx'
import DesignShowcase from './DesignShowcase.jsx'

const hash = window.location.hash

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {hash === '#variants' ? <DesignShowcase /> :
     hash === '#showcase' ? <HeroShowcase /> :
     <App />}
  </StrictMode>,
)
