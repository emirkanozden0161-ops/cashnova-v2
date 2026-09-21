import type { Product } from '@/lib/types';

/* ============================================================
   YEDEK ÜRÜN LİSTESİ

   ⚠️  Günlük ürün işlerini buradan YAPMAYIN.
   Ürün eklemek, silmek, fiyat ve fotoğraf değiştirmek için
   sitenin /yonetim adresindeki paneli kullanın.

   Bu dosya yalnızca bir emniyet ağıdır: yönetim paneli henüz
   kurulmadıysa ya da veritabanına ulaşılamazsa site boş
   görünmesin diye buradaki ürünler gösterilir.
   ============================================================ */

export const seedProducts: Product[] = [
  {
    id: 'seed-gece-lambasi',
    name: 'Katman Gece Lambası',
    summary: 'Işığı katman izleri arasından süzen, USB beslemeli masa lambası.',
    description:
      'Dalgalı gövde yapısı sayesinde ışık, baskı katmanlarının arasından yumuşak bir desenle dağılır. Gövde tek parça basılır; içine yerleşen LED modülü USB ile çalışır. Gece lambası ya da çalışma masasında ambiyans ışığı olarak kullanılabilir.',
    price: 890,
    materials: ['PLA', 'PETG'],
    size: '14 / 20 / 28 cm seçenekleri',
    leadTime: '2–3 gün',
    category: 'Aydınlatma',
    images: [],
    imageAlt: 'Katman dokulu 3D baskı gece lambası',
  },
  {
    id: 'seed-masa-organizeri',
    name: 'Modüler Masa Organizeri',
    summary: 'Birbirine kenetlenen, istediğiniz kadar çoğaltabileceğiniz set.',
    description:
      'Üç farklı gözden oluşan set, yan yana kenetlenerek masanıza göre büyür. Kalem, kartvizit, kablo ve küçük aparatlar için ayrı bölmeler içerir. Alt yüzeyinde kaymayı önleyen keçe yuvası bulunur.',
    price: 620,
    materials: ['PLA', 'PETG', 'ABS'],
    size: 'Modül başına 9 × 9 cm',
    leadTime: '3–4 gün',
    category: 'Ofis',
    images: [],
    imageAlt: 'Modüler 3D baskı masa organizeri',
  },
  {
    id: 'seed-telefon-tutucu',
    name: 'Araç İçi Telefon Tutucu',
    summary: 'Havalandırma ızgarasına geçen, ısıya dayanıklı tutucu.',
    description:
      'Yaz sıcağında biçimini koruması için ABS ya da PETG tercih edilir. Izgara klipsi yaylı tasarımdır, tek elle takılıp çıkarılır. Kolları 6,9 inç’e kadar telefonları kavrar; temas noktalarına TPU kaplama eklenebilir.',
    price: 450,
    materials: ['ABS', 'PETG', 'TPU'],
    size: 'Tek ölçü',
    leadTime: '2 gün',
    category: 'Otomotiv',
    images: [],
    imageAlt: 'Araç havalandırmasına takılan 3D baskı telefon tutucu',
  },
  {
    id: 'seed-isimli-anahtarlik',
    name: 'İsimli Anahtarlık',
    summary: 'İstediğiniz ismi kabartma olarak basıyoruz.',
    description:
      'Sipariş sırasında yazdırmak istediğiniz ismi ya da kısa bir metni iletiyorsunuz; kabartma olarak modele işleniyor. Toplu siparişlerde adet başına fiyat düşer. Düğün, organizasyon ve kurumsal hediyelik için uygundur.',
    price: 180,
    materials: ['PLA', 'PETG'],
    size: '6 × 2,5 cm',
    leadTime: '1–2 gün',
    category: 'Hediyelik',
    images: [],
    imageAlt: 'İsim kabartmalı 3D baskı anahtarlık',
  },
  {
    id: 'seed-geometrik-saksi',
    name: 'Geometrik Saksı',
    summary: 'Su tahliyeli iç hazne ve çok yüzeyli dış gövde.',
    description:
      'Dış gövde çok yüzeyli geometrik formda basılır; içine yerleşen ayrı hazne suyu tutarak mobilyanızı korur. Sukulent ve küçük saksı bitkileri için uygundur. Balkon gibi açık alanlarda PETG önerilir.',
    price: 540,
    materials: ['PLA', 'PETG'],
    size: 'Ø 10 / 15 / 22 cm',
    leadTime: '3 gün',
    category: 'Dekorasyon',
    images: [],
    imageAlt: 'Geometrik yüzeyli 3D baskı saksı',
  },
  {
    id: 'seed-yedek-parca',
    name: 'Yedek Parça / Aparat',
    summary: 'Ölçüsünü paylaşın, birebir üretelim.',
    description:
      'Kırılan bir dişli, bir kapak ya da üretimden kalkmış bir aparat için teknik çizim veya numunenin fotoğrafı yeterli. Ölçüleri alıp modelliyor ve üretiyoruz. Yük taşıyan parçalarda PETG veya ABS, yüksek hassasiyetli işlerde reçine kullanılır.',
    price: null,
    materials: ['PETG', 'ABS', 'RESIN'],
    size: 'Ölçüye özel',
    leadTime: 'Parçaya göre değişir',
    category: 'Teknik Parça',
    images: [],
    imageAlt: '3D baskı ile üretilmiş teknik yedek parça',
  },
];

/** Panelde kategori seçiminde çıkan hazır liste */
export const categories = [
  'Dekorasyon',
  'Aydınlatma',
  'Ofis',
  'Otomotiv',
  'Hediyelik',
  'Teknik Parça',
];

/** Panelde malzeme seçiminde çıkan hazır liste */
export const materialCodes = ['PLA', 'PETG', 'ABS', 'TPU', 'RESIN'];
