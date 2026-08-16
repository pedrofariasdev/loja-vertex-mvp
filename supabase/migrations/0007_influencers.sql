-- Programa de influencers: candidatura, código de desconto próprio (15% fixo),
-- pontos ganhos por venda (10% do subtotal da encomenda) e resgate de pontos
-- por um código de desconto fixo (uso único).

create table if not exists influencers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  code text not null unique,
  stripe_coupon_id text not null,
  stripe_promotion_code_id text not null unique,
  points_cents integer not null default 0,
  lifetime_sales_cents integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists influencer_redemptions (
  id uuid primary key default gen_random_uuid(),
  influencer_id uuid not null references influencers(id),
  points_redeemed_cents integer not null,
  discount_code text not null,
  stripe_promotion_code_id text not null,
  created_at timestamptz not null default now()
);

alter table orders
  add column if not exists influencer_id uuid references influencers(id),
  add column if not exists influencer_points_earned_cents integer;
