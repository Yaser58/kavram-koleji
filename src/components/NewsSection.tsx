import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useNews } from '../context/NewsContext'
import { useBranch } from '../context/BranchContext'

const NewsSection = () => {
  const { news } = useNews()
  const { branchSlug } = useBranch()
  const latestNews = news.slice(0, 3)

  if (latestNews.length === 0) return null

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <p className="text-secondary font-semibold mb-2">Haberler</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Son Gelişmeler</h2>
          </div>
          <Link to={`/${branchSlug}/haberler`} className="mt-4 md:mt-0 inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition">
            Tüm Haberler <ArrowRight size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestNews.map((item) => (
            <Link to={`/${branchSlug}/haberler/${item._id}`} key={item._id}>
              <article className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover cursor-pointer h-full">
                <div className="relative bg-gray-100">
                  <img src={item.images?.[0] || 'https://via.placeholder.com/400'} alt={item.title} className="w-full h-72 object-contain" />
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-2 rounded-lg text-center min-w-[60px]">
                    <span className="text-2xl font-bold block leading-none">{item.day || '01'}</span>
                    <span className="text-xs uppercase">{item.month || 'OCA'}</span>
                    <span className="text-xs block">{item.year || '2026'}</span>
                  </div>
                </div>
                <div className="p-5 border-t-4 border-secondary">
                  <h3 className="text-lg font-bold text-primary line-clamp-2 hover:text-secondary transition">{item.title}</h3>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsSection
