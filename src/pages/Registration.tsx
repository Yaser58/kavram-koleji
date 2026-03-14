import { useState } from 'react'
import { UserPlus, CheckCircle } from 'lucide-react'
import { useMessages } from '../context/MessagesContext'

const Registration = () => {
  const { sendMessage } = useMessages()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    studentName: '', studentSurname: '', birthDate: '', currentSchool: '', currentClass: '',
    parentName: '', parentPhone: '', parentEmail: '', parentJob: '',
    address: '', howDidYouHear: '', notes: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendMessage({
      name: `${form.studentName} ${form.studentSurname} (Veli: ${form.parentName})`,
      email: form.parentEmail,
      phone: form.parentPhone,
      subject: 'Online Ön Kayıt Başvurusu',
      message: `Öğrenci: ${form.studentName} ${form.studentSurname}\nDoğum Tarihi: ${form.birthDate}\nMevcut Okul: ${form.currentSchool}\nSınıf: ${form.currentClass}\nVeli: ${form.parentName}\nMeslek: ${form.parentJob}\nAdres: ${form.address}\nNasıl Duydunuz: ${form.howDidYouHear}\nNot: ${form.notes}`
    })
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-8">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2">Başvurunuz Alındı!</h2>
          <p className="text-gray-500">En kısa sürede sizinle iletişime geçeceğiz.</p>
        </div>
      </div>
    )
  }

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"

  return (
    <>
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <UserPlus size={48} className="mx-auto mb-4 text-secondary" />
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Online Ön Kayıt</h1>
          <p className="text-white/80">Kavram Koleji Bandırma ailesine katılın</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm">1</span>
              Öğrenci Bilgileri
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="studentName" placeholder="Öğrenci Adı *" required value={form.studentName} onChange={handleChange} className={inputClass} />
              <input name="studentSurname" placeholder="Öğrenci Soyadı *" required value={form.studentSurname} onChange={handleChange} className={inputClass} />
              <input name="birthDate" type="date" required value={form.birthDate} onChange={handleChange} className={inputClass} />
              <input name="currentSchool" placeholder="Mevcut Okulu" value={form.currentSchool} onChange={handleChange} className={inputClass} />
              <select name="currentClass" required value={form.currentClass} onChange={handleChange} className={inputClass}>
                <option value="">Başvurulan Sınıf *</option>
                <option value="9">9. Sınıf</option><option value="10">10. Sınıf</option><option value="11">11. Sınıf</option><option value="12">12. Sınıf</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm">2</span>
              Veli Bilgileri
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="parentName" placeholder="Veli Adı Soyadı *" required value={form.parentName} onChange={handleChange} className={inputClass} />
              <input name="parentPhone" type="tel" placeholder="Veli Telefonu *" required value={form.parentPhone} onChange={handleChange} className={inputClass} />
              <input name="parentEmail" type="email" placeholder="Veli E-posta" value={form.parentEmail} onChange={handleChange} className={inputClass} />
              <input name="parentJob" placeholder="Veli Mesleği" value={form.parentJob} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm">3</span>
              Ek Bilgiler
            </h3>
            <div className="space-y-4">
              <input name="address" placeholder="Adres" value={form.address} onChange={handleChange} className={inputClass} />
              <select name="howDidYouHear" value={form.howDidYouHear} onChange={handleChange} className={inputClass}>
                <option value="">Bizi nereden duydunuz?</option>
                <option value="internet">İnternet</option><option value="sosyal-medya">Sosyal Medya</option><option value="tavsiye">Tavsiye</option><option value="reklam">Reklam</option><option value="diger">Diğer</option>
              </select>
              <textarea name="notes" placeholder="Eklemek istediğiniz notlar..." rows={3} value={form.notes} onChange={handleChange} className={inputClass + " resize-none"} />
            </div>
          </div>
          <button type="submit" className="w-full bg-secondary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary transition shadow-lg">
            Ön Kayıt Başvurusu Gönder
          </button>
        </form>
      </div>
    </>
  )
}

export default Registration
