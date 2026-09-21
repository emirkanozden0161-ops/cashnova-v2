import Reveal from '@/components/ui/Reveal';

const reasons = [
  {
    title: 'Detay Odaklı Üretim',
    text: 'Her baskı, kargoya verilmeden önce elden geçiyor. Yüzeyde iz, ölçüde sapma ya da eksik bir detay varsa parça tekrar basılıyor.',
  },
  {
    title: 'İhtiyaca Özel Çözümler',
    text: 'Katalogdaki bir ürünün ölçüsünü değiştirmek de, sıfırdan bir parça üretmek de aynı işin parçası. Elinizde model olmasa da başlayabiliyoruz.',
  },
  {
    title: 'Kaliteli Malzemeler',
    text: 'Parçanın nerede kullanılacağına göre malzeme seçiyoruz. Ucuz olduğu için değil, o iş için doğru olduğu için.',
  },
  {
    title: 'Kolay İletişim',
    text: 'Form doldurup cevap beklemiyorsunuz. Tek bir WhatsApp sohbetinde ölçü konuşuluyor, fiyat netleşiyor, üretim başlıyor.',
  },
];

export default function WhyCashnova() {
  return (
    <section className="border-y border-line bg-surface/60 py-20 sm:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Neden Cashnova?</p>
            <h2 className="mt-5 text-h2 font-semibold">
              İşini ciddiye alan bir atölyeyle çalışmak.
            </h2>
            <p className="mt-5 max-w-[38ch] text-[15px] leading-relaxed text-muted">
              Küçük bir parça da, elli adetlik bir iş de aynı özenle üretiliyor.
            </p>
          </div>
        </Reveal>

        <div className="divide-y divide-line border-t border-line">
          {reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 0.06}>
              <div className="grid grid-cols-[auto_1fr] gap-x-6 py-7 sm:gap-x-10">
                <span className="font-display text-[13px] font-medium tabular-nums text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-h3 font-semibold">{reason.title}</h3>
                  <p className="mt-2.5 max-w-[52ch] text-[15px] leading-relaxed text-muted">
                    {reason.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
