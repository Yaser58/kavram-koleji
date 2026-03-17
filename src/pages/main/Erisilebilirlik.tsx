import { useTranslation } from 'react-i18next'
import { Accessibility, CheckCircle } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const complianceKeys = ['compliance1', 'compliance2', 'compliance3', 'compliance4', 'compliance5', 'compliance6']

const Erisilebilirlik = () => {
  const { t } = useTranslation()
  return (
    <MainWrapper>
      <PageBanner title={t('pages.erisilebilirlik.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.erisilebilirlik.title') }]} />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Accessibility size={48} className="text-secondary" />
            <div>
              <h2 className="text-2xl font-bold text-primary">{t('pages.erisilebilirlik.declarationTitle')}</h2>
              <p className="text-gray-500">{t('pages.erisilebilirlik.declarationDesc')}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 space-y-6">
            <p className="text-gray-600 leading-relaxed">
              {t('pages.erisilebilirlik.intro')}
            </p>
            <h3 className="font-bold text-primary text-lg">{t('pages.erisilebilirlik.complianceTitle')}</h3>
            <ul className="space-y-2">
              {complianceKeys.map((key, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                  <span>{t(`pages.erisilebilirlik.${key}`)}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-500 text-sm">
              {t('pages.erisilebilirlik.feedbackNote')}
            </p>
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default Erisilebilirlik
