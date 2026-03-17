import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Phone, MapPin, Navigation, Home, Search } from 'lucide-react'
import MainWrapper from '../../components/MainWrapper'
import PageBanner from '../../components/PageBanner'

interface KursMerkezi {
  name: string
  city: string
  phone: string
  phone2?: string
  address: string
  programs: string[]
  mapUrl?: string
}

const kursMerkezleri: KursMerkezi[] = [
  // ADANA
  { name: 'Adana - Çukurova Kavram Kurs Merkezi', city: 'Adana', phone: '0 (322) 234 96 96', address: 'Güzelyalı Mah. 81150 Sok. Alize Apt. No:2 Çukurova/Adana', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Güzelyalı+Mah+Çukurova+Adana' },
  { name: 'Adana - Karaisalı Kavram Kurs Merkezi', city: 'Adana', phone: '0 544 461 05 05', address: 'Çeceli Mah. Turgut Özal Bul. NO.40 K.2 D.1 Karaisalı/Adana', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Karaisalı+Adana' },
  { name: 'Adana - Kurttepe Kavram Kurs Merkezi', city: 'Adana', phone: '0 (322) 248 84 87', address: 'Yurt Mah. 71487 Sok. Aydınlar Apt. No:11/A Kurttepe-Çukurova/Adana', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Kurttepe+Çukurova+Adana' },
  { name: 'Adana - Kurttepe Lgs Kavram Kurs Merkezi', city: 'Adana', phone: '', address: 'Kurttepe-Çukurova/Adana', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'] },
  { name: 'Adana - Seyhan (Çarşı) Kavram Kurs Merkezi', city: 'Adana', phone: '0 (322) 248 91 91', address: 'Döşeme Mahallesi Dr Ali Menteş Caddesi No 3 (Çarşı Çetinkaya yanı) Seyhan / Adana', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Seyhan+Adana' },
  // ANKARA
  { name: 'Ankara - Etimesgut Kavram Kurs Merkezi', city: 'Ankara', phone: '0312 511 73 18', phone2: '0542 121 76 92', address: 'Yeşilova Mah, 4017. Cad, Bina No: 18, Kapı No: 47, Etimesgut / Ankara', programs: [], mapUrl: 'https://maps.google.com/?q=Etimesgut+Ankara' },
  { name: 'Ankara - Keçiören Kavram Kurs Merkezi', city: 'Ankara', phone: '0 (312) 435 11 11', address: 'Pınarbaşı Mah. Şehit Hakan Turan Cad. No:23 Keçiören / Ankara', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Keçiören+Ankara' },
  { name: 'Ankara - Kızılay Kavram Kurs Merkezi', city: 'Ankara', phone: '0 (312) 433 00 66', address: 'Fidanlık Mah. Ziya Gökalp Cad. Şener Onar İş Merk. No:23 Kat:1 Çankaya / Ankara', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Kızılay+Ankara' },
  { name: 'Ankara - Mamak Kavram Kurs Merkezi', city: 'Ankara', phone: '0540 150 50 59', address: 'Durali Alıç, Doğukent Cd. No:316/B, 06480 Mamak/Ankara', programs: ['LGS', 'LGS ara sınıf', 'İlkokul ve Ortaokula Destek', 'LGS Hazırlık'], mapUrl: 'https://maps.google.com/?q=Mamak+Ankara' },
  { name: 'Ankara - Ovacık Kavram Kurs Merkezi', city: 'Ankara', phone: '', address: 'Yayla Mahallesi Yozgat bulvarı 1488 cadde Bellis kule Kat 2 no:4A 1 Keçiören/Ankara', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf', 'İlkokul ve Ortaokula Destek', 'LGS Hazırlık'], mapUrl: 'https://maps.google.com/?q=Ovacık+Keçiören+Ankara' },
  { name: 'Ankara - Yenimahalle Kavram Kurs Merkezi', city: 'Ankara', phone: '0 (312) 344 34 43', phone2: '0 (552) 719 90 01', address: 'Ragıp Tüzün Mah. İvedik Cad. No: 170 Yenimahalle/Ankara', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Yenimahalle+Ankara' },
  // AYDIN
  { name: 'Aydın - Çine 2 Kavram Kurs Merkezi', city: 'Aydın', phone: '0533 553 57 89', address: 'Hamidabat Mahallesi, 200 Sokak Akbudak İş Merkezi No: 14D Çine/Aydın', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf', 'LGS Hazırlık'], mapUrl: 'https://maps.google.com/?q=Çine+Aydın' },
  { name: 'Aydın - Çine Kavram Kurs Merkezi', city: 'Aydın', phone: '0533 553 57 89', address: 'Amidabat Mah. 200 Sokak Akbudak İş Merkezi No: 14 D Çine / Aydın', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf', 'LGS Hazırlık'], mapUrl: 'https://maps.google.com/?q=Çine+Aydın' },
  // BALIKESİR
  { name: 'Balıkesir - Gönen Kavram Kurs Merkezi', city: 'Balıkesir', phone: '0 (543) 779 10 00', address: 'Altay Mah. Kavaklı Osman Bey Cad. No:7 Gönen / Balıkesir', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Gönen+Balıkesir' },
  // BURSA
  { name: 'Bursa - Fomara Kavram Kurs Merkezi', city: 'Bursa', phone: '0 (224) 224 13 14', address: 'Doğanbey Mah. Doğanbey Cad.Örtaş İş Merk. No:25 K:2 Osmangazi / Bursa', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Osmangazi+Bursa' },
  { name: 'Bursa - Nilüfer Kavram Kurs Merkezi', city: 'Bursa', phone: '0 (224) 451 21 51', phone2: '0 (506) 751 24 51', address: 'Konak Mh. Yasemin (120) sk. No:4 /46 Nilüfer/Bursa', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Nilüfer+Bursa' },
  { name: 'Bursa - Osmangazi Kavram Kurs Merkezi', city: 'Bursa', phone: '0 (224) 223 42 23', address: 'Akpınar Mah. 367. Sok. No:3 Osmangazi / Bursa', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Osmangazi+Bursa' },
  // İSTANBUL ANADOLU
  { name: 'İstanbul Anadolu - Bulgurlu Kavram Kurs Merkezi', city: 'İstanbul', phone: '0 (554) 569 51 83', address: 'Bulgurlu, Şura Sk. 16-18, 34696 Üsküdar/İstanbul', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Bulgurlu+Üsküdar+İstanbul' },
  { name: 'İstanbul Anadolu - Çekmeköy Kavram Kurs Merkezi', city: 'İstanbul', phone: '0 (216) 641 61 51', address: 'Meclis Mahallesi Derviş Sokak No:26 D:30 Kat:1 Sancaktepe/İstanbul', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Çekmeköy+İstanbul' },
  { name: 'İstanbul Anadolu - Ihlamurkuyu Kavram Kurs Merkezi', city: 'İstanbul', phone: '0 (216) 314 90 92', address: 'Tepeüstü Mah. Doğanevler Cad. No:8 Ümraniye / İstanbul', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Ihlamurkuyu+Ümraniye+İstanbul' },
  { name: 'İstanbul Anadolu - Kavacık Kavram Kurs Merkezi', city: 'İstanbul', phone: '0 (216) 693 32 19', address: 'Çubuklu Mah. Mensup Sokak No:3 Beykoz', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Kavacık+Beykoz+İstanbul' },
  { name: 'İstanbul Anadolu - Maltepe Kavram Kurs Merkezi', city: 'İstanbul', phone: '0 (216) 457 57 00', address: 'Altayçeşme Mah. Farabi Sok. No:4 Maltepe / İstanbul', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Maltepe+İstanbul' },
  { name: 'İstanbul Anadolu - Mimar Sinan Kavram Kurs Merkezi', city: 'İstanbul', phone: '0 (507) 152 09 56', address: 'Mimar Sinan, Mimar Sinan Cd. no:73, 34782 Çekmeköy/İstanbul', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Mimar+Sinan+Çekmeköy+İstanbul' },
  { name: 'İstanbul Anadolu - Pendik Kavram Kurs Merkezi', city: 'İstanbul', phone: '0 (216) 491 52 54', address: 'Bahçelievler Mah. Süreyyapaşa Cad. No:2 Pendik / İstanbul', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Pendik+İstanbul' },
  { name: 'İstanbul Anadolu - Samandıra Kavram Kurs Merkezi', city: 'İstanbul', phone: '0 (216) 311 25 00', address: 'Osmangazi Mah.Hilal Cad.Birikim Sok.No:2 Sancaktepe/İstanbul', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Samandıra+Sancaktepe+İstanbul' },
  { name: 'İstanbul Anadolu - Sancaktepe Kavram Kurs Merkezi', city: 'İstanbul', phone: '0 (216) 311 71 31', address: 'İnönü Mah. Ankara Cad. Solmaz Sok. No:1 Kat:1 Sancaktepe / İstanbul', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Sancaktepe+İstanbul' },
  { name: 'İstanbul Anadolu - Ataşehir Örnek Kavram Kurs Merkezi', city: 'İstanbul', phone: '0501 267 12 12', address: 'Örnek Mahallesi, Şehit Cahar Dudayev Caddesi, No: 54/1, İç Kapı No: 6 Ataşehir/İstanbul', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf', 'LGS Hazırlık'], mapUrl: 'https://maps.google.com/?q=Ataşehir+İstanbul' },
  { name: 'İstanbul Anadolu - Kurtköy Kavram Kurs Merkezi', city: 'İstanbul', phone: '0532 264 97 60', phone2: '0216 532 00 34', address: 'Kurtköy Mah. Başkale Sok. Bulutlar Plaza K 4 Kurtköy Merkez', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf', 'LGS Hazırlık'], mapUrl: 'https://maps.google.com/?q=Kurtköy+Pendik+İstanbul' },
  { name: 'İstanbul Anadolu - Ümraniye Kavram Kurs Merkezi', city: 'İstanbul', phone: '0216 443 67 61', phone2: '0553 682 15 62', address: 'Atatürk Mahallesi Alemdağ Caddesi No 14 K: 4', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf', 'LGS Hazırlık'], mapUrl: 'https://maps.google.com/?q=Ümraniye+İstanbul' },
  // İSTANBUL AVRUPA
  { name: 'İstanbul Avrupa - Beykent Kavram Kurs Merkezi', city: 'İstanbul', phone: '0 (212) 855 14 17', address: 'Yavuz Sultan Selim Bulvarı Uyum Çarşı Kat:2 No: 41 Beylikdüzü / İstanbul', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Beykent+Beylikdüzü+İstanbul' },
  { name: 'İstanbul Avrupa - Yakuplu Kavram Kurs Merkezi', city: 'İstanbul', phone: '0 (212) 876 22 99', phone2: '0 (542) 385 10 05', address: 'Yakuplu Mah. Hürriyet Bulvarı No:189 Beylikdüzü / İstanbul', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Yakuplu+Beylikdüzü+İstanbul' },
  { name: 'İstanbul Avrupa - Halkalı Kavram Kurs Merkezi', city: 'İstanbul', phone: '0212 693 19 09', address: 'Halkalı Merkez Mah. Fatih Cad. No:52 Küçükçekmece', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf', 'İlkokul ve Ortaokula Destek', 'LGS Hazırlık'], mapUrl: 'https://maps.google.com/?q=Halkalı+Küçükçekmece+İstanbul' },
  { name: 'İstanbul Güneşli Kavram Kurs Merkezi', city: 'İstanbul', phone: '0507 176 16 01', address: 'Güneşli Merkez Mah. Fevzi Çakmak Cad. 1360. Sok. Turkuaz Evleri', programs: [], mapUrl: 'https://maps.google.com/?q=Güneşli+İstanbul' },
  // İZMİR
  { name: 'İzmir - Bornova Kavram Kurs Merkezi', city: 'İzmir', phone: '0554 871 97 84', address: 'Kazım Dirik Mahallesi 184 Sokak Hasanbey Apartmanı No: 60 Bornova/İzmir', programs: [], mapUrl: 'https://maps.google.com/?q=Bornova+İzmir' },
  { name: 'İzmir - Çiğli Kavram Kurs Merkezi', city: 'İzmir', phone: '0 (232) 386 13 13', address: 'Ataşehir Mahallesi 8265 Sokak No:17 Çiğli / İzmir', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Çiğli+İzmir' },
  { name: 'İzmir - Gaziemir 1 Kavram Kurs Merkezi', city: 'İzmir', phone: '0 (505) 387 13 80', phone2: '0 551 094 31 34', address: 'Gazi, 26. Sk. No:4/A, 35410 Gaziemir/İzmir', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Gaziemir+İzmir' },
  { name: 'İzmir - Gaziemir 2 Kavram Kurs Merkezi', city: 'İzmir', phone: '0505 387 13 80', phone2: '0 551 880 80 90', address: 'Atıfbey, 8/2. Sk. No:16 D:a, 35410 Gaziemir/İzmir', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Gaziemir+İzmir' },
  { name: 'İzmir - Gaziemir 3 Kavram Kurs Merkezi', city: 'İzmir', phone: '0232 251 23 25', address: 'Atıf Bey Mah. Feridun Pözüt Cad. No:12 Gaziemir / İzmir', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf', 'LGS Hazırlık'], mapUrl: 'https://maps.google.com/?q=Gaziemir+İzmir' },
  { name: 'İzmir - Karşıyaka Kavram Ekstra Kurs Merkezi', city: 'İzmir', phone: '0 553 406 19 12', address: 'Donanmacı Mahallesi 1727 Sokak No:10 D:2 Tonoğlu Apt. Karşıyaka / İzmir', programs: ['İlkokul ve Ortaokula Destek', 'LGS Hazırlık'], mapUrl: 'https://maps.google.com/?q=Karşıyaka+İzmir' },
  { name: 'İzmir - Karşıyaka Kavram Kurs Merkezi', city: 'İzmir', phone: '0 (507) 318 25 22', address: '1713 Tiyatro Sokağı No: 32 Kat 1-2-3-4 Karşıyaka / İzmir', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Karşıyaka+İzmir' },
  { name: 'İzmir - Menemen Kavram Kurs Merkezi', city: 'İzmir', phone: '0 (501) 102 77 22', address: 'Tülbentli Mah. İkiz Çeşme Sokak No: 101/2A Menemen / İzmir', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Menemen+İzmir' },
  { name: 'İzmir - Şirinyer Kavram Kurs Merkezi', city: 'İzmir', phone: '0 (232) 438 03 38', address: 'İnkılap Mh. Mehmet Akif Cad. No:107 Şirinyer / İzmir', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Şirinyer+İzmir' },
  { name: 'İzmir - Torbalı Kavram Kurs Merkezi', city: 'İzmir', phone: '0501 373 35 48', phone2: '0232 856 08 88', address: 'Ertuğrul mah. Torbalı cd. No:22A Torbalı / İzmir', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Torbalı+İzmir' },
  { name: 'İzmir Menderes Kavram Kurs Merkezi', city: 'İzmir', phone: '0505 387 13 80', address: 'Kemalpaşa Mah. Cumaovası Cad. No:47A Menderes/İzmir', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf', 'İlkokul ve Ortaokula Destek', 'LGS Hazırlık'], mapUrl: 'https://maps.google.com/?q=Menderes+İzmir' },
  // KOCAELİ
  { name: 'Kocaeli - Çayırova Kavram Kurs Merkezi', city: 'Kocaeli', phone: '0 (262) 744 71 74', address: 'Yenimahalle 5109.Sok No:1 Çayırova / Kocaeli', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Çayırova+Kocaeli' },
  { name: 'Kocaeli - Darıca Kavram Kurs Merkezi', city: 'Kocaeli', phone: '0 (507) 080 08 00', address: 'Kazımkarabekir Mah. İstasyon Cad. No:423 D:1/2 Darıca/Kocaeli', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Darıca+Kocaeli' },
  { name: 'Kocaeli - Gebze Kavram Kurs Merkezi', city: 'Kocaeli', phone: '0 (505) 003 11 41', address: 'Hacı Halil Mah. Körfez Cad. No:10 / 1 Gebze / Kocaeli', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Gebze+Kocaeli' },
  { name: 'Kocaeli - İzmit Kavram Kurs Merkezi', city: 'Kocaeli', phone: '0 (262) 325 21 12', address: 'Veli Ahmet Mah.İnönü Cad.Cengizyeli Sok.No:3 İzmit / Kocaeli', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=İzmit+Kocaeli' },
  // MANİSA
  { name: 'Manisa - Turgutlu Kavram Kurs Merkezi', city: 'Manisa', phone: '0(236) 312 55 56', address: 'Cumhuriyet mahallesi Savaş sokak No : 1 DK/1 Turgutlu Manisa', programs: [], mapUrl: 'https://maps.google.com/?q=Turgutlu+Manisa' },
  // MARDİN
  { name: 'Mardin - Kızıltepe Kavram Kurs Merkezi', city: 'Mardin', phone: '0 (539) 821 37 13', address: 'Atatürk Mah. 160. Sok. No:5/3 47440 Kızıltepe / Mardin', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Kızıltepe+Mardin' },
  // MERSİN
  { name: 'Mersin - Silifke 2 Kavram Kurs Merkezi', city: 'Mersin', phone: '0324 714 87 87', address: 'Göksu mahallesi Veli Gürten Bozbey caddesi 4/A Silifke - Mersin', programs: [], mapUrl: 'https://maps.google.com/?q=Silifke+Mersin' },
  { name: 'Mersin - Silifke Kavram Kurs Merkezi', city: 'Mersin', phone: '0505 509 06 82', address: 'Göksu Mah. Veli Gürten Bozbey Caddesi Kızılay İşhanı Kat:3', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf', 'LGS Hazırlık'], mapUrl: 'https://maps.google.com/?q=Silifke+Mersin' },
  // MUĞLA
  { name: 'Muğla - Bodrum Kavram Kurs Merkezi', city: 'Muğla', phone: '0 (252) 319 77 88', address: 'Cevat Şakir Mah. Hoca Ahmet Yesevi Sok. No:31 Bodrum/Muğla', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Bodrum+Muğla' },
  { name: 'Muğla - Yatağan Kavram Kurs Merkezi', city: 'Muğla', phone: '0(252) 572 97 06', phone2: '0(534) 976 97 06', address: 'Konak Mah. Atatürk Caddesi 96. Sok. No : 1 /10 Yatağan / Muğla', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf', 'LGS Hazırlık'], mapUrl: 'https://maps.google.com/?q=Yatağan+Muğla' },
  // NİĞDE
  { name: 'Niğde - Niğde Kavram Kurs Merkezi', city: 'Niğde', phone: '0 (388) 213 21 00', address: 'Sırali Mah. MuratZeren Cad. No:21 Kat:3 Niğde', programs: ['YKS', 'YKS ara sınıf', 'LGS', 'LGS ara sınıf'], mapUrl: 'https://maps.google.com/?q=Niğde' },
]

const cities = ['Tümü', 'Adana', 'Ankara', 'Aydın', 'Balıkesir', 'Bursa', 'İstanbul', 'İzmir', 'Kocaeli', 'Manisa', 'Mardin', 'Mersin', 'Muğla', 'Niğde']

const KursMerkezleri = () => {
  const { t } = useTranslation()
  const [selectedCity, setSelectedCity] = useState('Tümü')
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = kursMerkezleri.filter(m => {
    const matchCity = selectedCity === 'Tümü' || m.city === selectedCity
    const matchSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.address.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCity && matchSearch
  })

  return (
    <MainWrapper>
      <PageBanner title={t('pages.kursMerkezleri.titleWithCount', { count: kursMerkezleri.length })} breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('pages.kursMerkezleri.titleWithCount', { count: kursMerkezleri.length }) }]} />
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('pages.kursMerkezleri.citySelect')}</label>
                <div className="flex flex-wrap gap-2">
                  {cities.map(city => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedCity === city ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
              <div className="lg:w-80">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.search')}</label>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('pages.kursMerkezleri.searchPlaceholder')}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-500 mb-6">{t('pages.kursMerkezleri.centersFound', { count: filtered.length })}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map((merkez, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100 group">
                <div className="flex">
                  <div className="w-32 md:w-40 flex-shrink-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-4">
                    <img src="/kavram-kurs-logo.jpg" alt="Kavram Kurs" className="w-20 h-20 object-contain rounded-full" />
                  </div>
                  <div className="flex-1 p-5">
                    <h3 className="text-lg font-bold text-purple-700 mb-2 group-hover:text-purple-900 transition">{merkez.name}</h3>
                    {merkez.phone && (
                      <a href={`tel:${merkez.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-1">
                        <Phone size={14} /> {merkez.phone}
                      </a>
                    )}
                    {merkez.phone2 && (
                      <a href={`tel:${merkez.phone2.replace(/\s/g, '')}`} className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-1 text-sm">
                        <Phone size={12} /> {merkez.phone2}
                      </a>
                    )}
                    <p className="text-gray-500 text-sm mb-3 flex items-start gap-2">
                      <MapPin size={14} className="flex-shrink-0 mt-0.5" /> {merkez.address}
                    </p>
                    {merkez.programs.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {merkez.programs.map((prog, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{prog}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-3">
                      <a href="https://kavramkurs.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition">
                        <Home size={14} /> {t('pages.kursMerkezleri.inspectCenter')}
                      </a>
                      {merkez.mapUrl && (
                        <a href={merkez.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-purple-600 hover:text-purple-800 text-sm font-medium">
                          <Navigation size={14} /> {t('pages.kursMerkezleri.directions')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default KursMerkezleri
