import mongoose from 'mongoose'

const videoSchema = new mongoose.Schema({
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  title: { type: String, required: true },
  thumbnail: String,
  youtubeUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Video', videoSchema)
