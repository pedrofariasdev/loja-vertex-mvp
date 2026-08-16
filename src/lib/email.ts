import { Resend } from "resend";

/**
 * Email de confirmação de encomenda, enviado ao cliente pelo webhook da
 * Stripe assim que o pagamento é confirmado (ver `api/webhooks/stripe`).
 *
 * Requer a variável de ambiente RESEND_API_KEY (conta em resend.com).
 * Sem domínio verificado no Resend, usa-se o remetente de teste
 * `onboarding@resend.dev`, que só entrega para o email da própria conta
 * Resend — suficiente para testar o fluxo. Para enviar a clientes reais,
 * é preciso verificar um domínio (ex.: vertexwear.site) no Resend e
 * definir EMAIL_FROM com um endereço desse domínio.
 */

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const FROM_ADDRESS = process.env.EMAIL_FROM ?? "VERTEX <onboarding@resend.dev>";
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL ?? "contacto@vertexwear.site";

type OrderEmailItem = {
  productName: string;
  variantLabel: string;
  quantity: number;
  unitPriceCents: number;
};

type OrderEmailAddress = {
  line1: string | null;
  line2: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
};

export type OrderConfirmationPayload = {
  orderId: string;
  customerEmail: string;
  customerName: string | null;
  items: OrderEmailItem[];
  totalCents: number;
  currency: string;
  shippingAddress: OrderEmailAddress | null;
  isGift: boolean;
  giftMessage: string | null;
};

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildOrderConfirmationHtml(payload: OrderConfirmationPayload): string {
  const itemsHtml = payload.items
    .map(
      (item) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #eee;">
            <div style="font-weight:600;color:#111;font-size:14px;">${escapeHtml(item.productName)}</div>
            <div style="font-size:13px;color:#777;margin-top:2px;">${escapeHtml(item.variantLabel)}${item.variantLabel ? " · " : ""}Qtd. ${item.quantity}</div>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #eee;text-align:right;color:#111;font-size:14px;white-space:nowrap;">
            ${formatPrice(item.unitPriceCents * item.quantity, payload.currency)}
          </td>
        </tr>`
    )
    .join("");

  const addressHtml = payload.shippingAddress
    ? `
      <p style="margin:0;color:#333;font-size:14px;line-height:1.6;">
        ${payload.customerName ? escapeHtml(payload.customerName) + "<br />" : ""}
        ${escapeHtml(payload.shippingAddress.line1 ?? "")}${payload.shippingAddress.line2 ? ", " + escapeHtml(payload.shippingAddress.line2) : ""}<br />
        ${escapeHtml(payload.shippingAddress.postalCode ?? "")} ${escapeHtml(payload.shippingAddress.city ?? "")}<br />
        ${escapeHtml(payload.shippingAddress.country ?? "")}
      </p>`
    : "";

  const giftHtml =
    payload.isGift && payload.giftMessage
      ? `<p style="margin:20px 0 0;font-size:13px;color:#777;">🎁 Esta encomenda é uma prenda — a tua mensagem vai ser incluída na guia de remessa, sem preços visíveis.</p>`
      : "";

  return `
  <div style="background:#f5f5f5;padding:32px 16px;font-family:Helvetica,Arial,sans-serif;">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;padding:32px;">
      <p style="letter-spacing:2px;font-size:11px;color:#999;text-transform:uppercase;margin:0 0 24px;">VERTEX — Built by Discipline.</p>
      <h1 style="font-size:20px;margin:0 0 8px;color:#111;">Encomenda confirmada</h1>
      <p style="font-size:14px;color:#444;line-height:1.6;margin:0 0 24px;">
        Obrigado pela tua compra! Recebemos o teu pagamento e a tua encomenda já está a ser preparada.
      </p>
      <p style="font-size:12px;color:#999;margin:0 0 24px;">Nº da encomenda: ${escapeHtml(payload.orderId)}</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:8px;">
        ${itemsHtml}
        <tr>
          <td style="padding:16px 0 0;font-weight:700;color:#111;font-size:14px;">Total</td>
          <td style="padding:16px 0 0;font-weight:700;color:#111;font-size:14px;text-align:right;">
            ${formatPrice(payload.totalCents, payload.currency)}
          </td>
        </tr>
      </table>
      ${giftHtml}
      <div style="margin-top:32px;padding-top:24px;border-top:1px solid #eee;">
        <p style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#999;margin:0 0 8px;">Morada de entrega</p>
        ${addressHtml}
      </div>
      <p style="font-size:12px;color:#999;margin-top:32px;line-height:1.6;">
        Qualquer dúvida sobre a tua encomenda, responde a este email ou contacta-nos em
        <a href="mailto:${SUPPORT_EMAIL}" style="color:#111;">${SUPPORT_EMAIL}</a>.
      </p>
    </div>
  </div>`;
}

/**
 * Envia o email de confirmação ao cliente. Nunca lança — falhas ficam só
 * registadas na consola, para nunca bloquear o resto do webhook (a
 * encomenda já está paga e a ir para produção, independentemente do email).
 */
export async function sendOrderConfirmationEmail(
  payload: OrderConfirmationPayload
): Promise<void> {
  if (!resend) {
    console.error(
      "RESEND_API_KEY não configurado — email de confirmação não enviado."
    );
    return;
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: payload.customerEmail,
      subject: "VERTEX — Confirmação da tua encomenda",
      html: buildOrderConfirmationHtml(payload),
    });
    if (error) {
      console.error("Erro ao enviar email de confirmação:", error);
    }
  } catch (err) {
    console.error("Erro ao enviar email de confirmação:", err);
  }
}
