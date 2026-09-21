import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from '@/data/siteConfig';

/** Numara girilmiş mi? (Sitede uyarı göstermek için kullanılır) */
export const hasWhatsApp = WHATSAPP_NUMBER.replace(/\D/g, '').length >= 10;

/**
 * WhatsApp bağlantısı üretir.
 * Numara henüz girilmemişse bağlantı yerine sayfa içi iletişim
 * bölümüne yönlendirir; böylece site kırık link göstermez.
 */
export function whatsappUrl(message: string = WHATSAPP_MESSAGE): string {
  const number = WHATSAPP_NUMBER.replace(/\D/g, '');
  if (!hasWhatsApp) return '#iletisim';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Ürün sipariş mesajı — brief'teki sabit format */
export function productMessage(productName: string): string {
  return `Merhaba, ${productName} hakkında bilgi almak ve sipariş vermek istiyorum.`;
}

/** Fiyatı okunur hâle getirir; fiyat yoksa "Teklife göre" döner. */
export function formatPrice(price: number | null): string {
  if (price === null || Number.isNaN(price)) return 'Teklife göre';
  return `${price.toLocaleString('tr-TR')} TL`;
}
