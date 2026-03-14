import { Link } from 'react-router-dom'
import { Download, Image, FileText, Palette, CheckCircle } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const logoRules = [
  'Logo, minimum boyutların altında kullanılmamalıdır.',
  'Logo üzerinde renk değişikliği yapılmamalıdır.',
  'Logo oranları bozulmamalı, sıkıştırılmamalı veya uzatılmamalıdır.',
  'Logo arka planına ek efekt veya gölge eklenmemelidir.',
  'Logo yalnızca resmi Kavram Koleji materyallerinde kullanılmalıdır.',
]

const downloads = [
  { title: 'Kurumsal Kimlik Kılavuzu', desc: 'Logo kullanım kuralları ve marka rehberi', icon: FileText, file: '/downloads/kurumsal-kimlik.pdf' },
  { title: 'Logo Paketi', desc: 'Farklı formatlarda logo dosyaları', icon: Image, file: '/downloads/logo-paketi.zip' },
  { title: 'Katalog', desc: 'Kavram Koleji tanıtım kataloğu', icon: FileText, file: '/downloads/katalog.pdf' },
]

const KurumsalKimlik = () => {
  return (
    <MainWrapper>
      <PageBanner title="Kurumsal Kimlik" breadcrumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'Kurumsal Kimlik' }]} />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Logo Kullanım Kuralları</h2>
              <p className="text-gray-600 mb-8">Kavram Koleji logosunun doğru ve tutarlı kullanımı için aşağıdaki kurallara uyulması gerekmektedir.</p>
              <ul className="space-y-4">
                {logoRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center">
              <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100">
                <img src="/Kavram-logo.png" alt="Kavram Koleji Logo" className="w-64 h-auto object-contain" />
              </div>
              <p className="text-gray-500 text-sm mt-4 text-center">Resmi Kavram Koleji logosu</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-4">İndirilebilir Materyaller</h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">Kurumsal kimlik materyallerimizi ve kataloglarımızı indirebilirsiniz.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {downloads.map((item, i) => (
              <a key={i} href={item.file} download className="group bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg hover:border-secondary/30 transition flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition">
                  <item.icon size={28} className="text-secondary" />
                </div>
                <h3 className="font-bold text-primary mb-2 group-hover:text-secondary transition">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
                <span className="inline-flex items-center gap-2 text-secondary font-semibold text-sm">
                  <Download size={16} /> İndir
                </span>
              </a>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-8">Materyaller hazırlanmaktadır. İndirme linkleri yakında aktif olacaktır.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <Palette size={48} className="mx-auto text-secondary mb-4" />
          <h2 className="text-xl font-bold text-primary mb-2">Kurumsal Kimlik Talebi</h2>
          <p className="text-gray-500 mb-6 max-w-xl mx-auto">Logo veya kurumsal materyal kullanımı için özel talepleriniz varsa bizimle iletişime geçin.</p>
          <Link to="/iletisim" className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary transition">
            İletişime Geç
          </Link>
        </div>
      </section>
    </MainWrapper>
  )
}

export default KurumsalKimlik
