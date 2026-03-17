import mongoose from 'mongoose'

const mainGeneralManagerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameEn: String,
  title: { type: String, default: 'Genel Müdür' },
  titleEn: String,
  imageUrl: String,
  message: { type: String, required: true },
  messageEn: String,
  excerpt: String,
  excerptEn: String,
  active: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
})

export default mongoose.model('MainGeneralManager', mainGeneralManagerSchema)
