import { useState } from 'react'
import { X } from 'lucide-react'
import { useGallery, GalleryItem } from '../context/GalleryContext'

const Gallery = () => {
  const { images } = useGallery()
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  const allCategories = ['Tümü', ...Array.from(new Set(images.map(img => img.category)))]
  const filteredImages = activeCategory === 'Tümü' ? images : images.filter(img => img.category === activeCategory)

  return (
    <>
      <section className="bg-primary py-16 md:py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Galeri</h1>
          <p className="text-lg md:text-xl text-gray-300">Okulumuzdan Kareler</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {allCategories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition ${activeCategory === cat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {cat}
              </button>
            ))}
          </div>

          {filteredImages.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Bu kategoride fotoğraf bulunmamaktadır.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div key={image._id} className="relative group cursor-pointer overflow-hidden rounded-xl" onClick={() => setSelectedImage(image)}>
                  <img src={image.src} alt={image.title} className="w-full h-64 object-contain object-center group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-semibold">{image.title}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-4 right-4 text-white hover:text-secondary transition" onClick={() => setSelectedImage(null)} aria-label="Kapat"><X size={32} /></button>
          <img src={selectedImage.src} alt={selectedImage.title} className="max-w-full max-h-[90vh] object-contain" />
        </div>
      )}
    </>
  )
}

export default Gallery
