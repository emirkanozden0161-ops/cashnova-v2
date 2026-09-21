'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { whatsappUrl } from '@/lib/whatsapp';
import { IconWhatsApp } from '@/components/ui/Icons';

/**
 * Sağ altta sabit duran WhatsApp butonu.
 * Sayfanın en üstündeyken gizlidir; hero'daki butonlarla yarışmaz.
 */
export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05 }}
          aria-label="WhatsApp'tan teklif al"
          className="group fixed bottom-5 right-5 z-[60] flex h-[54px] w-[54px] items-center justify-center rounded-full bg-accent text-white shadow-float transition-colors duration-300 hover:bg-accent-hover sm:bottom-7 sm:right-7 sm:h-14 sm:w-14"
        >
          <IconWhatsApp className="h-6 w-6" />

          {/* Masaüstünde yanında beliren etiket */}
          <span className="pointer-events-none absolute right-[calc(100%+12px)] hidden whitespace-nowrap rounded-full bg-ink px-3.5 py-2 text-[13px] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block">
            Teklif Al
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
