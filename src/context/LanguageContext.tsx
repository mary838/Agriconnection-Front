"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, Dictionary, translations } from "@/lib/i18n";

type LanguageCtx = {
  language: Language;
  setLanguage: (lang: Language) => void;
  dict: Dictionary;
};

const LanguageContext = createContext<LanguageCtx>({
  language: "en",
  setLanguage: () => {},
  dict: translations.en,
});

const isLanguage = (val: string | null): val is Language =>
  val === "en" || val === "km" || val === "zh" || val === "fr";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem("language");
    if (isLanguage(stored)) setLanguageState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    localStorage.setItem("language", lang);
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dict: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
