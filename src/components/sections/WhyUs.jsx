import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import SectionTitle from '../common/SectionTitle'
import Card from '../common/Card'

export default function WhyUs() {
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
        <SectionTitle title={t('whyUs.title')} subtitle={t('whyUs.subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t('whyUs.items').map((item, index) => (
            <Card key={index} className={isVisible ? `why-us-card why-us-card-${index + 1}` : 'why-us-card-initial'}>
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-primary font-cairo font-bold text-xl mb-3">
                {item.title}
              </h3>
              <p className="text-black leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
