import { useEffect } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import { useBranch } from '../context/BranchContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FloatingContact from '../components/FloatingContact'
import CallbackPopup from '../components/CallbackPopup'
import AnnouncementBar from '../components/AnnouncementBar'
import Home from './Home'
import About from './About'
import Academics from './Academics'
import News from './News'
import NewsDetail from './NewsDetail'
import Contact from './Contact'
import Gallery from './Gallery'
import Registration from './Registration'
import Admin from './Admin'

const BranchSite = () => {
  const { branchSlug: paramSlug } = useParams()
  const { branch, loading, error, setBranchBySlug } = useBranch()

  useEffect(() => {
    if (paramSlug) setBranchBySlug(paramSlug)
  }, [paramSlug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error || !branch) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Şube Bulunamadı</h1>
          <p className="text-gray-500">Bu adrese ait bir şube bulunmamaktadır.</p>
          <a href="/" className="mt-4 inline-block text-secondary hover:text-primary">Ana Sayfaya Dön</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hakkimizda" element={<About />} />
          <Route path="/akademik" element={<Academics />} />
          <Route path="/haberler" element={<News />} />
          <Route path="/haberler/:id" element={<NewsDetail />} />
          <Route path="/galeri" element={<Gallery />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/kayit" element={<Registration />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
      <FloatingContact />
      <CallbackPopup />
    </div>
  )
}

export default BranchSite
