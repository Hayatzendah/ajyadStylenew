import { useLanguage } from '../../contexts/LanguageContext'

export default function StatsRow() {
  const { t } = useLanguage()
  const stats = [
    { label: t('stats.founded'), value: t('stats.foundedValue') },
    { label: t('stats.experience'), value: t('stats.experienceValue') },
    { label: t('stats.stock'), value: t('stats.stockValue') },
    { label: t('stats.quality'), value: t('stats.qualityValue') }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 text-center border border-mutedGray stats-card-collision stats-card-${index + 1}`}
        >
          <div className="text-2xl md:text-4xl font-cairo font-bold text-primary mb-2">
            {stat.value}
          </div>
          <div className="text-sm md:text-base text-black">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
