import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Trophy, TrendingUp, Users, Award, Star, Target, ChevronRight } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const Basarilarimiz = () => {
  const { t } = useTranslation()
  const stats = [
    { icon: Trophy, value: '50+', labelKey: 'pages.basarilarimiz.yearsExperience', color: 'bg-yellow-500' },
    { icon: Users, value: '1.000.000+', labelKey: 'pages.basarilarimiz.graduateCount', color: 'bg-blue-500' },
    { icon: TrendingUp, value: '%95', labelKey: 'pages.basarilarimiz.universityPlacement', color: 'bg-green-500' },
    { icon: Award, value: '13+', labelKey: 'pages.basarilarimiz.campuses', color: 'bg-purple-500' },
  ]
  const achievements = [
    { titleKey: 'pages.basarilarimiz.yksSuccess', descKey: 'pages.basarilarimiz.yksSuccessDesc', icon: Star },
    { titleKey: 'pages.basarilarimiz.lgsSuccess', descKey: 'pages.basarilarimiz.lgsSuccessDesc', icon: Target },
    { titleKey: 'pages.basarilarimiz.olympiadSuccess', descKey: 'pages.basarilarimiz.olympiadSuccessDesc', icon: Trophy },
    { titleKey: 'pages.basarilarimiz.sportsSuccess', descKey: 'pages.basarilarimiz.sportsSuccessDesc', icon: Award },
    { titleKey: 'pages.basarilarimiz.artSuccess', descKey: 'pages.basarilarimiz.artSuccessDesc', icon: Star },
    { titleKey: 'pages.basarilarimiz.projectSuccess', descKey: 'pages.basarilarimiz.projectSuccessDesc', icon: Target },
  ]
  return (
    <MainWrapper>
      <PageBanner title={t('pages.basarilarimiz.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.basarilarimiz.title') }]} />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
                <div className={`w-14 h-14 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon size={28} className="text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</h3>
                <p className="text-gray-500 text-sm mt-1">{t(stat.labelKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">{t('pages.basarilarimiz.areasTitle')}</h2>
              <p className="text-gray-500 max-w-2xl">{t('pages.basarilarimiz.areasDesc')}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/tarihcemiz" className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:border-secondary hover:text-secondary transition">{t('pages.basarilarimiz.ourHistory')} <ChevronRight size={14} /></Link>
              <Link to="/yonetim-kadrosu" className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:border-secondary hover:text-secondary transition">{t('pages.basarilarimiz.managementTeam')} <ChevronRight size={14} /></Link>
              <Link to="/kurumsal-kimlik" className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:border-secondary hover:text-secondary transition">{t('pages.basarilarimiz.corporateIdentity')} <ChevronRight size={14} /></Link>
              <Link to="/franchise" className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:border-secondary hover:text-secondary transition">{t('pages.basarilarimiz.franchise')} <ChevronRight size={14} /></Link>
              <Link to="/insan-kaynaklari" className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:border-secondary hover:text-secondary transition">{t('pages.basarilarimiz.humanResources')} <ChevronRight size={14} /></Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-lg hover:border-secondary/30 transition group">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition">
                  <item.icon size={24} className="text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">{t(item.titleKey)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default Basarilarimiz