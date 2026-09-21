'use client';

import { useCallback, useEffect, useState } from 'react';
import { getBrowserClient } from '@/lib/supabase';
import { categories, materialCodes } from '@/data/products';
import { formatPrice } from '@/lib/whatsapp';
import ImageUploader from './ImageUploader';
import { Card, EmptyState, Field, Spinner, inputClass } from './ui';

type Row = {
  id: string;
  sort_order: number;
  name: string;
  summary: string;
  description: string;
  price: number | null;
  materials: string[];
  size: string;
  lead_time: string;
  category: string;
  images: string[];
  image_alt: string;
  is_visible: boolean;
};

const blank: Omit<Row, 'id'> = {
  sort_order: 0,
  name: '',
  summary: '',
  description: '',
  price: null,
  materials: [],
  size: '',
  lead_time: '',
  category: categories[0],
  images: [],
  image_alt: '',
  is_visible: true,
};

type Props = {
  notify: (message: string, tone?: 'ok' | 'error') => void;
  onSaved: () => void;
};

export default function ProductManager({ notify, onSaved }: Props) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Row | Omit<Row, 'id'> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const supabase = getBrowserClient();
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });
    setLoading(false);
    if (error) {
      notify(`Ürünler getirilemedi: ${error.message}`, 'error');
      return;
    }
    setRows((data ?? []) as Row[]);
  }, [notify]);

  useEffect(() => {
    void load();
  }, [load]);

  const isEditingExisting = editing !== null && 'id' in editing;

  function startNew() {
    const maxOrder = rows.reduce((max, r) => Math.max(max, r.sort_order), 0);
    setEditing({ ...blank, sort_order: maxOrder + 1 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function startEdit(row: Row) {
    setEditing({ ...row });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function patch(changes: Partial<Row>) {
    setEditing((prev) => (prev ? { ...prev, ...changes } : prev));
  }

  async function save() {
    if (!editing) return;
    if (!editing.name.trim()) {
      notify('Ürün adı boş olamaz.', 'error');
      return;
    }

    const supabase = getBrowserClient();
    if (!supabase) return;

    setSaving(true);
    const payload = {
      sort_order: editing.sort_order,
      name: editing.name.trim(),
      summary: editing.summary.trim(),
      description: editing.description.trim(),
      price: editing.price,
      materials: editing.materials,
      size: editing.size.trim(),
      lead_time: editing.lead_time.trim(),
      category: editing.category,
      images: editing.images,
      image_alt: editing.image_alt.trim() || editing.name.trim(),
      is_visible: editing.is_visible,
    };

    const { error } =
      editing && 'id' in editing
        ? await supabase.from('products').update(payload).eq('id', editing.id)
        : await supabase.from('products').insert(payload);

    setSaving(false);
    if (error) {
      notify(`Kaydedilemedi: ${error.message}`, 'error');
      return;
    }

    notify(isEditingExisting ? 'Ürün güncellendi.' : 'Ürün eklendi.');
    setEditing(null);
    await load();
    onSaved();
  }

  async function remove(row: Row) {
    if (!window.confirm(`"${row.name}" silinecek. Emin misiniz?`)) return;
    const supabase = getBrowserClient();
    if (!supabase) return;
    const { error } = await supabase.from('products').delete().eq('id', row.id);
    if (error) {
      notify(`Silinemedi: ${error.message}`, 'error');
      return;
    }
    notify('Ürün silindi.');
    if (editing && 'id' in editing && editing.id === row.id) setEditing(null);
    await load();
    onSaved();
  }

  /** Sitede görünme sırasını bir yukarı / aşağı taşır */
  async function reorder(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= rows.length) return;
    const supabase = getBrowserClient();
    if (!supabase) return;

    const a = rows[index];
    const b = rows[target];
    await supabase.from('products').update({ sort_order: b.sort_order }).eq('id', a.id);
    await supabase.from('products').update({ sort_order: a.sort_order }).eq('id', b.id);
    await load();
    onSaved();
  }

  async function toggleVisible(row: Row) {
    const supabase = getBrowserClient();
    if (!supabase) return;
    const { error } = await supabase
      .from('products')
      .update({ is_visible: !row.is_visible })
      .eq('id', row.id);
    if (error) {
      notify(`Değiştirilemedi: ${error.message}`, 'error');
      return;
    }
    notify(row.is_visible ? 'Ürün sitede gizlendi.' : 'Ürün sitede yayınlandı.');
    await load();
    onSaved();
  }

  return (
    <div className="space-y-6">
      {/* ---- Düzenleme formu ---- */}
      {editing && (
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-[19px] font-semibold text-ink">
              {isEditingExisting ? 'Ürünü düzenle' : 'Yeni ürün'}
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
            <Field label="Ürün adı" htmlFor="ad">
              <input
                id="ad"
                className={inputClass}
                value={editing.name}
                onChange={(e) => patch({ name: e.target.value })}
                placeholder="Örn. Katman Gece Lambası"
              />
            </Field>

            <Field
              label="Fotoğraflar"
              hint="İlk fotoğraf ürün kartında kapak olarak görünür. Oklarla sırayı değiştirebilirsiniz."
            >
              <ImageUploader
                images={editing.images}
                onChange={(images) => patch({ images })}
                onError={(m) => notify(m, 'error')}
              />
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Fiyat (TL)" hint="Boş bırakırsanız sitede 'Teklife göre' yazar." htmlFor="fiyat">
                <input
                  id="fiyat"
                  inputMode="numeric"
                  className={inputClass}
                  value={editing.price === null ? '' : String(editing.price)}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/[^\d]/g, '');
                    patch({ price: digits === '' ? null : Number(digits) });
                  }}
                  placeholder="890"
                />
              </Field>

              <Field label="Kategori" htmlFor="kategori">
                <select
                  id="kategori"
                  className={inputClass}
                  value={editing.category}
                  onChange={(e) => patch({ category: e.target.value })}
                >
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Kısa açıklama" hint="Ürün kartında görünen tek cümle." htmlFor="kisa">
              <input
                id="kisa"
                className={inputClass}
                value={editing.summary}
                onChange={(e) => patch({ summary: e.target.value })}
                placeholder="Işığı katman izleri arasından süzen masa lambası."
              />
            </Field>

            <Field label="Uzun açıklama" hint="Müşteri 'Detayları Gör' dediğinde okuyacağı metin." htmlFor="uzun">
              <textarea
                id="uzun"
                rows={5}
                className={inputClass}
                value={editing.description}
                onChange={(e) => patch({ description: e.target.value })}
              />
            </Field>

            <Field label="Malzemeler" hint="Bu ürünün basılabildiği malzemeleri işaretleyin.">
              <div className="flex flex-wrap gap-2">
                {materialCodes.map((code) => {
                  const on = editing.materials.includes(code);
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() =>
                        patch({
                          materials: on
                            ? editing.materials.filter((m) => m !== code)
                            : [...editing.materials, code],
                        })
                      }
                      aria-pressed={on}
                      className={`min-h-[44px] rounded-full border px-5 text-[14px] transition-colors ${
                        on ? 'border-ink bg-ink text-white' : 'border-line text-body hover:border-ink/30'
                      }`}
                    >
                      {code}
                    </button>
                  );
                })}
              </div>
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Boyut" hint="Örn: 14 / 20 / 28 cm seçenekleri" htmlFor="boyut">
                <input
                  id="boyut"
                  className={inputClass}
                  value={editing.size}
                  onChange={(e) => patch({ size: e.target.value })}
                />
              </Field>

              <Field label="Tahmini üretim süresi" hint="Örn: 2–3 gün" htmlFor="sure">
                <input
                  id="sure"
                  className={inputClass}
                  value={editing.lead_time}
                  onChange={(e) => patch({ lead_time: e.target.value })}
                />
              </Field>
            </div>

            <Field
              label="Fotoğraf açıklaması"
              hint="Görme engelli ziyaretçiler ve Google için. Boş bırakırsanız ürün adı kullanılır."
              htmlFor="alt"
            >
              <input
                id="alt"
                className={inputClass}
                value={editing.image_alt}
                onChange={(e) => patch({ image_alt: e.target.value })}
              />
            </Field>

            <label className="flex min-h-[44px] cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={editing.is_visible}
                onChange={(e) => patch({ is_visible: e.target.checked })}
                className="h-5 w-5 accent-[#8B5CF6]"
              />
              <span className="text-[14px] text-body">Bu ürün sitede görünsün</span>
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
              {isEditingExisting ? 'Değişiklikleri kaydet' : 'Ürünü ekle'}
            </button>
            <button type="button" onClick={() => setEditing(null)} className="btn-outline w-full sm:w-auto">
              Vazgeç
            </button>
          </div>
        </Card>
      )}

      {/* ---- Liste ---- */}
      {!editing && (
        <button type="button" onClick={startNew} className="btn-accent w-full sm:w-auto">
          + Yeni ürün ekle
        </button>
      )}

      {loading ? (
        <div className="flex items-center gap-2 py-10 text-[14px] text-muted">
          <Spinner /> Ürünler yükleniyor…
        </div>
      ) : rows.length === 0 ? (
        <EmptyState
          title="Henüz ürün yok."
          text="Yukarıdaki düğmeyle ilk ürününüzü ekleyin. Eklediğiniz ürün birkaç saniye içinde sitede görünür."
        />
      ) : (
        <ul className="space-y-3">
          {rows.map((row, i) => (
            <li
              key={row.id}
              className={`flex flex-wrap items-center gap-4 rounded-card border p-4 ${
                row.is_visible ? 'border-line bg-white' : 'border-line bg-canvas/70'
              }`}
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-canvas">
                {row.images?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={row.images[0]} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="grid h-full w-full place-items-center text-[10px] text-muted">
                    foto yok
                  </span>
                )}
              </div>

              <div className="min-w-[170px] flex-1">
                <p className="text-[15px] font-medium text-ink">
                  {row.name}
                  {!row.is_visible && (
                    <span className="ml-2 rounded-full bg-canvas px-2 py-0.5 text-[11px] font-normal text-muted">
                      gizli
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-[12.5px] text-muted">
                  {row.category} · {formatPrice(row.price)} · {row.images?.length ?? 0} fotoğraf
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => void reorder(i, -1)}
                  disabled={i === 0}
                  aria-label="Yukarı taşı"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-body disabled:opacity-35"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => void reorder(i, 1)}
                  disabled={i === rows.length - 1}
                  aria-label="Aşağı taşı"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-body disabled:opacity-35"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => void toggleVisible(row)}
                  className="min-h-[44px] rounded-full border border-line px-4 text-[13px] text-body"
                >
                  {row.is_visible ? 'Gizle' : 'Yayınla'}
                </button>
                <button
                  type="button"
                  onClick={() => startEdit(row)}
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
