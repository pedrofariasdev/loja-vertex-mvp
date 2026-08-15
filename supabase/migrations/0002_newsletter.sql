-- Tabela para o formulário "Join the Discipline" (newsletter) no rodapé.
-- Corre isto no SQL Editor do teu projeto Supabase, tal como fizeste com o 0001.

create table if not exists newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table newsletter_signups enable row level security;

-- Sem políticas públicas de propósito: os pedidos só passam pela rota
-- /api/newsletter, que usa a service_role key (ignora RLS) no servidor.
