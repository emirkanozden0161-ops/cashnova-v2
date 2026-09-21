/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Ürün fotoğraflarını dışarıdan (Cloudinary, imgbb vb.) bağlantıyla
    // kullanabilmeniz için tüm https kaynaklarına izin veriyoruz.
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default nextConfig;
