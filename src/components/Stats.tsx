import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { useTranslation } from 'react-i18next'
import { GraduationCap, Users, Trophy, BookOpen, Library } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'

const Stats = () => {
  const { t } = useTranslation()
  const stats = [
    { icon: GraduationCap, value: '50+', labelKey: 'stats.yearsExperience' },
    { icon: Users, value: '1M+', labelKey: 'stats.graduates' },
    { icon: Trophy, value: '150+', labelKey: 'stats.awards' },
    { icon: BookOpen, value: '50+', labelKey: 'stats.expertTeachers' },
    { icon: Library, value: '15+', labelKey: 'stats.campuses' },
  ]
  return (
    <section className="bg-primary/95 backdrop-blur-sm shadow-xl py-8 md:py-10 rounded-2xl border border-white/10">
      <div className="container mx-auto px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="stats-carousel pb-10"
        >
          {stats.map((stat, index) => (
            <SwiperSlide key={index}>
              <div className="text-center text-white">
                <stat.icon size={40} className="mx-auto mb-3 text-secondary" />
                <h3 className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-gray-300 text-sm md:text-base">{t(stat.labelKey)}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Stats
