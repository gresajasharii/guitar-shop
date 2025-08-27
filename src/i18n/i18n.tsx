import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { strings, type Lang } from "./strings";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<Ctx | null>(null);

function get(obj: any, path: string) {
  return path.split(".").reduce((acc: any, k) => (acc ? acc[k] : undefined), obj);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    return saved ?? "en";
  });

  const t = useMemo(
    () => (key: string, vars?: Record<string, string | number>) => {
      const raw = get(strings[lang], key) ?? key;
      if (!vars) return String(raw);
      return String(raw).replace(/\{\{(\w+)\}\}/g, (_, k) =>
        vars[k] !== undefined ? String(vars[k]) : `{{${k}}}`
      );
    },
    [lang]
  );

  const api: Ctx = useMemo(
    () => ({
      lang,
      setLang: (l) => {
        localStorage.setItem("lang", l);
        setLang(l);
      },
      t,
    }),
    [lang, t]
  );

  return <I18nContext.Provider value={api}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
