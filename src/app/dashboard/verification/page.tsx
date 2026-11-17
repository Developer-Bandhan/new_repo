'use client';

import React, { useState } from 'react';
import { ShieldCheck, Clock, XCircle, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ImagePicker } from '@/components/ui/ImagePicker';
import { useAuth } from '@/lib/auth';

const DOC_ACCEPT = 'image/png,image/jpeg,image/webp,application/pdf';

export default function DashboardVerification() {
  const { user, updateUser } = useAuth();
  const [docs, setDocs] = useState<{ nidFront: File | null; nidBack: File | null; license: File | null }>({
    nidFront: null,
    nidBack: null,
    license: null,
  });
  const status = user?.verification ?? 'none';
  const ready = (docs.nidFront && docs.nidBack) || docs.license;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO(backend): POST /seller/verification (multipart). Admin reviews in the admin panel.
    updateUser({ verification: 'pending' });
  };

  if (status === 'approved') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
        <BadgeCheck className="w-12 h-12 text-emerald-600 mx-auto" />
        <h2 className="mt-3 text-lg font-bold text-slate-900">আপনি Verified Seller</h2>
        <p className="text-sm text-slate-500 mt-1">আপনার দোকান ও পণ্যে ভেরিফাইড ব্যাজ দেখাচ্ছে।</p>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
        <Clock className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="mt-3 text-lg font-bold text-slate-900">কাগজপত্র যাচাই চলছে</h2>
        <p className="text-sm text-slate-500 mt-1">অ্যাডমিন যাচাই করে সাধারণত ২৪-৪৮ ঘণ্টার মধ্যে ব্যাজ দেবেন।</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-200 p-4 lg:p-6 space-y-5">
      <div className="flex gap-3">
        <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </span>
        <div>
          <h2 className="font-bold text-slate-900">&quot;Verified Seller&quot; ব্যাজ নিন</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            NID-এর দুই পাশ অথবা ট্রেড লাইসেন্স জমা দিন। ভেরিফাইড বিক্রেতাদের ক্রেতারা বেশি বিশ্বাস করেন।
          </p>
        </div>
      </div>

      {status === 'rejected' && (
        <div className="flex gap-2 items-start rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          <XCircle className="w-5 h-5 flex-shrink-0" />
          আগের কাগজ গ্রহণ করা হয়নি। পরিষ্কার ছবি দিয়ে আবার জমা দিন।
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <ImagePicker label="NID সামনের দিক" aspect="aspect-[3/2]" accept={DOC_ACCEPT} onChange={(f) => setDocs({ ...docs, nidFront: f })} />
        <ImagePicker label="NID পেছনের দিক" aspect="aspect-[3/2]" accept={DOC_ACCEPT} onChange={(f) => setDocs({ ...docs, nidBack: f })} />
      </div>

      <div className="flex items-center gap-3 text-xs text-slate-400">
        <span className="flex-1 h-px bg-slate-200" /> অথবা <span className="flex-1 h-px bg-slate-200" />
      </div>

      <ImagePicker label="ট্রেড লাইসেন্স" aspect="aspect-[3/1]" accept={DOC_ACCEPT} hint="ছবি বা PDF" onChange={(f) => setDocs({ ...docs, license: f })} />

      <p className="text-[11px] text-slate-400">আপনার কাগজপত্র শুধু যাচাইয়ের জন্য ব্যবহার হবে, কারো সাথে শেয়ার করা হবে না।</p>

      <Button type="submit" variant="primary" size="lg" fullWidth disabled={!ready}>
        যাচাইয়ের জন্য জমা দিন
      </Button>
    </form>
  );
}
