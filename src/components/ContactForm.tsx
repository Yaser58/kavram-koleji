import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { useMessages } from '../context/MessagesContext'

const ContactForm = () => {
  const { sendMessage } = useMessages()
  const [sent, setSent] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendMessage(formData)
    setSent(true)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setTimeout(() => setSent(false), 3000)
  }

  if (sent) {
    return (
      <div className="text-center py-10">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-primary mb-2">Mesajınız Gönderildi!</h3>
        <p className="text-gray-600">En kısa sürede size dönüş yapacağız.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad *</label>
          <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition" placeholder="Adınız Soyadınız" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">E-posta *</label>
          <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition" placeholder="ornek@email.com" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
          <input type="tel" id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition" placeholder="0555 555 55 55" />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Konu *</label>
          <select id="subject" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition">
            <option value="">Seçiniz</option>
            <option value="Kayıt Bilgisi">Kayıt Bilgisi</option>
            <option value="Akademik Bilgi">Akademik Bilgi</option>
            <option value="Okul Ziyareti">Okul Ziyareti</option>
            <option value="Diğer">Diğer</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mesajınız *</label>
        <textarea id="message" required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none" placeholder="Mesajınızı buraya yazın..." />
      </div>
      <button type="submit" className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-secondary transition">
        <Send size={20} /> Gönder
      </button>
    </form>
  )
}

export default ContactForm
