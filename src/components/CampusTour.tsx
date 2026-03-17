import { useTranslation } from 'react-i18next'
import { Camera, BookOpen, FlaskConical, Monitor, Dumbbell } from 'lucide-react'

const CampusTour = () => {
  const { t } = useTranslation()
  const areas = [
    { icon: BookOpen, titleKey: 'campusTour.library', descKey: 'campusTour.libraryDesc' },
    { icon: FlaskConical, titleKey: 'campusTour.lab', descKey: 'campusTour.labDesc' },
    { icon: Monitor, titleKey: 'campusTour.itClass', descKey: 'campusTour.itClassDesc' },
    { icon: Dumbbell, titleKey: 'campusTour.gym', descKey: 'campusTour.gymDesc' },
    { icon: Camera, titleKey: 'campusTour.artStudio', descKey: 'campusTour.artStudioDesc' },
  ]
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-secondary font-semibold mb-2">{t('campusTour.badge')}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">{t('campusTour.title')}</h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            {t('campusTour.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {areas.map((area, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 text-center card-hover group cursor-pointer">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition">
                <area.icon size={28} className="text-primary group-hover:text-secondary transition" />
              </div>
              <h3 className="font-bold text-primary mb-2">{t(area.titleKey)}</h3>
              <p className="text-gray-500 text-sm">{t(area.descKey)}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('campusTour.ctaTitle')}</h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            {t('campusTour.ctaDesc')}
          </p>
          <a
            href="tel:+902667146464"
            className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition"
          >
            {t('campusTour.bookAppointment')}: (0266) 714 64 64
          </a>
        </div>
      </div>
    </section>
  )
}

export default CampusTour
