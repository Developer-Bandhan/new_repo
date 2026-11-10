'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, MapPin, Calendar, PlusCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

interface BuyLeadItem {
  id: string;
  title: string;
  buyerName: string;
  location: string;
  quantity: string;
  budget: string;
  timeAgo: string;
}

const mockBuyLeads: BuyLeadItem[] = [
  {
    id: 'lead-1',
    title: '১০ টন কার ব্যাটারি ও আইপিএস ব্যাটারি স্ক্র্যাপ জরুরি প্রয়োজন',
    buyerName: 'মেসার্স রহমান ব্যাটারি ইন্ডাস্ট্রিজ',
    location: 'টঙ্গী, গাজীপুর',
    quantity: '১০ মেট্রিক টন',
    budget: '১৪০-১৪৫ টাকা/কেজি',
    timeAgo: '২ ঘণ্টা আগে',
  },
  {
    id: 'lead-2',
    title: 'বিশুদ্ধ সীসা ইনগট (Pure Lead 99.97%) - ২ টন দরকার',
    buyerName: 'আল-মদিনা মেটাল রিফাইনারি',
    location: 'ফতুল্লা, নারায়ণগঞ্জ',
    quantity: '২,০০০ কেজি',
    budget: '১৯০-১৯৫ টাকা/কেজি',
    timeAgo: '৫ ঘণ্টা আগে',
  },
  {
    id: 'lead-3',
    title: 'জাহাজ ভাঙা হেভি ডিউটি চ্যানেল ও বিম স্ক্র্যাপ ক্রয় করা হবে',
    buyerName: 'ইস্পাত রোলিং মিলস লিমিটেড',
    location: 'সীতাকুণ্ড, চট্টগ্রাম',
    quantity: '৫০ টন+',
    budget: 'আলোচনা সাপেক্ষে',
    timeAgo: '১ দিন আগে',
  },
];

export default function BuyLeadsPage() {
  const [isPostLeadOpen, setIsPostLeadOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setIsPostLeadOpen(false);
      setSubmitted(false);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-bengali text-brand-navy">
              Buy Leads / সরাসরি পাইকারি ক্রেতাদের চাহিদা
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-bengali mt-1">
              সরাসরি বাল্ক ক্রেতাদের তালিকা দেখুন এবং আপনার স্ক্র্যাপ দ্রুত বিক্রয় করুন
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsPostLeadOpen(true)}
            leftIcon={<PlusCircle className="w-4 h-4" />}
            className="font-bengali text-xs sm:text-sm font-bold"
          >
            আপনার ক্রয়ের চাহিদা পোস্ট করুন
          </Button>
        </div>

        {/* Lead Cards List */}
        <div className="space-y-4">
          {mockBuyLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-brand-blue text-[11px] font-bold px-2 py-0.5 rounded">
                    VERIFIED BUYER
                  </span>
                  <span className="text-xs text-slate-400 font-bengali flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {lead.timeAgo}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-bengali text-slate-900">
                  {lead.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs font-bengali text-slate-600">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {lead.location}
                  </span>
                  <span>চাহিদার পরিমাণ: <strong className="text-slate-900">{lead.quantity}</strong></span>
                  <span>প্রত্যাশিত বাজেট: <strong className="text-brand-orange">{lead.budget}</strong></span>
                  <span>ক্রেতা: <strong className="text-slate-800">{lead.buyerName}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0 pt-2 md:pt-0">
                <Button
                  variant="navy"
                  size="sm"
                  onClick={() => alert(`Connecting with ${lead.buyerName}`)}
                  className="font-bengali text-xs font-bold w-full md:w-auto"
                >
                  যোগাযোগ নম্বর দেখুন
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <Modal
          isOpen={isPostLeadOpen}
          onClose={() => setIsPostLeadOpen(false)}
          title="নতুন ক্রয়ের চাহিদা (Buy Lead) পোস্ট করুন"
          description="আপনার প্রয়োজনীয় স্ক্র্যাপের বিবরণ দিন, সরবরাহকারীরা সরাসরি যোগাযোগ করবেন।"
        >
          {submitted ? (
            <div className="py-6 text-center space-y-2 font-bengali">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <p className="text-base font-bold text-slate-800">চাহিদা সফলভাবে পোস্ট হয়েছে!</p>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-4 font-bengali">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">শিরোনাম / পণ্যের নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ৫ টন তামার তার দরকার"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">পরিমাণ *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ৫ মেট্রিক টন"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">আপনার জেলা *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ঢাকা"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  required
                  placeholder="017XXXXXXXX"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue font-sans"
                />
              </div>
              <Button type="submit" variant="primary" fullWidth className="font-bengali font-bold">
                চাহিদা পোস্ট করুন
              </Button>
            </form>
          )}
        </Modal>

      </div>
    </div>
  );
}

