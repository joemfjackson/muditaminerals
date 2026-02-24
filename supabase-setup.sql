-- ============================================
-- Mudita Minerals — Database Setup
-- Run this in Supabase Dashboard > SQL Editor
-- ============================================

-- 1. CATEGORIES TABLE
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  created_at timestamptz default now()
);

-- 2. PRODUCTS TABLE
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text not null default '',
  price numeric(10,2) not null,
  compare_at_price numeric(10,2),
  category_id uuid references categories(id) on delete set null,
  category_slug text,
  images text[] default '{}',
  stock integer not null default 0,
  featured boolean default false,
  active boolean default true,
  properties jsonb default '{}',
  focal_point jsonb default '{"x":50,"y":50}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. ORDERS TABLE
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text,
  status text not null default 'pending',
  customer_email text,
  customer_name text,
  shipping_address jsonb default '{}',
  total numeric(10,2) not null default 0,
  created_at timestamptz default now()
);

-- 4. ORDER ITEMS TABLE
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  quantity integer not null default 1,
  price numeric(10,2) not null
);

-- 5. INDEXES
create index if not exists idx_products_slug on products(slug);
create index if not exists idx_products_category on products(category_id);
create index if not exists idx_products_featured on products(featured) where featured = true;
create index if not exists idx_products_active on products(active) where active = true;
create index if not exists idx_orders_stripe on orders(stripe_session_id);
create index if not exists idx_order_items_order on order_items(order_id);

-- 6. AUTO-UPDATE updated_at TRIGGER
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_updated_at on products;
create trigger products_updated_at
  before update on products
  for each row execute function update_updated_at();

-- 7. ENABLE ROW LEVEL SECURITY
alter table categories enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- 8. RLS POLICIES — public read for categories & products
create policy "Categories are publicly readable"
  on categories for select
  using (true);

create policy "Products are publicly readable"
  on products for select
  using (true);

create policy "Orders readable by service role"
  on orders for select
  using (auth.role() = 'service_role');

create policy "Orders insertable by anon and service role"
  on orders for insert
  with check (true);

create policy "Order items readable by service role"
  on order_items for select
  using (auth.role() = 'service_role');

create policy "Order items insertable by anon and service role"
  on order_items for insert
  with check (true);

-- 9. SEED CATEGORIES
insert into categories (name, slug, description) values
  ('Crystals',  'crystals',  'Raw and polished healing crystals'),
  ('Gemstones', 'gemstones', 'Premium cut and polished gemstones'),
  ('Jewelry',   'jewelry',   'Handcrafted crystal and gemstone jewelry'),
  ('Specimens', 'specimens', 'Museum-quality mineral specimens')
on conflict (slug) do nothing;

-- 10. SEED PRODUCTS
insert into products (name, slug, description, price, compare_at_price, category_id, category_slug, images, stock, featured, active, properties) values
(
  'Amethyst Cathedral Cluster',
  'amethyst-cathedral-cluster',
  'A stunning deep-purple amethyst cathedral cluster from Uruguay. This specimen features brilliant crystal terminations with rich violet color that catches light beautifully. Each piece is unique — a true statement piece for any collection.',
  189.99, 249.99,
  (select id from categories where slug = 'crystals'), 'crystals',
  '{"/placeholder-crystal-1.jpg"}', 3, true, true,
  '{"weight": "2.4 kg", "origin": "Uruguay", "chakra": "Crown, Third Eye", "hardness": "7"}'
),
(
  'Rose Quartz Sphere',
  'rose-quartz-sphere',
  'Hand-polished rose quartz sphere radiating soft pink energy. Known as the stone of universal love, this sphere is perfect for meditation or as a calming presence in your space. Sourced from Madagascar.',
  64.99, null,
  (select id from categories where slug = 'crystals'), 'crystals',
  '{"/placeholder-crystal-2.jpg"}', 8, true, true,
  '{"weight": "680g", "origin": "Madagascar", "chakra": "Heart", "hardness": "7", "dimensions": "3.5\" diameter"}'
),
(
  'Citrine Point Tower',
  'citrine-point-tower',
  'Natural citrine point tower with warm golden hues. Citrine is known as the merchant''s stone — believed to attract abundance and prosperity. This tower has been polished to reveal its inner fire.',
  42.99, null,
  (select id from categories where slug = 'crystals'), 'crystals',
  '{"/placeholder-crystal-3.jpg"}', 12, false, true,
  '{"weight": "340g", "origin": "Brazil", "chakra": "Solar Plexus", "hardness": "7", "dimensions": "6\" tall"}'
),
(
  'Labradorite Free Form',
  'labradorite-free-form',
  'Mesmerizing labradorite free-form piece with intense blue and gold flash. Labradorite is a stone of transformation and magic, revealing hidden colors when light strikes its surface at the right angle.',
  79.99, null,
  (select id from categories where slug = 'gemstones'), 'gemstones',
  '{"/placeholder-gem-1.jpg"}', 5, true, true,
  '{"weight": "520g", "origin": "Madagascar", "chakra": "Throat, Third Eye", "hardness": "6-6.5"}'
),
(
  'Black Tourmaline Raw Chunk',
  'black-tourmaline-raw-chunk',
  'Large raw black tourmaline chunk — the ultimate protection stone. Known for shielding against negative energy and electromagnetic fields. This substantial piece has a powerful grounding presence.',
  34.99, null,
  (select id from categories where slug = 'crystals'), 'crystals',
  '{"/placeholder-crystal-4.jpg"}', 15, false, true,
  '{"weight": "890g", "origin": "Brazil", "chakra": "Root", "hardness": "7-7.5"}'
),
(
  'Amethyst Wire-Wrapped Pendant',
  'amethyst-wire-wrapped-pendant',
  'Handcrafted wire-wrapped amethyst pendant on sterling silver chain. Each pendant features a carefully selected amethyst point wrapped in intricate silver wirework. No two are exactly alike.',
  54.99, null,
  (select id from categories where slug = 'jewelry'), 'jewelry',
  '{"/placeholder-jewelry-1.jpg"}', 7, true, true,
  '{"weight": "18g", "origin": "Brazil", "chakra": "Crown, Third Eye"}'
),
(
  'Fluorite Octahedron Set',
  'fluorite-octahedron-set',
  'Set of 5 natural fluorite octahedrons in varying colors — green, purple, blue, and clear. These naturally occurring geometric formations are a collector''s dream. Comes in a velvet-lined display box.',
  44.99, null,
  (select id from categories where slug = 'specimens'), 'specimens',
  '{"/placeholder-specimen-1.jpg"}', 4, false, true,
  '{"weight": "120g total", "origin": "China", "chakra": "Heart, Third Eye", "hardness": "4"}'
),
(
  'Pyrite Cube Cluster',
  'pyrite-cube-cluster',
  'Natural pyrite cube cluster from Spain — also known as fool''s gold. These perfectly geometric cubes formed naturally over millions of years. An incredible conversation piece and a must for any mineral collection.',
  119.99, null,
  (select id from categories where slug = 'specimens'), 'specimens',
  '{"/placeholder-specimen-2.jpg"}', 2, true, true,
  '{"weight": "1.1 kg", "origin": "Navajún, Spain", "chakra": "Solar Plexus", "hardness": "6-6.5", "dimensions": "4\" x 3\" x 3\""}'
)
on conflict (slug) do nothing;
