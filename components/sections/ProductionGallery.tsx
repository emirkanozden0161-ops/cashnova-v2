import type { GalleryItem } from '@/lib/types';
import SmartImage from '@/components/ui/SmartImage';
import Reveal from '@/components/ui/Reveal';

/** Editorial yerleşim: büyük — küçük / küçük — büyük */
const spans = ['lg:col-span-8', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-8'];

export default function ProductionGallery({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) return null;

  return (
    <section id="uretim" className="scroll-mt-20 py-20 sm:py-28">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Atölye</p>
          <h2 className="mt-5 text-h2 font-semibold">Üretimden kareler.</h2>
          <p className="mt-4 text-lead text-muted">
            Ürünler stoktan değil, tek tek buradan çıkıyor.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i, 3) * 0.07} className={spans[i % spans.length]}>
              <figure className="overflow-hidden rounded-card border border-line bg-surface">
                <SmartImage
                  src={item.src}
                  alt={item.alt || item.caption}
                  label={item.src ? undefined : 'Gerçek atölye fotoğrafı buraya gelecek'}
                  className="aspect-[16/10] w-full"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                {item.caption && (
                  <figcaption className="border-t border-line px-5 py-3.5 text-[13px] text-muted">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
