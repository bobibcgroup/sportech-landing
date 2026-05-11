"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "en" | "ar";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  isAutoAr: boolean;
}

const Ctx = createContext<LangCtx>({ lang: "en", setLang: () => {}, isAutoAr: false });

const ARABIC_COUNTRIES = new Set([
  "SA", "AE", "QA", "KW", "BH", "OM", "JO", "EG", "MA", "DZ", "TN", "LY", "IQ", "SY", "LB", "YE", "SD",
]);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [isAutoAr, setIsAutoAr] = useState(false);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        if (ARABIC_COUNTRIES.has(data.country_code)) {
          setLang("ar");
          setIsAutoAr(true);
        }
      })
      .catch(() => {});
  }, []);

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
