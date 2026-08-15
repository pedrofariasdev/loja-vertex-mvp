import Stripe from "stripe";

/**
 * Cliente Stripe do lado do servidor. A chave secreta nunca deve ser
 * exposta ao browser — só é usada em API routes / server actions.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-07-29.dahlia",
});
