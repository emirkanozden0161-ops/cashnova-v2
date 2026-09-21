import { siteConfig } from '@/data/siteConfig';
import { faq } from '@/data/faq';

/**
 * Google'ın siteyi doğru anlaması için arka planda gönderilen bilgi.
 * Ziyaretçi bunu görmez; arama sonuçlarında SSS'lerin çıkmasına yardım eder.
 */
export default function StructuredData() {
  const business = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.brand,
    description: siteConfig.description,
    url: siteConfig.url,
    ...(siteConfig.contact.email && { email: siteConfig.contact.email }),
    ...(siteConfig.contact.phone && { telephone: siteConfig.contact.phone }),
    ...(siteConfig.contact.instagram && { sameAs: [siteConfig.contact.instagram] }),
  };

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
