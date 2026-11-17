'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, Globe } from 'lucide-react';

const LANGS = [
  { code: 'bn', label: 'বাংলা' },
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ur', label: 'اردو' },
  { code: 'ar', label: 'العربية' },
  { code: 'es', label: 'Español' },
  { code: 'it', label: 'Italiano' },
  { code: 'fr', label: 'Français' },
  { code: 'pt', label: 'Português' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'zh-CN', label: '中文' },
];

const SOURCE_LANG = 'bn';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const readCurrent = (): string => {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
  return m ? decodeURIComponent(m[1]) : SOURCE_LANG;
};

const writeCookie = (value: string | null) => {
  const host = window.location.hostname;
  const exp = value ? '' : ';expires=Thu, 01 Jan 1970 00:00:00 GMT';
  const v = value ?? '';
  document.cookie = `googtrans=${v};path=/${exp}`;
  document.cookie = `googtrans=${v};path=/;domain=${host}${exp}`;
};

/** Loads Google Translate once for the whole app. Mount once in the root layout. */
export const GoogleTranslateLoader: React.FC = () => {
  useEffect(() => {
    if (document.getElementById('google-translate-script')) return;
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: SOURCE_LANG, autoDisplay: false },
        'google_translate_element'
      );
    };
    const s = document.createElement('script');
    s.id = 'google-translate-script';
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return <div id="google_translate_element" className="hidden" aria-hidden suppressHydrationWarning />;
};

interface LanguageSwitcherProps {
  /** 'dark' = on navy background (white icon), 'light' = on white background */
  tone?: 'dark' | 'light';
  /** Show the current language name next to the globe */
  showLabel?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ tone = 'light', showLabel = false }) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(SOURCE_LANG);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setCurrent(readCurrent()), []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, [open]);

  const choose = (code: string) => {
    setOpen(false);
    if (code === current) return;
    writeCookie(code === SOURCE_LANG ? null : `/${SOURCE_LANG}/${code}`);
    window.location.reload();
  };

  const currentLabel = LANGS.find((l) => l.code === current)?.label ?? 'বাংলা';
  const btn =
    tone === 'dark'
      ? 'bg-white/10 hover:bg-white/20 text-white'
      : 'bg-slate-100 hover:bg-slate-200 text-slate-700';

  return (
    <div ref={ref} className="relative notranslate" translate="no">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change language"
        aria-expanded={open}
        className={`h-9 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${btn} ${
          showLabel ? 'px-3' : 'w-9'
        }`}
      >
        <Globe className="w-[18px] h-[18px]" />
        {showLabel && <span className="text-xs font-semibold">{currentLabel}</span>}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 max-h-[70vh] overflow-y-auto bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => choose(l.code)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 text-left"
            >
              <span>{l.label}</span>
              {l.code === current && <Check className="w-4 h-4 text-brand-orange" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
