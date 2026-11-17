'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Field, inputCls } from '@/components/ui/Field';
import { ImagePicker } from '@/components/ui/ImagePicker';
import { PhoneInput, emptyPhone } from '@/components/ui/PhoneInput';
import { COUNTRIES } from '@/data/countries';
import { useAuth } from '@/lib/auth';

export default function DashboardShop() {
  const { user, updateUser } = useAuth();
  const [saved, setSaved] = useState(false);
  const [phone, setPhone] = useState(emptyPhone(user?.country ?? 'BD'));
  const [form, setForm] = useState({
    shopName: user?.name ?? '',
    country: user?.country ?? 'BD',
    city: '',
    address: '',
    categories: '',
    bio: '',
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO(backend): PUT /seller/shop (multipart with logo/banner/photos). Resets approval to pending.
    updateUser({ name: form.shopName, country: form.country, shopStatus: user?.shopStatus === 'approved' ? 'approved' : 'pending' });
    setSaved(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-200 p-4 lg:p-6 space-y-5">
      <div>
        <h2 className="font-bold text-slate-900">আমার দোকান সাজান</h2>
        <p className="text-xs text-slate-500 mt-0.5">এই তথ্যগুলো আপনার দোকানের পেজে ক্রেতারা দেখবেন</p>
      </div>

      {saved && (
        <div className="flex gap-2 items-start rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-800">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          তথ্য জমা হয়েছে। অ্যাডমিন যাচাইয়ের পর দোকানে দেখাবে।
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        <ImagePicker label="লোগো" aspect="aspect-square" />
        <div className="col-span-2">
          <ImagePicker label="ব্যানার" aspect="aspect-[2/1]" hint="১২০০×৬০০ সাইজ ভালো দেখায়" />
        </div>
      </div>

      <Field label="দোকানের নাম" required>
        <input required value={form.shopName} onChange={set('shopName')} className={inputCls} />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="দেশ" required>
          <select value={form.country} onChange={set('country')} className={inputCls}>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>{c.nameBn} ({c.name})</option>
            ))}
          </select>
        </Field>
        <Field label="জেলা / শহর" required>
          <input required value={form.city} onChange={set('city')} placeholder="যেমন: ঢাকা" className={inputCls} />
        </Field>
      </div>

      <Field label="পূর্ণ ঠিকানা / গোডাউন" required>
        <input required value={form.address} onChange={set('address')} placeholder="যেমন: প্লট ৪২, সায়েদাবাদ পাইকারি মার্কেট" className={inputCls} />
      </Field>

      <Field label="হোয়াটসঅ্যাপ / মোবাইল (কান্ট্রি কোড সহ)" required>
        <PhoneInput value={phone} onChange={setPhone} required />
      </Field>

      <Field label="কী কী মাল বিক্রি করেন">
        <input value={form.categories} onChange={set('categories')} placeholder="যেমন: প্লেট সীসা, পুরাতন ব্যাটারি, লোহা" className={inputCls} />
      </Field>

      <Field label="দোকান সম্পর্কে">
        <textarea rows={3} value={form.bio} onChange={set('bio')} placeholder="আপনার ব্যবসা, অভিজ্ঞতা, ডেলিভারি সুবিধা..." className={inputCls} />
      </Field>

      <div>
        <p className="text-xs font-semibold text-slate-700 mb-1">দোকান / গোডাউনের ছবি (সর্বোচ্চ ৩টি)</p>
        <div className="grid grid-cols-3 gap-3">
          <ImagePicker label="" />
          <ImagePicker label="" />
          <ImagePicker label="" />
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg" fullWidth>
        সংরক্ষণ করুন
      </Button>
    </form>
  );
}
