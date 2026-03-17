import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'
import api from '../../lib/api'

interface GalleryItem { _id: string; src: string; title: string; category: string }

const ALL_CATEGORIES_KEY = '__all__'

const MainGaleri = () => {
  const { t } = useTranslation()
  const [images, setImages] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<GalleryItem | null>(null)
  const [filter, setFilter] = useState(ALL_CATEGORIES_KEY)
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    api.get('/main/gallery').then(setImages).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const onImageError = (id: string) => setFailedIds(prev => new Set([...prev, id]))
  const visibleImages = images.filter(i => !failedIds.has(i._id))
  const categorySet = Array.from(new Set(visibleImages.map(i => i.category).filter(Boolean)))
  const categories = [ALL_CATEGORIES_KEY, ...categorySet]
  const filtered = filter === ALL_CATEGORIES_KEY ? visibleImages : visibleImages.filter(i => i.category === filter)

  return (
    <MainWrapper>
      <PageBanner title={t('pages.galeri.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.galeri.title') }]} />
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-10"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
          ) : visibleImages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">{t('pages.galeri.emptyState')}</p>
              <p className="text-gray-300 text-sm mt-2">{t('pages.galeri.emptyHint')}</p>
            </div>
          ) : (
            <>
              {categories.length > 2 && (
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                  {categories.map(cat => (
                    <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 rounded-full text-sm font-semibold transition ${filter === cat ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{cat === ALL_CATEGORIES_KEY ? t('common.all') : cat}</button>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map(img => (
                  <div key={img._id} onClick={() => setSelected(img)} className="cursor-pointer group relative rounded-xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition ring-2 ring-transparent hover:ring-secondary/50">
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300" onError={() => onImageError(img._id)} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-end">
                      <div className="p-3 opacity-0 group-hover:opacity-100 transition"><p className="text-white text-sm font-semibold">{img.title}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute -top-12 right-0 text-white hover:text-secondary transition"><X size={28} /></button>
            <img src={selected.src} alt={selected.title} className="w-full max-h-[80vh] object-contain rounded-lg" />
            {selected.title && <p className="text-white text-center mt-4 font-semibold">{selected.title}</p>}
          </div>
        </div>
      )}
    </MainWrapper>
  )
}

export default MainGaleri