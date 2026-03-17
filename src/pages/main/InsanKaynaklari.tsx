import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Send, CheckCircle, Heart, Users, BookOpen, Lightbulb, Upload, FileText, Briefcase } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const values = [
  { icon: Heart, titleKey: 'value1', descKey: 'value1Desc' },
  { icon: Users, titleKey: 'value2', descKey: 'value2Desc' },
  { icon: BookOpen, titleKey: 'value3', descKey: 'value3Desc' },
  { icon: Lightbulb, titleKey: 'value4', descKey: 'value4Desc' },
]

const InsanKaynaklari = () => {
  const { t } = useTranslation()
  const cvInputRef = useRef<HTMLInputElement>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', position: '', message: '',
    education: '', experience: '', languages: '', reference: '', referencePhone: '',
    cvFile: null as File | null, photoFile: null as File | null
  })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <MainWrapper>
      <PageBanner title={t('pages.insanKaynaklari.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.insanKaynaklari.title') }]} />
      
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">{t('pages.insanKaynaklari.policyTitle')}</h2>
          <h3 className="text-xl text-secondary font-semibold mb-4">{t('pages.insanKaynaklari.policySubtitle')}</h3>
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>1974 yılından itibaren ve sayısı 1.000.000'i aşan mezunumuzdan biliyoruz ki kaliteli eğitim, köklü bir deneyimle mümkündür.</p>
            <p>Tarafsızlığı ilke edinen ve bizimle aynı eğitim tutkusunu paylaşan öğretmenlerimizle, hedeflerine ulaşmak isteyen on binlerce öğrencinin pusulası olduk.</p>
            <p>"Aynı başarı, bambaşka bir Kavram!" diyerek bugünün çocuklarının dilinden anlayan bir perspektif ile eğitime yön vermeye devam ediyoruz.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary text-center mb-12">{t('pages.insanKaynaklari.whyTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <v.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-bold text-primary mb-2">{t(`pages.insanKaynaklari.${v.titleKey}`)}</h3>
                <p className="text-gray-500 text-sm">{t(`pages.insanKaynaklari.${v.descKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl font-bold text-primary mb-2 text-center">{t('pages.insanKaynaklari.applicationTitle')}</h2>
          <p className="text-gray-500 text-center mb-8">{t('pages.insanKaynaklari.applicationSubtitle')}</p>

          {sent ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-700 mb-2">{t('pages.insanKaynaklari.applicationReceived')}</h3>
              <p className="text-green-600">{t('pages.insanKaynaklari.applicationReceivedDesc')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="text" placeholder={t('pages.insanKaynaklari.namePlaceholder')} required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="email" placeholder={t('pages.insanKaynaklari.emailPlaceholder')} required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
                <input type="tel" placeholder={t('pages.insanKaynaklari.phonePlaceholder')} required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
              </div>
              <input type="text" placeholder={t('pages.insanKaynaklari.positionPlaceholder')} required value={form.position} onChange={e => setForm({...form, position: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
              <input type="text" placeholder={t('pages.insanKaynaklari.educationPlaceholder')} value={form.education} onChange={e => setForm({...form, education: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
              <textarea placeholder={t('pages.insanKaynaklari.experiencePlaceholder')} rows={3} value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition resize-none" />
              <input type="text" placeholder={t('pages.insanKaynaklari.languagesPlaceholder')} value={form.languages} onChange={e => setForm({...form, languages: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.insanKaynaklari.cvUpload')}</label>
                  <input type="file" ref={cvInputRef} accept=".pdf,.doc,.docx" onChange={e => setForm({...form, cvFile: e.target.files?.[0] || null})} className="hidden" />
                  <button type="button" onClick={() => cvInputRef.current?.click()} className="w-full px-4 py-3 border border-gray-200 rounded-xl flex items-center gap-2 text-gray-600 hover:border-secondary transition">
                    <FileText size={20} className="text-secondary" /> {form.cvFile ? form.cvFile.name : t('pages.insanKaynaklari.selectFile')}
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.insanKaynaklari.photoUpload')}</label>
                  <input type="file" ref={photoInputRef} accept="image/*" onChange={e => setForm({...form, photoFile: e.target.files?.[0] || null})} className="hidden" />
                  <button type="button" onClick={() => photoInputRef.current?.click()} className="w-full px-4 py-3 border border-gray-200 rounded-xl flex items-center gap-2 text-gray-600 hover:border-secondary transition">
                    <Upload size={20} className="text-secondary" /> {form.photoFile ? form.photoFile.name : t('pages.insanKaynaklari.selectPhoto')}
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-5">
                <h4 className="font-semibold text-primary mb-3 flex items-center gap-2"><Briefcase size={18} /> {t('pages.insanKaynaklari.referenceTitle')}</h4>
                <input type="text" placeholder={t('pages.insanKaynaklari.referenceNamePlaceholder')} value={form.reference} onChange={e => setForm({...form, reference: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition mb-3" />
                <input type="tel" placeholder={t('pages.insanKaynaklari.referencePhonePlaceholder')} value={form.referencePhone} onChange={e => setForm({...form, referencePhone: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
              </div>
              <textarea placeholder={t('pages.insanKaynaklari.introPlaceholder')} rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition resize-none" />
              <button type="submit" className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-secondary transition flex items-center justify-center gap-2">
                <Send size={18} /> {t('pages.insanKaynaklari.submitApplication')}
              </button>
            </form>
          )}
        </div>
      </section>
    </MainWrapper>
  )
}

export default InsanKaynaklari
