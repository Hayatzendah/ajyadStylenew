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
          className={`px-6 py-2 rounded-full font-cairo font-semibold transition-all ${
            activeFilter === filter.value
              ? 'bg-primary text-white shadow-lg shadow-primary/30'
              : 'bg-white text-black hover:bg-primary/10 border border-mutedGray'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
