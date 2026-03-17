import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowLeft, Share2, Calendar, Tag } from 'lucide-react'
import { useNews } from '../context/NewsContext'
import { useBranch } from '../context/BranchContext'

const NewsDetail = () => {
  const { id } = useParams()
  const { news } = useNews()
  const { branchSlug } = useBranch()
  const [currentImage, setCurrentImage] = useState(0)

  const newsItem = news.find(n => n._id === id)
  const otherNews = news.filter(n => n._id !== id).slice(0, 3)

  if (!newsItem) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Haber Bulunamadı</h1>
          <Link to={`/${branchSlug}/haberler`} className="text-secondary hover:text-primary">Haberlere Dön</Link>
        </div>
      </div>
    )
  }

  const images = newsItem.images || []
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)

  return (
    <>
      {/* Hero Banner */}
      <div className="relative bg-gray-900">
        <div className="flex items-center justify-center min-h-[50vh] md:min-h-[70vh]">
          <img 
            src={images[currentImage] || 'https://via.placeholder.com/1920x800'} 
            alt={newsItem.title}
            className="max-w-full max-h-[70vh] object-contain"
          />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/40 transition text-white z-10">
              <ChevronLeft size={28} />
            </button>
            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/40 transition text-white z-10">
              <ChevronRight size={28} />
            </button>
          </>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <Link to={`/${branchSlug}/haberler`} className="inline-flex items-center gap-2 text-white/80 hover:text-white transition mb-4 text-sm">
              <ArrowLeft size={16} /> Haberlere Dön
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-secondary text-white text-sm px-4 py-1.5 rounded-full font-medium">{newsItem.category}</span>
              <span className="text-white/80 text-sm flex items-center gap-1">
                <Calendar size={14} /> {newsItem.day} {newsItem.month} {newsItem.year}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-4xl">{newsItem.title}</h1>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="bg-primary/5 py-4">
          <div className="container mx-auto px-4">
            <div className="flex gap-3 overflow-x-auto pb-2 justify-center">
              {images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentImage(idx)} 
                  className={`flex-shrink-0 rounded-xl overflow-hidden transition-all ${idx === currentImage ? 'ring-4 ring-secondary scale-105' : 'opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Fotoğraf ${idx + 1}`} className="w-24 h-16 md:w-32 md:h-20 object-contain object-center" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">{newsItem.excerpt}</p>
                </div>

                {/* Share */}
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Tag size={18} />
                      <span className="text-sm">{newsItem.category}</span>
                    </div>
                    <button className="flex items-center gap-2 text-primary hover:text-secondary transition">
                      <Share2 size={18} />
                      <span className="text-sm font-medium">Paylaş</span>
                    </button>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {otherNews.length > 0 && (
                <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-primary mb-6">Diğer Haberler</h3>
                  <div className="space-y-4">
                    {otherNews.map(item => (
                      <Link to={`/${branchSlug}/haberler/${item._id}`} key={item._id} className="flex gap-4 group">
                        <img src={item.images?.[0] || 'https://via.placeholder.com/100'} alt={item.title} className="w-20 h-20 object-contain object-center rounded-xl flex-shrink-0" />
                        <div className="flex-grow min-w-0">
                          <p className="text-xs text-gray-500 mb-1">{item.day} {item.month} {item.year}</p>
                          <h4 className="font-semibold text-gray-800 group-hover:text-secondary transition line-clamp-2 text-sm">{item.title}</h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link to={`/${branchSlug}/haberler`} className="block mt-6 text-center text-secondary hover:text-primary font-medium text-sm">
                    Tüm Haberleri Gör →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default NewsDetail
