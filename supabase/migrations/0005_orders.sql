-- A tabela "orders" já existia (da fundação inicial do projeto), com uma
-- estrutura normalizada (orders + order_items) diferente da que assumi
-- inicialmente. Este ficheiro substitui a versão anterior deste migration
-- (que tentava criar "orders" do zero e nunca chegou a ser aplicada) — só
-- adiciona a única coluna que faltava mesmo, para guardarmos o erro caso a
-- criação da encomenda na Printful falhe.

alter table orders
  add column if not exists printful_error text;
