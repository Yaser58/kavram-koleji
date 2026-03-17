import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Monitor, FileEdit, GraduationCap, BookOpen, Calendar, Mail, Image, Trophy, FileText, ExternalLink } from 'lucide-react'

const QuickAccess = () => {
  const { t } = useTranslation()
  const quickLinks = [
    { labelKey: 'quickAccess.digitalSchool', icon: Monitor, href: 'https://dijital.kavram.k12.tr', external: true },
    { labelKey: 'quickAccess.register', icon: FileEdit, to: '/kayit' },
    { labelKey: 'quickAccess.candidateStudent', icon: GraduationCap, to: '/aday-ogrenci' },
    { labelKey: 'quickAccess.education', icon: BookOpen, to: '/egitim' },
    { labelKey: 'quickAccess.academicCalendar', icon: Calendar, to: '/akademik-takvim' },
    { labelKey: 'quickAccess.contact', icon: Mail, to: '/iletisim' },
    { labelKey: 'quickAccess.gallery', icon: Image, to: '/galeri' },
    { labelKey: 'quickAccess.achievements', icon: Trophy, to: '/basarilarimiz' },
    { labelKey: 'quickAccess.kvkk', icon: FileText, to: '/kvkk' },
  ]
  return (
    <section className="py-12 bg-gradient-to-b from-white to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-secondary font-semibold mb-2">{t('quickAccess.title')}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">{t('quickAccess.subtitle')}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {quickLinks.map((item, i) => (
            item.external ? (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-4 bg-white rounded-xl hover:bg-secondary/10 hover:shadow-lg transition border border-primary/10 hover:border-secondary/30"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-secondary/20 transition">
                  <item.icon size={24} className="text-primary group-hover:text-secondary transition" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary text-center line-clamp-2">{t(item.labelKey)}</span>
                <ExternalLink size={12} className="text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition" />
              </a>
            ) : (
              <Link
                key={i}
                to={item.to!}
                className="group flex flex-col items-center p-4 bg-white rounded-xl hover:bg-secondary/10 hover:shadow-lg transition border border-primary/10 hover:border-secondary/30"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-secondary/20 transition">
                  <item.icon size={24} className="text-primary group-hover:text-secondary transition" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary text-center line-clamp-2">{t(item.labelKey)}</span>
              </Link>
            )
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuickAccess
