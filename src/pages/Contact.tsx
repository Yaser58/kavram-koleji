import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import ContactForm from '../components/ContactForm'

const Contact = () => {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">İletişim</h1>
          <p className="text-lg md:text-xl text-gray-300">Bizimle İletişime Geçin</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-primary mb-8">İletişim Bilgileri</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Adres</h4>
                    <p className="text-gray-600">İhsaniye Mah. Şehit Mehmet Gönenç Sok. No:7 Bandırma / Balıkesir</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Telefon</h4>
                    <a href="tel:+902667146464" className="text-gray-600 hover:text-secondary transition">(0266) 714 64 64</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">E-posta</h4>
                    <a href="mailto:bandirma@kavram.k12.tr" className="text-gray-600 hover:text-secondary transition">bandirma@kavram.k12.tr</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Çalışma Saatleri</h4>
                    <p className="text-gray-600">Pazartesi - Cuma: 08:00 - 17:00</p>
                    <p className="text-gray-600">Cumartesi: 09:00 - 13:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-primary mb-8">Bize Ulaşın</h2>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1523.5!2d27.9766878516669!3d40.35212667109922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDIxJzA3LjciTiAyN8KwNTgnMzYuMSJF!5e0!3m2!1str!2str!4v1709900000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Okul Konumu"
        />
      </section>

      {/* Registration CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Sizi Arayalım</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Avantajlı kayıt fırsatlarımızdan yararlanmak ve okulumuz hakkında detaylı bilgi almak için formu doldurun.
          </p>
          <a
            href="tel:+902667146464"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-white transition"
          >
            <Phone size={20} />
            Hemen Ara: (0266) 714 64 64
          </a>
        </div>
      </section>
    </>
  )
}

export default Contact
