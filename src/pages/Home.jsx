import SEO from '../components/common/SEO'
import Hero from '../components/sections/Hero'
import StatsRow from '../components/common/StatsRow'
import AboutPreview from '../components/sections/AboutPreview'
import WhyUs from '../components/sections/WhyUs'
import ProductsOverview from '../components/sections/ProductsOverview'
import ProcessingServices from '../components/sections/ProcessingServices'
import QualityWorkflow from '../components/sections/QualityWorkflow'
import ImportService from '../components/sections/ImportService'
import WorksGallery from '../components/sections/WorksGallery'
import BigCTA from '../components/sections/BigCTA'
import ContactSection from '../components/sections/ContactSection'
import { generateOrganizationSchema } from '../utils/jsonLd'
import { useLanguage } from '../contexts/LanguageContext'

export default function Home() {
  const { t } = useLanguage()
  
  return (
    <>
      <SEO
        title=""
        description={t('hero.companyName') + ' - #1 Metal Supplier in Egypt | Over 25 years of experience in supplying Galvanized Sheet, Stainless Steel, and Prepainted Sheet at the best prices'}
        canonical="/"
        jsonLd={generateOrganizationSchema()}
      />

      <Hero />
      
      {/* Stats Row - Centered between Hero and AboutPreview */}
      <section className="relative py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <StatsRow />
          </div>
        </div>
      </section>

      <AboutPreview />
      <WhyUs />
      <ProductsOverview />
      <ProcessingServices />
      <QualityWorkflow />
      <ImportService />
      <WorksGallery />
      <BigCTA />
      <ContactSection />
    </>
  )
}
