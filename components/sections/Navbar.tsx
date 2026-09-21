'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import { whatsappUrl } from '@/lib/whatsapp';
import { IconWhatsApp } from '@/components/ui/Icons';
import Logo from '@/components/ui/Logo';

const links = [
  { href: '#urunler', label: 'Ürünler' },
  { href: '#ozel-uretim', label: 'Özel Üretim' },
  { href: '#nasil-calisir', label: 'Nasıl Çalışır?' },
  { href: '#malzemeler', label: 'Malzemeler' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menü açıkken arka planın kaymasını engelle
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Escape ile kapat
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
          scrolled
            ? 'border-b border-line/80 bg-canvas/80 shadow-nav backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between gap-6" aria-label="Ana menü">
          <a href="#top" className="flex items-center gap-2.5" aria-label={`${siteConfig.brand} — başa dön`}>
            <Logo className="h-7 w-7" />
            <span className="font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">
              {siteConfig.brand}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-[14px] text-muted transition-colors duration-200 hover:bg-ink/[0.04] hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-11 items-center gap-2 rounded-full bg-ink px-5 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-ink-soft sm:inline-flex"
            >
              <IconWhatsApp className="h-4 w-4" />
              WhatsApp&apos;tan Teklif Al
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobil-menu"
              aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface md:hidden"
            >
              <span className="relative block h-[9px] w-[18px]" aria-hidden="true">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-[18px] bg-ink transition-transform duration-300 ease-out ${
                    open ? 'translate-y-[4px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] w-[18px] bg-ink transition-transform duration-300 ease-out ${
                    open ? '-translate-y-[4px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobil-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-line bg-canvas md:hidden"
            >
              <ul className="shell flex flex-col py-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-[52px] items-center border-b border-line/70 text-[17px] text-body"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="pt-4">
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="btn-accent w-full"
                  >
                    <IconWhatsApp className="h-4 w-4" />
                    WhatsApp&apos;tan Teklif Al
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
