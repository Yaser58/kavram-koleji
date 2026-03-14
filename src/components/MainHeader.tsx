import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, Mail, Menu, X, ChevronDown } from 'lucide-react'

const topLinks = [
  { label: 'KAVRAM KURS', href: 'https://kavramkurs.com', external: true },
  { label: 'İNSAN KAYNAKLARI', to: '/insan-kaynaklari' },
  { label: 'FRANCHISE', to: '/franchise' },
  { label: 'KAVRAM DİJİTAL OKUL', href: 'https://dijital.kavram.k12.tr', external: true },
  { label: 'KAVRAM STORE', href: 'https://store.kavram.k12.tr', external: true },
]

const navLinks = [
  { label: 'Ana Sayfa', to: '/' },
  { label: 'Kampüsler', to: '/kampusler' },
  { label: 'Haberler', to: '/haberler' },
  { label: 'Başarılarımız', to: '/basarilarimiz' },
  { label: 'Galeri', to: '/galeri' },
  { label: 'İletişim', to: '/iletisim' },
]

const MainHeader = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const location = useLocation()

  const isActive = (to: string) => location.pathname === to

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0f1b2d] text-white py-1.5 hidden lg:block text-xs">
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
            {topLinks.map((link, i) => (
              <span key={i} className="flex items-center">
                {i > 0 && <span className="text-gray-600 mx-1">|</span>}
                {link.external ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition px-1">{link.label}</a>
                ) : (
                  <Link to={link.to!} className="hover:text-secondary transition px-1">{link.label}</Link>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
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
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-medium transition text-sm ${isActive(link.to) ? 'text-secondary' : 'text-gray-700 hover:text-primary'}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              to="/kayit"
              className="hidden lg:inline-flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-full font-semibold hover:bg-primary transition text-sm"
            >
              KAVRAM'A KAYIT
            </Link>

            <button
              className="lg:hidden text-primary"
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Menü"
            >
              {mobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="lg:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block py-2.5 border-b border-gray-100 ${isActive(link.to) ? 'text-secondary font-semibold' : 'text-gray-700 hover:text-primary'}`}
                  onClick={() => setMobileMenu(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 space-y-2">
                {topLinks.map((link, i) => (
                  link.external ? (
                    <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="block py-2 text-sm text-gray-500 hover:text-primary">{link.label}</a>
                  ) : (
                    <Link key={i} to={link.to!} className="block py-2 text-sm text-gray-500 hover:text-primary" onClick={() => setMobileMenu(false)}>{link.label}</Link>
                  )
                ))}
              </div>
              <Link to="/kayit" className="block text-center bg-secondary text-white py-3 rounded-full font-semibold mt-3" onClick={() => setMobileMenu(false)}>KAVRAM'A KAYIT</Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default MainHeader