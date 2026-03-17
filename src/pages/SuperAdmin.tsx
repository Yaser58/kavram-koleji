import { useState, useEffect, useCallback } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../lib/api'
import { Plus, Trash2, Edit, LogOut, Save, X, Building2, Users, Shield, Eye, EyeOff, Newspaper, Image, Images, Calendar, CalendarDays, Megaphone } from 'lucide-react'

interface BranchStat {
  _id: string; name: string; slug: string; city: string; address: string; phone: string; email: string; active: boolean
  primaryColor: string; secondaryColor: string; logo?: string; newsCount: number; msgCount: number; unreadCount: number
}
interface UserItem {
  _id: string; username: string; name: string; role: string; active: boolean
  branch?: { _id: string; name: string; slug: string }
}
interface MainSlide { _id: string; title: string; subtitle: string; image: string; link: string; order: number; active: boolean }
interface MainNewsItem { _id: string; title: string; excerpt: string; content: string; images: string[]; category: string; day: string; month: string; year: string; featured: boolean; active: boolean }
interface MainGalleryItem { _id: string; src: string; title: string; category: string; active: boolean }
interface MainAcademicCalendarItem { _id: string; title: string; startDate: string; endDate?: string; type: string; active: boolean }
interface MainEventItem { _id: string; title: string; startDate: string; endDate?: string; location?: string; description?: string; imageUrl?: string; active: boolean }

type Tab = 'branches' | 'users' | 'content' | 'main-slider' | 'main-news' | 'main-gallery' | 'main-duyurular' | 'main-academic-calendar' | 'main-events'

const months = ['OCA', 'ŞUB', 'MAR', 'NİS', 'MAY', 'HAZ', 'TEM', 'AĞU', 'EYL', 'EKİ', 'KAS', 'ARA']

