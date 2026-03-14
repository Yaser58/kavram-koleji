import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import { MapPin, ArrowRight, GraduationCap, Calendar, Phone, Mail, Menu, X, ChevronDown, Facebook, Instagram, Youtube, Twitter, Play } from 'lucide-react'
import api from '../lib/api'
import { getBranchImageSrc, BRANCH_IMAGE_PLACEHOLDER } from '../lib/branchImage'
import WhatsAppButton from '../components/WhatsAppButton'
import Stats from '../components/Stats'
import Features from '../components/Features'
import CampusTour from '../components/CampusTour'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

interface BranchInfo { _id: string; name: string; slug: string; city: string; logo?: string }
interface MainSlide { _id: string; title: string; subtitle: string; image: string; link: string }
interface MainNewsItem { _id: string; title: string; excerpt: string; images: string[]; category: string; day: string; month: string; year: string; slug?: string }
interface GalleryItem { _id: string; src: string; title: string; category: string }

const navLinks = [
  { label: 'Ana Sayfa', to: '/' },
  { label: 'Kampüsler', to: '/kampusler' },
  { label: 'Haberler', to: '/haberler' },
  { label: 'Başarılarımız', to: '/basarilarimiz' },
  { label: 'Galeri', to: '/galeri' },
  { label: 'İletişim', to: '/iletisim' },
]

