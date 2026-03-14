import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import api from '../lib/api'

export interface Branch {
  _id: string
  name: string
  slug: string
  city: string
  address: string
  phone: string
  email: string
  mapCoords: { lat: number; lng: number }
  logo?: string
  primaryColor: string
  secondaryColor: string
}

interface BranchContextType {
  branch: Branch | null
  branchId: string
  branchSlug: string
  loading: boolean
  error: string | null
  setBranchBySlug: (slug: string) => void
}

const BranchContext = createContext<BranchContextType>({} as BranchContextType)
export const useBranch = () => useContext(BranchContext)

function getSlugFromPath(): string {
  const path = window.location.pathname.split('/').filter(Boolean)
  const reserved = ['giris', 'super-admin']
  if (path.length > 0 && !reserved.includes(path[0])) {
    return path[0]
  }
  return ''
}

export const BranchProvider = ({ children }: { children: ReactNode }) => {
  const [branch, setBranch] = useState<Branch | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [slug, setSlug] = useState(getSlugFromPath)

  const setBranchBySlug = (s: string) => setSlug(s)

  useEffect(() => {
    if (!slug) { setLoading(false); return }
    setLoading(true)
    api.get(`/branches/${slug}`)
      .then(data => { setBranch(data); setLoading(false) })
      .catch(() => { setError('Şube bulunamadı'); setLoading(false) })
  }, [slug])

  const branchId = branch?._id || ''
  const branchSlug = branch?.slug || slug

  return (
    <BranchContext.Provider value={{ branch, branchId, branchSlug, loading, error, setBranchBySlug }}>
      {children}
    </BranchContext.Provider>
  )
}
