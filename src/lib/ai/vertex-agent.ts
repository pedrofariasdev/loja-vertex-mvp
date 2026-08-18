import { Agent, tool } from "@openai/agents";
import { z } from "zod";

import { createServiceClient } from "@/lib/supabase/service";

const getOrderStatus = tool({
  name: "get_order_status",

  description:
    "Consulta o status de um pedido VERTEX. Só use esta ferramenta quando o cliente fornecer o número do pedido e o email usado na compra.",

  parameters: z.object({
    orderNumber: z
      .string()
      .regex(/^VTX-\d+$/i, "O pedido deve estar no formato VTX-1001"),

    customerEmail: z.string().min(3),
  }),

  execute: async ({ orderNumber, customerEmail }) => {
    console.log(
      "🔧 TOOL get_order_status chamada:",
      orderNumber
    );

    const normalizedOrder = orderNumber
      .trim()
      .toUpperCase();

    const numericOrderNumber = Number(
      normalizedOrder.replace("VTX-", "")
    );

    const normalizedEmail = customerEmail
      .trim()
      .toLowerCase();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(normalizedEmail)) {
        return {
            found: false,
            message: "O email informado não parece válido.",
        };
        }

    const supabase = createServiceClient();

    const { data: order, error } = await supabase
      .from("orders")
      .select(`
        id,
        order_number,
        customer_email,
        status,
        total_cents,
        currency,
        created_at,
        updated_at
      `)
      .eq("order_number", numericOrderNumber)
      .maybeSingle();

    if (error) {
      console.error("Erro Supabase:", error);

      return {
        success: false,
        message: "Não foi possível consultar o pedido.",
      };
    }

    // Não revelar se o pedido existe quando o email não confere.
    if (
      !order ||
      order.customer_email?.trim().toLowerCase() !== normalizedEmail
    ) {
      return {
        found: false,
        message:
          "Não foi possível validar o pedido com os dados informados.",
      };
    }

    return {
      found: true,
      orderNumber: `VTX-${order.order_number}`,
      status: order.status,
      totalCents: order.total_cents,
      currency: order.currency,
      createdAt: order.created_at,
    };
  },
});

export const vertexSupportAgent = new Agent({
  name: "VERTEX Support",

  instructions: `
Você é o assistente oficial de atendimento da VERTEX.

Ajude clientes com informações sobre pedidos.

REGRAS:

- Os pedidos VERTEX usam o formato VTX-1001.

- Para consultar um pedido, você precisa do número do pedido
  e do email utilizado na compra.

- Se o cliente fornecer apenas o número do pedido,
  peça o email utilizado na compra.

- Sempre use a ferramenta get_order_status
  para consultar informações de pedidos.

- Nunca invente status, datas ou informações.

- Nunca revele informações de um pedido sem validar
  número do pedido + email.

- Se a validação falhar, diga apenas que não foi possível
  validar o pedido com os dados informados.

- Nunca informe se um determinado número de pedido existe
  quando o email não corresponder.

- Não altere pedidos.
- Não cancele pedidos.
- Não realize reembolsos.
- Não altere dados do cliente.

Responda de forma curta, educada e profissional.
`,

  tools: [getOrderStatus],
});