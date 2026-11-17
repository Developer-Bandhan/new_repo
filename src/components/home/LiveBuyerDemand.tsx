'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { mockBuyLeads } from '@/data/mockData';
import { LeadContactButtons } from '@/components/buyer/LeadContactButtons';

export const LiveBuyerDemand: React.FC = () => {
  const leads = mockBuyLeads.slice(0, 4);

  return (
    <section className="bg-slate-50 py-6 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="font-bengali font-bold text-lg lg:text-2xl text-slate-900">ক্রেতার চাহিদা</h2>
          <Link
            href="/buy-leads"
            className="inline-flex items-center gap-0.5 text-sm font-semibold text-brand-blue font-bengali"
          >
            সব দেখুন
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {leads.map((lead, i) => (
            <li
              key={lead.id}
              className={`bg-white rounded-xl border border-slate-200 p-4 items-center gap-3 ${
                i >= 3 ? 'hidden lg:flex' : 'flex'
              }`}
            >
              <div className="min-w-0 flex-1 font-bengali">
                <h3 className="text-[15px] font-semibold text-slate-900 leading-snug line-clamp-2">
                  {lead.titleBn}
                </h3>
                <p className="mt-1 text-xs text-slate-500 truncate">
                  {lead.locationBn} · {lead.quantityBn}
                </p>
              </div>
              <LeadContactButtons lead={lead} compact />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
