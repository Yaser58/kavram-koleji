import { useTranslation } from 'react-i18next'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const KVKK = () => {
  const { t } = useTranslation()
  return (
    <MainWrapper>
      <PageBanner title={t('pages.kvkk.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.kvkk.title') }]} />
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-bold text-primary mb-4">{t('pages.kvkk.mainTitle')}</h2>
            <div className="text-gray-600 leading-relaxed space-y-4 text-sm">
              <p>{t('pages.kvkk.intro1')}</p>
              <p>{t('pages.kvkk.intro2')}</p>
              <h3 className="text-lg font-bold text-primary mt-8 mb-3">{t('pages.kvkk.section1Title')}</h3>
              <p>{t('pages.kvkk.section1Desc')}</p>
              <h3 className="text-lg font-bold text-primary mt-8 mb-3">{t('pages.kvkk.section2Title')}</h3>
              <p>{t('pages.kvkk.section2Desc')}</p>
              <h3 className="text-lg font-bold text-primary mt-8 mb-3">{t('pages.kvkk.section3Title')}</h3>
              <p>{t('pages.kvkk.section3Desc')}</p>
              <h3 className="text-lg font-bold text-primary mt-8 mb-3">{t('pages.kvkk.section4Title')}</h3>
              <p>{t('pages.kvkk.section4Desc')}</p>
              <h3 className="text-lg font-bold text-primary mt-8 mb-3">{t('pages.kvkk.section5Title')}</h3>
              <p>{t('pages.kvkk.section5Desc')}</p>
              <h3 className="text-lg font-bold text-primary mt-8 mb-3">{t('pages.kvkk.section6Title')}</h3>
              <p>{t('pages.kvkk.section6Desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default KVKK
