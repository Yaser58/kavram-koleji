import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import { MapPin, ArrowRight, GraduationCap, Calendar, Phone, Mail, Menu, X, ChevronDown, ChevronUp, Facebook, Instagram, Youtube, Twitter, Play, Megaphone, Search, Accessibility, Map } from 'lucide-react'
import api from '../lib/api'
import { getBranchImageSrc, BRANCH_IMAGE_PLACEHOLDER } from '../lib/branchImage'
import { getLocalizedNews } from '../lib/newsLocalization'
import { getSliderTitle, getSliderSubtitle } from '../lib/sliderTranslations'
import WhatsAppButton from '../components/WhatsAppButton'
import Stats from '../components/Stats'
import Features from '../components/Features'
import QuickAccess from '../components/QuickAccess'
import GeneralManagerMessage from '../components/GeneralManagerMessage'
import UpcomingEvents from '../components/UpcomingEvents'
import SearchModal from '../components/SearchModal'
import CampusTour from '../components/CampusTour'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const FALLBACK_SLIDER_IMAGE = 'https://images.unsplash.com/photo-1434030216415-6bf8185ea1e3?w=1600&h=900&fit=crop'

interface BranchInfo { _id: string; name: string; slug: string; city: string; logo?: string }
interface MainSlide { _id: string; title: string; subtitle: string; image: string; link: string; titleEn?: string; subtitleEn?: string }
interface MainNewsItem { _id: string; title: string; excerpt: string; images: string[]; category: string; day: string; month: string; year: string; slug?: string }
interface GeneralManagerData { name?: string; title?: string; message?: string; imageUrl?: string }
interface GalleryItem { _id: string; src: string; title: string; category: string }

const navLinks = [
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.campuses', to: '/kampusler' },
  { labelKey: 'nav.news', to: '/haberler' },
  { labelKey: 'nav.achievements', to: '/basarilarimiz' },
  { labelKey: 'nav.gallery', to: '/galeri' },
  { labelKey: 'nav.contact', to: '/iletisim' },
]

