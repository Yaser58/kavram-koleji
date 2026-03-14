import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  name: { type: String, required: true },
  email: String,
  phone: String,
  subject: String,
  message: String,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Message', messageSchema)
