# Cashnova — V2

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Supabase

Tek sayfalık, WhatsApp üzerinden satış yapan üretim sitesi.
Ürünler, yorumlar ve atölye fotoğrafları `/yonetim` panelinden yönetilir.

## Hangi belgeyi okumalı?

| Belge | Kim için |
|---|---|
| **`KURULUM.md`** | Siteyi kuran kişi — tek seferlik, ~15 dakika |
| **`MUSTERI-KILAVUZU.md`** | İşletme sahibi — ürün ekleme, fiyat ve fotoğraf değiştirme |
| Bu dosya | Teknik özet ve dosya yapısı |

---

## 1. Siteyi çalıştırma

Bilgisayarınızda Node.js 18 veya üzeri kurulu olmalı ([nodejs.org](https://nodejs.org)).
Klasörü açıp terminalde:

```bash
npm install     # kütüphaneleri indirir, bir kez yapılır
npm run dev     # siteyi açar → http://localhost:3000
```

Yayına almak için en kolay yol Vercel: klasörü GitHub'a yükleyip Vercel'e
bağlamanız yeterli, gerisini kendisi yapar.

---

## 2. Bugün doldurmanız gereken alanlar

Hepsi **`data/`** klasöründe. İçinde `[GERÇEK ...]` yazan her satır sizi bekliyor.

### `data/siteConfig.ts` — en önemlisi

| Satır | Ne yazacaksınız |
|---|---|
| `WHATSAPP_NUMBER` | **Zorunlu.** `905321112233` biçiminde, + ve boşluk olmadan |
| `url` | Sitenin yayınlanacağı adres |
| `contact.email` | E-posta adresiniz |
| `contact.instagram` | Instagram bağlantınız |
| `contact.phone` | Görünmesini istediğiniz telefon |
| `contact.address` | Atölye adresi (müşteri gelmesini istiyorsanız) |
| `contact.hours` | Çalışma saatleri |
| `hero.image` | Ana sayfadaki büyük ürün fotoğrafı |

Boş bıraktığınız iletişim satırları sitede **hiç görünmez**. Uydurma bilgi
göstermemek için böyle yazıldı.

WhatsApp numarası girilmeden `npm run dev` ile çalıştırdığınızda sol altta bir
hatırlatma kutusu görürsünüz. Bu kutu yayındaki sitede asla görünmez.

### Ürünler, yorumlar, galeri → panelden

Bu üçü artık kod dosyasından değil, **`/yonetim`** panelinden yönetiliyor.
Kurulumu `KURULUM.md` anlatıyor; günlük kullanımı `MUSTERI-KILAVUZU.md`.

`data/products.ts`, `data/testimonials.ts` ve `data/gallery.ts` dosyaları
yalnızca **yedek** içeriktir: panel henüz kurulmadıysa ya da veritabanına
ulaşılamazsa site boş görünmesin diye oradaki içerik gösterilir.

### `data/faq.ts` — sık sorulanlar

Yedi soru hazır. Cevapları kendi çalışma şeklinize göre düzenleyin.
Emin olmadığınız bir süre veya rakam vermeyin.

### `data/materials.ts` — malzemeler

PLA, PETG, ABS, TPU ve reçine için kullanım alanı ve karşılaştırma puanları.
Puanlar 1–5 arasıdır ve "laboratuvar ölçümü değildir" notu sayfada yazılıdır.

---

## 3. Fotoğraflar

**Ürün ve galeri fotoğrafları** panelden yüklenir; Supabase deposuna gider ve
adresleri veritabanında tutulur. Kod tarafında yapılacak bir şey yok.

**Hero fotoğrafı** `data/siteConfig.ts` içindeki `hero.image` satırından
ayarlanır — bir kez konulup bırakılan bir görsel olduğu için bilinçli olarak
panele konmadı. `public/` klasörüne atıp `/hero.jpg` yazabilir ya da bir
bağlantı verebilirsiniz.

İdeal ölçü: kare veya 4:3, en az 1200 piksel genişlik.
Next.js hepsini otomatik olarak WebP/AVIF'e çevirir ve ekrana göre küçültür.

---

## 4. Klasörler

```
app/
  page.tsx           Sayfanın bölüm sırası (veriyi panelden çeker)
  layout.tsx         Fontlar, SEO başlıkları
  globals.css        Renkler ve buton stilleri
  icon.svg           Favicon
  yonetim/           Yönetim paneli sayfası
  api/yenile/        Kayıt sonrası siteyi tazeleyen uç

components/
  sections/          Sayfadaki büyük bölümler
  ui/                Ortak parçalar (görsel, ikon, animasyon)
  admin/             Yönetim paneli ekranları

data/                Site metinleri, SSS, malzemeler + yedek içerik
lib/
  content.ts         Panelden okur, olmazsa yedeğe düşer
  supabase.ts        Veritabanı bağlantısı
  whatsapp.ts        Sipariş mesajlarını hazırlar
  types.ts           İçerik türleri

supabase/schema.sql  Tek seferlik veritabanı kurulumu
```

### Veri nereden geliyor?

```
Ziyaretçi → app/page.tsx → lib/content.ts ─┬─ Supabase (panel verisi)
                                           └─ ulaşılamazsa → data/ (yedek)
```

Bu yüzden panel kurulmadan da, veritabanı uyusa da site ayakta kalır.

---

## 5. WhatsApp mesajları

Numara tek bir yerde tutulur (`WHATSAPP_NUMBER`); kodun hiçbir yerinde
tekrar yazılı değildir. Değiştirdiğinizde sitedeki bütün butonlar birden güncellenir.

Butonlara göre giden mesaj:

| Buton | Mesaj |
|---|---|
| Ürün kartı / ürün paneli | "Merhaba, **[ürün adı]** hakkında bilgi almak ve sipariş vermek istiyorum." |
| Dosyamı Gönder | Hazır 3D modeli olduğunu belirten mesaj |
| Fikrimi Anlat | Modeli olmadığını, birlikte değerlendirmek istediğini belirten mesaj |
| Üstteki ve alttaki teklif butonları | Genel bilgi alma mesajı |

---

## 6. Renkleri değiştirmek

`tailwind.config.ts` dosyasındaki renk kodlarını değiştirmeniz yeterli,
site geneline otomatik uygulanır.

| İsim | Kod | Nerede |
|---|---|---|
| `canvas` | `#F7F7F5` | Sayfa arka planı |
| `ink` | `#111111` | Koyu bölümler, başlıklar |
| `accent` | `#8B5CF6` | Sipariş butonları ve küçük vurgular |
| `muted` | `#6B6B6B` | İkincil metin |
| `line` | `#E5E5E5` | Çizgiler |

Mor renk bilinçli olarak az kullanıldı: yalnızca eylem butonlarında,
ikonlarda ve zaman çizelgesinde. Her yere yayıldığında premium hissi kayboluyor.

---

## 7. Teknik notlar

- **Güvenlik.** Panele giriş Supabase Auth ile yapılır. Asıl koruma
  veritabanındaki satır bazlı güvenlik kurallarında: herkes okuyabilir,
  yalnızca giriş yapmış kullanıcı yazabilir. Tarayıcıdan dolanarak aşılamaz.
  Tarayıcıya gönderilen `anon` anahtarı gizli bir bilgi değildir.
- **Anında yayın.** Kayıttan sonra panel `/api/yenile` ucunu çağırır ve ana
  sayfanın önbelleği temizlenir; değişiklik saniyeler içinde görünür.
  Bu çağrı başarısız olsa bile içerik en geç bir dakikada tazelenir.
- **Erişilebilirlik:** tüm butonlar en az 44–48px dokunma alanında, klavyeyle
  gezinilebilir, ürün panelinde odak tuzağı var, hareket azaltma ayarına uyulur.
- **Performans:** görseller lazy yüklenir, fontlar `next/font` ile gömülür,
  ağır 3D kütüphane kullanılmadı, sayfa tek bir HTML olarak sunulur.
- **SEO:** tek `<h1>`, düzgün `<h2>/<h3>` sırası, `sitemap.xml`, `robots.txt`
  ve arama sonuçlarında SSS çıkması için yapılandırılmış veri eklendi.

---

## 8. Yayına almadan önce son kontrol

- [ ] `WHATSAPP_NUMBER` dolduruldu ve telefonunuzdan test edildi
- [ ] `siteConfig.url` yayın adresiyle aynı
- [ ] `supabase/schema.sql` çalıştırıldı, panel açılıyor
- [ ] **Supabase'de yeni kayıt kapatıldı** (Authentication → Sign In / Providers)
- [ ] Vercel'e iki ortam değişkeni eklendi
- [ ] Müşteriye e-posta + şifre verildi, birlikte bir kez denendi
- [ ] En az bir gerçek ürün fotoğrafı yüklendi
- [ ] SSS cevapları çalışma şeklinize göre düzenlendi
- [ ] İletişim bilgilerinden doldurmak istedikleriniz girildi
