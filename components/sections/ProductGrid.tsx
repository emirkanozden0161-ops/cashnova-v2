'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import Reveal from '@/components/ui/Reveal';

export default function ProductGrid({ products }: { products: Product[] }) {
  const [active, setActive] = useState<Product | null>(null);

  if (products.length === 0) return null;

  return (
    <section id="urunler" className="scroll-mt-20 py-20 sm:py-28">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Ürünler</p>
          <h2 className="mt-5 text-h2 font-semibold">Üretmeye hazırız.</h2>
          <p className="mt-4 text-lead text-muted">
            Günlük kullanım, hediye ve kişiselleştirme için özenle hazırlanan 3D baskı ürünlerini keşfedin.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={Math.min(i, 3) * 0.06} className="h-full">
              <ProductCard product={product} onOpen={setActive} />
            </Reveal>
          ))}
        </div>
      </div>

      <ProductModal product={active} onClose={() => setActive(null)} />
    </section>
  );
}
