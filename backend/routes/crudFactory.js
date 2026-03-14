import { Router } from 'express'
import { authenticate, requireBranchAccess } from '../middleware/auth.js'

export function createCrudRoutes(Model) {
  const router = Router()

  // Public: şubeye göre listele
  router.get('/:branchId', async (req, res) => {
    try {
      const items = await Model.find({ branch: req.params.branchId }).sort({ createdAt: -1 })
      res.json(items)
    } catch (err) {
      console.error('CRUD list error:', err.message)
      res.json([])
    }
  })

  // Admin: ekle
  router.post('/:branchId', authenticate, requireBranchAccess, async (req, res) => {
    try {
      const item = new Model({ ...req.body, branch: req.params.branchId })
      await item.save()
      res.status(201).json(item)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  // Admin: güncelle
  router.put('/:branchId/:id', authenticate, requireBranchAccess, async (req, res) => {
    try {
      const item = await Model.findOneAndUpdate(
        { _id: req.params.id, branch: req.params.branchId },
        req.body, { new: true }
      )
      if (!item) return res.status(404).json({ error: 'Bulunamadı' })
      res.json(item)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  // Admin: sil
  router.delete('/:branchId/:id', authenticate, requireBranchAccess, async (req, res) => {
    try {
      await Model.findOneAndDelete({ _id: req.params.id, branch: req.params.branchId })
      res.json({ success: true })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  return router
}
