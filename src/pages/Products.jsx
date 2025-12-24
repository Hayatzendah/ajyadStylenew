import { useState, useEffect, useRef } from 'react'
import SEO from '../components/common/SEO'
import SectionTitle from '../components/common/SectionTitle'
import ProductCard from '../components/products/ProductCard'
import ProductFilter from '../components/products/ProductFilter'
import FAQAccordion from '../components/ui/FAQAccordion'
import QuoteRequestForm from '../components/ui/QuoteRequestForm'
import { useLanguage } from '../contexts/LanguageContext'
import { products } from '../data/products'
import { generateItemListSchema, generateBreadcrumbSchema } from '../utils/jsonLd'

export default function Products() {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState('all')
  const [visibleSections, setVisibleSections] = useState({
    filter: false,
    products: false,
    faq: false
  })

  const filterRef = useRef(null)
  const productsRef = useRef(null)
  const faqRef = useRef(null)

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

    createObserver(filterRef, 'filter')
    createObserver(productsRef, 'products')
    createObserver(faqRef, 'faq')

    return () => {
      observers.forEach(({ observer, ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [visibleSections])

  const filteredProducts =
    activeFilter === 'all'
      ? products
      : products.filter((p) => p.slug === activeFilter)

  const breadcrumbs = [
    { name: t('productsPage.breadcrumbHome'), path: '/' },
    { name: t('productsPage.breadcrumbProducts'), path: '/products' }
  ]

  const schemas = [
    generateItemListSchema(products),
    generateBreadcrumbSchema(breadcrumbs)
  ]

  return (
    <>
      <SEO
        title={t('productsPage.title')}
        description={t('productsPage.seoDescription')}
        canonical="/products"
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
            {t('productsPage.title')}
          </h1>
          <p className="text-white/80 text-xl text-center max-w-3xl mx-auto">
            {t('productsPage.description')}
          </p>
        </div>
      </section>

      {/* Products List */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div ref={filterRef} className={visibleSections.filter ? 'products-filter-animate' : 'products-filter-initial'}>
            <ProductFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>

          <div ref={productsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className={visibleSections.products ? `products-card-animate products-card-${index + 1}` : 'products-card-initial'}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Request Form */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionTitle title={t('productsPage.quoteTitle')} subtitle={t('productsPage.quoteSubtitle')} />
            <QuoteRequestForm showTitle={false} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div ref={faqRef} className={`max-w-4xl mx-auto ${visibleSections.faq ? 'products-faq-animate' : 'products-faq-initial'}`}>
            <SectionTitle title={t('productsPage.faqTitle')} subtitle={t('productsPage.faqSubtitle')} />
            <FAQAccordion faqs={t('productsPage.faqs')} />
          </div>
        </div>
      </section>
    </>
  )
}
