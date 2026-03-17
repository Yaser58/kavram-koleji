import mongoose from 'mongoose'

const contactRequestSchema = new mongoose.Schema({
  type: { type: String, required: true }, // bilgi-edinme, randevu
  adSoyad: String,
  tcKimlik: String,
  email: String,
  telefon: String,
  tarih: String,
  saat: String,
  konu: String,
  aciklama: String,
  mesaj: String,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('ContactRequest', contactRequestSchema)