const MainSite = () => {
  const { t, i18n } = useTranslation()
  const [branches, setBranches] = useState<BranchInfo[]>([])
  const [slides, setSlides] = useState<MainSlide[]>([])
  const [news, setNews] = useState<MainNewsItem[]>([])
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [generalManager, setGeneralManager] = useState<GeneralManagerData | null>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [franchiseOpen, setFranchiseOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [galleryFailedIds, setGalleryFailedIds] = useState<Set<string>>(new Set())
  const location = useLocation()

  const onGalleryImageError = (id: string) => setGalleryFailedIds(prev => new Set([...prev, id]))
  const visibleGallery = gallery.filter(g => !galleryFailedIds.has(g._id))

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const lang = i18n.language || 'tr'
    Promise.all([
      api.get('/branches').catch(() => []),
      api.get('/main/slider', { lang }).catch(() => []),
      api.get('/main/news', { lang }).catch(() => []),
      api.get('/main/gallery').catch(() => []),
      api.get('/main/general-manager').catch(() => null),
    ]).then(([b, s, n, g, gm]) => { setBranches(b); setSlides(s); setNews(n); setGallery(g); setGeneralManager(gm) }).finally(() => setLoading(false))
  }, [i18n.language])

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
            <a href="https://kavramkurs.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition px-2">{t('topBar.kavramKurs')}</a>
            <span className="text-gray-600">|</span>
            <Link to="/kurs-merkezleri" className="hover:text-secondary transition px-2">{t('topBar.courseCenters')}</Link>
            <span className="text-gray-600">|</span>
            <Link to="/egitim" className="hover:text-secondary transition px-2">{t('topBar.education')}</Link>
            <span className="text-gray-600">|</span>
            <Link to="/insan-kaynaklari" className="hover:text-secondary transition px-2">{t('topBar.hr')}</Link>
            <span className="text-gray-600">|</span>
            <div className="relative group">
              <button className="hover:text-secondary transition px-2 flex items-center gap-1">
                {t('topBar.franchise')} <ChevronDown size={12} />
              </button>
              <div className="absolute top-full left-0 bg-[#0f1b2d] shadow-lg rounded-lg py-2 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] border border-gray-700">
                <Link to="/franchise/okul" className="block px-4 py-2.5 text-white hover:bg-secondary hover:text-white text-sm transition">{t('topBar.schoolFranchise')}</Link>
                <Link to="/franchise/kurs" className="block px-4 py-2.5 text-white hover:bg-secondary hover:text-white text-sm transition">{t('topBar.courseFranchise')}</Link>
              </div>
            </div>
            <span className="text-gray-600">|</span>
            <a href="https://dijital.kavram.k12.tr" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition px-2">{t('topBar.digitalSchool')}</a>
            <span className="text-gray-600">|</span>
            <a href="https://store.kavram.k12.tr" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition px-2">{t('topBar.store')}</a>
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
                <p className="text-gray-400 text-xs tracking-wider">{t('hero.tagline')}</p>
              </div>
            </Link>
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className={`font-medium transition text-sm ${isActive(link.to) ? 'text-secondary' : 'text-gray-700 hover:text-primary'}`}>{t(link.labelKey)}</Link>
              ))}
            </nav>
            <div className="hidden lg:flex items-center gap-2">
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => i18n.changeLanguage('tr')} className={`px-3 py-1.5 text-sm font-medium transition ${i18n.language === 'tr' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>TR</button>
                <button onClick={() => i18n.changeLanguage('en')} className={`px-3 py-1.5 text-sm font-medium transition ${i18n.language === 'en' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>EN</button>
              </div>
              <button onClick={() => setSearchOpen(true)} className="p-2 text-gray-600 hover:text-primary rounded-lg transition" aria-label={t('common.search')}>
                <Search size={22} />
              </button>
              <Link to="/kayit" className="inline-flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-full font-semibold hover:bg-primary transition text-sm">{t('nav.register')}</Link>
            </div>
            <button className="lg:hidden text-primary" onClick={() => setMobileMenu(!mobileMenu)} aria-label={t('common.menu')}>
              {mobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="lg:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className={`block py-2.5 border-b border-gray-100 ${isActive(link.to) ? 'text-secondary font-semibold' : 'text-gray-700 hover:text-primary'}`} onClick={() => setMobileMenu(false)}>{t(link.labelKey)}</Link>
              ))}
              <div className="pt-3 border-t border-gray-200 mt-3">
                <p className="text-xs text-gray-400 mb-2">{t('topBar.otherLinks')}</p>
                <a href="https://kavramkurs.com" target="_blank" rel="noopener noreferrer" className="block py-2 text-sm text-gray-600 hover:text-primary">{t('topBar.kavramKursLink')}</a>
                <Link to="/kurs-merkezleri" className="block py-2 text-sm text-gray-600 hover:text-primary" onClick={() => setMobileMenu(false)}>{t('topBar.courseCentersLink')}</Link>
                <Link to="/egitim" className="block py-2 text-sm text-gray-600 hover:text-primary" onClick={() => setMobileMenu(false)}>{t('topBar.educationLink')}</Link>
                <Link to="/insan-kaynaklari" className="block py-2 text-sm text-gray-600 hover:text-primary" onClick={() => setMobileMenu(false)}>{t('topBar.hrLink')}</Link>
                <button onClick={() => setFranchiseOpen(!franchiseOpen)} className="w-full text-left py-2 text-sm text-gray-600 hover:text-primary flex items-center justify-between">
                  {t('topBar.franchise')} <ChevronDown size={14} className={`transition ${franchiseOpen ? 'rotate-180' : ''}`} />
                </button>
                {franchiseOpen && (
                  <div className="pl-4 space-y-1">
                    <Link to="/franchise/okul" className="block py-1.5 text-sm text-gray-500 hover:text-secondary" onClick={() => setMobileMenu(false)}>{t('topBar.schoolFranchise')}</Link>
                    <Link to="/franchise/kurs" className="block py-1.5 text-sm text-gray-500 hover:text-secondary" onClick={() => setMobileMenu(false)}>{t('topBar.courseFranchise')}</Link>
                  </div>
                )}
                <a href="https://dijital.kavram.k12.tr" target="_blank" rel="noopener noreferrer" className="block py-2 text-sm text-gray-600 hover:text-primary">{t('topBar.digitalSchoolLink')}</a>
                <a href="https://store.kavram.k12.tr" target="_blank" rel="noopener noreferrer" className="block py-2 text-sm text-gray-600 hover:text-primary">{t('topBar.storeLink')}</a>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => i18n.changeLanguage('tr')} className={`flex-1 py-2 rounded-lg text-sm font-medium ${i18n.language === 'tr' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>TR</button>
                <button onClick={() => i18n.changeLanguage('en')} className={`flex-1 py-2 rounded-lg text-sm font-medium ${i18n.language === 'en' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>EN</button>
              </div>
              <button onClick={() => { setSearchOpen(true); setMobileMenu(false) }} className="flex items-center gap-2 w-full justify-center py-3 border border-gray-200 rounded-full font-semibold text-primary mt-3">
                <Search size={18} /> {t('common.siteSearch')}
              </button>
              <Link to="/kayit" className="block text-center bg-secondary text-white py-3 rounded-full font-semibold mt-4" onClick={() => setMobileMenu(false)}>{t('nav.register')}</Link>
            </div>
          </div>
        )}
      </header>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Slider + Stats */}
        <section className="relative">
          <div className="overflow-hidden">
          {slides.filter(s => s.image?.trim()).length > 0 ? (
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: false }}
              speed={400}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop
              className="h-[380px] sm:h-[450px] md:h-[520px] lg:h-[580px]"
            >
              {slides.filter(s => s.image?.trim()).map((slide) => {
              const lang = i18n.language || 'tr'
              const slideTitle = getSliderTitle(slide.title, slide.titleEn, lang)
              const slideSubtitle = getSliderSubtitle(slide.subtitle || '', slide.subtitleEn, lang)
              return (
                <SwiperSlide key={slide._id} className="overflow-hidden">
                  <div className="relative h-full w-full overflow-hidden">
                    <img src={slide.image || FALLBACK_SLIDER_IMAGE} alt={slideTitle} className="absolute inset-0 w-full h-full object-cover object-center" onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_SLIDER_IMAGE }} />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,27,45,0.92)_0%,rgba(15,27,45,0.6)_35%,transparent_65%)]" />
                    <div className="absolute inset-0 flex items-center z-10 hero-slide-content">
                      <div className="container mx-auto px-4">
                        <div className="max-w-2xl">
                          {slideSubtitle && <p className="text-secondary font-semibold mb-3 text-lg">{slideSubtitle}</p>}
                          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-sm">{slideTitle}</h2>
                          <Link to={slide.link || '/kampusler'} className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition group">
                            {t('hero.discover')} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
            </Swiper>
          ) : (
            <div className="bg-gradient-to-br from-[#0f1b2d] via-primary to-primary/80 text-white py-28">
              <div className="container mx-auto px-4 text-center">
                <GraduationCap size={72} className="mx-auto mb-6 text-secondary" />
                <h2 className="text-4xl md:text-6xl font-bold mb-6">{t('hero.fallbackTitle')}</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t('hero.fallbackSubtitle')}</p>
              </div>
            </div>
          )}
          </div>
          <div className="relative z-10 -mt-14 md:-mt-16 px-4 md:px-8 pb-4">
            <Stats />
          </div>
        </section>
        <QuickAccess />
        <Features />
        <GeneralManagerMessage name={generalManager?.name} title={generalManager?.title} message={generalManager?.message} image={generalManager?.imageUrl} />

        {/* Tanıtım Videosu */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-secondary font-semibold mb-2">{t('video.intro')}</p>
                <h2 className="text-3xl md:text-4xl font-bold text-primary">{t('video.title')}</h2>
                <p className="text-gray-500 mt-3">{t('video.subtitle')}</p>
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
                    <Play size={16} fill="currentColor" /> {t('video.watch')}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>

        <CampusTour />

        {/* Kavram Gündem - Acil Duyurular */}
        {news.filter(n => (n.category || '').toLowerCase().includes('duyuru')).length > 0 && (
          <section className="py-12 bg-amber-50 border-y border-amber-200/50">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-2 mb-6">
                <Megaphone size={24} className="text-amber-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-primary">{t('agenda.title')}</h2>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                {news.filter(n => (n.category || '').toLowerCase().includes('duyuru')).slice(0, 5).map((item) => {
                  const loc = getLocalizedNews(item, i18n.language || 'tr')
                  return (
                  <Link key={item._id} to={`/haberler/${item.slug || item._id}`} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-amber-200 hover:border-secondary hover:shadow-md transition">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-500" />
                    <span className="font-medium text-gray-800 line-clamp-1">{loc.title}</span>
                    <span className="text-xs text-gray-500 flex-shrink-0">{loc.day} {loc.month} {loc.year}</span>
                  </Link>
                )})}
              </div>
            </div>
          </section>
        )}

        {/* Duyurular - Ayrı bölüm */}
        {news.filter(n => (n.category || '').toLowerCase().includes('duyuru')).length > 0 && (
          <section className="py-16 bg-gradient-to-b from-amber-50/80 to-white">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-12">
                <div>
                  <p className="text-secondary font-semibold mb-2">{t('announcements.badge')}</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-primary">{t('announcements.title')}</h2>
                </div>
                <Link to="/duyurular" className="text-secondary hover:text-primary font-semibold flex items-center gap-1 transition">{t('common.viewAll')} <ArrowRight size={16} /></Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.filter(n => (n.category || '').toLowerCase().includes('duyuru')).slice(0, 6).map((item) => {
                  const loc = getLocalizedNews(item, i18n.language || 'tr')
                  return (
                  <Link key={item._id} to={`/haberler/${item.slug || item._id}`} className="group bg-white rounded-xl p-5 border-l-4 border-secondary shadow-sm hover:shadow-lg hover:border-primary/40 transition">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-secondary/20 text-secondary px-2 py-1 rounded text-xs font-semibold">{t('announcements.announcement')}</span>
                      <span className="text-gray-500 text-sm">{loc.day} {loc.month} {loc.year}</span>
                    </div>
                    <h3 className="font-bold text-primary group-hover:text-secondary transition line-clamp-2">{loc.title}</h3>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">{loc.excerpt}</p>
                  </Link>
                )})}
              </div>
            </div>
          </section>
        )}

        {/* Yaklaşan Etkinlikler */}
        <section className="py-16 bg-gradient-to-br from-primary/5 via-blue-50/50 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <p className="text-secondary font-semibold mb-2">{t('eventsSection.badge')}</p>
                <h2 className="text-3xl md:text-4xl font-bold text-primary">{t('eventsSection.title')}</h2>
              </div>
              <Link to="/etkinlikler" className="text-secondary hover:text-primary font-semibold flex items-center gap-1 transition">{t('common.viewAll')} <ArrowRight size={16} /></Link>
            </div>
            <UpcomingEvents />
          </div>
        </section>

        {/* Haberler - Duyuru hariç */}
        <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">{t('news.title')}</h2>
                <Link to="/haberler" className="text-secondary hover:text-primary font-semibold flex items-center gap-1 transition">{t('common.viewAll')} <ArrowRight size={16} /></Link>
              </div>
              {(() => {
                const haberler = news.filter(n => !(n.category || '').toLowerCase().includes('duyuru'))
                return haberler.length === 0 ? (
                <div className="text-center py-16 rounded-2xl border-2 border-dashed border-primary/20 bg-gradient-to-br from-primary/5 to-white">
                  <p className="text-gray-600 font-medium">{t('news.noNews')}</p>
                  <p className="text-gray-500 text-sm mt-2">{t('news.noNewsHint')}</p>
                </div>
              ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {(() => {
                const loc0 = getLocalizedNews(haberler[0], i18n.language || 'tr')
                return (
                <Link to={`/haberler/${haberler[0].slug || haberler[0]._id}`} className="group">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl h-full min-h-[420px] bg-gray-100">
                    <img src={haberler[0].images?.[0] || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop'} alt={loc0.title} className="absolute inset-0 w-full h-full object-contain object-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-semibold">{loc0.category}</span>
                        <span className="text-white/70 text-sm flex items-center gap-1"><Calendar size={14} /> {loc0.day} {loc0.month} {loc0.year}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-secondary transition leading-tight">{loc0.title}</h3>
                      <p className="text-white/70 mt-3 line-clamp-2">{loc0.excerpt}</p>
                    </div>
                  </div>
                </Link>
                )
              })()}
                {haberler.length > 1 && (
                  <div className="flex flex-col gap-4">
                    {haberler.slice(1, 4).map((item) => {
                      const loc = getLocalizedNews(item, i18n.language || 'tr')
                      return (
                      <Link key={item._id} to={`/haberler/${item.slug || item._id}`} className="group flex gap-4 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                        <div className="w-44 h-36 flex-shrink-0 bg-gray-100 flex items-center justify-center p-2 relative overflow-hidden">
                          <img src={item.images?.[0] || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=150&fit=crop'} alt={loc.title} className="w-full h-full object-contain object-center" />
                          <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-center">
                            <span className="text-sm font-bold block leading-none">{loc.day}</span>
                            <span className="text-[10px] uppercase">{loc.month}</span>
                          </div>
                        </div>
                        <div className="flex-grow py-4 pr-4">
                          <span className="text-xs text-secondary font-semibold">{loc.category}</span>
                          <h4 className="font-bold text-primary group-hover:text-secondary transition line-clamp-2 mt-1">{loc.title}</h4>
                          <p className="text-gray-500 text-sm line-clamp-2 mt-2">{loc.excerpt}</p>
                        </div>
                      </Link>
                    )})}
                  </div>
                )}
              </div>
              )
              })()}
            </div>
          </section>

        {/* Galeri - Fotoğraflarımız */}
        {visibleGallery.length > 0 && (
          <section className="py-16 bg-gradient-to-b from-white to-amber-50/30">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-12">
                <div>
                  <p className="text-secondary font-semibold mb-2">{t('gallery.badge')}</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-primary">{t('gallery.title')}</h2>
                </div>
                <Link to="/galeri" className="text-secondary hover:text-primary font-semibold flex items-center gap-1 transition">{t('common.viewAll')} <ArrowRight size={16} /></Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {visibleGallery.slice(0, 6).map((img) => (
                  <Link key={img._id} to="/galeri" className="group relative block rounded-xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition ring-2 ring-transparent hover:ring-secondary/40">
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300" onError={() => onGalleryImageError(img._id)} />
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
              <p className="text-secondary font-semibold mb-2">{t('campuses.badge')}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">{t('campuses.title')}</h2>
            </div>
            {loading ? (
              <div className="flex justify-center py-10"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
            ) : branches.length === 0 ? (
              <p className="text-center text-gray-400 py-10">{t('campuses.noBranches')}</p>
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
                          <div className="mt-4 flex items-center gap-2 text-secondary font-semibold text-sm group-hover:gap-3 transition-all">{t('campuses.goToCampus')} <ArrowRight size={16} /></div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {branches.length > 6 && (
                  <div className="text-center mt-10">
                    <Link to="/kampusler" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-secondary transition">{t('campuses.viewAllCampuses')} <ArrowRight size={18} /></Link>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{t('cta.title')}</h2>
            <p className="text-xl text-gray-300 mb-10">{t('cta.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kayit" className="inline-flex items-center justify-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition group">{t('cta.registerNow')} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></Link>
              <a href="tel:+902162101974" className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition border border-white/30">0216 210 19 74</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Ege tarzı merkezi, profesyonel */}
      <footer className="relative bg-[#0a1628] text-white overflow-hidden">
        {/* Zarif arka plan deseni - çok hafif */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="container mx-auto px-4 py-14 relative z-10">
          {/* Merkezi logo ve marka */}
          <div className="text-center mb-12">
            <div className="inline-flex flex-col items-center">
              <img src="/Kavram-logo.png" alt="Kavram Koleji" className="h-16 w-auto mb-4 drop-shadow-lg" />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">KAVRAM KOLEJİ</h2>
              <p className="text-gray-400 text-sm mt-1 font-medium tracking-wide">{t('footer.tagline')}</p>
            </div>
          </div>
          {/* İletişim bilgileri - merkezi blok */}
          <div className="max-w-2xl mx-auto text-center space-y-5 mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-gray-300 text-sm">
              <a href="https://maps.google.com/?q=Atatürk+Mah.+Ataşehir+Bulvarı+Gardenya+Plaza+5+Ataşehir+İstanbul" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition">
                <MapPin size={18} className="text-secondary/80 flex-shrink-0" />
                <span>Atatürk Mah. Ataşehir Bulvarı Gardenya Plaza 5, Kat 7 Ataşehir/İstanbul</span>
              </a>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-gray-300 text-sm">
              <a href="tel:+902162101974" className="flex items-center gap-2 hover:text-secondary transition">
                <Phone size={18} className="text-secondary/80 flex-shrink-0" />
                <span>0216 210 19 74</span>
              </a>
              <a href="mailto:info@kavram.com.tr" className="flex items-center gap-2 hover:text-secondary transition">
                <Mail size={18} className="text-secondary/80 flex-shrink-0" />
                <span>info@kavram.com.tr</span>
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2">
              <Link to="/iletisim" className="inline-flex items-center gap-2 text-gray-400 hover:text-secondary text-sm transition">
                <Map size={16} /> {t('footer.transportContact')}
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link to="/site-haritasi" className="text-gray-400 hover:text-secondary text-sm transition">{t('footer.sitemap')}</Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link to="/kampusler" className="text-gray-400 hover:text-secondary text-sm transition">{t('footer.campusesLink')}</Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link to="/kayit" className="text-gray-400 hover:text-secondary text-sm transition">{t('footer.registerLink')}</Link>
            </div>
          </div>
          {/* Sosyal medya - zarif */}
          <div className="flex justify-center gap-2 mb-10">
            <a href="https://facebook.com/kavramkoleji" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary/20 hover:text-secondary transition text-gray-400" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="https://instagram.com/kavramkoleji" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary/20 hover:text-secondary transition text-gray-400" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="https://youtube.com/@kavramkoleji" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary/20 hover:text-secondary transition text-gray-400" aria-label="YouTube"><Youtube size={18} /></a>
            <a href="https://twitter.com/kavramkoleji" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary/20 hover:text-secondary transition text-gray-400" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="https://linkedin.com/company/kavramkoleji" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary/20 hover:text-secondary transition text-gray-400" aria-label="LinkedIn"><svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
          </div>
          {/* Alt çizgi ve telif */}
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-gray-500 text-xs">{t('footer.copyright')}</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs">
              <Link to="/kvkk" className="text-gray-500 hover:text-secondary transition">{t('footer.kvkk')}</Link>
              <Link to="/site-haritasi" className="text-gray-500 hover:text-secondary transition">{t('footer.sitemap')}</Link>
              <Link to="/sss" className="text-gray-500 hover:text-secondary transition">{t('footer.faq')}</Link>
              <Link to="/erisilebilirlik" className="text-gray-500 hover:text-secondary transition">{t('footer.accessibility')}</Link>
            </div>
          </div>
        </div>
        {/* Yardımcı butonlar - sol alt erişilebilirlik, sağ alt yukarı çık */}
        <Link to="/erisilebilirlik" className="fixed bottom-6 left-4 sm:left-6 z-40 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-secondary transition shadow-lg border border-white/10" aria-label={t('footer.accessibilityLabel')}>
          <Accessibility size={20} />
        </Link>
        {showScrollTop && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-20 sm:right-24 z-40 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-secondary transition shadow-lg border border-white/10" aria-label={t('footer.scrollTop')}>
            <ChevronUp size={22} />
          </button>
        )}
      </footer>
      <WhatsAppButton />
    </div>
  )
}

export default MainSite
