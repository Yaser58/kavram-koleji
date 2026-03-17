import { useTranslation } from 'react-i18next'
import { Award, Target, FileCheck } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const goalKeys = ['goal1', 'goal2', 'goal3', 'goal4']

const Kalite = () => {
  const { t } = useTranslation()
  return (
    <MainWrapper>
      <PageBanner title={t('pages.kalite.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.kalite.title') }]} />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-4 mb-12">
            <Award size={48} className="text-secondary" />
            <div>
              <h2 className="text-2xl font-bold text-primary">{t('pages.kalite.policyTitle')}</h2>
              <p className="text-gray-500">{t('pages.kalite.policyDesc')}</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              <Target size={32} className="text-primary mb-4" />
              <h3 className="font-bold text-primary text-lg mb-4">{t('pages.kalite.goalsTitle')}</h3>
              <ul className="space-y-2 text-gray-600">
                {goalKeys.map((key) => (
                  <li key={key}>• {t(`pages.kalite.${key}`)}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              <FileCheck size={32} className="text-secondary mb-4" />
              <h3 className="font-bold text-primary text-lg mb-4">{t('pages.kalite.accreditationTitle')}</h3>
              <p className="text-gray-600">
                {t('pages.kalite.accreditationDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default Kalite
