-- ============================================================
--  CASHNOVA — VERİTABANI KURULUMU
--
--  BU DOSYAYI SADECE BİR KEZ ÇALIŞTIRACAKSINIZ.
--
--  Nasıl:
--   1. supabase.com adresinde projenizi açın
--   2. Sol menüden "SQL Editor" → "New query"
--   3. Bu dosyanın TAMAMINI kopyalayıp oraya yapıştırın
--   4. Sağ alttaki "Run" düğmesine basın
--
--  "Success. No rows returned" yazısını görürseniz her şey yolunda.
--  Yanlışlıkla ikinci kez çalıştırırsanız bir zarar gelmez.
-- ============================================================


-- ------------------------------------------------------------
--  1. TABLOLAR
-- ------------------------------------------------------------

-- Ürünler
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  sort_order  integer     not null default 0,   -- Sitede görünme sırası
  name        text        not null,
  summary     text        not null default '',  -- Kartta görünen tek cümle
  description text        not null default '',  -- Detay panelindeki uzun metin
  price       numeric,                          -- Boş bırakılırsa "Teklife göre"
  materials   text[]      not null default '{}',
  size        text        not null default '',
  lead_time   text        not null default '',
  category    text        not null default '',
  images      text[]      not null default '{}', -- Fotoğraf adresleri, ilki kapak
  image_alt   text        not null default '',
  is_visible  boolean     not null default true  -- Kapatılırsa sitede görünmez
);

-- Müşteri yorumları
create table if not exists public.testimonials (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  sort_order integer     not null default 0,
  name       text        not null,
  business   text        not null default '',
  quote      text        not null,
  product    text        not null default '',
  is_visible boolean     not null default true
);

-- Üretimden kareler (atölye fotoğrafları)
create table if not exists public.gallery (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  sort_order integer     not null default 0,
  src        text        not null default '',
  alt        text        not null default '',
  caption    text        not null default '',
  is_visible boolean     not null default true
);


-- ------------------------------------------------------------
--  2. GÜVENLİK
--
--  Kural şu: herkes OKUYABİLİR (site çalışsın diye),
--  ama sadece panele GİRİŞ YAPMIŞ kişi DEĞİŞİKLİK YAPABİLİR.
--  Bu kontrol veritabanının kendi içinde yapılır; tarayıcıdan
--  dolanarak aşılamaz.
-- ------------------------------------------------------------

alter table public.products     enable row level security;
alter table public.testimonials enable row level security;
alter table public.gallery      enable row level security;

-- Ürünler
drop policy if exists "urun_herkes_okur"  on public.products;
drop policy if exists "urun_giris_yazar"  on public.products;
create policy "urun_herkes_okur" on public.products
  for select using (true);
create policy "urun_giris_yazar" on public.products
  for all to authenticated using (true) with check (true);

-- Yorumlar
drop policy if exists "yorum_herkes_okur" on public.testimonials;
drop policy if exists "yorum_giris_yazar" on public.testimonials;
create policy "yorum_herkes_okur" on public.testimonials
  for select using (true);
create policy "yorum_giris_yazar" on public.testimonials
  for all to authenticated using (true) with check (true);

-- Galeri
drop policy if exists "galeri_herkes_okur" on public.gallery;
drop policy if exists "galeri_giris_yazar" on public.gallery;
create policy "galeri_herkes_okur" on public.gallery
  for select using (true);
create policy "galeri_giris_yazar" on public.gallery
  for all to authenticated using (true) with check (true);


-- ------------------------------------------------------------
--  3. FOTOĞRAF DEPOSU
--
--  Panelden yüklenen fotoğraflar buraya gider.
-- ------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('gorseller', 'gorseller', true)
on conflict (id) do nothing;

drop policy if exists "gorsel_herkes_okur"  on storage.objects;
drop policy if exists "gorsel_giris_yukler" on storage.objects;
drop policy if exists "gorsel_giris_siler"  on storage.objects;

create policy "gorsel_herkes_okur" on storage.objects
  for select using (bucket_id = 'gorseller');

create policy "gorsel_giris_yukler" on storage.objects
  for insert to authenticated with check (bucket_id = 'gorseller');

create policy "gorsel_giris_siler" on storage.objects
  for delete to authenticated using (bucket_id = 'gorseller');


-- ------------------------------------------------------------
--  4. BAŞLANGIÇ ÜRÜNLERİ
--
--  Panel ilk açıldığında boş görünmesin diye altı örnek ürün.
--  Panelden istediğinizi silebilir, hepsini değiştirebilirsiniz.
--  (Tablo zaten doluysa bu bölüm hiçbir şey yapmaz.)
-- ------------------------------------------------------------

