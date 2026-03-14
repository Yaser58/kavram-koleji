import { BookOpen, Award, Users, GraduationCap, Target, Star } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const milestones = [
  { year: '1974', title: 'Kuruluş', desc: 'Kurucumuz Bahattin DURMUŞ önderliğinde Kavram Eğitim Kurumları\'nın temelleri atıldı.' },
  { year: '1980\'ler', title: 'Büyüme', desc: 'İstanbul\'da ilk şubelerimiz açıldı, eğitim kalitesiyle fark yarattık.' },
  { year: '1990\'lar', title: 'Yayılım', desc: 'Türkiye genelinde yeni kampüsler, Kavram Yayınları ile güçlü eğitim altyapısı.' },
  { year: '2000\'ler', title: 'Dijital Dönüşüm', desc: 'Teknoloji destekli eğitim, akıllı sınıflar ve dijital öğrenme platformları.' },
  { year: '2010\'lar', title: 'Kolej Açılımı', desc: 'Kavram Koleji markasıyla okul öncesinden liseye tam kademeli eğitim.' },
  { year: '2020\'ler', title: '1 Milyon+ Mezun', desc: 'Yarım asrı aşan tecrübemizle 1.000.000\'dan fazla mezun yetiştirdik.' },
]

const values = [
  { icon: Award, title: 'Kaliteli Eğitim', desc: 'Her öğrenciye en iyi eğitimi sunma misyonuyla hareket ediyoruz.' },
  { icon: Users, title: 'Toplumsal Değer', desc: 'Eğitimde fırsat eşitliği ve toplumsal gelişime katkı.' },
  { icon: Target, title: 'Hedef Odaklı', desc: 'Öğrencilerimizi hedeflerine ulaştırmak için sürekli gelişim.' },
  { icon: Star, title: 'Başarı Kültürü', desc: 'Akademik, sportif ve kültürel alanlarda mükemmellik.' },
]

const Tarihcemiz = () => {
  return (
    <MainWrapper>
      <PageBanner title="Tarihçemiz" breadcrumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'Tarihçemiz' }]} />
      
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center">
              <BookOpen size={32} className="text-secondary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">1974'ten Bugüne Kavram</h2>
              <p className="text-gray-500">Kurucumuz Bahattin DURMUŞ ile başlayan eğitim yolculuğumuz</p>
            </div>
          </div>
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>1974 yılında kurucumuz <strong className="text-primary">Bahattin DURMUŞ</strong> önderliğinde temelleri atılan Kavram Eğitim Kurumları, yarım asrı aşan tecrübesiyle Türkiye'nin önde gelen eğitim kurumlarından biri haline gelmiştir.</p>
            <p>1.000.000'u aşan mezunumuzla, her öğrencinin iyi bir eğitimi hak ettiğine inanarak yolumuza devam ediyoruz. Tarafsızlığı ilke edinen ve bizimle aynı eğitim tutkusunu paylaşan öğretmenlerimizle, hedeflerine ulaşmak isteyen on binlerce öğrencinin pusulası olduk.</p>
            <p>"Aynı başarı, bambaşka bir Kavram!" diyerek bugünün çocuklarının dilinden anlayan bir perspektif ile eğitime yön vermeye devam ediyoruz.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">Kronolojik Tarihçe</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-secondary/30 hidden md:block" />
              {milestones.map((m, i) => (
                <div key={i} className="relative flex gap-8 mb-12 last:mb-0">
                  <div className="hidden md:flex w-16 justify-center flex-shrink-0">
                    <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm">{m.year}</div>
                  </div>
                  <div className="flex-1 bg-white rounded-2xl shadow-md p-6 md:ml-0">
                    <span className="md:hidden inline-block bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">{m.year}</span>
                    <h3 className="text-lg font-bold text-primary mb-2">{m.title}</h3>
                    <p className="text-gray-600">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">Değerlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-100 hover:shadow-lg hover:border-secondary/30 transition">
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <v.icon size={28} className="text-secondary" />
                </div>
                <h3 className="font-bold text-primary mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <GraduationCap size={64} className="mx-auto mb-6 text-secondary" />
          <h2 className="text-2xl md:text-4xl font-bold mb-4">1.000.000+ Mezun</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">Yarım asrı aşan eğitim tecrübemizle Türkiye'nin dört bir yanında başarı hikayeleri yazıyoruz.</p>
        </div>
      </section>
    </MainWrapper>
  )
}

export default Tarihcemiz
