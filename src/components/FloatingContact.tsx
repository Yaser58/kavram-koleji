import { Phone, MessageCircle } from 'lucide-react'

const FloatingContact = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/902667146464?text=Merhaba%2C%20okulunuz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-green-500 text-white pl-5 pr-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-105 group"
      >
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <MessageCircle size={20} />
        </div>
        <span className="font-semibold">WhatsApp</span>
      </a>
      <a
        href="tel:+902667146464"
        className="flex items-center gap-3 bg-secondary text-white pl-5 pr-6 py-3 rounded-full shadow-lg hover:bg-primary transition-all hover:scale-105 group"
      >
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Phone size={20} className="animate-pulse" />
        </div>
        <span className="font-vegan text-lg">Bizi Arayın</span>
      </a>
    </div>
  )
}

export default FloatingContact
