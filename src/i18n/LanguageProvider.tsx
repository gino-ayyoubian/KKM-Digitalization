import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IntlProvider } from "react-intl";
import { loadMessages, Messages } from "./messagesLoader";

/**
 * Locale type matches the filenames produced by the extractor (lowercase).
 * The extractor will also produce src/types/i18n.generated.d.ts with a Locale union.
 */
export type Locale = "en" | "fa" | "ku" | "ar";

type LangContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  loading: boolean;
  messages: Messages | null;
};

const LangContext = createContext<LangContextValue | undefined>(undefined);

export function useLanguage(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

/**
 * LanguageProvider
 * - Lazy-loads locale messages (dynamic import)
 * - Caches loaded locales in-memory
 * - Updates document.dir for RTL locales (e.g. 'ar', 'fa', 'ku')
 * - Exposes locale, setLocale, loading and current messages
 */
export const LanguageProvider: React.FC<{
  defaultLocale?: Locale;
  children?: React.ReactNode;
}> = ({ defaultLocale = "en", children }) => {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState<Messages | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // in-memory cache for loaded messages
  const cacheRef = React.useRef<Record<string, Messages>>({});

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        if (cacheRef.current[locale]) {
          if (!mounted) return;
          setMessages(cacheRef.current[locale]);
        } else {
          const msgs = await loadMessages(locale);
          cacheRef.current[locale] = msgs;
          if (!mounted) return;
          setMessages(msgs);
        }
        // set direction for RTL locales
        const rtlLocales = new Set(["ar", "fa", "ku"]);
        const dir = rtlLocales.has(locale) ? "rtl" : "ltr";
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("dir", dir);
        }
      } catch (err) {
        console.error("Failed to load locale", locale, err);
        if (!mounted) return;
        setMessages(null);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      loading,
      messages,
    }),
    [locale, loading, messages]
  );

  return (
    <LangContext.Provider value={value}>
      <IntlProvider locale={locale} messages={messages ?? {}} defaultLocale="en">
        {children}
      </IntlProvider>
    </LangContext.Provider>
  );
};
