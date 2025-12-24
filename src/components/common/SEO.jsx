import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../../contexts/LanguageContext'

export default function SEO({
  title,
  description,
  canonical,
  image = '/og-image.png',
  type = 'website',
  jsonLd = null
}) {
  const { t, language } = useLanguage()
  // TODO: Update this to your actual domain before deployment
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://yourdomain.com'
  const companyName = t('hero.companyName')
  const defaultTitle = language === 'ar' 
    ? `${companyName} - مورد معادن رقم 1 | خبرة +25 سنة`
    : `${companyName} - #1 Metal Supplier | +25 Years Experience`
  const fullTitle = title ? `${title} | ${companyName}` : defaultTitle
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl
  const ogLocale = language === 'ar' ? 'ar_EG' : language === 'zh' ? 'zh_CN' : 'en_US'

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:site_name" content={companyName} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )
}
