import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { BranchProvider } from './context/BranchContext'
import { NewsProvider } from './context/NewsContext'
import { SliderProvider } from './context/SliderContext'
import { MessagesProvider } from './context/MessagesContext'
import { GalleryProvider } from './context/GalleryContext'
import { VideoProvider } from './context/VideoContext'
import { AnnouncementProvider } from './context/AnnouncementContext'
import MainSite from './pages/MainSite'
import BranchSite from './pages/BranchSite'
import Login from './pages/Login'
import SuperAdmin from './pages/SuperAdmin'
import Kampusler from './pages/main/Kampusler'
import Haberler from './pages/main/Haberler'
import HaberDetay from './pages/main/HaberDetay'
import Basarilarimiz from './pages/main/Basarilarimiz'
import MainGaleri from './pages/main/MainGaleri'
import MainIletisim from './pages/main/MainIletisim'
import Franchise from './pages/main/Franchise'
import InsanKaynaklari from './pages/main/InsanKaynaklari'
import MainKayit from './pages/main/MainKayit'
import KVKK from './pages/main/KVKK'
import KursMerkezleri from './pages/main/KursMerkezleri'
import Egitim from './pages/main/Egitim'

function App() {
  return (
    <AuthProvider>
      <BranchProvider>
        <NewsProvider>
          <SliderProvider>
            <MessagesProvider>
              <GalleryProvider>
                <VideoProvider>
                  <AnnouncementProvider>
                    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                      <Routes>
                        <Route path="/" element={<MainSite />} />
                        <Route path="/kampusler" element={<Kampusler />} />
                        <Route path="/haberler" element={<Haberler />} />
                        <Route path="/haberler/:slug" element={<HaberDetay />} />
                        <Route path="/basarilarimiz" element={<Basarilarimiz />} />
                        <Route path="/galeri" element={<MainGaleri />} />
                        <Route path="/iletisim" element={<MainIletisim />} />
                        <Route path="/franchise" element={<Franchise />} />
                        <Route path="/franchise/okul" element={<Franchise />} />
                        <Route path="/franchise/kurs" element={<Franchise />} />
                        <Route path="/insan-kaynaklari" element={<InsanKaynaklari />} />
                        <Route path="/kayit" element={<MainKayit />} />
                        <Route path="/kvkk" element={<KVKK />} />
                        <Route path="/kurs-merkezleri" element={<KursMerkezleri />} />
                        <Route path="/egitim" element={<Egitim />} />
                        <Route path="/giris" element={<Login />} />
                        <Route path="/super-admin" element={<SuperAdmin />} />
                        <Route path="/:branchSlug/*" element={<BranchSite />} />
                      </Routes>
                    </Router>
                  </AnnouncementProvider>
                </VideoProvider>
              </GalleryProvider>
            </MessagesProvider>
          </SliderProvider>
        </NewsProvider>
      </BranchProvider>
    </AuthProvider>
  )
}

export default App
