import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HeroShowcase from './HeroShowcase.jsx'
import DesignShowcase from './DesignShowcase.jsx'
import CollabsHeroShowcase from './CollabsHeroShowcase.jsx'

const hash = window.location.hash

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {hash === '#variants' ? <DesignShowcase /> :
     hash === '#showcase' ? <HeroShowcase /> :
     hash === '#collabs-hero' ? <CollabsHeroShowcase /> :
     <App />}
  </StrictMode>,
)
