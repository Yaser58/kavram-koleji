# Kampüs Fotoğrafları

Bu klasördeki fotoğraflar **seed verisine dahildir** – `npm run seed` çalıştırılsa bile logo yolları korunur.

## Yeni fotoğraf ekleme

1. Fotoğrafları **Kampüsler** klasörüne ekleyin (dosya adı: `Adana.jpeg`, `Ankara Batikent.png` vb.)
2. `npm run copy-photos` komutunu çalıştırın – dosyalar otomatik olarak bu klasöre slug isimleriyle kopyalanır

## Mevcut dosyalar (slug)

| Şube | Dosya |
|------|-------|
| Adana | `adana.jpeg` |
| Ankara - Batıkent | `ankara-batikent.png` |
| Ankara - Etimesgut | `ankara-etimesgut.jpg` |
| Ankara - Keçiören | `ankara-kecioren.jpg` |
| Ankara - Öveçler | `ankara-ovecler.jpg` |
| Ankara - Sincan | `ankara-sincan.jpg` |
| Bandırma | `bandirma.jpg` |
| Gaziantep | `gaziantep.jpg` |
| İstanbul - Esenyurt | `istanbul-esenyurt.jpg` |
| İstanbul - Sancaktepe | `istanbul-sancaktepe.jpg` |
| İstanbul - Soyak | `istanbul-soyak.jpg` |
| Mardin - Kızıltepe | `mardin-kiziltepe.jpg` |
| Sivas | `sivas.jpg` |

**Not:** Ankara Batıkent ve Bandırma fotoğrafları `Kampüsler` klasöründe `Ankara Batikent.png` ve `Balikesir Bandimra.jpg` adlarıyla duruyorsa `npm run copy-photos` ile kopyalanır.
