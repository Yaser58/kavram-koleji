import { GraduationCap, Users, Trophy, BookOpen } from 'lucide-react'

const stats = [
  { icon: GraduationCap, value: '25+', label: 'Yıllık Deneyim' },
  { icon: Users, value: '500+', label: 'Öğrenci' },
  { icon: Trophy, value: '150+', label: 'Ödül' },
  { icon: BookOpen, value: '50+', label: 'Uzman Öğretmen' },
]

const Stats = () => {
  return (
    <section className="bg-primary/95 backdrop-blur-sm shadow-xl py-8 md:py-10 rounded-2xl border border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <stat.icon size={40} className="mx-auto mb-3 text-secondary" />
              <h3 className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</h3>
              <p className="text-gray-300 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