insert into public.products (sort_order, name, summary, description, price, materials, size, lead_time, category, image_alt)
select * from (values
  (1, 'Katman Gece Lambası',
      'Işığı katman izleri arasından süzen, USB beslemeli masa lambası.',
      'Dalgalı gövde yapısı sayesinde ışık, baskı katmanlarının arasından yumuşak bir desenle dağılır. Gövde tek parça basılır; içine yerleşen LED modülü USB ile çalışır.',
      890::numeric, array['PLA','PETG'], '14 / 20 / 28 cm seçenekleri', '2–3 gün', 'Aydınlatma',
      'Katman dokulu 3D baskı gece lambası'),
  (2, 'Modüler Masa Organizeri',
      'Birbirine kenetlenen, istediğiniz kadar çoğaltabileceğiniz set.',
      'Üç farklı gözden oluşan set, yan yana kenetlenerek masanıza göre büyür. Kalem, kartvizit, kablo ve küçük aparatlar için ayrı bölmeler içerir.',
      620::numeric, array['PLA','PETG','ABS'], 'Modül başına 9 × 9 cm', '3–4 gün', 'Ofis',
      'Modüler 3D baskı masa organizeri'),
  (3, 'Araç İçi Telefon Tutucu',
      'Havalandırma ızgarasına geçen, ısıya dayanıklı tutucu.',
      'Yaz sıcağında biçimini koruması için ABS ya da PETG tercih edilir. Izgara klipsi yaylı tasarımdır, tek elle takılıp çıkarılır.',
      450::numeric, array['ABS','PETG','TPU'], 'Tek ölçü', '2 gün', 'Otomotiv',
      'Araç havalandırmasına takılan 3D baskı telefon tutucu'),
  (4, 'İsimli Anahtarlık',
      'İstediğiniz ismi kabartma olarak basıyoruz.',
      'Sipariş sırasında yazdırmak istediğiniz ismi ya da kısa bir metni iletiyorsunuz; kabartma olarak modele işleniyor. Toplu siparişlerde adet başına fiyat düşer.',
      180::numeric, array['PLA','PETG'], '6 × 2,5 cm', '1–2 gün', 'Hediyelik',
      'İsim kabartmalı 3D baskı anahtarlık'),
  (5, 'Geometrik Saksı',
      'Su tahliyeli iç hazne ve çok yüzeyli dış gövde.',
      'Dış gövde çok yüzeyli geometrik formda basılır; içine yerleşen ayrı hazne suyu tutarak mobilyanızı korur. Açık alanlarda PETG önerilir.',
      540::numeric, array['PLA','PETG'], 'Ø 10 / 15 / 22 cm', '3 gün', 'Dekorasyon',
      'Geometrik yüzeyli 3D baskı saksı'),
  (6, 'Yedek Parça / Aparat',
      'Ölçüsünü paylaşın, birebir üretelim.',
      'Kırılan bir dişli, bir kapak ya da üretimden kalkmış bir aparat için teknik çizim veya numunenin fotoğrafı yeterli. Ölçüleri alıp modelliyor ve üretiyoruz.',
      null::numeric, array['PETG','ABS','RESIN'], 'Ölçüye özel', 'Parçaya göre değişir', 'Teknik Parça',
      '3D baskı ile üretilmiş teknik yedek parça')
) as yeni
where not exists (select 1 from public.products);


-- ------------------------------------------------------------
--  5. BAŞLANGIÇ GALERİ KARELERİ
--
--  Fotoğrafları panelden yükleyeceksiniz; bunlar sadece
--  yerlerini tutar.
-- ------------------------------------------------------------

insert into public.gallery (sort_order, src, alt, caption)
select * from (values
  (1, '', 'Baskı sırasında nozülün parçanın üzerinde ilerleyişi', 'Baskı sürüyor'),
  (2, '', 'Atölyedeki filament makaraları',                      'Malzeme rafı'),
  (3, '', 'Baskısı tamamlanmış parçanın tabladan alınışı',        'Tabladan çıkış'),
  (4, '', 'Tamamlanmış ürünün kargo için paketlenmesi',           'Paketleme')
) as yeni
where not exists (select 1 from public.gallery);


-- Bitti. Müşteri yorumları tablosu bilerek boş bırakıldı;
-- gerçek yorum geldiğinde panelden eklenecek.
