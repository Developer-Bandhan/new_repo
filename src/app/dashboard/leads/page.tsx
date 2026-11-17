'use client';

import React from 'react';
import { mockBuyLeads } from '@/data/mockData';
import { LeadContactButtons } from '@/components/buyer/LeadContactButtons';

export default function DashboardLeads() {
  // TODO(backend): GET /seller/matching-leads (leads in the seller's categories)
  return (
    <div>
      <h2 className="font-bold text-slate-900">আপনার ক্যাটাগরির ক্রেতার চাহিদা</h2>
      <p className="text-xs text-slate-500 mt-0.5 mb-3">ক্রেতাকে সরাসরি কল বা হোয়াটসঅ্যাপ করুন</p>
      <ul className="space-y-3">
        {mockBuyLeads.map((lead) => (
          <li key={lead.id} className="bg-white rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500">
              <span className="truncate">{lead.locationBn}</span>
              <span className="flex-shrink-0">{lead.timeAgoBn}</span>
            </div>
            <p className="mt-1.5 font-semibold text-slate-900 leading-snug">{lead.titleBn}</p>
            <p className="mt-1 text-xs text-slate-600">
              পরিমাণ: <strong>{lead.quantityBn}</strong>
              {lead.budget && <> · বাজেট: <strong className="text-brand-orange">{lead.budget}</strong></>}
            </p>
            <LeadContactButtons lead={lead} className="mt-3" />
          </li>
        ))}
      </ul>
    </div>
  );
}
