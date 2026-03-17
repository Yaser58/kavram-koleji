import { useTranslation } from 'react-i18next'
import { BookOpen, Users, Award, Globe, Microscope, Palette } from 'lucide-react'

const Features = () => {
  const { t } = useTranslation()
  const features = [
    { icon: BookOpen, titleKey: 'features.academicExcellence', descKey: 'features.academicExcellenceDesc' },
    { icon: Users, titleKey: 'features.expertStaff', descKey: 'features.expertStaffDesc' },
    { icon: Award, titleKey: 'features.successOriented', descKey: 'features.successOrientedDesc' },
    { icon: Globe, titleKey: 'features.foreignLanguage', descKey: 'features.foreignLanguageDesc' },
    { icon: Microscope, titleKey: 'features.labs', descKey: 'features.labsDesc' },
    { icon: Palette, titleKey: 'features.socialActivities', descKey: 'features.socialActivitiesDesc' },
  ]
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-secondary font-semibold mb-2">{t('features.whyUs')}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">{t('features.title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg card-hover border border-primary/5 hover:border-secondary/30 transition-colors"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary/15 to-secondary/20 rounded-xl flex items-center justify-center mb-6">
                <feature.icon size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{t(feature.titleKey)}</h3>
              <p className="text-gray-600">{t(feature.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
