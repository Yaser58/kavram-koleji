import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import api from '../lib/api'
import { useBranch } from './BranchContext'

export interface NewsItem {
  _id: string
  title: string
  excerpt: string
  images: string[]
  category: string
  day: string
  month: string
  year: string
}

interface NewsContextType {
  news: NewsItem[]
  loading: boolean
  addNews: (data: Omit<NewsItem, '_id'>) => Promise<void>
  updateNews: (id: string, data: Omit<NewsItem, '_id'>) => Promise<void>
  deleteNews: (id: string) => Promise<void>
  refresh: () => void
}

const NewsContext = createContext<NewsContextType>({} as NewsContextType)
export const useNews = () => useContext(NewsContext)

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const { branchId } = useBranch()
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(() => {
    if (!branchId) return
    api.get(`/news/${branchId}`).then(setNews).catch(() => {}).finally(() => setLoading(false))
  }, [branchId])

  useEffect(() => { refresh() }, [refresh])

  const addNews = async (data: Omit<NewsItem, '_id'>) => { await api.post(`/news/${branchId}`, data); refresh() }
  const updateNews = async (id: string, data: Omit<NewsItem, '_id'>) => { await api.put(`/news/${branchId}/${id}`, data); refresh() }
  const deleteNews = async (id: string) => { await api.delete(`/news/${branchId}/${id}`); refresh() }

  return <NewsContext.Provider value={{ news, loading, addNews, updateNews, deleteNews, refresh }}>{children}</NewsContext.Provider>
}
