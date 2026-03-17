import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Calendar, Send } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'
import api from '../../lib/api'

const Randevu = () => {
  const { t } = useTranslation()
  const [form, setForm] = useState({ adSoyad: '', email: '', telefon: '', tarih: '', saat: '', konu: '', mesaj: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await api.post('/main/contact-request/randevu', form)
      setSent(true)
      setForm({ adSoyad: '', email: '', telefon: '', tarih: '', saat: '', konu: '', mesaj: '' })
    } catch {
      alert(t('pages.randevu.submitError'))
    } finally {
      setSending(false)
    }
  }

  return (
    <MainWrapper>
      <PageBanner title={t('pages.randevu.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.randevu.title') }]} />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <Calendar size={40} className="text-secondary mb-4" />
            <p className="text-gray-600">
              {t('pages.randevu.intro')}
            </p>
          </div>

          {sent ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <p className="text-green-700 font-semibold">{t('pages.randevu.requestReceived')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.randevu.nameLabel')}</label>
                <input type="text" required value={form.adSoyad} onChange={e => setForm({ ...form, adSoyad: e.target.value })} className="w-full px-4 py-3 border rounded-xl" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.randevu.emailLabel')}</label>
                  <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 border rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.randevu.phoneLabel')}</label>
                  <input type="tel" required value={form.telefon} onChange={e => setForm({ ...form, telefon: e.target.value })} className="w-full px-4 py-3 border rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.randevu.dateLabel')}</label>
                  <input type="date" value={form.tarih} onChange={e => setForm({ ...form, tarih: e.target.value })} className="w-full px-4 py-3 border rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.randevu.timeLabel')}</label>
                  <input type="time" value={form.saat} onChange={e => setForm({ ...form, saat: e.target.value })} className="w-full px-4 py-3 border rounded-xl" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.randevu.subjectLabel')}</label>
                <input type="text" required value={form.konu} onChange={e => setForm({ ...form, konu: e.target.value })} className="w-full px-4 py-3 border rounded-xl" placeholder={t('pages.randevu.subjectPlaceholder')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.randevu.messageLabel')}</label>
                <textarea rows={4} value={form.mesaj} onChange={e => setForm({ ...form, mesaj: e.target.value })} className="w-full px-4 py-3 border rounded-xl" />
              </div>
              <button type="submit" disabled={sending} className="flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary transition disabled:opacity-50">
                <Send size={18} /> {sending ? t('common.sending') : t('pages.randevu.submitRequest')}
              </button>
            </form>
          )}
        </div>
      </section>
    </MainWrapper>
  )
}

export default Randevu
