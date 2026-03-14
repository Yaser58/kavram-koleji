import { Camera, BookOpen, FlaskConical, Monitor, Dumbbell } from 'lucide-react'

const areas = [
  { icon: BookOpen, title: 'Kütüphane', desc: 'Modern ve zengin kaynaklı kütüphanemiz' },
  { icon: FlaskConical, title: 'Fen Laboratuvarı', desc: 'Tam donanımlı fen ve teknoloji laboratuvarı' },
  { icon: Monitor, title: 'Bilişim Sınıfı', desc: 'Son teknoloji bilgisayar laboratuvarı' },
  { icon: Dumbbell, title: 'Spor Salonu', desc: 'Kapalı spor salonu ve fitness alanı' },
  { icon: Camera, title: 'Sanat Atölyesi', desc: 'Görsel sanatlar ve müzik atölyesi' },
]

const CampusTour = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-secondary font-semibold mb-2">Kampüsümüz</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Kampüs Alanlarımız</h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Öğrencilerimize en iyi eğitim ortamını sunmak için tasarlanmış modern kampüsümüzü keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {areas.map((area, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 text-center card-hover group cursor-pointer">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition">
                <area.icon size={28} className="text-primary group-hover:text-secondary transition" />
              </div>
              <h3 className="font-bold text-primary mb-2">{area.title}</h3>
              <p className="text-gray-500 text-sm">{area.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Kampüsümüzü Yerinde Görün</h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Okulumuzun fiziksel ortamını görmek ve eğitim kadromuzla tanışmak için randevu alabilirsiniz.
          </p>
          <a
            href="tel:+902667146464"
            className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition"
          >
            Randevu Al: (0266) 714 64 64
          </a>
        </div>
      </div>
    </section>
  )
}

export default CampusTour
