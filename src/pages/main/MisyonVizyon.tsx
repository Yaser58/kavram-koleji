import { useTranslation } from 'react-i18next'
import { Target, Eye, Award, Users } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const valueKeys = [
  { icon: Award, titleKey: 'valueQuality', descKey: 'valueQualityDesc' },
  { icon: Users, titleKey: 'valueSocial', descKey: 'valueSocialDesc' },
  { icon: Target, titleKey: 'valueGoal', descKey: 'valueGoalDesc' },
  { icon: Eye, titleKey: 'valueTransparency', descKey: 'valueTransparencyDesc' },
]

const MisyonVizyon = () => {
  const { t } = useTranslation()
  return (
    <MainWrapper>
      <PageBanner title={t('pages.misyonVizyon.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.misyonVizyon.title') }]} />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Target size={32} className="text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">{t('pages.misyonVizyon.missionTitle')}</h2>
                <p className="text-gray-600 leading-relaxed">
                  {t('pages.misyonVizyon.missionDesc')}
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Eye size={32} className="text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">{t('pages.misyonVizyon.visionTitle')}</h2>
                <p className="text-gray-600 leading-relaxed">
                  {t('pages.misyonVizyon.visionDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">{t('pages.misyonVizyon.valuesTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {valueKeys.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <v.icon size={28} className="text-secondary" />
                </div>
                <h3 className="font-bold text-primary mb-2">{t(`pages.misyonVizyon.${v.titleKey}`)}</h3>
                <p className="text-gray-500 text-sm">{t(`pages.misyonVizyon.${v.descKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default MisyonVizyon
