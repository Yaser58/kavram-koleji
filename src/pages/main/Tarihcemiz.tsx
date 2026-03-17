import { useTranslation } from 'react-i18next'
import { BookOpen, Award, Users, GraduationCap, Target, Star } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const Tarihcemiz = () => {
  const { t } = useTranslation()
  const milestones = [
    { year: '1974', titleKey: 'pages.tarihcemiz.milestone1974', descKey: 'pages.tarihcemiz.milestone1974Desc' },
    { year: '1980\'ler', titleKey: 'pages.tarihcemiz.milestone80s', descKey: 'pages.tarihcemiz.milestone80sDesc' },
    { year: '1990\'lar', titleKey: 'pages.tarihcemiz.milestone90s', descKey: 'pages.tarihcemiz.milestone90sDesc' },
    { year: '2000\'ler', titleKey: 'pages.tarihcemiz.milestone2000s', descKey: 'pages.tarihcemiz.milestone2000sDesc' },
    { year: '2010\'lar', titleKey: 'pages.tarihcemiz.milestone2010s', descKey: 'pages.tarihcemiz.milestone2010sDesc' },
    { year: '2020\'ler', titleKey: 'pages.tarihcemiz.milestone2020s', descKey: 'pages.tarihcemiz.milestone2020sDesc' },
  ]
  const values = [
    { icon: Award, titleKey: 'pages.tarihcemiz.valueQuality', descKey: 'pages.tarihcemiz.valueQualityDesc' },
    { icon: Users, titleKey: 'pages.tarihcemiz.valueSocial', descKey: 'pages.tarihcemiz.valueSocialDesc' },
    { icon: Target, titleKey: 'pages.tarihcemiz.valueGoal', descKey: 'pages.tarihcemiz.valueGoalDesc' },
    { icon: Star, titleKey: 'pages.tarihcemiz.valueSuccess', descKey: 'pages.tarihcemiz.valueSuccessDesc' },
  ]
  return (
    <MainWrapper>
      <PageBanner title={t('pages.tarihcemiz.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.tarihcemiz.title') }]} />
      
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center">
              <BookOpen size={32} className="text-secondary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">{t('pages.tarihcemiz.headerTitle')}</h2>
              <p className="text-gray-500">{t('pages.tarihcemiz.headerDesc')}</p>
            </div>
          </div>
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>{t('pages.tarihcemiz.intro1')}</p>
            <p>{t('pages.tarihcemiz.intro2')}</p>
            <p>{t('pages.tarihcemiz.intro3')}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">{t('pages.tarihcemiz.chronologyTitle')}</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-secondary/30 hidden md:block" />
              {milestones.map((m, i) => (
                <div key={i} className="relative flex gap-8 mb-12 last:mb-0">
                  <div className="hidden md:flex w-16 justify-center flex-shrink-0">
                    <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm">{m.year}</div>
                  </div>
                  <div className="flex-1 bg-white rounded-2xl shadow-md p-6 md:ml-0">
                    <span className="md:hidden inline-block bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">{m.year}</span>
                    <h3 className="text-lg font-bold text-primary mb-2">{t(m.titleKey)}</h3>
                    <p className="text-gray-600">{t(m.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">{t('pages.tarihcemiz.valuesTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-100 hover:shadow-lg hover:border-secondary/30 transition">
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <v.icon size={28} className="text-secondary" />
                </div>
                <h3 className="font-bold text-primary mb-2">{t(v.titleKey)}</h3>
                <p className="text-gray-500 text-sm">{t(v.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <GraduationCap size={64} className="mx-auto mb-6 text-secondary" />
          <h2 className="text-2xl md:text-4xl font-bold mb-4">{t('pages.tarihcemiz.graduatesCta')}</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">{t('pages.tarihcemiz.graduatesCtaDesc')}</p>
        </div>
      </section>
    </MainWrapper>
  )
}

export default Tarihcemiz
