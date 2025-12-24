import { useState, useEffect, useRef } from 'react'
import { siteData } from '../../data/site'
import { useLanguage } from '../../contexts/LanguageContext'
import SectionTitle from '../common/SectionTitle'
import Button from '../common/Button'

export default function AboutPreview() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container-custom">
        <SectionTitle title={t('about.title')} subtitle={t('about.subtitle')} />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image - Right Side */}
          <div className={`relative order-1 md:order-1 ${isVisible ? 'about-preview-image' : 'about-preview-image-initial'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
              <img
                src="/images/home/sc2.jpg"
                alt={t('hero.companyName')}
                className="w-full h-96 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            {/* Decorative Element */}
            <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-2xl -z-10 ${isVisible ? 'about-preview-decorative' : 'about-preview-decorative-initial'}`}></div>
          </div>

          {/* Text Content - Left Side */}
          <div className={`order-2 md:order-2 ${isVisible ? 'about-preview-text' : 'about-preview-text-initial'}`}>
            <p className="text-black text-lg leading-relaxed mb-6">
              {t('about.fullDescription')}
            </p>
            <p className="text-black leading-relaxed mb-8">
              {t('about.additionalText')}
            </p>
            <Button to="/about">
              {t('about.readMore')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
