import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import api from '../lib/api'
import { useBranch } from './BranchContext'

export interface VideoItem {
  _id: string
  title: string
  thumbnail: string
  youtubeUrl: string
}

interface VideoContextType {
  videos: VideoItem[]
  addVideo: (data: Omit<VideoItem, '_id'>) => Promise<void>
  updateVideo: (id: string, data: Omit<VideoItem, '_id'>) => Promise<void>
  deleteVideo: (id: string) => Promise<void>
  refresh: () => void
}

const VideoContext = createContext<VideoContextType>({} as VideoContextType)
export const useVideo = () => useContext(VideoContext)

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const { branchId } = useBranch()
  const [videos, setVideos] = useState<VideoItem[]>([])

  const refresh = useCallback(() => {
    if (!branchId) return
    api.get(`/videos/${branchId}`).then(setVideos).catch(() => {})
  }, [branchId])

  useEffect(() => { refresh() }, [refresh])

  const addVideo = async (data: Omit<VideoItem, '_id'>) => { await api.post(`/videos/${branchId}`, data); refresh() }
  const updateVideo = async (id: string, data: Omit<VideoItem, '_id'>) => { await api.put(`/videos/${branchId}/${id}`, data); refresh() }
  const deleteVideo = async (id: string) => { await api.delete(`/videos/${branchId}/${id}`); refresh() }

  return <VideoContext.Provider value={{ videos, addVideo, updateVideo, deleteVideo, refresh }}>{children}</VideoContext.Provider>
}
