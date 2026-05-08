import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import zh from './zh';
import en from './en';
import type { Translations } from './zh';
import type { Language } from '../types';

interface I18nContextValue {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
}

const packs: Record<Language, Translations> = { zh, en };

const I18nContext = createContext<I18nContextValue>({
  lang: 'zh',
  t: zh,
  setLang: () => {},
});

const STORAGE_KEY = 'basketball-tactics-lang';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'en' ? 'en' : 'zh';
  });

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }, []);

  return (
    <I18nContext.Provider value={{ lang, t: packs[lang], setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
