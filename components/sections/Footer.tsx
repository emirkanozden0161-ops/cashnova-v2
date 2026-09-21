import { siteConfig } from '@/data/siteConfig';
import { hasWhatsApp, whatsappUrl } from '@/lib/whatsapp';
import Logo from '@/components/ui/Logo';

const quickLinks = [
  { href: '#urunler', label: 'Ürünler' },
  { href: '#ozel-uretim', label: 'Özel Üretim' },
  { href: '#malzemeler', label: 'Malzemeler' },
  { href: '#sss', label: 'Sık Sorulanlar' },
];

export default function Footer() {
  const { contact } = siteConfig;

  /* Yalnızca doldurulmuş iletişim bilgileri listelenir.
     Boş olanlar hiç gösterilmez — uydurma bilgi yok. */
  const contactLinks = [
    hasWhatsApp ? { href: whatsappUrl(), label: 'WhatsApp', external: true } : null,
    contact.email ? { href: `mailto:${contact.email}`, label: contact.email, external: false } : null,
    contact.phone ? { href: `tel:${contact.phone.replace(/\s/g, '')}`, label: contact.phone, external: false } : null,
    contact.instagram ? { href: contact.instagram, label: 'Instagram', external: true } : null,
  ].filter(Boolean) as { href: string; label: string; external: boolean }[];

  return (
    <footer className="border-t border-line bg-surface/60">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo className="h-7 w-7" />
            <span className="font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">
              {siteConfig.brand}
            </span>
          </div>
          <p className="mt-4 max-w-[38ch] text-[14px] leading-relaxed text-muted">
            {siteConfig.tagline}
          </p>
          {contact.hours && <p className="mt-5 text-[14px] text-body">{contact.hours}</p>}
          {contact.address && (
            <p className="mt-1.5 max-w-[34ch] text-[13.5px] leading-relaxed text-muted">
              {contact.address}
            </p>
          )}
        </div>

        <nav aria-label="Hızlı bağlantılar">
          <h2 className="text-[12.5px] font-medium text-muted">Hızlı Linkler</h2>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[14px] text-body transition-colors duration-200 hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[12.5px] font-medium text-muted">İletişim</h2>
          {contactLinks.length > 0 ? (
            <ul className="mt-4 space-y-2.5">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-[14px] text-body transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 max-w-[26ch] text-[13.5px] leading-relaxed text-muted">
              İletişim bilgileri ayar dosyasına eklendiğinde burada görünecek.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="shell flex flex-col gap-2 py-6 text-[12.5px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {siteConfig.brand}
          </span>
          <span>Tüm ürünler kendi atölyemizde üretilir.</span>
        </div>
      </div>
    </footer>
  );
}
