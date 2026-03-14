import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import branchRoutes from './routes/branches.js'
import newsRoutes from './routes/news.js'
import sliderRoutes from './routes/slider.js'
import galleryRoutes from './routes/gallery.js'
import videoRoutes from './routes/videos.js'
import announcementRoutes from './routes/announcements.js'
import messageRoutes from './routes/messages.js'
import superAdminRoutes from './routes/superAdmin.js'
import mainContentRoutes from './routes/mainContent.js'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '.env') })

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kavram_koleji'
const MONGO_LOCAL = 'mongodb://127.0.0.1:27017/kavram_koleji'

async function connectDb() {
  const opts = { serverSelectionTimeoutMS: 30000, connectTimeoutMS: 30000 }
  try {
    await mongoose.connect(MONGO_URI, opts)
    // Bağlantının gerçekten hazır olduğunu doğrula (buffering timeout önlenir)
    await mongoose.connection.db.admin().command({ ping: 1 })
    console.log('MongoDB bağlantısı başarılı') 
    return
  } catch (err) {
    console.error('MongoDB Atlas bağlantı hatası:', err.message)
    if (MONGO_URI !== MONGO_LOCAL) {
      console.log('Local MongoDB deneniyor...')
      try {
        await mongoose.connect(MONGO_LOCAL, opts)
        await mongoose.connection.db.admin().command({ ping: 1 })
        console.log('Local MongoDB bağlantısı başarılı')
        return
      } catch (e) {
        console.error('Local MongoDB hatası:', e.message)
        throw e
      }
    }
    throw err
  }
}

app.use('/api/auth', authRoutes)
app.use('/api/branches', branchRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/slider', sliderRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/videos', videoRoutes)
app.use('/api/announcements', announcementRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/super-admin', superAdminRoutes)
app.use('/api/main', mainContentRoutes)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 5000

// MongoDB bağlantısı tamamlanmadan sunucu başlamasın (buffering timeout önlenir)
connectDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`))
  })
  .catch((err) => {
    console.error('Veritabanı bağlantısı kurulamadı, sunucu başlatılamıyor:', err.message)
    process.exit(1)
  })
