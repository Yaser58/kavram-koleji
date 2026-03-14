import mongoose from 'mongoose'

const sliderSchema = new mongoose.Schema({
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  title: { type: String, required: true },
  subtitle: String,
  image: { type: String, required: true },
  cta: String,
  link: { type: String, default: '/' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Slider', sliderSchema)
