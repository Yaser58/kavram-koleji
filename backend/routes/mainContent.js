import { Router } from 'express'
import { MainSlider, MainNews, MainGallery } from '../models/MainContent.js'
import MainEvent from '../models/MainEvent.js'
import MainAcademicCalendar from '../models/MainAcademicCalendar.js'
import MainFAQ from '../models/MainFAQ.js'
import ContactRequest from '../models/ContactRequest.js'
import Branch from '../models/Branch.js'
import MainGeneralManager from '../models/MainGeneralManager.js'
import { authenticate, requireSuperAdmin } from '../middleware/auth.js'
import { fallbackSlides, fallbackNews, fallbackGallery } from '../fallbackData.js'

const router = Router()

// ===== PUBLIC ROUTES =====

// İletişim formu (genel)
router.post('/contact', async (req, res) => {
  try {
    console.log('Yeni iletişim mesajı:', req.body)
    res.json({ success: true, message: 'Mesajınız alındı' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Bilgi Edinme Hakkı formu (4982 sayılı kanun)
router.post('/contact-request/bilgi-edinme', async (req, res) => {
  try {
    const { adSoyad, tcKimlik, email, telefon, konu, aciklama } = req.body
    const item = new ContactRequest({
      type: 'bilgi-edinme',
      adSoyad,
      tcKimlik,
      email,
      telefon,
      konu,
      aciklama
    })
    await item.save()
    res.status(201).json({ success: true, message: 'Bilgi edinme talebiniz alındı' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Randevu talep formu
router.post('/contact-request/randevu', async (req, res) => {
  try {
    const { adSoyad, email, telefon, tarih, saat, konu, mesaj } = req.body
    const item = new ContactRequest({
      type: 'randevu',
      adSoyad,
      email,
      telefon,
      tarih,
      saat,
      konu,
      mesaj
    })
    await item.save()
    res.status(201).json({ success: true, message: 'Randevu talebiniz alındı' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

const DEFAULT_SLIDER_IMAGE = 'https://images.unsplash.com/photo-1434030216415-6bf8185ea1e3?w=1600&h=900&fit=crop'

// Ana site slider
router.get('/slider', (req, res) => {
  const timeout = 2000
  Promise.race([
    MainSlider.find({ active: true }).sort({ order: 1, createdAt: -1 }),
    new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), timeout))
  ])
    .then(slides => {
      const validSlides = slides.map(s => {
        const obj = s.toObject ? s.toObject() : { ...s }
        return { ...obj, image: (obj.image && String(obj.image).trim()) ? obj.image : DEFAULT_SLIDER_IMAGE }
      })
      res.json(validSlides)
    })
    .catch(err => { console.error('Slider:', err.message, '- fallback'); res.json(fallbackSlides) })
})

// Ana site haberler (category, isUrgent filtreleri)
router.get('/news', (req, res) => {
  const { category, isUrgent, limit } = req.query
  const filter = { active: true }
  if (category) filter.category = category
  if (isUrgent === 'true' || isUrgent === '1') filter.isUrgent = true
  const limitNum = limit ? parseInt(limit, 10) : 0
  const query = MainNews.find(filter).sort({ createdAt: -1 })
  if (limitNum > 0) query.limit(limitNum)
  const timeout = 2000
  Promise.race([
    query,
    new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), timeout))
  ])
    .then(news => res.json(news))
    .catch(err => { console.error('News:', err.message, '- fallback'); res.json(fallbackNews) })
})

// Duyurular (sadece Duyuru kategorisi)
router.get('/duyurular', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 0
  const query = MainNews.find({ active: true, category: 'Duyuru' }).sort({ createdAt: -1 })
  if (limit > 0) query.limit(limit)
  query.then(news => res.json(news)).catch(err => { console.error('Duyurular:', err.message); res.json([]) })
})

// Ana site haber detay (by slug) - /news/:id'den önce tanımlanmalı
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

// Ana site haber detay (by ID)
router.get('/news/:id', async (req, res) => {
  try {
    const item = await MainNews.findById(req.params.id)
    if (!item) return res.status(404).json({ error: 'Haber bulunamadı' })
    res.json(item)
  } catch (err) { console.error('News detail error:', err.message); res.status(404).json({ error: 'Haber bulunamadı' }) }
})

// Ana site etkinlikler (limit, upcoming filtreleri)
router.get('/events', (req, res) => {
  const { limit, upcoming } = req.query
  let query = MainEvent.find({ active: true }).sort({ startDate: 1 })
  if (upcoming === 'true' || upcoming === '1') {
    query = query.find({ startDate: { $gte: new Date() } })
  }
  const limitNum = limit ? parseInt(limit, 10) : 0
  if (limitNum > 0) query = query.limit(limitNum)
  query.then(events => res.json(events)).catch(err => { console.error('Events:', err.message); res.json([]) })
})

// Etkinlik detay (ID veya slug)
router.get('/events/:id', async (req, res) => {
  try {
    let item = await MainEvent.findOne({ slug: req.params.id })
    if (!item) {
      try { item = await MainEvent.findById(req.params.id) } catch (e) {}
    }
    if (!item || !item.active) return res.status(404).json({ error: 'Etkinlik bulunamadı' })
    res.json(item)
  } catch (err) { res.status(404).json({ error: 'Etkinlik bulunamadı' }) }
})

// Ana site akademik takvim (year filtresi opsiyonel)
router.get('/academic-calendar', (req, res) => {
  const { year } = req.query
  const filter = { active: true }
  if (year) {
    const y = parseInt(year, 10)
    filter.startDate = { $gte: new Date(y, 0, 1), $lte: new Date(y, 11, 31, 23, 59, 59) }
  }
  MainAcademicCalendar.find(filter).sort({ startDate: 1 })
    .then(items => res.json(items))
    .catch(err => { console.error('Academic calendar:', err.message); res.json([]) })
})

// Genel Müdür mesajı (tek kayıt)
router.get('/general-manager', (req, res) => {
  MainGeneralManager.findOne({ active: true })
    .then(item => res.json(item || null))
    .catch(err => { console.error('General manager:', err.message); res.json(null) })
})

// SSS (Sıkça Sorulan Sorular)
router.get('/faq', (req, res) => {
  MainFAQ.find({ active: true }).sort({ order: 1 })
    .then(items => res.json(items))
    .catch(err => { console.error('FAQ:', err.message); res.json([]) })
})

// Site içi arama
router.get('/search', async (req, res) => {
  try {
    const q = (req.query.q || '').trim().toLowerCase()
    if (!q || q.length < 2) return res.json({ news: [], branches: [], pages: [] })
    const [news, branches] = await Promise.all([
      MainNews.find({ active: true, $or: [{ title: new RegExp(q, 'i') }, { excerpt: new RegExp(q, 'i') }, { content: new RegExp(q, 'i') }] }).limit(10),
      Branch.find({ active: true, $or: [{ name: new RegExp(q, 'i') }, { city: new RegExp(q, 'i') }] }).limit(5)
    ])
    const pages = [
      { title: 'Haberler', to: '/haberler' },
      { title: 'Duyurular', to: '/duyurular' },
      { title: 'Etkinlikler', to: '/etkinlikler' },
      { title: 'Kampüsler', to: '/kampusler' },
      { title: 'Eğitim', to: '/egitim' },
      { title: 'İletişim', to: '/iletisim' },
      { title: 'Kayıt', to: '/kayit' },
      { title: 'SSS', to: '/sss' },
      { title: 'Tarihçemiz', to: '/tarihcemiz' },
      { title: 'Misyon & Vizyon', to: '/misyon-vizyon' },
    ].filter(p => p.title.toLowerCase().includes(q))
    res.json({ news, branches, pages })
  } catch (err) { console.error('Search:', err.message); res.json({ news: [], branches: [], pages: [] }) }
})

// Bilgi edinme / Randevu talebi
router.post('/contact-request', async (req, res) => {
  try {
    const doc = new ContactRequest(req.body)
    await doc.save()
    res.json({ success: true })
  } catch (err) { console.error('Contact request:', err.message); res.status(500).json({ error: err.message }) }
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

// Events CRUD
admin.get('/events', async (req, res) => {
  try { res.json(await MainEvent.find().sort({ startDate: 1 })) } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.post('/events', async (req, res) => {
  try { const item = new MainEvent(req.body); await item.save(); res.status(201).json(item) } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.put('/events/:id', async (req, res) => {
  try { res.json(await MainEvent.findByIdAndUpdate(req.params.id, req.body, { new: true })) } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.delete('/events/:id', async (req, res) => {
  try { await MainEvent.findByIdAndDelete(req.params.id); res.json({ success: true }) } catch (err) { res.status(500).json({ error: err.message }) }
})

// Academic Calendar CRUD
admin.get('/academic-calendar', async (req, res) => {
  try { res.json(await MainAcademicCalendar.find().sort({ startDate: 1 })) } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.post('/academic-calendar', async (req, res) => {
  try { const item = new MainAcademicCalendar(req.body); await item.save(); res.status(201).json(item) } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.put('/academic-calendar/:id', async (req, res) => {
  try { res.json(await MainAcademicCalendar.findByIdAndUpdate(req.params.id, req.body, { new: true })) } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.delete('/academic-calendar/:id', async (req, res) => {
  try { await MainAcademicCalendar.findByIdAndDelete(req.params.id); res.json({ success: true }) } catch (err) { res.status(500).json({ error: err.message }) }
})

// FAQ CRUD
admin.get('/faq', async (req, res) => {
  try { res.json(await MainFAQ.find().sort({ order: 1 })) } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.post('/faq', async (req, res) => {
  try { const item = new MainFAQ(req.body); await item.save(); res.status(201).json(item) } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.put('/faq/:id', async (req, res) => {
  try { res.json(await MainFAQ.findByIdAndUpdate(req.params.id, req.body, { new: true })) } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.delete('/faq/:id', async (req, res) => {
  try { await MainFAQ.findByIdAndDelete(req.params.id); res.json({ success: true }) } catch (err) { res.status(500).json({ error: err.message }) }
})

// Contact Requests (sadece listele, detay, sil - form public)
admin.get('/contact-requests', async (req, res) => {
  try {
    const { type } = req.query
    const filter = type ? { type } : {}
    res.json(await ContactRequest.find(filter).sort({ createdAt: -1 }))
  } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.get('/contact-requests/:id', async (req, res) => {
  try {
    const item = await ContactRequest.findById(req.params.id)
    if (!item) return res.status(404).json({ error: 'Talep bulunamadı' })
    res.json(item)
  } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.delete('/contact-requests/:id', async (req, res) => {
  try { await ContactRequest.findByIdAndDelete(req.params.id); res.json({ success: true }) } catch (err) { res.status(500).json({ error: err.message }) }
})

// General Manager (tek kayıt - GET/PUT)
admin.get('/general-manager', async (req, res) => {
  try { res.json(await MainGeneralManager.findOne({ active: true }) || null) } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.post('/general-manager', async (req, res) => {
  try {
    const existing = await MainGeneralManager.findOne()
    if (existing) {
      const updated = await MainGeneralManager.findByIdAndUpdate(existing._id, { ...req.body, updatedAt: new Date() }, { new: true })
      return res.json(updated)
    }
    const item = new MainGeneralManager(req.body)
    await item.save()
    res.status(201).json(item)
  } catch (err) { res.status(500).json({ error: err.message }) }
})
admin.put('/general-manager/:id', async (req, res) => {
  try { res.json(await MainGeneralManager.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true })) } catch (err) { res.status(500).json({ error: err.message }) }
})

router.use('/admin', admin)

export default router
