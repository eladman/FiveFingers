import { useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'

const STORAGE_KEY = 'a11y-settings'

const DEFAULT_SETTINGS = {
  fontSize: 0,
  lineHeight: false,
  letterSpacing: false,
  readableFont: false,
  highContrast: false,
  invertColors: false,
  grayscale: false,
  lightBackground: false,
  highlightLinks: false,
  focusHighlight: false,
  stopAnimations: false,
  highlightHeadings: false,
  bigCursor: false,
}

const FONT_SIZE_VALUES = ['', '125%', '150%', '175%']

const CLASS_MAP = {
  lineHeight: 'a11y-line-height',
  letterSpacing: 'a11y-letter-spacing',
  readableFont: 'a11y-readable-font',
  highContrast: 'a11y-high-contrast',
  invertColors: 'a11y-invert',
  grayscale: 'a11y-grayscale',
  lightBackground: 'a11y-light-bg',
  highlightLinks: 'a11y-highlight-links',
  focusHighlight: 'a11y-focus-highlight',
  stopAnimations: 'a11y-stop-animations',
  highlightHeadings: 'a11y-highlight-headings',
  bigCursor: 'a11y-big-cursor',
}

function applySettings(settings) {
  const html = document.documentElement
  const body = document.body

  // Font size
  html.style.fontSize = FONT_SIZE_VALUES[settings.fontSize] || ''

  // Toggle classes — some go on <html>, some on <body>
  const htmlClasses = ['highContrast', 'invertColors', 'grayscale', 'lightBackground', 'bigCursor', 'stopAnimations']
  const bodyClasses = ['lineHeight', 'letterSpacing', 'readableFont', 'highlightLinks', 'focusHighlight', 'highlightHeadings']

  htmlClasses.forEach(key => {
    html.classList.toggle(CLASS_MAP[key], !!settings[key])
  })

  bodyClasses.forEach(key => {
    body.classList.toggle(CLASS_MAP[key], !!settings[key])
  })

  // GSAP animations
  if (settings.stopAnimations) {
    gsap.globalTimeline.pause()
  } else {
    gsap.globalTimeline.resume()
  }
}

function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return { ...DEFAULT_SETTINGS, ...parsed }
    }
  } catch {
    // ignore corrupt data
  }
  return { ...DEFAULT_SETTINGS }
}

export default function useAccessibility() {
  const [settings, setSettings] = useState(loadSettings)

  useEffect(() => {
    applySettings(settings)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }, [])

  const resetSettings = useCallback(() => {
    setSettings({ ...DEFAULT_SETTINGS })
    localStorage.removeItem(STORAGE_KEY)
    // Clean up inline font size
    document.documentElement.style.fontSize = ''
  }, [])

  return { settings, updateSetting, resetSettings }
}
