import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'
import api from '../../lib/api'

interface BranchInfo { _id: string; name: string; slug: string }

const MainIletisim = () => {
  const { t } = useTranslation()
  const [branches, setBranches] = useState<BranchInfo[]>([])
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', campus: '', kvkk: false })

  useEffect(() => {
    api.get('/branches').then(setBranches).catch(() => [])
  }, [])
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.kvkk) { alert(t('pages.iletisim.kvkkRequired')); return }
    setSending(true)
    try {
      await api.post('/main/contact', form)
      setSent(true)
    } catch { alert(t('pages.iletisim.sendError')) } finally { setSending(false) }
  }

  return (
    <MainWrapper>
      <PageBanner title={t('pages.iletisim.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.iletisim.title') }]} />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-primary mb-2">{t('pages.iletisim.formTitle')}</h2>
              <p className="text-gray-500 mb-8">{t('pages.iletisim.formDesc')}</p>
              {sent ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-700 mb-2">{t('pages.iletisim.messageSent')}</h3>
                  <p className="text-green-600">{t('pages.iletisim.messageSentDesc')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.iletisim.campusSelect')}</label>
                    <select value={form.campus} onChange={e => setForm({...form, campus: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition">
                      <option value="">{t('pages.iletisim.campusSelectPlaceholder')}</option>
                      {branches.map(b => (
                        <option key={b._id} value={b._id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input type="text" placeholder={t('pages.iletisim.namePlaceholder')} required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
                    <input type="email" placeholder={t('pages.iletisim.emailPlaceholder')} required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
                    <input type="tel" placeholder={t('pages.iletisim.phonePlaceholder')} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
                    <input type="text" placeholder={t('pages.iletisim.subjectPlaceholder')} value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
                  </div>
                  <textarea placeholder={t('pages.iletisim.messagePlaceholder')} required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition resize-none" />
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.kvkk} onChange={e => setForm({...form, kvkk: e.target.checked})} className="mt-1 w-4 h-4 accent-secondary" />
                    <span className="text-sm text-gray-500">{t('pages.iletisim.kvkkCheck')}</span>
                  </label>
                  <button type="submit" disabled={sending} className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary transition disabled:opacity-50">
                    <Send size={18} /> {sending ? t('common.sending') : t('pages.iletisim.send')}
                  </button>
                </form>
              )}
            </div>
            <div>
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-primary mb-6">{t('pages.iletisim.headOffice')}</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0"><MapPin size={20} className="text-secondary" /></div>
                    <div><p className="font-semibold text-gray-700 text-sm">{t('pages.iletisim.address')}</p><p className="text-gray-500 text-sm">Atatürk Mah. Ataşehir Bulvarı Gardenya Plaza 5, Kat 7 Ataşehir/İstanbul</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0"><Phone size={20} className="text-secondary" /></div>
                    <div><p className="font-semibold text-gray-700 text-sm">{t('pages.iletisim.phone')}</p><a href="tel:+902162101974" className="text-gray-500 text-sm hover:text-secondary transition">0216 210 19 74</a></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0"><Mail size={20} className="text-secondary" /></div>
                    <div><p className="font-semibold text-gray-700 text-sm">{t('pages.iletisim.email')}</p><a href="mailto:info@kavram.com.tr" className="text-gray-500 text-sm hover:text-secondary transition">info@kavram.com.tr</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default MainIletisim