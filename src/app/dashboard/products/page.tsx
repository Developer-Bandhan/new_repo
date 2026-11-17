'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, PhoneCall, Tag, PlusCircle, Pencil, Trash2, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { mockProductStats, mockProducts } from '@/data/mockData';
import { formatBDT } from '@/lib/utils';
import { Product } from '@/types';

const STATUS: Record<Product['status'], { label: string; cls: string }> = {
  active: { label: 'লাইভ', cls: 'bg-emerald-50 text-emerald-700' },
  pending: { label: 'অনুমোদনের অপেক্ষায়', cls: 'bg-amber-50 text-amber-700' },
  rejected: { label: 'বাতিল', cls: 'bg-red-50 text-red-700' },
  sold: { label: 'বিক্রি হয়েছে', cls: 'bg-slate-100 text-slate-600' },
};

export default function DashboardProducts() {
  // TODO(backend): GET /seller/products. Mock: seller-1's products, one shown as pending.
  const [items, setItems] = useState<Product[]>(() =>
    mockProducts
      .filter((p) => p.sellerId === 'seller-1')
      .map((p, i) => (i === 3 ? { ...p, status: 'pending' as const } : p))
  );

  const toggleSold = (id: string) =>
    setItems(items.map((p) => (p.id === id ? { ...p, status: p.status === 'sold' ? 'active' : 'sold' } : p)));

  const remove = (id: string) => {
    if (window.confirm('পণ্যটি মুছে ফেলতে চান?')) setItems(items.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-slate-900">আমার পণ্য ({items.length})</h2>
        <Link
          href="/post-ad"
          className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-brand-orange text-white text-sm font-bold"
        >
          <PlusCircle className="w-4 h-4" />
          নতুন পণ্য
        </Link>
      </div>

      <ul className="space-y-3">
        {items.map((p) => {
          const s = mockProductStats[p.id] ?? { views: 0, whatsapp: 0, calls: 0, offers: 0 };
          const st = STATUS[p.status];
          return (
            <li key={p.id} className="bg-white rounded-2xl border border-slate-200 p-3.5">
              <div className="flex gap-3">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <Image src={p.images[0]} alt="" fill sizes="80px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full ${st.cls}`}>{st.label}</span>
                  <p className="mt-1 text-sm font-semibold text-slate-900 leading-snug line-clamp-2">{p.titleBn}</p>
                  <p className="text-sm font-bold text-brand-navy mt-0.5 font-sans">
                    {formatBDT(p.price)} <span className="text-[11px] font-normal text-slate-500">/{p.unit.split('/')[1] ?? p.unit}</span>
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2 text-center text-[11px] text-slate-500">
                {[
                  [Eye, s.views, 'ভিউ'],
                  [WhatsAppIcon, s.whatsapp, 'হোয়াটসঅ্যাপ'],
                  [PhoneCall, s.calls, 'কল'],
                  [Tag, s.offers, 'অফার'],
                ].map(([Icon, n, l]) => {
                  const I = Icon as React.ComponentType<{ className?: string }>;
                  return (
                    <div key={l as string} className="rounded-lg bg-slate-50 py-2">
                      <I className="w-4 h-4 mx-auto text-slate-400" />
                      <p className="mt-1 text-sm font-bold text-slate-800 font-sans">{n as number}</p>
                      <p>{l as string}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => toggleSold(p.id)}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 h-10 rounded-xl text-xs font-bold border ${
                    p.status === 'sold' ? 'border-slate-300 text-slate-600' : 'border-emerald-600 text-emerald-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {p.status === 'sold' ? 'আবার লাইভ করুন' : 'বিক্রি হয়েছে'}
                </button>
                <Link
                  href="/post-ad"
                  aria-label="এডিট"
                  className="w-10 h-10 rounded-xl border border-slate-200 text-slate-600 flex items-center justify-center"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => remove(p.id)}
                  aria-label="মুছুন"
                  className="w-10 h-10 rounded-xl border border-slate-200 text-red-600 flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
