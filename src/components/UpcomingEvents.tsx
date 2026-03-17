import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Calendar, MapPinned } from 'lucide-react'
import api from '../lib/api'

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
    { _id: 'demo-1', title: 'Bilim Şenliği', startDate: addDays(now, 5).toISOString(), location: 'Ana Kampüs', imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop' },
    { _id: 'demo-2', title: 'Veli Toplantısı', startDate: addDays(now, 12).toISOString(), location: 'Konferans Salonu', imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop' },
    { _id: 'demo-3', title: 'Spor Günü', startDate: addDays(now, 18).toISOString(), location: 'Spor Salonu', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop' },
    { _id: 'demo-4', title: 'Mezuniyet Töreni', startDate: addDays(now, 25).toISOString(), location: 'Açık Hava Alanı', imageUrl: 'https://images.unsplash.com/photo-1541339907198-e087566dd9fd?w=400&h=250&fit=crop' },
  ]
})()

const UpcomingEvents = () => {
  const { t, i18n } = useTranslation()
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const locale = i18n.language === 'en' ? 'en-US' : 'tr-TR'

  useEffect(() => {
    api.get('/main/events').then((data: EventItem[]) => {
      const list = Array.isArray(data) && data.length > 0 ? data : DEMO_EVENTS
      setEvents(list)
    }).catch(() => setEvents(DEMO_EVENTS)).finally(() => setLoading(false))
  }, [])

  const formatDate = (d: string) => {
    try {
      const date = new Date(d)
      return { day: date.getDate(), month: date.toLocaleDateString(locale, { month: 'short' }), year: date.getFullYear() }
    } catch { return { day: '', month: '', year: '' } }
  }

  const upcoming = events.filter(e => new Date(e.startDate) >= new Date()).slice(0, 4)

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (upcoming.length === 0) {
    return (
      <div className="text-center py-16 rounded-2xl border-2 border-dashed border-secondary/30 bg-gradient-to-br from-secondary/5 via-white to-primary/5">
        <Calendar size={48} className="mx-auto text-secondary/60 mb-4" />
        <p className="text-gray-600 font-medium">{t('events.noEvents')}</p>
        <Link to="/etkinlikler" className="inline-block mt-4 text-secondary font-semibold hover:text-primary transition">{t('events.calendarLink')}</Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {upcoming.map((ev) => {
        const { day, month, year } = formatDate(ev.startDate)
        return (
          <Link key={ev._id} to={`/etkinlikler/${ev._id}`} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition border border-secondary/20 hover:border-secondary/50">
            <div className="h-32 bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center overflow-hidden">
              {ev.imageUrl ? (
                <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-cover object-center group-hover:scale-105 transition" onError={(e) => { const t = e.target as HTMLImageElement; t.onerror = null; t.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect fill='%23e5e7eb' width='400' height='250'/%3E%3Ctext x='50%25' y='50%25' fill='%239ca3af' text-anchor='middle' dy='.3em' font-size='20'%3E🎓%3C/text%3E%3C/svg%3E" }} />
              ) : (
                <Calendar size={48} className="text-primary/30" />
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-secondary text-sm font-semibold mb-2">
                <Calendar size={14} />
                {day} {month} {year}
              </div>
              <h3 className="font-bold text-primary group-hover:text-secondary transition line-clamp-2">{ev.title}</h3>
              {ev.location && (
                <p className="text-gray-500 text-sm mt-2 flex items-center gap-1">
                  <MapPinned size={14} /> {ev.location}
                </p>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default UpcomingEvents
