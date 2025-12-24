import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { siteData } from '../../data/site'
import { useLanguage } from '../../contexts/LanguageContext'
import Button from '../common/Button'
import MobileDrawer from './MobileDrawer'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, switchLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-primary/95 backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-primary'
        }`}
      >
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-24 h-24 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/home/ajyallogo.png" 
                  alt={t('hero.companyName')}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden md:block">
                <div className="text-white font-cairo font-bold text-xl group-hover:text-white/90 transition-colors">
                  {t('hero.companyName')}
                </div>
                <div className="text-white/80 text-xs">
                  {t('hero.experience')}
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `font-cairo font-semibold transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-white/80 hover:text-white'
                  }`
                }
              >
                {t('nav.home')}
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `font-cairo font-semibold transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-white/80 hover:text-white'
                  }`
                }
              >
                {t('nav.about')}
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `font-cairo font-semibold transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-white/80 hover:text-white'
                  }`
                }
              >
                {t('nav.products')}
              </NavLink>
              <NavLink
                to="/clients"
                className={({ isActive }) =>
                  `font-cairo font-semibold transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-white/80 hover:text-white'
                  }`
                }
              >
                {t('nav.clients')}
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `font-cairo font-semibold transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-white/80 hover:text-white'
                  }`
                }
              >
                {t('nav.contact')}
              </NavLink>
            </nav>

            {/* Language Switcher & CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1" role="group" aria-label="Language switcher">
                <button
                  onClick={() => switchLanguage('ar')}
                  aria-label="Switch to Arabic"
                  aria-pressed={language === 'ar'}
                  type="button"
                  className={`px-3 py-1 rounded-md text-sm font-cairo transition-all ${
                    language === 'ar'
                      ? 'bg-white text-primary'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  عربي
                </button>
                <button
                  onClick={() => switchLanguage('en')}
                  aria-label="Switch to English"
                  aria-pressed={language === 'en'}
                  type="button"
                  className={`px-3 py-1 rounded-md text-sm font-cairo transition-all ${
                    language === 'en'
                      ? 'bg-white text-primary'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => switchLanguage('zh')}
                  aria-label="Switch to Chinese"
                  aria-pressed={language === 'zh'}
                  type="button"
                  className={`px-3 py-1 rounded-md text-sm font-cairo transition-all ${
                    language === 'zh'
                      ? 'bg-white text-primary'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  中文
                </button>
              </div>
              <Button to="/contact" size="md">
                {t('cta.quote')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-white p-2 hover:text-white/80 transition-colors"
              aria-label="القائمة"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}
