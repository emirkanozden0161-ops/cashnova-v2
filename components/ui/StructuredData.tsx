import { siteConfig } from '@/data/siteConfig';
import { faq } from '@/data/faq';

/**
 * Google'ın siteyi doğru anlaması için arka planda gönderilen bilgi.
 * Ziyaretçi bunu görmez; arama sonuçlarında SSS'lerin çıkmasına yardım eder.
 */
export default function StructuredData() {
  /* Yalnızca doldurulmuş iletişim bilgileri eklenir. */
  const business: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.brand,
    description: siteConfig.description,
    url: siteConfig.url,
  };

  if (siteConfig.contact.email) business.email = siteConfig.contact.email;
  if (siteConfig.contact.phone) business.telephone = siteConfig.contact.phone;
  if (siteConfig.contact.instagram) business.sameAs = [siteConfig.contact.instagram];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
