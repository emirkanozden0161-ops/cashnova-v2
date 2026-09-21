'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import { whatsappUrl } from '@/lib/whatsapp';
import { IconArrow, IconWhatsApp } from '@/components/ui/Icons';
import HeroVisual from '@/components/ui/HeroVisual';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero() {
  const reduce = useReducedMotion();
  const { hero } = siteConfig;

  /** Brief'teki giriş sırası: eyebrow 0.4 → başlık 0.6 → metin 0.9 → CTA 1.1 → görsel 1.3 */
  const step = (delay: number, y = 16) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      {/* Arka planda çok hafif katman dokusu — sadece üst bölgede */}
      <div
        className="layer-lines pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-[0.55] [mask-image:linear-gradient(to_bottom,#000,transparent)]"
        aria-hidden="true"
      />

      <div className="shell relative grid items-center gap-12 pb-16 pt-14 sm:pb-20 sm:pt-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pb-28 lg:pt-24">
        <div>
          <motion.p {...step(0.4, 10)} className="eyebrow">
            {hero.eyebrow}
          </motion.p>

          <h1 className="mt-6 text-hero font-semibold text-ink">
            {hero.titleLines.map((line, i) => (
              <motion.span
                key={line}
                {...step(0.6 + i * 0.09, 22)}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p {...step(0.9)} className="mt-7 max-w-[46ch] text-lead text-muted">
            {hero.description}
          </motion.p>

          <motion.div {...step(1.1)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#urunler" className="btn-primary w-full sm:w-auto">
              {hero.primaryCta}
              <IconArrow className="h-4 w-4" />
            </a>
            <a
              href={whatsappUrl('Merhaba, özel üretim için teklif almak istiyorum.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full sm:w-auto"
            >
              <IconWhatsApp className="h-4 w-4 text-accent" />
              {hero.secondaryCta}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.3, ease: EASE }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
