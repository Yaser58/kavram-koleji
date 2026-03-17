import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, HelpCircle } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'
import api from '../../lib/api'

interface FAQItem {
  _id: string
  question: string
  answer: string
  order?: number
}

const defaultFaqs: FAQItem[] = [
  { _id: '1', question: 'Kavram Koleji\'ne nasıl kayıt yapabilirim?', answer: 'Kayıt işlemi için /kayit sayfamızdaki formu doldurabilir veya kampüslerimizden birini ziyaret edebilirsiniz. Detaylı bilgi için iletişim sayfamızdan bize ulaşabilirsiniz.' },
  { _id: '2', question: 'Eğitim ücretleri hakkında bilgi alabilir miyim?', answer: 'Eğitim ücretleri kampüse ve sınıf seviyesine göre değişiklik göstermektedir. Güncel fiyat bilgisi için ilgili kampüsümüzle iletişime geçmenizi öneririz.' },
  { _id: '3', question: 'Burs imkanları var mı?', answer: 'Başarılı öğrencilerimize burs imkanları sunulmaktadır. Burs koşulları ve başvuru süreci hakkında detaylı bilgi için insan kaynakları veya kampüs yönetimi ile iletişime geçebilirsiniz.' },
  { _id: '4', question: 'Kampüsleriniz nerede?', answer: 'Kampüslerimizin listesini /kampusler sayfamızdan inceleyebilirsiniz. Her kampüs için adres, iletişim bilgileri ve ulaşım detayları mevcuttur.' },
  { _id: '5', question: 'Dijital okul platformuna nasıl erişebilirim?', answer: 'Kavram Dijital Okul platformuna https://dijital.kavram.k12.tr adresinden erişebilirsiniz. Öğrenci ve veli girişi için gerekli bilgiler kayıt sonrası paylaşılmaktadır.' },
]

const SSS = () => {
  const { t } = useTranslation()
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFaqs)
  const [openId, setOpenId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/main/faq').then((data: FAQItem[]) => {
      if (data && data.length > 0) setFaqs(data)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <MainWrapper>
      <PageBanner title={t('pages.sss.title')} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.sss.title') }]} />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq._id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setOpenId(openId === faq._id ? null : faq._id)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-primary hover:bg-gray-50 transition"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle size={20} className="text-secondary flex-shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown size={20} className={`flex-shrink-0 transition-transform ${openId === faq._id ? 'rotate-180' : ''}`} />
                  </button>
                  {openId === faq._id && (
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-gray-600 pl-8">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </MainWrapper>
  )
}

export default SSS
