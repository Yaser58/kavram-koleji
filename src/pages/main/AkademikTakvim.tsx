import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'
import api from '../../lib/api'

interface CalendarItem {
  _id: string
  title: string
  startDate: string
  endDate?: string
  type: string
}

const DEMO_CALENDAR: CalendarItem[] = (() => {
  const y = new Date().getFullYear()
  return [
    { _id: 'demo-1', title: 'Kayıt Dönemi Başlangıcı', startDate: `${y}-03-01`, endDate: `${y}-08-31`, type: 'kayit' },
    { _id: 'demo-2', title: '2024-2025 Eğitim Öğretim Yılı Sonu', startDate: `${y}-06-13`, endDate: `${y}-06-13`, type: 'donem' },
    { _id: 'demo-3', title: 'Yaz Tatili', startDate: `${y}-06-14`, endDate: `${y}-09-08`, type: 'tatil' },
    { _id: 'demo-4', title: '2025-2026 Eğitim Öğretim Yılı Başlangıcı', startDate: `${y}-09-09`, endDate: `${y}-09-09`, type: 'donem' },
    { _id: 'demo-5', title: '1. Dönem Ara Tatil', startDate: `${y}-11-17`, endDate: `${y}-11-21`, type: 'tatil' },
    { _id: 'demo-6', title: '1. Dönem Sınav Haftası', startDate: `${y}-12-16`, endDate: `${y}-12-20`, type: 'sinav' },
    { _id: 'demo-7', title: 'Yarıyıl Tatili', startDate: `${y + 1}-01-24`, endDate: `${y + 1}-02-08`, type: 'tatil' },
    { _id: 'demo-8', title: '2. Dönem Başlangıcı', startDate: `${y + 1}-02-09`, endDate: `${y + 1}-02-09`, type: 'donem' },
    { _id: 'demo-9', title: '2. Dönem Ara Tatil', startDate: `${y + 1}-04-07`, endDate: `${y + 1}-04-11`, type: 'tatil' },
    { _id: 'demo-10', title: 'LGS Başvuru Dönemi', startDate: `${y + 1}-04-01`, endDate: `${y + 1}-04-15`, type: 'kayit' },
    { _id: 'demo-11', title: 'LGS Sınavı', startDate: `${y + 1}-06-06`, endDate: `${y + 1}-06-06`, type: 'sinav' },
    { _id: 'demo-12', title: '2. Dönem Sınav Haftası', startDate: `${y + 1}-05-26`, endDate: `${y + 1}-05-30`, type: 'sinav' },
    { _id: 'demo-13', title: '2025-2026 Eğitim Öğretim Yılı Sonu', startDate: `${y + 1}-06-06`, endDate: `${y + 1}-06-06`, type: 'donem' },
  ]
})()

const AkademikTakvim = () => {
  const { t, i18n } = useTranslation()
  const [items, setItems] = useState<CalendarItem[]>([])
  const [loading, setLoading] = useState(true)
  const [year, setYear] = useState(new Date().getFullYear())
  const locale = i18n.language === 'en' ? 'en-US' : 'tr-TR'

  useEffect(() => {
    api.get('/main/academic-calendar').then((data: CalendarItem[]) => {
      const list = Array.isArray(data) && data.length > 0 ? data : DEMO_CALENDAR
      setItems(list)
    }).catch(() => setItems(DEMO_CALENDAR)).finally(() => setLoading(false))
  }, [])

  const filtered = items.filter(i => {
    const startY = new Date(i.startDate).getFullYear()
    const endY = i.endDate ? new Date(i.endDate).getFullYear() : startY
    return startY === year || endY === year
  })
  const typeLabels: Record<string, string> = {
    kayit: t('pages.akademikTakvim.typeKayit'),
    sinav: t('pages.akademikTakvim.typeSinav'),
    tatil: t('pages.akademikTakvim.typeTatil'),
    donem: t('pages.akademikTakvim.typeDonem'),
    diger: t('pages.akademikTakvim.typeDiger'),
  }

  return (
    <MainWrapper>
      <PageBanner title={t('pages.akademikTakvim.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.akademikTakvim.title') }]} />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-primary">{t('pages.akademikTakvim.yearlyCalendar')}</h2>
            <div className="flex items-center gap-2">
              <button onClick={() => setYear(y => y - 1)} className="p-2 rounded-lg bg-white border hover:bg-gray-50">
                <ChevronLeft size={20} />
              </button>
              <span className="font-bold text-primary min-w-[80px] text-center">{year}</span>
              <button onClick={() => setYear(y => y + 1)} className="p-2 rounded-lg bg-white border hover:bg-gray-50">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">{t('pages.akademikTakvim.emptyState')}</p>
              <p className="text-gray-400 text-sm mt-2">{t('pages.akademikTakvim.emptyHint')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()).map((item) => (
                <div key={item._id} className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-md border border-gray-100">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-primary">{new Date(item.startDate).getDate()}</span>
                    <span className="text-xs text-gray-600">{new Date(item.startDate).toLocaleDateString(locale, { month: 'short' })}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-primary">{item.title}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(item.startDate).toLocaleDateString(locale)}
                      {item.endDate && ` - ${new Date(item.endDate).toLocaleDateString(locale)}`}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary/20 text-secondary">
                    {typeLabels[item.type] || item.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </MainWrapper>
  )
}

export default AkademikTakvim
