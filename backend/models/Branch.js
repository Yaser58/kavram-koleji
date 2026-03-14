import mongoose from 'mongoose'

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  address: String,
  phone: String,
  phone2: String,
  phone3: String,
  email: String,
  programs: [String],
  mapCoords: { lat: Number, lng: Number },
  logo: String,
  primaryColor: { type: String, default: '#1e3a5f' },
  secondaryColor: { type: String, default: '#c8a45c' },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Branch', branchSchema)
