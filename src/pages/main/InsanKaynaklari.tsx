import { useState } from 'react'
import { Send, CheckCircle, Heart, Users, BookOpen, Lightbulb } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const values = [
  { icon: Heart, title: 'Eğitime Tutku', desc: 'Öğrenmeye ve öğretmeye tutkuyla bağlı çalışma arkadaşları arıyoruz.' },
  { icon: Users, title: 'Takım Ruhu', desc: 'Birlikte başarmanın gücüne inanan, işbirliğine açık bir ekip.' },
  { icon: BookOpen, title: 'Sürekli Gelişim', desc: 'Mesleki gelişim programları ve eğitim fırsatları ile kendinizi geliştirin.' },
  { icon: Lightbulb, title: 'Yenilikçi Yaklaşım', desc: 'Çağdaş eğitim yöntemlerini benimseyen, yenilikçi fikirlerinize değer veriyoruz.' },
]

const InsanKaynaklari = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', position: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <MainWrapper>
      <PageBanner title="İnsan Kaynakları" breadcrumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'İnsan Kaynakları' }]} />
      
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">İnsan Kaynakları Politikamız</h2>
          <h3 className="text-xl text-secondary font-semibold mb-4">Çağdaş Eğitimcilere, Bambaşka Bir Kariyer Fırsatı!</h3>
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>1974 yılından itibaren ve sayısı 1.000.000'i aşan mezunumuzdan biliyoruz ki kaliteli eğitim, köklü bir deneyimle mümkündür.</p>
            <p>Tarafsızlığı ilke edinen ve bizimle aynı eğitim tutkusunu paylaşan öğretmenlerimizle, hedeflerine ulaşmak isteyen on binlerce öğrencinin pusulası olduk.</p>
            <p>"Aynı başarı, bambaşka bir Kavram!" diyerek bugünün çocuklarının dilinden anlayan bir perspektif ile eğitime yön vermeye devam ediyoruz.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary text-center mb-12">Neden Kavram'da Çalışmalısınız?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <v.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-bold text-primary mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl font-bold text-primary mb-2 text-center">Kariyer Başvurusu</h2>
          <p className="text-gray-500 text-center mb-8">Kavram ailesine katılmak için başvurunuzu yapın.</p>

          {sent ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-700 mb-2">Başvurunuz Alındı</h3>
              <p className="text-green-600">İnsan Kaynakları ekibimiz başvurunuzu değerlendirecektir.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="text" placeholder="Adınız Soyadınız *" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="email" placeholder="E-posta *" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
                <input type="tel" placeholder="Telefon *" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
              </div>
              <input type="text" placeholder="Başvurulan Pozisyon *" required value={form.position} onChange={e => setForm({...form, position: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition" />
              <textarea placeholder="Kendinizi kısaca tanıtın" rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition resize-none" />
              <button type="submit" className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-secondary transition flex items-center justify-center gap-2">
                <Send size={18} /> Başvuru Gönder
              </button>
            </form>
          )}
        </div>
      </section>
    </MainWrapper>
  )
}

export default InsanKaynaklari