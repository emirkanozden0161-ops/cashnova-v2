import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/siteConfig';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Yönetim paneli ve arka plan uçları aramaya kapalı
      disallow: ['/yonetim', '/api/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
