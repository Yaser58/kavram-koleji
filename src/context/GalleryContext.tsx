import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import api from '../lib/api'
import { useBranch } from './BranchContext'

export interface GalleryItem {
  _id: string
  src: string
  title: string
  category: string
}

interface GalleryContextType {
  images: GalleryItem[]
  addImage: (data: Omit<GalleryItem, '_id'>) => Promise<void>
  updateImage: (id: string, data: Omit<GalleryItem, '_id'>) => Promise<void>
  deleteImage: (id: string) => Promise<void>
  refresh: () => void
}

const GalleryContext = createContext<GalleryContextType>({} as GalleryContextType)
export const useGallery = () => useContext(GalleryContext)

export const GalleryProvider = ({ children }: { children: ReactNode }) => {
  const { branchId } = useBranch()
  const [images, setImages] = useState<GalleryItem[]>([])

  const refresh = useCallback(() => {
    if (!branchId) return
    api.get(`/gallery/${branchId}`).then(setImages).catch(() => {})
  }, [branchId])

  useEffect(() => { refresh() }, [refresh])

  const addImage = async (data: Omit<GalleryItem, '_id'>) => { await api.post(`/gallery/${branchId}`, data); refresh() }
  const updateImage = async (id: string, data: Omit<GalleryItem, '_id'>) => { await api.put(`/gallery/${branchId}/${id}`, data); refresh() }
  const deleteImage = async (id: string) => { await api.delete(`/gallery/${branchId}/${id}`); refresh() }

  return <GalleryContext.Provider value={{ images, addImage, updateImage, deleteImage, refresh }}>{children}</GalleryContext.Provider>
}
