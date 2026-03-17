import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { MapPin, ChevronRight } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const siteMapKeys = [
  'home', 'campuses', 'news', 'announcements', 'events', 'achievements', 'gallery', 'education',
  'ourHistory', 'missionVision', 'managementTeam', 'corporateIdentity', 'academicCalendar', 'graduates',
  'quality', 'faq', 'rightToInfo', 'appointment', 'accessibility', 'contact', 'register', 'candidateStudent',
  'kvkk', 'humanResources', 'franchise', 'courseCenters'
]

const siteMapPaths: Record<string, string> = {
  home: '/',
  campuses: '/kampusler',
  news: '/haberler',
  announcements: '/duyurular',
  events: '/etkinlikler',
  achievements: '/basarilarimiz',
  gallery: '/galeri',
  education: '/egitim',
  ourHistory: '/tarihcemiz',
  missionVision: '/misyon-vizyon',
  managementTeam: '/yonetim-kadrosu',
  corporateIdentity: '/kurumsal-kimlik',
  academicCalendar: '/akademik-takvim',
  graduates: '/mezunlar',
  quality: '/kalite',
  faq: '/sss',
  rightToInfo: '/bilgi-edinme',
  appointment: '/randevu',
  accessibility: '/erisilebilirlik',
  contact: '/iletisim',
  register: '/kayit',
  candidateStudent: '/aday-ogrenci',
  kvkk: '/kvkk',
  humanResources: '/insan-kaynaklari',
  franchise: '/franchise',
  courseCenters: '/kurs-merkezleri',
}

const SiteHaritasi = () => {
  const { t } = useTranslation()
  return (
    <MainWrapper>
      <PageBanner title={t('pages.siteHaritasi.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.siteHaritasi.title') }]} />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-2 mb-8">
            <MapPin size={24} className="text-secondary" />
            <h2 className="text-2xl font-bold text-primary">{t('pages.siteHaritasi.allPages')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {siteMapKeys.map((key) => (
              <Link
                key={key}
                to={siteMapPaths[key] || '/'}
                className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-gray-100 hover:border-secondary/30 hover:shadow-md transition"
              >
                <ChevronRight size={16} className="text-gray-400" />
                <span className="font-medium text-gray-700 hover:text-primary">{t(`pages.siteHaritasi.${key}`)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default SiteHaritasi
