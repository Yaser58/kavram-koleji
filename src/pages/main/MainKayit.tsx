import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, MapPin, Phone } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'
import api from '../../lib/api'

interface BranchInfo { _id: string; name: string; slug: string; city: string; phone: string }

const MainKayit = () => {
  const [branches, setBranches] = useState<BranchInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/branches').then(setBranches).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <MainWrapper>
      <PageBanner title="Kavram'a Kayıt" breadcrumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: "Kavram'a Kayıt" }]} />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Kampüs Seçerek Kayıt Olun</h2>
            <p className="text-gray-500">Kayıt işlemi için size en yakın kampüsümüzü seçin. Kampüs sayfasından online kayıt formunu doldurabilir veya doğrudan iletişime geçebilirsiniz.</p>
          </div>
          {loading ? (
            <div className="flex justify-center py-10"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {branches.map(b => (
                <Link to={`/${b.slug}/kayit`} key={b._id} className="group bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg hover:border-secondary/30 transition">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <GraduationCap size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary group-hover:text-secondary transition">{b.name}</h3>
                      <p className="text-gray-400 text-sm flex items-center gap-1"><MapPin size={12} /> {b.city}</p>
                    </div>
                  </div>
                  {b.phone && <p className="text-gray-500 text-sm flex items-center gap-2 mb-3"><Phone size={14} className="text-secondary" /> {b.phone}</p>}
                  <div className="flex items-center gap-2 text-secondary font-semibold text-sm group-hover:gap-3 transition-all">Kayıt Formu <ArrowRight size={16} /></div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h3 className="text-xl font-bold text-primary mb-4">Sorularınız mı var?</h3>
          <p className="text-gray-500 mb-6">Kayıt süreciyle ilgili tüm sorularınız için bizi arayabilir veya iletişim formunu doldurabilirsiniz.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+902162101974" className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-secondary transition"><Phone size={18} /> 0216 210 19 74</a>
            <Link to="/iletisim" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition border border-gray-200">İletişim Formu <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default MainKayit