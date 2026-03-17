import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNews, NewsItem } from '../context/NewsContext'
import { useSlider, SlideItem } from '../context/SliderContext'
import { useMessages, Message } from '../context/MessagesContext'
import { useGallery, GalleryItem } from '../context/GalleryContext'
import { useVideo, VideoItem } from '../context/VideoContext'
import { useAnnouncements, Announcement } from '../context/AnnouncementContext'
import { Plus, Trash2, Edit, LogOut, Save, X, Newspaper, Image, LayoutDashboard, Mail, Clock, Images, Video, Megaphone } from 'lucide-react'

type Tab = 'dashboard' | 'news' | 'slider' | 'messages' | 'gallery' | 'videos' | 'announcements'
const months = ['OCA', 'ŞUB', 'MAR', 'NİS', 'MAY', 'HAZ', 'TEM', 'AĞU', 'EYL', 'EKİ', 'KAS', 'ARA']

const Admin = () => {
  const { isAdmin, isSuperAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const { news, addNews, deleteNews, updateNews } = useNews()
  const { slides, addSlide, deleteSlide, updateSlide } = useSlider()
  const { messages, deleteMessage, markAsRead, unreadCount } = useMessages()
  const { images, addImage, deleteImage, updateImage } = useGallery()
  const { videos, addVideo, deleteVideo, updateVideo } = useVideo()
  const { announcements, addAnnouncement, deleteAnnouncement, updateAnnouncement } = useAnnouncements()

  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [showNewsForm, setShowNewsForm] = useState(false)
  const [showSliderForm, setShowSliderForm] = useState(false)
  const [showGalleryForm, setShowGalleryForm] = useState(false)
  const [showVideoForm, setShowVideoForm] = useState(false)
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false)
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null)
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null)
  const [editingImageId, setEditingImageId] = useState<string | null>(null)
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null)
  const [editingAnnouncementId, setEditingAnnouncementId] = useState<string | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [newsForm, setNewsForm] = useState({ title: '', day: '', month: 'OCA', year: '2026', excerpt: '', images: [''] as string[], category: 'Duyuru' })
  const [sliderForm, setSliderForm] = useState({ title: '', subtitle: '', image: '', cta: '', link: '/' })
  const [galleryForm, setGalleryForm] = useState({ src: '', title: '', category: 'Okul' })
  const [videoForm, setVideoForm] = useState({ title: '', thumbnail: '', youtubeUrl: '' })
  const [announcementForm, setAnnouncementForm] = useState({ text: '', active: true })

  if (!isAdmin) return <Navigate to="/giris" replace />
  if (isSuperAdmin) return <Navigate to="/super-admin" replace />

  const handleLogout = () => { logout(); navigate('/giris') }

  const addImageField = () => setNewsForm({ ...newsForm, images: [...newsForm.images, ''] })
  const removeImageField = (idx: number) => setNewsForm({ ...newsForm, images: newsForm.images.filter((_, i) => i !== idx) })
  const updateImageField = (idx: number, value: string) => { const n = [...newsForm.images]; n[idx] = value; setNewsForm({ ...newsForm, images: n }) }

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validImages = newsForm.images.filter(img => img.trim() !== '')
    if (validImages.length === 0) return alert('En az bir görsel ekleyin!')
    const data = { ...newsForm, images: validImages }
    editingNewsId ? await updateNews(editingNewsId, data) : await addNews(data)
    setNewsForm({ title: '', day: '', month: 'OCA', year: '2026', excerpt: '', images: [''], category: 'Duyuru' })
    setEditingNewsId(null); setShowNewsForm(false)
  }
  const handleSliderSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    editingSlideId ? await updateSlide(editingSlideId, sliderForm) : await addSlide(sliderForm)
    setSliderForm({ title: '', subtitle: '', image: '', cta: '', link: '/' })
    setEditingSlideId(null); setShowSliderForm(false)
  }
  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    editingImageId ? await updateImage(editingImageId, galleryForm) : await addImage(galleryForm)
    setGalleryForm({ src: '', title: '', category: 'Okul' })
    setEditingImageId(null); setShowGalleryForm(false)
  }
  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    editingVideoId ? await updateVideo(editingVideoId, videoForm) : await addVideo(videoForm)
    setVideoForm({ title: '', thumbnail: '', youtubeUrl: '' })
    setEditingVideoId(null); setShowVideoForm(false)
  }
  const handleAnnouncementSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    editingAnnouncementId ? await updateAnnouncement(editingAnnouncementId, announcementForm) : await addAnnouncement(announcementForm)
    setAnnouncementForm({ text: '', active: true })
    setEditingAnnouncementId(null); setShowAnnouncementForm(false)
  }

  const editNews = (item: NewsItem) => { setNewsForm({ title: item.title, day: item.day || '', month: item.month || 'OCA', year: item.year || '2026', excerpt: item.excerpt, images: item.images || [''], category: item.category }); setEditingNewsId(item._id); setShowNewsForm(true) }
  const editSlide = (item: SlideItem) => { setSliderForm({ title: item.title, subtitle: item.subtitle, image: item.image, cta: item.cta, link: item.link }); setEditingSlideId(item._id); setShowSliderForm(true) }
  const editImage = (item: GalleryItem) => { setGalleryForm({ src: item.src, title: item.title, category: item.category }); setEditingImageId(item._id); setShowGalleryForm(true) }
  const editVideo = (item: VideoItem) => { setVideoForm({ title: item.title, thumbnail: item.thumbnail, youtubeUrl: item.youtubeUrl }); setEditingVideoId(item._id); setShowVideoForm(true) }
  const editAnnouncement = (item: Announcement) => { setAnnouncementForm({ text: item.text, active: item.active }); setEditingAnnouncementId(item._id); setShowAnnouncementForm(true) }
  const openMessage = (msg: Message) => { setSelectedMessage(msg); if (!msg.read) markAsRead(msg._id) }

  const tabs = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard, badge: 0 },
    { id: 'messages' as Tab, label: 'Mesajlar', icon: Mail, badge: unreadCount },
    { id: 'news' as Tab, label: 'Haberler', icon: Newspaper, badge: 0 },
    { id: 'slider' as Tab, label: 'Slider', icon: Image, badge: 0 },
    { id: 'gallery' as Tab, label: 'Galeri', icon: Images, badge: 0 },
    { id: 'videos' as Tab, label: 'Videolar', icon: Video, badge: 0 },
    { id: 'announcements' as Tab, label: 'Duyurular', icon: Megaphone, badge: 0 },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-primary shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center"><span className="text-white font-bold">K</span></div>
            <div className="text-white"><h1 className="font-bold text-lg">Kavram Koleji</h1><p className="text-xs text-gray-300">Şube Yönetim Paneli</p></div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition"><LogOut size={18} /> Çıkış</button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${activeTab === tab.id ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <span className="flex items-center gap-3"><tab.icon size={20} /> {tab.label}</span>
                    {tab.badge > 0 && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{tab.badge}</span>}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          <div className="flex-grow">

            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Okunmamış', count: unreadCount, icon: Mail, color: 'red' },
                  { label: 'Haber', count: news.length, icon: Newspaper, color: 'blue' },
                  { label: 'Slider', count: slides.length, icon: Image, color: 'green' },
                  { label: 'Galeri', count: images.length, icon: Images, color: 'purple' },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-${s.color}-100 rounded-xl flex items-center justify-center`}><s.icon className={`text-${s.color}-600`} size={28} /></div>
                      <div><p className="text-gray-500 text-sm">{s.label}</p><h3 className="text-3xl font-bold text-primary">{s.count}</h3></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-primary mb-6">Gelen Mesajlar</h2>
                {messages.length === 0 ? <p className="text-gray-500 text-center py-10">Henüz mesaj yok.</p> : (
                  <div className="space-y-3">
                    {messages.map(msg => (
                      <div key={msg._id} onClick={() => openMessage(msg)} className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition ${msg.read ? 'bg-gray-50 hover:bg-gray-100' : 'bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-500'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${msg.read ? 'bg-gray-200' : 'bg-blue-500'}`}><Mail size={18} className={msg.read ? 'text-gray-500' : 'text-white'} /></div>
                        <div className="flex-grow min-w-0"><div className="flex items-center gap-2"><h4 className={`font-semibold truncate ${msg.read ? 'text-gray-700' : 'text-primary'}`}>{msg.name}</h4><span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded">{msg.subject}</span></div><p className="text-sm text-gray-500 truncate">{msg.message}</p></div>
                        <div className="flex items-center gap-2 flex-shrink-0"><span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12} /> {new Date(msg.createdAt).toLocaleDateString('tr-TR')}</span><button onClick={(e) => { e.stopPropagation(); deleteMessage(msg._id) }} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><Trash2 size={16} /></button></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {selectedMessage && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedMessage(null)}>
                <div className="bg-white rounded-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-start mb-4"><div><h3 className="text-xl font-bold text-primary">{selectedMessage.name}</h3><p className="text-sm text-gray-500">{selectedMessage.email} • {selectedMessage.phone || 'Telefon yok'}</p></div><button onClick={() => setSelectedMessage(null)} className="text-gray-400 hover:text-red-500"><X size={24} /></button></div>
                  <div className="mb-4"><span className="text-xs bg-secondary text-white px-3 py-1 rounded-full">{selectedMessage.subject}</span><p className="text-xs text-gray-400 mt-2">{new Date(selectedMessage.createdAt).toLocaleString('tr-TR')}</p></div>
                  <div className="bg-gray-50 p-4 rounded-xl"><p className="text-gray-700 whitespace-pre-line">{selectedMessage.message}</p></div>
                  <div className="mt-4 flex gap-2"><a href={`mailto:${selectedMessage.email}`} className="flex-1 bg-primary text-white py-2 rounded-lg text-center hover:bg-secondary transition">E-posta Gönder</a>{selectedMessage.phone && <a href={`tel:${selectedMessage.phone}`} className="flex-1 bg-green-500 text-white py-2 rounded-lg text-center hover:bg-green-600 transition">Ara</a>}</div>
                </div>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-primary">Haber Yönetimi</h2><button onClick={() => { setShowNewsForm(true); setEditingNewsId(null); setNewsForm({ title: '', day: '', month: 'OCA', year: '2026', excerpt: '', images: [''], category: 'Duyuru' }) }} className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition"><Plus size={18} /> Yeni Haber</button></div>
                {showNewsForm && (
                  <div className="bg-gray-50 p-6 rounded-xl mb-6 border">
                    <div className="flex justify-between items-center mb-4"><h3 className="font-semibold text-primary">{editingNewsId ? 'Düzenle' : 'Yeni Haber'}</h3><button onClick={() => setShowNewsForm(false)} className="text-gray-400 hover:text-red-500"><X size={20} /></button></div>
                    <form onSubmit={handleNewsSubmit} className="space-y-4">
                      <input type="text" placeholder="Başlık" required value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                      <div className="grid grid-cols-3 gap-4">
                        <input type="text" placeholder="Gün" required value={newsForm.day} onChange={e => setNewsForm({...newsForm, day: e.target.value})} className="px-4 py-3 border rounded-lg" maxLength={2} />
                        <select value={newsForm.month} onChange={e => setNewsForm({...newsForm, month: e.target.value})} className="px-4 py-3 border rounded-lg">{months.map(m => <option key={m} value={m}>{m}</option>)}</select>
                        <input type="text" placeholder="Yıl" required value={newsForm.year} onChange={e => setNewsForm({...newsForm, year: e.target.value})} className="px-4 py-3 border rounded-lg" maxLength={4} />
                      </div>
                      <select value={newsForm.category} onChange={e => setNewsForm({...newsForm, category: e.target.value})} className="w-full px-4 py-3 border rounded-lg"><option>Duyuru</option><option>Akademik</option><option>Spor</option><option>Etkinlik</option></select>
                      <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Görseller</label>
                        {(newsForm.images || ['']).map((img, idx) => (<div key={idx} className="flex gap-2"><input type="url" placeholder={`Görsel URL ${idx+1}`} value={img} onChange={e => updateImageField(idx, e.target.value)} className="flex-grow px-4 py-3 border rounded-lg" />{(newsForm.images||[]).length > 1 && <button type="button" onClick={() => removeImageField(idx)} className="px-3 bg-red-100 text-red-600 rounded-lg"><Trash2 size={18} /></button>}</div>))}
                        <button type="button" onClick={addImageField} className="text-sm text-secondary hover:text-primary flex items-center gap-1"><Plus size={16} /> Görsel Ekle</button>
                      </div>
                      <textarea placeholder="Açıklama" required rows={4} value={newsForm.excerpt} onChange={e => setNewsForm({...newsForm, excerpt: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"><Save size={18} /> Kaydet</button>
                    </form>
                  </div>
                )}
                {news.length === 0 ? <p className="text-gray-500 text-center py-10">Henüz haber yok.</p> : (
                  <div className="space-y-3">{news.map(item => (
                    <div key={item._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                      <div className="bg-primary text-white px-3 py-2 rounded-lg text-center min-w-[50px]"><span className="text-lg font-bold block">{item.day || '01'}</span><span className="text-xs">{item.month || 'OCA'}</span></div>
                      <img src={item.images?.[0] || 'https://via.placeholder.com/100'} alt={item.title} className="w-16 h-16 object-contain object-center rounded-lg" />
                      <div className="flex-grow min-w-0"><span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">{item.category}</span><h4 className="font-semibold text-primary mt-1 truncate">{item.title}</h4></div>
                      <div className="flex gap-2"><button onClick={() => editNews(item)} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"><Edit size={18} /></button><button onClick={() => deleteNews(item._id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><Trash2 size={18} /></button></div>
                    </div>
                  ))}</div>
                )}
              </div>
            )}

            {activeTab === 'slider' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-primary">Slider Yönetimi</h2><button onClick={() => { setShowSliderForm(true); setEditingSlideId(null); setSliderForm({ title: '', subtitle: '', image: '', cta: '', link: '/' }) }} className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition"><Plus size={18} /> Yeni Slide</button></div>
                {showSliderForm && (
                  <div className="bg-gray-50 p-6 rounded-xl mb-6 border">
                    <form onSubmit={handleSliderSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" placeholder="Başlık" required value={sliderForm.title} onChange={e => setSliderForm({...sliderForm, title: e.target.value})} className="px-4 py-3 border rounded-lg" />
                      <input type="text" placeholder="Alt Başlık" required value={sliderForm.subtitle} onChange={e => setSliderForm({...sliderForm, subtitle: e.target.value})} className="px-4 py-3 border rounded-lg" />
                      <input type="url" placeholder="Görsel URL" required value={sliderForm.image} onChange={e => setSliderForm({...sliderForm, image: e.target.value})} className="px-4 py-3 border rounded-lg" />
                      <input type="text" placeholder="Buton Yazısı" required value={sliderForm.cta} onChange={e => setSliderForm({...sliderForm, cta: e.target.value})} className="px-4 py-3 border rounded-lg" />
                      <select value={sliderForm.link} onChange={e => setSliderForm({...sliderForm, link: e.target.value})} className="md:col-span-2 px-4 py-3 border rounded-lg"><option value="/">Ana Sayfa</option><option value="/hakkimizda">Hakkımızda</option><option value="/akademik">Akademik</option><option value="/haberler">Haberler</option><option value="/galeri">Galeri</option><option value="/iletisim">İletişim</option></select>
                      <button type="submit" className="md:col-span-2 flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"><Save size={18} /> Kaydet</button>
                    </form>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{slides.map(item => (
                  <div key={item._id} className="relative group rounded-xl overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-48 object-contain object-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4"><p className="text-secondary text-sm">{item.subtitle}</p><h4 className="text-white font-bold">{item.title}</h4></div>
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition"><button onClick={() => editSlide(item)} className="p-2 bg-white text-blue-600 rounded-lg"><Edit size={16} /></button><button onClick={() => deleteSlide(item._id)} className="p-2 bg-white text-red-600 rounded-lg"><Trash2 size={16} /></button></div>
                  </div>
                ))}</div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-primary">Galeri Yönetimi</h2><button onClick={() => { setShowGalleryForm(true); setEditingImageId(null); setGalleryForm({ src: '', title: '', category: 'Okul' }) }} className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition"><Plus size={18} /> Yeni Fotoğraf</button></div>
                {showGalleryForm && (
                  <div className="bg-gray-50 p-6 rounded-xl mb-6 border">
                    <form onSubmit={handleGallerySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="url" placeholder="Görsel URL" required value={galleryForm.src} onChange={e => setGalleryForm({...galleryForm, src: e.target.value})} className="px-4 py-3 border rounded-lg" />
                      <input type="text" placeholder="Başlık" required value={galleryForm.title} onChange={e => setGalleryForm({...galleryForm, title: e.target.value})} className="px-4 py-3 border rounded-lg" />
                      <select value={galleryForm.category} onChange={e => setGalleryForm({...galleryForm, category: e.target.value})} className="md:col-span-2 px-4 py-3 border rounded-lg"><option>Okul</option><option>Etkinlik</option><option>Laboratuvar</option><option>Spor</option><option>Sınıf</option><option>Mezuniyet</option></select>
                      <button type="submit" className="md:col-span-2 flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"><Save size={18} /> Kaydet</button>
                    </form>
                  </div>
                )}
                {images.length === 0 ? <p className="text-gray-500 text-center py-10">Henüz fotoğraf yok.</p> : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{images.map(item => (
                    <div key={item._id} className="relative group rounded-xl overflow-hidden">
                      <img src={item.src} alt={item.title} className="w-full h-40 object-contain object-center" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2">
                        <span className="text-white text-sm font-medium text-center px-2">{item.title}</span>
                        <div className="flex gap-2"><button onClick={() => editImage(item)} className="p-2 bg-white text-blue-600 rounded-lg"><Edit size={14} /></button><button onClick={() => deleteImage(item._id)} className="p-2 bg-white text-red-600 rounded-lg"><Trash2 size={14} /></button></div>
                      </div>
                    </div>
                  ))}</div>
                )}
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-primary">Video Yönetimi</h2><button onClick={() => { setShowVideoForm(true); setEditingVideoId(null); setVideoForm({ title: '', thumbnail: '', youtubeUrl: '' }) }} className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition"><Plus size={18} /> Yeni Video</button></div>
                {showVideoForm && (
                  <div className="bg-gray-50 p-6 rounded-xl mb-6 border">
                    <div className="flex justify-between items-center mb-4"><h3 className="font-semibold text-primary">{editingVideoId ? 'Düzenle' : 'Yeni Video'}</h3><button onClick={() => setShowVideoForm(false)} className="text-gray-400 hover:text-red-500"><X size={20} /></button></div>
                    <form onSubmit={handleVideoSubmit} className="space-y-4">
                      <input type="text" placeholder="Video Başlığı" required value={videoForm.title} onChange={e => setVideoForm({...videoForm, title: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                      <input type="url" placeholder="YouTube URL (ör: https://www.youtube.com/watch?v=...)" required value={videoForm.youtubeUrl} onChange={e => setVideoForm({...videoForm, youtubeUrl: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                      <input type="url" placeholder="Kapak Görseli URL" required value={videoForm.thumbnail} onChange={e => setVideoForm({...videoForm, thumbnail: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"><Save size={18} /> Kaydet</button>
                    </form>
                  </div>
                )}
                {videos.length === 0 ? <p className="text-gray-500 text-center py-10">Henüz video yok.</p> : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{videos.map(item => (
                    <div key={item._id} className="relative group rounded-xl overflow-hidden">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-contain object-center" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Video size={40} className="text-white" /></div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3"><h4 className="text-white font-semibold text-sm">{item.title}</h4></div>
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition"><button onClick={() => editVideo(item)} className="p-2 bg-white text-blue-600 rounded-lg"><Edit size={16} /></button><button onClick={() => deleteVideo(item._id)} className="p-2 bg-white text-red-600 rounded-lg"><Trash2 size={16} /></button></div>
                    </div>
                  ))}</div>
                )}
              </div>
            )}

            {activeTab === 'announcements' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-primary">Duyuru Yönetimi</h2><button onClick={() => { setShowAnnouncementForm(true); setEditingAnnouncementId(null); setAnnouncementForm({ text: '', active: true }) }} className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition"><Plus size={18} /> Yeni Duyuru</button></div>
                {showAnnouncementForm && (
                  <div className="bg-gray-50 p-6 rounded-xl mb-6 border">
                    <div className="flex justify-between items-center mb-4"><h3 className="font-semibold text-primary">{editingAnnouncementId ? 'Düzenle' : 'Yeni Duyuru'}</h3><button onClick={() => setShowAnnouncementForm(false)} className="text-gray-400 hover:text-red-500"><X size={20} /></button></div>
                    <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                      <input type="text" placeholder="Duyuru metni" required value={announcementForm.text} onChange={e => setAnnouncementForm({...announcementForm, text: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={announcementForm.active} onChange={e => setAnnouncementForm({...announcementForm, active: e.target.checked})} className="w-5 h-5 rounded" /><span className="text-sm text-gray-700">Aktif (sitede gösterilsin)</span></label>
                      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"><Save size={18} /> Kaydet</button>
                    </form>
                  </div>
                )}
                {announcements.length === 0 ? <p className="text-gray-500 text-center py-10">Henüz duyuru yok.</p> : (
                  <div className="space-y-3">{announcements.map(item => (
                    <div key={item._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                      <div className={`w-3 h-3 rounded-full ${item.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <p className="flex-grow text-gray-700">{item.text}</p>
                      <span className={`text-xs px-2 py-1 rounded ${item.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{item.active ? 'Aktif' : 'Pasif'}</span>
                      <div className="flex gap-2"><button onClick={() => editAnnouncement(item)} className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Edit size={16} /></button><button onClick={() => deleteAnnouncement(item._id)} className="p-2 bg-red-100 text-red-600 rounded-lg"><Trash2 size={16} /></button></div>
                    </div>
                  ))}</div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
