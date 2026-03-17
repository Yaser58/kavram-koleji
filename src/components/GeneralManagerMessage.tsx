import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Quote, ArrowRight } from 'lucide-react'

interface GeneralManagerMessageProps {
  name?: string
  title?: string
  message?: string
  image?: string
}

const GeneralManagerMessage = ({ name = 'Selçuk IŞIK', title, message, image }: GeneralManagerMessageProps) => {
  const { t } = useTranslation()
  const displayTitle = title ?? t('generalManager.defaultTitle')
  const displayMessage = message ?? t('generalManager.defaultMessage')
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="md:w-80 flex-shrink-0">
              <div className="aspect-[3/5] bg-gray-100 overflow-hidden flex items-end justify-center">
                <img src={image || '/bina_yhg.jpg'} alt={name} className="w-full h-full object-contain object-bottom" onError={(e) => { (e.target as HTMLImageElement).src = '/bina_yhg.jpg' }} />
              </div>
            </div>
            <div className="flex-1 p-8 md:p-12">
              <Quote size={40} className="text-secondary/30 mb-4" />
              <p className="text-gray-600 leading-relaxed mb-6 italic">"{displayMessage}"</p>
              <div className="border-t border-gray-200 pt-6">
                <p className="font-bold text-primary text-lg">{name}</p>
                <p className="text-secondary font-semibold text-sm">{displayTitle}</p>
              </div>
              <Link to="/yonetim-kadrosu" className="inline-flex items-center gap-2 text-secondary font-semibold mt-4 hover:text-primary transition">
                {t('generalManager.managementTeam')} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GeneralManagerMessage
