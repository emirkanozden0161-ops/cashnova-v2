'use client';

import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  /** Kart üzerine gelindiğinde true olur */
  active: boolean;
  /** Koyu kart üzerinde açık çizgi, açık kart üzerinde koyu çizgi */
  tone?: 'dark' | 'light';
};

const LINES = 16;

/**
 * Özel üretim kartlarındaki imza etkileşimi.
 *
 * Fare kartın üzerine geldiğinde ince çizgiler alttan yukarı doğru
 * sırayla belirir — bir parçanın katman katman basılışını anlatır.
 * Çok yavaş ve çok ince; dikkat dağıtmaz.
 */
export default function LayerBuild({ active, tone = 'dark' }: Props) {
  const reduce = useReducedMotion();
  const color = tone === 'dark' ? 'bg-ink' : 'bg-white';

  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-28 flex-col-reverse justify-start gap-[5px] px-8 pb-8" aria-hidden="true">
      {Array.from({ length: LINES }, (_, i) => (
        <motion.span
          key={i}
          className={`block h-px w-full origin-left ${color}`}
          initial={false}
          animate={{
            opacity: active ? 0.03 + (LINES - i) * 0.011 : 0,
            scaleX: active ? 1 : 0.15,
          }}
          transition={{
            duration: 0.7,
            delay: active ? i * 0.045 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  );
}
