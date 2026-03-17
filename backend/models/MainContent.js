import mongoose from 'mongoose'

const mainSliderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  titleEn: String,
  subtitleEn: String,
  image: { type: String, required: true },
  link: { type: String, default: '/' },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

const mainNewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true },
  excerpt: String,
  content: String,
  titleEn: String,
  excerptEn: String,
  contentEn: String,
  categoryEn: String,
  monthEn: String,
  images: [String],
  category: { type: String, default: 'Genel' }, // Genel, Duyuru, Haber, Etkinlik vb.
  day: String,
  month: String,
  year: String,
  featured: { type: Boolean, default: false },
  isEvent: { type: Boolean, default: false },
  eventDate: { type: Date },
  isUrgent: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

const mainGallerySchema = new mongoose.Schema({
  src: { type: String, required: true },
  title: String,
  category: { type: String, default: 'Genel' },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

export const MainSlider = mongoose.model('MainSlider', mainSliderSchema)
export const MainNews = mongoose.model('MainNews', mainNewsSchema)
export const MainGallery = mongoose.model('MainGallery', mainGallerySchema)
