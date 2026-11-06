import { useState, useEffect, useRef } from 'react'
import SEO from '../components/common/SEO'
import SectionTitle from '../components/common/SectionTitle'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import { useLanguage } from '../contexts/LanguageContext'
import { siteData } from '../data/site'
import { generateOrganizationSchema, generateBreadcrumbSchema } from '../utils/jsonLd'

export default function About() {
  const { t } = useLanguage()
  const [visibleSections, setVisibleSections] = useState({
    story: false,
    fields: false,
    whyBest: false,
    importService: false,
    pricing: false,
    cta: false
  })

  const storyRef = useRef(null)
  const fieldsRef = useRef(null)
  const whyBestRef = useRef(null)
  const importServiceRef = useRef(null)
  const pricingRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const observers = []

    const createObserver = (ref, key) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !visibleSections[key]) {
            setVisibleSections(prev => ({ ...prev, [key]: true }))
          }
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -100px 0px'
        }
      )

      if (ref.current) {
        observer.observe(ref.current)
      }

      observers.push({ observer, ref })
      return observer
    }

    createObserver(storyRef, 'story')
    createObserver(fieldsRef, 'fields')
    createObserver(whyBestRef, 'whyBest')
    createObserver(importServiceRef, 'importService')
    createObserver(pricingRef, 'pricing')
    createObserver(ctaRef, 'cta')

    return () => {
      observers.forEach(({ observer, ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [visibleSections])

  const breadcrumbs = [
    { name: t('aboutPage.breadcrumbHome'), path: '/' },
    { name: t('aboutPage.breadcrumbAbout'), path: '/about' }
  ]

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema(breadcrumbs)
  ]

  return (
    <>
      <SEO
        title={t('aboutPage.title')}
        description={t('aboutPage.seoDescription')}
        canonical="/about"
        jsonLd={schemas}
      />

      {/* Internal Hero */}
      <section className="page-hero relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="container-custom relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-cairo font-bold text-white text-center mb-6">
            {t('aboutPage.title')}
          </h1>
          <p className="text-white/80 text-xl text-center max-w-3xl mx-auto">
            {t('aboutPage.description')}
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section ref={storyRef} className="py-20 bg-white">
        <div className="container-custom">
          <div className={`max-w-6xl mx-auto ${visibleSections.story ? 'about-story-content' : 'about-story-content-initial'}`}>
            <SectionTitle title={t('aboutPage.story.title')} subtitle={t('aboutPage.story.subtitle')} />
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6 text-black text-lg leading-relaxed">
                <p>{t('about.fullDescription')}</p>
                <p>
                  {t('aboutPage.story.paragraph1')}
                </p>
                <p>
                  {t('aboutPage.story.paragraph2')}
                </p>
              </div>
              <div className={`${visibleSections.story ? 'about-story-image' : 'about-story-image-initial'}`}>
                <img 
                  src="/images/home/home.jpeg" 
                  alt={t('aboutPage.story.imageAlt')} 
                  className="w-full h-auto rounded-4xl shadow-lift ring-1 ring-steel-200 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Fields */}
      <section ref={fieldsRef} className="py-24 section-light">
        <div className="container-custom">
          <SectionTitle title={t('aboutPage.fields.title')} subtitle={t('aboutPage.fields.subtitle')} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
            {t('products.items').map((product, index) => (
              <Card key={index} className={`text-center ${visibleSections.fields ? `about-field-card about-field-card-${index + 1}` : 'about-field-card-initial'}`}>
                <p className="text-primary font-cairo font-bold">{product.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Best */}
      <section ref={whyBestRef} className="py-20 bg-white">
        <div className="container-custom">
          <SectionTitle title={t('aboutPage.whyBest.title')} subtitle={t('aboutPage.whyBest.subtitle')} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t('whyUs.items').map((item, index) => (
              <Card key={index} className={visibleSections.whyBest ? `about-why-card about-why-card-${index + 1}` : 'about-why-card-initial'}>
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-primary font-cairo font-bold text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-black leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Import Service */}
      <section ref={importServiceRef} className="py-24 section-light">
        <div className="container-custom">
          <SectionTitle title={t('aboutPage.importService.title')} subtitle={t('aboutPage.importService.subtitle')} />
          <div className="max-w-5xl mx-auto space-y-6">
            {t('import.services').map((service, index) => (
              <Card key={index} hover={false} className={visibleSections.importService ? `about-import-card about-import-card-${index + 1}` : 'about-import-card-initial'}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-800 flex items-center justify-center shadow-glow-primary">
                    <span className="text-white font-cairo font-bold text-xl">
                      {service.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-primary font-cairo font-bold text-xl mb-2">
                      {service.title}
                    </h3>
                    <p className="text-black leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Pricing */}
      <section ref={pricingRef} className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionTitle title={t('aboutPage.pricing.title')} subtitle={t('aboutPage.pricing.subtitle')} />
            <div className="space-y-6">
              <Card className={visibleSections.pricing ? 'about-pricing-card about-pricing-card-1' : 'about-pricing-card-initial'}>
                <h3 className="text-primary font-cairo font-bold text-xl mb-3">
                  {t('aboutPage.pricing.directPurchase.title')}
                </h3>
                <p className="text-black leading-relaxed">
                  {t('aboutPage.pricing.directPurchase.description')}
                </p>
              </Card>
              <Card className={visibleSections.pricing ? 'about-pricing-card about-pricing-card-2' : 'about-pricing-card-initial'}>
                <h3 className="text-primary font-cairo font-bold text-xl mb-3">
                  {t('aboutPage.pricing.largeStock.title')}
                </h3>
                <p className="text-black leading-relaxed">
                  {t('aboutPage.pricing.largeStock.description')}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-24 section-dark bg-noise">
        <div className={`container-custom text-center ${visibleSections.cta ? 'about-cta-content' : 'about-cta-content-initial'}`}>
          <h2 className="text-3xl md:text-4xl font-cairo font-bold text-white mb-6">
            {t('aboutPage.cta.title')}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {t('aboutPage.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/contact" size="lg">
              {t('aboutPage.cta.contact')}
            </Button>
            <Button to="/products" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              {t('aboutPage.cta.browseProducts')}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
