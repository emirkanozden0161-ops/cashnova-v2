'use client';

import { useCallback, useEffect, useState } from 'react';
import { getBrowserClient, supabaseReady } from '@/lib/supabase';
import { siteConfig } from '@/data/siteConfig';
import Logo from '@/components/ui/Logo';
import ProductManager from './ProductManager';
import TestimonialManager from './TestimonialManager';
import GalleryManager from './GalleryManager';
import { Card, Spinner, Toast, inputClass } from './ui';

type Tab = 'urunler' | 'yorumlar' | 'galeri';

const tabs: { id: Tab; label: string }[] = [
  { id: 'urunler', label: 'Ürünler' },
  { id: 'yorumlar', label: 'Yorumlar' },
  { id: 'galeri', label: 'Galeri' },
];

export default function AdminApp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [working, setWorking] = useState(false);
  const [tab, setTab] = useState<Tab>('urunler');
  const [toast, setToast] = useState<{ message: string; tone: 'ok' | 'error' } | null>(null);

  const notify = useCallback((message: string, tone: 'ok' | 'error' = 'ok') => {
    setToast({ message, tone });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3600);
    return () => clearTimeout(t);
  }, [toast]);

  // Daha önce giriş yapılmışsa oturumu sürdür
  useEffect(() => {
    const supabase = getBrowserClient();
    if (!supabase) {
      setSignedIn(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSignedIn(Boolean(data.session));
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session));
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  /** Kaydetme sonrası siteyi tazeler, değişiklik anında görünsün */
  const refreshSite = useCallback(() => {
    void fetch('/api/yenile', { method: 'POST' }).catch(() => {
      /* Tazeleme başarısız olsa bile veri kaydedildi; en geç 1 dakikada görünür. */
    });
  }, []);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getBrowserClient();
    if (!supabase) return;

    setWorking(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setWorking(false);

    if (error) {
      notify('E-posta veya şifre hatalı.', 'error');
      return;
    }
    setPassword('');
  }

  async function signOut() {
    const supabase = getBrowserClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    notify('Çıkış yapıldı.');
  }

  /* ---- Kurulum tamamlanmamışsa ---- */
  if (!supabaseReady) {
    return (
      <div className="mx-auto flex min-h-screen max-w-xl items-center px-5 py-16">
        <Card>
          <h1 className="font-display text-[22px] font-semibold text-ink">Kurulum tamamlanmamış</h1>
          <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
            Yönetim panelinin çalışması için veritabanı bağlantı bilgileri gerekiyor. Proje
            klasöründeki <code className="rounded bg-ink/[0.06] px-1.5 py-0.5">.env.local</code>{' '}
            dosyasına iki satırı eklemeniz yeterli.
          </p>
          <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
            Adımların tamamı <code className="rounded bg-ink/[0.06] px-1.5 py-0.5">KURULUM.md</code>{' '}
            dosyasında anlatılıyor.
          </p>
          <p className="mt-5 text-[13px] text-muted">
            Bu arada site çalışmaya devam ediyor; yedekteki ürünleri gösteriyor.
          </p>
        </Card>
      </div>
    );
  }

  /* ---- Oturum kontrol ediliyor ---- */
  if (signedIn === null) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-2 text-[14px] text-muted">
        <Spinner /> Yükleniyor…
      </div>
    );
  }

  /* ---- Giriş ekranı ---- */
  if (!signedIn) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md items-center px-5 py-16">
        <Card className="w-full">
          <div className="flex items-center gap-2.5">
            <Logo className="h-7 w-7" />
            <span className="font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">
              {siteConfig.brand}
            </span>
          </div>

          <h1 className="mt-6 font-display text-[22px] font-semibold text-ink">Yönetim paneli</h1>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            Ürünleri, yorumları ve atölye fotoğraflarını buradan yönetirsiniz.
          </p>

          <form onSubmit={signIn} className="mt-7 space-y-4">
            <div>
              <label htmlFor="eposta" className="block text-[14px] font-medium text-ink">
                E-posta
              </label>
              <input
                id="eposta"
                type="email"
                autoComplete="username"
                required
                className={`${inputClass} mt-2`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="sifre" className="block text-[14px] font-medium text-ink">
                Şifre
              </label>
              <input
                id="sifre"
                type="password"
                autoComplete="current-password"
                required
                className={`${inputClass} mt-2`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" disabled={working} className="btn-accent w-full disabled:opacity-60">
              {working && <Spinner />}
              Giriş yap
            </button>
          </form>

          <p className="mt-6 text-[12.5px] leading-relaxed text-muted">
            Şifrenizi unuttuysanız Supabase panelinden sıfırlayabilirsiniz.
          </p>
        </Card>

        {toast && <Toast message={toast.message} tone={toast.tone} />}
      </div>
    );
  }

  /* ---- Panel ---- */
  return (
    <div className="min-h-screen bg-canvas pb-24">
      <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <Logo className="h-7 w-7" />
            <span className="font-display text-[16px] font-semibold tracking-[-0.02em] text-ink">
              Yönetim
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] rounded-full border border-line px-4 text-[13px] leading-[44px] text-body"
            >
              Siteyi gör
            </a>
            <button
              type="button"
              onClick={() => void signOut()}
              className="min-h-[44px] rounded-full border border-line px-4 text-[13px] text-body"
            >
              Çıkış
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-5 pb-3">
          <div className="flex gap-1.5" role="tablist">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`min-h-[44px] flex-1 rounded-full px-4 text-[14px] transition-colors sm:flex-none ${
                  tab === t.id ? 'bg-ink text-white' : 'border border-line text-body'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-7">
        {tab === 'urunler' && <ProductManager notify={notify} onSaved={refreshSite} />}
        {tab === 'yorumlar' && <TestimonialManager notify={notify} onSaved={refreshSite} />}
        {tab === 'galeri' && <GalleryManager notify={notify} onSaved={refreshSite} />}
      </main>

      {toast && <Toast message={toast.message} tone={toast.tone} />}
    </div>
  );
}
