/* ============================================================
   CASHNOVA — MERKEZİ AYAR DOSYASI

   Sitedeki iletişim bilgileri ve ana metinler burada tutulur.
   Kod bilmenize gerek yok: tırnak içindeki yazıları değiştirin,
   tırnak işaretlerini silmeyin.

   ⚠️  İÇİNDE "[GERÇEK ...]" YAZAN HER SATIR DOLDURULMALIDIR.
       Doldurulmayan alanlar sitede hiç gösterilmez; uydurma
       bilgi yerine boş bırakılmaları bilinçli bir tercihtir.
   ============================================================ */

/* ---- 1. WHATSAPP (en önemli ayar) ----------------------------
   Numarayı ülke kodu ile, başında + ve boşluk OLMADAN yazın.
   Örnek: 0532 111 22 33  →  '905321112233'
   Bu numara sitedeki bütün WhatsApp butonlarını besler;
   başka hiçbir dosyada numara yazılı değildir.             */
export const WHATSAPP_NUMBER: string = '905385174890'; // [GERÇEK WHATSAPP NUMARASI]

/* Butonlara basıldığında WhatsApp'a düşen varsayılan mesaj. */
export const WHATSAPP_MESSAGE: string =
  'Merhaba, 3D baskı hizmetleriniz hakkında bilgi almak istiyorum.';

/* Not: Buradaki alanlar bilerek düz "metin" olarak tanımlıdır.
   Boş bıraktığınız bir satırı sonradan doldurduğunuzda site
   hiçbir uyarı vermeden çalışmaya devam eder. */
type Contact = {
  email: string;
  instagram: string;
  phone: string;
  address: string;
  hours: string;
};

type SiteConfigShape = {
  brand: string;
  title: string;
  description: string;
  url: string;
  tagline: string;
  contact: Contact;
  hero: {
    eyebrow: string;
    titleLines: string[];
    description: string;
    primaryCta: string;
    secondaryCta: string;
    image: string;
    imageAlt: string;
  };
  trustBar: { icon: string; label: string }[];
};

export const siteConfig: SiteConfigShape = {
  brand: 'Cashnova',
  /* Tarayıcı sekmesinde ve Google sonuçlarında görünür. */
  title: 'Cashnova | Profesyonel 3D Baskı ve Özel Üretim',
  description:
    'Cashnova ile kaliteli 3D baskı ürünlerini keşfedin veya kendi tasarımınızı özel olarak ürettirin. Hızlı teklif ve kolay iletişim.',
  /* Siteyi yayına aldığınız adres (sonunda / olmadan). */
  url: 'https://cashnova.vercel.app', // [GERÇEK SİTE ADRESİ]

  /* Footer'daki kısa marka cümlesi. */
  tagline:
    '3D baskı ile hazır ürünler, kişiye özel tasarımlar ve ihtiyaca özel üretim.',

  /* ---- 2. İLETİŞİM ------------------------------------------
     Boş bıraktığınız satır sitede hiç görünmez.
     Uydurma bilgi yazmayın.                                  */
  contact: {
    email: '', // [GERÇEK E-MAIL]
    instagram: 'https://www.instagram.com/cashnova01/', // [GERÇEK INSTAGRAM ADRESİ] örn: https://instagram.com/...
    /* Görünür telefon numarası (WhatsApp numarasından farklı olabilir) */
    phone: '', // [GERÇEK TELEFON]
    /* Atölye adresi — yalnızca müşteri gelmesini istiyorsanız doldurun */
    address: '', // [GERÇEK ADRES]
    /* Çalışma saatleri — örn: 'Pazartesi – Cumartesi, 09:00 – 19:00' */
    hours: '', // [GERÇEK ÇALIŞMA SAATLERİ]
  },

  /* ---- 3. HERO (açılış) ------------------------------------- */
  hero: {
    eyebrow: '3D baskı ve özel üretim',
    /* Başlık satır satır yazılır; her satır ayrı animasyonla gelir. */
    titleLines: ['Fikriniz,', 'katman katman', 'gerçeğe dönüşür.'],
    description:
      '3D baskı ile hazır ürünler, kişiye özel tasarımlar ve ihtiyaçlarınıza özel üretim.',
    primaryCta: 'Ürünleri Keşfet',
    secondaryCta: 'Özel Üretim Teklifi Al',
    /* Hero görseli: gerçek fotoğrafınızın bağlantısını buraya yazın.
       Boş bırakırsanız yerine sade bir çizim gösterilir.
       Örnek: '/hero.jpg'  ya da  'https://res.cloudinary.com/.../hero.jpg' */
    image: '', // [GERÇEK ÜRÜN FOTOĞRAFI]
    imageAlt: 'Cashnova atölyesinde üretilmiş 3D baskı ürünü',
  },

  /* ---- 4. HERO ALTI GÜVEN ŞERİDİ ----------------------------
     Sayı içermez; abartılı iddia yerine ne yaptığınızı anlatır. */
  trustBar: [
    { icon: 'sparkle', label: 'Özel Tasarım' },
    { icon: 'layers', label: 'Kaliteli Malzeme' },
    { icon: 'bolt', label: 'Hızlı Üretim' },
    { icon: 'chat', label: "WhatsApp'tan Kolay Sipariş" },
  ],
};

export type SiteConfig = SiteConfigShape;
