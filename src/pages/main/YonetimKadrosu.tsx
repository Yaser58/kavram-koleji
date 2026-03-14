import { Users, Mail, Phone } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop'

const management = [
  { name: 'Bahattin DURMUŞ', title: 'Kurucu', image: PLACEHOLDER_IMG, email: '', phone: '' },
  { name: 'Genel Müdür', title: 'Genel Müdür', image: PLACEHOLDER_IMG, email: 'info@kavram.com.tr', phone: '0216 210 19 74' },
  { name: 'Eğitim Koordinatörü', title: 'Eğitim Koordinatörü', image: PLACEHOLDER_IMG, email: '', phone: '' },
  { name: 'İdari İşler Müdürü', title: 'İdari İşler Müdürü', image: PLACEHOLDER_IMG, email: '', phone: '' },
  { name: 'Mali İşler Müdürü', title: 'Mali İşler Müdürü', image: PLACEHOLDER_IMG, email: '', phone: '' },
  { name: 'İnsan Kaynakları Müdürü', title: 'İnsan Kaynakları Müdürü', image: PLACEHOLDER_IMG, email: '', phone: '' },
  { name: 'Pazarlama Müdürü', title: 'Pazarlama Müdürü', image: PLACEHOLDER_IMG, email: '', phone: '' },
  { name: 'IT Müdürü', title: 'Bilgi Teknolojileri Müdürü', image: PLACEHOLDER_IMG, email: '', phone: '' },
]

const YonetimKadrosu = () => {
  return (
    <MainWrapper>
      <PageBanner title="Yönetim Kadrosu" breadcrumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'Yönetim Kadrosu' }]} />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-secondary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Yönetim Ekibimiz</h2>
            <p className="text-gray-500">Kavram Koleji yönetim kadrosu, eğitimde mükemmellik ve sürekli gelişim için çalışmaktadır.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {management.map((person, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg hover:border-secondary/30 transition group">
                <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                  <img 
                    src={person.image} 
                    alt={person.name} 
                    className="w-full h-full object-contain object-center group-hover:scale-105 transition duration-300"
                    onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMG }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-primary text-lg group-hover:text-secondary transition">{person.name}</h3>
                  <p className="text-secondary font-semibold text-sm mt-1">{person.title}</p>
                  {person.email && (
                    <a href={`mailto:${person.email}`} className="flex items-center gap-2 text-gray-500 text-sm mt-2 hover:text-secondary transition">
                      <Mail size={14} /> {person.email}
                    </a>
                  )}
                  {person.phone && (
                    <a href={`tel:${person.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-gray-500 text-sm mt-1 hover:text-secondary transition">
                      <Phone size={14} /> {person.phone}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default YonetimKadrosu
