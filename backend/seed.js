import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Branch from './models/Branch.js'
import User from './models/User.js'
import Announcement from './models/Announcement.js'
import Slider from './models/Slider.js'
import News from './models/News.js'
import Video from './models/Video.js'
import { MainSlider, MainNews, MainGallery } from './models/MainContent.js'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '.env') })

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kavram_koleji'

async function seed() {
  await mongoose.connect(MONGO_URI)
  console.log('MongoDB bağlandı, seed başlıyor...')
  console.log('\n⚠️  UYARI: Bu komut TÜM verileri siler ve varsayılan verilerle değiştirir!')
  console.log('   - Super Admin panelinden yaptığınız değişiklikler (slider silme, haber düzenleme, kampüs fotoğrafları vb.) KAYBOLACAK')
  console.log('   - Sadece ilk kurulumda veya veritabanını sıfırlamak istediğinizde çalıştırın.\n')

  // Mevcut verileri temizle
  await Slider.deleteMany({})
  await News.deleteMany({})
  await Video.deleteMany({})
  await Branch.deleteMany({})
  await User.deleteMany({})
  await Announcement.deleteMany({})
  await MainSlider.deleteMany({})
  await MainNews.deleteMany({})
  await MainGallery.deleteMany({})

  // ===== ŞUBELER =====
  const branches = [
    {
      name: 'Adana Kavram Koleji',
      slug: 'adana',
      city: 'Adana',
      address: 'Öğretmenler bulvarı Real civarı 75545 sok. 19.noter yanı Seyhan/Adana',
      phone: '0322 248 78 78',
      email: 'adana@kavram.k12.tr',
      programs: ['Okul Öncesi', 'İlkokul', 'Ortaokul', 'Lise'],
      logo: '/branches/adana.jpeg',
      mapCoords: { lat: 36.9914, lng: 35.3308 },
      primaryColor: '#1e3a5f',
      secondaryColor: '#c8a45c'
    },
    {
      name: 'Ankara - Batıkent Kavram Koleji',
      slug: 'ankara-batikent',
      city: 'Ankara',
      address: 'İlkyerleşim Mah. 2005 Sokak No:3 Batıkent / Ankara',
      phone: '0541 386 05 25',
      phone2: 'Anaokulu - İlkokul - Ortaokul: (0312) 386 05 25',
      email: 'batikent@kavram.k12.tr',
      programs: ['Okul Öncesi', 'İlkokul', 'Ortaokul'],
      logo: '/branches/ankara-batikent.png',
      mapCoords: { lat: 39.9679, lng: 32.7294 },
      primaryColor: '#1e3a5f',
      secondaryColor: '#c8a45c'
    },
    {
      name: 'Ankara - Etimesgut Kavram Koleji',
      slug: 'ankara-etimesgut',
      city: 'Ankara',
      address: 'İstasyon mahallesi, Şehit Hikmet Özer caddesi 89/A, Etimesgut/Ankara',
      phone: '0506 331 23 78',
      email: 'etimesgut@kavram.k12.tr',
      programs: ['Lise'],
      logo: '/branches/ankara-etimesgut.jpg',
      mapCoords: { lat: 39.9465, lng: 32.6786 },
      primaryColor: '#1e3a5f',
      secondaryColor: '#c8a45c'
    },
    {
      name: 'Ankara - Keçiören Kavram Koleji',
      slug: 'ankara-kecioren',
      city: 'Ankara',
      address: 'Pınarbaşı Mah. Şehit Hakan Turan Cad. No: 24 Keçiören / Ankara',
      phone: '0 (312) 435 11 11',
      email: 'kecioren@kavram.k12.tr',
      programs: ['Ortaokul', 'Lise'],
      logo: '/branches/ankara-kecioren.jpg',
      mapCoords: { lat: 39.9902, lng: 32.8644 },
      primaryColor: '#1e3a5f',
      secondaryColor: '#c8a45c'
    },
    {
      name: 'Ankara - Öveçler Kavram Koleji',
      slug: 'ankara-ovecler',
      city: 'Ankara',
      address: 'Aşağı Öveçler Mah. 1324 Sok. No:7 Öveçler / Ankara',
      phone: '0 (312) 911 00 88',
      phone2: '0 (505) 990 00 88',
      email: 'ovecler@kavram.k12.tr',
      programs: ['İlkokul', 'Ortaokul'],
      logo: '/branches/ankara-ovecler.jpg',
      mapCoords: { lat: 39.8996, lng: 32.8597 },
      primaryColor: '#1e3a5f',
      secondaryColor: '#c8a45c'
    },
    {
      name: 'Ankara - Sincan Kavram Koleji',
      slug: 'ankara-sincan',
      city: 'Ankara',
      address: 'Plevne Mah. Pazar Cad. No:7 Sincan/Ankara',
      phone: '0 (554) 180 25 26',
      email: 'sincan@kavram.k12.tr',
      programs: ['Ortaokul', 'Lise'],
      logo: '/branches/ankara-sincan.jpg',
      mapCoords: { lat: 39.9697, lng: 32.5833 },
      primaryColor: '#1e3a5f',
      secondaryColor: '#c8a45c'
    },
    {
      name: 'Balıkesir - Bandırma Kavram Anadolu Lisesi',
      slug: 'bandirma',
      city: 'Balıkesir',
      address: 'İhsaniye Mah. Şehit Mehmet Gönenç Sok. No:7 Bandırma / Balıkesir',
      phone: '0 (266) 715 62 00',
      email: 'bandirma@kavram.k12.tr',
      programs: ['Lise'],
      logo: '/branches/bandirma.jpg',
      mapCoords: { lat: 40.35212667109922, lng: 27.9766878516669 },
      primaryColor: '#1e3a5f',
      secondaryColor: '#c8a45c'
    },
    {
      name: 'Gaziantep Kavram Fen Lisesi',
      slug: 'gaziantep',
      city: 'Gaziantep',
      address: 'Fatih Mah. Kamuran Yılmazer Cad. 22041 Nolu Sok. No:2 Şehitkamil / Gaziantep (Adliye Tramvay Son Durak Civarı - Bişirici Kebap Arkası)',
      phone: '0 (342) 321 89 00',
      email: 'gaziantep@kavram.k12.tr',
      programs: ['Ortaokul', 'Lise'],
      logo: '/branches/gaziantep.jpg',
      mapCoords: { lat: 37.0662, lng: 37.3833 },
      primaryColor: '#1e3a5f',
      secondaryColor: '#c8a45c'
    },
    {
      name: 'İstanbul - Esenyurt Kavram Koleji',
      slug: 'istanbul-esenyurt',
      city: 'İstanbul',
      address: 'Akşemsettin Mah. Okurlar Cad. 1255/B No:44 Esenyurt / İstanbul',
      phone: '0212 591 19 74',
      phone2: '0212 591 19 75',
      phone3: '0553 267 10 80',
      email: 'esenyurt@kavram.k12.tr',
      programs: ['Okul Öncesi', 'İlkokul', 'Ortaokul'],
      logo: '/branches/istanbul-esenyurt.jpg',
      mapCoords: { lat: 41.0351, lng: 28.6769 },
      primaryColor: '#1e3a5f',
      secondaryColor: '#c8a45c'
    },
    {
      name: 'İstanbul - Sancaktepe Kavram Anadolu Lisesi',
      slug: 'istanbul-sancaktepe',
      city: 'İstanbul',
      address: 'Sarıgazi Mah. Osman Gazi Cad. No: 6/8 Sancaktepe / İstanbul',
      phone: '0 (216) 622 22 03',
      email: 'sancaktepe@kavram.k12.tr',
      programs: ['Lise'],
      logo: '/branches/istanbul-sancaktepe.jpg',
      mapCoords: { lat: 41.0028, lng: 29.2314 },
      primaryColor: '#1e3a5f',
      secondaryColor: '#c8a45c'
    },
    {
      name: 'İstanbul - Soyak Yenişehir Kavram Kampüsü',
      slug: 'istanbul-soyak',
      city: 'İstanbul',
      address: 'Armağanevler Mah. 23 Nisan Cad. No:188/1 Ümraniye / İstanbul',
      phone: '0 (216) 534 00 20',
      email: 'soyak@kavram.k12.tr',
      programs: ['Okul Öncesi', 'Ortaokul', 'Lise'],
      logo: '/branches/istanbul-soyak.jpg',
      mapCoords: { lat: 41.0082, lng: 29.0877 },
      primaryColor: '#1e3a5f',
      secondaryColor: '#c8a45c'
    },
    {
      name: 'Mardin - Kızıltepe Kavram Anadolu Lisesi',
      slug: 'mardin-kiziltepe',
      city: 'Mardin',
      address: 'Koçhisar Mah. 321. Sok. No:12/1 Kızıltepe / Mardin',
      phone: '0541 312 04 64',
      email: 'kiziltepe@kavram.k12.tr',
      programs: ['Lise'],
      logo: '/branches/mardin-kiziltepe.jpg',
      mapCoords: { lat: 37.1939, lng: 40.5861 },
      primaryColor: '#1e3a5f',
      secondaryColor: '#c8a45c'
    },
    {
      name: 'Sivas Kavram Koleji',
      slug: 'sivas',
      city: 'Sivas',
      address: 'Gültepe Mah. Sultanşehir Cad. No:17 Merkez / Sivas',
      phone: '0 (346) 226 17 77',
      email: 'sivas@kavram.k12.tr',
      programs: ['Ortaokul', 'Lise'],
      logo: '/branches/sivas.jpg',
      mapCoords: { lat: 39.7477, lng: 37.0179 },
      primaryColor: '#1e3a5f',
      secondaryColor: '#c8a45c'
    }
  ]

  const createdBranches = await Branch.create(branches)
  console.log(`${createdBranches.length} şube oluşturuldu`)

  // ===== BANDIRMA SLIDER, HABER, VİDEO (Ana sayfa için) =====
  const bandirma = createdBranches.find(b => b.slug === 'bandirma')
  if (bandirma) {
    await Slider.create([
      { branch: bandirma._id, title: 'Kavram Koleji ile Geleceğe Hazırlanın', subtitle: 'Yarım Asrı Aşan Eğitim Tecrübesi', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&h=900&fit=crop', cta: 'Keşfet', link: '/hakkimizda', order: 1 },
      { branch: bandirma._id, title: 'Akademik Başarıda Lider Kurum', subtitle: 'YKS ve LGS\'de Üstün Başarı', image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&h=900&fit=crop', cta: 'Keşfet', link: '/akademik', order: 2 },
      { branch: bandirma._id, title: '2026-2027 Kayıtları Başladı', subtitle: 'Avantajlı Erken Kayıt Fırsatları', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&h=900&fit=crop', cta: 'Kayıt Ol', link: '/kayit', order: 3 },
    ])
    await News.create([
      { branch: bandirma._id, title: '2026-2027 Eğitim Öğretim Yılı Kayıtlarımız Başlamıştır!', excerpt: 'Erken kayıt avantajlarından yararlanmak için hemen iletişime geçin.', images: ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop'], category: 'Duyuru', day: '01', month: 'Mart', year: '2026' },
      { branch: bandirma._id, title: 'Akademik Başarılarımız', excerpt: 'Öğrencilerimiz YKS ve LGS\'de üstün başarılar elde etti.', images: ['https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop'], category: 'Başarı', day: '15', month: 'Şubat', year: '2026' },
      { branch: bandirma._id, title: 'Kampüs Tanıtım Günleri', excerpt: 'Okulumuzu yerinde görmek için randevu alabilirsiniz.', images: ['https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop'], category: 'Etkinlik', day: '20', month: 'Şubat', year: '2026' },
    ])
    await Video.create([
      { branch: bandirma._id, title: 'Kavram Koleji Tanıtım', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    ])
    console.log('Bandırma slider, haber ve video eklendi')
  }

  // ===== SUPER ADMIN =====
  await User.create({
    username: 'superadmin',
    password: 'kavram2026',
    role: 'super_admin',
    name: 'Kavram Yönetici'
  })

  // ===== ŞUBE ADMİNLERİ =====
  const adminCredentials = [
    { slug: 'adana', username: 'adana.admin', password: 'kavram.adana2026' },
    { slug: 'ankara-batikent', username: 'batikent.admin', password: 'kavram.batikent2026' },
    { slug: 'ankara-etimesgut', username: 'etimesgut.admin', password: 'kavram.etimesgut2026' },
    { slug: 'ankara-kecioren', username: 'kecioren.admin', password: 'kavram.kecioren2026' },
    { slug: 'ankara-ovecler', username: 'ovecler.admin', password: 'kavram.ovecler2026' },
    { slug: 'ankara-sincan', username: 'sincan.admin', password: 'kavram.sincan2026' },
    { slug: 'bandirma', username: 'bandirma.admin', password: 'kavram.bandirma2026' },
    { slug: 'gaziantep', username: 'gaziantep.admin', password: 'kavram.gaziantep2026' },
    { slug: 'istanbul-esenyurt', username: 'esenyurt.admin', password: 'kavram.esenyurt2026' },
    { slug: 'istanbul-sancaktepe', username: 'sancaktepe.admin', password: 'kavram.sancaktepe2026' },
    { slug: 'istanbul-soyak', username: 'soyak.admin', password: 'kavram.soyak2026' },
    { slug: 'mardin-kiziltepe', username: 'kiziltepe.admin', password: 'kavram.kiziltepe2026' },
    { slug: 'sivas', username: 'sivas.admin', password: 'kavram.sivas2026' }
  ]

  for (const cred of adminCredentials) {
    const branch = createdBranches.find(b => b.slug === cred.slug)
    if (branch) {
      await User.create({
        username: cred.username,
        password: cred.password,
        role: 'branch_admin',
        branch: branch._id,
        name: `${branch.name} Admin`
      })
    }
  }
  console.log(`${adminCredentials.length} şube admini oluşturuldu`)

  // ===== DUYURULAR =====
  for (const branch of createdBranches) {
    await Announcement.create([
      { branch: branch._id, text: '2025-2026 Eğitim Öğretim Yılı Kayıtlarımız Başlamıştır!', active: true },
      { branch: branch._id, text: 'Yaz okulu kayıtlarımız devam etmektedir.', active: true },
    ])
  }

  // ===== ANA SİTE SLIDER =====
  await MainSlider.create([
    {
      title: 'Kavram Koleji ile Geleceğe Hazırlanın',
      subtitle: 'Yarım Asrı Aşan Eğitim Tecrübesi',
      image: 'https://images.unsplash.com/photo-1434030216415-6bf8185ea1e3?w=1600&h=900&fit=crop',
      link: '/kampusler',
      order: 1,
      active: true
    },
    {
      title: 'Akademik Başarıda Lider Kurum',
      subtitle: 'YKS ve LGS\'de Üstün Başarı',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&h=900&fit=crop',
      link: '/basarilarimiz',
      order: 2,
      active: true
    },
    {
      title: '2026-2027 Kayıtları Başladı',
      subtitle: 'Avantajlı Erken Kayıt Fırsatları',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&h=900&fit=crop',
      link: '/kayit',
      order: 3,
      active: true
    }
  ])

  // ===== ANA SİTE HABERLER =====
  await MainNews.create([
    {
      title: 'Kavram Eğitim Kurumları ile Akbank arasında kurumsal eğitim işbirliği protokolü imzalandı',
      slug: 'kavram-akbank-isbirligi-protokolu',
      excerpt: 'Bu kapsamda, Akbank çalışanları, yakınları ve emeklileri; Türkiye genelindeki tüm Kavram Koleji ve Kavram Kurs Merkezlerinde %20 eğitim indirimi avantajından yararlanabilecek.',
      content: 'Kavram Eğitim Kurumları olarak, güçlü kurumlarla gerçekleştirdiğimiz işbirlikleriyle daha fazla öğrenciye nitelikli eğitim fırsatı sunmaya devam ediyoruz.\n\nBu kapsamda, Akbank çalışanları, yakınları ve emeklileri; Türkiye genelindeki tüm Kavram Koleji ve Kavram Kurs Merkezlerinde %20 eğitim indirimi avantajından yararlanabilecek.',
      images: ['https://kavram.ventedu.com/storage/news_gallery/872804493543080468/file_1773315695_cg7.jpeg'],
      category: 'İşbirliği',
      day: '12', month: 'Mart', year: '2026',
      featured: true, active: true
    },
    {
      title: 'Kavram Kampüsleri Liseler Arası Debate Sahnesi Açılıyor!',
      slug: 'kavram-liseler-arasi-debate',
      excerpt: 'Teknoloji bizi daha mı sosyal yapıyor? Yoksa fark etmeden yalnızlaştırıyor mu?',
      content: 'Teknoloji bizi daha mı sosyal yapıyor? Yoksa fark etmeden yalnızlaştırıyor mu? Hazır mısınız? Çünkü bu tartışma sessiz geçmeyecek.\n\nKonu: "Technology makes us more social" — Kavram Kampüsleri Liseler Arası Debate Turnuvası başlıyor!',
      images: ['https://kavram.ventedu.com/storage/news_gallery/866577192534937566/file_1771830990_sr.jpeg'],
      category: 'Etkinlik',
      day: '23', month: 'Şubat', year: '2026',
      featured: false, active: true
    },
    {
      title: 'Geleceğin Eğitim Mirasını Birlikte İnşa Edelim',
      slug: 'gelecegin-egitim-mirasi',
      excerpt: 'Kavram Kurumları olarak, yarım asrı aşan akademik birikimimizi vizyoner profesyonellerle bir üst seviyeye taşımayı hedefliyoruz.',
      content: 'Kavram Kurumları olarak, yarım asrı aşan akademik birikimimizi, eğitimin gücüne inanan vizyoner profesyonellerle bir üst seviyeye taşımayı hedefliyoruz.\n\n2026-2027 eğitim öğretim yılı için franchise başvuruları açılmıştır.',
      images: ['https://kavram.ventedu.com/storage/news_gallery/864765867198515778/file_1771399137_srjx.jpeg'],
      category: 'Duyuru',
      day: '18', month: 'Şubat', year: '2026',
      featured: false, active: true
    },
    {
      title: '2026 YKS KILAVUZU',
      slug: '2026-yks-kilavuzu',
      excerpt: 'ÖSYM tarafından yayımlanan 2026 YKS Kılavuzu, üniversiteye giriş sürecinin tüm aşamalarını detaylı şekilde açıklamaktadır.',
      content: '2026 YKS Kılavuzu Özet Rehberi (ÖSYM Resmi Bilgileri)\n\nÖSYM tarafından yayımlanan 2026 YKS Kılavuzu, üniversiteye giriş sürecinin tüm aşamalarını detaylı şekilde açıklamaktadır.',
      images: ['https://kavram.ventedu.com/storage/news_gallery/864762195018256120/file_1771398261_xh8.jpg'],
      category: 'Akademik',
      day: '18', month: 'Şubat', year: '2026',
      featured: false, active: true
    },
    {
      title: '2026 LGS Sınav Tarihi Açıklandı',
      slug: '2026-lgs-sinav-tarihi',
      excerpt: 'Milli Eğitim Bakanlığı, 2026 LGS sınav tarihini açıkladı.',
      content: 'Milli Eğitim Bakanlığı, 2026 LGS sınav tarihini açıkladı.\n\nSınav 14 Haziran 2026 tarihinde yapılacak. Öğrencilerimize başarılar diliyoruz.',
      images: ['https://kavram.ventedu.com/storage/news_gallery/827562044776515786/file_1762547054_zqfx.jpg'],
      category: 'Akademik',
      day: '07', month: 'Kasım', year: '2025',
      featured: false, active: true
    },
    {
      title: 'Kavram Eğitim Kurumları Akademik Kurul Toplantısı',
      slug: 'kavram-akademik-kurul-toplantisi',
      excerpt: 'Kavram Eğitim Kurumları Akademik Kurul Toplantısı gerçekleştirildi.',
      content: 'Kavram Eğitim Kurumları Akademik Kurul Toplantısı gerçekleştirildi.\n\nYeni eğitim öğretim yılı planlamaları yapıldı ve akademik hedefler belirlendi.',
      images: ['https://kavram.ventedu.com/storage/news_gallery/804612003359359314/file_1757079363_4fxw.jpg'],
      category: 'Kurumsal',
      day: '05', month: 'Eylül', year: '2025',
      featured: false, active: true
    },
    {
      title: 'Yeni Döneme Hazırlıklarımız Tam Gaz Devam Ediyor!',
      slug: 'yeni-donem-hazirliklari',
      excerpt: 'Kavram Koleji olarak yeni eğitim öğretim yılına hazırlıklarımız tam gaz devam ediyor.',
      content: 'Kavram Koleji olarak yeni eğitim öğretim yılına hazırlıklarımız tam gaz devam ediyor.\n\nKampüslerimizde yenilikler ve iyileştirmeler yapılmaktadır.',
      images: ['https://kavram.ventedu.com/storage/news_gallery/790497390602751786/file_1753710152_r2tr.jpg'],
      category: 'Duyuru',
      day: '28', month: 'Temmuz', year: '2025',
      featured: false, active: true
    }
  ])

  // ===== ANA SİTE GALERİ =====
  await MainGallery.create([
    { src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop', title: 'Kampüs Görünümü', category: 'Kampüs', active: true },
    { src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop', title: 'Mezuniyet Töreni', category: 'Etkinlik', active: true },
    { src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop', title: 'Öğrenci Çalışması', category: 'Akademik', active: true },
    { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop', title: 'Sınıf Ortamı', category: 'Akademik', active: true },
  ])

  console.log('Seed tamamlandı!')
  console.log('\n===== GİRİŞ BİLGİLERİ =====')
  console.log('Super Admin → username: superadmin, password: kavram2026')
  console.log('\nŞube Adminleri:')
  adminCredentials.forEach(c => {
    console.log(`${c.slug} → username: ${c.username}, password: ${c.password}`)
  })
  
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
