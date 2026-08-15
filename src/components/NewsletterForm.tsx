"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

export function NewsletterForm() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="text-sm uppercase tracking-widest text-white">
        {t.newsletter.success}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-sm flex-col gap-3 sm:flex-row sm:gap-0"
    >
      <input
        type="email"
        required
        placeholder={t.newsletter.placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-white/30 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none sm:border-r-0"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="whitespace-nowrap border border-white bg-white px-6 py-3 text-xs font-medium uppercase tracking-widest text-vertex-black transition hover:bg-transparent hover:text-white disabled:opacity-50"
      >
        {status === "loading" ? "..." : t.newsletter.button}
      </button>
      {status === "error" && (
        <p className="mt-2 w-full text-xs text-red-400 sm:absolute">
          {t.newsletter.error}
        </p>
      )}
    </form>
  );
}
