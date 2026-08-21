import { NextResponse } from "next/server";
import {
  OpenAIConversationsSession,
  run,
} from "@openai/agents";

import { vertexSupportAgent } from "@/lib/ai/vertex-agent";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const message = body.message;
    const conversationId = body.conversationId;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        {
          error: "Mensagem inválida",
        },
        {
          status: 400,
        }
      );
    }

    // Se já existe uma conversa, continuamos ela.
    // Se não existe, criamos uma nova.
    const session = conversationId
      ? new OpenAIConversationsSession({
          conversationId,
        })
      : new OpenAIConversationsSession();

    const result = await run(
      vertexSupportAgent,
      message,
      {
        session,
      }
    );

    // Obtém o ID criado ou reutilizado pela sessão.
    const sessionId = await session.getSessionId();

    return NextResponse.json({
      message: result.finalOutput,
      conversationId: sessionId,
    });
  } catch (error) {
    console.error("VERTEX Agent error:", error);

    return NextResponse.json(
      {
        error: "Erro ao executar o agente.",
      },
      {
        status: 500,
      }
    );
  }
}