import { Router } from 'express'
import { MainSlider, MainNews, MainGallery } from '../models/MainContent.js'
import { authenticate, requireSuperAdmin } from '../middleware/auth.js'
import { fallbackSlides, fallbackNews, fallbackGallery } from '../fallbackData.js'

const router = Router()

// ===== PUBLIC ROUTES =====

// İletişim formu
router.post('/contact', async (req, res) => {
  try {
    // Basit loglama - ileride email gönderimi eklenebilir
    console.log('Yeni iletişim mesajı:', req.body)
    res.json({ success: true, message: 'Mesajınız alındı' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Ana site slider
router.get('/slider', (req, res) => {
  const timeout = 2000
  Promise.race([
    MainSlider.find({ active: true }).sort({ order: 1, createdAt: -1 }),
    new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), timeout))
  ])
    .then(slides => res.json(slides))
    .catch(err => { console.error('Slider:', err.message, '- fallback'); res.json(fallbackSlides) })
})

// Ana site haberler
router.get('/news', (req, res) => {
  const timeout = 2000
  Promise.race([
    MainNews.find({ active: true }).sort({ createdAt: -1 }),
    new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), timeout))
  ])
    .then(news => res.json(news))
    .catch(err => { console.error('News:', err.message, '- fallback'); res.json(fallbackNews) })
})

// Ana site haber detay (by ID)
router.get('/news/:id', async (req, res) => {
  try {
    const item = await MainNews.findById(req.params.id)
    if (!item) return res.status(404).json({ error: 'Haber bulunamadı' })
    res.json(item)
  } catch (err) { console.error('News detail error:', err.message); res.status(404).json({ error: 'Haber bulunamadı' }) }
})

// Ana site haber detay (by slug)
router.get('/news/slug/:slug', async (req, res) => {
  try {
    let item = await MainNews.findOne({ slug: req.params.slug })
    if (!item) {
      try { item = await MainNews.findById(req.params.slug) } catch (e) {}
    }
    if (!item) return res.status(404).json({ error: 'Haber bulunamadı' })
    res.json(item)
  } catch (err) { console.error('News slug error:', err.message); res.status(404).json({ error: 'Haber bulunamadı' }) }
})

// Ana site galeri
router.get('/gallery', (req, res) => {
  const timeout = 2000
  Promise.race([
    MainGallery.find({ active: true }).sort({ createdAt: -1 }),
    new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), timeout))
  ])
    .then(images => res.json(images))
    .catch(err => { console.error('Gallery:', err.message, '- fallback'); res.json(fallbackGallery) })
})

// ===== ADMIN ROUTES =====
const admin = Router()
admin.use(authenticate, requireSuperAdmin)

// Slider CRUD
admin.get('/slider', async (req, res) => {
  try { res.json(await MainSlider.find().sort({ order: 1 })) } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.post('/slider', async (req, res) => {
  try { const item = new MainSlider(req.body); await item.save(); res.status(201).json(item) } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.put('/slider/:id', async (req, res) => {
  try { res.json(await MainSlider.findByIdAndUpdate(req.params.id, req.body, { new: true })) } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.delete('/slider/:id', async (req, res) => {
  try { await MainSlider.findByIdAndDelete(req.params.id); res.json({ success: true }) } catch (err) { res.status(500).json({ error: err.message }) }
})

// News CRUD
admin.get('/news', async (req, res) => {
  try { res.json(await MainNews.find().sort({ createdAt: -1 })) } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.post('/news', async (req, res) => {
  try { const item = new MainNews(req.body); await item.save(); res.status(201).json(item) } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.put('/news/:id', async (req, res) => {
  try { res.json(await MainNews.findByIdAndUpdate(req.params.id, req.body, { new: true })) } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.delete('/news/:id', async (req, res) => {
  try { await MainNews.findByIdAndDelete(req.params.id); res.json({ success: true }) } catch (err) { res.status(500).json({ error: err.message }) }
})

// Gallery CRUD
admin.get('/gallery', async (req, res) => {
  try { res.json(await MainGallery.find().sort({ createdAt: -1 })) } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.post('/gallery', async (req, res) => {
  try { const item = new MainGallery(req.body); await item.save(); res.status(201).json(item) } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.put('/gallery/:id', async (req, res) => {
  try { res.json(await MainGallery.findByIdAndUpdate(req.params.id, req.body, { new: true })) } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.delete('/gallery/:id', async (req, res) => {
  try { await MainGallery.findByIdAndDelete(req.params.id); res.json({ success: true }) } catch (err) { res.status(500).json({ error: err.message }) }
})

router.use('/admin', admin)

export default router
