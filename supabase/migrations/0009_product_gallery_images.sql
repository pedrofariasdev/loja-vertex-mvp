-- Galeria de fotos extra por produto (peça sozinha, costas, close-up, etc.).
-- Independente da imagem "hero" de cada variante (que continua a vir da
-- Printful, uma por cor) — estas são fotos gerais do produto, as mesmas
-- para todas as cores, adicionadas manualmente a partir dos mockups que o
-- Pedro gera na ferramenta de Mockups da Printful (a API de sincronização
-- não expõe esses mockups extra, só a foto principal por variante).

create table if not exists product_gallery_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  image_url text not null,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists product_gallery_images_product_id_idx
  on product_gallery_images (product_id, position);
