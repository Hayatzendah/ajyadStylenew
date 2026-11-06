import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import SectionTitle from '../common/SectionTitle'

export default function QualityWorkflow() {
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
    <section ref={sectionRef} className="py-24 md:py-32 section-light">
      <div className="container-custom">
        <SectionTitle title={t('quality.title')} subtitle={t('quality.subtitle')} />

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-4 mb-12">
            {t('quality.steps').map((step, index) => (
              <div key={index} className={`relative ${isVisible ? `quality-step quality-step-${index + 1}` : 'quality-step-initial'}`}>
                {/* Step */}
                <div className="text-center">
                  {/* Number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl rotate-6 hover:rotate-0 gradient-primary text-white font-cairo font-bold text-2xl mb-4 shadow-glow-primary ring-4 ring-white">
                    {step.number}
                  </div>

                  {/* Title */}
                  <h3 className="text-primary-800 font-cairo font-bold text-xl mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-steel-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line (Desktop) */}
                {index < t('quality.steps').length - 1 && (
                  <div className={`hidden md:block absolute top-8 right-0 h-0.5 bg-gradient-to-l from-accent/60 via-primary/40 to-transparent transform translate-x-1/2 ${isVisible ? `quality-line quality-line-${index + 1}` : 'quality-line-initial'}`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Callout Box */}
          <div className={`bg-gradient-to-r from-primary-50 to-white border border-primary-200 border-s-4 border-s-accent rounded-3xl p-6 text-center shadow-soft ${isVisible ? 'quality-callout' : 'quality-callout-initial'}`}>
            <p className="text-primary font-cairo font-bold text-lg">
              {t('quality.callout')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
