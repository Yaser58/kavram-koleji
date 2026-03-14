import mongoose from 'mongoose'

const announcementSchema = new mongoose.Schema({
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  text: { type: String, required: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Announcement', announcementSchema)
