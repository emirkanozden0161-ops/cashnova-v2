'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Product } from '@/lib/types';
import { formatPrice, productMessage, whatsappUrl } from '@/lib/whatsapp';
import SmartImage from '@/components/ui/SmartImage';
import { IconClose, IconWhatsApp } from '@/components/ui/Icons';

type Props = {
  product: Product | null;
  onClose: () => void;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ProductModal({ product, onClose }: Props) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [frame, setFrame] = useState(0);

  const open = product !== null;

  // Başka bir ürün açıldığında galeriyi başa sar
  useEffect(() => {
    setFrame(0);
  }, [product?.id]);

  // Escape ile kapat + arka plan kaymasın + odak panelde kalsın
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  const images = product?.images?.length ? product.images : [''];

  const details = product
    ? [
        { label: 'Fiyat', value: formatPrice(product.price) },
        { label: 'Malzeme', value: product.materials.join(', ') || '—' },
        { label: 'Boyut', value: product.size || '—' },
        { label: 'Tahmini üretim', value: product.leadTime || '—' },
      ]
    : [];

  return (
    <AnimatePresence>
      {open && product && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-labelledby="urun-basligi">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          <div className="absolute inset-0 flex items-end justify-center sm:items-center sm:p-6">
            <motion.div
              ref={panelRef}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.99 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-card bg-surface sm:max-w-3xl sm:rounded-card"
            >
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Kapat"
                className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/90 text-body backdrop-blur transition-colors hover:bg-canvas"
              >
                <IconClose />
              </button>

              <div className="grid sm:grid-cols-2">
                {/* --- Fotoğraf galerisi --- */}
                <div className="bg-canvas">
                  <div className="relative aspect-[4/3] w-full sm:aspect-square">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={frame}
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <SmartImage
                          src={images[frame] ?? ''}
                          alt={`${product.name} — ${frame + 1}. fotoğraf`}
                          className="h-full w-full"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {images.length > 1 && (
                      <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[11.5px] text-body backdrop-blur">
                        {frame + 1} / {images.length}
                      </span>
                    )}
                  </div>

                  {images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto p-3">
                      {images.map((src, i) => (
                        <button
                          key={`${src}-${i}`}
                          type="button"
                          onClick={() => setFrame(i)}
                          aria-label={`${i + 1}. fotoğrafı göster`}
                          aria-current={i === frame}
                          className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border transition-all ${
                            i === frame ? 'border-ink' : 'border-line opacity-60 hover:opacity-100'
                          }`}
                        >
                          <SmartImage src={src} alt="" className="h-full w-full" sizes="56px" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* --- Bilgiler --- */}
                <div className="p-6 sm:p-8">
                  {product.category && <p className="text-[12.5px] text-muted">{product.category}</p>}
                  <h2 id="urun-basligi" className="mt-2 text-h2 font-semibold text-ink">
                    {product.name}
                  </h2>

                  {product.description && (
                    <p className="mt-4 text-[15px] leading-relaxed text-muted">{product.description}</p>
                  )}

                  <dl className="mt-7 divide-y divide-line border-y border-line">
                    {details.map((row) => (
                      <div key={row.label} className="flex items-baseline justify-between gap-6 py-3">
                        <dt className="text-[13px] text-muted">{row.label}</dt>
                        <dd className="text-right text-[14px] font-medium text-ink">{row.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <a
                    href={whatsappUrl(productMessage(product.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-accent mt-7 w-full"
                  >
                    <IconWhatsApp className="h-4 w-4" />
                    WhatsApp&apos;tan Sipariş Ver
                  </a>

                  <p className="mt-3 text-center text-[12.5px] leading-relaxed text-muted">
                    Ölçü, renk ve adet konusunda esneğiz. Yazdığınızda birlikte netleştirelim.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
