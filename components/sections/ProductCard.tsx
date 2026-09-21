'use client';

import type { Product } from '@/lib/types';
import { formatPrice, productMessage, whatsappUrl } from '@/lib/whatsapp';
import SmartImage from '@/components/ui/SmartImage';
import { IconWhatsApp } from '@/components/ui/Icons';

type Props = {
  product: Product;
  onOpen: (product: Product) => void;
};

export default function ProductCard({ product, onOpen }: Props) {
  return (
    <article className="group card flex h-full flex-col overflow-hidden shadow-card transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-card-hover">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-[#F2F2EF] text-left"
        aria-label={`${product.name} detaylarını aç`}
      >
        <SmartImage
          src={product.images[0] ?? ''}
          alt={product.imageAlt}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {product.images.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[11.5px] text-body backdrop-blur">
            {product.images.length} fotoğraf
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-h3 font-semibold text-ink">{product.name}</h3>
          <span className="shrink-0 pt-1 text-[14px] font-medium tabular-nums text-ink">
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-muted">{product.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Kullanılabilen malzemeler">
          {product.materials.map((code) => (
            <li
              key={code}
              className="rounded-full border border-line px-2.5 py-1 text-[11.5px] text-muted"
            >
              {code}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={() => onOpen(product)} className="btn-outline flex-1 px-5">
            Detayları Gör
          </button>
          <a
            href={whatsappUrl(productMessage(product.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent flex-1 px-5"
          >
            <IconWhatsApp className="h-4 w-4" />
            Sipariş Ver
          </a>
        </div>
      </div>
    </article>
  );
}
