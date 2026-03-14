import { Router } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username, active: true }).populate('branch')
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' })
    }
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role, branch: user.branch?._id?.toString() || null },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    res.json({
      token,
      user: {
        id: user._id, username: user.username, role: user.role, name: user.name,
        branch: user.branch ? { id: user.branch._id, name: user.branch.name, slug: user.branch.slug } : null
      }
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('branch').select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
