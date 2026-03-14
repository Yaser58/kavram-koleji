import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import api from '../lib/api'

interface BranchInfo { _id: string; name: string; slug: string }

const MainFooter = () => {
  const [branches, setBranches] = useState<BranchInfo[]>([])

  useEffect(() => {
    api.get('/branches').then(setBranches).catch(() => {})
  }, [])

  const quickLinks = [
    { label: 'Ana Sayfa', to: '/' },
    { label: 'Kampüsler', to: '/kampusler' },
    { label: 'Haberler', to: '/haberler' },
    { label: 'Başarılarımız', to: '/basarilarimiz' },
    { label: 'Galeri', to: '/galeri' },
    { label: 'İletişim', to: '/iletisim' },
    { label: 'Franchise', to: '/franchise' },
    { label: 'İnsan Kaynakları', to: '/insan-kaynaklari' },
  ]

  return (
    <footer className="bg-[#0f1b2d] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/Kavram-logo.png" alt="Kavram" className="h-12 w-auto" />
              <div>
                <h3 className="font-bold text-lg">KAVRAM KOLEJİ</h3>
                <p className="text-gray-400 text-xs">Eğitimde Fark Yaratan Kurum</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              1974'den bu yana yarım asrı aşan eğitim tecrübemizle Türkiye genelinde kaliteli eğitim sunuyoruz.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Kampüslerimiz</h4>
            <ul className="space-y-3">
              {branches.slice(0, 6).map(b => (
                <li key={b._id}>
                  <Link to={`/${b.slug}`} className="text-gray-400 hover:text-secondary transition text-sm">{b.name}</Link>
                </li>
              ))}
              {branches.length > 6 && (
                <li><Link to="/kampusler" className="text-secondary hover:text-white transition text-sm font-semibold">Tümünü Gör →</Link></li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Hızlı Bağlantılar</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-secondary transition text-sm">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Genel Müdürlük</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary flex-shrink-0 mt-1" />
                <span className="text-gray-400 text-sm">Atatürk Mah. Ataşehir Bulvarı Gardenya Plaza 5, Kat 7 Ataşehir/İstanbul</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary flex-shrink-0" />
                <a href="tel:+902162101974" className="text-gray-400 hover:text-secondary transition text-sm">0216 210 19 74</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary flex-shrink-0" />
                <a href="mailto:info@kavram.com.tr" className="text-gray-400 hover:text-secondary transition text-sm">info@kavram.com.tr</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-sm">© 2026 Kavram Koleji. Tüm hakları saklıdır.</p>
          <Link to="/kvkk" className="text-gray-500 hover:text-secondary text-sm transition">KVKK Aydınlatma Metni</Link>
        </div>
      </div>
    </footer>
  )
}

export default MainFooter