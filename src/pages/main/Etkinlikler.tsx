import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { Calendar, MapPinned, ArrowRight } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'
import api from '../../lib/api'

interface EventItem {
  _id: string
  title: string
  startDate: string
  endDate?: string
  location?: string
  description?: string
  imageUrl?: string
}

const DEMO_EVENTS: EventItem[] = (() => {
  const now = new Date()
  const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 24 * 60 * 60 * 1000)
  return [
    { _id: 'demo-1', title: 'Bilim Şenliği', startDate: addDays(now, 5).toISOString(), location: 'Ana Kampüs', description: 'Öğrencilerimizin bilim projelerini sergileyeceği renkli bir etkinlik.', imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop' },
    { _id: 'demo-2', title: 'Veli Toplantısı', startDate: addDays(now, 12).toISOString(), location: 'Konferans Salonu', description: 'Eğitim kadromuzla tanışma ve bilgilendirme toplantısı.', imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop' },
    { _id: 'demo-3', title: 'Spor Günü', startDate: addDays(now, 18).toISOString(), location: 'Spor Salonu', description: 'Takım yarışmaları ve spor aktiviteleri.', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop' },
    { _id: 'demo-4', title: 'Mezuniyet Töreni', startDate: addDays(now, 25).toISOString(), location: 'Açık Hava Alanı', description: '2025-2026 mezunlarımızı kutluyoruz.', imageUrl: 'https://images.unsplash.com/photo-1541339907198-e087566dd9fd?w=400&h=250&fit=crop' },
    { _id: 'demo-5', title: 'Kariyer Günü', startDate: new Date(now.getFullYear(), now.getMonth() - 1, 15).toISOString(), location: 'Ana Kampüs', description: 'Geçmiş etkinlik örneği.', imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a0546980c66?w=400&h=250&fit=crop' },
  ]
})()

const Etkinlikler = () => {
  const { t, i18n } = useTranslation()
  const { id } = useParams()
  const [events, setEvents] = useState<EventItem[]>([])
  const [selected, setSelected] = useState<EventItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/main/events').then((data: EventItem[]) => {
      const list = Array.isArray(data) && data.length > 0 ? data : DEMO_EVENTS
      setEvents(list)
    }).catch(() => setEvents(DEMO_EVENTS)).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (id && events.length) {
      const ev = events.find(e => e._id === id)
      setSelected(ev || null)
    } else {
      setSelected(null)
    }
  }, [id, events])

  const locale = i18n.language === 'en' ? 'en-US' : 'tr-TR'
  const formatDate = (d: string) => new Date(d).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
  const upcoming = events.filter(e => new Date(e.startDate) >= new Date()).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
  const past = events.filter(e => new Date(e.startDate) < new Date()).sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())

  if (selected) {
    return (
      <MainWrapper>
        <PageBanner title={selected.title} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.etkinlikler.title'), to: '/etkinlikler' }, { label: selected.title }]} />
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link to="/etkinlikler" className="inline-flex items-center gap-2 text-secondary font-semibold mb-8 hover:text-primary transition">
              <ArrowRight size={16} className="rotate-180" /> {t('pages.etkinlikler.backToEvents')}
            </Link>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              {selected.imageUrl && (
                <div className="h-64 bg-gray-100">
                  <img src={selected.imageUrl} alt={selected.title} className="w-full h-full object-contain object-center" />
                </div>
              )}
              <div className="p-8">
                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="flex items-center gap-2 text-secondary font-semibold">
                    <Calendar size={18} /> {formatDate(selected.startDate)}
                  </span>
                  {selected.location && (
                    <span className="flex items-center gap-2 text-gray-600">
                      <MapPinned size={18} /> {selected.location}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">{selected.title}</h1>
                {selected.description && (
                  <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: selected.description.replace(/\n/g, '<br />') }} />
                )}
              </div>
            </div>
          </div>
        </section>
      </MainWrapper>
    )
  }

  return (
    <MainWrapper>
      <PageBanner title={t('pages.etkinlikler.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.etkinlikler.title') }]} />

      <section className="py-16 bg-gradient-to-br from-primary/5 via-blue-50/50 to-secondary/5">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border-2 border-dashed border-secondary/30 bg-gradient-to-br from-secondary/5 via-white to-primary/5">
              <Calendar size={48} className="mx-auto text-secondary/60 mb-4" />
              <p className="text-gray-600 font-medium">{t('pages.etkinlikler.emptyState')}</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-primary mb-8">{t('pages.etkinlikler.upcoming')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {upcoming.map((ev) => (
                  <Link key={ev._id} to={`/etkinlikler/${ev._id}`} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition border border-secondary/20 hover:border-secondary/50">
                    <div className="h-40 bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center">
                      {ev.imageUrl ? (
                        <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-contain object-center" />
                      ) : (
                        <Calendar size={48} className="text-primary/30" />
                      )}
                    </div>
                    <div className="p-5">
                      <span className="text-sm text-secondary font-semibold">{formatDate(ev.startDate)}</span>
                      <h3 className="font-bold text-primary group-hover:text-secondary transition mt-2 line-clamp-2">{ev.title}</h3>
                      {ev.location && <p className="text-gray-500 text-sm mt-2 flex items-center gap-1"><MapPinned size={14} /> {ev.location}</p>}
                    </div>
                  </Link>
                ))}
              </div>
              {past.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold text-primary mb-8">{t('pages.etkinlikler.past')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {past.map((ev) => (
                      <Link key={ev._id} to={`/etkinlikler/${ev._id}`} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition border border-gray-100 opacity-90">
                        <div className="h-32 bg-gray-100 flex items-center justify-center">
                          {ev.imageUrl ? (
                            <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-contain object-center" />
                          ) : (
                            <Calendar size={40} className="text-gray-300" />
                          )}
                        </div>
                        <div className="p-4">
                          <span className="text-sm text-gray-500">{formatDate(ev.startDate)}</span>
                          <h3 className="font-bold text-primary group-hover:text-secondary transition mt-1 line-clamp-2">{ev.title}</h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </MainWrapper>
  )
}

export default Etkinlikler
