import Image from 'next/image';
import { siteConfig } from '@/data/siteConfig';

/**
 * Hero görseli.
 *
 * siteConfig.hero.image doldurulduğunda gerçek fotoğraf gösterilir.
 * Boşken yerine stüdyo kurgusunu taklit eden sade bir çizim görünür:
 * tek ürün, sade zemin, yumuşak gölge.
 */
export default function HeroVisual() {
  const { image, imageAlt } = siteConfig.hero;

  if (image) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-line bg-surface sm:aspect-square lg:aspect-[4/5]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[4/5] overflow-hidden rounded-card border border-line bg-gradient-to-b from-[#FBFBFA] to-[#EDEDEA] sm:aspect-square lg:aspect-[4/5]"
      role="img"
      aria-label={imageAlt}
    >
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="hv-body" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#D8D8D3" />
            <stop offset="0.45" stopColor="#FAFAF8" />
            <stop offset="1" stopColor="#C9C9C3" />
          </linearGradient>
          <radialGradient id="hv-floor" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#111111" stopOpacity="0.16" />
            <stop offset="1" stopColor="#111111" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Zemin gölgesi */}
        <ellipse cx="200" cy="392" rx="128" ry="26" fill="url(#hv-floor)" />

        {/* Basılmış vazo formu — katman katman */}
        <g>
          {Array.from({ length: 30 }, (_, i) => {
            const t = i / 29;
            // Vazo silueti: altta geniş, ortada daralan, üstte hafif açılan
            const w = 132 - Math.sin(t * Math.PI * 0.92) * 46 - t * 14;
            const y = 380 - i * 10.4;
            return (
              <rect
                key={i}
                x={200 - w / 2}
                y={y}
                width={w}
                height={7.6}
                rx={2}
                fill="url(#hv-body)"
                stroke="#111111"
                strokeOpacity={0.05}
                strokeWidth="0.6"
              />
            );
          })}
        </g>

        {/* Üst kenarda tek mor hat — markanın vurgusu */}
        <rect x="163" y="61" width="74" height="3" rx="1.5" fill="#8B5CF6" />
      </svg>

      <p className="absolute bottom-5 left-5 right-5 text-[12px] leading-relaxed text-muted">
        Gerçek ürün fotoğrafı buraya gelecek.
        <span className="hidden sm:inline">
          {' '}
          Fotoğrafı eklemek için ayar dosyasındaki <code className="rounded bg-ink/[0.06] px-1">hero.image</code>{' '}
          satırını doldurmanız yeterli.
        </span>
      </p>
    </div>
  );
}
