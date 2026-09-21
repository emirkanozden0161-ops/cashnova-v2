'use client';

import { useState } from 'react';
import { whatsappUrl } from '@/lib/whatsapp';
import { IconArrow, IconFile, IconIdea } from '@/components/ui/Icons';
import LayerBuild from '@/components/ui/LayerBuild';
import Reveal from '@/components/ui/Reveal';

const options = [
  {
    id: 'model-hazir',
    icon: IconFile,
    title: 'Modelim hazır',
    text: 'STL, OBJ, 3MF veya STEP dosyanızı gönderin. Baskıya engel bir sorun varsa üretime geçmeden size haber veriyoruz.',
    meta: 'STL · OBJ · 3MF · STEP',
    cta: 'Dosyamı Gönder',
    message:
      'Merhaba, hazır bir 3D modelim var. Dosyayı gönderip üretim için teklif almak istiyorum.',
    tone: 'light' as const,
  },
  {
    id: 'fikrim-var',
    icon: IconIdea,
    title: 'Sadece fikrim var',
    text: 'Ne yapmak istediğinizi anlatın, uygun üretim yöntemini birlikte belirleyelim. Bir fotoğraf ya da eskiz bile başlangıç için yeterli.',
    meta: 'Modelleme desteği dahil',
    cta: 'Fikrimi Anlat',
    message:
      'Merhaba, aklımda bir üretim fikri var ama hazır bir 3D modelim yok. Birlikte değerlendirebilir miyiz?',
    tone: 'dark' as const,
  },
];

export default function CustomPrint() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="ozel-uretim" className="scroll-mt-20 py-20 sm:py-28">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Özel üretim</p>
          <h2 className="mt-5 text-h2 font-semibold">Bir fikriniz mi var?</h2>
          <p className="mt-4 text-lead text-muted">
            Modeliniz hazır olsun ya da sadece fikriniz olsun. Üretime birlikte dönüştürelim.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {options.map((option, i) => {
            const Icon = option.icon;
            const isDark = option.tone === 'dark';
            const active = hovered === option.id;

            return (
              <Reveal key={option.id} delay={i * 0.08} className="h-full">
                <div
                  onMouseEnter={() => setHovered(option.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative flex h-full flex-col overflow-hidden rounded-card border p-8 transition-all duration-500 ease-out sm:p-10 ${
                    isDark
                      ? 'border-ink bg-ink text-white hover:-translate-y-1'
                      : 'border-line bg-surface shadow-card hover:-translate-y-1 hover:shadow-card-hover'
                  }`}
                >
                  <LayerBuild active={active} tone={isDark ? 'light' : 'dark'} />

                  <div className="relative">
                    <span
                      className={`inline-grid h-11 w-11 place-items-center rounded-full ${
                        isDark ? 'bg-white/10 text-white' : 'bg-accent/10 text-accent'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <h3
                      className={`mt-7 text-h3 font-semibold ${isDark ? 'text-white' : 'text-ink'}`}
                    >
                      {option.title}
                    </h3>

                    <p
                      className={`mt-3 max-w-[42ch] text-[15px] leading-relaxed ${
                        isDark ? 'text-white/70' : 'text-muted'
                      }`}
                    >
                      {option.text}
                    </p>

                    <p
                      className={`mt-6 text-[12.5px] ${isDark ? 'text-white/45' : 'text-muted'}`}
                    >
                      {option.meta}
                    </p>
                  </div>

                  <div className="relative mt-9 pt-1">
                    <a
                      href={whatsappUrl(option.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn w-full sm:w-auto ${
                        isDark
                          ? 'bg-white text-ink hover:bg-white/90'
                          : 'bg-ink text-white hover:bg-ink-soft'
                      }`}
                    >
                      {option.cta}
                      <IconArrow className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
