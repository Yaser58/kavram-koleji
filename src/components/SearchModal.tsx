import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Search, X, FileText, Building2, Newspaper } from 'lucide-react'
import api from '../lib/api'

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

interface SearchResult {
  news: { _id: string; title: string; slug?: string; category?: string; titleEn?: string; categoryEn?: string }[]
  branches: { _id: string; name: string; slug: string; city?: string }[]
  pages: { title: string; to: string }[]
}

const SearchModal = ({ open, onClose }: SearchModalProps) => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language || 'tr'
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult>({ news: [], branches: [], pages: [] })
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults({ news: [], branches: [], pages: [] })
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults({ news: [], branches: [], pages: [] })
      return
    }
    const t = setTimeout(async () => {
      setLoading(true)
      try {
        const data = await api.get(`/main/search?q=${encodeURIComponent(query)}`, { lang }) as SearchResult
        setResults(data || { news: [], branches: [], pages: [] })
      } catch {
        setResults({ news: [], branches: [], pages: [] })
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => clearTimeout(t)
  }, [query])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/50" onClick={onClose}>
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b">
          <Search size={22} className="text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('common.siteSearch') + '...'}
            className="flex-1 py-2 text-lg outline-none"
          />
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
            <X size={22} />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.length < 2 ? (
            <p className="text-gray-400 text-center py-8">Aramak için en az 2 karakter girin</p>
          ) : loading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {results.pages?.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-2">
                    <FileText size={14} /> Sayfalar
                  </h4>
                  <div className="space-y-1">
                    {results.pages.map((p, i) => (
                      <Link key={i} to={p.to} onClick={onClose} className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                        {p.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {results.news?.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-2">
                    <Newspaper size={14} /> Haberler & Duyurular
                  </h4>
                  <div className="space-y-1">
                    {results.news.map((n) => {
                      const displayTitle = lang === 'en' && n.titleEn ? n.titleEn : n.title
                      const displayCategory = lang === 'en' && n.categoryEn ? n.categoryEn : n.category
                      return (
                      <Link key={n._id} to={`/haberler/${n.slug || n._id}`} onClick={onClose} className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                        <span className="font-medium">{displayTitle}</span>
                        {displayCategory && <span className="text-gray-400 text-sm ml-2">({displayCategory})</span>}
                      </Link>
                    )})}
                  </div>
                </div>
              )}
              {results.branches?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-2">
                    <Building2 size={14} /> Kampüsler
                  </h4>
                  <div className="space-y-1">
                    {results.branches.map((b) => (
                      <Link key={b._id} to={`/${b.slug}`} onClick={onClose} className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                        <span className="font-medium">{b.name}</span>
                        {b.city && <span className="text-gray-400 text-sm ml-2">({b.city})</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {query.length >= 2 && !loading && results.news?.length === 0 && results.branches?.length === 0 && results.pages?.length === 0 && (
                <p className="text-gray-400 text-center py-8">Sonuç bulunamadı</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchModal
