import { whatsappUrl } from '@/lib/whatsapp';
import { IconWhatsApp } from '@/components/ui/Icons';
import Reveal from '@/components/ui/Reveal';

export default function FinalCta() {
  return (
    <section id="iletisim" className="scroll-mt-20 px-5 pb-20 pt-4 sm:px-8 sm:pb-28">
      <Reveal>
        <div className="relative mx-auto max-w-shell overflow-hidden rounded-card bg-ink px-6 py-20 text-center sm:px-10 sm:py-28">
          {/* Çok hafif katman dokusu — gradient yok */}
          <div
            className="layer-lines-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(75%_70%_at_50%_100%,#000,transparent)]"
            aria-hidden="true"
          />

          <div className="relative">
            <h2 className="mx-auto max-w-[18ch] text-h2 font-semibold text-white">
              Fikrinizi üretime dönüştürelim.
            </h2>
            <p className="mx-auto mt-5 max-w-[46ch] text-lead text-white/65">
              Modeliniz hazır olsun ya da sadece bir fikriniz olsun. Bize anlatın.
            </p>

            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent mt-10 px-8"
            >
              <IconWhatsApp className="h-[18px] w-[18px]" />
              WhatsApp&apos;tan Teklif Al
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
