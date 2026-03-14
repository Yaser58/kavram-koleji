import { useState } from 'react'
import { X, PhoneCall } from 'lucide-react'
import { useMessages } from '../context/MessagesContext'

const CallbackPopup = () => {
  const { sendMessage } = useMessages()
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendMessage({
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: 'Sizi Arayalım Talebi',
      message: form.message || 'Geri arama talep edildi.'
    })
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false); setIsOpen(false)
      setForm({ name: '', phone: '', email: '', message: '' })
    }, 2500)
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-primary text-white px-3 py-6 rounded-r-xl shadow-lg hover:bg-secondary transition-all group"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
        <span className="flex items-center gap-2 text-sm font-semibold tracking-wider">
          <PhoneCall size={16} className="rotate-90" /> SİZİ ARAYALIM
        </span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
            <div className="bg-primary text-white p-6">
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white/80 hover:text-white"><X size={24} /></button>
              <PhoneCall size={32} className="mb-2" />
              <h3 className="text-xl font-bold">Sizi Arayalım</h3>
              <p className="text-white/80 text-sm mt-1">Bilgilerinizi bırakın, sizi arayalım.</p>
            </div>

            {submitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><PhoneCall size={28} className="text-green-600" /></div>
                <h4 className="text-lg font-bold text-gray-800">Talebiniz Alındı</h4>
                <p className="text-gray-500 mt-2">En kısa sürede sizi arayacağız.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <input type="text" placeholder="Adınız Soyadınız *" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                <input type="tel" placeholder="Telefon Numaranız *" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                <input type="email" placeholder="E-posta Adresiniz" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                <textarea placeholder="Mesajınız (Opsiyonel)" rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" />
                <button type="submit" className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-primary transition">Gönder</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default CallbackPopup
