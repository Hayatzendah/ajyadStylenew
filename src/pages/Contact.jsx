import { useState, useEffect, useRef } from 'react'
import SEO from '../components/common/SEO'
import SectionTitle from '../components/common/SectionTitle'
import ContactCard from '../components/ui/ContactCard'
import QuoteRequestForm from '../components/ui/QuoteRequestForm'
import Button from '../components/common/Button'
import { useLanguage } from '../contexts/LanguageContext'
import { siteData } from '../data/site'
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '../utils/jsonLd'

export default function Contact() {
  const { t } = useLanguage()
  const [visibleSections, setVisibleSections] = useState({
    cards: false,
    mapForm: false,
    info: false,
    cta: false
  })

  const cardsRef = useRef(null)
  const mapFormRef = useRef(null)
  const infoRef = useRef(null)
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

    createObserver(cardsRef, 'cards')
    createObserver(mapFormRef, 'mapForm')
    createObserver(infoRef, 'info')
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
    { name: t('contactPage.breadcrumbHome'), path: '/' },
    { name: t('contactPage.breadcrumbContact'), path: '/contact' }
  ]

  const schemas = [
    generateLocalBusinessSchema(),
    generateBreadcrumbSchema(breadcrumbs)
  ]

  return (
    <>
      <SEO
        title={t('contactPage.title')}
        description={t('contactPage.seoDescription')}
        canonical="/contact"
        jsonLd={schemas}
      />

      {/* Internal Hero */}
      <section className="relative py-20 md:py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="container-custom relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-cairo font-bold text-white text-center mb-6">
            {t('contactPage.title')}
          </h1>
          <p className="text-white/80 text-xl text-center max-w-3xl mx-auto">
            {t('contactPage.description')}
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 mb-20">
            <div className={visibleSections.cards ? 'contact-card-animate contact-card-1' : 'contact-card-initial'}>
              <ContactCard
                icon="✉️"
                title={t('contactPage.emailCard.title')}
                value={siteData.contact.email}
                href={`mailto:${siteData.contact.email}`}
              />
            </div>
            <div className={visibleSections.cards ? 'contact-card-animate contact-card-2' : 'contact-card-initial'}>
              <ContactCard
                icon="📍"
                title={t('contactPage.visitCard.title')}
                value={t('contact.managementAddress')}
                href={siteData.contact.googleMaps}
                type="maps"
              />
            </div>
          </div>

          {/* Team Contact Numbers */}
          <div className="mb-20">
            <SectionTitle title={t('contactPage.teamSection.title')} subtitle={t('contactPage.teamSection.subtitle')} />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ContactCard
                icon="📞"
                title={t('contactPage.teamMembers.hassan')}
                value="0117741890"
                href="tel:0117741890"
              />
              <ContactCard
                icon="📞"
                title={t('contactPage.teamMembers.mustafa')}
                value="01126329524"
                href="tel:01126329524"
              />
              <ContactCard
                icon="📞"
                title={t('contactPage.teamMembers.ahmed')}
                value="01115963217"
                href="tel:01115963217"
              />
              <ContactCard
                icon="📞"
                title={t('contactPage.teamMembers.hani')}
                value="01063352265"
                href="tel:01063352265"
              />
            </div>
          </div>

          {/* Map & Form Grid */}
          <div ref={mapFormRef} className="grid lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className={visibleSections.mapForm ? 'contact-map-animate' : 'contact-map-initial'}>
              <SectionTitle title={t('contactPage.map.title')} centered={false} />
              <div className="bg-white rounded-xl overflow-hidden h-96 border border-mutedGray">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.5!2d31.2130833!3d30.0614722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAzJzQxLjMiTiAzMcKwMTInNDcuMSJF!5e0!3m2!1sar!2seg!4v1234567890!5m2!1sar!2seg"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t('contactPage.map.titleAlt')}
                ></iframe>
              </div>
            </div>

            {/* Contact Form - Now using Quote Request Form */}
            <div className={visibleSections.mapForm ? 'contact-form-animate' : 'contact-form-initial'}>
              <SectionTitle title={t('contactPage.quoteForm.title')} centered={false} />
              <QuoteRequestForm showTitle={false} />
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours & Additional Info */}
      <section ref={infoRef} className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className={visibleSections.info ? 'contact-info-card-animate contact-info-card-1' : 'contact-info-card-initial'}>
              <div className="bg-white rounded-xl p-8 border border-mutedGray">
                <h3 className="text-primary font-cairo font-bold text-2xl mb-6">
                  {t('contactPage.businessHours.title')}
                </h3>
                <div className="space-y-4 text-black">
                  <div className="flex justify-between">
                    <span>{t('contactPage.businessHours.saturdayThursday')}</span>
                    <span className="text-primary font-bold">{t('contactPage.businessHours.hours')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('contactPage.businessHours.friday')}</span>
                    <span className="text-accent">{t('contactPage.businessHours.closed')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={visibleSections.info ? 'contact-info-card-animate contact-info-card-2' : 'contact-info-card-initial'}>
              <div className="bg-white rounded-xl p-8 border border-mutedGray">
                <h3 className="text-primary font-cairo font-bold text-2xl mb-6">
                  {t('contactPage.additionalInfo.title')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <p className="text-black">{t('contactPage.additionalInfo.quickResponse')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <p className="text-black">{t('contactPage.additionalInfo.freeConsultation')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <p className="text-black">{t('contactPage.additionalInfo.sameDayQuotes')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <p className="text-black">{t('contactPage.additionalInfo.technicalSupport')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section ref={ctaRef} className="py-20 bg-primary">
        <div className={`container-custom text-center ${visibleSections.cta ? 'contact-cta-animate' : 'contact-cta-initial'}`}>
          <h2 className="text-3xl md:text-4xl font-cairo font-bold text-white mb-6">
            {t('contactPage.cta.title')}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {t('contactPage.cta.description')}
          </p>
          <Button
            href={siteData.social.whatsapp}
            size="lg"
            variant="accent"
          >
            <span className="text-2xl mr-2">💬</span>
            {t('contactPage.cta.button')}
          </Button>
        </div>
      </section>
    </>
  )
}
