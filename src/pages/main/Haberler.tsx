import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'
import api from '../../lib/api'

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
}

const Haberler = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    api.get('/main/news').then(setNews).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const totalPages = Math.ceil(news.length / itemsPerPage)
  const paginatedNews = news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <MainWrapper>
      <PageBanner 
        title="Haberler" 
        breadcrumbs={[
          { label: 'Ana Sayfa', to: '/' }, 
          { label: `Haberler (${news.length} haber bulundu)` }
        ]} 
      />
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : news.length === 0 ? (
            <p className="text-center text-gray-400 py-10">Henüz haber eklenmemiş.</p>
          ) : (
            <>
              {/* News Grid - 2 columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {paginatedNews.map(item => (
                  <Link 
                    key={item._id} 
                    to={`/haberler/${item.slug || item._id}`}
                    className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100 flex"
                  >
                    {/* Image - Fixed size container with contain */}
                    <div className="w-40 md:w-48 flex-shrink-0 bg-gray-100 flex items-center justify-center p-2">
                      {item.images?.[0] ? (
                        <img 
                          src={item.images[0]} 
                          alt={item.title} 
                          className="max-w-full max-h-32 object-contain rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center text-white text-4xl font-bold">
                          K
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
                      <div>
                        <h3 className="font-bold text-primary group-hover:text-secondary transition line-clamp-2 mb-2 text-lg">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm flex items-center gap-1.5">
                          <Calendar size={14} />
                          {item.day} {item.month} {item.year}
                        </p>
                      </div>
                      <div className="mt-3">
                        <span className="inline-flex items-center gap-1 text-secondary font-semibold text-sm group-hover:gap-2 transition-all">
                          Detaylara Göz At <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-semibold transition ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  {currentPage < totalPages && (
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="px-4 h-10 rounded-lg bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 font-medium"
                    >
                      &gt;
                    </button>
                  )}
                  {currentPage < totalPages - 1 && (
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-4 h-10 rounded-lg bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 font-medium"
                    >
                      Son &raquo;
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </MainWrapper>
  )
}

export default Haberler
