import { Link } from 'react-router-dom'
import { Phone, ArrowRight } from 'lucide-react'

const CallToAction = () => {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Çocuğunuzun Geleceğine Yatırım Yapın
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Avantajlı kayıt fırsatlarımızdan yararlanmak ve okulumuz hakkında detaylı bilgi almak için hemen iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/iletisim"
              className="inline-flex items-center justify-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition group"
            >
              Kayıt Formu
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+902667146464"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition border border-white/30"
            >
              <Phone size={20} />
              (0266) 714 64 64
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
