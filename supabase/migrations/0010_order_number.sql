-- Número de encomenda curto e sequencial (ex.: VTX-1001), para mostrar ao
-- cliente no email de confirmação em vez do UUID interno da tabela
-- "orders" (que é o que estava a aparecer até agora — não tinha nada de
-- estilizado, era só o identificador técnico da base de dados).

create sequence if not exists orders_order_number_seq;

alter table orders
  add column if not exists order_number integer;

-- Atribui números às encomendas já existentes, por ordem cronológica,
-- a começar em 1001.
with numbered as (
  select id, row_number() over (order by created_at asc) as rn
  from orders
  where order_number is null
)
update orders o
set order_number = 1000 + numbered.rn
from numbered
where o.id = numbered.id;

-- A sequência continua a partir do maior número já atribuído, para as
-- próximas encomendas não colidirem com as que acabámos de numerar.
select setval(
  'orders_order_number_seq',
  greatest(1000, (select coalesce(max(order_number), 1000) from orders))
);

alter table orders
  alter column order_number set default nextval('orders_order_number_seq'),
  alter column order_number set not null;

alter table orders
  add constraint orders_order_number_key unique (order_number);
