"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";

const STORAGE_KEY = "vertex-mvp-promo-dismissed";

export function AnnouncementBar() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  function handleDismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="relative flex items-center justify-center bg-vertex-black px-10 py-2.5 text-center text-white">
      <p className="text-xs uppercase tracking-widest">
        {t.promo.message}{" "}
        <span className="font-bold tracking-[0.15em]">{t.promo.code}</span>{" "}
        {t.promo.detail}
      </p>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label={t.promo.dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 transition hover:text-white"
      >
        ✕
      </button>
    </div>
  );
}
