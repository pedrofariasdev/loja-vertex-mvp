"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

const STORAGE_KEY = "vertex-mvp-cookie-consent";

type Consent = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

export function CookieConsent() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setVisible(true);
  }, []);

  function persist(consent: Consent) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setVisible(false);
  }

  function acceptAll() {
    persist({ essential: true, analytics: true, marketing: true });
  }

  function rejectNonEssential() {
    persist({ essential: true, analytics: false, marketing: false });
  }

  function saveCustom() {
    persist({ essential: true, analytics, marketing });
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-vertex-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-5">
        <p className="text-xs leading-relaxed text-white/70">
          {t.cookieConsent.message}{" "}
          <Link href="/cookies" className="underline hover:text-white">
            /cookies
          </Link>
        </p>

        {customizing ? (
          <div className="mt-4 flex flex-col gap-3">
            <label className="flex items-center justify-between gap-4 text-xs text-white/70">
              <span>
                {t.cookieConsent.essential}
                <span className="ml-2 text-white/40">
                  ({t.cookieConsent.essentialNote})
                </span>
              </span>
              <input type="checkbox" checked disabled className="h-4 w-4" />
            </label>
            <label className="flex items-center justify-between gap-4 text-xs text-white/70">
              <span>{t.cookieConsent.analytics}</span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="h-4 w-4"
              />
            </label>
            <label className="flex items-center justify-between gap-4 text-xs text-white/70">
              <span>{t.cookieConsent.marketing}</span>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="h-4 w-4"
              />
            </label>
            <button
              onClick={saveCustom}
              className="mt-1 self-start border border-white bg-white px-5 py-2 text-xs font-medium uppercase tracking-widest text-vertex-black transition hover:bg-transparent hover:text-white"
            >
              {t.cookieConsent.save}
            </button>
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={acceptAll}
              className="border border-white bg-white px-5 py-2 text-xs font-medium uppercase tracking-widest text-vertex-black transition hover:bg-transparent hover:text-white"
            >
              {t.cookieConsent.acceptAll}
            </button>
            <button
              onClick={rejectNonEssential}
              className="border border-white/40 px-5 py-2 text-xs font-medium uppercase tracking-widest text-white transition hover:border-white"
            >
              {t.cookieConsent.rejectNonEssential}
            </button>
            <button
              onClick={() => setCustomizing(true)}
              className="px-5 py-2 text-xs font-medium uppercase tracking-widest text-white/70 underline transition hover:text-white"
            >
              {t.cookieConsent.customize}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
