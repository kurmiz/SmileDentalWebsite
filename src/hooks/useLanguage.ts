import { useState, createContext, useContext } from "react";

type Language = "en" | "np";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (en: string, np: string) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggleLang: () => {},
  t: (en) => en,
});

export function useLanguageProvider() {
  const [lang, setLang] = useState<Language>("en");

  const toggleLang = () => setLang((l) => (l === "en" ? "np" : "en"));
  const t = (en: string, np: string) => (lang === "en" ? en : np);

  return { lang, toggleLang, t };
}

export const useLanguage = () => useContext(LanguageContext);
