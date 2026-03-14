import { Link } from 'react-router-dom'
import { Baby, Palette, Music, BookOpen, Heart, ArrowRight } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const features = [
  { icon: Heart, title: 'Sevgi Odaklı Eğitim', desc: 'Çocuklarımızın duygusal ve sosyal gelişimine öncelik veriyoruz.' },
  { icon: Palette, title: 'Sanat ve Yaratıcılık', desc: 'Resim, müzik ve drama ile yaratıcılığı destekliyoruz.' },
  { icon: BookOpen, title: 'Oyun Tabanlı Öğrenme', desc: 'Oyun yoluyla keşfetme ve öğrenme deneyimi sunuyoruz.' },
  { icon: Music, title: 'Müzik ve Hareket', desc: 'Ritim, dans ve müzikle motor becerileri geliştiriyoruz.' },
]

const EgitimAnaokulu = () => {
  return (
    <MainWrapper>
      <PageBanner title="Anaokulu" breadcrumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'Eğitim', to: '/egitim' }, { label: 'Anaokulu' }]} />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <div className="md:w-1/2">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                <Baby size={32} className="text-secondary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Anaokulu Eğitimimiz</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Kavram Koleji Anaokulu, 3-6 yaş grubu çocuklarımıza sevgi dolu bir ortamda, oyun tabanlı ve keşfe dayalı bir eğitim sunar. Çocuklarımızın bilişsel, duygusal, sosyal ve fiziksel gelişimini destekleyen programımızla geleceğe hazırlıyoruz.</p>
              <Link to="/kayit" className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary transition">
                Kayıt Ol <ArrowRight size={18} />
              </Link>
            </div>
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop" alt="Anaokulu" className="rounded-2xl shadow-lg w-full object-contain" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                  <f.icon size={24} className="text-secondary" />
                </div>
                <h3 className="font-bold text-primary mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default EgitimAnaokulu
