import { getServerClient } from './supabase';
import type { GalleryItem, Product, Testimonial } from './types';
import { seedProducts } from '@/data/products';
import { seedTestimonials } from '@/data/testimonials';
import { seedGallery } from '@/data/gallery';

/* ============================================================
   Sitenin içeriğini getiren katman.

   Önce yönetim panelinin veritabanına bakar.
   Kurulum yapılmamışsa ya da bağlantı kurulamazsa
   data/ klasöründeki yedek içeriği kullanır.
   Yani site her hâlükârda ayakta kalır.
   ============================================================ */

type ProductRow = {
  id: string;
  name: string;
  summary: string | null;
  description: string | null;
  price: number | string | null;
  materials: string[] | null;
  size: string | null;
  lead_time: string | null;
  category: string | null;
  images: string[] | null;
  image_alt: string | null;
};

type TestimonialRow = {
  id: string;
  name: string;
  business: string | null;
  quote: string;
  product: string | null;
};

type GalleryRow = {
  id: string;
  src: string | null;
  alt: string | null;
  caption: string | null;
};

export async function getProducts(): Promise<Product[]> {
  const supabase = getServerClient();
  if (!supabase) return seedProducts;

  try {
    const { data, error } = await supabase
      .from('products')
      .select('id,name,summary,description,price,materials,size,lead_time,category,images,image_alt')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) return seedProducts;

    return (data as ProductRow[]).map((row) => ({
      id: row.id,
      name: row.name,
      summary: row.summary ?? '',
      description: row.description ?? '',
      price: row.price === null || row.price === undefined ? null : Number(row.price),
      materials: row.materials ?? [],
      size: row.size ?? '',
      leadTime: row.lead_time ?? '',
      category: row.category ?? '',
      images: (row.images ?? []).filter(Boolean),
      imageAlt: row.image_alt || row.name,
    }));
  } catch {
    return seedProducts;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = getServerClient();
  if (!supabase) return seedTestimonials;

  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('id,name,business,quote,product')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    // Boş liste geçerli bir sonuçtur: henüz gerçek yorum yok demektir.
    if (error || !data) return seedTestimonials;

    return (data as TestimonialRow[]).map((row) => ({
      id: row.id,
      name: row.name,
      business: row.business ?? '',
      quote: row.quote,
      product: row.product ?? '',
    }));
  } catch {
    return seedTestimonials;
  }
}

export async function getGallery(): Promise<GalleryItem[]> {
  const supabase = getServerClient();
  if (!supabase) return seedGallery;

  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('id,src,alt,caption')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) return seedGallery;

    return (data as GalleryRow[]).map((row) => ({
      id: row.id,
      src: row.src ?? '',
      alt: row.alt ?? '',
      caption: row.caption ?? '',
    }));
  } catch {
    return seedGallery;
  }
}
