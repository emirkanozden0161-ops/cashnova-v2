/* ============================================================
   SIKÇA SORULAN SORULAR

   Cevapları kendi çalışma şeklinize göre düzenleyin.
   Emin olmadığınız bir süre ya da rakam vermeyin;
   "birlikte belirleyelim" demek her zaman daha güvenlidir.
   ============================================================ */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: 'Minimum sipariş miktarı var mı?',
    answer:
      'Hayır. Tek bir parça için de üretim yapıyoruz. Toplu siparişlerde adet başına fiyat düştüğü için, birden fazla adet düşünüyorsanız teklifte bunu belirtmeniz yeterli.',
  },
  {
    question: '3D modelim yoksa üretim yaptırabilir miyim?',
    answer:
      'Evet. Elinizde hazır dosya olması şart değil. Bir fotoğraf, bir eskiz ya da ölçüleri yazılmış bir not bile başlangıç için yeterli; modellemeyi biz yapıyoruz. Modelleme ücretini teklif aşamasında net olarak söylüyoruz.',
  },
  {
    question: 'Hangi dosya formatlarını kabul ediyorsunuz?',
    answer:
      'STL, OBJ, 3MF ve STEP dosyalarıyla çalışıyoruz. Dosyanız büyükse WhatsApp sohbetine doğrudan gönderebilirsiniz. Dosyada baskıya engel bir sorun varsa üretime başlamadan size haber veriyoruz.',
  },
  {
    question: 'Üretim ne kadar sürer?',
    answer:
      'Süre parçanın boyutuna, malzemeye ve yoğunluğa göre değişir. Küçük parçalar genelde birkaç gün içinde hazır olur; daha büyük ya da çok adetli işlerde süreyi teklifle birlikte net olarak paylaşıyoruz.',
  },
  {
    question: 'Fiyat nasıl belirleniyor?',
    answer:
      'Fiyat; harcanan malzeme miktarı, baskı süresi, seçilen malzeme ve varsa modelleme işçiliğine göre hesaplanır. Katalogdaki ürünlerin fiyatı bellidir; özel işlerde önce ölçü ve malzeme netleşir, sonra fiyat verilir. Onaylamadan üretime başlamıyoruz.',
  },
  {
    question: 'Ürünümü nasıl teslim alabilirim?',
    answer:
      'Kargo ile gönderiyoruz. Aynı şehirdeyseniz elden teslim de mümkün. Kargo firması ve ücreti konusunda sipariş sırasında anlaşıyoruz.',
  },
  {
    question: 'Özel ölçüde üretim yapıyor musunuz?',
    answer:
      'Evet, işimizin büyük kısmı bu. Katalogdaki bir ürünün ölçüsünü, rengini ya da formunu size göre değiştirebiliriz; sıfırdan bir parça da üretebiliriz. Ölçüleri paylaşmanız yeterli.',
  },
];
