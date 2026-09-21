'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';

const steps = [
  {
    no: '01',
    title: 'Seç veya Gönder',
    text: 'Katalogdan bir ürün seçin ya da kendi modelinizi paylaşın.',
  },
  {
    no: '02',
    title: 'Teklifini Al',
    text: 'Malzeme, ölçü ve üretim detaylarını netleştirelim.',
  },
  {
    no: '03',
    title: 'Üretelim',
    text: 'Onay sonrası üretime geçelim ve teslim edelim.',
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);

  // Bölüm ekranda ilerledikçe çizgi dolar
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 65%'],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="nasil-calisir" className="scroll-mt-20 border-y border-line bg-surface/60 py-20 sm:py-28">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Nasıl çalışır?</p>
          <h2 className="mt-5 text-h2 font-semibold">Üç adımda üretim.</h2>
        </Reveal>

        <div ref={ref} className="relative mt-14">
          {/* Zemin çizgisi */}
          <div
            className="absolute left-[15px] top-2 h-[calc(100%-1rem)] w-px bg-line md:left-0 md:top-[15px] md:h-px md:w-full"
            aria-hidden="true"
          />
          {/* Dolan çizgi — mobilde dikey */}
          <motion.div
            className="absolute left-[15px] top-2 w-px bg-accent md:hidden"
            style={{ height: fill }}
            aria-hidden="true"
          />
          {/* Dolan çizgi — masaüstünde yatay */}
          <motion.div
            className="absolute left-0 top-[15px] hidden h-px bg-accent md:block"
            style={{ width: fill }}
            aria-hidden="true"
          />

          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => (
              <li key={step.no} className="relative pl-12 md:pl-0 md:pt-12">
                {/* Nokta */}
                <span
                  className="absolute left-[9px] top-1.5 block h-[13px] w-[13px] rounded-full border-2 border-accent bg-canvas md:left-0 md:top-[9px]"
                  aria-hidden="true"
                />
                <Reveal delay={i * 0.1}>
                  <span className="font-display text-[13px] font-medium tabular-nums text-accent">
                    {step.no}
                  </span>
                  <h3 className="mt-2 text-h3 font-semibold">{step.title}</h3>
                  <p className="mt-2.5 max-w-[34ch] text-[15px] leading-relaxed text-muted">
                    {step.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
