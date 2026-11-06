import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import SEO from '../components/common/SEO'

export default function NotFound() {
  return (
    <>
      <SEO
        title="الصفحة غير موجودة"
        description="الصفحة التي تبحث عنها غير موجودة"
        canonical="/404"
      />

      <section className="page-hero min-h-screen flex items-center justify-center py-20">
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-9xl md:text-[12rem] leading-none font-cairo font-extrabold bg-gradient-to-br from-primary-300 via-white to-accent-400 bg-clip-text text-transparent mb-8 animate-float">
              404
            </div>
            <h1 className="text-4xl md:text-5xl font-cairo font-bold text-white mb-6">
              الصفحة غير موجودة
            </h1>
            <p className="text-steel-300 text-lg mb-8">
              عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى موقع آخر.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button to="/" size="lg">
                العودة للرئيسية
              </Button>
              <Button to="/products" variant="outline" size="lg" className="border-white/40 text-white">
                استعرض المنتجات
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
