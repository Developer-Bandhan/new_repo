'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Field, inputCls } from '@/components/ui/Field';
import { PhoneInput, emptyPhone, toE164 } from '@/components/ui/PhoneInput';
import { COUNTRIES } from '@/data/countries';
import { POST_DEMAND_EVENT } from '@/lib/postDemand';

const UNITS = ['টন', 'কেজি', 'পিস', 'লট'];

const initialForm = {
  product: '',
  quantity: '',
  unit: UNITS[0],
  country: 'BD',
  city: '',
  email: '',
};

/** Mounted once in the root layout; open it with openPostDemand(). */
export const PostDemandModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [phone, setPhone] = useState(emptyPhone());
  const [error, setError] = useState('');

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(POST_DEMAND_EVENT, onOpen);
    return () => window.removeEventListener(POST_DEMAND_EVENT, onOpen);
  }, []);

  const close = () => {
    setOpen(false);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toE164(phone) && !form.email.trim()) {
      setError('মোবাইল নম্বর অথবা ইমেইল — অন্তত একটি দিন।');
      return;
    }
    setError('');
    // TODO(backend): POST the demand to the API. Currently UI-only.
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
      setForm(initialForm);
      setPhone(emptyPhone());
    }, 2200);
  };

  const set = (k: keyof typeof initialForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <Modal
      isOpen={open}
      onClose={close}
      title="আপনার কি মাল প্রয়োজন?"
      description="চাহিদা পোস্ট করুন, বিক্রেতারা সরাসরি যোগাযোগ করবেন।"
    >
      {submitted ? (
        <div className="py-6 text-center space-y-2 font-bengali">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <p className="text-base font-bold text-slate-800">চাহিদা সফলভাবে পোস্ট হয়েছে!</p>
          <p className="text-xs text-slate-500">বিক্রেতারা শীঘ্রই আপনার সাথে যোগাযোগ করবেন।</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 font-bengali">
          <Field label="কী মাল লাগবে" required>
            <input
              required
              value={form.product}
              onChange={set('product')}
              placeholder="যেমন: প্লেট সীসা (Plate Lead)"
              className={inputCls}
            />
          </Field>

          <div className="grid grid-cols-5 gap-3">
            <Field label="কত পরিমাণ" required className="col-span-3">
              <input
                required
                inputMode="decimal"
                value={form.quantity}
                onChange={set('quantity')}
                placeholder="যেমন: ৫"
                className={inputCls}
              />
            </Field>
            <Field label="একক" className="col-span-2">
              <select value={form.unit} onChange={set('unit')} className={inputCls}>
                {UNITS.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="কোন দেশ" required>
              <select value={form.country} onChange={set('country')} className={inputCls}>
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.nameBn} ({c.name})
                  </option>
                ))}
              </select>
            </Field>
            <Field label="জেলা / শহর" required>
              <input
                required
                value={form.city}
                onChange={set('city')}
                placeholder="যেমন: ঢাকা"
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="মোবাইল নম্বর (কান্ট্রি কোড সহ)">
            <PhoneInput value={phone} onChange={setPhone} />
          </Field>

          <Field label="ইমেইল (ঐচ্ছিক, মোবাইল না দিলে আবশ্যক)">
            <input
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="you@example.com"
              autoComplete="email"
              className={`${inputCls} font-sans`}
            />
          </Field>

          {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}

          <Button type="submit" variant="primary" fullWidth size="lg" className="font-bengali font-bold">
            চাহিদা পোস্ট করুন
          </Button>
        </form>
      )}
    </Modal>
  );
};
