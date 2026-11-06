import { useLanguage } from '../contexts/LanguageContext'
import SEO from '../components/common/SEO'
import SectionTitle from '../components/common/SectionTitle'
import WorksGallery from '../components/sections/WorksGallery'

const clientLogos = [
  { id: 1, src: '/images/home/logo1.png', alt: 'عميل 1' },
  { id: 2, src: '/images/home/logo2.png', alt: 'عميل 2' },
  { id: 3, src: '/images/home/logo3.png', alt: 'عميل 3' },
  { id: 4, src: '/images/home/logo4.png', alt: 'عميل 4' },
  { id: 5, src: '/images/home/logo5.png', alt: 'عميل 5' },
  { id: 6, src: '/images/home/logo6.png', alt: 'عميل 6' },
  { id: 7, src: '/images/home/logo7.png', alt: 'عميل 7' },
  { id: 8, src: '/images/home/logo8.png', alt: 'عميل 8' }
]

export default function Clients() {
  const { t, language } = useLanguage()
  
  return (
    <>
      <SEO
        title={t('clientsPage.title')}
        description={t('clientsPage.description')}
        canonical="/clients"
      />

      {/* Hero Section */}
      <section className="page-hero relative py-24 md:py-36">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <SectionTitle 
              title={t('clientsPage.title')} 
              subtitle={t('clientsPage.subtitle')}
              centered={true}
            />
            <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              {t('clientsPage.intro')}
            </p>
          </div>
        </div>
      </section>

      {/* Clients Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-cairo font-bold text-primary mb-4">
                {t('clientsPage.galleryTitle')}
              </h2>
              <p className="text-black/70 text-lg">
                {t('clientsPage.galleryDescription')}
              </p>
            </div>

            {/* Logos Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {clientLogos.map((logo) => (
                <div
                  key={logo.id}
                  className="bg-white rounded-3xl p-6 flex items-center justify-center border border-steel-200 hover:border-primary-300 transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift h-32"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-cairo font-bold text-primary mb-6">
              {t('clientsPage.trustTitle')}
            </h2>
            <p className="text-black/70 text-lg leading-relaxed mb-8">
              {t('clientsPage.trustDescription')}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

