-- Schema inicial do MVP (loja própria VERTEX)
-- Corre isto no SQL Editor do teu projeto Supabase (Dashboard > SQL Editor > New query).

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  printful_product_id text not null unique, -- id do produto sincronizado na Printful
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  printful_variant_id text not null unique, -- id da variante sincronizada na Printful
  size text,
  color text,
  price_cents integer not null, -- preço de venda em cêntimos (ex: 6990 = 69,90€)
  currency text not null default 'EUR',
  image_url text,
  in_stock boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  printful_order_id text,
  customer_email text not null,
  customer_name text,
  shipping_address jsonb,
  status text not null default 'pending_payment',
  -- valores possíveis sugeridos: pending_payment, paid, submitted_to_printful,
  -- in_production, shipped, delivered, canceled, failed
  total_cents integer not null,
  currency text not null default 'EUR',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_variant_id uuid not null references product_variants(id),
  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null,
  created_at timestamptz not null default now()
);

-- Índices úteis para as consultas mais comuns
create index if not exists idx_order_items_order_id on order_items(order_id);
create index if not exists idx_product_variants_product_id on product_variants(product_id);
create index if not exists idx_orders_status on orders(status);

-- Row Level Security: por defeito, bloqueia tudo. As leituras públicas de
-- catálogo são permitidas explicitamente abaixo; escrita em orders/order_items
-- só acontece através do backend (service_role, que ignora RLS).
alter table products enable row level security;
alter table product_variants enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

create policy "Catálogo é publicamente legível"
  on products for select
  using (active = true);

create policy "Variantes são publicamente legíveis"
  on product_variants for select
  using (true);

-- Nota: não criamos políticas de select/insert para orders/order_items aqui de
-- propósito — no MVP, todo o acesso a encomendas passa pelo backend (service_role).
