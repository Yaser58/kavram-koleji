import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'
import api from '../../lib/api'
import { getLocalizedNews } from '../../lib/newsLocalization'

interface NewsItem {
  _id: string
  title: string
  excerpt: string
  images: string[]
  category: string
  day: string
  month: string
  year: string
  slug?: string
  titleEn?: string
  excerptEn?: string
  categoryEn?: string
  monthEn?: string
  startDate?: string
}

const Duyurular = () => {
  const { t, i18n } = useTranslation()
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const lang = i18n.language || 'tr'

  useEffect(() => {
    api.get('/main/news', { lang }).then((data: NewsItem[]) => {
      const duyurular = (data || []).filter(n => (n.category || '').toLowerCase().includes('duyuru'))
      setNews(duyurular)
    }).catch(() => setNews([])).finally(() => setLoading(false))
  }, [lang])

  const totalPages = Math.ceil(news.length / itemsPerPage)
  const paginated = news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <MainWrapper>
      <PageBanner title={t('announcements.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: `${t('announcements.title')} (${news.length})` }]} />

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : news.length === 0 ? (
            <p className="text-center text-gray-400 py-10">{t('news.noNews')}</p>
          ) : (
            <>
              <div className="space-y-4">
                {paginated.map((item) => {
                  const loc = getLocalizedNews(item, lang)
                  return (
                  <Link
                    key={item._id}
                    to={`/haberler/${item.slug || item._id}`}
                    className="flex gap-4 bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition border border-gray-100"
                  >
                    <div className="w-20 flex-shrink-0 text-center">
                      <span className="block text-2xl font-bold text-primary">{loc.day}</span>
                      <span className="text-sm text-gray-500 uppercase">{loc.month}</span>
                      <span className="block text-sm text-gray-400">{loc.year}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-primary hover:text-secondary transition line-clamp-2">{loc.title}</h3>
                      <p className="text-gray-500 text-sm mt-2 line-clamp-2">{loc.excerpt}</p>
                    </div>
                    <ArrowRight size={20} className="text-gray-300 flex-shrink-0 self-center" />
                  </Link>
                )})}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-semibold ${currentPage === i + 1 ? 'bg-primary text-white' : 'bg-white border hover:bg-gray-50'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </MainWrapper>
  )
}

export default Duyurular
