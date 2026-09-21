'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { materials, ratingLabels } from '@/data/materials';
import Reveal from '@/components/ui/Reveal';

export default function Materials() {
  const [active, setActive] = useState(materials[0].code);
  const current = materials.find((m) => m.code === active) ?? materials[0];

  return (
    <section id="malzemeler" className="scroll-mt-20 py-20 sm:py-28">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Malzemeler</p>
          <h2 className="mt-5 text-h2 font-semibold">Doğru malzeme, uzun ömür.</h2>
          <p className="mt-4 text-lead text-muted">
            Parçanın nerede kullanılacağı malzemeyi belirler. Emin değilseniz kullanım yerini yazın,
            birlikte seçelim.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-10">
          {/* Seçim: mobilde yatay kaydırma, masaüstünde dikey liste */}
          <div
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
            role="tablist"
            aria-label="Malzeme seçimi"
          >
            {materials.map((m) => {
              const isActive = m.code === active;
              return (
                <button
                  key={m.code}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="malzeme-detay"
                  onClick={() => setActive(m.code)}
                  className={`relative shrink-0 rounded-2xl border px-5 py-3.5 text-left transition-colors duration-300 lg:w-full ${
                    isActive
                      ? 'border-ink/15 bg-surface shadow-card'
                      : 'border-line bg-transparent hover:border-ink/15 hover:bg-surface/60'
                  }`}
                >
                  <span
                    className={`block text-[15px] font-medium ${isActive ? 'text-ink' : 'text-body'}`}
                  >
                    {m.name}
                  </span>
                  <span className="mt-0.5 hidden text-[12.5px] leading-snug text-muted lg:block">
                    {m.positioning}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="malzeme-imleci"
                      className="absolute -left-px bottom-3 top-3 hidden w-[2px] rounded-full bg-accent lg:block"
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div id="malzeme-detay" role="tabpanel" className="card p-7 sm:p-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.code}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="text-h3 font-semibold">{current.name}</h3>
                  <span className="text-[13.5px] text-accent">{current.positioning}</span>
                </div>

                <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-muted">
                  {current.description}
                </p>

                <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                  {ratingLabels.map((row) => {
                    const score = current.ratings[row.key];
                    return (
                      <div key={row.key} className="flex items-center justify-between gap-4">
                        <dt className="text-[13.5px] text-body">{row.label}</dt>
                        <dd className="flex gap-1" aria-label={`5 üzerinden ${score}`}>
                          {[1, 2, 3, 4, 5].map((n) => (
                            <span
                              key={n}
                              className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${
                                n <= score ? 'bg-ink' : 'bg-line'
                              }`}
                            />
                          ))}
                        </dd>
                      </div>
                    );
                  })}
                </dl>

                <div className="mt-8 border-t border-line pt-6">
                  <p className="text-[12.5px] text-muted">Tipik kullanım</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {current.uses.map((use) => (
                      <li
                        key={use}
                        className="rounded-full bg-canvas px-3 py-1.5 text-[13px] text-body"
                      >
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-6 max-w-[70ch] text-[12.5px] leading-relaxed text-muted">
          Puanlar malzemeleri birbiriyle karşılaştırmak için verilmiştir; laboratuvar ölçümü değildir.
          Kullanım koşullarınıza göre önerimiz değişebilir.
        </p>
      </div>
    </section>
  );
}
