import { Trophy, TrendingUp, Users, Award, Star, Target } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const stats = [
  { icon: Trophy, value: '50+', label: 'Yıllık Tecrübe', color: 'bg-yellow-500' },
  { icon: Users, value: '1.000.000+', label: 'Mezun Sayısı', color: 'bg-blue-500' },
  { icon: TrendingUp, value: '%95', label: 'Üniversiteye Yerleşme', color: 'bg-green-500' },
  { icon: Award, value: '13+', label: 'Kampüs', color: 'bg-purple-500' },
]

const achievements = [
  { title: 'YKS Başarısı', desc: 'Her yıl yüzlerce öğrencimiz Türkiye\'nin en prestijli üniversitelerine yerleşmektedir.', icon: Star },
  { title: 'LGS Başarısı', desc: 'LGS sınavlarında bölge ve il birincilikleri ile öğrencilerimiz üstün başarılar elde etmektedir.', icon: Target },
  { title: 'Olimpiyat Başarıları', desc: 'Ulusal ve uluslararası bilim olimpiyatlarında öğrencilerimiz madalyalar kazanmaktadır.', icon: Trophy },
  { title: 'Spor Başarıları', desc: 'Okul sporlarında il ve Türkiye şampiyonlukları ile sportif alanda da başarılarını kanıtlamaktadır.', icon: Award },
  { title: 'Sanat ve Kültür', desc: 'Resim, müzik, tiyatro ve edebiyat alanlarında ulusal yarışmalarda dereceler elde edilmektedir.', icon: Star },
  { title: 'Proje Yarışmaları', desc: 'TÜBİTAK ve uluslararası proje yarışmalarında öğrencilerimiz ödüller kazanmaktadır.', icon: Target },
]

const Basarilarimiz = () => {
  return (
    <MainWrapper>
      <PageBanner title="Başarılarımız" breadcrumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'Başarılarımız' }]} />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
                <div className={`w-14 h-14 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon size={28} className="text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</h3>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Başarı Alanlarımız</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Kavram Koleji olarak akademik, sportif ve kültürel alanlarda öğrencilerimizin başarılarıyla gurur duyuyoruz.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-lg hover:border-secondary/30 transition group">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition">
                  <item.icon size={24} className="text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default Basarilarimiz