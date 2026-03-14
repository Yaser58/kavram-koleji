import jwt from 'jsonwebtoken'

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Token gerekli' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ error: 'Geçersiz token' })
  }
}

export const requireSuperAdmin = (req, res, next) => {
  if (req.user.role !== 'super_admin') return res.status(403).json({ error: 'Yetkiniz yok' })
  next()
}

export const requireBranchAccess = (req, res, next) => {
  const branchId = req.params.branchId || req.body.branch || req.query.branch
  if (req.user.role === 'super_admin') return next()
  if (req.user.branch !== branchId) return res.status(403).json({ error: 'Bu şubeye erişim yetkiniz yok' })
  next()
}
