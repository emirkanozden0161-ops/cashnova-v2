import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/* ============================================================
   Supabase bağlantısı.

   Adresi ve anahtarı .env.local dosyasından okur.
   Henüz kurulum yapılmadıysa null döner; site bu durumda
   data/ klasöründeki yedek içerikle çalışmaya devam eder.
   ============================================================ */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/^["']|["']$/g, '');
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim().replace(/^["']|["']$/g, '');

/** Adres gerçekten https://... biçiminde mi? */
function isValidUrl(value: string | undefined): boolean {
  if (!value) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Kurulum tamamlandı mı?
 *
 * Adres yanlış yazılmışsa burada yakalanır ve site yedek içerikle
 * çalışmaya devam eder. Yanlış bir satır yüzünden sitenin tamamının
 * çökmesini engeller.
 */
export const supabaseReady = Boolean(isValidUrl(url) && anonKey);

/** Adres yazılmış ama biçimi bozuksa true — panelde uyarı göstermek için */
export const supabaseUrlBroken = Boolean(url && !isValidUrl(url));

/** Fotoğrafların yüklendiği depo adı (schema.sql ile aynı olmalı) */
export const BUCKET = 'gorseller';

let browserClient: SupabaseClient | null = null;

/**
 * Tarayıcı tarafı bağlantı (yönetim paneli için).
 * Oturum bilgisini tarayıcıda saklar, böylece sayfa
 * yenilendiğinde tekrar giriş istemez.
 */
export function getBrowserClient(): SupabaseClient | null {
  if (!supabaseReady) return null;
  if (!browserClient) {
    browserClient = createClient(url as string, anonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
  }
  return browserClient;
}

/**
 * Sunucu tarafı bağlantı (sitenin içeriğini okumak için).
 * Oturum saklamaz; yalnızca herkese açık veriyi okur.
 */
export function getServerClient(): SupabaseClient | null {
  if (!supabaseReady) return null;
  return createClient(url as string, anonKey as string, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
