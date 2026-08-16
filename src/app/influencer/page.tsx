"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

const inputClass =
  "w-full border border-vertex-black/20 bg-transparent px-4 py-3 text-sm text-vertex-black placeholder:text-vertex-gray/60 focus:border-vertex-black focus:outline-none";
const buttonClass =
  "mt-2 border border-vertex-black bg-vertex-black px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-vertex-gray hover:border-vertex-gray disabled:opacity-50";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

function SignupForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resultCode, setResultCode] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/influencers/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error ?? t.influencer.formError);
        setStatus("error");
        return;
      }
      setResultCode(data.code);
      setStatus("done");
    } catch {
      setErrorMessage(t.influencer.formError);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-vertex-black/10 bg-vertex-offwhite p-6 text-center">
        <p className="font-serif text-lg font-bold uppercase tracking-tight text-vertex-black">
          {t.influencer.signupSuccessTitle}
        </p>
        <p className="mt-2 text-sm text-vertex-gray">
          {t.influencer.signupSuccessBody}
        </p>
        <p className="mt-4 text-2xl font-bold tracking-widest text-vertex-black">
          {resultCode}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <input
        type="text"
        required
        placeholder={t.influencer.formName}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass}
      />
      <input
        type="email"
        required
        placeholder={t.influencer.formEmail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />
      <div>
        <input
          type="text"
          required
          placeholder={t.influencer.formCode}
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-vertex-gray">
          {t.influencer.formCodeHint}
        </p>
      </div>
      <button type="submit" disabled={status === "loading"} className={buttonClass}>
        {status === "loading" ? t.influencer.formSubmitting : t.influencer.formSubmit}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-600">{errorMessage}</p>
      )}
    </form>
  );
}

function StatusPanel() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "done" | "notFound" | "error"
  >("idle");
  const [balance, setBalance] = useState<{
    name: string;
    code: string;
    pointsCents: number;
    lifetimeSalesCents: number;
  } | null>(null);
  const [redeemStatus, setRedeemStatus] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");
  const [redeemCode, setRedeemCode] = useState("");
  const [redeemError, setRedeemError] = useState("");

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setRedeemStatus("idle");
    try {
      const res = await fetch("/api/influencers/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.status === 404) {
        setStatus("notFound");
        return;
      }
      if (!res.ok) throw new Error();
      const data = await res.json();
      setBalance(data);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  async function handleRedeem() {
    setRedeemStatus("loading");
    setRedeemError("");
    try {
      const res = await fetch("/api/influencers/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setRedeemError(data.error ?? t.influencer.redeemError);
        setRedeemStatus("error");
        return;
      }
      setRedeemCode(data.discountCode);
      setRedeemStatus("done");
    } catch {
      setRedeemError(t.influencer.redeemError);
      setRedeemStatus("error");
    }
  }

  return (
    <div className="flex flex-col gap-4 text-left">
      <form onSubmit={handleLookup} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          placeholder={t.influencer.formEmail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="whitespace-nowrap border border-vertex-black px-6 py-3 text-xs font-bold uppercase tracking-widest text-vertex-black transition hover:bg-vertex-black hover:text-white disabled:opacity-50"
        >
          {t.influencer.statusSubmit}
        </button>
      </form>

      {status === "notFound" && (
        <p className="text-xs text-red-600">{t.influencer.statusNotFound}</p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-600">{t.influencer.formError}</p>
      )}

      {status === "done" && balance && (
        <div className="border border-vertex-black/10 bg-vertex-offwhite p-6">
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-vertex-gray">{t.influencer.statusCodeLabel}</span>
              <span className="font-bold tracking-widest text-vertex-black">
                {balance.code}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-vertex-gray">{t.influencer.statusPointsLabel}</span>
              <span className="font-bold text-vertex-black">
                {formatPrice(balance.pointsCents)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-vertex-gray">{t.influencer.statusSalesLabel}</span>
              <span className="text-vertex-black">
                {formatPrice(balance.lifetimeSalesCents)}
              </span>
            </div>
          </div>

          {redeemStatus === "done" ? (
            <div className="mt-4 border-t border-vertex-black/10 pt-4 text-center">
              <p className="text-sm font-semibold text-vertex-black">
                {t.influencer.redeemSuccessTitle}
              </p>
              <p className="mt-1 text-xs text-vertex-gray">
                {t.influencer.redeemSuccessBody}
              </p>
              <p className="mt-3 text-xl font-bold tracking-widest text-vertex-black">
                {redeemCode}
              </p>
            </div>
          ) : (
            <div className="mt-4 border-t border-vertex-black/10 pt-4">
              <button
                onClick={handleRedeem}
                disabled={redeemStatus === "loading"}
                className={buttonClass}
              >
                {t.influencer.redeemButton}
              </button>
              <p className="mt-2 text-xs text-vertex-gray">
                {t.influencer.redeemMinNote}
              </p>
              <p className="mt-2 text-xs text-vertex-gray">
                {t.influencer.redeemRulesNote}
              </p>
              {redeemStatus === "error" && (
                <p className="mt-2 text-xs text-red-600">{redeemError}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function InfluencerPage() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-xl px-6 py-24">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-vertex-gray">
          {t.influencer.heroEyebrow}
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold uppercase tracking-tight text-vertex-black md:text-4xl">
          {t.influencer.heroTitle}
        </h1>
        <p className="mt-6 text-base text-vertex-gray">{t.influencer.heroBody}</p>
        <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-vertex-black">
          {t.influencer.discountPercent}
        </p>
      </div>

      <div className="mt-14">
        <h2 className="mb-4 font-serif text-lg font-bold uppercase tracking-tight text-vertex-black">
          {t.influencer.signupTitle}
        </h2>
        <SignupForm />
      </div>

      <div className="mt-16 border-t border-vertex-black/10 pt-10">
        <h2 className="mb-1 font-serif text-lg font-bold uppercase tracking-tight text-vertex-black">
          {t.influencer.statusTitle}
        </h2>
        <p className="mb-4 text-sm text-vertex-gray">{t.influencer.statusBody}</p>
        <StatusPanel />
      </div>
    </section>
  );
}
