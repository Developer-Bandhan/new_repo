'use client';

import React from 'react';
import { PhoneCall } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { mockOffers } from '@/data/mockData';
import { getCountry } from '@/data/countries';
import { getTelUrl, normalizePhone } from '@/lib/utils';

export default function DashboardOffers() {
  return (
    <div>
      <h2 className="font-bold text-slate-900 mb-3">ক্রেতাদের অফার ({mockOffers.length})</h2>
      <ul className="space-y-3">
        {mockOffers.map((o) => {
          const msg = `Hello ${o.buyerName}, about your offer on "${o.productTitleBn}" on Paikari Bazar.`;
          return (
            <li
              key={o.id}
              className={`bg-white rounded-2xl border p-4 ${o.read ? 'border-slate-200' : 'border-brand-orange/50'}`}
            >
              <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500">
                <span className="truncate">{o.productTitleBn}</span>
                <span className="flex-shrink-0">{o.timeAgoBn}</span>
              </div>
              <p className="mt-1.5 font-bold text-slate-900">
                {o.buyerName} <span className="text-xs font-normal text-slate-500">· {getCountry(o.country).nameBn}</span>
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="rounded-lg bg-orange-50 text-brand-orange px-2.5 py-1">রেট: {o.rate}</span>
                <span className="rounded-lg bg-blue-50 text-brand-blue px-2.5 py-1">পরিমাণ: {o.quantity}</span>
              </div>
              {o.message && <p className="mt-2 text-sm text-slate-600">&ldquo;{o.message}&rdquo;</p>}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${normalizePhone(o.buyerPhone)}?text=${encodeURIComponent(msg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 h-10 rounded-xl bg-[#25D366] text-white text-xs font-bold"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  হোয়াটসঅ্যাপ
                </a>
                <a
                  href={getTelUrl(o.buyerPhone)}
                  className="inline-flex items-center justify-center gap-1.5 h-10 rounded-xl bg-brand-navy text-white text-xs font-bold"
                >
                  <PhoneCall className="w-4 h-4" />
                  কল করুন
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
