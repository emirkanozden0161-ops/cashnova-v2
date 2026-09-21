import type { GalleryItem } from '@/lib/types';

/* ============================================================
   YEDEK GALERİ

   "Üretimden kareler" bölümündeki atölye fotoğrafları artık
   /yonetim panelinden yükleniyor.

   Buradaki dört kare yalnızca panel kurulmadan önce yerlerini
   tutar; fotoğrafsız olduklarında sade bir çizim görünür.
   ============================================================ */

export const seedGallery: GalleryItem[] = [
  {
    id: 'seed-1',
    src: '',
    alt: 'Baskı sırasında nozülün parçanın üzerinde ilerleyişi',
    caption: 'Baskı sürüyor',
  },
  {
    id: 'seed-2',
    src: '',
    alt: 'Atölyedeki filament makaraları',
    caption: 'Malzeme rafı',
  },
  {
    id: 'seed-3',
    src: '',
    alt: 'Baskısı tamamlanmış parçanın tabladan alınışı',
    caption: 'Tabladan çıkış',
  },
  {
    id: 'seed-4',
    src: '',
    alt: 'Tamamlanmış ürünün kargo için paketlenmesi',
    caption: 'Paketleme',
  },
];
