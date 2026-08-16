# Programa de Influencers VERTEX — regras

## Como funciona (para a influencer)

1. Candidata-se em `/influencer` com nome, email e o código que quer usar (ex.: `MARIA`).
2. Recebe automaticamente 15% de desconto associado a esse código — sem aprovação manual.
3. Por cada venda feita por alguém que use o código dela, ela ganha pontos = 10% do subtotal dos produtos dessa venda (nunca sobre o frete). Recebe um email a avisar sempre que ganha pontos.
4. Consulta o saldo em `/influencer` a qualquer momento, com o email da candidatura.
5. A partir de 5€ em pontos, pode resgatar o saldo por um código de desconto de uso único.
6. **Esse código de resgate só funciona se ela finalizar a compra com o mesmo email da candidatura.** Se usar outro email, o desconto não é debitado do saldo dela (fica protegida) e fica marcado para eu rever manualmente.
7. **O desconto do resgate incide só sobre o valor dos produtos, nunca sobre o frete** — confirmado ao vivo (15% de desconto só nos 34,90€ do produto, não nos 39,80€ com portes).
8. **Se gastar menos do que o valor do código, a diferença não se perde** — volta automaticamente para o saldo dela, disponível para a próxima compra. Isto só é confirmado quando a Stripe avisa (via webhook) que a compra foi concluída — por isso pode demorar até a próxima consulta de saldo para aparecer atualizado.
9. Ao gerar um novo código de resgate, qualquer código de resgate anterior ainda não usado é automaticamente desativado (evita ela gastar o mesmo saldo duas vezes).

Este texto (resumido) já está no site, na secção de resgate de `/influencer`, em pt e en.

## Para mim (admin) — coisas a saber

- **Saldo real vive só na tabela `influencers.points_cents`** — a Stripe não sabe nada sobre saldo, só sobre os coupons/promotion codes que eu crio.
- Um código de resgate gerado (`influencer_redemptions`, status `pending`) reserva o saldo mas só é efetivamente descontado quando uma encomenda com esse código é confirmada no webhook. Estados possíveis:
  - `pending` — código gerado, ainda não usado.
  - `used` — usado com o email certo; saldo já descontado pelo valor real aplicado.
  - `email_mismatch` — usado com email diferente da candidatura; saldo protegido, **vale a pena rever manualmente na tabela** (pode ser a própria influencer a comprar com outro email por engano, ou alguém a usar um código que ela partilhou sem querer).
  - `voided` — substituído por um código de resgate mais recente antes de ser usado.
- Se aparecer um `email_mismatch`, o cliente já recebeu o desconto real na Stripe (isso não se pode desfazer), mas o saldo da influencer não foi tocado — a decisão de creditar manualmente ou não fica comigo, caso a caso.
- Nenhum limite de validade nos pontos por agora (não expiram). Se um dia quiser adicionar validade, é fácil de acrescentar.

## Pendente (ação manual necessária)

1. **Aplicar a migração `supabase/migrations/0008_influencer_redemption_status.sql`** no editor SQL da Supabase (copiar e colar o conteúdo do ficheiro e executar).
2. **Fazer commit e push** das alterações (já estão gravadas no teu computador, só falta):
   ```
   git add -A
   git commit -m "Programa de influencers: resgate acumula sobresso e exige email correto"
   git push
   ```
   O Vercel faz o deploy automático assim que o push chegar ao GitHub.
