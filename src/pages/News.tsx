import { Link } from 'react-router-dom'
import { useNews } from '../context/NewsContext'
import { useBranch } from '../context/BranchContext'

const News = () => {
  const { news } = useNews()
  const { branchSlug } = useBranch()

  return (
    <>
      <section className="bg-primary py-16 md:py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Haberler</h1>
          <p className="text-lg md:text-xl text-gray-300">Okulumuzdan Son Gelişmeler</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {news.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Henüz haber bulunmamaktadır.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <Link to={`/${branchSlug}/haberler/${item._id}`} key={item._id}>
                  <article className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover cursor-pointer h-full">
                    <div className="relative bg-gray-100">
                      <img src={item.images?.[0] || 'https://via.placeholder.com/400'} alt={item.title} className="w-full h-72 object-contain" />
                      <div className="absolute top-4 left-4 bg-primary text-white px-3 py-2 rounded-lg text-center min-w-[60px]">
                        <span className="text-2xl font-bold block leading-none">{item.day || '01'}</span>
                        <span className="text-xs uppercase">{item.month || 'OCA'}</span>
                        <span className="text-xs block">{item.year || '2026'}</span>
                      </div>
                      {item.images && item.images.length > 1 && (
                        <span className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">+{item.images.length - 1} fotoğraf</span>
                      )}
                    </div>
                    <div className="p-5 border-t-4 border-secondary">
                      <h3 className="text-lg font-bold text-primary line-clamp-2 hover:text-secondary transition">{item.title}</h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default News
