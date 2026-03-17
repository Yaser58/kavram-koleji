import { useTranslation } from 'react-i18next'
import { FileText, GraduationCap, BookOpen, CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const lgsStepKeys = [
  { titleKey: 'step1', descKey: 'step1Desc' },
  { titleKey: 'step2', descKey: 'step2Desc' },
  { titleKey: 'step3', descKey: 'step3Desc' },
]

const liseStepKeys = [
  { titleKey: 'liseStep1', descKey: 'liseStep1Desc' },
  { titleKey: 'liseStep2', descKey: 'liseStep2Desc' },
  { titleKey: 'liseStep3', descKey: 'liseStep3Desc' },
]

const AdayTercihRehberi = () => {
  const { t } = useTranslation()
  return (
    <MainWrapper>
      <PageBanner title={t('pages.adayTercihRehberi.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.adayTercihRehberi.breadcrumb') }]} />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center">
              <FileText size={32} className="text-secondary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary">{t('pages.adayTercihRehberi.packageTitle')}</h2>
              <p className="text-gray-500">{t('pages.adayTercihRehberi.packageDesc')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              <GraduationCap size={40} className="text-primary mb-4" />
              <h3 className="font-bold text-primary text-lg mb-4">{t('pages.adayTercihRehberi.preschoolTitle')}</h3>
              <p className="text-gray-600 mb-6">{t('pages.adayTercihRehberi.preschoolDesc')}</p>
              <ul className="space-y-3 mb-6">
                {lgsStepKeys.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-800">{t(`pages.adayTercihRehberi.${s.titleKey}`)}</span>
                      <p className="text-gray-500 text-sm">{t(`pages.adayTercihRehberi.${s.descKey}`)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/kayit" className="inline-flex items-center gap-2 text-secondary font-semibold hover:text-primary transition">
                {t('pages.adayTercihRehberi.registerForm')} <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              <BookOpen size={40} className="text-secondary mb-4" />
              <h3 className="font-bold text-primary text-lg mb-4">{t('pages.adayTercihRehberi.liseTitle')}</h3>
              <p className="text-gray-600 mb-6">{t('pages.adayTercihRehberi.liseDesc')}</p>
              <ul className="space-y-3 mb-6">
                {liseStepKeys.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-800">{t(`pages.adayTercihRehberi.${s.titleKey}`)}</span>
                      <p className="text-gray-500 text-sm">{t(`pages.adayTercihRehberi.${s.descKey}`)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/kayit" className="inline-flex items-center gap-2 text-secondary font-semibold hover:text-primary transition">
                {t('pages.adayTercihRehberi.registerForm')} <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="bg-primary text-white rounded-2xl p-8">
            <h3 className="font-bold text-xl mb-4">{t('pages.adayTercihRehberi.contactAppointment')}</h3>
            <p className="text-white/90 mb-6">{t('pages.adayTercihRehberi.contactAppointmentDesc')}</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/iletisim" className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-secondary hover:text-white transition">
                {t('pages.adayTercihRehberi.contact')}
              </Link>
              <Link to="/randevu" className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary transition">
                {t('pages.adayTercihRehberi.appointment')}
              </Link>
              <Link to="/kampusler" className="inline-flex items-center gap-2 border border-white/50 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition">
                {t('pages.adayTercihRehberi.campuses')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default AdayTercihRehberi
