-- A tabela "orders" já existia (da fundação inicial do projeto), com uma
-- estrutura normalizada (orders + order_items) diferente da que assumi
-- inicialmente. Este ficheiro substitui a versão anterior deste migration
-- (que tentava criar "orders" do zero e nunca chegou a ser aplicada) — só
-- adiciona a única coluna que faltava mesmo, para guardarmos o erro caso a
-- criação da encomenda na Printful falhe.

alter table orders
  add column if not exists printful_error text;

-- A encomenda é criada como "pending" assim que o cliente clica em
-- "Finalizar Compra", antes de a Stripe recolher o email/morada — por isso
-- customer_email não pode ser obrigatório nesse momento. É preenchido a
-- seguir pelo webhook, quando o pagamento é confirmado.
alter table orders
  alter column customer_email drop not null;
