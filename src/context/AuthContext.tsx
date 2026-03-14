import { createContext, useContext, useState, ReactNode } from 'react'
import api from '../lib/api'

interface UserInfo {
  id: string
  username: string
  role: 'super_admin' | 'branch_admin'
  name: string
  branch: { id: string; name: string; slug: string } | null
}

interface AuthContextType {
  user: UserInfo | null
  isAdmin: boolean
  isSuperAdmin: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(() => {
    const saved = localStorage.getItem('kavram_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = async (username: string, password: string) => {
    const data = await api.post('/auth/login', { username, password })
    localStorage.setItem('kavram_token', data.token)
    localStorage.setItem('kavram_user', JSON.stringify(data.user))
    setUser(data.user)
  }

  const logout = () => {
    localStorage.removeItem('kavram_token')
    localStorage.removeItem('kavram_user')
    setUser(null)
  }

  const isAdmin = !!user
  const isSuperAdmin = user?.role === 'super_admin'

  return (
    <AuthContext.Provider value={{ user, isAdmin, isSuperAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
