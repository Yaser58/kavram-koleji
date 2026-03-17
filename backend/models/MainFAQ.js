import mongoose from 'mongoose'

const mainFaqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('MainFAQ', mainFaqSchema)
