import mongoose from 'mongoose'

const newsSchema = new mongoose.Schema({
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  title: { type: String, required: true },
  excerpt: String,
  images: [String],
  category: { type: String, default: 'Duyuru' },
  day: String,
  month: String,
  year: String,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('News', newsSchema)
