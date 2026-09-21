import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/* ============================================================
   Supabase bağlantısı.

   Adresi ve anahtarı .env.local dosyasından okur.
   Henüz kurulum yapılmadıysa null döner; site bu durumda
   data/ klasöründeki yedek içerikle çalışmaya devam eder.
   ============================================================ */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Kurulum tamamlandı mı? */
export const supabaseReady = Boolean(url && anonKey);

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
