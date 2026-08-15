-- Composição real de cada peça (tecido, corte, origem), obtida diretamente
-- da ficha técnica de cada produto base na Printful. Substitui o texto
-- genérico que estava a ser mostrado igual em todos os produtos.

alter table products
  add column if not exists composition_pt text,
  add column if not exists composition_en text;

-- VERTEX Essential Tee (Stanley/Stella STTU169 · Creator 2.0 Iconic Unisex T-Shirt)
update products set
  composition_pt = 'Feita em 100% algodão orgânico penteado e fiado a anel, esta t-shirt unissexo é uma peça essencial: alta qualidade, muito confortável e produzida de forma mais sustentável.
• 100% algodão orgânico penteado (ring-spun)
• Peso do tecido: 180 g/m²
• Jersey simples
• Corte médio (medium fit)
• Mangas montadas (set-in sleeves)
• Gola em canelado 1×1
• Algodão certificado GOTS e OCS
• Certificado OEKO-TEX® STANDARD 100 · aprovado PETA-Approved Vegan
• Peça em bruto (blank) fabricada no Bangladesh',
  composition_en = 'Made from 100% organic ring-spun cotton, this unisex t-shirt is a total must-have — high-quality, super comfy, and eco-friendly.
• 100% organic ring-spun cotton
• Fabric weight: 180 g/m² (5.3 oz./yd.²)
• Single jersey
• Medium fit
• Set-in sleeves
• 1×1 rib at collar
• Certified GOTS & OCS organic cotton
• OEKO-TEX® STANDARD 100 certified · PETA-Approved Vegan
• Blank product sourced from Bangladesh'
where printful_product_id = '456069708';

-- VERTEX Discipline Hoodie (Stanley/Stella SASU009 · Drummer 2.0 Midweight Unisex Hoodie)
update products set
  composition_pt = 'Um hoodie de peso médio, confortável e versátil, feito com uma mistura suave de algodão orgânico e poliéster reciclado — ideal para os dias mais frescos.
• 80% algodão orgânico, 20% poliéster reciclado (produção EUA) — ou 85% algodão orgânico penteado, 15% poliéster reciclado (produção Europa)
• Tecido de peso médio, ideal para meia-estação
• Corte unissexo
• Detalhe em meia-lua nas costas
• Algodão certificado GOTS, OCS e GRS (conteúdo reciclado)
• Peça em bruto (blank) fabricada no Bangladesh

Nota: esta peça tende a vir maior nos tamanhos europeus — considera escolher um tamanho abaixo.',
  composition_en = 'Stay cozy and chic with this mid-weight hoodie, made from a soft blend of organic cotton and recycled polyester — ideal for layering on chilly days.
• 80% organic cotton, 20% recycled polyester (US production) — or 85% organic combed ring-spun cotton, 15% recycled polyester (Europe production)
• Mid-weight fabric, ideal for mid-season wear
• Unisex fit
• Half-moon detail on the back
• Certified GOTS, OCS & GRS (recycled content)
• Blank product sourced from Bangladesh

Note: sizes run large for the European market — consider ordering a size down.'
where printful_product_id = '456070852';

-- VERTEX Performance Training Tee (SOL''S 11939 · Sporty Raglan Sleeve T-Shirt)
update products set
  composition_pt = 'Feita 100% em poliéster respirável em malha (mesh), esta camisola de desporto unissexo garante ventilação e conforto ideais em treinos intensos ou no dia a dia. Corte descontraído e comprimento extra para maior cobertura.
• 100% poliéster respirável (mesh)
• Peso do tecido: 140 g/m²
• Corte descontraído (relaxed fit)
• Tecido elástico e resistente
• Costuras laterais
• Comprimento extra
• Mangas curtas raglan
• Acabamento reforçado na gola
• Decote redondo clássico
• Peça em bruto (blank) fabricada na China',
  composition_en = 'Made with 100% breathable polyester mesh, this unisex sports jersey provides optimal ventilation and comfort during intense workouts or leisure activities. Relaxed fit and extended length for extra coverage.
