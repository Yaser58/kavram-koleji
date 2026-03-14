import { Link } from 'react-router-dom'
import { GraduationCap, Target, BarChart3, BookOpen, ArrowRight } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const features = [
  { icon: Target, title: 'LGS Hazırlık', desc: 'LGS sınavına kapsamlı hazırlık programı ile destek.' },
  { icon: BarChart3, title: 'Performans Takibi', desc: 'Veri temelli akademik performans analizi.' },
  { icon: BookOpen, title: 'Zengin Müfredat', desc: 'MEB müfredatına ek proje ve etkinlikler.' },
  { icon: GraduationCap, title: 'Rehberlik', desc: 'Kariyer ve sınav odaklı rehberlik hizmeti.' },
]

const EgitimOrtaokul = () => {
  return (
    <MainWrapper>
      <PageBanner title="Ortaokul" breadcrumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'Eğitim', to: '/egitim' }, { label: 'Ortaokul' }]} />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <div className="md:w-1/2">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap size={32} className="text-secondary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Ortaokul Eğitimimiz</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Kavram Koleji Ortaokulu, 5-8. sınıf öğrencilerimize LGS hazırlık odaklı, veri temelli rehberlik ile desteklenen bir eğitim sunar. Öğrencilerimizi hem akademik hem de sosyal açıdan liseye hazırlıyoruz.</p>
              <Link to="/kayit" className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary transition">
                Kayıt Ol <ArrowRight size={18} />
              </Link>
            </div>
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop" alt="Ortaokul" className="rounded-2xl shadow-lg w-full object-contain" />
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

export default EgitimOrtaokul
