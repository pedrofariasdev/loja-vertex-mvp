-- A tabela product_gallery_images (criada na migração 0009) ficou sem
-- política de leitura pública — por isso as fotos extra não apareciam no
-- site (o browser usa a chave "anon", que só vê o que uma política RLS
-- permitir; sem política, vê zero linhas, mesmo a tabela tendo dados).
-- Este é o mesmo padrão já usado em "products" e "product_variants".

alter table product_gallery_images enable row level security;

create policy "Galeria de fotos é publicamente legível"
  on product_gallery_images
  for select
  to anon, authenticated
  using (true);
