'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, ShoppingBag, Store } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Field, inputCls } from '@/components/ui/Field';
import { PhoneInput, emptyPhone, toE164 } from '@/components/ui/PhoneInput';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { OtpStep, WhatsAppHint } from '@/components/auth/OtpStep';
import { COUNTRIES } from '@/data/countries';
import { useAuth, type Role } from '@/lib/auth';
import { errorMessage } from '@/lib/api';

function RegisterForm() {
  const { requestOtp, register } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const [role, setRole] = useState<Role>(params.get('role') === 'seller' ? 'seller' : 'buyer');
  const [form, setForm] = useState({ name: '', shopName: '', email: '', country: 'BD' });
  const [phone, setPhone] = useState(emptyPhone());
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [resendIn, setResendIn] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const e164 = toE164(phone);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [k]: e.target.value });
    // Picking a country also preselects its dial code
    if (k === 'country' && !phone.number) setPhone(emptyPhone(e.target.value));
  };

  const sendCode = async () => {
    setError('');
    setLoading(true);
    try {
      const r = await requestOtp(e164, 'register');
      setResendIn(r.resendIn);
      setStep('otp');
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  const verify = async (otp: string) => {
    setError('');
    setLoading(true);
    try {
      await register({
        phone: e164,
        otp,
        role,
        name: form.name.trim(),
        country: form.country,
        email: form.email.trim() || undefined,
        shopName: role === 'seller' ? form.shopName.trim() || undefined : undefined,
      });
      router.push(role === 'seller' ? '/dashboard/shop' : '/');
    } catch (e) {
      setError(errorMessage(e));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm p-6 font-bengali">
        <h1 className="text-2xl font-bold text-brand-navy">নতুন অ্যাকাউন্ট</h1>
        <p className="text-sm text-slate-500 mt-1">বাংলাদেশসহ যেকোনো দেশ থেকে খুলতে পারবেন</p>

        {step === 'otp' ? (
          <div className="mt-6">
            <OtpStep
              phone={e164}
              resendIn={resendIn}
              error={error}
              loading={loading}
              submitLabel="অ্যাকাউন্ট খুলুন"
              onSubmit={verify}
              onResend={sendCode}
              onChangeNumber={() => {
                setError('');
                setStep('details');
              }}
            />
          </div>
        ) : (
          <>
            {/* Role */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              {([
                ['buyer', 'আমি ক্রেতা', ShoppingBag],
                ['seller', 'আমি বিক্রেতা', Store],
              ] as const).map(([value, label, Icon]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRole(value)}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 text-sm font-bold transition ${
                    role === value ? 'border-brand-orange bg-orange-50 text-brand-orange' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </div>
            {role === 'seller' && (
              <p className="mt-2 text-xs text-slate-500">দোকান ও পণ্য অ্যাডমিন অনুমোদনের পর লাইভ হবে।</p>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!e164) return setError('কান্ট্রি কোড সহ সঠিক WhatsApp নম্বর দিন।');
                sendCode();
              }}
              className="mt-5 space-y-4"
            >
              <Field label="আপনার নাম" required>
                <input required minLength={2} maxLength={120} value={form.name} onChange={set('name')} className={inputCls} />
              </Field>
              {role === 'seller' && (
                <Field label="দোকান / প্রতিষ্ঠানের নাম">
                  <input maxLength={160} value={form.shopName} onChange={set('shopName')} placeholder="যেমন: রহিম ব্যাটারি হাউস" className={inputCls} />
                </Field>
              )}
              <Field label="দেশ" required>
                <select value={form.country} onChange={set('country')} className={inputCls}>
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.nameBn} ({c.name})</option>
                  ))}
                </select>
              </Field>
              <Field label="আপনার WhatsApp নম্বর" required>
                <PhoneInput value={phone} onChange={setPhone} required />
                <WhatsAppHint />
              </Field>
              <Field label="ইমেইল (ঐচ্ছিক)">
                <input type="email" autoComplete="email" value={form.email} onChange={set('email')} placeholder="you@example.com" className={`${inputCls} font-sans`} />
              </Field>

              {error && <p className="text-sm text-red-600 font-semibold">{error}</p>}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
                leftIcon={loading ? undefined : <WhatsAppIcon className="w-4 h-4" />}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'WhatsApp-এ কোড পাঠান'}
              </Button>
            </form>
          </>
        )}

        <p className="mt-5 text-sm text-slate-600 text-center">
          আগে থেকে অ্যাকাউন্ট আছে? <Link href="/login" className="font-bold text-brand-blue">লগইন</Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}
