-- Encomendas: criadas como "pending" quando o cliente inicia o checkout na
-- Stripe, e atualizadas para "paid" pelo webhook quando o pagamento é
-- confirmado. A partir daí é criada a encomenda de produção na Printful.

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text unique,
  status text not null default 'pending', -- pending | paid | fulfilling | fulfilled | failed
  customer_email text,
  customer_name text,
  shipping_address jsonb,
  items jsonb not null, -- [{ variantId, printfulVariantId, productName, variantLabel, quantity, priceCents, currency }]
  subtotal_cents integer not null,
  shipping_cents integer,
  total_cents integer,
  currency text not null default 'EUR',
  printful_order_id text,
  printful_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table orders enable row level security;
-- Sem policies públicas: só acessível via service_role (API routes no servidor).
