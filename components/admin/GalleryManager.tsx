'use client';

import { useCallback, useEffect, useState } from 'react';
import { getBrowserClient } from '@/lib/supabase';
import ImageUploader from './ImageUploader';
import { Card, EmptyState, Field, Spinner, inputClass } from './ui';

type Row = {
  id: string;
  sort_order: number;
  src: string;
  alt: string;
  caption: string;
  is_visible: boolean;
};

type Props = {
  notify: (message: string, tone?: 'ok' | 'error') => void;
  onSaved: () => void;
};

export default function GalleryManager({ notify, onSaved }: Props) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const supabase = getBrowserClient();
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });
    setLoading(false);
    if (error) {
      notify(`Galeri getirilemedi: ${error.message}`, 'error');
      return;
    }
    setRows((data ?? []) as Row[]);
  }, [notify]);

  useEffect(() => {
    void load();
  }, [load]);

  async function update(row: Row, changes: Partial<Row>) {
    const supabase = getBrowserClient();
    if (!supabase) return;
    setBusyId(row.id);
    const { error } = await supabase.from('gallery').update(changes).eq('id', row.id);
    setBusyId(null);
    if (error) {
      notify(`Kaydedilemedi: ${error.message}`, 'error');
      return;
    }
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, ...changes } : r)));
    onSaved();
  }

  async function addRow() {
    const supabase = getBrowserClient();
    if (!supabase) return;
    const maxOrder = rows.reduce((max, r) => Math.max(max, r.sort_order), 0);
    const { error } = await supabase
      .from('gallery')
      .insert({ sort_order: maxOrder + 1, src: '', alt: '', caption: 'Yeni kare' });
    if (error) {
      notify(`Eklenemedi: ${error.message}`, 'error');
      return;
    }
    notify('Yeni kare eklendi. Fotoğrafını yükleyin.');
    await load();
    onSaved();
  }

  async function remove(row: Row) {
    if (!window.confirm('Bu kare silinecek. Emin misiniz?')) return;
    const supabase = getBrowserClient();
    if (!supabase) return;
    const { error } = await supabase.from('gallery').delete().eq('id', row.id);
    if (error) {
      notify(`Silinemedi: ${error.message}`, 'error');
      return;
    }
    notify('Kare silindi.');
    await load();
    onSaved();
  }

  return (
    <div className="space-y-6">
      <Card className="border-accent/25 bg-accent/[0.04]">
        <p className="text-[14px] leading-relaxed text-body">
          Bu bölüm sitenin en çok güven veren yerlerinden biri. Telefonla çekilmiş net bir atölye
          fotoğrafı, internetten bulunmuş bir görselden her zaman daha iyi çalışır.
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">
          Dört kare yeterli: baskı sürerken, malzeme rafı, tabladan çıkan parça ve paketleme.
        </p>
      </Card>

      <button type="button" onClick={() => void addRow()} className="btn-accent w-full sm:w-auto">
        + Yeni kare ekle
      </button>

      {loading ? (
        <div className="flex items-center gap-2 py-10 text-[14px] text-muted">
          <Spinner /> Galeri yükleniyor…
        </div>
      ) : rows.length === 0 ? (
        <EmptyState
          title="Galeride kare yok."
          text="Kare eklemezseniz 'Üretimden kareler' bölümü sitede görünmez."
        />
      ) : (
        <ul className="space-y-4">
          {rows.map((row, i) => (
            <li key={row.id} className="rounded-card border border-line bg-white p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="text-[13px] text-muted">{i + 1}. kare</span>
                <div className="flex items-center gap-1.5">
                  {busyId === row.id && <Spinner className="h-4 w-4 text-muted" />}
                  <button
                    type="button"
                    onClick={() => void update(row, { is_visible: !row.is_visible })}
                    className="min-h-[44px] rounded-full border border-line px-4 text-[13px] text-body"
                  >
                    {row.is_visible ? 'Gizle' : 'Yayınla'}
                  </button>
                  <button
                    type="button"
                    onClick={() => void remove(row)}
                    className="min-h-[44px] rounded-full border border-[#B42318]/30 px-4 text-[13px] text-[#B42318]"
                  >
                    Sil
                  </button>
                </div>
              </div>

              <div className="mt-5 grid gap-6 sm:grid-cols-[200px_1fr]">
                <ImageUploader
                  images={row.src ? [row.src] : []}
                  single
                  onChange={(images) => void update(row, { src: images[0] ?? '' })}
                  onError={(m) => notify(m, 'error')}
                />

                <div className="space-y-5">
                  <Field label="Başlık" hint="Fotoğrafın altında görünür. Örn: Baskı sürüyor">
                    <input
                      className={inputClass}
                      defaultValue={row.caption}
                      onBlur={(e) => {
                        if (e.target.value !== row.caption) {
                          void update(row, { caption: e.target.value });
                        }
                      }}
                    />
                  </Field>

                  <Field
                    label="Fotoğraf açıklaması"
                    hint="Fotoğrafta ne olduğunu yazın. Görme engelli ziyaretçiler ve Google için."
                  >
                    <input
                      className={inputClass}
                      defaultValue={row.alt}
                      onBlur={(e) => {
                        if (e.target.value !== row.alt) {
                          void update(row, { alt: e.target.value });
                        }
                      }}
                    />
                  </Field>

                  <p className="text-[12.5px] text-muted">
                    Yazı alanlarından çıktığınızda değişiklik kendiliğinden kaydedilir.
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
