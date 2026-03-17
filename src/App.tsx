import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
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
import Tarihcemiz from './pages/main/Tarihcemiz'
import YonetimKadrosu from './pages/main/YonetimKadrosu'
import KurumsalKimlik from './pages/main/KurumsalKimlik'
import EgitimAnaokulu from './pages/main/EgitimAnaokulu'
import EgitimIlkokul from './pages/main/EgitimIlkokul'
import EgitimOrtaokul from './pages/main/EgitimOrtaokul'
import EgitimLise from './pages/main/EgitimLise'
import MisyonVizyon from './pages/main/MisyonVizyon'
import AkademikTakvim from './pages/main/AkademikTakvim'
import Etkinlikler from './pages/main/Etkinlikler'
import Duyurular from './pages/main/Duyurular'
import Mezunlar from './pages/main/Mezunlar'
import SiteHaritasi from './pages/main/SiteHaritasi'
import BilgiEdinme from './pages/main/BilgiEdinme'
import Randevu from './pages/main/Randevu'
import Erisilebilirlik from './pages/main/Erisilebilirlik'
import Kalite from './pages/main/Kalite'
import SSS from './pages/main/SSS'
import AdayTercihRehberi from './pages/main/AdayTercihRehberi'

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
                      <ScrollToTop />
                      <Routes>
                        <Route path="/" element={<MainSite />} />
                        <Route path="/kampusler" element={<Kampusler />} />
                        <Route path="/kampuslerimiz" element={<Kampusler />} />
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
                        <Route path="/kavrama-kayit" element={<MainKayit />} />
                        <Route path="/kvkk" element={<KVKK />} />
                        <Route path="/kurs-merkezleri" element={<KursMerkezleri />} />
                        <Route path="/egitim" element={<Egitim />} />
                        <Route path="/egitim/anaokulu" element={<EgitimAnaokulu />} />
                        <Route path="/egitim/ilkokul" element={<EgitimIlkokul />} />
                        <Route path="/egitim/ortaokul" element={<EgitimOrtaokul />} />
                        <Route path="/egitim/lise" element={<EgitimLise />} />
                        <Route path="/tarihcemiz" element={<Tarihcemiz />} />
                        <Route path="/yonetim-kadrosu" element={<YonetimKadrosu />} />
                        <Route path="/kurumsal-kimlik" element={<KurumsalKimlik />} />
                        <Route path="/misyon-vizyon" element={<MisyonVizyon />} />
                        <Route path="/akademik-takvim" element={<AkademikTakvim />} />
                        <Route path="/etkinlikler" element={<Etkinlikler />} />
                        <Route path="/etkinlikler/:id" element={<Etkinlikler />} />
                        <Route path="/duyurular" element={<Duyurular />} />
                        <Route path="/mezunlar" element={<Mezunlar />} />
                        <Route path="/site-haritasi" element={<SiteHaritasi />} />
                        <Route path="/bilgi-edinme" element={<BilgiEdinme />} />
                        <Route path="/randevu" element={<Randevu />} />
                        <Route path="/erisilebilirlik" element={<Erisilebilirlik />} />
                        <Route path="/kalite" element={<Kalite />} />
                        <Route path="/sss" element={<SSS />} />
                        <Route path="/aday-ogrenci" element={<AdayTercihRehberi />} />
                        <Route path="/tercih-rehberi" element={<AdayTercihRehberi />} />
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
