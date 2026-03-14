import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import api from '../lib/api'
import { useBranch } from './BranchContext'

export interface Message {
  _id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

interface MessagesContextType {
  messages: Message[]
  unreadCount: number
  sendMessage: (data: Omit<Message, '_id' | 'read' | 'createdAt'>) => Promise<void>
  markAsRead: (id: string) => Promise<void>
  deleteMessage: (id: string) => Promise<void>
  refresh: () => void
}

const MessagesContext = createContext<MessagesContextType>({} as MessagesContextType)
export const useMessages = () => useContext(MessagesContext)

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const { branchId } = useBranch()
  const [messages, setMessages] = useState<Message[]>([])

  const refresh = useCallback(() => {
    if (!branchId) return
    const token = localStorage.getItem('kavram_token')
    if (!token) return
    api.get(`/messages/${branchId}`).then(setMessages).catch(() => {})
  }, [branchId])

  useEffect(() => { refresh() }, [refresh])

  const unreadCount = messages.filter(m => !m.read).length

  const sendMessage = async (data: Omit<Message, '_id' | 'read' | 'createdAt'>) => {
    await api.post(`/messages/${branchId}`, data)
  }

  const markAsRead = async (id: string) => {
    await api.patch(`/messages/${branchId}/${id}/read`)
    refresh()
  }

  const deleteMessage = async (id: string) => {
    await api.delete(`/messages/${branchId}/${id}`)
    refresh()
  }

  return (
    <MessagesContext.Provider value={{ messages, unreadCount, sendMessage, markAsRead, deleteMessage, refresh }}>
      {children}
    </MessagesContext.Provider>
  )
}
