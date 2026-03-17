import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ChevronRight, Star, BookOpen, Users, Target, Monitor, Award, Clock, FileText, Video, CheckCircle, GraduationCap, BarChart3, ClipboardCheck, Layers, UserCheck, Calendar, Baby, School } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const menuItems = [
  { id: 'sistem', labelKey: 'menuSistem', icon: BookOpen },
  { id: 'rehberlik', labelKey: 'menuRehberlik', icon: Users },
  { id: 'performans', labelKey: 'menuPerformans', icon: BarChart3 },
  { id: 'olcme', labelKey: 'menuOlcme', icon: ClipboardCheck },
  { id: 'yayin', labelKey: 'menuYayin', icon: Layers },
  { id: 'dijital', labelKey: 'menuDijital', icon: Monitor },
  { id: 'kadro', labelKey: 'menuKadro', icon: UserCheck },
  { id: 'etut', labelKey: 'menuEtut', icon: Clock },
]

const publicationItems = ['topicBooks', 'questionBanks', 'mockExams', 'worksheets', 'smartNotebooks']

const Egitim = () => {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState('sistem')

  return (
    <MainWrapper>
      <PageBanner 
        title={t('pages.egitim.title')} 
        breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.siteHaritasi.education'), to: '/egitim' }, { label: t('pages.egitim.title') }]} 
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 mb-12 border border-gray-100">
            <h3 className="text-xl font-bold text-primary mb-4">{t('pages.egitim.kavramLevels')}</h3>
            <p className="text-gray-600 text-sm mb-6">{t('pages.egitim.levelsDesc')}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/egitim/anaokulu" className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md hover:border-secondary/30 border border-transparent transition group">
                <Baby size={28} className="text-secondary" />
                <div><span className="font-semibold text-primary group-hover:text-secondary transition">{t('pages.egitim.anaokulu')}</span><p className="text-xs text-gray-500">{t('pages.egitim.anaokuluAge')}</p></div>
              </Link>
              <Link to="/egitim/ilkokul" className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md hover:border-secondary/30 border border-transparent transition group">
                <BookOpen size={28} className="text-secondary" />
                <div><span className="font-semibold text-primary group-hover:text-secondary transition">{t('pages.egitim.ilkokul')}</span><p className="text-xs text-gray-500">{t('pages.egitim.ilkokulGrade')}</p></div>
              </Link>
              <Link to="/egitim/ortaokul" className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md hover:border-secondary/30 border border-transparent transition group">
                <School size={28} className="text-secondary" />
                <div><span className="font-semibold text-primary group-hover:text-secondary transition">{t('pages.egitim.ortaokul')}</span><p className="text-xs text-gray-500">{t('pages.egitim.ortaokulGrade')}</p></div>
              </Link>
              <Link to="/egitim/lise" className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md hover:border-secondary/30 border border-transparent transition group">
                <GraduationCap size={28} className="text-secondary" />
                <div><span className="font-semibold text-primary group-hover:text-secondary transition">{t('pages.egitim.lise')}</span><p className="text-xs text-gray-500">{t('pages.egitim.liseGrade')}</p></div>
              </Link>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex flex-col md:flex-row gap-8 mb-12">
                <div className="md:w-1/2">
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {t('pages.egitim.introText')}
                  </p>
                  <img src="/egitim-sistemi.jpg" alt={t('pages.egitim.title')} className="w-full rounded-2xl shadow-lg" />
                </div>
                <div className="md:w-1/2">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                    <h3 className="text-purple-600 font-bold text-sm mb-2">{t('pages.egitim.examWinningTitle')}</h3>
                    <h4 className="text-xl font-bold text-gray-800 mb-4">{t('pages.egitim.dataDrivenTitle')}</h4>
                    <p className="text-gray-600 text-sm mb-6">{t('pages.egitim.dataDrivenDesc')}</p>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{t('pages.egitim.academicTracking')}</h4>
                    <p className="text-gray-600 text-sm mb-6">{t('pages.egitim.academicTrackingDesc')}</p>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{t('pages.egitim.measurementTitle')}</h4>
                    <p className="text-gray-600 text-sm mb-6">{t('pages.egitim.measurementDesc')}</p>
                    <h4 className="text-lg font-bold text-gray-800 mb-3">{t('pages.egitim.publicationTitle')}</h4>
                    <div className="space-y-2">
                      {publicationItems.map((key, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                          <Star size={14} className="text-purple-500" /> {t(`pages.egitim.${key}`)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{t('pages.egitim.digitalTitle')}</h3>
                <p className="text-gray-600 leading-relaxed">{t('pages.egitim.digitalDesc')}</p>
              </div>

              <div id="rehberlik" className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-8 mb-8 text-white">
                <h3 className="text-2xl font-bold mb-4">{t('pages.egitim.menuRehberlik')}</h3>
                <p className="text-white/90 mb-6">{t('pages.egitim.dataDrivenDesc')}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/10 rounded-xl p-5">
                    <h4 className="font-bold mb-3 flex items-center gap-2"><Users size={20} /> {t('pages.egitim.mentorTitle')}</h4>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• {t('pages.egitim.mentorItem1')}</li>
                      <li>• {t('pages.egitim.mentorItem2')}</li>
                      <li>• {t('pages.egitim.mentorItem3')}</li>
                      <li>• {t('pages.egitim.mentorItem4')}</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 rounded-xl p-5">
                    <h4 className="font-bold mb-3 flex items-center gap-2"><Target size={20} /> {t('pages.egitim.dataGuidanceTitle')}</h4>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• {t('pages.egitim.dataGuidanceItem1')}</li>
                      <li>• {t('pages.egitim.dataGuidanceItem2')}</li>
                      <li>• {t('pages.egitim.dataGuidanceItem3')}</li>
                      <li>• {t('pages.egitim.dataGuidanceItem4')}</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 rounded-xl p-5">
                    <h4 className="font-bold mb-3 flex items-center gap-2"><Calendar size={20} /> {t('pages.egitim.academicCalendarTitle')}</h4>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• {t('pages.egitim.academicCalendarItem1')}</li>
                      <li>• {t('pages.egitim.academicCalendarItem2')}</li>
                      <li>• {t('pages.egitim.academicCalendarItem3')}</li>
                      <li>• {t('pages.egitim.academicCalendarItem4')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div id="performans" className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('pages.egitim.performanceTitle')}</h3>
                <p className="text-gray-600 leading-relaxed">{t('pages.egitim.academicTrackingDesc')}</p>
              </div>

              <div id="olcme" className="bg-gray-50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('pages.egitim.olcmeTitle')}</h3>
                <p className="text-gray-600 leading-relaxed mb-8">{t('pages.egitim.measurementDesc')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-bold text-purple-600 mb-3 flex items-center gap-2"><FileText size={20} /> {t('pages.egitim.denemeTitle')}</h4>
                    <p className="text-gray-600 text-sm mb-4">{t('pages.egitim.denemeDesc')}</p>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-purple-700 mb-2">{t('pages.egitim.resultCardTitle')}</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• {t('pages.egitim.resultCard1')}</li>
                        <li>• {t('pages.egitim.resultCard2')}</li>
                        <li>• {t('pages.egitim.resultCard3')}</li>
                        <li>• {t('pages.egitim.resultCard4')}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-bold text-purple-600 mb-3 flex items-center gap-2"><Video size={20} /> {t('pages.egitim.videoBankTitle')}</h4>
                    <p className="text-gray-600 text-sm">{t('pages.egitim.videoBankDesc')}</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm md:col-span-2">
                    <h4 className="font-bold text-purple-600 mb-3 flex items-center gap-2"><Monitor size={20} /> {t('pages.egitim.smartExamTitle')}</h4>
                    <p className="text-gray-600 text-sm">{t('pages.egitim.smartExamDesc')}</p>
                  </div>
                </div>
              </div>

              <div id="yayin" className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('pages.egitim.publicationSectionTitle')}</h3>
                <p className="text-gray-600 leading-relaxed mb-8">{t('pages.egitim.publicationSectionDesc')}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <BookOpen size={40} className="mx-auto text-purple-600 mb-4" />
                    <h4 className="font-bold text-gray-800 mb-2">{t('pages.egitim.topicBooksTitle')}</h4>
                    <p className="text-gray-600 text-sm">{t('pages.egitim.topicBooksDesc')}</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                    <FileText size={40} className="mx-auto text-blue-600 mb-4" />
                    <h4 className="font-bold text-gray-800 mb-2">{t('pages.egitim.questionBanksTitle')}</h4>
                    <p className="text-gray-600 text-sm">{t('pages.egitim.questionBanksDesc')}</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <ClipboardCheck size={40} className="mx-auto text-green-600 mb-4" />
                    <h4 className="font-bold text-gray-800 mb-2">{t('pages.egitim.testsTitle')}</h4>
                    <p className="text-gray-600 text-sm">{t('pages.egitim.testsDesc')}</p>
                  </div>
                </div>
              </div>

              <div id="dijital" className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
                <h3 className="text-2xl font-bold mb-4">{t('pages.egitim.digitalTitle')}</h3>
                <p className="text-white/90 leading-relaxed">{t('pages.egitim.digitalDesc')}</p>
              </div>

              <div id="kadro" className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('pages.egitim.staffTitle')}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{t('pages.egitim.staffDesc')}</p>
                <div className="bg-purple-50 rounded-xl p-6">
                  <h4 className="font-bold text-purple-700 mb-3">{t('pages.egitim.lessonContentTitle')}</h4>
                  <p className="text-gray-600 text-sm">{t('pages.egitim.lessonContentDesc')}</p>
                </div>
              </div>

              <div id="etut" className="bg-gray-50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('pages.egitim.etutTitle')}</h3>
                <p className="text-gray-600 leading-relaxed mb-8">{t('pages.egitim.etutDesc')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-bold text-purple-600 mb-3 flex items-center gap-2"><Clock size={20} /> {t('pages.egitim.generalEtut')}</h4>
                    <p className="text-gray-600 text-sm">{t('pages.egitim.generalEtutDesc')}</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-bold text-purple-600 mb-3 flex items-center gap-2"><GraduationCap size={20} /> {t('pages.egitim.schoolSupport')}</h4>
                    <p className="text-gray-600 text-sm">{t('pages.egitim.schoolSupportDesc')}</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-bold text-purple-600 mb-3 flex items-center gap-2"><Calendar size={20} /> {t('pages.egitim.appointmentEtut')}</h4>
                    <p className="text-gray-600 text-sm">{t('pages.egitim.appointmentEtutDesc')}</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-bold text-purple-600 mb-3 flex items-center gap-2"><CheckCircle size={20} /> {t('pages.egitim.questionOffice')}</h4>
                    <p className="text-gray-600 text-sm">{t('pages.egitim.questionOfficeDesc')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24 border border-gray-100">
                <h3 className="text-lg font-bold text-purple-600 mb-4 pb-3 border-b border-gray-100">{t('pages.egitim.educationAtKavram')}</h3>
                <nav className="space-y-1">
                  {menuItems.map(item => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setActiveSection(item.id)}
                      className={`flex items-center justify-between py-3 px-3 rounded-lg text-sm transition group ${activeSection === item.id ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <span className="flex items-center gap-2">
                        <item.icon size={16} />
                        {t(`pages.egitim.${item.labelKey}`)}
                      </span>
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-purple-500 transition" />
                    </a>
                  ))}
                </nav>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Link to="/kurs-merkezleri" className="block w-full text-center bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition">
                    {t('pages.egitim.courseCenters')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default Egitim
