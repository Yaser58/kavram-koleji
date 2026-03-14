import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Lock, User } from 'lucide-react'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { user, isAdmin, login } = useAuth()
  const navigate = useNavigate()

  if (isAdmin && user) {
    if (user.role === 'super_admin') return <Navigate to="/super-admin" replace />
    if (user.branch) return <Navigate to={`/${user.branch.slug}/admin`} replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
      const saved = JSON.parse(localStorage.getItem('kavram_user') || '{}')
      if (saved.role === 'super_admin') navigate('/super-admin')
      else if (saved.branch?.slug) navigate(`/${saved.branch.slug}/admin`)
      else navigate('/')
    } catch {
      setError('Kullanıcı adı veya şifre hatalı!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-primary">Kavram Koleji</h1>
          <p className="text-gray-500">Yönetim Paneli Girişi</p>
        </div>
        {error && <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Kullanıcı Adı" value={username} onChange={e => setUsername(e.target.value)} className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary" required />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="password" placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary" required />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition disabled:opacity-50">
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Login
