import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../data/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Get from localStorage or default to Arabic
    return localStorage.getItem('language') || 'ar'
  })

  useEffect(() => {
    // Save to localStorage when language changes
    localStorage.setItem('language', language)
    // Update document direction
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }, [language])

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    for (const k of keys) {
      value = value?.[k]
    }
    // If value is undefined or null, return the key
    // Only log in development mode
    if (value === undefined || value === null) {
      if (import.meta.env.DEV) {
        console.warn(`Translation key not found: ${key} for language: ${language}`)
        console.warn('Available keys:', Object.keys(translations[language] || {}))
      }
      return key
    }
    return value
  }

  const switchLanguage = (lang) => {
    setLanguage(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

