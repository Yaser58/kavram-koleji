import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Phone, Send, CheckCircle, Building2, GraduationCap, TrendingUp, Shield } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'
import { turkishCities } from '../../data/turkishCities'

const benefits = [
  { icon: GraduationCap, title: 'Köklü Eğitim Tecrübesi', desc: '1974\'den bu yana yarım asrı aşan eğitim birikimi ve kanıtlanmış başarı.' },
  { icon: Building2, title: 'Güçlü Marka Değeri', desc: 'Türkiye genelinde tanınan ve güvenilen Kavram markası ile yatırımınızı güvence altına alın.' },
  { icon: TrendingUp, title: 'Yüksek Başarı Oranı', desc: 'YKS ve LGS sınavlarında üstün başarı oranları ile velilerin ilk tercihi.' },
  { icon: Shield, title: 'Tam Destek Modeli', desc: 'Eğitim müfredatı, yönetim, pazarlama ve operasyonel süreçlerde tam destek.' },
]

const Franchise = () => {
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

  return (
    <MainWrapper>
      <PageBanner 
        title={franchiseType ? `${franchiseType} Franchise` : 'Franchise'} 
        breadcrumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'Franchise' }]} 
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Franchise Politikamız</h2>
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
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">Neden Kavram Franchise?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <b.icon size={28} className="text-secondary" />
                </div>
                <h3 className="font-bold text-primary mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl font-bold text-primary mb-2 text-center">
            {franchiseType ? `${franchiseType} Franchise Başvurusu` : 'Kavram Yatırım Ortaklığı Başvurusu'}
          </h2>
          <p className="text-gray-500 text-center mb-8">Eğitimin gücüne inanan vizyoner profesyonellerle birlikte büyümek istiyoruz.</p>

          {sent ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-700 mb-2">Başvurunuz Alındı</h3>
              <p className="text-green-600">En kısa sürede sizinle iletişime geçeceğiz.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {!franchiseType && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Başvurmak İstediğiniz Tür</label>
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition">
                    <option value="Okul">Okul Franchise</option>
                    <option value="Kurs">Kurs Franchise</option>
                  </select>
                </div>
              )}
              <input type="text" placeholder="Adınız Soyadınız *" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="email" placeholder="E-posta *" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
                <input type="tel" placeholder="Telefon *" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">İl *</label>
                <select required value={form.city} onChange={e => setForm({...form, city: e.target.value, district: ''})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition">
                  <option value="">İl seçiniz</option>
                  {turkishCities.map(c => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              {selectedCity && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">İlçe</label>
                  <select value={form.district} onChange={e => setForm({...form, district: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition">
                    <option value="">İlçe seçiniz (opsiyonel)</option>
                    {selectedCity.districts.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              )}
              <textarea placeholder="Mesajınız" rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition resize-none" />
              <button type="submit" className="w-full bg-secondary text-white py-3 rounded-full font-semibold hover:bg-primary transition flex items-center justify-center gap-2">
                <Send size={18} /> Başvuru Gönder
              </button>
            </form>
          )}
          <p className="text-center text-gray-400 text-sm mt-6 flex items-center justify-center gap-2">
            <Phone size={14} /> İrtibat: <a href="tel:+905455377281" className="text-secondary hover:text-primary transition">0545 537 72 81</a>
          </p>
        </div>
      </section>
    </MainWrapper>
  )
}

export default Franchise