-- O resgate de pontos deixa de zerar o saldo no momento em que o código é
-- gerado. Em vez disso, o código fica "pending" com o valor do saldo nessa
-- altura, e só quando a Stripe confirma que foi mesmo usado numa encomenda
-- (webhook) é que descontamos do saldo real o valor efetivamente aplicado
-- (limitado ao valor dos produtos, nunca ao frete). Se a compra for mais
-- barata do que o código, a diferença fica automaticamente no saldo dela,
-- em vez de se perder.
--
-- Também passamos a exigir que o email usado no checkout seja o mesmo da
-- candidatura da influencer — se não for, o saldo dela não é descontado
-- (fica protegida caso o código vaze), e o resgate fica marcado como
-- "email_mismatch" para revisão manual.

-- status: 'pending' (código gerado, ainda por usar), 'used' (usado com o
-- email correto e já descontado do saldo), 'email_mismatch' (usado com um
-- email diferente do da candidatura — saldo protegido, fica para revisão
-- manual), 'voided' (substituído por um código de resgate mais recente
-- antes de ser usado).
alter table influencer_redemptions
  add column if not exists status text not null default 'used' check (status in ('pending', 'used', 'email_mismatch', 'voided')),
  add column if not exists actual_discount_cents integer,
  add column if not exists used_email text;

-- Resgates já existentes (criados antes desta migração) já tinham o saldo
-- zerado de imediato, portanto ficam marcados como "used" por omissão
-- (valor por defeito da coluna acima) — não há nada para reconciliar.
