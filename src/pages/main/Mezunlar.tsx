import { useTranslation } from 'react-i18next'
import { GraduationCap, Mail, Users, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const Mezunlar = () => {
  const { t } = useTranslation()
  return (
    <MainWrapper>
      <PageBanner title={t('pages.mezunlar.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.mezunlar.title') }]} />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <GraduationCap size={64} className="mx-auto text-secondary mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">{t('pages.mezunlar.headerTitle')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('pages.mezunlar.headerDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              <Users size={40} className="text-primary mb-4" />
              <h3 className="font-bold text-primary text-lg mb-2">{t('pages.mezunlar.storiesTitle')}</h3>
              <p className="text-gray-500 text-sm">{t('pages.mezunlar.storiesDesc')}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              <Heart size={40} className="text-secondary mb-4" />
              <h3 className="font-bold text-primary text-lg mb-2">{t('pages.mezunlar.associationTitle')}</h3>
              <p className="text-gray-500 text-sm">{t('pages.mezunlar.associationDesc')}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <h3 className="font-bold text-primary text-lg mb-4">{t('pages.mezunlar.contactTitle')}</h3>
            <p className="text-gray-600 mb-6">
              {t('pages.mezunlar.contactDesc')}
            </p>
            <Link to="/iletisim" className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary transition">
              <Mail size={18} /> {t('pages.mezunlar.contactForm')}
            </Link>
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default Mezunlar
