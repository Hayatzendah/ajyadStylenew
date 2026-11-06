import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import SEO from '../components/common/SEO'
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import ProductSpecs from '../components/products/ProductSpecs'
import FAQAccordion from '../components/ui/FAQAccordion'
import GalleryLightbox from '../components/ui/GalleryLightbox'
import { getProductBySlug } from '../data/products'
import { siteData } from '../data/site'
import { generateProductSchema, generateBreadcrumbSchema } from '../utils/jsonLd'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  if (!product) {
    return <Navigate to="/404" replace />
  }

  // معرض الصور - صور مختلفة حسب المنتج
  const getGalleryImages = () => {
    // صور خاصة بصفحة الستانلس ستيل
    if (slug === 'stainless-steel') {
      return [
        {
          id: 1,
          src: '/images/home/Stainless steel 1.jpeg',
          alt: `${product.name} - صورة 1`
        },
        {
          id: 2,
          src: '/images/home/Stainless steel .jpeg',
          alt: `${product.name} - صورة 2`
        },
        {
          id: 3,
          src: '/images/home/Stainless steel 2.jpeg',
          alt: `${product.name} - صورة 3`
        },
        {
          id: 4,
          src: '/images/home/Stainless steel 3.jpeg',
          alt: `${product.name} - صورة 4`
        },
        {
          id: 5,
          src: '/images/home/Stainless steel 4.jpeg',
          alt: `${product.name} - صورة 5`
        }
      ]
    }
    
    // صور خاصة بصفحة الصاج الملون
    if (slug === 'prepainted-sheet') {
      return [
        {
          id: 1,
          src: '/images/home/Colored sheet metal4.jpg',
          alt: `${product.name} - صورة 1`
        },
        {
          id: 2,
          src: '/images/home/Colored sheet metal.jpeg',
          alt: `${product.name} - صورة 2`
        },
        {
          id: 3,
          src: '/images/home/Colored sheet metal2.jpeg',
          alt: `${product.name} - صورة 3`
        },
        {
          id: 4,
          src: '/images/home/Colored sheet metal3.jpeg',
          alt: `${product.name} - صورة 4`
        },
        {
          id: 5,
          src: '/images/home/Colored sheet metal5.jpg',
          alt: `${product.name} - صورة 5`
        }
      ]
    }
    
    // صور خاصة بصفحة الصاج البارد
    if (slug === 'cold-sheet') {
      return [
        {
          id: 1,
          src: '/images/home/cold.jpeg',
          alt: `${product.name} - صورة 1`
        },
        {
          id: 2,
          src: '/images/home/cold1.jpeg',
          alt: `${product.name} - صورة 2`
        },
        {
          id: 3,
          src: '/images/home/cold2.jpeg',
          alt: `${product.name} - صورة 3`
        },
        {
          id: 4,
          src: '/images/home/cold3.jpeg',
          alt: `${product.name} - صورة 4`
        }
      ]
    }
    
    // صور افتراضية للمنتجات الأخرى (الصاج المجلفن)
    return [
      {
        id: 1,
        src: '/images/home/Galvanized sheet metal1.jpeg',
        alt: `${product.name} - صورة 1`
      },
      {
        id: 2,
        src: '/images/home/Galvanized sheet metal.jpeg',
        alt: `${product.name} - صورة 2`
      },
      {
        id: 3,
        src: '/images/home/Galvanized sheet metal2.jpeg',
        alt: `${product.name} - صورة 3`
      },
      {
        id: 4,
        src: '/images/home/Galvanized sheet metal3.jpeg',
        alt: `${product.name} - صورة 4`
      }
    ]
  }

  const galleryImages = getGalleryImages()

  const breadcrumbs = [
    { name: 'الرئيسية', path: '/' },
    { name: 'المنتجات', path: '/products' },
    { name: product.name, path: `/products/${product.slug}` }
  ]

  const schemas = [
    generateProductSchema(product),
    generateBreadcrumbSchema(breadcrumbs)
  ]

  return (
    <>
      <SEO
        title={product.name}
        description={`${product.fullDesc} - احصل على ${product.name} بأفضل الأسعار والجودة من أجياد ستيل للتوريدات`}
        canonical={`/products/${product.slug}`}
        image={product.image}
        type="product"
        jsonLd={schemas}
      />

      {/* Product Hero */}
      <section className="page-hero relative py-24 md:py-36">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Gallery */}
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-4xl overflow-hidden shadow-lift ring-1 ring-white/20 mb-4">
                <img
                  src={galleryImages[0].src}
                  alt={product.name}
                  className="w-full h-96 md:h-[500px] object-cover cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                  onClick={() => setLightboxIndex(0)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {galleryImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setLightboxIndex(index)}
                    className="relative aspect-square rounded-2xl overflow-hidden ring-1 ring-white/20 hover:ring-accent hover:-translate-y-1 transition-all duration-500 ease-out-expo group"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300"></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <h1 className="text-4xl md:text-5xl font-cairo font-bold text-white mb-6">
                {product.name}
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                {product.fullDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button to="/contact" size="lg">
                  اطلب عرض سعر
                </Button>
                <Button
                  href={siteData.social.whatsapp}
                  variant="secondary"
                  size="lg"
                >
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  تواصل واتساب
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <SectionTitle title="المواصفات" subtitle="التفاصيل الفنية" />
          <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-soft ring-1 ring-steel-200">
            <ProductSpecs specs={product.specs} />
          </div>
        </div>
      </section>

      {/* Quality Steps */}
      {product.qualitySteps && product.qualitySteps.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <SectionTitle title="خطوات ضمان الجودة" subtitle="معايير الاختبار" />
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
              {product.qualitySteps.map((step, index) => (
                <Card key={index} hover={false}>
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-2xl flex-shrink-0">✓</span>
                    <p className="text-black">{step}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tests Section - Prepainted Sheet Only */}
      {slug === 'prepainted-sheet' && (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <SectionTitle title="الاختبارات الخاصة بالصاج الملون" subtitle="معايير الجودة والاختبار" />
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl overflow-hidden ring-1 ring-steel-200 shadow-lift">
                <img
                  src="/images/home/fe5a8866-1276-4a14-93fb-28e275463341.jpg"
                  alt="الاختبارات الخاصة بالصاج الملون"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Delivery Info */}
      {product.deliveryInfo && product.deliveryInfo.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <SectionTitle title="التسليم والمتابعة" subtitle="خدمات ما بعد البيع" />
            <div className="max-w-4xl mx-auto space-y-4">
              {product.deliveryInfo.map((info, index) => (
                <Card key={index} hover={false}>
                  <div className="flex items-start gap-3">
                    <span className="text-primary text-2xl flex-shrink-0">📦</span>
                    <p className="text-black text-lg">{info}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Use Cases */}
      {product.useCases && product.useCases.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <SectionTitle title="الاستخدامات" subtitle="أين يُستخدم هذا المنتج" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.useCases.map((useCase, index) => (
                <Card key={index}>
                  <div className="text-4xl mb-4">🔧</div>
                  <h3 className="text-primary font-cairo font-bold text-lg mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-black text-sm">{useCase.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {product.faqs && product.faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <SectionTitle title="الأسئلة الشائعة" subtitle="FAQ" />
              <FAQAccordion faqs={product.faqs} />
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 section-dark bg-noise">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto glass rounded-4xl p-12 shadow-lift">
            <h2 className="text-3xl md:text-4xl font-cairo font-bold text-white mb-6">
              هل أنت مهتم بهذا المنتج؟
            </h2>
            <p className="text-white/80 text-lg mb-8">
              تواصل معنا الآن للحصول على عرض سعر مخصص ومعرفة المزيد عن {product.name}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href={siteData.social.whatsapp}
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
              >
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                تواصل واتساب
              </Button>
              <Button
                to="/contact"
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                إرسال استفسار
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          images={galleryImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