• 100% breathable polyester (mesh)
• Fabric weight: 140 g/m² (4.13 oz./yd.²)
• Relaxed fit
• Elastic and durable
• Side-seamed construction
• Extended length
• Short raglan sleeves
• Binding on collar
• Classic round neckline
• Blank product sourced from China'
where printful_product_id = '456074816';

-- VERTEX Performance Short (All-Over Print Unisex Athletic Long Shorts)
update products set
  composition_pt = 'Uns calções desportivos práticos para qualquer atividade — corrida, ginásio, treino ou dia a dia — feitos num tecido técnico que seca rápido e acompanha o movimento.
• 91% poliéster reciclado, 9% elastano
• Peso do tecido: 174 g/m²
• Tecido técnico em microfibra com stretch 4 direções e secagem rápida
• Respirável e de secagem rápida
• Proteção UPF50+
• Perna com 16 cm de comprimento
• Cintura elástica com cordão ajustável
• Bolsos laterais em rede
• Sem forro interior
• Peça em bruto (blank) fabricada na China',
  composition_en = 'Practical athletic shorts for any activity — running, the gym, training, or everyday wear — made from a technical fabric that dries fast and moves with you.
• 91% recycled polyester, 9% spandex
• Fabric weight: 174 g/m² (5.13 oz./yd.²)
• Four-way stretch moisture-wicking microfiber fabric
• Breathable and fast-drying
• UPF50+ protection
• 6.3" (16 cm) inseam
• Elastic waistband with drawstring
• Mesh side pockets
• No inner lining
• Blank product sourced from China'
where printful_product_id = '456136192';

-- VERTEX Performance Track Pant (All-Over Print Recycled Men's Joggers)
update products set
  composition_pt = 'Uns joggers confortáveis com toque de algodão por fora e forro afelpado por dentro — perfeitos tanto para treinar como para o dia a dia.
• 96% poliéster reciclado, 4% elastano (produção EUA/México) — ou 95%/5% (produção Letónia)
• Peso do tecido: 308 g/m²
• Corte slim
• Exterior com toque de algodão, interior em fleece escovado
• Perneiras com punho
• Bolsos funcionais
• Cintura elástica com cordão ajustável
• Peça em bruto (blank) fabricada na China',
  composition_en = 'Comfortable cotton-feel joggers, soft on the outside and even softer on the inside — perfect for training or lounging.
• 96% recycled polyester, 4% elastane (US/Mexico production) — or 95% recycled polyester, 5% spandex (Latvia production)
• Fabric weight: 308 g/m² (9.08 oz./yd.²)
• Slim fit
• Soft cotton-feel fabric face, brushed fleece inside
• Cuffed legs
• Practical pockets
• Elastic waistband with drawstring
• Blank product sourced from China'
where printful_product_id = '456134405';

-- VERTEX Built by Discipline Cap (Otto Cap 18-1248 · 6 Panel Low Profile Dad Hat)
update products set
  composition_pt = 'Um boné estilo dad hat, em algodão twill, com um acabamento vintage lavado que lhe dá um toque único.
• 100% algodão twill
• 6 painéis, estrutura solta e perfil baixo
• 6 ilhós cosidos
• Suador interior preto
• Fecho metálico ajustável com acabamento em latão envelhecido
• Efeito vintage lavado
• Peça em bruto (blank) fabricada na China',
  composition_en = 'A dad-hat style cap in cotton twill, with a washed-out vintage finish that gives it a unique feel.
• 100% cotton twill
• 6-panel unstructured cap with a low profile
• 6 sewn eyelets
• Black sweatband
• Metal snap buckle with antique brass finish
• Washed-out vintage effect
• Blank product sourced from China'
where printful_product_id = '456076540';
