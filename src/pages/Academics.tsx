import { BookOpen, Clock, Users, Trophy, Target, Lightbulb } from 'lucide-react'

const programs = [
  {
    icon: BookOpen,
    title: 'YKS Hazırlık',
    description: 'Üniversite sınavlarına yönelik kapsamlı hazırlık programı'
  },
  {
    icon: Clock,
    title: 'Etüt Programı',
    description: 'Hafta içi ve hafta sonu etüt çalışmaları'
  },
  {
    icon: Users,
    title: 'Birebir Koçluk',
    description: 'Her öğrenciye özel akademik danışmanlık'
  },
  {
    icon: Target,
    title: 'Deneme Sınavları',
    description: 'Düzenli deneme sınavları ve analiz raporları'
  },
  {
    icon: Lightbulb,
    title: 'Proje Tabanlı Öğrenme',
    description: 'Uygulamalı ve proje odaklı eğitim yaklaşımı'
  },
  {
    icon: Trophy,
    title: 'Olimpiyat Hazırlık',
    description: 'Ulusal ve uluslararası olimpiyatlara hazırlık'
  }
]

const achievements = [
  { year: '2025', title: 'U-16 Türkiye Şampiyonası - 2 Altın Madalya' },
  { year: '2024', title: 'YKS İlk 1000 - 5 Öğrenci' },
  { year: '2024', title: 'TÜBİTAK Proje Yarışması - Birincilik' },
  { year: '2023', title: 'Matematik Olimpiyatı - Gümüş Madalya' },
]

const Academics = () => {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Akademik</h1>
          <p className="text-xl text-gray-300">Eğitim Programlarımız ve Başarılarımız</p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary font-semibold mb-2">Programlarımız</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Eğitim Programları</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg card-hover border border-gray-100">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <program.icon size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{program.title}</h3>
                <p className="text-gray-600">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section id="basarilar" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary font-semibold mb-2">Başarılarımız</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Gurur Tablomuz</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {achievements.map((item, index) => (
              <div key={index} className="flex items-center gap-6 bg-white p-6 rounded-xl shadow-md mb-4">
                <div className="w-20 h-20 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">{item.year}</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary text-lg">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Başarı Hikayemizin Bir Parçası Olun
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Öğrencilerimizin akademik başarılarına siz de tanık olun. Kayıt için hemen iletişime geçin.
          </p>
          <a
            href="/iletisim"
            className="inline-block bg-secondary text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition"
          >
            İletişime Geç
          </a>
        </div>
      </section>
    </>
  )
}

export default Academics
