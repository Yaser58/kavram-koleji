import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { BookOpen, Users, Star, Target, ArrowRight } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const features = [
  { icon: BookOpen, titleKey: 'basicSkills', descKey: 'basicSkillsDesc' },
  { icon: Users, titleKey: 'socialDevelopment', descKey: 'socialDevelopmentDesc' },
  { icon: Star, titleKey: 'valuesEducation', descKey: 'valuesEducationDesc' },
  { icon: Target, titleKey: 'individualTracking', descKey: 'individualTrackingDesc' },
]

const EgitimIlkokul = () => {
  const { t } = useTranslation()
  return (
    <MainWrapper>
      <PageBanner title={t('pages.egitimIlkokul.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.siteHaritasi.education'), to: '/egitim' }, { label: t('pages.egitimIlkokul.title') }]} />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <div className="md:w-1/2">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen size={32} className="text-secondary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">{t('pages.egitimIlkokul.ourEducation')}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{t('pages.egitimIlkokul.intro')}</p>
              <Link to="/kayit" className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary transition">
                {t('pages.egitimIlkokul.register')} <ArrowRight size={18} />
              </Link>
            </div>
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop" alt={t('pages.egitimIlkokul.title')} className="rounded-2xl shadow-lg w-full object-contain" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                  <f.icon size={24} className="text-secondary" />
                </div>
                <h3 className="font-bold text-primary mb-2">{t(`pages.egitimIlkokul.${f.titleKey}`)}</h3>
                <p className="text-gray-500 text-sm">{t(`pages.egitimIlkokul.${f.descKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default EgitimIlkokul
