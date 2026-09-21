/* Sitedeki içerik türleri.
   Hem panelden gelen veri hem de yedekteki dosya verisi
   bu şekilleri kullanır. */

export type Product = {
  id: string;
  name: string;
  /** Kartta görünen tek cümlelik tanıtım */
  summary: string;
  /** Detay panelindeki uzun açıklama */
  description: string;
  /** Sayı ya da null (null → "Teklife göre") */
  price: number | null;
  /** Malzeme kodları: PLA, PETG, ABS, TPU, RESIN */
  materials: string[];
  size: string;
  leadTime: string;
  category: string;
  /** Fotoğraf adresleri — ilki kapak görseli olarak kullanılır */
  images: string[];
  imageAlt: string;
};

export type Testimonial = {
  id: string;
  name: string;
  business: string;
  quote: string;
  product: string;
};

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
};
