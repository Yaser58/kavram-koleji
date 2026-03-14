import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Star, BookOpen, Users, Target, Monitor, Award, Clock, FileText, Video, CheckCircle, GraduationCap, BarChart3, ClipboardCheck, Layers, UserCheck, Calendar, Baby, School } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const menuItems = [
  { id: 'sistem', label: 'Kurs Merkezi Eğitim Sistemi', icon: BookOpen },
  { id: 'rehberlik', label: 'Veri Temelli Rehberlik Sistemi', icon: Users },
  { id: 'performans', label: 'Akademik Performans Takibi', icon: BarChart3 },
  { id: 'olcme', label: 'Nitelikli Ölçme ve Değerlendirme', icon: ClipboardCheck },
  { id: 'yayin', label: 'Güncel Yayın Paketi', icon: Layers },
  { id: 'dijital', label: 'Dijital Destekli Eğitim Programı', icon: Monitor },
  { id: 'kadro', label: 'Alanında Uzman Eğitim Kadrosu', icon: UserCheck },
  { id: 'etut', label: 'Etüt ve Ofis Soru Çözüm Saatleri', icon: Clock },
]

const Egitim = () => {
  const [activeSection, setActiveSection] = useState('sistem')

  return (
    <MainWrapper>
      <PageBanner 
        title="Kurs Merkezi Eğitim Sistemi" 
        breadcrumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'Eğitim' }, { label: 'Kurs Merkezi Eğitim Sistemi' }]} 
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Eğitim Kademeleri - Kavram Koleji */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 mb-12 border border-gray-100">
            <h3 className="text-xl font-bold text-primary mb-4">Kavram Koleji Eğitim Kademeleri</h3>
            <p className="text-gray-600 text-sm mb-6">Anaokulundan liseye kadar her kademede kaliteli eğitim sunuyoruz.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/egitim/anaokulu" className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md hover:border-secondary/30 border border-transparent transition group">
                <Baby size={28} className="text-secondary" />
                <div><span className="font-semibold text-primary group-hover:text-secondary transition">Anaokulu</span><p className="text-xs text-gray-500">3-6 yaş</p></div>
              </Link>
              <Link to="/egitim/ilkokul" className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md hover:border-secondary/30 border border-transparent transition group">
                <BookOpen size={28} className="text-secondary" />
                <div><span className="font-semibold text-primary group-hover:text-secondary transition">İlkokul</span><p className="text-xs text-gray-500">1-4. sınıf</p></div>
              </Link>
              <Link to="/egitim/ortaokul" className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md hover:border-secondary/30 border border-transparent transition group">
                <School size={28} className="text-secondary" />
                <div><span className="font-semibold text-primary group-hover:text-secondary transition">Ortaokul</span><p className="text-xs text-gray-500">5-8. sınıf</p></div>
              </Link>
              <Link to="/egitim/lise" className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md hover:border-secondary/30 border border-transparent transition group">
                <GraduationCap size={28} className="text-secondary" />
                <div><span className="font-semibold text-primary group-hover:text-secondary transition">Lise</span><p className="text-xs text-gray-500">9-12. sınıf</p></div>
              </Link>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Hero Section */}
              <div className="flex flex-col md:flex-row gap-8 mb-12">
                <div className="md:w-1/2">
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Kavram Kurs Merkezleri Eğitim Sistemi, güçlü iletişim ve akademik iş birliği ile her öğrencisini başarıya taşır.
                  </p>
                  <img src="/egitim-sistemi.jpg" alt="Kavram Eğitim Sistemi" className="w-full rounded-2xl shadow-lg" />
                </div>
                <div className="md:w-1/2">
                  {/* Sinav Kazandiran Section */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                    <h3 className="text-purple-600 font-bold text-sm mb-2">SINAV KAZANDIRAN EĞİTİM ANLAYIŞI</h3>
                    <h4 className="text-xl font-bold text-gray-800 mb-4">VERİ TEMELLİ REHBERLİK ANLAYIŞI</h4>
                    <p className="text-gray-600 text-sm mb-6">
                      Kavram Eğitim Kurumları ve Kurs Merkezlerinde, kişiye özgü gelişimsel ve kariyer odaklı rehberlik yaklaşımı ile sınavlara sınav kaygısı yaşamadan hazırlanılır.
                    </p>
                    
                    <h4 className="text-lg font-bold text-gray-800 mb-2">AKADEMİK PERFORMANS TAKİBİ</h4>
                    <p className="text-gray-600 text-sm mb-6">
                      Ayrıntılı konu ve kazanım analizleriyle öğrencilerin en küçük öğrenme parçası ile ilgili akademik performansları tespit edilir ve kazanım eksiği tamamlama programıyla giderilir.
                    </p>

                    <h4 className="text-lg font-bold text-gray-800 mb-2">NİTELİKLİ ÖLÇME DEĞERLENDİRME</h4>
                    <p className="text-gray-600 text-sm mb-6">
                      Her öğrenciye özel sınav sonuç karnesi ile, konu kazanım performansı ayrıntılı bir şekilde raporlanır. Öğrencimiz akademik gelişimini gözlemleyerek öğrenme sürecini bilinçli bir şekilde sürdürür.
                    </p>

                    <h4 className="text-lg font-bold text-gray-800 mb-3">GÜNCEL YAYIN PAKETİ</h4>
                    <div className="space-y-2">
                      {['Konu Anlatım Kitapları', 'Soru Bankaları', 'Deneme Sınavları', 'Yaprak Testler', 'Akıllı Defterler'].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                          <Star size={14} className="text-purple-500" /> {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dijital Destekli Section */}
              <div className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">DİJİTAL DESTEKLİ EĞİTİM PROGRAMI</h3>
                <p className="text-gray-600 leading-relaxed">
                  Akademik derslerin konu anlatımları görsel, animasyon ve videolarla desteklenerek görsel ve işitsel öğrenme kolaylaşır. Örnek soru çözümlerinin bulunduğu akıllı tahtalarımızla öğrencinin derse aktif katılımı sağlanır. Öğrencilerin kullandığı dijital öğrenme otomasyon sistemiyle de akademik ders durumlarının takibi yapılır.
                </p>
              </div>

              {/* Veri Temelli Rehberlik */}
              <div id="rehberlik" className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-8 mb-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Veri Temelli Rehberlik Sistemi</h3>
                <p className="text-white/90 mb-6">
                  Kavram Kurs Merkezlerinin kişiye özgü gelişimsel ve kariyer odaklı rehberlik anlayışıyla öğrenciler sınavlara sınav kaygısı yaşamadan hazırlanırlar. Her öğrencinin "Danışman Öğretmeni" sınavlara hazırlık sürecinde öğrencinin en yakın yol arkadaşıdır.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/10 rounded-xl p-5">
                    <h4 className="font-bold mb-3 flex items-center gap-2"><Users size={20} /> DANIŞMAN ÖĞRETMENLİK</h4>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Bireysel Akademik Takip Sistemi</li>
                      <li>• Nitelikli ve Yönlendirici Geri bildirim</li>
                      <li>• Sosyal Aktivite Programları</li>
                      <li>• Düzenli Veli Bilgilendirme Görüşmeleri</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 rounded-xl p-5">
                    <h4 className="font-bold mb-3 flex items-center gap-2"><Target size={20} /> VERİ TEMELLİ REHBERLİK</h4>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Kişiye Özgü Akademik Destek Programı</li>
                      <li>• Kariyer Odaklı Rehberlik Anlayışı</li>
                      <li>• Yurt içi ve Yurt Dışı Eğitim Danışmanlığı</li>
                      <li>• Tercih Danışmanlığı</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 rounded-xl p-5">
                    <h4 className="font-bold mb-3 flex items-center gap-2"><Calendar size={20} /> AKADEMİK TAKVİM</h4>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Ortak Sınav Takvimi</li>
                      <li>• Türkiye Geneli Değerlendirme</li>
                      <li>• Akademik Gelişim Kampları</li>
                      <li>• Analizlerle Akademik Performans Takibi</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Akademik Performans Takibi */}
              <div id="performans" className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Analizlerle Akademik Performans Takibi</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ayrıntılı konu ve kazanım analizleriyle öğrencilerin en küçük öğrenme parçası ile ilgili akademik performansları tespit edilir ve kazanım eksiği tamamlama programıyla giderilir.
                </p>
              </div>

              {/* Nitelikli Ölçme Değerlendirme */}
              <div id="olcme" className="bg-gray-50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Nitelikli Ölçme ve Değerlendirme</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Her öğrenciye özel sınav sonuç karnesi ile konu kazanım performansı ayrıntılı bir şekilde raporlanır. Öğrencimiz akademik gelişimini gözlemleyerek öğrenme sürecini bilinçli bir şekilde sürdürür.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-bold text-purple-600 mb-3 flex items-center gap-2"><FileText size={20} /> DENEME SINAVLARI</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Deneme sınavları Tüm Kavram Kurs Merkezlerinde aynı gün ve aynı saatte uygulanır. Sınavlar, birlikte değerlendirilir ve sonuçları ilan edilir.
                    </p>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-purple-700 mb-2">SINAV SONUÇ KARNESİNDE:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Sınıf, Kurs Merkezi, İl ve Türkiye Geneli Başarı Sırası</li>
                        <li>• Doğru, Yanlış ve Boş Bıraktığı Sorular</li>
                        <li>• Öğrenci Neti, Sınıf Ortalaması, Genel Ortalama</li>
                        <li>• Soruların Konu / Kazanımları</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-bold text-purple-600 mb-3 flex items-center gap-2"><Video size={20} /> VİDEO ÇÖZÜMLÜ SORU BANKALARI</h4>
                    <p className="text-gray-600 text-sm">
                      Kavram Kurs Merkezlerinde kullanılan soru bankalarının video çözümlerine öğrenciler akıllı telefon uygulaması ile ulaşır. Öğrencilerimiz isterlerse soru bankalarındaki soruların çözümü için akıllı telefon uygulamasındaki optik formu kullanır.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm md:col-span-2">
                    <h4 className="font-bold text-purple-600 mb-3 flex items-center gap-2"><Monitor size={20} /> AKILLI SINAVLAR</h4>
                    <p className="text-gray-600 text-sm">
                      Öğrencilerimiz öğretmenlerinin denetiminde dijital platformda yer alan yayınlardan belirlenen konu/kazanım ile akıllı sınava girerek akademik performansını değerlendirebilir. Bu uygulamadan öğrencilerimiz danışman öğretmen ve ders öğretmeni aracılığı ile yararlanabilir.
                    </p>
                  </div>
                </div>
              </div>

              {/* Güncel Yayın Paketleri */}
              <div id="yayin" className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Güncel Yayın Paketleriyle Yüksek Akademik Performans</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  1974 yılından başlayan yayın deneyimini güncel içerik ve sorularla buluşturan Kavram Yayınlarıyla sınav hazırlığında ve sınav başarısında öğrencilerimize destek oluyoruz. Kavram Yayınları, yıl boyunca kullanılacak özgün ve zengin içeriklere sahip konu anlatımlı yayınlar, soru bankaları, konu kavrama testleri ve deneme sınavları ile öğrencilerini sınavlarda başarıya hazırlar.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <BookOpen size={40} className="mx-auto text-purple-600 mb-4" />
                    <h4 className="font-bold text-gray-800 mb-2">KONU ANLATIM KİTAPLARI</h4>
                    <p className="text-gray-600 text-sm">Kavram Yayınları öğrencilerin öğrenme süreçlerini kolaylaştırmak için konuları konu anlatım föylerine bölerek sunar.</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                    <FileText size={40} className="mx-auto text-blue-600 mb-4" />
                    <h4 className="font-bold text-gray-800 mb-2">SORU BANKALARI</h4>
                    <p className="text-gray-600 text-sm">Dijital platformda yer alan yayınlardan belirlenen konu/kazanım ile akıllı sınava girerek akademik performans değerlendirmesi.</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <ClipboardCheck size={40} className="mx-auto text-green-600 mb-4" />
                    <h4 className="font-bold text-gray-800 mb-2">TESTLER</h4>
                    <p className="text-gray-600 text-sm">Yaprak testleri ile öğrenciler anlık öğrenme heyecanını kaybetmeden akademik performansları hakkında bilgi sahibi olurlar.</p>
                  </div>
                </div>
              </div>

              {/* Dijital Destekli Eğitim */}
              <div id="dijital" className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Dijital Destekli Eğitim Programı</h3>
                <p className="text-white/90 leading-relaxed">
                  Akademik derslerin konu anlatımları görsel, animasyon ve videolarla desteklenerek görsel ve işitsel öğrenme kolaylaşır. Örnek soru çözümlerinin bulunduğu akıllı tahtalarımızla öğrencinin derse aktif katılımı sağlanır. Öğrencilerin kullandığı dijital öğrenme otomasyon sistemiyle de akademik ders durumlarının takibi yapılır.
                </p>
              </div>

              {/* Alanında Uzman Eğitim Kadrosu */}
              <div id="kadro" className="bg-white rounded-2xl shadow-md p-8 mb-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Alanında Uzman Eğitim Kadrosu</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Kavram Kurs Merkezlerinde öğretmenler mesleklerinin gerektirdiği bilgi, deneyim ve heyecana sahiptir. Dersler, deneyimli ve alanında uzman eğitmenler eşliğinde, her öğrenciye bire bir ilgi gösterilerek verilmektedir. Öğrencinin performansı doğrultusunda özel yönlendirmelerle başarıya ulaşması sağlanır.
                </p>
                <div className="bg-purple-50 rounded-xl p-6">
                  <h4 className="font-bold text-purple-700 mb-3">DERS İÇERİKLERİ</h4>
                  <p className="text-gray-600 text-sm">
                    Kavram Kurs Merkezlerinde dersler her sınıf düzeyinin belirlenmiş akademik hedefleri doğrultusunda işlenir. 8, 12 ve mezun gruplarında akademik program sınavlara hazırlık ağırlıklıdır. Ara sınıflarda ise dersler, okul derslerini takviye ve sınava hazırlık için iyi bir temel oluşturma amaçlıdır. Konu anlatımları örnek sorularla, etkinliklerle ve yaprak testlerle desteklenerek yapılır.
                  </p>
                </div>
              </div>

              {/* Etüt ve Ofis Soru Çözüm */}
              <div id="etut" className="bg-gray-50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Etüt ve Ofis Soru Çözüm Saatleri</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Kavram Kurs Merkezlerinde öğretmenler mesleklerinin gerektirdiği bilgi, deneyim ve heyecana sahiptir. Dersler, deneyimli ve alanında uzman eğitmenler eşliğinde, her öğrenciye bire bir ilgi gösterilerek verilmektedir.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-bold text-purple-600 mb-3 flex items-center gap-2"><Clock size={20} /> GENEL ETÜTLER</h4>
                    <p className="text-gray-600 text-sm">Haftalık akademik programda yer alan konularla ilgili her hafta etüt programı düzenlenir.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-bold text-purple-600 mb-3 flex items-center gap-2"><GraduationCap size={20} /> OKUL DERSLERİNE DESTEK</h4>
                    <p className="text-gray-600 text-sm">Öğrencilerimiz yazılı sınavlarından iki hafta önce yazılı konularıyla birlikte rehber öğretmenlerine başvurarak, organize edilen yazılıya hazırlık çalışmalarına katılabilirler.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-bold text-purple-600 mb-3 flex items-center gap-2"><Calendar size={20} /> RANDEVULU ETÜTLER</h4>
                    <p className="text-gray-600 text-sm">Randevulu etütlerde öğrencilerimiz kendilerini yetersiz hissettikleri konuları kurs yöneticilerine iletir. Öğrencilerden gelen talepler doğrultusunda etütlerin yer ve saati belirlenerek öğrencilere duyurulur.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-bold text-purple-600 mb-3 flex items-center gap-2"><CheckCircle size={20} /> SORU ÇÖZÜM OFİSLERİ</h4>
                    <p className="text-gray-600 text-sm">Haftalık olarak kurs kütüphanesinde ve etüt sınıflarında yapılan soru çözüm ofisleri ile öğrencilerimiz çözemedikleri soruları öğretmenlerine sorarak soru çözme pratiğini geliştirir, bilgi eksiklerini kapatır.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24 border border-gray-100">
                <h3 className="text-lg font-bold text-purple-600 mb-4 pb-3 border-b border-gray-100">Kavram'da Eğitim</h3>
                <nav className="space-y-1">
                  {menuItems.map(item => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setActiveSection(item.id)}
                      className={`flex items-center justify-between py-3 px-3 rounded-lg text-sm transition group ${activeSection === item.id ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <span className="flex items-center gap-2">
                        <item.icon size={16} />
                        {item.label}
                      </span>
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-purple-500 transition" />
                    </a>
                  ))}
                </nav>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Link to="/kurs-merkezleri" className="block w-full text-center bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition">
                    Kurs Merkezlerimiz
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default Egitim
