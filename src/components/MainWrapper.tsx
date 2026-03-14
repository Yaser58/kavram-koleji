import { useState, useEffect, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MapPin, Phone, Mail, Menu, X, ChevronDown, Facebook, Instagram, Youtube, Twitter } from 'lucide-react'
import api from '../lib/api'
import WhatsAppButton from './WhatsAppButton'

interface BranchInfo { _id: string; name: string; slug: string }

const navLinks = [
  { label: 'Ana Sayfa', to: '/' },
  { label: 'Kampüsler', to: '/kampusler' },
  { label: 'Haberler', to: '/haberler' },
  { label: 'Başarılarımız', to: '/basarilarimiz' },
  { label: 'Galeri', to: '/galeri' },
  { label: 'İletişim', to: '/iletisim' },
]

const MainWrapper = ({ children }: { children: ReactNode }) => {
  const [branches, setBranches] = useState<BranchInfo[]>([])
  const [mobileMenu, setMobileMenu] = useState(false)
  const [franchiseOpen, setFranchiseOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    api.get('/branches').then(setBranches).catch(() => {})
  }, [])

  useEffect(() => {
    setMobileMenu(false)
  }, [location.pathname])

  const isActive = (to: string) => location.pathname === to

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Bar */}
      <div className="bg-[#0f1b2d] text-white py-1.5 hidden lg:block text-xs relative z-[60]">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <a href="tel:+902162101974" className="flex items-center gap-1.5 hover:text-secondary transition">
              <Phone size={12} /> 0216 210 19 74
            </a>
            <a href="mailto:info@kavram.com.tr" className="flex items-center gap-1.5 hover:text-secondary transition">
              <Mail size={12} /> info@kavram.com.tr
            </a>
          </div>
          <div className="flex items-center gap-1">
            <a href="https://kavramkurs.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition px-2">KAVRAM KURS</a>
            <span className="text-gray-600">|</span>
            <Link to="/kurs-merkezleri" className="hover:text-secondary transition px-2">KURS MERKEZLERİ</Link>
            <span className="text-gray-600">|</span>
            <Link to="/egitim" className="hover:text-secondary transition px-2">EĞİTİM</Link>
            <span className="text-gray-600">|</span>
            <Link to="/insan-kaynaklari" className="hover:text-secondary transition px-2">İNSAN KAYNAKLARI</Link>
            <span className="text-gray-600">|</span>
            <div className="relative group">
              <button className="hover:text-secondary transition px-2 flex items-center gap-1">
                FRANCHISE <ChevronDown size={12} />
              </button>
              <div className="absolute top-full left-0 bg-[#0f1b2d] shadow-lg rounded-lg py-2 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] border border-gray-700">
                <Link to="/franchise/okul" className="block px-4 py-2.5 text-white hover:bg-secondary hover:text-white text-sm transition">Okul Franchise</Link>
                <Link to="/franchise/kurs" className="block px-4 py-2.5 text-white hover:bg-secondary hover:text-white text-sm transition">Kurs Franchise</Link>
              </div>
            </div>
            <span className="text-gray-600">|</span>
            <a href="https://dijital.kavram.k12.tr" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition px-2">KAVRAM DİJİTAL OKUL</a>
            <span className="text-gray-600">|</span>
            <a href="https://store.kavram.k12.tr" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition px-2">KAVRAM STORE</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <Link to="/" className="flex items-center gap-3">
              <img src="/Kavram-logo.png" alt="Kavram Koleji" className="h-14 w-auto" />
              <div className="hidden sm:block">
                <h1 className="text-primary font-bold text-xl leading-tight">KAVRAM KOLEJİ</h1>
                <p className="text-gray-400 text-xs tracking-wider">EĞİTİMDE FARK YARATAN KURUM</p>
              </div>
            </Link>
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className={`font-medium transition text-sm ${isActive(link.to) ? 'text-secondary' : 'text-gray-700 hover:text-primary'}`}>{link.label}</Link>
              ))}
            </nav>
            <Link to="/kayit" className="hidden lg:inline-flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-full font-semibold hover:bg-primary transition text-sm">KAVRAM'A KAYIT</Link>
            <button className="lg:hidden text-primary" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menü">
              {mobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="lg:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className={`block py-2.5 border-b border-gray-100 ${isActive(link.to) ? 'text-secondary font-semibold' : 'text-gray-700 hover:text-primary'}`}>{link.label}</Link>
              ))}
              <div className="pt-3 border-t border-gray-200 mt-3">
                <p className="text-xs text-gray-400 mb-2">Diğer Bağlantılar</p>
                <a href="https://kavramkurs.com" target="_blank" rel="noopener noreferrer" className="block py-2 text-sm text-gray-600 hover:text-primary">Kavram Kurs</a>
                <Link to="/kurs-merkezleri" className="block py-2 text-sm text-gray-600 hover:text-primary">Kurs Merkezleri</Link>
                <Link to="/egitim" className="block py-2 text-sm text-gray-600 hover:text-primary">Eğitim</Link>
                <Link to="/insan-kaynaklari" className="block py-2 text-sm text-gray-600 hover:text-primary">İnsan Kaynakları</Link>
                <button onClick={() => setFranchiseOpen(!franchiseOpen)} className="w-full text-left py-2 text-sm text-gray-600 hover:text-primary flex items-center justify-between">
                  Franchise <ChevronDown size={14} className={`transition ${franchiseOpen ? 'rotate-180' : ''}`} />
                </button>
                {franchiseOpen && (
                  <div className="pl-4 space-y-1">
                    <Link to="/franchise/okul" className="block py-1.5 text-sm text-gray-500 hover:text-secondary">Okul Franchise</Link>
                    <Link to="/franchise/kurs" className="block py-1.5 text-sm text-gray-500 hover:text-secondary">Kurs Franchise</Link>
                  </div>
                )}
              </div>
              <Link to="/kayit" className="block text-center bg-secondary text-white py-3 rounded-full font-semibold mt-4">KAVRAM'A KAYIT</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-[#0f1b2d] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/Kavram-logo.png" alt="Kavram" className="h-12 w-auto" />
                <div><h3 className="font-bold text-lg">KAVRAM KOLEJİ</h3><p className="text-gray-400 text-xs">Eğitimde Fark Yaratan Kurum</p></div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">1974'den bu yana yarım asrı aşan eğitim tecrübemizle Türkiye genelinde kaliteli eğitim sunuyoruz.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Kampüslerimiz</h4>
              <ul className="space-y-3">
                {branches.slice(0, 6).map(b => (<li key={b._id}><Link to={`/${b.slug}`} className="text-gray-400 hover:text-secondary transition text-sm">{b.name}</Link></li>))}
                {branches.length > 6 && <li><Link to="/kampusler" className="text-secondary hover:text-white transition text-sm font-semibold">Tümünü Gör →</Link></li>}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Hızlı Bağlantılar</h4>
              <ul className="space-y-3">
                {navLinks.map(link => (<li key={link.to}><Link to={link.to} className="text-gray-400 hover:text-secondary transition text-sm">{link.label}</Link></li>))}
                <li><Link to="/tarihcemiz" className="text-gray-400 hover:text-secondary transition text-sm">Tarihçemiz</Link></li>
                <li><Link to="/yonetim-kadrosu" className="text-gray-400 hover:text-secondary transition text-sm">Yönetim Kadrosu</Link></li>
                <li><Link to="/kurumsal-kimlik" className="text-gray-400 hover:text-secondary transition text-sm">Kurumsal Kimlik</Link></li>
                <li><Link to="/franchise" className="text-gray-400 hover:text-secondary transition text-sm">Franchise</Link></li>
                <li><Link to="/insan-kaynaklari" className="text-gray-400 hover:text-secondary transition text-sm">İnsan Kaynakları</Link></li>
                <li><a href="https://kavramkurs.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition text-sm">Kavram Kurs</a></li>
                <li><a href="https://dijital.kavram.k12.tr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition text-sm">Kavram Dijital Okul</a></li>
                <li><a href="https://store.kavram.k12.tr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition text-sm">Kavram Store</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Genel Müdürlük</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3"><MapPin size={18} className="text-secondary flex-shrink-0 mt-1" /><span className="text-gray-400 text-sm">Atatürk Mah. Ataşehir Bulvarı Gardenya Plaza 5, Kat 7 Ataşehir/İstanbul</span></li>
                <li className="flex items-center gap-3"><Phone size={18} className="text-secondary flex-shrink-0" /><a href="tel:+902162101974" className="text-gray-400 hover:text-secondary transition text-sm">0216 210 19 74</a></li>
                <li className="flex items-center gap-3"><Mail size={18} className="text-secondary flex-shrink-0" /><a href="mailto:info@kavram.com.tr" className="text-gray-400 hover:text-secondary transition text-sm">info@kavram.com.tr</a></li>
              </ul>
              <div className="flex gap-3 mt-6">
                <a href="https://facebook.com/kavramkoleji" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition" aria-label="Facebook"><Facebook size={18} /></a>
                <a href="https://instagram.com/kavramkoleji" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition" aria-label="Instagram"><Instagram size={18} /></a>
                <a href="https://youtube.com/@kavramkoleji" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition" aria-label="YouTube"><Youtube size={18} /></a>
                <a href="https://twitter.com/kavramkoleji" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition" aria-label="Twitter"><Twitter size={18} /></a>
                <a href="https://linkedin.com/company/kavramkoleji" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition" aria-label="LinkedIn"><svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
              </div>
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
      <WhatsAppButton />
    </div>
  )
}

export default MainWrapper