"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import styles from "./vertex-agent-chat.module.css";

type Message = {
  role: "user" | "assistant";
  text: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    text: "Olá! Sou o assistente da VERTEX. Como posso ajudar?",
  },
];

const CONVERSATION_KEY = "vertex_agent_conversation_id";
const MESSAGES_KEY = "vertex_agent_messages";
const HELP_HINT_KEY = "vertex_help_hint_shown";

export default function VertexAgentChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHelpHint, setShowHelpHint] = useState(false);

  const [messages, setMessages] =
    useState<Message[]>(INITIAL_MESSAGES);

  // Mostra "Precisa de ajuda?" depois de 20 segundos.
  // Aparece apenas uma vez por sessão.
  useEffect(() => {
    const alreadyShown =
      sessionStorage.getItem(HELP_HINT_KEY);

    if (alreadyShown) {
      return;
    }

    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const showTimer = setTimeout(() => {
      setShowHelpHint(true);

      sessionStorage.setItem(
        HELP_HINT_KEY,
        "true"
      );

      hideTimer = setTimeout(() => {
        setShowHelpHint(false);
      }, 6000);
    }, 20000);

    return () => {
      clearTimeout(showTimer);

      if (hideTimer) {
        clearTimeout(hideTimer);
      }
    };
  }, []);

  function saveMessages(nextMessages: Message[]) {
    setMessages(nextMessages);

    sessionStorage.setItem(
      MESSAGES_KEY,
      JSON.stringify(nextMessages)
    );
  }

  async function sendMessage(event: FormEvent) {
    event.preventDefault();

    const message = input.trim();

    if (!message || loading) {
      return;
    }

    // Se o cliente começou a conversar,
    // não precisamos mais mostrar o aviso.
    setShowHelpHint(false);

    const userMessage: Message = {
      role: "user",
      text: message,
    };

    const messagesWithUser = [
      ...messages,
      userMessage,
    ];

    saveMessages(messagesWithUser);

    setInput("");
    setLoading(true);

    try {
      const conversationId =
        sessionStorage.getItem(CONVERSATION_KEY);

      const response = await fetch("/api/agent/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message,
          conversationId,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Erro ${response.status} ao consultar o agente`
        );
      }

      const data = await response.json();

      if (data.conversationId) {
        sessionStorage.setItem(
          CONVERSATION_KEY,
          data.conversationId
        );
      }

      const assistantMessage: Message = {
        role: "assistant",
        text:
          data.message ??
          "Não consegui responder neste momento.",
      };

      saveMessages([
        ...messagesWithUser,
        assistantMessage,
      ]);
    } catch (error) {
      console.error("Erro VERTEX Agent:", error);

      const errorMessage: Message = {
        role: "assistant",
        text:
          "Tive um problema para responder agora. Tente novamente em instantes.",
      };

      saveMessages([
        ...messagesWithUser,
        errorMessage,
      ]);
    } finally {
      setLoading(false);
    }
  }

  function startNewConversation() {
    sessionStorage.removeItem(CONVERSATION_KEY);
    sessionStorage.removeItem(MESSAGES_KEY);

    setMessages(INITIAL_MESSAGES);
    setInput("");
  }

  function toggleChat() {
    setOpen((current) => !current);
    setShowHelpHint(false);
  }

  return (
    <>
      {open && (
        <section className={styles.chat}>
          <header className={styles.header}>
            <div>
              <strong>VERTEX</strong>
              <span>Assistente</span>
            </div>

            <div className={styles.headerActions}>
              <button
                type="button"
                onClick={startNewConversation}
                className={styles.newChat}
              >
                Nova
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className={styles.close}
                aria-label="Fechar chat"
              >
                ×
              </button>
            </div>
          </header>

          <div className={styles.messages}>
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={
                  message.role === "user"
                    ? styles.userMessage
                    : styles.assistantMessage
                }
              >
                {message.text}
              </div>
            ))}

            {loading && (
              <div className={styles.assistantMessage}>
                <span className={styles.typing}>
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            )}
          </div>

          <form
            className={styles.form}
            onSubmit={sendMessage}
          >
            <input
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              placeholder="Digite sua mensagem..."
              disabled={loading}
              autoComplete="off"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Enviar mensagem"
            >
              ↑
            </button>
          </form>
        </section>
      )}

      {showHelpHint && !open && (
        <div className={styles.helpHint}>
          Precisa de ajuda?
        </div>
      )}

      <button
        type="button"
        className={styles.launcher}
        onClick={toggleChat}
        aria-label="Abrir assistente VERTEX"
      >
        <Image
          src="/vertex-agent-icon.png"
          alt=""
          width={42}
          height={42}
          className={styles.launcherIcon}
        />
      </button>
    </>
  );
}