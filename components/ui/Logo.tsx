/**
 * Cashnova işareti — üst üste binen baskı katmanları.
 * Kendi logonuz geldiğinde bu dosyanın içeriğini değiştirmeniz yeterli.
 */
export default function Logo({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
      <rect width="28" height="28" rx="8" fill="#111111" />
      {[0, 1, 2, 3].map((i) => {
        const w = 14 - i * 2.4;
        return (
          <rect
            key={i}
            x={(28 - w) / 2}
            y={18 - i * 3.4}
            width={w}
            height="2.2"
            rx="1"
            fill={i === 3 ? '#8B5CF6' : '#FFFFFF'}
            fillOpacity={i === 3 ? 1 : 0.35 + i * 0.16}
          />
        );
      })}
    </svg>
  );
}
