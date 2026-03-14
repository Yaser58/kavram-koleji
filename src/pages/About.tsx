import { Target, Eye, Users, Award } from 'lucide-react'

const About = () => {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hakkımızda</h1>
          <p className="text-xl text-gray-300">Balıkesir Özel Ergün Kavram Anadolu Lisesi</p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://kavram.ventedu.com/storage/banners/62/image/file_1764925537-r4j6.jpg"
                alt="Okul Binası"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <p className="text-secondary font-semibold mb-2">Biz Kimiz?</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Eğitimde 25 Yılı Aşkın Deneyim
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Balıkesir Özel Ergün Kavram Anadolu Lisesi olarak, öğrencilerimize en kaliteli eğitimi sunmak için çalışıyoruz. Modern eğitim anlayışımız, deneyimli kadromuz ve teknolojik altyapımızla öğrencilerimizi geleceğe hazırlıyoruz.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Akademik başarının yanı sıra, öğrencilerimizin sosyal, kültürel ve sportif alanlarda da gelişimlerini destekliyoruz. Her öğrencimizin potansiyelini en üst düzeyde gerçekleştirmesi için bireysel ilgi ve rehberlik sunuyoruz.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">500+</h4>
                    <p className="text-sm text-gray-500">Öğrenci</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Award className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">150+</h4>
                    <p className="text-sm text-gray-500">Ödül</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vizyon" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6">
                <Eye className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Vizyonumuz</h3>
              <p className="text-gray-600 leading-relaxed">
                Ulusal ve uluslararası alanda tanınan, akademik başarısı yüksek, çağdaş değerlere sahip bireyler yetiştiren, eğitimde öncü bir kurum olmak.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Misyonumuz</h3>
              <p className="text-gray-600 leading-relaxed">
                Öğrencilerimize akademik bilginin yanı sıra, eleştirel düşünme, problem çözme ve iletişim becerileri kazandırarak onları hayata hazırlamak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Management */}
      <section id="yonetim" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary font-semibold mb-2">Yönetim</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Okul Yönetimimiz</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'Okul Müdürü', role: 'Genel Müdür' },
              { name: 'Müdür Yardımcısı', role: 'Akademik İşler' },
              { name: 'Müdür Yardımcısı', role: 'İdari İşler' },
            ].map((person, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users size={48} className="text-gray-400" />
                </div>
                <h4 className="font-bold text-primary">{person.name}</h4>
                <p className="text-gray-500">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default About
