'use client';

import React from 'react';
import { MapPin, Calendar, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LeadContactButtons } from '@/components/buyer/LeadContactButtons';
import { mockBuyLeads } from '@/data/mockData';
import { openPostDemand } from '@/lib/postDemand';

export default function BuyLeadsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-bengali text-brand-navy">
              ক্রেতার চাহিদা / অর্ডার পোস্ট
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-bengali mt-1">
              সরাসরি ক্রেতাদের চাহিদা দেখুন, কল বা হোয়াটসঅ্যাপে যোগাযোগ করে আপনার মাল দ্রুত বিক্রি করুন
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={openPostDemand}
            leftIcon={<PlusCircle className="w-4 h-4" />}
            className="font-bengali text-sm font-bold w-full sm:w-auto"
          >
            আপনার চাহিদা পোস্ট করুন
          </Button>
        </div>

        {/* Lead Cards List */}
        <div className="space-y-4">
          {mockBuyLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-brand-blue text-[11px] font-bold px-2 py-0.5 rounded">
                    BUYER
                  </span>
                  <span className="text-xs text-slate-400 font-bengali flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {lead.timeAgoBn}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-bengali text-slate-900 leading-snug">
                  {lead.titleBn}
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bengali text-slate-600">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {lead.locationBn}
                  </span>
                  <span>পরিমাণ: <strong className="text-slate-900">{lead.quantityBn}</strong></span>
                  {lead.budget && (
                    <span>বাজেট: <strong className="text-brand-orange">{lead.budget}</strong></span>
                  )}
                  <span>ক্রেতা: <strong className="text-slate-800">{lead.buyerName}</strong></span>
                </div>
              </div>

              <LeadContactButtons lead={lead} className="flex-shrink-0 w-full md:w-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
