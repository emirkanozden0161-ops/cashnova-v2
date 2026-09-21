'use client';

import { useCallback, useEffect, useState } from 'react';
import { getBrowserClient } from '@/lib/supabase';
import { Card, EmptyState, Field, Spinner, inputClass } from './ui';

type Row = {
  id: string;
  sort_order: number;
  name: string;
  business: string;
  quote: string;
  product: string;
  is_visible: boolean;
};

const blank: Omit<Row, 'id'> = {
  sort_order: 0,
  name: '',
  business: '',
  quote: '',
  product: '',
  is_visible: true,
};

type Props = {
  notify: (message: string, tone?: 'ok' | 'error') => void;
  onSaved: () => void;
};

export default function TestimonialManager({ notify, onSaved }: Props) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Row | Omit<Row, 'id'> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const supabase = getBrowserClient();
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });
    setLoading(false);
    if (error) {
      notify(`Yorumlar getirilemedi: ${error.message}`, 'error');
      return;
    }
    setRows((data ?? []) as Row[]);
  }, [notify]);

  useEffect(() => {
    void load();
  }, [load]);

  const isEditingExisting = editing !== null && 'id' in editing;

  function patch(changes: Partial<Row>) {
    setEditing((prev) => (prev ? { ...prev, ...changes } : prev));
  }

  async function save() {
    if (!editing) return;
    if (!editing.name.trim() || !editing.quote.trim()) {
      notify('İsim ve yorum metni zorunlu.', 'error');
      return;
    }

    const supabase = getBrowserClient();
    if (!supabase) return;

    setSaving(true);
    const payload = {
      sort_order: editing.sort_order,
      name: editing.name.trim(),
      business: editing.business.trim(),
      quote: editing.quote.trim(),
      product: editing.product.trim(),
      is_visible: editing.is_visible,
    };

    const { error } =
      editing && 'id' in editing
        ? await supabase.from('testimonials').update(payload).eq('id', editing.id)
        : await supabase.from('testimonials').insert(payload);

    setSaving(false);
    if (error) {
      notify(`Kaydedilemedi: ${error.message}`, 'error');
      return;
    }

    notify(isEditingExisting ? 'Yorum güncellendi.' : 'Yorum eklendi.');
    setEditing(null);
    await load();
    onSaved();
  }

  async function remove(row: Row) {
    if (!window.confirm(`${row.name} adlı kişinin yorumu silinecek. Emin misiniz?`)) return;
    const supabase = getBrowserClient();
    if (!supabase) return;
    const { error } = await supabase.from('testimonials').delete().eq('id', row.id);
    if (error) {
      notify(`Silinemedi: ${error.message}`, 'error');
      return;
    }
    notify('Yorum silindi.');
    await load();
    onSaved();
  }

  return (
    <div className="space-y-6">
      <Card className="border-accent/25 bg-accent/[0.04]">
        <p className="text-[14px] leading-relaxed text-body">
          Yalnızca gerçekten aldığınız yorumları ekleyin ve paylaşmadan önce müşteriden izin alın.
          Uydurma yorum, sitenin güvenilirliğini en hızlı bozan şeydir.
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">
          Hiç yorum yokken bu bölüm sitede hiç görünmez — boş bir başlık kalmaz.
        </p>
      </Card>

      {editing && (
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-[19px] font-semibold text-ink">
              {isEditingExisting ? 'Yorumu düzenle' : 'Yeni yorum'}
            </h2>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="min-h-[44px] text-[13.5px] text-muted underline underline-offset-4"
            >
              Vazgeç
            </button>
          </div>

          <div className="mt-6 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Müşterinin adı" htmlFor="y-ad">
                <input
                  id="y-ad"
                  className={inputClass}
                  value={editing.name}
                  onChange={(e) => patch({ name: e.target.value })}
                  placeholder="Deniz A."
                />
              </Field>
              <Field label="İşletmesi ya da mesleği" hint="İsteğe bağlı" htmlFor="y-is">
                <input
                  id="y-is"
                  className={inputClass}
                  value={editing.business}
                  onChange={(e) => patch({ business: e.target.value })}
                  placeholder="Mimarlık ofisi"
                />
              </Field>
            </div>

            <Field label="Yorum" htmlFor="y-metin">
              <textarea
                id="y-metin"
                rows={4}
                className={inputClass}
                value={editing.quote}
                onChange={(e) => patch({ quote: e.target.value })}
                placeholder="Müşterinin yazdığı metni olduğu gibi yapıştırabilirsiniz."
              />
            </Field>

            <Field label="Hangi ürün ya da iş için?" hint="İsteğe bağlı" htmlFor="y-urun">
              <input
                id="y-urun"
                className={inputClass}
                value={editing.product}
                onChange={(e) => patch({ product: e.target.value })}
                placeholder="Maket parçaları"
              />
            </Field>

            <label className="flex min-h-[44px] cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={editing.is_visible}
                onChange={(e) => patch({ is_visible: e.target.checked })}
                className="h-5 w-5 accent-[#8B5CF6]"
              />
              <span className="text-[14px] text-body">Bu yorum sitede görünsün</span>
            </label>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => void save()}
              disabled={saving}
              className="btn-accent w-full sm:w-auto disabled:opacity-60"
            >
              {saving && <Spinner />}
              {isEditingExisting ? 'Değişiklikleri kaydet' : 'Yorumu ekle'}
            </button>
            <button type="button" onClick={() => setEditing(null)} className="btn-outline w-full sm:w-auto">
              Vazgeç
            </button>
          </div>
        </Card>
      )}

      {!editing && (
        <button
          type="button"
          onClick={() => {
            const maxOrder = rows.reduce((max, r) => Math.max(max, r.sort_order), 0);
            setEditing({ ...blank, sort_order: maxOrder + 1 });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="btn-accent w-full sm:w-auto"
        >
          + Yeni yorum ekle
        </button>
      )}

      {loading ? (
        <div className="flex items-center gap-2 py-10 text-[14px] text-muted">
          <Spinner /> Yorumlar yükleniyor…
        </div>
      ) : rows.length === 0 ? (
        <EmptyState
          title="Henüz yorum eklenmemiş."
          text="Bir müşteriniz memnuniyetini yazdığında buraya ekleyin; yorumlar bölümü kendiliğinden sitede görünür hale gelir."
        />
      ) : (
        <ul className="space-y-3">
          {rows.map((row) => (
            <li key={row.id} className="rounded-card border border-line bg-white p-5">
              <p className="text-[14.5px] leading-relaxed text-body">“{row.quote}”</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                <div>
                  <p className="text-[14px] font-medium text-ink">
                    {row.name}
                    {!row.is_visible && (
                      <span className="ml-2 rounded-full bg-canvas px-2 py-0.5 text-[11px] font-normal text-muted">
                        gizli
                      </span>
                    )}
                  </p>
                  <p className="text-[12.5px] text-muted">
                    {[row.business, row.product].filter(Boolean).join(' · ')}
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing({ ...row });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="min-h-[44px] rounded-full border border-line px-4 text-[13px] text-body"
                  >
                    Düzenle
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
