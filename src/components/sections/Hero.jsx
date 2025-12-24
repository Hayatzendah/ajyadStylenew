import { useState, useEffect, useRef } from 'react'
import { siteData } from '../../data/site'
import { useLanguage } from '../../contexts/LanguageContext'
import Button from '../common/Button'

export default function Hero() {
  const { t } = useLanguage()
  const banners = [
    '/images/home/banner.jpg',
    '/images/home/banner1.jpg',
    '/images/home/banner2.jpg'
  ]

  const [currentBanner, setCurrentBanner] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showWhiteOverlay, setShowWhiteOverlay] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        // نبدأ الانتقال ونظهر الـ overlay الأبيض
        setIsTransitioning(true)
        setShowWhiteOverlay(true)
        
        // بعد ثانية ونصف، نخفي الـ overlay الأبيض
        setTimeout(() => {
          setShowWhiteOverlay(false)
        }, 1500) // ثانية ونصف
        
        // بعد ثانيتين (مدة الانتقال)، نغير الصورة وننهي الانتقال
        setTimeout(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
          setIsTransitioning(false)
        }, 2000) // مدة الانتقال ثانيتين
    }, 5000) // تغيير الصورة كل 5 ثوان
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [banners.length, isPaused])

  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background Images Slider */}
      <div 
        className="absolute inset-0"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {banners.map((banner, index) => {
          const isCurrent = index === currentBanner
          const nextIndex = (currentBanner + 1) % banners.length
          const isNext = index === nextIndex
          
          // تحديد موضع الصورة
          let translateX = '0%'
          
          if (isCurrent) {
            // الصورة الحالية: تتحرك من 0% إلى -100% أثناء الانتقال
            translateX = isTransitioning ? '-100%' : '0%'
          } else if (isNext) {
            // الصورة التالية: تبدأ من 100% (خارج الشاشة على اليمين) وتتحرك إلى 0% أثناء الانتقال
            translateX = isTransitioning ? '0%' : '100%'
          } else {
            // الصور الأخرى: خارج الشاشة على اليسار
            translateX = '-100%'
          }

          return (
          <div
            key={index}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${banner})`,
                transform: `translateX(${translateX})`,
                transition: isTransitioning && (isCurrent || isNext) ? 'transform 2s cubic-bezier(0.2, 0, 0.8, 1)' : 'none',
                zIndex: isCurrent ? 2 : isNext ? 3 : 1,
            }}
          />
          )
        })}
        {/* Dark Overlay */}
        <div className="absolute inset-0 gradient-overlay z-10"></div>
      </div>

      {/* Content - Aligned to right */}
      <div 
        className="relative z-10 container-custom"
        style={{
          paddingLeft: '0px',
          paddingRight: '0px',
          paddingTop: '0px',
          paddingBottom: '0px',
          marginLeft: '0px',
          marginRight: '0px',
          textAlign: 'left',
          verticalAlign: 'top'
        }}
      >
        <div className="max-w-4xl ml-auto mr-8 md:mr-16 mt-8 md:mt-12 text-right relative">
          {/* White Overlay Slider - يظهر أثناء الانتقال */}
          <div 
            className="absolute inset-0 bg-white pointer-events-none"
            style={{
              transform: showWhiteOverlay ? 'translateX(0%)' : 'translateX(100%)',
              transition: showWhiteOverlay 
                ? 'transform 1.5s cubic-bezier(0.2, 0, 0.8, 1)' 
                : 'transform 0.3s ease-in-out',
              zIndex: 30,
            }}
          />
          
          {/* Content Wrapper - يظهر فوق الـ overlay */}
          <div className="relative z-40">
          {/* Badge - Top */}
          <div className="inline-block bg-primary rounded-lg px-6 py-2 mb-6">
            <span className="text-white font-bold text-sm md:text-base">
              {t('hero.experience')}
            </span>
          </div>

          {/* H1 - Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-cairo font-bold text-white mb-6">
            {t('hero.companyName')}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl ml-auto leading-relaxed">
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/contact" size="lg" className="bg-primary hover:bg-primary/90 text-white border-none">
              {t('hero.contactUs')}
            </Button>
            <Button to="/products" variant="outline" size="lg" className="bg-transparent border-2 border-primary text-white hover:bg-primary/20">
              {t('hero.browseProducts')}
            </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentBanner
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`انتقل إلى الصورة ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
