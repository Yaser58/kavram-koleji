import { Play } from 'lucide-react'
import { useState } from 'react'
import { useVideo } from '../context/VideoContext'

const VideoSection = () => {
  const { videos } = useVideo()
  const [playingId, setPlayingId] = useState<string | null>(null)

  if (videos.length === 0) return null

  const getEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?]+)/)
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-secondary font-semibold mb-2">Tanıtım Filmlerimiz</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Kavram Koleji'ni Keşfedin</h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Okulumuzun eğitim anlayışını, kampüsümüzü ve öğrenci hayatını yakından tanıyın.</p>
        </div>

        <div className={`grid gap-6 max-w-5xl mx-auto ${videos.length === 1 ? 'grid-cols-1 max-w-4xl' : 'grid-cols-1 md:grid-cols-2'}`}>
          {videos.map(video => (
            <div key={video._id} className="rounded-2xl overflow-hidden shadow-2xl">
              {playingId === video._id ? (
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={getEmbedUrl(video.youtubeUrl)}
                    title={video.title}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative cursor-pointer group" onClick={() => setPlayingId(video._id)}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-[250px] md:h-[300px] object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/40 flex flex-col items-center justify-center group-hover:bg-primary/50 transition">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-3">
                      <Play size={30} className="text-white ml-1" />
                    </div>
                    <p className="text-white font-semibold text-lg">{video.title}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VideoSection
