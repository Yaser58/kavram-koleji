import mongoose from 'mongoose'

const mainEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleEn: String,
  slug: { type: String, unique: true, sparse: true },
  description: String,
  descriptionEn: String,
  startDate: { type: Date, required: true },
  endDate: Date,
  location: String,
  imageUrl: String,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('MainEvent', mainEventSchema)
