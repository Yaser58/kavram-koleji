import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Phone, MapPin, Navigation, Home, Search } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'
import api from '../../lib/api'
import { getBranchImageSrc, BRANCH_IMAGE_PLACEHOLDER } from '../../lib/branchImage'

interface Kampus {
  _id: string
  name: string
  slug: string
  city: string
  phone: string
  phone2?: string
  phone3?: string
  address: string
  programs: string[]
  logo?: string
  mapCoords?: { lat: number; lng: number }
}

const Kampusler = () => {
  const [kampusler, setKampusler] = useState<Kampus[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState('Tümü')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    api.get('/branches').then(setKampusler).catch(() => []).finally(() => setLoading(false))
  }, [])

  const cities = ['Tümü', ...Array.from(new Set(kampusler.map(k => k.city))).sort()]

  const filtered = kampusler.filter(k => {
    const matchCity = selectedCity === 'Tümü' || k.city === selectedCity
    const matchSearch = k.name.toLowerCase().includes(searchTerm.toLowerCase()) || k.address.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCity && matchSearch
  })

  return (
    <MainWrapper>
      <PageBanner title="Kampüslerimiz" breadcrumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'Kampüslerimiz' }]} />
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Kampüs Cards */}
              <div className="space-y-6">
                {filtered.map((kampus) => {
                  const mapUrl = kampus.mapCoords ? `https://maps.google.com/?q=${kampus.mapCoords.lat},${kampus.mapCoords.lng}` : undefined
                  return (
                  <div key={kampus._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100">
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="md:w-64 h-48 md:h-auto flex-shrink-0 bg-gray-100">
                        <img src={getBranchImageSrc(kampus)} alt={kampus.name} className="w-full h-full object-contain object-center" onError={(e) => { (e.target as HTMLImageElement).src = BRANCH_IMAGE_PLACEHOLDER }} />
                      </div>
                      {/* Content */}
                      <div className="flex-1 p-6">
                        <h3 className="text-xl font-bold text-primary mb-3">{kampus.name}</h3>
                        
                        <div className="space-y-2 mb-4">
                          <a href={`tel:${kampus.phone?.replace(/\s/g, '') || ''}`} className="flex items-center gap-2 text-primary hover:text-secondary">
                            <Phone size={16} /> {kampus.phone}
                          </a>
                          {kampus.phone2 && (
                            <p className="text-gray-500 text-sm pl-6">{kampus.phone2}</p>
                          )}
                          {kampus.phone3 && (
                            <p className="text-gray-500 text-sm pl-6">{kampus.phone3}</p>
                          )}
                        </div>
                        
                        <p className="text-gray-500 text-sm mb-4 flex items-start gap-2">
                          <MapPin size={16} className="flex-shrink-0 mt-0.5 text-gray-400" /> {kampus.address}
                        </p>
                        
                        {/* Programs */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {(kampus.programs || []).map((prog, i) => (
                            <span key={i} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">{prog}</span>
                          ))}
                        </div>
                        
                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                          <Link 
                            to={`/${kampus.slug}`}
                            className="inline-flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary transition"
                          >
                            <Home size={16} /> Kampüsü İncele
                          </Link>
                          {mapUrl && (
                            <a 
                              href={mapUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center gap-2 text-primary hover:text-secondary text-sm font-medium"
                            >
                              <Navigation size={16} /> Yol Tarifi
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24 border border-gray-100">
                <h3 className="text-lg font-bold text-primary mb-4">Kampüs Arama</h3>
                
                {/* Search */}
                <div className="mb-4">
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Kampüs Adı"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                    />
                  </div>
                </div>
                
                {/* City Filter */}
                <div className="mb-6">
                  <select 
                    value={selectedCity} 
                    onChange={e => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                  >
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                
                {/* Search Button */}
                <button 
                  onClick={() => {}}
                  className="w-full bg-secondary text-white py-3 rounded-xl font-semibold hover:bg-primary transition flex items-center justify-center gap-2"
                >
                  <Search size={18} /> Ara
                </button>
                
                {/* Results Count */}
                <p className="text-center text-gray-500 text-sm mt-4">{filtered.length} kampüs bulundu</p>
              </div>
            </div>
          </div>
          )}
        </div>
      </section>
    </MainWrapper>
  )
}

export default Kampusler
