'use client';

import { useRef, useState } from 'react';
import { BUCKET, getBrowserClient } from '@/lib/supabase';
import { Spinner } from './ui';

type Props = {
  /** Mevcut fotoğraf adresleri */
  images: string[];
  onChange: (next: string[]) => void;
  /** Tek fotoğraflık alanlarda true (galeri kareleri gibi) */
  single?: boolean;
  onError?: (message: string) => void;
};

/** Dosya adını güvenli hâle getirir (Türkçe karakter ve boşluk temizlenir) */
function safeName(name: string): string {
  const map: Record<string, string> = {
    ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u',
    Ç: 'c', Ğ: 'g', İ: 'i', Ö: 'o', Ş: 's', Ü: 'u',
  };
  const clean = name
    .split('')
    .map((ch) => map[ch] ?? ch)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/-+/g, '-');
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${clean}`;
}

/**
 * Telefondan ya da bilgisayardan fotoğraf yükler.
 * Yüklenen dosya Supabase deposuna gider, adresi listeye eklenir.
 */
export default function ImageUploader({ images, onChange, single = false, onError }: Props) {
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(files: FileList | null) {
    if (!files || files.length === 0) return;
    const supabase = getBrowserClient();
    if (!supabase) {
      onError?.('Bağlantı kurulamadı. Kurulum adımlarını tamamlayın.');
      return;
    }

    setBusy(true);
    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) {
        onError?.(`"${file.name}" bir fotoğraf değil, atlandı.`);
        continue;
      }
      if (file.size > 8 * 1024 * 1024) {
        onError?.(`"${file.name}" 8 MB'tan büyük. Lütfen daha küçük bir fotoğraf seçin.`);
        continue;
      }

      const path = safeName(file.name);
      const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: '31536000',
        upsert: false,
      });

      if (error) {
        onError?.(`Yüklenemedi: ${error.message}`);
        continue;
      }

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      if (data?.publicUrl) uploaded.push(data.publicUrl);
    }

    setBusy(false);
    if (uploaded.length === 0) return;
    onChange(single ? [uploaded[0]] : [...images, ...uploaded]);
  }

  function move(from: number, to: number) {
    if (to < 0 || to >= images.length) return;
    const next = [...images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          void upload(e.dataTransfer.files);
        }}
        className={`rounded-xl border border-dashed px-5 py-7 text-center transition-colors ${
          dragging ? 'border-accent bg-accent/5' : 'border-line bg-canvas/60'
        }`}
      >
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="btn-primary min-h-[48px] px-6 text-[14px] disabled:opacity-60"
        >
          {busy ? (
            <>
              <Spinner /> Yükleniyor…
            </>
          ) : single ? (
            'Fotoğraf seç'
          ) : (
            'Fotoğraf ekle'
          )}
        </button>

        <p className="mt-3 text-[12.5px] leading-relaxed text-muted">
          {single
            ? 'Telefondan çekip doğrudan yükleyebilirsiniz.'
            : 'Birden fazla seçebilirsiniz. İlk fotoğraf kapak olur.'}
          <br />
          JPG veya PNG, en fazla 8 MB.
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={!single}
          className="hidden"
          onChange={(e) => {
            void upload(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      {images.length > 0 && (
        <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((src, i) => (
            <li
              key={`${src}-${i}`}
              className="group relative aspect-square overflow-hidden rounded-xl border border-line bg-canvas"
            >
              {/* Panel içi önizleme: optimize edilmemiş etiket yeterli */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />

              {i === 0 && !single && (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-ink px-2 py-0.5 text-[10px] font-medium text-white">
                  Kapak
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-ink/85 px-1.5 py-1.5">
                {!single ? (
                  <>
                    <button
                      type="button"
                      onClick={() => move(i, i - 1)}
                      aria-label="Öne al"
                      className="min-h-[28px] px-2 text-[15px] leading-none text-white/80 hover:text-white"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() => onChange(images.filter((_, x) => x !== i))}
                      className="min-h-[28px] px-2 text-[11px] text-white/80 hover:text-white"
                    >
                      Kaldır
                    </button>
                    <button
                      type="button"
                      onClick={() => move(i, i + 1)}
                      aria-label="Geriye al"
                      className="min-h-[28px] px-2 text-[15px] leading-none text-white/80 hover:text-white"
                    >
                      ›
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => onChange([])}
                    className="mx-auto min-h-[28px] px-2 text-[11px] text-white/80 hover:text-white"
                  >
                    Kaldır
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
