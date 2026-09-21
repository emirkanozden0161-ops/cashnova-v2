import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * Yönetim panelinde bir kayıt yapıldığında çağrılır.
 * Ana sayfanın önbelleğini temizler, böylece değişiklik
 * bir dakika beklemeden anında görünür.
 */
export async function POST() {
  revalidatePath('/');
  return NextResponse.json({ ok: true });
}
