import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import api from '../lib/api'
import { useBranch } from './BranchContext'

export interface Announcement {
  _id: string
  text: string
  active: boolean
}

interface AnnouncementContextType {
  announcements: Announcement[]
  addAnnouncement: (data: Omit<Announcement, '_id'>) => Promise<void>
  updateAnnouncement: (id: string, data: Omit<Announcement, '_id'>) => Promise<void>
  deleteAnnouncement: (id: string) => Promise<void>
  refresh: () => void
}

const AnnouncementContext = createContext<AnnouncementContextType>({} as AnnouncementContextType)
export const useAnnouncements = () => useContext(AnnouncementContext)

export const AnnouncementProvider = ({ children }: { children: ReactNode }) => {
  const { branchId } = useBranch()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])

  const refresh = useCallback(() => {
    if (!branchId) return
    api.get(`/announcements/${branchId}`).then(setAnnouncements).catch(() => {})
  }, [branchId])

  useEffect(() => { refresh() }, [refresh])

  const addAnnouncement = async (data: Omit<Announcement, '_id'>) => { await api.post(`/announcements/${branchId}`, data); refresh() }
  const updateAnnouncement = async (id: string, data: Omit<Announcement, '_id'>) => { await api.put(`/announcements/${branchId}/${id}`, data); refresh() }
  const deleteAnnouncement = async (id: string) => { await api.delete(`/announcements/${branchId}/${id}`); refresh() }

  return <AnnouncementContext.Provider value={{ announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement, refresh }}>{children}</AnnouncementContext.Provider>
}
