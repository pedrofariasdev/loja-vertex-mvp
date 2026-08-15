import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase para leituras públicas feitas no servidor (Server Components).
 * Usa a chave "anon" — respeita as políticas de Row Level Security (RLS),
 * tal como aconteceria se fosse chamado a partir do browser.
 */
export function createPublicServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Faltam NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY nas variáveis de ambiente."
    );
  }

  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}
