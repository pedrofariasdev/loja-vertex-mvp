-- Tabela para o formulário de contacto (/contacto).
-- Corre isto no SQL Editor do teu projeto Supabase, tal como fizeste com o 0001 e o 0002.

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;

-- Sem políticas públicas de propósito: os pedidos só passam pela rota
-- /api/contact, que usa a service_role key (ignora RLS) no servidor.