const MainSite = () => {
  const [branches, setBranches] = useState<BranchInfo[]>([])
  const [slides, setSlides] = useState<MainSlide[]>([])
  const [news, setNews] = useState<MainNewsItem[]>([])
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [franchiseOpen, setFranchiseOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    Promise.all([
      api.get('/branches').catch(() => []),
      api.get('/main/slider').catch(() => []),
      api.get('/main/news').catch(() => []),
      api.get('/main/gallery').catch(() => []),
    ]).then(([b, s, n, g]) => { setBranches(b); setSlides(s); setNews(n); setGallery(g) }).finally(() => setLoading(false))
  }, [])

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
                <Link key={link.to} to={link.to} className={`block py-2.5 border-b border-gray-100 ${isActive(link.to) ? 'text-secondary font-semibold' : 'text-gray-700 hover:text-primary'}`} onClick={() => setMobileMenu(false)}>{link.label}</Link>
              ))}
              <div className="pt-3 border-t border-gray-200 mt-3">
                <p className="text-xs text-gray-400 mb-2">Diğer Bağlantılar</p>
                <a href="https://kavramkurs.com" target="_blank" rel="noopener noreferrer" className="block py-2 text-sm text-gray-600 hover:text-primary">Kavram Kurs</a>
                <Link to="/kurs-merkezleri" className="block py-2 text-sm text-gray-600 hover:text-primary" onClick={() => setMobileMenu(false)}>Kurs Merkezleri</Link>
                <Link to="/egitim" className="block py-2 text-sm text-gray-600 hover:text-primary" onClick={() => setMobileMenu(false)}>Eğitim</Link>
                <Link to="/insan-kaynaklari" className="block py-2 text-sm text-gray-600 hover:text-primary" onClick={() => setMobileMenu(false)}>İnsan Kaynakları</Link>
                <button onClick={() => setFranchiseOpen(!franchiseOpen)} className="w-full text-left py-2 text-sm text-gray-600 hover:text-primary flex items-center justify-between">
                  Franchise <ChevronDown size={14} className={`transition ${franchiseOpen ? 'rotate-180' : ''}`} />
                </button>
                {franchiseOpen && (
                  <div className="pl-4 space-y-1">
                    <Link to="/franchise/okul" className="block py-1.5 text-sm text-gray-500 hover:text-secondary" onClick={() => setMobileMenu(false)}>Okul Franchise</Link>
                    <Link to="/franchise/kurs" className="block py-1.5 text-sm text-gray-500 hover:text-secondary" onClick={() => setMobileMenu(false)}>Kurs Franchise</Link>
                  </div>
                )}
                <a href="https://dijital.kavram.k12.tr" target="_blank" rel="noopener noreferrer" className="block py-2 text-sm text-gray-600 hover:text-primary">Kavram Dijital Okul</a>
                <a href="https://store.kavram.k12.tr" target="_blank" rel="noopener noreferrer" className="block py-2 text-sm text-gray-600 hover:text-primary">Kavram Store</a>
              </div>
              <Link to="/kayit" className="block text-center bg-secondary text-white py-3 rounded-full font-semibold mt-4" onClick={() => setMobileMenu(false)}>KAVRAM'A KAYIT</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Slider */}
        <section>
          {slides.length > 0 ? (
            <Swiper modules={[Autoplay, Pagination, EffectFade]} effect="fade" pagination={{ clickable: true }} autoplay={{ delay: 5000, disableOnInteraction: false }} loop className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
              {slides.map((slide) => (
                <SwiperSlide key={slide._id}>
                  <div className="relative h-full">
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-contain object-center" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f1b2d]/90 via-[#0f1b2d]/50 to-transparent" />
                    <div className="absolute inset-0 flex items-center">
                      <div className="container mx-auto px-4">
                        <div className="max-w-2xl">
                          {slide.subtitle && <p className="text-secondary font-semibold mb-3 text-lg">{slide.subtitle}</p>}
                          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">{slide.title}</h2>
                          <Link to={slide.link || '/kampusler'} className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition group">
                            Keşfet <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="bg-gradient-to-br from-[#0f1b2d] via-primary to-primary/80 text-white py-28">
              <div className="container mx-auto px-4 text-center">
                <GraduationCap size={72} className="mx-auto mb-6 text-secondary" />
                <h2 className="text-4xl md:text-6xl font-bold mb-6">Kavram Koleji</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">Yarım asrı aşan eğitim tecrübemizle geleceğin liderlerini yetiştiriyoruz.</p>
              </div>
            </div>
          )}
        </section>

        <Stats />
        <Features />

        {/* Tanıtım Videosu */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-secondary font-semibold mb-2">Tanıtım</p>
                <h2 className="text-3xl md:text-4xl font-bold text-primary">Kavram Koleji'ni Keşfedin</h2>
                <p className="text-gray-500 mt-3">Yarım asrı aşan eğitim tecrübemizi videomuzda izleyin.</p>
              </div>
              <a href="https://www.youtube.com/@kavramkoleji" target="_blank" rel="noopener noreferrer" className="group relative block rounded-2xl overflow-hidden shadow-xl aspect-video bg-gray-900">
                <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=450&fit=crop" alt="Kavram Koleji Tanıtım" className="w-full h-full object-contain object-center opacity-80 group-hover:opacity-90 transition" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition flex items-center justify-center">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play size={36} className="text-white ml-1" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-flex items-center gap-2 bg-white/90 text-primary px-4 py-2 rounded-full font-semibold text-sm">
                    <Play size={16} fill="currentColor" /> İzle
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>

        <CampusTour />

        {/* Haberler */}
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">Haberler &amp; Duyurular</h2>
                <Link to="/haberler" className="text-secondary hover:text-primary font-semibold flex items-center gap-1 transition">Tümünü Gör <ArrowRight size={16} /></Link>
              </div>
              {news.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                  <p className="text-gray-500">Henüz haber eklenmemiş.</p>
                  <p className="text-gray-400 text-sm mt-2">Haberler Super Admin panelinden eklenebilir.</p>
                </div>
              ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Link to={`/haberler/${news[0].slug || news[0]._id}`} className="group">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl h-full min-h-[420px] bg-gray-100">
                    <img src={news[0].images?.[0] || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop'} alt={news[0].title} className="absolute inset-0 w-full h-full object-contain object-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-semibold">{news[0].category}</span>
                        <span className="text-white/70 text-sm flex items-center gap-1"><Calendar size={14} /> {news[0].day} {news[0].month} {news[0].year}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-secondary transition leading-tight">{news[0].title}</h3>
                      <p className="text-white/70 mt-3 line-clamp-2">{news[0].excerpt}</p>
                    </div>
                  </div>
                </Link>
                {news.length > 1 && (
                  <div className="flex flex-col gap-4">
                    {news.slice(1, 4).map((item) => (
                      <Link key={item._id} to={`/haberler/${item.slug || item._id}`} className="group flex gap-4 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                        <div className="w-44 h-36 flex-shrink-0 bg-gray-100 flex items-center justify-center p-2 relative overflow-hidden">
                          <img src={item.images?.[0] || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=150&fit=crop'} alt={item.title} className="w-full h-full object-contain object-center" />
                          <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-center">
                            <span className="text-sm font-bold block leading-none">{item.day}</span>
                            <span className="text-[10px] uppercase">{item.month}</span>
                          </div>
                        </div>
                        <div className="flex-grow py-4 pr-4">
                          <span className="text-xs text-secondary font-semibold">{item.category}</span>
                          <h4 className="font-bold text-primary group-hover:text-secondary transition line-clamp-2 mt-1">{item.title}</h4>
                          <p className="text-gray-500 text-sm line-clamp-2 mt-2">{item.excerpt}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              )}
            </div>
          </section>

        {/* Galeri - Fotoğraflarımız */}
        {gallery.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-12">
                <div>
                  <p className="text-secondary font-semibold mb-2">Fotoğraflarımız</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-primary">Galeri</h2>
                </div>
                <Link to="/galeri" className="text-secondary hover:text-primary font-semibold flex items-center gap-1 transition">Tümünü Gör <ArrowRight size={16} /></Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {gallery.slice(0, 6).map((img) => (
                  <Link key={img._id} to="/galeri" className="group relative block rounded-xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition">
                    <img src={img.src} alt={img.title} className="w-full h-full object-contain object-center group-hover:scale-105 transition duration-300" />
                    {img.title && (
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition">
                        <p className="text-white text-sm font-semibold truncate">{img.title}</p>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Kampüsler */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-secondary font-semibold mb-2">Şubelerimiz</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Kampüslerimizi Keşfedin</h2>
            </div>
            {loading ? (
              <div className="flex justify-center py-10"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
            ) : branches.length === 0 ? (
              <p className="text-center text-gray-400 py-10">Henüz şube eklenmemiş.</p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {branches.slice(0, 6).map(b => (
                    <Link to={`/${b.slug}`} key={b._id} className="group">
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100">
                        <div className="h-48 relative overflow-hidden">
                          <img 
                            src={getBranchImageSrc(b)} 
                            alt={b.name} 
                            className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300" 
                            onError={(e) => { (e.target as HTMLImageElement).src = BRANCH_IMAGE_PLACEHOLDER }} 
                          />
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary" />
                        </div>
                        <div className="p-6">
                          <h4 className="text-lg font-bold text-primary group-hover:text-secondary transition">{b.name}</h4>
                          <p className="text-gray-500 flex items-center gap-1.5 mt-2 text-sm"><MapPin size={14} className="text-secondary" /> {b.city}</p>
                          <div className="mt-4 flex items-center gap-2 text-secondary font-semibold text-sm group-hover:gap-3 transition-all">Kampüs Sitesine Git <ArrowRight size={16} /></div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {branches.length > 6 && (
                  <div className="text-center mt-10">
                    <Link to="/kampusler" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-secondary transition">Tüm Kampüsleri Gör <ArrowRight size={18} /></Link>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="container mx-auto px-4 relative z-10 max-w-3xl text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Çocuğunuzun Geleceğine Yatırım Yapın</h2>
            <p className="text-xl text-gray-300 mb-10">Avantajlı kayıt fırsatlarımızdan yararlanmak için hemen iletişime geçin.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kayit" className="inline-flex items-center justify-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition group">Hemen Kayıt Ol <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></Link>
              <a href="tel:+902162101974" className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition border border-white/30">0216 210 19 74</a>
            </div>
          </div>
        </section>
      </main>

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

export default MainSite
