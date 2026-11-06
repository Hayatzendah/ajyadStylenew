import { useLanguage } from '../../contexts/LanguageContext'
import SectionTitle from '../common/SectionTitle'
import Card from '../common/Card'
import Button from '../common/Button'

export default function ImportService() {
  const { t } = useLanguage()
  
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container-custom">
        <SectionTitle title={t('import.title')} subtitle={t('import.subtitle')} />

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {t('import.services').map((service, index) => (
            <Card key={index}>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-800 flex items-center justify-center shadow-glow-primary">
                  <span className="text-white font-cairo font-bold text-xl">
                    {service.number}
                  </span>
                </div>
                <h3 className="text-primary-800 font-cairo font-bold text-lg">
                  {service.title}
                </h3>
              </div>
              <p className="text-steel-600 leading-relaxed">
                {service.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button to="/contact" size="lg" variant="accent">
            {t('import.requestService')}
          </Button>
        </div>
      </div>
    </section>
  )
}
