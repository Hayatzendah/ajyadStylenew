import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { siteData } from '../../data/site'
import { useLanguage } from '../../contexts/LanguageContext'
import Button from '../common/Button'

export default function MobileDrawer({ isOpen, onClose }) {
  const { t, language, switchLanguage } = useLanguage()
  const drawerRef = useRef(null)
  const previousActiveElement = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Store the previously focused element
      previousActiveElement.current = document.activeElement
      // Focus the drawer
      if (drawerRef.current) {
        const firstFocusable = drawerRef.current.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (firstFocusable) {
          firstFocusable.focus()
        }
      }
    } else {
      document.body.style.overflow = 'unset'
      // Restore focus to the previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle keyboard navigation (Escape key)
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer - من اليمين للعربية */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('mobileDrawer.menuLabel')}
        className={`fixed top-0 right-0 h-full w-80 bg-darkSurface shadow-2xl z-50 transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-mutedGray/20">
            <div className="text-white font-cairo font-bold text-xl">
              {t('hero.companyName')}
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-primary transition-colors p-2"
              aria-label={t('mobileDrawer.close')}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 overflow-y-auto">
            <div className="flex flex-col gap-4">
              {siteData.navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `font-cairo font-semibold text-lg py-3 px-4 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-lightGray hover:bg-primary/10 hover:text-primary'
                    }`
                  }
                >
                  {t(`nav.${item.path === '/' ? 'home' : item.path.replace('/', '')}`)}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-mutedGray/20 space-y-4">
            {/* Language Switcher */}
            <div className="space-y-2" role="group" aria-label="Language switcher">
              {[
                { code: 'ar', name: 'عربي', flag: 'https://flagcdn.com/w40/sa.png' },
                { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
                { code: 'zh', name: '中文', flag: 'https://flagcdn.com/w40/cn.png' }
              ]
                .filter(lang => lang.code !== language)
                .map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      switchLanguage(lang.code)
                      onClose()
                    }}
                    aria-label={`Switch to ${lang.name}`}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all text-right font-cairo"
                  >
                    <img 
                      src={lang.flag} 
                      alt={`${lang.name} flag`}
                      className="w-8 h-6 object-cover rounded-sm"
                      loading="lazy"
                    />
                    <span className="flex-1 text-sm font-semibold">{lang.name}</span>
                  </button>
                ))}
            </div>

            <Button to="/contact" className="w-full" onClick={onClose}>
              {t('mobileDrawer.requestQuote')}
            </Button>

            <div className="flex flex-col gap-3 text-sm text-lightGray">
              <a
                href={`tel:${siteData.contact.phone}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <span>📞</span>
                <span>{siteData.contact.phone}</span>
              </a>
              <a
                href={siteData.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <span>💬</span>
                <span>{t('mobileDrawer.whatsapp')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
