import { siteConfig } from '@/data/siteConfig';
import { iconMap, type IconName } from '@/components/ui/Icons';
import Reveal from '@/components/ui/Reveal';

/**
 * Hero altındaki ince güven şeridi.
 * Bilerek rakam içermez — doğrulanamayan sayı vermektense
 * ne yaptığımızı söylemek daha güvenilir.
 */
export default function TrustBar() {
  return (
    <section className="border-y border-line bg-surface/60">
      <Reveal className="shell">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 py-7 md:grid-cols-4">
          {siteConfig.trustBar.map((item) => {
            const Icon = iconMap[item.icon as IconName];
            return (
              <li key={item.label} className="flex items-center gap-3">
                <Icon className="h-[18px] w-[18px] shrink-0 text-accent" />
                <span className="text-[14px] leading-snug text-body">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
