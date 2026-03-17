import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Phone, Send, CheckCircle, Building2, GraduationCap, TrendingUp, Shield } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'
import { turkishCities } from '../../data/turkishCities'

const benefits = [
  { icon: GraduationCap, titleKey: 'benefit1', descKey: 'benefit1Desc' },
  { icon: Building2, titleKey: 'benefit2', descKey: 'benefit2Desc' },
  { icon: TrendingUp, titleKey: 'benefit3', descKey: 'benefit3Desc' },
  { icon: Shield, titleKey: 'benefit4', descKey: 'benefit4Desc' },
]

const Franchise = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const isKurs = location.pathname.includes('/kurs')
  const isOkul = location.pathname.includes('/okul')
  const franchiseType = isKurs ? 'Kurs' : isOkul ? 'Okul' : ''
  
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', district: '', message: '', type: franchiseType || 'Okul' })
  const selectedCity = turkishCities.find(c => c.name === form.city)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const pageTitle = isKurs ? t('pages.franchise.kursFranchise') : isOkul ? t('pages.franchise.okulFranchise') : t('pages.franchise.title')

  return (
    <MainWrapper>
      <PageBanner 
        title={pageTitle} 
        breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.franchise.title') }]} 
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">{t('pages.franchise.policyTitle')}</h2>
            <div className="text-gray-600 leading-relaxed space-y-4">
              <p>Her gününden ayrı bir ders çıkardığımız 1974'den beri biliyoruz ki kaliteli eğitim, köklü bir deneyimle mümkündür. Bilimde çağdaş, fikirde özgür kalan nesiller için her çağın ihtiyacını dikkate alarak eğitim-öğretim faaliyetlerini gerçekleştirdik.</p>
              <p>Kuruluşumuzun ilk gününden itibaren, her öğrencinin iyi bir eğitimi hak ettiğine inandık. Tarafsızlığı ilke edinen ve bizimle aynı eğitim tutkusunu paylaşan öğretmenlerimizle, hedeflerine ulaşmak isteyen on binlerce öğrencinin pusulası olduk.</p>
              <p>"Aynı Başarı, Bambaşka bir Kavram!" diyerek bugünün çocuklarının dilinden anlayan bir perspektif ile Türkiye'nin dört bir yanındaki eğitim kurumlarımız aracılığıyla eğitime yön vermeye devam ediyoruz.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">{t('pages.franchise.whyTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <b.icon size={28} className="text-secondary" />
                </div>
                <h3 className="font-bold text-primary mb-2">{t(`pages.franchise.${b.titleKey}`)}</h3>
                <p className="text-gray-500 text-sm">{t(`pages.franchise.${b.descKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl font-bold text-primary mb-2 text-center">
            {franchiseType ? `${franchiseType} ${t('pages.franchise.title')} Başvurusu` : t('pages.franchise.applicationTitle')}
          </h2>
          <p className="text-gray-500 text-center mb-8">{t('pages.franchise.applicationSubtitle')}</p>

          {sent ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-700 mb-2">{t('pages.franchise.applicationReceived')}</h3>
              <p className="text-green-600">{t('pages.franchise.applicationReceivedDesc')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {!franchiseType && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.franchise.typeLabel')}</label>
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition">
                    <option value="Okul">{t('pages.franchise.schoolOption')}</option>
                    <option value="Kurs">{t('pages.franchise.courseOption')}</option>
                  </select>
                </div>
              )}
              <input type="text" placeholder={t('pages.franchise.namePlaceholder')} required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="email" placeholder={t('pages.franchise.emailPlaceholder')} required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
                <input type="tel" placeholder={t('pages.franchise.phonePlaceholder')} required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.franchise.cityLabel')}</label>
                <select required value={form.city} onChange={e => setForm({...form, city: e.target.value, district: ''})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition">
                  <option value="">{t('pages.franchise.cityPlaceholder')}</option>
                  {turkishCities.map(c => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              {selectedCity && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.franchise.districtLabel')}</label>
                  <select value={form.district} onChange={e => setForm({...form, district: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition">
                    <option value="">{t('pages.franchise.districtPlaceholder')}</option>
                    {selectedCity.districts.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              )}
              <textarea placeholder={t('pages.franchise.messagePlaceholder')} rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition resize-none" />
              <button type="submit" className="w-full bg-secondary text-white py-3 rounded-full font-semibold hover:bg-primary transition flex items-center justify-center gap-2">
                <Send size={18} /> {t('pages.franchise.submitApplication')}
              </button>
            </form>
          )}
          <p className="text-center text-gray-400 text-sm mt-6 flex items-center justify-center gap-2">
            <Phone size={14} /> {t('pages.franchise.contact')}: <a href="tel:+905455377281" className="text-secondary hover:text-primary transition">0545 537 72 81</a>
          </p>
        </div>
      </section>
    </MainWrapper>
  )
}

export default Franchise
