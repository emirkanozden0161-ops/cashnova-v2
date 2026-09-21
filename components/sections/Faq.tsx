'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { faq } from '@/data/faq';
import { IconPlus } from '@/components/ui/Icons';
import Reveal from '@/components/ui/Reveal';

export default function Faq() {
  // Aynı anda tek soru açık kalır — okumayı kolaylaştırır.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="sss" className="scroll-mt-20 py-20 sm:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Sık sorulanlar</p>
            <h2 className="mt-5 text-h2 font-semibold">Merak edilenler.</h2>
            <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-muted">
              Aradığınız cevap yoksa WhatsApp&apos;tan yazın; birkaç dakikada netleştirelim.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="border-t border-line">
            {faq.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.question} className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`sss-${i}`}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span
                        className={`text-[16px] font-medium transition-colors duration-200 sm:text-[17px] ${
                          isOpen ? 'text-ink' : 'text-body'
                        }`}
                      >
                        {item.question}
                      </span>
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 ease-out ${
                          isOpen ? 'rotate-45 border-ink bg-ink text-white' : 'text-muted'
                        }`}
                        aria-hidden="true"
                      >
                        <IconPlus className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`sss-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[62ch] pb-6 pr-10 text-[15px] leading-relaxed text-muted">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
