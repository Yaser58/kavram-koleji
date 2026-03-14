import { Megaphone } from 'lucide-react'
import { useAnnouncements } from '../context/AnnouncementContext'

const AnnouncementBar = () => {
  const { announcements } = useAnnouncements()
  const active = announcements.filter(a => a.active)

  if (active.length === 0) return null

  return (
    <div className="bg-secondary text-white py-2 overflow-hidden relative">
      <div className="container mx-auto px-4 flex items-center gap-3">
        <div className="flex-shrink-0 flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
          <Megaphone size={14} />
          <span className="text-xs font-semibold uppercase tracking-wider">Duyuru</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="animate-marquee whitespace-nowrap flex gap-16">
            {[...active, ...active].map((item, i) => (
              <span key={i} className="text-sm font-medium inline-block">
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementBar
