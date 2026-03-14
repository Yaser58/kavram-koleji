import mongoose from 'mongoose'

const gallerySchema = new mongoose.Schema({
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  src: { type: String, required: true },
  title: String,
  category: { type: String, default: 'Okul' },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Gallery', gallerySchema)
