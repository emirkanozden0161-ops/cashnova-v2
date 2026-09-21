/* ============================================================
   MALZEMELER

   Puanlar 1–5 arasındadır ve karşılaştırma amaçlıdır;
   kesin teknik değer değildir. Ürünün kullanılacağı yere göre
   birlikte karar vermeniz için hazırlanmıştır.
   ============================================================ */

export type Material = {
  code: string;
  name: string;
  /** Tek cümlelik konumlandırma */
  positioning: string;
  /** Kısa açıklama — abartılı kesinlik yok */
  description: string;
  /** 1–5 arası karşılaştırma puanları */
  ratings: {
    strength: number; // Dayanıklılık
    flexibility: number; // Esneklik
    heat: number; // Isı dayanımı
    finish: number; // Yüzey görünümü
  };
  /** Tipik kullanım alanları */
  uses: string[];
};

export const materials: Material[] = [
  {
    code: 'PLA',
    name: 'PLA',
    positioning: 'Görünümün öncelikli olduğu işler',
    description:
      'Temiz yüzey ve keskin detay verir, renk seçenekleri geniştir. Isıya dayanımı diğer malzemelere göre düşüktür; uzun süre güneş altında ya da sıcak araç içinde kalacak parçalarda PETG veya ABS öneriyoruz.',
    ratings: { strength: 3, flexibility: 2, heat: 2, finish: 5 },
    uses: ['Dekoratif ürünler', 'Hediyelik', 'Masaüstü objeler', 'Maket ve sunum'],
  },
  {
    code: 'PETG',
    name: 'PETG',
    positioning: 'Günlük kullanım ve dış mekân',
    description:
      'Dayanım ile kolay baskı arasında dengeli bir seçenek. Neme ve darbeye karşı PLA’dan daha iyi davranır, hafif esneklik gösterir. Çoğu fonksiyonel parça için ilk önerimiz budur.',
    ratings: { strength: 4, flexibility: 3, heat: 3, finish: 4 },
    uses: ['Fonksiyonel parçalar', 'Tabela ve stand', 'Kutu ve aparat', 'Dış mekân'],
  },
  {
    code: 'ABS',
    name: 'ABS',
    positioning: 'Sıcağa dayanım gereken parçalar',
    description:
      'Yüksek sıcaklığın söz konusu olduğu uygulamalarda tercih edilir. Zımparalanıp boyanabilir, yüzeyi işlenebilir. Baskısı daha hassas olduğu için üretim süresi biraz uzayabilir.',
    ratings: { strength: 4, flexibility: 3, heat: 5, finish: 3 },
    uses: ['Otomotiv aparatları', 'Motor çevresi parçalar', 'Teknik montaj', 'Boyanacak yüzeyler'],
  },
  {
    code: 'TPU',
    name: 'TPU',
    positioning: 'Bükülmesi gereken parçalar',
    description:
      'Lastik kıvamında, esnek bir malzeme. Bükülüp eski hâline döner, darbeyi emer. Sert ve ölçüsü sabit kalması gereken parçalar için uygun değildir.',
    ratings: { strength: 3, flexibility: 5, heat: 3, finish: 3 },
    uses: ['Conta ve tampon', 'Kulp kaplaması', 'Darbe emici parçalar', 'Esnek kılıflar'],
  },
  {
    code: 'RESIN',
    name: 'Reçine',
    positioning: 'Yüksek detaylı küçük modeller',
    description:
      'Katman izi neredeyse görünmez; ince detayları en iyi bu yöntem taşır. Parça boyutu diğer yöntemlere göre daha sınırlıdır ve yüzeyi daha kırılgandır.',
    ratings: { strength: 2, flexibility: 1, heat: 2, finish: 5 },
    uses: ['Minyatür ve figür', 'Takı prototipi', 'Maket detayları', 'Hassas kalıp modeli'],
  },
];

/** Puan etiketleri — malzeme kartlarında gösterilir */
export const ratingLabels: { key: keyof Material['ratings']; label: string }[] = [
  { key: 'strength', label: 'Dayanıklılık' },
  { key: 'flexibility', label: 'Esneklik' },
  { key: 'heat', label: 'Isı dayanımı' },
  { key: 'finish', label: 'Yüzey görünümü' },
];
