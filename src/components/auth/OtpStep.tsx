'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { Button } from '@/components/ui/Button';

const LENGTH = 6;

interface OtpStepProps {
  phone: string;
  /** Seconds before "resend" is enabled */
  resendIn: number;
  error: string;
  loading: boolean;
  submitLabel: string;
  onSubmit: (code: string) => void;
  onResend: () => Promise<void>;
  onChangeNumber: () => void;
}

/** Step 2 of login / register: enter the WhatsApp code. */
export const OtpStep: React.FC<OtpStepProps> = ({ phone, resendIn, error, loading, submitLabel, onSubmit, onResend, onChangeNumber }) => {
  const [code, setCode] = useState('');
  const [left, setLeft] = useState(resendIn);
  const [resending, setResending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setLeft(resendIn), [resendIn]);
  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  useEffect(() => inputRef.current?.focus(), []);

  const onChange = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, LENGTH);
    setCode(digits);
    if (digits.length === LENGTH && !loading) onSubmit(digits); // auto-submit when complete
  };

  return (
    <div>
      <div className="flex items-start gap-3 rounded-xl bg-emerald-50 border border-emerald-100 p-3">
        <WhatsAppIcon className="w-6 h-6 text-[#25D366] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-slate-700">
          আপনার WhatsApp-এ একটি {LENGTH} সংখ্যার কোড পাঠানো হয়েছে:
          <span className="block font-bold font-sans text-slate-900" translate="no">{phone}</span>
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (code.length === LENGTH) onSubmit(code);
        }}
        className="mt-5 space-y-4"
      >
        <label className="block">
          <span className="block text-xs font-semibold text-slate-700 mb-1.5">ভেরিফিকেশন কোড</span>
          <input
            ref={inputRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d*"
            maxLength={LENGTH}
            placeholder="••••••"
            aria-label="OTP code"
            className="w-full h-14 text-center text-2xl tracking-[0.6em] font-bold font-sans rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-blue focus:outline-none"
          />
        </label>

        {error && <p className="text-sm text-red-600 font-semibold">{error}</p>}

        <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading || code.length !== LENGTH}>
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : submitLabel}
        </Button>
      </form>

      <div className="mt-4 flex items-center justify-between text-sm">
        <button type="button" onClick={onChangeNumber} className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800">
          <ArrowLeft className="w-4 h-4" /> নম্বর পরিবর্তন
        </button>
        {left > 0 ? (
          <span className="text-slate-400">আবার কোড পাঠান ({left}s)</span>
        ) : (
          <button
            type="button"
            disabled={resending}
            onClick={async () => {
              setResending(true);
              try {
                await onResend();
                setCode('');
              } finally {
                setResending(false);
              }
            }}
            className="font-bold text-brand-blue disabled:opacity-50"
          >
            আবার কোড পাঠান
          </button>
        )}
      </div>
    </div>
  );
};

/** "Provide your WhatsApp number" helper shown under the phone field. */
export const WhatsAppHint: React.FC = () => (
  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
    <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
    <span>
      <span className="font-sans" translate="no">Provide your WhatsApp number</span>: এই নম্বরে WhatsApp-এ OTP কোড যাবে
    </span>
  </p>
);
