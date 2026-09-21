import { hasWhatsApp } from '@/lib/whatsapp';

/**
 * Yalnızca geliştirme modunda (npm run dev) görünen hatırlatma.
 * Yayındaki sitede asla gösterilmez.
 *
 * Amacı: WhatsApp numarası girilmeden siteyi yayına almayı unutmayın.
 */
export default function SetupNotice() {
  if (process.env.NODE_ENV === 'production') return null;
  if (hasWhatsApp) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[80] max-w-[320px] rounded-2xl border border-accent/30 bg-white p-4 shadow-float">
      <p className="text-[13px] font-medium text-ink">WhatsApp numarası henüz girilmedi</p>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
        Butonlar şu an sipariş alamıyor. <code className="rounded bg-ink/[0.06] px-1">data/siteConfig.ts</code>{' '}
        dosyasındaki <code className="rounded bg-ink/[0.06] px-1">WHATSAPP_NUMBER</code> satırını doldurun.
      </p>
      <p className="mt-2 text-[12px] text-muted">Bu not sadece siz geliştirirken görünür.</p>
    </div>
  );
}
