import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import { useLanguage } from '../../contexts/LanguageContext'
import SectionTitle from '../common/SectionTitle'
import Card from '../common/Card'
import Button from '../common/Button'

export default function ProductsOverview() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <SectionTitle title={t('products.title')} subtitle={t('products.subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const translatedProduct = t('products.items')[index]
            return (
              <Card key={product.id}>
                <Link to={`/products/${product.slug}`} className="block">
                  <div className="relative rounded-lg overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={translatedProduct?.name || product.name}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  </div>
                  <h3 className="text-primary font-cairo font-bold text-xl mb-3">
                    {translatedProduct?.name || product.name}
                  </h3>
                  <p className="text-black text-sm mb-4 line-clamp-2">
                    {translatedProduct?.shortDesc || product.shortDesc}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {(translatedProduct?.specs || product.specs).slice(0, 3).map((spec, idx) => (
                      <li key={idx} className="text-sm text-black flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>{spec.label}: {spec.value}</span>
                      </li>
                    ))}
                  </ul>
                </Link>
                <Button to={`/products/${product.slug}`} variant="outline" size="sm" className="w-full">
                  {t('products.viewDetails')}
                </Button>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button to="/products" size="lg">
            {t('products.viewAll')}
          </Button>
        </div>
      </div>
    </section>
  )
}
