import { useLanguage } from '../../contexts/LanguageContext'
import SectionTitle from '../common/SectionTitle'

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

export default function WorksGallery() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <SectionTitle title={t('works.title')} subtitle={t('works.subtitle')} />

        {/* Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {clientLogos.map((logo) => (
            <div
              key={logo.id}
              className="bg-white rounded-lg p-6 flex items-center justify-center border border-mutedGray hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 h-32"
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
    </section>
  )
}
