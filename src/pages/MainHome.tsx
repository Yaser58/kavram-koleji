// Kavram Koleji Ana Sayfa - v2
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import { MapPin, Phone, Mail, ArrowRight, GraduationCap, Facebook, Instagram, Twitter, Youtube, Menu, X, Calendar } from 'lucide-react'
import api from '../lib/api'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

interface BranchInfo { _id: string; name: string; slug: string; city: string; logo?: string }
interface MainSlide { _id: string; title: string; subtitle: string; image: string; link: string }
interface MainNewsItem { _id: string; title: string; excerpt: string; images: string[]; category: string; day: string; month: string; year: string; content?: string }

const MainSite = () => {
  const [branches, setBranches] = useState<BranchInfo[]>([])
  const [slides, setSlides] = useState<MainSlide[]>([])
  const [news, setNews] = useState<MainNewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [selectedNews, setSelectedNews] = useState<MainNewsItem | null>(null)

  useEffect(() => {
    Promise.all([
      api.get('/branches').catch(() => []),
      api.get('/main/slider').catch(() => []),
      api.get('/main/news').catch(() => []),
    ]).then(([b, s, n]) => { setBranches(b); setSlides(s); setNews(n) }).finally(() => setLoading(false))
  }, [])

  const openNewsDetail = async (item: MainNewsItem) => {
    try { setSelectedNews(await api.get(`/main/news/${item._id}`)) } catch { setSelectedNews(item) }
  }

  const navLinks = [['Ana Sayfa','#anasayfa'],['Haberler','#haberler'],['Kampüsler','#kampusler'],['Hakkımızda','#hakkimizda'],['İletişim','#iletisim']]

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-[#0f1b2d] text-white py-2 hidden md:block text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+902667146464" className="flex items-center gap-2 hover:text-secondary transition"><Phone size={13} /> (0266) 714 64 64</a>
            <a href="mailto:info@kavram.k12.tr" className="flex items-center gap-2 hover:text-secondary transition"><Mail size={13} /> info@kavram.k12.tr</a>
          </div>
          <div className="flex items-center gap-4">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (<a key={i} href="#" className="hover:text-secondary transition"><Icon size={15} /></a>))}
          </div>
        </div>
      </div>


      {/* Header - beyaz, sticky */}
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
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(([l,h]) => (<a key={h} href={h} className="text-gray-700 hover:text-primary font-medium transition">{l}</a>))}
            </nav>
            <a href="tel:+902667146464" className="hidden lg:inline-flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-full font-semibold hover:bg-primary transition text-sm"><Phone size={16} /> Bizi Arayın</a>
            <button className="lg:hidden text-primary" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menü">{mobileMenu ? <X size={28} /> : <Menu size={28} />}</button>
          </div>
        </div>
        {mobileMenu && (
          <div className="lg:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 space-y-3">
              {navLinks.map(([l,h]) => (<a key={h} href={h} className="block py-2 text-gray-700 hover:text-primary border-b border-gray-100" onClick={() => setMobileMenu(false)}>{l}</a>))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Slider */}
      <section id="anasayfa">
        {slides.length > 0 ? (
          <Swiper modules={[Autoplay, Pagination, EffectFade]} effect="fade" pagination={{ clickable: true }} autoplay={{ delay: 5000, disableOnInteraction: false }} loop className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
            {slides.map((slide) => (
              <SwiperSlide key={slide._id}>
                <div className="relative h-full">
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0f1b2d]/90 via-[#0f1b2d]/50 to-transparent" />
                  <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4">
                      <div className="max-w-2xl">
                        {slide.subtitle && <p className="text-secondary font-semibold mb-3 text-lg">{slide.subtitle}</p>}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">{slide.title}</h2>
                        <a href={slide.link || '#kampusler'} className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition group">Keşfet <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></a>
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


      {/* Haberler */}
      {news.length > 0 && (
        <section id="haberler" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-primary">Haberler &amp; Duyurular</h2></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div onClick={() => openNewsDetail(news[0])} className="cursor-pointer group">
                <div className="relative rounded-2xl overflow-hidden shadow-xl h-full min-h-[420px]">
                  <img src={news[0].images?.[0] || ''} alt={news[0].title} className="w-full h-full object-cover absolute inset-0" />
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
              </div>
              {news.length > 1 && (
                <div className="flex flex-col gap-4">
                  {news.slice(1, 4).map((item) => (
                    <div key={item._id} onClick={() => openNewsDetail(item)} className="cursor-pointer group flex gap-4 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                      <div className="w-44 h-36 flex-shrink-0 relative">
                        <img src={item.images?.[0] || ''} alt={item.title} className="w-full h-full object-cover" />
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}


      {/* Kampüsler */}
      <section id="kampusler" className="py-20">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {branches.map(b => (
                <Link to={`/${b.slug}`} key={b._id} className="group">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100">
                    <div className="bg-gradient-to-br from-primary to-primary/80 h-44 flex items-center justify-center relative">
                      {b.logo ? <img src={b.logo} alt={b.name} className="h-20 object-contain" /> : <GraduationCap size={56} className="text-secondary" />}
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
          )}
        </div>
      </section>

      {/* CTA */}
      <section id="hakkimizda" className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-3xl text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Çocuğunuzun Geleceğine Yatırım Yapın</h2>
          <p className="text-xl text-gray-300 mb-10">Avantajlı kayıt fırsatlarımızdan yararlanmak için hemen iletişime geçin.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#kampusler" className="inline-flex items-center justify-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition group">Kampüs Seçin <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></a>
            <a href="tel:+902667146464" className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition border border-white/30"><Phone size={20} /> (0266) 714 64 64</a>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer id="iletisim" className="bg-[#0f1b2d] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/Kavram-logo.png" alt="Kavram" className="h-12 w-auto" />
                <div><h3 className="font-bold text-lg">KAVRAM KOLEJİ</h3><p className="text-gray-400 text-xs">Eğitimde Fark Yaratan Kurum</p></div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">Yarım asrı aşan eğitim tecrübemizle Türkiye genelinde kaliteli eğitim sunuyoruz.</p>
              <div className="flex gap-3 mt-6">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (<a key={i} href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition"><Icon size={18} /></a>))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Kampüslerimiz</h4>
              <ul className="space-y-3">{branches.slice(0, 6).map(b => (<li key={b._id}><Link to={`/${b.slug}`} className="text-gray-400 hover:text-secondary transition text-sm">{b.name}</Link></li>))}</ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Hızlı Bağlantılar</h4>
              <ul className="space-y-3">{navLinks.map(([l,h]) => (<li key={h}><a href={h} className="text-gray-400 hover:text-secondary transition text-sm">{l}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">İletişim</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3"><MapPin size={18} className="text-secondary flex-shrink-0 mt-1" /><span className="text-gray-400 text-sm">Bandırma, Balıkesir</span></li>
                <li className="flex items-center gap-3"><Phone size={18} className="text-secondary flex-shrink-0" /><a href="tel:+902667146464" className="text-gray-400 hover:text-secondary transition text-sm">(0266) 714 64 64</a></li>
                <li className="flex items-center gap-3"><Mail size={18} className="text-secondary flex-shrink-0" /><a href="mailto:info@kavram.k12.tr" className="text-gray-400 hover:text-secondary transition text-sm">info@kavram.k12.tr</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10"><div className="container mx-auto px-4 py-6 text-center"><p className="text-gray-500 text-sm">© 2026 Kavram Koleji. Tüm hakları saklıdır.</p></div></div>
      </footer>


      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedNews(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {selectedNews.images?.[0] && (
              <div className="relative">
                <img src={selectedNews.images[0]} alt={selectedNews.title} className="w-full h-64 md:h-80 object-cover rounded-t-2xl" />
                <button onClick={() => setSelectedNews(null)} className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition"><X size={20} /></button>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-semibold">{selectedNews.category}</span>
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-xs">{selectedNews.day} {selectedNews.month} {selectedNews.year}</span>
                </div>
              </div>
            )}
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">{selectedNews.title}</h2>
              <div className="text-gray-600 leading-relaxed">
                {selectedNews.content ? <div dangerouslySetInnerHTML={{ __html: selectedNews.content.replace(/\n/g, '<br/>') }} /> : <p>{selectedNews.excerpt}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MainSite
