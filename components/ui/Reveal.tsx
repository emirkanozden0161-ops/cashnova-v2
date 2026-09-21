'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Saniye cinsinden gecikme */
  delay?: number;
  /** Aşağıdan kaç piksel yükselerek gelsin */
  y?: number;
  className?: string;
};

/**
 * Bölümleri kaydırdıkça bir kez, yumuşakça getirir.
 * Hareket azaltma ayarı açıksa animasyon uygulanmaz.
 */
export default function Reveal({ children, delay = 0, y = 20, className }: Props) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
