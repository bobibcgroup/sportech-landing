"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "en" | "ar";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  isAutoAr: boolean;
}

const Ctx = createContext<LangCtx>({ lang: "en", setLang: () => {}, isAutoAr: false });

const STORAGE_KEY = "sportech-lang";

// Privacy-safe auto-detect: the browser's own language preference, read
// locally. No network call, no IP shared with a third party (GDPR / PDPA).
function prefersArabic(): boolean {
  if (typeof navigator === "undefined") return false;
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  return langs.some((l) => typeof l === "string" && l.toLowerCase().startsWith("ar"));
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [isAutoAr, setIsAutoAr] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "en" || saved === "ar") {
      setLangState(saved);
      return;
    }
    if (prefersArabic()) {
      setLangState("ar");
      setIsAutoAr(true);
    }
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return <Ctx.Provider value={{ lang, setLang, isAutoAr }}>{children}</Ctx.Provider>;
}

export function useLanguage() {
  return useContext(Ctx);
}
