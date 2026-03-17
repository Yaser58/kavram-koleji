import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FileText, Send } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'
import api from '../../lib/api'

const BilgiEdinme = () => {
  const { t } = useTranslation()
  const [form, setForm] = useState({ adSoyad: '', tcKimlik: '', email: '', telefon: '', konu: '', aciklama: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await api.post('/main/contact-request/bilgi-edinme', form)
      setSent(true)
      setForm({ adSoyad: '', tcKimlik: '', email: '', telefon: '', konu: '', aciklama: '' })
    } catch {
      alert(t('pages.bilgiEdinme.submitError'))
    } finally {
      setSending(false)
    }
  }

  return (
    <MainWrapper>
      <PageBanner title={t('pages.bilgiEdinme.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.bilgiEdinme.title') }]} />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <FileText size={40} className="text-secondary mb-4" />
            <p className="text-gray-600">
              {t('pages.bilgiEdinme.intro')}
            </p>
          </div>

          {sent ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <p className="text-green-700 font-semibold">{t('pages.bilgiEdinme.requestReceived')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.bilgiEdinme.nameLabel')}</label>
                <input type="text" required value={form.adSoyad} onChange={e => setForm({ ...form, adSoyad: e.target.value })} className="w-full px-4 py-3 border rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.bilgiEdinme.tcLabel')}</label>
                <input type="text" value={form.tcKimlik} onChange={e => setForm({ ...form, tcKimlik: e.target.value })} className="w-full px-4 py-3 border rounded-xl" maxLength={11} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.bilgiEdinme.emailLabel')}</label>
                  <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 border rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.bilgiEdinme.phoneLabel')}</label>
                  <input type="tel" value={form.telefon} onChange={e => setForm({ ...form, telefon: e.target.value })} className="w-full px-4 py-3 border rounded-xl" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.bilgiEdinme.subjectLabel')}</label>
                <input type="text" required value={form.konu} onChange={e => setForm({ ...form, konu: e.target.value })} className="w-full px-4 py-3 border rounded-xl" placeholder={t('pages.bilgiEdinme.subjectPlaceholder')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.bilgiEdinme.descriptionLabel')}</label>
                <textarea required rows={5} value={form.aciklama} onChange={e => setForm({ ...form, aciklama: e.target.value })} className="w-full px-4 py-3 border rounded-xl" />
              </div>
              <button type="submit" disabled={sending} className="flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary transition disabled:opacity-50">
                <Send size={18} /> {sending ? t('common.sending') : t('pages.bilgiEdinme.submitRequest')}
              </button>
            </form>
          )}
        </div>
      </section>
    </MainWrapper>
  )
}

export default BilgiEdinme
