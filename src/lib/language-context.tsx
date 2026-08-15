"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, type Locale, type Dictionary } from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "vertex-mvp-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "pt" || saved === "en") {
      setLocaleState(saved);
    }
  }, []);

  function setLocale(next: Locale) {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, t: dictionaries[locale] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage tem de ser usado dentro de <LanguageProvider>.");
  }
  return ctx;
}
