import { Router } from 'express'
import Branch from '../models/Branch.js'
import { fallbackBranches } from '../fallbackData.js'

const router = Router()

// Public: tüm aktif şubeleri listele (Kampüsler sayfası için tüm alanlar)
router.get('/', (req, res) => {
  const timeout = 2000
  Promise.race([
    Branch.find({ active: true }),
    new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), timeout))
  ])
    .then(branches => res.json(branches))
    .catch(err => {
      console.error('Branches:', err.message, '- fallback kullanılıyor')
      res.json(fallbackBranches)
    })
})

// Public: slug ile şube detayı
router.get('/:slug', async (req, res) => {
  try {
    const branch = await Branch.findOne({ slug: req.params.slug, active: true })
    if (!branch) return res.status(404).json({ error: 'Şube bulunamadı' })
    res.json(branch)
  } catch (err) {
    console.error('Branch detail error:', err.message)
    res.status(404).json({ error: 'Şube bulunamadı' })
  }
})

export default router
