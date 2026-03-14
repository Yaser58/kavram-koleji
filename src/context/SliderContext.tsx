import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import api from '../lib/api'
import { useBranch } from './BranchContext'

export interface SlideItem {
  _id: string
  title: string
  subtitle: string
  image: string
  cta: string
  link: string
}

interface SliderContextType {
  slides: SlideItem[]
  addSlide: (data: Omit<SlideItem, '_id'>) => Promise<void>
  updateSlide: (id: string, data: Omit<SlideItem, '_id'>) => Promise<void>
  deleteSlide: (id: string) => Promise<void>
  refresh: () => void
}

const SliderContext = createContext<SliderContextType>({} as SliderContextType)
export const useSlider = () => useContext(SliderContext)

export const SliderProvider = ({ children }: { children: ReactNode }) => {
  const { branchId } = useBranch()
  const [slides, setSlides] = useState<SlideItem[]>([])

  const refresh = useCallback(() => {
    if (!branchId) return
    api.get(`/slider/${branchId}`).then(setSlides).catch(() => {})
  }, [branchId])

  useEffect(() => { refresh() }, [refresh])

  const addSlide = async (data: Omit<SlideItem, '_id'>) => { await api.post(`/slider/${branchId}`, data); refresh() }
  const updateSlide = async (id: string, data: Omit<SlideItem, '_id'>) => { await api.put(`/slider/${branchId}/${id}`, data); refresh() }
  const deleteSlide = async (id: string) => { await api.delete(`/slider/${branchId}/${id}`); refresh() }

  return <SliderContext.Provider value={{ slides, addSlide, updateSlide, deleteSlide, refresh }}>{children}</SliderContext.Provider>
}
