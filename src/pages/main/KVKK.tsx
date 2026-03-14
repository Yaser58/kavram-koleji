import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

const KVKK = () => {
  return (
    <MainWrapper>
      <PageBanner title="KVKK Aydınlatma Metni" breadcrumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'KVKK' }]} />
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-bold text-primary mb-4">Kişisel Verilerin Korunması Hakkında Aydınlatma Metni</h2>
            <div className="text-gray-600 leading-relaxed space-y-4 text-sm">
              <p>Kavram Eğitim Kurumları olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, kişisel verilerinizin güvenliğine büyük önem vermekteyiz.</p>
              <p>Bu aydınlatma metni, web sitemizi ziyaret eden ve hizmetlerimizden yararlanan kişilerin kişisel verilerinin işlenmesine ilişkin bilgilendirme amacıyla hazırlanmıştır.</p>
              <h3 className="text-lg font-bold text-primary mt-8 mb-3">1. Veri Sorumlusu</h3>
              <p>Kavram Eğitim Kurumları, KVKK kapsamında "Veri Sorumlusu" sıfatıyla kişisel verilerinizi işlemektedir.</p>
              <h3 className="text-lg font-bold text-primary mt-8 mb-3">2. İşlenen Kişisel Veriler</h3>
              <p>Kimlik bilgileri (ad, soyad), iletişim bilgileri (telefon, e-posta, adres), eğitim bilgileri ve web sitesi kullanım verileri işlenmektedir.</p>
              <h3 className="text-lg font-bold text-primary mt-8 mb-3">3. Kişisel Verilerin İşlenme Amaçları</h3>
              <p>Kişisel verileriniz; eğitim hizmetlerinin sunulması, kayıt işlemlerinin yürütülmesi, iletişim faaliyetlerinin gerçekleştirilmesi ve yasal yükümlülüklerin yerine getirilmesi amacıyla işlenmektedir.</p>
              <h3 className="text-lg font-bold text-primary mt-8 mb-3">4. Kişisel Verilerin Aktarılması</h3>
              <p>Kişisel verileriniz, yasal zorunluluklar çerçevesinde yetkili kamu kurum ve kuruluşlarına aktarılabilmektedir.</p>
              <h3 className="text-lg font-bold text-primary mt-8 mb-3">5. Haklarınız</h3>
              <p>KVKK'nın 11. maddesi kapsamında; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme haklarına sahipsiniz.</p>
              <h3 className="text-lg font-bold text-primary mt-8 mb-3">6. İletişim</h3>
              <p>KVKK kapsamındaki taleplerinizi <a href="mailto:info@kavram.com.tr" className="text-secondary hover:text-primary">info@kavram.com.tr</a> adresine iletebilirsiniz.</p>
            </div>
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default KVKK