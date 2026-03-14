import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSlider } from '../context/SliderContext'
import { useBranch } from '../context/BranchContext'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const HeroSlider = () => {
  const { slides } = useSlider()
  const { branchSlug } = useBranch()

  if (slides.length === 0) return null

  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div className="relative h-full">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/50 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-xl">
                    <p className="text-secondary font-semibold mb-3 text-base md:text-lg">{slide.subtitle}</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">{slide.title}</h2>
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                      <Link to={`/${branchSlug}${slide.link}`} className="inline-flex items-center gap-2 bg-secondary text-white px-5 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition group text-sm sm:text-base">
                        {slide.cta}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link to={`/${branchSlug}/kayit`} className="inline-flex items-center gap-2 bg-white text-primary px-5 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-secondary hover:text-white transition text-sm sm:text-base">
                        Kayıt Ol
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default HeroSlider
