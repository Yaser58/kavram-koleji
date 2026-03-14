import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, MapPin, Phone, Send, CheckCircle } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'
import api from '../../lib/api'

interface BranchInfo { _id: string; name: string; slug: string; city?: string; phone?: string }

const siniflar = ['Anaokulu', '1. Sınıf', '2. Sınıf', '3. Sınıf', '4. Sınıf', '5. Sınıf', '6. Sınıf', '7. Sınıf', '8. Sınıf', '9. Sınıf', '10. Sınıf', '11. Sınıf', '12. Sınıf', 'Mezun']

const MainKayit = () => {
  const [branches, setBranches] = useState<BranchInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', phone: '', email: '', campus: '', sinif: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    api.get('/branches').then(setBranches).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await api.post('/main/contact', { ...form, subject: 'Kayıt Başvurusu' })
      setSent(true)
    } catch { alert('Başvurunuz gönderilemedi. Lütfen tekrar deneyin.') } finally { setSending(false) }
  }

  return (
    <MainWrapper>
      <PageBanner title="Kavram'a Kayıt" breadcrumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: "Kavram'a Kayıt" }]} />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Online Kayıt Başvurusu</h2>
              <p className="text-gray-500 mb-8">Aşağıdaki formu doldurarak kayıt başvurusu yapabilirsiniz. İlgili kampüsümüz sizinle iletişime geçecektir.</p>
              {sent ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-700 mb-2">Başvurunuz Alındı</h3>
                  <p className="text-green-600">Seçtiğiniz kampüs en kısa sürede sizinle iletişime geçecektir.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <input type="text" placeholder="Adınız Soyadınız *" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input type="email" placeholder="E-posta *" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
                    <input type="tel" placeholder="Telefon *" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kampüs Seçimi *</label>
                    <select required value={form.campus} onChange={e => setForm({...form, campus: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition">
                      <option value="">Kampüs seçiniz</option>
                      {branches.map(b => (
                        <option key={b._id} value={b._id}>{b.name}{b.city ? ` - ${b.city}` : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sınıf / Kademe</label>
                    <select value={form.sinif} onChange={e => setForm({...form, sinif: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition">
                      <option value="">Sınıf seçiniz</option>
                      {siniflar.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <textarea placeholder="Ek bilgi veya sorularınız" rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition resize-none" />
                  <button type="submit" disabled={sending} className="w-full bg-secondary text-white py-3 rounded-full font-semibold hover:bg-primary transition flex items-center justify-center gap-2 disabled:opacity-50">
                    <Send size={18} /> {sending ? 'Gönderiliyor...' : 'Başvuru Gönder'}
                  </button>
                </form>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Kampüslerimizi Keşfedin</h2>
              <p className="text-gray-500 mb-6">Kayıt işlemi için size en yakın kampüsümüzü seçin veya kampüs sayfasından doğrudan iletişime geçin.</p>
              {loading ? (
                <div className="flex justify-center py-10"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
              ) : (
                <div className="space-y-4">
                  {branches.map(b => (
                    <Link to={`/${b.slug}/kayit`} key={b._id} className="group flex items-center gap-4 bg-white rounded-xl shadow-md border border-gray-100 p-4 hover:shadow-lg hover:border-secondary/30 transition">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <GraduationCap size={24} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-primary group-hover:text-secondary transition">{b.name}</h3>
                        <p className="text-gray-400 text-sm flex items-center gap-1"><MapPin size={12} /> {b.city}</p>
                      </div>
                      {b.phone && <p className="text-gray-500 text-sm hidden sm:block"><Phone size={14} className="text-secondary inline" /> {b.phone}</p>}
                      <ArrowRight size={18} className="text-secondary flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h3 className="text-xl font-bold text-primary mb-4">Sorularınız mı var?</h3>
          <p className="text-gray-500 mb-6">Kayıt süreciyle ilgili tüm sorularınız için bizi arayabilir veya iletişim formunu doldurabilirsiniz.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+902162101974" className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-secondary transition"><Phone size={18} /> 0216 210 19 74</a>
            <Link to="/iletisim" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition border border-gray-200">İletişim Formu <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default MainKayit