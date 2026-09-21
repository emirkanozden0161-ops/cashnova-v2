import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F7F7F5',       // Sayfa arka planı
        surface: '#FFFFFF',      // Kart yüzeyi
        ink: '#111111',          // Koyu bölümler, başlıklar
        'ink-soft': '#1C1C1C',   // İkincil koyu yüzey
        body: '#171717',         // Gövde metni
        muted: '#6B6B6B',        // İkincil metin
        line: '#E5E5E5',         // Çizgi / kenarlık
        accent: '#8B5CF6',       // Vurgu (sadece CTA ve küçük detaylar)
        'accent-hover': '#7C3AED',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Başlıklar: negatif tracking, sıkı satır aralığı
        // 360px'lik ekranda taşmaması için taban 44px; 1200px üstünde 96px.
        hero: ['clamp(2.75rem, 8vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.04em' }],
        h2: ['clamp(2rem, 4.2vw, 3.25rem)', { lineHeight: '1.04', letterSpacing: '-0.032em' }],
        h3: ['clamp(1.25rem, 2vw, 1.625rem)', { lineHeight: '1.18', letterSpacing: '-0.022em' }],
        lead: ['clamp(1.0625rem, 1.5vw, 1.25rem)', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        shell: '1200px',
      },
      borderRadius: {
        card: '24px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(17,17,17,0.04)',
        'card-hover': '0 18px 40px -24px rgba(17,17,17,0.22)',
        float: '0 12px 32px -8px rgba(17,17,17,0.24)',
        nav: '0 1px 0 rgba(17,17,17,0.04)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'layer-rise': {
          '0%': { transform: 'translateY(6px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
