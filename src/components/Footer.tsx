import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { useBranch } from '../context/BranchContext'

const Footer = () => {
  const { branch, branchSlug } = useBranch()
  const base = `/${branchSlug}`

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/Kavram-logo.png" alt="Kavram Koleji Logo" className="h-12 w-auto" />
              <div>
                <h3 className="font-bold text-lg">KAVRAM KOLEJİ</h3>
                <p className="text-gray-300 text-sm">{branch?.city || 'Bandırma'}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{branch?.name} olarak öğrencilerimize en kaliteli eğitimi sunmak için çalışıyoruz.</p>
            <div className="flex gap-4 mt-6">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition"><Icon size={18} /></a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Hızlı Bağlantılar</h4>
            <ul className="space-y-3">
              {[['Hakkımızda','hakkimizda'],['Akademik','akademik'],['Haberler','haberler'],['Galeri','galeri'],['İletişim','iletisim']].map(([label, path]) => (
                <li key={path}><Link to={`${base}/${path}`} className="text-gray-300 hover:text-secondary transition">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">İletişim</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><MapPin size={20} className="text-secondary flex-shrink-0 mt-1" /><span className="text-gray-300 text-sm">{branch?.address}</span></li>
              <li className="flex items-center gap-3"><Phone size={20} className="text-secondary flex-shrink-0" /><a href={`tel:${branch?.phone?.replace(/[^+\d]/g,'')}`} className="text-gray-300 hover:text-secondary transition">{branch?.phone}</a></li>
              <li className="flex items-center gap-3"><Mail size={20} className="text-secondary flex-shrink-0" /><a href={`mailto:${branch?.email}`} className="text-gray-300 hover:text-secondary transition">{branch?.email}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Bülten</h4>
            <p className="text-gray-300 text-sm mb-4">Haberlerimizden haberdar olmak için bültenimize abone olun.</p>
            <form className="flex flex-col gap-3">
              <input type="email" placeholder="E-posta adresiniz" className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-secondary" />
              <button type="submit" className="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition">Abone Ol</button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2026 {branch?.name}. Tüm hakları saklıdır.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-secondary transition">Gizlilik Politikası</a>
              <a href="#" className="text-gray-400 hover:text-secondary transition">Kullanım Şartları</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
