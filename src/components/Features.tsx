import { BookOpen, Users, Award, Globe, Microscope, Palette } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Akademik Mükemmellik',
    description: 'YKS odaklı eğitim programı ile öğrencilerimizi üniversiteye hazırlıyoruz.'
  },
  {
    icon: Users,
    title: 'Uzman Kadro',
    description: 'Alanında uzman, deneyimli öğretmenlerimizle kaliteli eğitim sunuyoruz.'
  },
  {
    icon: Award,
    title: 'Başarı Odaklı',
    description: 'Ulusal ve uluslararası yarışmalarda elde ettiğimiz başarılarla öne çıkıyoruz.'
  },
  {
    icon: Globe,
    title: 'Yabancı Dil',
    description: 'İngilizce eğitimi ile öğrencilerimizi global dünyaya hazırlıyoruz.'
  },
  {
    icon: Microscope,
    title: 'Laboratuvarlar',
    description: 'Modern fen laboratuvarlarımızda uygulamalı eğitim veriyoruz.'
  },
  {
    icon: Palette,
    title: 'Sosyal Aktiviteler',
    description: 'Spor, sanat ve kültürel etkinliklerle çok yönlü gelişim sağlıyoruz.'
  }
]

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-secondary font-semibold mb-2">Neden Biz?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Eğitimde Fark Yaratıyoruz</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg card-hover"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
