import { Router } from 'express'
import Message from '../models/Message.js'
import { authenticate, requireBranchAccess } from '../middleware/auth.js'

const router = Router()

// Public: mesaj gönder (iletişim formu, kayıt formu, sizi arayalım)
router.post('/:branchId', async (req, res) => {
  try {
    const msg = new Message({ ...req.body, branch: req.params.branchId })
    await msg.save()
    res.status(201).json(msg)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Admin: mesajları listele
router.get('/:branchId', authenticate, requireBranchAccess, async (req, res) => {
  try {
    const messages = await Message.find({ branch: req.params.branchId }).sort({ createdAt: -1 })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Admin: okundu işaretle
router.patch('/:branchId/:id/read', authenticate, requireBranchAccess, async (req, res) => {
  try {
    const msg = await Message.findOneAndUpdate(
      { _id: req.params.id, branch: req.params.branchId },
      { read: true }, { new: true }
    )
    res.json(msg)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Admin: mesaj sil
router.delete('/:branchId/:id', authenticate, requireBranchAccess, async (req, res) => {
  try {
    await Message.findOneAndDelete({ _id: req.params.id, branch: req.params.branchId })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
