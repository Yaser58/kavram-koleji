import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from 'lucide-react'
import { useBranch } from '../context/BranchContext'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const location = useLocation()
  const { branch, branchSlug } = useBranch()
  const base = `/${branchSlug}`

  const navItems = [
    { name: 'Ana Sayfa', path: base },
    { name: 'Kurumsal', path: `${base}/hakkimizda`,
      submenu: [
        { name: 'Hakkımızda', path: `${base}/hakkimizda` },
        { name: 'Vizyon & Misyon', path: `${base}/hakkimizda#vizyon` },
      ]
    },
    { name: 'Akademik', path: `${base}/akademik` },
    { name: 'Haberler', path: `${base}/haberler` },
    { name: 'Galeri', path: `${base}/galeri` },
    { name: 'İletişim', path: `${base}/iletisim` },
  ]

  return (
    <header className="w-full">
      <div className="bg-primary text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href={`tel:${branch?.phone?.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2 hover:text-secondary transition">
              <Phone size={14} /><span>{branch?.phone}</span>
            </a>
            <a href={`mailto:${branch?.email}`} className="flex items-center gap-2 hover:text-secondary transition">
              <Mail size={14} /><span>{branch?.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.kavram.k12.tr" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition text-xs border border-white/30 px-3 py-0.5 rounded-full">kavram.k12.tr</a>
            <span className="flex items-center gap-2"><MapPin size={14} /> {branch?.address}</span>
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to={base} className="flex items-center gap-3">
              <img src="/Kavram-logo.png" alt="Kavram Koleji Logo" className="h-14 w-auto" />
              <div className="hidden sm:block">
                <h1 className="text-primary font-bold text-lg leading-tight">KAVRAM KOLEJİ</h1>
                <p className="text-gray-500 text-xs">{branch?.name?.split(' ').slice(-2).join(' ') || 'Anadolu Lisesi'}</p>
              </div>
            </Link>
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative" onMouseEnter={() => setActiveDropdown(item.name)} onMouseLeave={() => setActiveDropdown(null)}>
                  <Link to={item.path} className={`nav-link flex items-center gap-1 font-medium transition ${location.pathname === item.path ? 'text-secondary' : 'text-gray-700 hover:text-primary'}`}>
                    {item.name}
                    {item.submenu && <ChevronDown size={16} />}
                  </Link>
                  {item.submenu && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg py-2 min-w-[200px] mt-2">
                      {item.submenu.map((sub) => (
                        <Link key={sub.name} to={sub.path} className="block px-4 py-2 text-gray-700 hover:bg-primary hover:text-white transition">{sub.name}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Link to={`${base}/kayit`} className="hidden lg:block bg-secondary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary transition">Kayıt Ol</Link>
            <button className="lg:hidden text-primary" onClick={() => setIsOpen(!isOpen)} aria-label="Menü">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} className="block py-3 text-gray-700 hover:text-primary border-b border-gray-100" onClick={() => setIsOpen(false)}>{item.name}</Link>
              ))}
              <Link to={`${base}/kayit`} className="block mt-4 bg-secondary text-white text-center px-6 py-3 rounded-full font-semibold" onClick={() => setIsOpen(false)}>Kayıt Ol</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