const SuperAdmin = () => {
  const { user, isSuperAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('branches')
  const [branches, setBranches] = useState<BranchStat[]>([])
  const [users, setUsers] = useState<UserItem[]>([])
  const [showBranchForm, setShowBranchForm] = useState(false)
  const [showUserForm, setShowUserForm] = useState(false)
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null)
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedBranchId, setSelectedBranchId] = useState<string>('')
  const [branchContent, setBranchContent] = useState<{news: any[], messages: any[], announcements: any[]}>({ news: [], messages: [], announcements: [] })

  // Main site content states
  const [mainSlides, setMainSlides] = useState<MainSlide[]>([])
  const [mainNews, setMainNews] = useState<MainNewsItem[]>([])
  const [mainGallery, setMainGallery] = useState<MainGalleryItem[]>([])
  const [showMainSliderForm, setShowMainSliderForm] = useState(false)
  const [showMainNewsForm, setShowMainNewsForm] = useState(false)
  const [showMainGalleryForm, setShowMainGalleryForm] = useState(false)
  const [editingMainSliderId, setEditingMainSliderId] = useState<string | null>(null)
  const [editingMainNewsId, setEditingMainNewsId] = useState<string | null>(null)
  const [editingMainGalleryId, setEditingMainGalleryId] = useState<string | null>(null)
  const [mainSliderForm, setMainSliderForm] = useState({ title: '', subtitle: '', image: '', link: '/', order: 0, active: true })
  const [mainNewsForm, setMainNewsForm] = useState({ title: '', excerpt: '', content: '', images: [''] as string[], category: 'Genel', day: '', month: 'MAR', year: '2026', featured: false, active: true })
  const [mainGalleryForm, setMainGalleryForm] = useState({ src: '', title: '', category: 'Genel', active: true })
  const [mainAcademicCalendar, setMainAcademicCalendar] = useState<MainAcademicCalendarItem[]>([])
  const [mainEvents, setMainEvents] = useState<MainEventItem[]>([])
  const [showMainAcademicCalendarForm, setShowMainAcademicCalendarForm] = useState(false)
  const [showMainEventForm, setShowMainEventForm] = useState(false)
  const [editingAcademicCalendarId, setEditingAcademicCalendarId] = useState<string | null>(null)
  const [editingEventId, setEditingEventId] = useState<string | null>(null)
  const [academicCalendarForm, setAcademicCalendarForm] = useState({ title: '', startDate: '', endDate: '', type: 'diger', active: true })
  const [eventForm, setEventForm] = useState({ title: '', startDate: '', endDate: '', location: '', description: '', imageUrl: '', active: true })

  const [branchForm, setBranchForm] = useState({ name: '', slug: '', city: '', address: '', phone: '', email: '', logo: '', primaryColor: '#1e3a5f', secondaryColor: '#c8a45c' })
  const [userForm, setUserForm] = useState({ username: '', password: '', name: '', role: 'branch_admin', branch: '', active: true })

  const loadBranches = useCallback(() => api.get('/super-admin/branches').then(setBranches).catch(() => {}), [])
  const loadUsers = useCallback(() => api.get('/super-admin/users').then(setUsers).catch(() => {}), [])
  const loadMainSlides = useCallback(() => api.get('/main/admin/slider').then(setMainSlides).catch(() => {}), [])
  const loadMainNews = useCallback(() => api.get('/main/admin/news').then(setMainNews).catch(() => {}), [])
  const loadMainGallery = useCallback(() => api.get('/main/admin/gallery').then(setMainGallery).catch(() => {}), [])
  const loadMainAcademicCalendar = useCallback(() => api.get('/main/admin/academic-calendar').then(setMainAcademicCalendar).catch(() => {}), [])
  const loadMainEvents = useCallback(() => api.get('/main/admin/events').then(setMainEvents).catch(() => {}), [])

  useEffect(() => {
    if (isSuperAdmin) {
      loadBranches(); loadUsers(); loadMainSlides(); loadMainNews(); loadMainGallery(); loadMainAcademicCalendar(); loadMainEvents()
    }
  }, [isSuperAdmin, loadBranches, loadUsers, loadMainSlides, loadMainNews, loadMainGallery, loadMainAcademicCalendar, loadMainEvents])

  if (!isSuperAdmin) return <Navigate to="/giris" replace />

  const handleLogout = () => { logout(); navigate('/giris') }

  // Branch handlers
  const handleBranchSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    editingBranchId ? await api.put(`/super-admin/branches/${editingBranchId}`, branchForm) : await api.post('/super-admin/branches', branchForm)
    setBranchForm({ name: '', slug: '', city: '', address: '', phone: '', email: '', logo: '', primaryColor: '#1e3a5f', secondaryColor: '#c8a45c' })
    setEditingBranchId(null); setShowBranchForm(false); loadBranches()
  }
  const editBranch = (b: BranchStat) => {
    setBranchForm({ name: b.name, slug: b.slug, city: b.city, address: b.address || '', phone: b.phone || '', email: b.email || '', logo: b.logo || '', primaryColor: b.primaryColor, secondaryColor: b.secondaryColor })
    setEditingBranchId(b._id); setShowBranchForm(true)
  }

  // User handlers
  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = { ...userForm, branch: userForm.branch || null }
    editingUserId ? await api.put(`/super-admin/users/${editingUserId}`, data) : await api.post('/super-admin/users', data)
    setUserForm({ username: '', password: '', name: '', role: 'branch_admin', branch: '', active: true })
    setEditingUserId(null); setShowUserForm(false); loadUsers()
  }
  const editUser = (u: UserItem) => {
    setUserForm({ username: u.username, password: '', name: u.name, role: u.role, branch: u.branch?._id || '', active: u.active })
    setEditingUserId(u._id); setShowUserForm(true)
  }

  const loadBranchContent = async (branchId: string) => {
    setSelectedBranchId(branchId)
    const [news, messages, announcements] = await Promise.all([
      api.get(`/news/${branchId}`).catch(() => []),
      api.get(`/messages/${branchId}`).catch(() => []),
      api.get(`/announcements/${branchId}`).catch(() => []),
    ])
    setBranchContent({ news, messages, announcements })
  }

  // Main Slider handlers
  const handleMainSliderSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      editingMainSliderId ? await api.put(`/main/admin/slider/${editingMainSliderId}`, mainSliderForm) : await api.post('/main/admin/slider', mainSliderForm)
      setMainSliderForm({ title: '', subtitle: '', image: '', link: '/', order: 0, active: true })
      setEditingMainSliderId(null); setShowMainSliderForm(false); loadMainSlides()
    } catch (err: any) { alert(err.message || 'Hata oluştu') }
  }
  const editMainSlider = (s: MainSlide) => {
    setMainSliderForm({ title: s.title, subtitle: s.subtitle || '', image: s.image, link: s.link || '/', order: s.order || 0, active: s.active })
    setEditingMainSliderId(s._id); setShowMainSliderForm(true)
  }

  // Main News handlers
  const addMainNewsImageField = () => setMainNewsForm({ ...mainNewsForm, images: [...mainNewsForm.images, ''] })
  const removeMainNewsImageField = (idx: number) => setMainNewsForm({ ...mainNewsForm, images: mainNewsForm.images.filter((_, i) => i !== idx) })
  const updateMainNewsImageField = (idx: number, val: string) => { const imgs = [...mainNewsForm.images]; imgs[idx] = val; setMainNewsForm({ ...mainNewsForm, images: imgs }) }

  const handleMainNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = { ...mainNewsForm, images: mainNewsForm.images.filter(i => i.trim()) }
      editingMainNewsId ? await api.put(`/main/admin/news/${editingMainNewsId}`, data) : await api.post('/main/admin/news', data)
      setMainNewsForm({ title: '', excerpt: '', content: '', images: [''], category: 'Genel', day: '', month: 'MAR', year: '2026', featured: false, active: true })
      setEditingMainNewsId(null); setShowMainNewsForm(false); loadMainNews()
    } catch (err: any) { alert(err.message || 'Hata oluştu') }
  }
  const editMainNews = (n: MainNewsItem) => {
    setMainNewsForm({ title: n.title, excerpt: n.excerpt || '', content: n.content || '', images: n.images?.length ? n.images : [''], category: n.category, day: n.day || '', month: n.month || 'MAR', year: n.year || '2026', featured: n.featured, active: n.active })
    setEditingMainNewsId(n._id); setShowMainNewsForm(true)
  }

  // Main Gallery handlers
  const handleMainGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      editingMainGalleryId ? await api.put(`/main/admin/gallery/${editingMainGalleryId}`, mainGalleryForm) : await api.post('/main/admin/gallery', mainGalleryForm)
      setMainGalleryForm({ src: '', title: '', category: 'Genel', active: true })
      setEditingMainGalleryId(null); setShowMainGalleryForm(false); loadMainGallery()
    } catch (err: any) { alert(err.message || 'Hata oluştu') }
  }
  const editMainGallery = (g: MainGalleryItem) => {
    setMainGalleryForm({ src: g.src, title: g.title || '', category: g.category, active: g.active })
    setEditingMainGalleryId(g._id); setShowMainGalleryForm(true)
  }

  // Academic Calendar handlers
  const handleAcademicCalendarSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      editingAcademicCalendarId ? await api.put(`/main/admin/academic-calendar/${editingAcademicCalendarId}`, academicCalendarForm) : await api.post('/main/admin/academic-calendar', academicCalendarForm)
      setAcademicCalendarForm({ title: '', startDate: '', endDate: '', type: 'diger', active: true })
      setEditingAcademicCalendarId(null); setShowMainAcademicCalendarForm(false); loadMainAcademicCalendar()
    } catch (err: any) { alert(err.message || 'Hata oluştu') }
  }
  const editAcademicCalendar = (item: MainAcademicCalendarItem) => {
    setAcademicCalendarForm({ title: item.title, startDate: item.startDate ? item.startDate.slice(0, 10) : '', endDate: item.endDate ? item.endDate.slice(0, 10) : '', type: item.type || 'diger', active: item.active })
    setEditingAcademicCalendarId(item._id); setShowMainAcademicCalendarForm(true)
  }

  // Events handlers
  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      editingEventId ? await api.put(`/main/admin/events/${editingEventId}`, eventForm) : await api.post('/main/admin/events', eventForm)
      setEventForm({ title: '', startDate: '', endDate: '', location: '', description: '', imageUrl: '', active: true })
      setEditingEventId(null); setShowMainEventForm(false); loadMainEvents()
    } catch (err: any) { alert(err.message || 'Hata oluştu') }
  }
  const editEvent = (item: MainEventItem) => {
    setEventForm({ title: item.title, startDate: item.startDate ? item.startDate.slice(0, 16) : '', endDate: item.endDate ? item.endDate.slice(0, 16) : '', location: item.location || '', description: item.description || '', imageUrl: item.imageUrl || '', active: item.active })
    setEditingEventId(item._id); setShowMainEventForm(true)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center"><Shield className="text-white" size={20} /></div>
            <div className="text-white"><h1 className="font-bold text-lg">Kavram Koleji</h1><p className="text-xs text-gray-300">Merkez Yönetim Paneli • {user?.name}</p></div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition"><LogOut size={18} /> Çıkış</button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { id: 'branches' as Tab, label: 'Şubeler', icon: Building2 },
            { id: 'users' as Tab, label: 'Kullanıcılar', icon: Users },
            { id: 'content' as Tab, label: 'Şube İçerikleri', icon: Building2 },
            { id: 'main-slider' as Tab, label: 'Ana Site Slider', icon: Image },
            { id: 'main-news' as Tab, label: 'Ana Site Haberler', icon: Newspaper },
            { id: 'main-duyurular' as Tab, label: 'Ana Site Duyurular', icon: Megaphone },
            { id: 'main-gallery' as Tab, label: 'Ana Site Galeri', icon: Images },
            { id: 'main-academic-calendar' as Tab, label: 'Akademik Takvim', icon: Calendar },
            { id: 'main-events' as Tab, label: 'Etkinlikler', icon: CalendarDays },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition ${activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Branches Tab */}
        {activeTab === 'branches' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Şube Yönetimi</h2>
              <button onClick={() => { setShowBranchForm(true); setEditingBranchId(null); setBranchForm({ name: '', slug: '', city: '', address: '', phone: '', email: '', logo: '', primaryColor: '#1e3a5f', secondaryColor: '#c8a45c' }) }} className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition"><Plus size={18} /> Yeni Şube</button>
            </div>
            {showBranchForm && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-primary">{editingBranchId ? 'Şube Düzenle' : 'Yeni Şube'}</h3><button onClick={() => setShowBranchForm(false)} className="text-gray-400 hover:text-red-500"><X size={20} /></button></div>
                <form onSubmit={handleBranchSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Şube Adı *" required value={branchForm.name} onChange={e => setBranchForm({...branchForm, name: e.target.value})} className="px-4 py-3 border rounded-lg" />
                  <input placeholder="URL Slug *" required value={branchForm.slug} onChange={e => setBranchForm({...branchForm, slug: e.target.value})} className="px-4 py-3 border rounded-lg" />
                  <input placeholder="Şehir *" required value={branchForm.city} onChange={e => setBranchForm({...branchForm, city: e.target.value})} className="px-4 py-3 border rounded-lg" />
                  <input type="url" placeholder="Kampüs Fotoğrafı URL (okul görseli)" value={branchForm.logo} onChange={e => setBranchForm({...branchForm, logo: e.target.value})} className="px-4 py-3 border rounded-lg md:col-span-2" />
                  <input placeholder="Telefon" value={branchForm.phone} onChange={e => setBranchForm({...branchForm, phone: e.target.value})} className="px-4 py-3 border rounded-lg" />
                  <input placeholder="E-posta" value={branchForm.email} onChange={e => setBranchForm({...branchForm, email: e.target.value})} className="px-4 py-3 border rounded-lg" />
                  <input placeholder="Adres" value={branchForm.address} onChange={e => setBranchForm({...branchForm, address: e.target.value})} className="px-4 py-3 border rounded-lg md:col-span-2" />
                  <div className="flex items-center gap-3"><label className="text-sm text-gray-600">Ana Renk</label><input type="color" value={branchForm.primaryColor} onChange={e => setBranchForm({...branchForm, primaryColor: e.target.value})} className="w-10 h-10 rounded cursor-pointer" /></div>
                  <div className="flex items-center gap-3"><label className="text-sm text-gray-600">İkincil Renk</label><input type="color" value={branchForm.secondaryColor} onChange={e => setBranchForm({...branchForm, secondaryColor: e.target.value})} className="w-10 h-10 rounded cursor-pointer" /></div>
                  <button type="submit" className="md:col-span-2 flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"><Save size={18} /> Kaydet</button>
                </form>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {branches.map(b => (
                <div key={b._id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-1" style={{ backgroundColor: b.primaryColor }}>
                    <div className="flex justify-between items-center px-4 py-2">
                      <h3 className="text-white font-bold">{b.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${b.active ? 'bg-green-400 text-white' : 'bg-gray-400 text-white'}`}>{b.active ? 'Aktif' : 'Pasif'}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-500 text-sm mb-3">/{b.slug} • {b.city}</p>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center bg-blue-50 rounded-lg p-2"><p className="text-xl font-bold text-blue-600">{b.newsCount}</p><p className="text-xs text-gray-500">Haber</p></div>
                      <div className="text-center bg-green-50 rounded-lg p-2"><p className="text-xl font-bold text-green-600">{b.msgCount}</p><p className="text-xs text-gray-500">Mesaj</p></div>
                      <div className="text-center bg-red-50 rounded-lg p-2"><p className="text-xl font-bold text-red-600">{b.unreadCount}</p><p className="text-xs text-gray-500">Okunmamış</p></div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => editBranch(b)} className="flex-1 flex items-center justify-center gap-1 bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200 text-sm"><Edit size={14} /> Düzenle</button>
                      <button onClick={async () => { if(confirm('Bu şubeyi silmek istediğinize emin misiniz?')) { await api.delete(`/super-admin/branches/${b._id}`); loadBranches() }}} className="flex items-center justify-center gap-1 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 text-sm"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Kullanıcı Yönetimi</h2>
              <button onClick={() => { setShowUserForm(true); setEditingUserId(null); setUserForm({ username: '', password: '', name: '', role: 'branch_admin', branch: '', active: true }) }} className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition"><Plus size={18} /> Yeni Kullanıcı</button>
            </div>
            {showUserForm && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-primary">{editingUserId ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı'}</h3><button onClick={() => setShowUserForm(false)} className="text-gray-400 hover:text-red-500"><X size={20} /></button></div>
                <form onSubmit={handleUserSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Kullanıcı Adı *" required value={userForm.username} onChange={e => setUserForm({...userForm, username: e.target.value})} className="px-4 py-3 border rounded-lg" />
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} placeholder={editingUserId ? 'Yeni Şifre (boş bırakılabilir)' : 'Şifre *'} required={!editingUserId} value={userForm.password} onChange={e => setUserForm({...userForm, password: e.target.value})} className="w-full px-4 py-3 border rounded-lg pr-12" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
                  </div>
                  <input placeholder="Ad Soyad" value={userForm.name} onChange={e => setUserForm({...userForm, name: e.target.value})} className="px-4 py-3 border rounded-lg" />
                  <select value={userForm.role} onChange={e => setUserForm({...userForm, role: e.target.value})} className="px-4 py-3 border rounded-lg">
                    <option value="branch_admin">Şube Admin</option><option value="super_admin">Süper Admin</option>
                  </select>
                  {userForm.role === 'branch_admin' && (
                    <select value={userForm.branch} onChange={e => setUserForm({...userForm, branch: e.target.value})} className="px-4 py-3 border rounded-lg">
                      <option value="">Şube Seçin</option>
                      {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                    </select>
                  )}
                  <label className="flex items-center gap-2"><input type="checkbox" checked={userForm.active} onChange={e => setUserForm({...userForm, active: e.target.checked})} className="w-5 h-5" /><span>Aktif</span></label>
                  <button type="submit" className="md:col-span-2 flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"><Save size={18} /> Kaydet</button>
                </form>
              </div>
            )}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Kullanıcı</th><th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Rol</th><th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Şube</th><th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Durum</th><th className="px-6 py-3"></th></tr></thead>
                <tbody className="divide-y">
                  {users.map(u => (
                    <tr key={u._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4"><p className="font-semibold text-primary">{u.name || u.username}</p><p className="text-xs text-gray-400">{u.username}</p></td>
                      <td className="px-6 py-4"><span className={`text-xs px-2 py-1 rounded-full ${u.role === 'super_admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{u.role === 'super_admin' ? 'Süper Admin' : 'Şube Admin'}</span></td>
                      <td className="px-6 py-4 text-sm text-gray-600">{u.branch?.name || '-'}</td>
                      <td className="px-6 py-4"><span className={`w-2 h-2 rounded-full inline-block ${u.active ? 'bg-green-500' : 'bg-gray-300'}`} /></td>
                      <td className="px-6 py-4"><div className="flex gap-2 justify-end"><button onClick={() => editUser(u)} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"><Edit size={14} /></button><button onClick={async () => { if(confirm('Silmek istediğinize emin misiniz?')) { await api.delete(`/super-admin/users/${u._id}`); loadUsers() }}} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><Trash2 size={14} /></button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Branch Content Tab */}
        {activeTab === 'content' && (
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Şube İçerik Yönetimi</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              {branches.map(b => (
                <button key={b._id} onClick={() => loadBranchContent(b._id)} className={`px-4 py-2 rounded-lg font-medium transition ${selectedBranchId === b._id ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>{b.name}</button>
              ))}
            </div>
            {selectedBranchId && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-primary mb-4">Mesajlar ({branchContent.messages.length})</h3>
                  {branchContent.messages.length === 0 ? <p className="text-gray-500">Mesaj yok.</p> : (
                    <div className="space-y-2 max-h-60 overflow-y-auto">{branchContent.messages.map((m: any) => (
                      <div key={m._id} className={`p-3 rounded-lg text-sm ${m.read ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-500'}`}>
                        <div className="flex justify-between"><span className="font-semibold">{m.name}</span><span className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleDateString('tr-TR')}</span></div>
                        <p className="text-gray-500 text-xs mt-1">{m.subject} - {m.message?.substring(0, 100)}</p>
                      </div>
                    ))}</div>
                  )}
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-primary mb-4">Haberler ({branchContent.news.length})</h3>
                  {branchContent.news.length === 0 ? <p className="text-gray-500">Haber yok.</p> : (
                    <div className="space-y-2 max-h-60 overflow-y-auto">{branchContent.news.map((n: any) => (
                      <div key={n._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="bg-primary text-white px-2 py-1 rounded text-center min-w-[40px]"><span className="text-sm font-bold block">{n.day}</span><span className="text-xs">{n.month}</span></div>
                        <div><h4 className="font-semibold text-sm">{n.title}</h4><span className="text-xs text-gray-400">{n.category}</span></div>
                      </div>
                    ))}</div>
                  )}
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-primary mb-4">Duyurular ({branchContent.announcements.length})</h3>
                  {branchContent.announcements.length === 0 ? <p className="text-gray-500">Duyuru yok.</p> : (
                    <div className="space-y-2">{branchContent.announcements.map((a: any) => (
                      <div key={a._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-3 h-3 rounded-full ${a.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <p className="text-sm flex-grow">{a.text}</p>
                        <span className={`text-xs px-2 py-1 rounded ${a.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{a.active ? 'Aktif' : 'Pasif'}</span>
                      </div>
                    ))}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Main Site Slider Tab */}
        {activeTab === 'main-slider' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div><h2 className="text-2xl font-bold text-primary">Ana Site Slider</h2><p className="text-gray-500 text-sm">Ana sayfadaki slider görsellerini yönetin</p></div>
              <button onClick={() => { setShowMainSliderForm(true); setEditingMainSliderId(null); setMainSliderForm({ title: '', subtitle: '', image: '', link: '/', order: 0, active: true }) }} className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition"><Plus size={18} /> Yeni Slide</button>
            </div>
            {showMainSliderForm && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-primary">{editingMainSliderId ? 'Slide Düzenle' : 'Yeni Slide'}</h3><button onClick={() => setShowMainSliderForm(false)} className="text-gray-400 hover:text-red-500"><X size={20} /></button></div>
                <form onSubmit={handleMainSliderSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Başlık *" required value={mainSliderForm.title} onChange={e => setMainSliderForm({...mainSliderForm, title: e.target.value})} className="px-4 py-3 border rounded-lg" />
                  <input placeholder="Alt Başlık" value={mainSliderForm.subtitle} onChange={e => setMainSliderForm({...mainSliderForm, subtitle: e.target.value})} className="px-4 py-3 border rounded-lg" />
                  <input type="url" placeholder="Görsel URL *" required value={mainSliderForm.image} onChange={e => setMainSliderForm({...mainSliderForm, image: e.target.value})} className="px-4 py-3 border rounded-lg" />
                  <input placeholder="Link" value={mainSliderForm.link} onChange={e => setMainSliderForm({...mainSliderForm, link: e.target.value})} className="px-4 py-3 border rounded-lg" />
                  <input type="number" placeholder="Sıra" value={mainSliderForm.order} onChange={e => setMainSliderForm({...mainSliderForm, order: parseInt(e.target.value) || 0})} className="px-4 py-3 border rounded-lg" />
                  <label className="flex items-center gap-2"><input type="checkbox" checked={mainSliderForm.active} onChange={e => setMainSliderForm({...mainSliderForm, active: e.target.checked})} className="w-5 h-5" /><span>Aktif</span></label>
                  <button type="submit" className="md:col-span-2 flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"><Save size={18} /> Kaydet</button>
                </form>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainSlides.map(s => (
                <div key={s._id} className="relative group rounded-2xl overflow-hidden shadow-lg bg-white">
                  <img src={s.image} alt={s.title} className="w-full h-48 object-contain object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <p className="text-secondary text-sm">{s.subtitle}</p>
                    <h4 className="text-white font-bold">{s.title}</h4>
                  </div>
                  {!s.active && <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Pasif</div>}
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button onClick={() => editMainSlider(s)} className="p-2 bg-white text-blue-600 rounded-lg shadow"><Edit size={16} /></button>
                    <button onClick={async () => { if(confirm('Silmek istediğinize emin misiniz?')) { await api.delete(`/main/admin/slider/${s._id}`); loadMainSlides() }}} className="p-2 bg-white text-red-600 rounded-lg shadow"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
              {mainSlides.length === 0 && <p className="text-gray-500 col-span-3 text-center py-10">Henüz slide eklenmemiş.</p>}
            </div>
          </div>
        )}

        {/* Main Site News Tab */}
        {activeTab === 'main-news' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div><h2 className="text-2xl font-bold text-primary">Ana Site Haberler</h2><p className="text-gray-500 text-sm">Ana sayfadaki haberleri yönetin</p></div>
              <button onClick={() => { setShowMainNewsForm(true); setEditingMainNewsId(null); setMainNewsForm({ title: '', excerpt: '', content: '', images: [''], category: 'Genel', day: '', month: 'MAR', year: '2026', featured: false, active: true }) }} className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition"><Plus size={18} /> Yeni Haber</button>
            </div>
            {showMainNewsForm && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-primary">{editingMainNewsId ? 'Haber Düzenle' : 'Yeni Haber'}</h3><button onClick={() => setShowMainNewsForm(false)} className="text-gray-400 hover:text-red-500"><X size={20} /></button></div>
                <form onSubmit={handleMainNewsSubmit} className="space-y-4">
                  <input placeholder="Başlık *" required value={mainNewsForm.title} onChange={e => setMainNewsForm({...mainNewsForm, title: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                  <div className="grid grid-cols-3 gap-4">
                    <input placeholder="Gün" required value={mainNewsForm.day} onChange={e => setMainNewsForm({...mainNewsForm, day: e.target.value})} className="px-4 py-3 border rounded-lg" maxLength={2} />
                    <select value={mainNewsForm.month} onChange={e => setMainNewsForm({...mainNewsForm, month: e.target.value})} className="px-4 py-3 border rounded-lg">{months.map(m => <option key={m} value={m}>{m}</option>)}</select>
                    <input placeholder="Yıl" required value={mainNewsForm.year} onChange={e => setMainNewsForm({...mainNewsForm, year: e.target.value})} className="px-4 py-3 border rounded-lg" maxLength={4} />
                  </div>
                  <select value={mainNewsForm.category} onChange={e => setMainNewsForm({...mainNewsForm, category: e.target.value})} className="w-full px-4 py-3 border rounded-lg">
                    <option>Genel</option><option>Akademik</option><option>Etkinlik</option><option>Duyuru</option><option>Başarı</option><option>İşbirliği</option>
                  </select>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Görseller</label>
                    {mainNewsForm.images.map((img, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input type="url" placeholder={`Görsel URL ${idx+1}`} value={img} onChange={e => updateMainNewsImageField(idx, e.target.value)} className="flex-grow px-4 py-3 border rounded-lg" />
                        {mainNewsForm.images.length > 1 && <button type="button" onClick={() => removeMainNewsImageField(idx)} className="px-3 bg-red-100 text-red-600 rounded-lg"><Trash2 size={18} /></button>}
                      </div>
                    ))}
                    <button type="button" onClick={addMainNewsImageField} className="text-sm text-secondary hover:text-primary flex items-center gap-1"><Plus size={16} /> Görsel Ekle</button>
                  </div>
                  <textarea placeholder="Kısa Açıklama *" required rows={3} value={mainNewsForm.excerpt} onChange={e => setMainNewsForm({...mainNewsForm, excerpt: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                  <textarea placeholder="Detaylı İçerik" rows={6} value={mainNewsForm.content} onChange={e => setMainNewsForm({...mainNewsForm, content: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2"><input type="checkbox" checked={mainNewsForm.featured} onChange={e => setMainNewsForm({...mainNewsForm, featured: e.target.checked})} className="w-5 h-5" /><span className="text-sm">Öne Çıkan</span></label>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={mainNewsForm.active} onChange={e => setMainNewsForm({...mainNewsForm, active: e.target.checked})} className="w-5 h-5" /><span className="text-sm">Aktif</span></label>
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"><Save size={18} /> Kaydet</button>
                </form>
              </div>
            )}

            {mainNews.length === 0 ? <p className="text-gray-500 text-center py-10">Henüz haber eklenmemiş.</p> : (
              <div className="space-y-3">
                {mainNews.map(item => (
                  <div key={item._id} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md transition">
                    <div className="bg-primary text-white px-3 py-2 rounded-lg text-center min-w-[50px]">
                      <span className="text-lg font-bold block">{item.day}</span>
                      <span className="text-xs">{item.month}</span>
                    </div>
                    {item.images?.[0] && <img src={item.images[0]} alt={item.title} className="w-16 h-16 object-contain object-center rounded-lg" />}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">{item.category}</span>
                        {item.featured && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Öne Çıkan</span>}
                        {!item.active && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Pasif</span>}
                      </div>
                      <h4 className="font-semibold text-primary mt-1 truncate">{item.title}</h4>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => editMainNews(item)} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"><Edit size={18} /></button>
                      <button onClick={async () => { if(confirm('Silmek istediğinize emin misiniz?')) { await api.delete(`/main/admin/news/${item._id}`); loadMainNews() }}} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Main Site Gallery Tab */}
        {activeTab === 'main-gallery' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div><h2 className="text-2xl font-bold text-primary">Ana Site Galeri</h2><p className="text-gray-500 text-sm">Ana sayfadaki galeri görsellerini yönetin</p></div>
              <button onClick={() => { setShowMainGalleryForm(true); setEditingMainGalleryId(null); setMainGalleryForm({ src: '', title: '', category: 'Genel', active: true }) }} className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition"><Plus size={18} /> Yeni Görsel</button>
            </div>
            {showMainGalleryForm && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-primary">{editingMainGalleryId ? 'Görsel Düzenle' : 'Yeni Görsel'}</h3><button onClick={() => setShowMainGalleryForm(false)} className="text-gray-400 hover:text-red-500"><X size={20} /></button></div>
                <form onSubmit={handleMainGallerySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="url" placeholder="Görsel URL *" required value={mainGalleryForm.src} onChange={e => setMainGalleryForm({...mainGalleryForm, src: e.target.value})} className="px-4 py-3 border rounded-lg" />
                  <input placeholder="Başlık" value={mainGalleryForm.title} onChange={e => setMainGalleryForm({...mainGalleryForm, title: e.target.value})} className="px-4 py-3 border rounded-lg" />
                  <select value={mainGalleryForm.category} onChange={e => setMainGalleryForm({...mainGalleryForm, category: e.target.value})} className="px-4 py-3 border rounded-lg">
                    <option>Genel</option><option>Kampüs</option><option>Etkinlik</option><option>Akademik</option><option>Spor</option>
                  </select>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={mainGalleryForm.active} onChange={e => setMainGalleryForm({...mainGalleryForm, active: e.target.checked})} className="w-5 h-5" /><span>Aktif</span></label>
                  <button type="submit" className="md:col-span-2 flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"><Save size={18} /> Kaydet</button>
                </form>
              </div>
            )}
            {mainGallery.length === 0 ? <p className="text-gray-500 text-center py-10">Henüz görsel eklenmemiş.</p> : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mainGallery.map(item => (
                  <div key={item._id} className="relative group rounded-xl overflow-hidden shadow-lg">
                    <img src={item.src} alt={item.title} className="w-full h-40 object-contain object-center" />
                    {!item.active && <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Pasif</div>}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2">
                      <span className="text-white text-sm font-medium text-center px-2">{item.title}</span>
                      <span className="text-white/70 text-xs">{item.category}</span>
                      <div className="flex gap-2">
                        <button onClick={() => editMainGallery(item)} className="p-2 bg-white text-blue-600 rounded-lg"><Edit size={14} /></button>
                        <button onClick={async () => { if(confirm('Silmek istediğinize emin misiniz?')) { await api.delete(`/main/admin/gallery/${item._id}`); loadMainGallery() }}} className="p-2 bg-white text-red-600 rounded-lg"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Ana Site Duyurular - Haberlerden Duyuru kategorisi */}
        {activeTab === 'main-duyurular' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div><h2 className="text-2xl font-bold text-primary">Ana Site Duyurular</h2><p className="text-gray-500 text-sm">Resmi duyurular (Ana Site Haberlerden kategori: Duyuru)</p></div>
              <button onClick={() => { setActiveTab('main-news'); setShowMainNewsForm(true); setEditingMainNewsId(null); setMainNewsForm({ title: '', excerpt: '', content: '', images: [''], category: 'Duyuru', day: '', month: 'MAR', year: '2026', featured: false, active: true }) }} className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition"><Plus size={18} /> Yeni Duyuru</button>
            </div>
            {mainNews.filter(n => n.category === 'Duyuru').length === 0 ? <p className="text-gray-500 text-center py-10">Henüz duyuru eklenmemiş. Yeni Duyuru ile ekleyebilirsiniz.</p> : (
              <div className="space-y-3">
                {mainNews.filter(n => n.category === 'Duyuru').map(item => (
                  <div key={item._id} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md transition">
                    <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center min-w-[50px]"><span className="text-lg font-bold block">{item.day}</span><span className="text-xs">{item.month}</span></div>
                    {item.images?.[0] && <img src={item.images[0]} alt={item.title} className="w-16 h-16 object-contain rounded-lg" />}
                    <div className="flex-grow min-w-0"><h4 className="font-semibold text-primary truncate">{item.title}</h4><span className="text-xs text-gray-400">Duyuru</span></div>
                    <div className="flex gap-2">
                      <button onClick={() => editMainNews(item)} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"><Edit size={18} /></button>
                      <button onClick={async () => { if(confirm('Silmek istediğinize emin misiniz?')) { await api.delete(`/main/admin/news/${item._id}`); loadMainNews() }}} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Akademik Takvim */}
        {activeTab === 'main-academic-calendar' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div><h2 className="text-2xl font-bold text-primary">Akademik Takvim</h2><p className="text-gray-500 text-sm">Kayıt, sınav, tatil ve dönem tarihleri</p></div>
              <button onClick={() => { setShowMainAcademicCalendarForm(true); setEditingAcademicCalendarId(null); setAcademicCalendarForm({ title: '', startDate: '', endDate: '', type: 'diger', active: true }) }} className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition"><Plus size={18} /> Yeni Kayıt</button>
            </div>
            {showMainAcademicCalendarForm && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-primary">{editingAcademicCalendarId ? 'Düzenle' : 'Yeni Kayıt'}</h3><button onClick={() => setShowMainAcademicCalendarForm(false)} className="text-gray-400 hover:text-red-500"><X size={20} /></button></div>
                <form onSubmit={handleAcademicCalendarSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Başlık *" required value={academicCalendarForm.title} onChange={e => setAcademicCalendarForm({...academicCalendarForm, title: e.target.value})} className="px-4 py-3 border rounded-lg" />
                  <select value={academicCalendarForm.type} onChange={e => setAcademicCalendarForm({...academicCalendarForm, type: e.target.value})} className="px-4 py-3 border rounded-lg">
                    <option value="kayit">Kayıt</option><option value="sinav">Sınav</option><option value="tatil">Tatil</option><option value="donem">Dönem</option><option value="diger">Diğer</option>
                  </select>
                  <input type="date" placeholder="Başlangıç *" required value={academicCalendarForm.startDate} onChange={e => setAcademicCalendarForm({...academicCalendarForm, startDate: e.target.value})} className="px-4 py-3 border rounded-lg" />
                  <input type="date" placeholder="Bitiş" value={academicCalendarForm.endDate} onChange={e => setAcademicCalendarForm({...academicCalendarForm, endDate: e.target.value})} className="px-4 py-3 border rounded-lg" />
                  <label className="flex items-center gap-2"><input type="checkbox" checked={academicCalendarForm.active} onChange={e => setAcademicCalendarForm({...academicCalendarForm, active: e.target.checked})} className="w-5 h-5" /><span>Aktif</span></label>
                  <button type="submit" className="md:col-span-2 flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"><Save size={18} /> Kaydet</button>
                </form>
              </div>
            )}
            {mainAcademicCalendar.length === 0 ? <p className="text-gray-500 text-center py-10">Henüz kayıt yok. Demo veriler seed ile eklenebilir.</p> : (
              <div className="space-y-3">
                {mainAcademicCalendar.map(item => (
                  <div key={item._id} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow">
                    <div className="bg-primary text-white px-3 py-2 rounded-lg text-center min-w-[60px]"><span className="text-sm font-bold block">{new Date(item.startDate).getDate()}</span><span className="text-xs">{new Date(item.startDate).toLocaleDateString('tr-TR', { month: 'short' })}</span></div>
                    <div className="flex-grow"><h4 className="font-semibold text-primary">{item.title}</h4><span className="text-xs text-gray-500">{new Date(item.startDate).toLocaleDateString('tr-TR')}{item.endDate ? ' - ' + new Date(item.endDate).toLocaleDateString('tr-TR') : ''}</span></div>
                    <span className="text-xs px-2 py-1 rounded bg-secondary/20 text-secondary">{item.type}</span>
                    <div className="flex gap-2">
                      <button onClick={() => editAcademicCalendar(item)} className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Edit size={18} /></button>
                      <button onClick={async () => { if(confirm('Silmek istediğinize emin misiniz?')) { await api.delete(`/main/admin/academic-calendar/${item._id}`); loadMainAcademicCalendar() }}} className="p-2 bg-red-100 text-red-600 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Etkinlikler */}
        {activeTab === 'main-events' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div><h2 className="text-2xl font-bold text-primary">Etkinlikler</h2><p className="text-gray-500 text-sm">Yaklaşan etkinlikleri yönetin</p></div>
              <button onClick={() => { setShowMainEventForm(true); setEditingEventId(null); setEventForm({ title: '', startDate: '', endDate: '', location: '', description: '', imageUrl: '', active: true }) }} className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition"><Plus size={18} /> Yeni Etkinlik</button>
            </div>
            {showMainEventForm && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-primary">{editingEventId ? 'Düzenle' : 'Yeni Etkinlik'}</h3><button onClick={() => setShowMainEventForm(false)} className="text-gray-400 hover:text-red-500"><X size={20} /></button></div>
                <form onSubmit={handleEventSubmit} className="space-y-4">
                  <input placeholder="Başlık *" required value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="datetime-local" placeholder="Başlangıç *" required value={eventForm.startDate} onChange={e => setEventForm({...eventForm, startDate: e.target.value})} className="px-4 py-3 border rounded-lg" />
                    <input type="datetime-local" placeholder="Bitiş" value={eventForm.endDate} onChange={e => setEventForm({...eventForm, endDate: e.target.value})} className="px-4 py-3 border rounded-lg" />
                  </div>
                  <input placeholder="Yer" value={eventForm.location} onChange={e => setEventForm({...eventForm, location: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                  <input type="url" placeholder="Görsel URL" value={eventForm.imageUrl} onChange={e => setEventForm({...eventForm, imageUrl: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                  <textarea placeholder="Açıklama" rows={4} value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                  <label className="flex items-center gap-2"><input type="checkbox" checked={eventForm.active} onChange={e => setEventForm({...eventForm, active: e.target.checked})} className="w-5 h-5" /><span>Aktif</span></label>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"><Save size={18} /> Kaydet</button>
                </form>
              </div>
            )}
            {mainEvents.length === 0 ? <p className="text-gray-500 text-center py-10">Henüz etkinlik eklenmemiş.</p> : (
              <div className="space-y-3">
                {mainEvents.map(item => (
                  <div key={item._id} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow">
                    {item.imageUrl ? <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-contain rounded-lg" /> : <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center"><Calendar size={24} className="text-gray-400" /></div>}
                    <div className="flex-grow"><h4 className="font-semibold text-primary">{item.title}</h4><span className="text-xs text-gray-500">{new Date(item.startDate).toLocaleDateString('tr-TR')}{item.location ? ' • ' + item.location : ''}</span></div>
                    <div className="flex gap-2">
                      <button onClick={() => editEvent(item)} className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Edit size={18} /></button>
                      <button onClick={async () => { if(confirm('Silmek istediğinize emin misiniz?')) { await api.delete(`/main/admin/events/${item._id}`); loadMainEvents() }}} className="p-2 bg-red-100 text-red-600 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SuperAdmin
