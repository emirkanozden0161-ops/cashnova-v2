# Kurulum — tek seferlik

Bu belge **size** ait. Müşterinin okumasına gerek yok; onun için
`MUSTERI-KILAVUZU.md` dosyası var.

Toplam süre: yaklaşık 15 dakika. Sonrasında müşteri ürün ekleyip
silebilir, fiyat ve fotoğraf değiştirebilir — size hiç sormadan.

---

## 1. Supabase hesabı ve proje (5 dk)

1. [supabase.com](https://supabase.com) → **Start your project** → GitHub veya
   e-posta ile ücretsiz kaydolun.
2. **New project** düğmesine basın.
   - **Name:** `cashnova`
   - **Database Password:** güçlü bir şifre üretip **bir yere kaydedin**
     (günlük kullanımda gerekmez ama kaybedilmemeli)
   - **Region:** `Central EU (Frankfurt)` — Türkiye'ye en yakın seçenek
3. **Create new project** deyin. Proje hazırlanırken 1–2 dakika bekleyin.

---

## 2. Tabloları oluşturun (2 dk)

1. Sol menüden **SQL Editor** → **New query**
2. Proje klasöründeki **`supabase/schema.sql`** dosyasını açın, **tamamını**
   kopyalayın ve bu kutuya yapıştırın.
3. Sağ alttaki **Run** düğmesine basın.

`Success. No rows returned` yazısını görmelisiniz. Bu adım tabloları,
güvenlik kurallarını, fotoğraf deposunu ve altı başlangıç ürününü birden kurar.

> Yanlışlıkla ikinci kez çalıştırırsanız bir zarar gelmez.

---

## 3. Bağlantı bilgilerini alın (2 dk)

1. Sol menünün altından **Project Settings** → **API**
2. Şu iki değeri kopyalayın:
   - **Project URL**
   - **Project API keys** altındaki **`anon` `public`** anahtarı
3. Proje klasöründe `.env.example` dosyasını **`.env.local`** adıyla kopyalayın
   ve iki satırı doldurun:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

> Bu iki bilgi gizli değildir; tarayıcıda görünmeleri normaldir. Güvenlik,
> 2. adımda kurduğunuz veritabanı kurallarıyla sağlanıyor.
> **`service_role` anahtarını asla bu dosyaya yazmayın.**

---

## 4. Müşteri için giriş hesabı açın (3 dk)

1. Sol menüden **Authentication** → **Users** → **Add user** → **Create new user**
2. Müşterinin e-postasını ve ona vereceğiniz şifreyi yazın.
3. **Auto Confirm User** seçeneğini **işaretleyin** (yoksa e-posta doğrulaması ister).
4. **Create user** deyin.

### Önemli güvenlik adımı

Aynı bölümde **Authentication → Sign In / Providers → Email** altında
**"Allow new users to sign up"** seçeneğini **kapatın**.

Kapatmazsanız internetteki herhangi biri kendine hesap açıp panele
girebilir. Bu adımı atlamayın.

---

## 5. Deneyin (2 dk)

```bash
npm install
npm run dev
```

- `http://localhost:3000` → site açılmalı, altı ürün görünmeli
- `http://localhost:3000/yonetim` → müşterinin bilgileriyle giriş yapın
- Bir ürünün fiyatını değiştirip kaydedin, ana sayfayı yenileyin — değişmeli

---

## 6. Yayına alın

1. Projeyi GitHub'a yükleyin (`.env.local` dosyası `.gitignore` sayesinde
   yüklenmez, doğrusu budur).
2. [vercel.com](https://vercel.com) → **Add New** → **Project** → repoyu seçin.
3. **Environment Variables** bölümüne 3. adımdaki **iki satırı** ekleyin.
4. **Deploy**.

Yayına aldıktan sonra `data/siteConfig.ts` içindeki `url` satırını gerçek
adresle güncelleyip tekrar yükleyin.

---

## Bilmeniz gerekenler

**Ücretsiz sınırlar.** 500 MB veritabanı, 1 GB fotoğraf depolama, 5 GB aylık
trafik. Bu site için fazlasıyla yeterli; yüzlerce ürün ve fotoğraf sığar.

**Uzun süre girilmezse.** Supabase, ücretsiz projeleri bir hafta hiç
kullanılmazsa uyku moduna alır. Sitede düzenli ziyaretçi varsa bu olmaz.
Olursa da site çökmez: `data/` klasöründeki yedek ürünleri göstermeye devam
eder, siz Supabase panelinden projeyi tek tıkla uyandırırsınız.

**Şifre unutulursa.** Supabase → Authentication → Users → kullanıcının
yanındaki üç nokta → **Send password recovery** ya da doğrudan yeni şifre atayın.

**Hero fotoğrafı ve site metinleri** panelde değil, `data/siteConfig.ts`
dosyasında. Bunlar bir kez ayarlanan şeyler olduğu için bilinçli olarak
panele konmadı. Müşteri bunların da değişmesini isterse söyleyin, panele
"Site ayarları" sekmesi ekleyelim.

**WhatsApp numarası** da aynı dosyada (`WHATSAPP_NUMBER`). Bunu doldurmadan
yayına almayın — `npm run dev` ile çalıştırdığınızda sol altta uyarı çıkar.
