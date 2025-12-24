import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import Card from '../common/Card'
import Button from '../common/Button'

export default function ProductCard({ product }) {
  const { t } = useLanguage()
  const productIndex = product.id - 1
  const translatedProduct = t('products.items')[productIndex]
  
  return (
    <Link to={`/products/${product.slug}`}>
      <Card>
        <div className="relative rounded-lg overflow-hidden mb-4">
          <img
            src={product.image}
            alt={translatedProduct?.name || product.name}
            className="w-full h-56 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
        </div>

        <h3 className="text-primary font-cairo font-bold text-2xl mb-3">
          {translatedProduct?.name || product.name}
        </h3>

        <p className="text-black mb-4 line-clamp-2">
          {translatedProduct?.shortDesc || product.shortDesc}
        </p>

        <ul className="space-y-2 mb-6">
          {(translatedProduct?.specs || product.specs).slice(0, 3).map((spec, idx) => (
            <li key={idx} className="text-sm text-black flex items-start gap-2">
              <span className="text-primary mt-1 flex-shrink-0">✓</span>
              <span><strong>{spec.label}:</strong> {spec.value}</span>
            </li>
          ))}
        </ul>

        <Button to={`/products/${product.slug}`} variant="outline" className="w-full" onClick={(e) => e.stopPropagation()}>
          {t('productsPage.viewDetails')}
        </Button>
      </Card>
    </Link>
  )
}
