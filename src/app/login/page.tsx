'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';
import { PhoneInput, emptyPhone, toE164 } from '@/components/ui/PhoneInput';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { OtpStep, WhatsAppHint } from '@/components/auth/OtpStep';
import { useAuth } from '@/lib/auth';
import { errorMessage } from '@/lib/api';

export default function LoginPage() {
  const { requestOtp, login } = useAuth();
  const router = useRouter();
  const [phone, setPhone] = useState(emptyPhone());
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [resendIn, setResendIn] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const e164 = toE164(phone);

  const sendCode = async () => {
    setError('');
    setLoading(true);
    try {
      const r = await requestOtp(e164, 'login');
      setResendIn(r.resendIn);
      setStep('otp');
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  const verify = async (code: string) => {
    setError('');
    setLoading(true);
    try {
      const u = await login(e164, code);
      router.push(u.role === 'seller' ? '/dashboard' : '/');
    } catch (e) {
      setError(errorMessage(e));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-sm p-6 font-bengali">
        <h1 className="text-2xl font-bold text-brand-navy">লগইন করুন</h1>
        <p className="text-sm text-slate-500 mt-1">WhatsApp নম্বর ও OTP কোড দিয়ে প্রবেশ করুন</p>

        <div className="mt-6">
          {step === 'phone' ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!e164) return setError('কান্ট্রি কোড সহ সঠিক WhatsApp নম্বর দিন।');
                sendCode();
              }}
              className="space-y-4"
            >
              <Field label="আপনার WhatsApp নম্বর" required>
                <PhoneInput value={phone} onChange={setPhone} required />
                <WhatsAppHint />
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
          ) : (
            <OtpStep
              phone={e164}
              resendIn={resendIn}
              error={error}
              loading={loading}
              submitLabel="লগইন"
              onSubmit={verify}
              onResend={sendCode}
              onChangeNumber={() => {
                setError('');
                setStep('phone');
              }}
            />
          )}
        </div>

        <p className="mt-5 text-sm text-slate-600 text-center">
          অ্যাকাউন্ট নেই?{' '}
          <Link href="/register" className="font-bold text-brand-blue">নতুন অ্যাকাউন্ট খুলুন</Link>
        </p>
      </div>
    </div>
  );
}
