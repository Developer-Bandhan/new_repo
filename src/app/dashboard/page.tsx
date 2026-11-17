'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, PhoneCall, Tag, ChevronRight } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { mockDailyViews, mockOffers, mockProductStats, mockProducts } from '@/data/mockData';

const sum = (k: 'views' | 'whatsapp' | 'calls' | 'offers') =>
  Object.values(mockProductStats).reduce((t, s) => t + s[k], 0);

export default function DashboardOverview() {
  const cards = [
    { label: 'মোট ভিউ', value: sum('views'), icon: Eye, tint: 'bg-blue-50 text-brand-blue' },
    { label: 'হোয়াটসঅ্যাপ ক্লিক', value: sum('whatsapp'), icon: WhatsAppIcon, tint: 'bg-emerald-50 text-emerald-600' },
    { label: 'কল ক্লিক', value: sum('calls'), icon: PhoneCall, tint: 'bg-slate-100 text-brand-navy' },
    { label: 'অফার এসেছে', value: sum('offers'), icon: Tag, tint: 'bg-orange-50 text-brand-orange' },
  ];

  const maxViews = Math.max(...mockDailyViews.map((d) => d.views));

  const top = mockProducts
    .filter((p) => mockProductStats[p.id])
    .map((p) => {
      const s = mockProductStats[p.id];
      return { p, s, score: s.views + (s.whatsapp + s.calls) * 10 + s.offers * 20 };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  const unreadOffers = mockOffers.filter((o) => !o.read).length;

  return (
    <div className="space-y-4 lg:space-y-6">
      <p className="text-xs text-slate-500">গত ৩০ দিন</p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map(({ label, value, icon: Icon, tint }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-200 p-4">
            <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${tint}`}>
              <Icon className="w-[18px] h-[18px]" />
            </span>
            <p className="mt-3 text-2xl font-bold text-slate-900 font-sans">{value.toLocaleString('en-US')}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Views chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 lg:p-5">
        <h2 className="font-bold text-slate-900">গত ৭ দিনের ভিউ</h2>
        <div className="mt-4 h-36 flex items-end gap-2">
          {mockDailyViews.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
              <span className="text-[10px] text-slate-500 font-sans">{d.views}</span>
              <div
                className="w-full max-w-[36px] rounded-t-md bg-brand-blue/80"
                style={{ height: `${(d.views / maxViews) * 100}%` }}
              />
              <span className="text-[11px] text-slate-500">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top products */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 lg:p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-900">সবচেয়ে ভালো চলছে</h2>
          <Link href="/dashboard/products" className="text-xs font-semibold text-brand-blue inline-flex items-center">
            সব পণ্য <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <ul className="mt-3 divide-y divide-slate-100">
          {top.map(({ p, s }, i) => (
            <li key={p.id} className="py-3 flex items-center gap-3">
              <span className="w-6 text-center text-sm font-bold text-slate-400 font-sans">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900 truncate">{p.titleBn}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {s.views} ভিউ · {s.whatsapp + s.calls} যোগাযোগ · {s.offers} অফার
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {unreadOffers > 0 && (
        <Link
          href="/dashboard/offers"
          className="flex items-center justify-between gap-3 rounded-2xl bg-brand-navy text-white p-4"
        >
          <span className="text-sm font-semibold">{unreadOffers} টি নতুন অফার আপনার উত্তরের অপেক্ষায়</span>
          <ChevronRight className="w-5 h-5" />
        </Link>
      )}

      <p className="text-[11px] text-slate-400">
        বিক্রি ওয়েবসাইটের বাইরে (ফোন/হোয়াটসঅ্যাপে) হয়, তাই এখানে ভিউ, যোগাযোগ ও অফার দেখানো হয়। বিক্রি হলে &quot;আমার পণ্য&quot; থেকে &quot;বিক্রি হয়েছে&quot; চিহ্নিত করুন।
      </p>
    </div>
  );
}
