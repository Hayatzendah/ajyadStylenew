import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { siteData } from '../../data/site'

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-steel-950 bg-grid mt-20 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
      <div className="absolute -top-40 start-1/2 w-[40rem] h-80 rounded-full bg-primary/20 blur-3xl pointer-events-none"></div>
      <div className="container-custom py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* About */}
          <div>
            <h3 className="text-white font-cairo font-bold text-xl mb-4">
              {t('hero.companyName')}
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              {t('hero.description')}
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/AgyadSteel/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass hover:bg-primary hover:-translate-y-1 rounded-full flex items-center justify-center text-white transition-all"
                aria-label={t('footer.social.facebook')}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href={siteData.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass hover:bg-green-600 hover:-translate-y-1 rounded-full flex items-center justify-center text-white transition-all"
                aria-label={t('footer.social.whatsapp')}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-cairo font-bold text-xl mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {siteData.navigation.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-white/70 hover:text-white hover:ps-2 transition-all text-sm"
                  >
                    {t(`nav.${item.path === '/' ? 'home' : item.path.replace('/', '')}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-cairo font-bold text-xl mb-4">
              {t('footer.contactUs')}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-white/80">
                <span className="mt-1">📍</span>
                <span>{t('contact.managementAddress')}</span>
              </li>
              <li>
                <a
                  href={`tel:${siteData.contact.teamPhones.hassan}`}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <span>📞</span>
                  <span>{t('contactPage.teamMembers.hassan')}: {siteData.contact.teamPhones.hassan}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteData.contact.teamPhones.mustafa}`}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <span>📞</span>
                  <span>{t('contactPage.teamMembers.mustafa')}: {siteData.contact.teamPhones.mustafa}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteData.contact.teamPhones.ahmed}`}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <span>📞</span>
                  <span>{t('contactPage.teamMembers.ahmed')}: {siteData.contact.teamPhones.ahmed}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteData.contact.teamPhones.hani}`}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <span>📞</span>
                  <span>{t('contactPage.teamMembers.hani')}: {siteData.contact.teamPhones.hani}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteData.contact.email}`}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors break-all"
                >
                  <span>✉️</span>
                  <span>{siteData.contact.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/70">
          <p>
            © {currentYear} {t('hero.companyName')}. {t('footer.allRightsReserved')}
          </p>
          <p className="mt-2">
            {t('footer.developedBy')}{' '}
            <a
              href="https://www.brightc0de.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-300 hover:text-accent-300 transition-colors"
            >
              {t('footer.brightCode')}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
