'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { COUNTRIES, getCountry } from '@/data/countries';

export interface PhoneValue {
  /** ISO country code, e.g. 'BD' */
  country: string;
  number: string;
}

export const emptyPhone = (country = 'BD'): PhoneValue => ({ country, number: '' });

/** Returns international format like +8801712345678, or '' when empty. */
export const toE164 = (v: PhoneValue): string => {
  const digits = v.number.replace(/\D/g, '').replace(/^0+/, '');
  return digits ? `+${getCountry(v.country).dial}${digits}` : '';
};

interface PhoneInputProps {
  value: PhoneValue;
  onChange: (v: PhoneValue) => void;
  required?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, required }) => {
  const c = getCountry(value.country);
  return (
    <div className="flex rounded-lg border border-slate-300 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-brand-blue">
      <label className="relative flex items-center gap-1 pl-3 pr-2 bg-slate-50 border-r border-slate-300 text-sm text-slate-700 font-sans flex-shrink-0">
        <span translate="no" className="whitespace-nowrap">
          {c.code} +{c.dial}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        <select
          value={value.country}
          onChange={(e) => onChange({ ...value, country: e.target.value })}
          aria-label="Country code"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        >
          {COUNTRIES.map((o) => (
            <option key={o.code} value={o.code}>
              {o.name} (+{o.dial})
            </option>
          ))}
        </select>
      </label>
      <input
        type="tel"
        inputMode="tel"
        required={required}
        value={value.number}
        onChange={(e) => onChange({ ...value, number: e.target.value })}
        placeholder={value.country === 'BD' ? '01712345678' : 'Phone number'}
        autoComplete="tel-national"
        className="flex-1 min-w-0 px-3 py-2.5 text-base sm:text-sm focus:outline-none font-sans text-slate-800 placeholder-slate-400"
      />
    </div>
  );
};
