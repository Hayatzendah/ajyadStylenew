import { products } from '../../data/products'
import { useLanguage } from '../../contexts/LanguageContext'

export default function ProductFilter({ activeFilter, onFilterChange }) {
  const { t } = useLanguage()
  const filters = [
    { label: t('productsPage.filterAll'), value: 'all' },
    ...products.map((p, index) => ({ 
      label: t('products.items')[index]?.name || p.name, 
      value: p.slug 
    }))
  ]

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-6 py-2.5 rounded-full font-cairo font-semibold transition-all duration-500 ease-out-expo ${
            activeFilter === filter.value
              ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-glow-primary scale-105'
              : 'bg-white text-steel-700 hover:bg-primary-50 hover:-translate-y-0.5 border border-steel-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
