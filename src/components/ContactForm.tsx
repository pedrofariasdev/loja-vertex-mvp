"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

const inputClass =
  "w-full border border-vertex-black/20 bg-transparent px-4 py-3 text-sm text-vertex-black placeholder:text-vertex-gray/60 focus:border-vertex-black focus:outline-none";

export function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, message }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="text-sm font-semibold uppercase tracking-widest text-vertex-black">
        {t.contact.formSuccess}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          required
          placeholder={t.contact.formFirstName}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={inputClass}
        />
        <input
          type="text"
          required
          placeholder={t.contact.formLastName}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={inputClass}
        />
      </div>
      <input
        type="email"
        required
        placeholder={t.contact.formEmail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />
      <input
        type="tel"
        placeholder={t.contact.formPhoneOptional}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={inputClass}
      />
      <textarea
        required
        rows={5}
        placeholder={t.contact.formMessage}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 border border-vertex-black bg-vertex-black px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-vertex-gray hover:border-vertex-gray disabled:opacity-50"
      >
        {status === "loading" ? t.contact.formSubmitting : t.contact.formSubmit}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-600">{t.contact.formError}</p>
      )}
    </form>
  );
}
