# VERTEX — Loja Própria (MVP)

Projeto de teste: loja online própria (Next.js + Supabase + Stripe + Printful),
usando produtos reais da VERTEX como validação. Não substitui a loja Shopify
atual (vertexwear.pt), que continua a funcionar normalmente em paralelo.

Ver `PLANO_MVP_LOJA_PROPRIA_VERTEX.md` (na conversa) para o plano completo por fases.

## Estado atual

- [x] Projeto Next.js inicializado (TypeScript, Tailwind, App Router)
- [x] Dependências instaladas (`@supabase/supabase-js`, `@supabase/ssr`, `stripe`)
- [x] Clientes base criados: `src/lib/supabase/`, `src/lib/stripe.ts`, `src/lib/printful.ts`
- [x] Schema SQL inicial pronto em `supabase/migrations/0001_init.sql`
- [ ] Credenciais reais (Printful, Supabase, Stripe) — ver checklist abaixo
- [ ] Catálogo de produtos sincronizado
- [ ] Checkout funcional
- [ ] Integração de encomendas com a Printful

## Checklist para arrancar (Fase 0)

### 1. Printful
1. Entra em https://www.printful.com e confirma que tens uma conta/loja criada.
2. Vai a **Settings → Stores** e cria uma "loja" nova do tipo **API** (não Shopify/Etsy)
   — isto dá-te um `Store ID` dedicado ao MVP, separado de qualquer loja existente.
3. Vai a **Settings → API** e gera um **Private Token** (dá-lhe um nome tipo
   "vertex-mvp").
4. Copia o token e o Store ID.

### 2. Supabase
1. Cria um **novo projeto** em https://supabase.com/dashboard (não uses um projeto
   existente, para manter isto isolado).
2. Em **Project Settings → API**, copia:
   - `Project URL`
   - `anon public key`
   - `service_role key` (⚠️ nunca partilhes isto publicamente nem o commites)
3. Em **SQL Editor → New query**, cola o conteúdo de
   `supabase/migrations/0001_init.sql` e corre.

### 3. Stripe
1. Confirma que estás em **modo de teste** (toggle no canto superior do dashboard
   Stripe deve dizer "Test mode").
2. Em **Developers → API keys**, copia a `Publishable key` e a `Secret key` de teste
   (`pk_test_...` e `sk_test_...`).

### 4. Preencher o `.env.local`
Copia `.env.local.example` para `.env.local` e cola os valores recolhidos acima.
Este ficheiro nunca é commitado (já está no `.gitignore`).

```bash
cp .env.local.example .env.local
```

### 5. Confirmar que corre localmente
```bash
npm run dev
```
Abre http://localhost:3000 — deves ver a página inicial por defeito do Next.js.

---

Assim que tiveres as credenciais das três contas, envia-mas (podes colar os
valores diretamente aqui na conversa) e eu configuro o `.env.local` e avanço
para a Fase 1 (schema + sincronização do catálogo).
