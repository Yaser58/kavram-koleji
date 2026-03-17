import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Download, Image, FileText, Palette, CheckCircle } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const logoRuleKeys = ['logoRule1', 'logoRule2', 'logoRule3', 'logoRule4', 'logoRule5']

const KurumsalKimlik = () => {
  const { t } = useTranslation()
  const downloads = [
    { titleKey: 'identityGuide', descKey: 'identityGuideDesc', icon: FileText, file: '/downloads/kurumsal-kimlik.pdf' },
    { titleKey: 'logoPackage', descKey: 'logoPackageDesc', icon: Image, file: '/downloads/logo-paketi.zip' },
    { titleKey: 'catalog', descKey: 'catalogDesc', icon: FileText, file: '/downloads/katalog.pdf' },
  ]
  return (
    <MainWrapper>
      <PageBanner title={t('pages.kurumsalKimlik.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.kurumsalKimlik.title') }]} />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">{t('pages.kurumsalKimlik.logoRulesTitle')}</h2>
              <p className="text-gray-600 mb-8">{t('pages.kurumsalKimlik.logoRulesDesc')}</p>
              <ul className="space-y-4">
                {logoRuleKeys.map((key, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{t(`pages.kurumsalKimlik.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center">
              <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100">
                <img src="/Kavram-logo.png" alt={t('pages.kurumsalKimlik.officialLogo')} className="w-64 h-auto object-contain" />
              </div>
              <p className="text-gray-500 text-sm mt-4 text-center">{t('pages.kurumsalKimlik.officialLogo')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-4">{t('pages.kurumsalKimlik.downloadsTitle')}</h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">{t('pages.kurumsalKimlik.downloadsDesc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {downloads.map((item, i) => (
              <a key={i} href={item.file} download className="group bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg hover:border-secondary/30 transition flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition">
                  <item.icon size={28} className="text-secondary" />
                </div>
                <h3 className="font-bold text-primary mb-2 group-hover:text-secondary transition">{t(`pages.kurumsalKimlik.${item.titleKey}`)}</h3>
                <p className="text-gray-500 text-sm mb-4">{t(`pages.kurumsalKimlik.${item.descKey}`)}</p>
                <span className="inline-flex items-center gap-2 text-secondary font-semibold text-sm">
                  <Download size={16} /> {t('common.download')}
                </span>
              </a>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-8">{t('pages.kurumsalKimlik.materialsNote')}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <Palette size={48} className="mx-auto text-secondary mb-4" />
          <h2 className="text-xl font-bold text-primary mb-2">{t('pages.kurumsalKimlik.requestTitle')}</h2>
          <p className="text-gray-500 mb-6 max-w-xl mx-auto">{t('pages.kurumsalKimlik.requestDesc')}</p>
          <Link to="/iletisim" className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary transition">
            {t('pages.kurumsalKimlik.contactUs')}
          </Link>
        </div>
      </section>
    </MainWrapper>
  )
}

export default KurumsalKimlik
