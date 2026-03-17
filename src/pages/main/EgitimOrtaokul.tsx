import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { GraduationCap, Target, BarChart3, BookOpen, ArrowRight, Calendar } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const features = [
  { icon: Target, titleKey: 'lgsPrep', descKey: 'lgsPrepDesc' },
  { icon: BarChart3, titleKey: 'performanceTracking', descKey: 'performanceTrackingDesc' },
  { icon: BookOpen, titleKey: 'richCurriculum', descKey: 'richCurriculumDesc' },
  { icon: GraduationCap, titleKey: 'guidance', descKey: 'guidanceDesc' },
]

const EgitimOrtaokul = () => {
  const { t } = useTranslation()
  return (
    <MainWrapper>
      <PageBanner title={t('pages.egitimOrtaokul.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.siteHaritasi.education'), to: '/egitim' }, { label: t('pages.egitimOrtaokul.title') }]} />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <div className="md:w-1/2">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap size={32} className="text-secondary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">{t('pages.egitimOrtaokul.ourEducation')}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{t('pages.egitimOrtaokul.intro')}</p>
              <Link to="/kayit" className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary transition">
                {t('pages.egitimOrtaokul.register')} <ArrowRight size={18} />
              </Link>
            </div>
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop" alt={t('pages.egitimOrtaokul.title')} className="rounded-2xl shadow-lg w-full object-cover" onError={(e) => { const tgt = e.target as HTMLImageElement; tgt.onerror = null; tgt.src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop' }} />
            </div>
          </div>
          <Link to="/akademik-takvim" className="flex items-center gap-4 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/10 hover:border-secondary/30 transition mb-12 group">
            <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/30 transition">
              <Calendar size={28} className="text-secondary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-primary mb-1">{t('pages.egitimOrtaokul.academicCalendar')}</h3>
              <p className="text-gray-600 text-sm">{t('pages.egitimOrtaokul.academicCalendarDesc')}</p>
            </div>
            <ArrowRight size={20} className="text-secondary group-hover:translate-x-1 transition" />
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                  <f.icon size={24} className="text-secondary" />
                </div>
                <h3 className="font-bold text-primary mb-2">{t(`pages.egitimOrtaokul.${f.titleKey}`)}</h3>
                <p className="text-gray-500 text-sm">{t(`pages.egitimOrtaokul.${f.descKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default EgitimOrtaokul
