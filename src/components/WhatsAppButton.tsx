import { MessageCircle } from 'lucide-react'

const WhatsAppButton = () => {
  const phoneNumber = '905455377281'
  const message = 'Merhaba, Kavram Koleji hakkında bilgi almak istiyorum.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 group"
      aria-label="WhatsApp ile iletişime geç"
    >
      <MessageCircle size={28} className="text-white" />
      <span className="absolute right-full mr-3 bg-white text-gray-700 px-3 py-2 rounded-lg shadow-md text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        WhatsApp ile yazın
      </span>
    </a>
  )
}

export default WhatsAppButton
