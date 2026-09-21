import Image from 'next/image';

type Props = {
  /** Fotoğraf bağlantısı. Boşsa yerine sade bir çizim gösterilir. */
  src: string;
  alt: string;
  /** Yer tutucu üzerinde görünecek kısa etiket */
  label?: string;
  className?: string;
  /** Tarayıcıya hangi genişlikte yükleyeceğini söyler (performans) */
  sizes?: string;
  priority?: boolean;
};

/**
 * Gerçek fotoğraf geldiğinde tek satır değiştirmek yeterli olsun diye
 * yazılmış görsel bileşeni.
 *
 * - src doluysa  → Next.js'in optimize ettiği <Image> (AVIF/WebP, lazy load)
 * - src boşsa    → katman çizgilerinden oluşan sade bir yer tutucu
 *
 * Her iki durumda da alan aynı oranı kapladığı için sayfa zıplamaz.
 */
export default function SmartImage({
  src,
  alt,
  label,
  className = '',
  sizes = '(max-width: 768px) 100vw, 33vw',
  priority = false,
}: Props) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-[#EFEFEC] ${className}`}
      role="img"
      aria-label={alt}
    >
      {/* Katman çizgileri */}
      <div className="layer-lines absolute inset-0 opacity-70" aria-hidden="true" />

      {/* Basılmış bir parçayı anlatan sade siluet */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <g transform="translate(100 118)">
          {Array.from({ length: 9 }, (_, i) => {
            const w = 74 - Math.abs(i - 3) * 7;
            return (
              <rect
                key={i}
                x={-w / 2}
                y={-i * 9}
                width={w}
                height={6}
                rx={1.5}
                fill="#111111"
                fillOpacity={0.05 + i * 0.012}
              />
            );
          })}
        </g>
        {/* Zemin gölgesi */}
        <ellipse cx="100" cy="126" rx="46" ry="5" fill="#111111" fillOpacity="0.05" />
      </svg>

      {label && (
        <span className="absolute inset-x-0 bottom-0 p-4 text-[11px] leading-snug text-muted">
          {label}
        </span>
      )}
    </div>
  );
}
