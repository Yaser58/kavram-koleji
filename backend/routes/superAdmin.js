import { Router } from 'express'
import Branch from '../models/Branch.js'
import User from '../models/User.js'
import News from '../models/News.js'
import Message from '../models/Message.js'
import Slider from '../models/Slider.js'
import Gallery from '../models/Gallery.js'
import { authenticate, requireSuperAdmin } from '../middleware/auth.js'

const router = Router()
router.use(authenticate, requireSuperAdmin)

// Tüm şubeleri listele (aktif/pasif dahil)
router.get('/branches', async (req, res) => {
  try {
    const branches = await Branch.find()
    const stats = await Promise.all(branches.map(async b => {
      const [newsCount, msgCount, unreadCount] = await Promise.all([
        News.countDocuments({ branch: b._id }),
        Message.countDocuments({ branch: b._id }),
        Message.countDocuments({ branch: b._id, read: false })
      ])
      return { ...b.toObject(), newsCount, msgCount, unreadCount }
    }))
    res.json(stats)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Şube ekle
router.post('/branches', async (req, res) => {
  try {
    const branch = new Branch(req.body)
    await branch.save()
    res.status(201).json(branch)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Şube güncelle
router.put('/branches/:id', async (req, res) => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(branch)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Şube sil
router.delete('/branches/:id', async (req, res) => {
  try {
    await Branch.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Kullanıcı yönetimi
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('branch', 'name slug').select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    const populated = await User.findById(user._id).populate('branch', 'name slug').select('-password')
    res.status(201).json(populated)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/users/:id', async (req, res) => {
  try {
    const updateData = { ...req.body }
    if (!updateData.password) delete updateData.password
    if (updateData.password) {
      const user = await User.findById(req.params.id)
      user.password = updateData.password
      user.username = updateData.username || user.username
      user.name = updateData.name || user.name
      user.role = updateData.role || user.role
      user.branch = updateData.branch || user.branch
      user.active = updateData.active !== undefined ? updateData.active : user.active
      await user.save()
      const populated = await User.findById(user._id).populate('branch', 'name slug').select('-password')
      return res.json(populated)
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate('branch', 'name slug').select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
