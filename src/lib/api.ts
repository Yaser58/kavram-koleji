const API_BASE = import.meta.env.VITE_API_URL || '/api'

function getFallbackForFailedGet(path: string, method?: string) {
  if (method && method !== 'GET') return undefined
  if (path === '/branches' || path === '/main/gallery') return []
  if (path === '/main/slider' || path.startsWith('/main/slider?')) return []
  if (path === '/main/news' || path.startsWith('/main/news?')) return []
  if (path.startsWith('/main/news/slug/') || /^\/branches\/[^/]+$/.test(path)) return null
  if (path.startsWith('/main/') && !path.includes('/admin/')) return []
  return undefined
}

async function request(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('kavram_token')
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      const fallback = getFallbackForFailedGet(path, options.method)
      if (fallback !== undefined) return fallback
      throw new Error((data as { error?: string }).error || 'Bir hata oluştu')
    }
    return data
  } catch (err) {
    const fallback = getFallbackForFailedGet(path, options.method)
    if (fallback !== undefined) return fallback
    throw err
  }
}

export const api = {
  get: (path: string, params?: Record<string, string>) => {
    let url = path
    if (params && Object.keys(params).length) {
      const qs = new URLSearchParams(params).toString()
      url += (path.includes('?') ? '&' : '?') + qs
    }
    return request(url)
  },
  post: (path: string, data: unknown) => request(path, { method: 'POST', body: JSON.stringify(data) }),
  put: (path: string, data: unknown) => request(path, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (path: string, data?: unknown) => request(path, { method: 'PATCH', body: data ? JSON.stringify(data) : undefined }),
  delete: (path: string) => request(path, { method: 'DELETE' }),
}

export default api
