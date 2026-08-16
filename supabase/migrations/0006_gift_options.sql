-- Opções de presente: o cliente pode marcar a encomenda como presente e
-- deixar uma mensagem, que é impressa na guia de remessa da Printful
-- (sem preços, dentro da caixa) em vez de embrulho físico.

alter table orders
  add column if not exists is_gift boolean not null default false,
  add column if not exists gift_message text;
