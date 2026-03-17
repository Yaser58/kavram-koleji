import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Calendar, Share2, ArrowLeft } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'
import api from '../../lib/api'
import { getLocalizedNews } from '../../lib/newsLocalization'

interface NewsItem {
  _id: string
  title: string
  excerpt: string
  content?: string
  images: string[]
  category: string
  day: string
  month: string
  year: string
  slug?: string
  titleEn?: string
  excerptEn?: string
  contentEn?: string
  categoryEn?: string
  monthEn?: string
  startDate?: string
}

const HaberDetay = () => {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const [news, setNews] = useState<NewsItem | null>(null)
  const [otherNews, setOtherNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const lang = i18n.language || 'tr'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsItem, allNews] = await Promise.all([
          api.get(`/main/news/slug/${slug}`),
          api.get('/main/news', { lang })
        ])
        setNews(newsItem)
        const list = Array.isArray(allNews) ? allNews : []
        setOtherNews(newsItem ? list.filter((n: NewsItem) => n._id !== newsItem._id).slice(0, 5) : list.slice(0, 5))
      } catch (err) {
        console.error('Haber yüklenemedi:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [slug, lang])

  const loc = news ? getLocalizedNews(news, lang) : null
  const shareOnTwitter = () => {
    if (loc) window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(loc.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')
  }
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')
  }
  const shareOnWhatsApp = () => {
    if (loc) window.open(`https://wa.me/?text=${encodeURIComponent(loc.title + ' ' + window.location.href)}`, '_blank')
  }

  if (loading) {
    return (
      <MainWrapper>
        <div className="flex justify-center items-center py-32">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </MainWrapper>
    )
  }

  if (!news) {
    return (
      <MainWrapper>
        <PageBanner title={t('news.notFound')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('news.title'), to: '/haberler' }, { label: t('news.notFound') }]} />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-gray-500 mb-6">{t('news.notFoundDesc')}</p>
          <Link to="/haberler" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-secondary transition">
            <ArrowLeft size={18} /> {t('news.backToNews')}
          </Link>
        </div>
      </MainWrapper>
    )
  }

  return (
    <MainWrapper>
      <PageBanner 
        title={loc!.title} 
        breadcrumbs={[
          { label: t('nav.home'), to: '/' }, 
          { label: loc!.title }
        ]} 
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main Content */}
            <div className="flex-1">
              {/* Date & Share */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={18} />
                  <span>{loc!.day} {loc!.month} {loc!.year}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={shareOnTwitter} className="w-9 h-9 bg-gray-100 hover:bg-[#1DA1F2] hover:text-white rounded-full flex items-center justify-center transition" title="Twitter'da Paylaş">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </button>
                  <button onClick={shareOnFacebook} className="w-9 h-9 bg-gray-100 hover:bg-[#1877F2] hover:text-white rounded-full flex items-center justify-center transition" title="Facebook'ta Paylaş">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </button>
                  <button onClick={shareOnWhatsApp} className="w-9 h-9 bg-gray-100 hover:bg-[#25D366] hover:text-white rounded-full flex items-center justify-center transition" title="WhatsApp'ta Paylaş">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </button>
                </div>
              </div>

              {/* Image */}
              {news.images?.[0] && (
                <div className="mb-8 rounded-2xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
                  <img src={news.images[0]} alt={loc!.title} className="max-w-full max-h-[500px] object-contain" />
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                {loc!.content ? (
                  <div dangerouslySetInnerHTML={{ __html: (loc!.content || '').replace(/\n/g, '<br/>') }} />
                ) : (
                  <p>{loc!.excerpt}</p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl p-6 text-white sticky top-24">
                <h3 className="text-lg font-bold mb-6">{t('common.viewAll').toUpperCase()} {t('news.title').toUpperCase()}</h3>
                <div className="space-y-4">
                  {otherNews.map(item => {
                    const otherLoc = getLocalizedNews(item, lang)
                    return (
                    <Link 
                      key={item._id} 
                      to={`/haberler/${item.slug || item._id}`}
                      className="flex gap-3 group"
                    >
                      <div className="flex-1">
                        <h4 className="text-sm font-medium group-hover:text-yellow-300 transition line-clamp-2">{otherLoc.title}</h4>
                      </div>
                      {item.images?.[0] && (
                        <div className="w-16 h-16 bg-white/20 rounded-lg flex-shrink-0 flex items-center justify-center p-1">
                          <img src={item.images[0]} alt={otherLoc.title} className="max-w-full max-h-full object-contain rounded" />
                        </div>
                      )}
                    </Link>
                  )})}
                </div>
                <Link to="/haberler" className="mt-6 block text-center bg-white/20 hover:bg-white/30 py-2.5 rounded-full text-sm font-semibold transition">
                  {t('common.viewAll')} {t('news.title')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default HaberDetay
