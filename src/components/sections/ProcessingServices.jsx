import { useLanguage } from '../../contexts/LanguageContext'

export default function ProcessingServices() {
  const { t } = useLanguage()
  
  const services = [
    {
      id: 1,
      title: t('processing.operation.title'),
      subtitle: t('processing.operation.subtitle'),
      description: t('processing.operation.description'),
      points: t('processing.operation.points'),
      image: "/images/home/Operation.jpeg",
      imagePosition: "right"
    },
    {
      id: 2,
      title: t('processing.cutting.title'),
      subtitle: t('processing.cutting.subtitle'),
      description: t('processing.cutting.description'),
      points: t('processing.cutting.points'),
      image: "/images/home/Cutting.jpeg",
      imagePosition: "left"
    },
    {
      id: 3,
      title: t('processing.slitting.title'),
      subtitle: t('processing.slitting.subtitle'),
      description: t('processing.slitting.description'),
      points: t('processing.slitting.points'),
      image: "/images/home/Slitting.jpeg",
      imagePosition: "right"
    },
    {
      id: 4,
      title: t('processing.pvc.title'),
      subtitle: t('processing.pvc.subtitle'),
      description: t('processing.pvc.description'),
      points: t('processing.pvc.points'),
      image: "/images/home/PVC Packaging.jpeg",
      imagePosition: "left"
    }
  ]

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container-custom">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`relative mb-20 ${
              index === services.length - 1 ? 'mb-0' : ''
            }`}
          >
            <div className="grid md:grid-cols-2 gap-0 items-stretch min-h-[500px]">
              {/* Image Section */}
              <div
                className={`relative order-2 ${
                  service.imagePosition === 'right' 
                    ? 'md:order-2' 
                    : 'md:order-1'
                }`}
              >
                <div 
                  className="relative w-full h-full"
                  style={{
                    clipPath: service.imagePosition === 'right' 
                      ? 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)'
                      : 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'
                  }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
                </div>
              </div>

              {/* Content Section */}
              <div
                className={`relative order-1 ${
                  service.imagePosition === 'right' 
                    ? 'md:order-1 bg-steel-50' 
                    : 'md:order-2 bg-white'
                } flex items-center p-8 md:p-12 overflow-visible`}
              >
                <div className="w-full z-10 relative">
                  <h2 className="text-3xl md:text-4xl font-cairo font-extrabold text-primary-800 mb-4">
                    {service.title}
                  </h2>
                  <h3 className="text-xl md:text-2xl font-cairo font-semibold text-accent mb-6">
                    {service.subtitle}
                  </h3>
                  <p className="text-steel-700 text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-steel-800">
                        <span className="text-accent font-bold mt-1 flex-shrink-0 text-xl">✓</span>
                        <span className="text-lg leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

