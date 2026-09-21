import type { Testimonial } from '@/lib/types';
import Reveal from '@/components/ui/Reveal';

/**
 * Müşteri yorumları.
 *
 * Yorumlar /yonetim panelinden eklenir. Hiç yorum yokken bu bölüm
 * ziyaretçiye HİÇ gösterilmez — boş bir başlık kalmaz, uydurma
 * yorum da yayınlanmaz.
 */
export default function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;

  return (
    <section id="yorumlar" className="scroll-mt-20 py-20 sm:py-28">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Referanslar</p>
          <h2 className="mt-5 text-h2 font-semibold">Bizimle çalışanlar.</h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i, 3) * 0.06} className="h-full">
              <figure className="card flex h-full flex-col p-7 shadow-card">
                <blockquote className="flex-1 text-[15px] leading-relaxed text-body">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-5">
                  <span className="block text-[14px] font-medium text-ink">{item.name}</span>
                  {item.business && (
                    <span className="mt-0.5 block text-[13px] text-muted">{item.business}</span>
                  )}
                  {item.product && (
                    <span className="mt-2 inline-block rounded-full bg-canvas px-2.5 py-1 text-[12px] text-muted">
                      {item.product}
                    </span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
