'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockCategories } from '@/data/mockData';
import { PhoneInput, emptyPhone } from '@/components/ui/PhoneInput';
import { Button } from '@/components/ui/Button';
import { PlusCircle, Upload, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function PostAdPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    category: 'scrap-batteries',
    title: '',
    price: '',
    unit: 'BDT/KG',
    moq: '',
    availableQty: '',
    location: 'Dhaka',
    description: '',
    condition: 'used' as 'new' | 'used',
    youtube: '',
  });
  const [whatsapp, setWhatsapp] = useState(emptyPhone());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-navy mb-6 font-bengali">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>হোমে ফিরে যান</span>
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8">
          
          {/* Header */}
          <div className="pb-6 border-b border-slate-100 mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-bengali text-brand-navy">
              নতুন পণ্যের বিজ্ঞাপন পোস্ট করুন
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-bengali mt-1">
              আপনার কাছে থাকা পাইকারি পণ্যের তথ্য দিন, ভেরিফিকেশনের পর সরাসরি মার্কেটপ্লেসে প্রদর্শিত হবে।
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4 font-bengali">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">আপনার বিজ্ঞাপনটি পর্যালোচনার জন্য জমা হয়েছে!</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                পাইকারি বাজার অ্যাডমিন প্যানেল থেকে আপনার তথ্য ও লট যাচাই করে কিছুক্ষণের মধ্যে লাইভ করে দেওয়া হবে।
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <Link
                  href="/seller/seller-1"
                  className="bg-brand-navy text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-brand-blue transition-colors"
                >
                  দোকান প্রোফাইলে যান
                </Link>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors"
                >
                  আরেকটি বিজ্ঞাপন দিন
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 font-bengali">
              
              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  ক্যাটাগরি নির্বাচন করুন *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  required
                >
                  {mockCategories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.nameBn} ({cat.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Condition: new / used */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  পণ্যের অবস্থা *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {([['new', 'নতুন'], ['used', 'পুরাতন']] as const).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setFormData({ ...formData, condition: value })}
                      className={`py-2.5 rounded-xl border-2 text-sm font-bold transition-colors ${
                        formData.condition === value
                          ? 'border-brand-orange bg-orange-50 text-brand-orange'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  বিজ্ঞাপনের শিরোনাম (লট সাইজ সহ) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ৫ টন পুরাতন আইপিএস ব্যাটারি লট (গড় ২৫ কেজি/পিস)"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              {/* Price & Unit Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    প্রতি ইউনিট মূল্য (BDT) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="140"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    ইউনিট *
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none font-sans"
                  >
                    <option value="BDT/KG">BDT/KG</option>
                    <option value="BDT/Ton">BDT/Ton</option>
                    <option value="BDT/Piece">BDT/Piece</option>
                    <option value="BDT/Lot">BDT/Lot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    ন্যূনতম অর্ডার *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ১ টন বা ৫০ পিস"
                    value={formData.moq}
                    onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              {/* Quantity & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    উপলব্ধ পরিমাণ (Total Available) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ১০ টন রেডি স্টক"
                    value={formData.availableQty}
                    onChange={(e) => setFormData({ ...formData, availableQty: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    গোডাউনের অবস্থান / জেলা *
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  >
                    <option value="Dhaka">ঢাকা (Dhaka)</option>
                    <option value="Chittagong">চট্টগ্রাম (Chittagong)</option>
                    <option value="Gazipur">গাজীপুর (Gazipur)</option>
                    <option value="Narayanganj">নারায়ণগঞ্জ (Narayanganj)</option>
                  </select>
                </div>
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  হোয়াটসঅ্যাপ নম্বর — কান্ট্রি কোড সহ (ক্রেতারা যোগাযোগ করবেন) *
                </label>
                <PhoneInput value={whatsapp} onChange={setWhatsapp} required />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  বিস্তারিত বর্ণনা ও শর্তাবলী
                </label>
                <textarea
                  rows={4}
                  placeholder="পণ্যের কন্ডিশন, গুণমান, ডেলিভারির নিয়ম ইত্যাদি উল্লেখ করুন..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              {/* Mock Image Upload Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  পণ্যের ছবি আপলোড করুন (সর্বোচ্চ ৪টি)
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-brand-orange transition-colors cursor-pointer bg-slate-50/50">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-600 font-medium">ছবি ড্র্যাগ করুন অথবা ক্লিক করে নির্বাচন করুন</p>
                  <p className="text-[11px] text-slate-400 mt-1">PNG, JPG বা WebP (সর্বোচ্চ ৫ মেগাবাইট)</p>
                </div>
              </div>

              {/* YouTube video link (no video upload to save server cost) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  ইউটিউব ভিডিও লিংক (ঐচ্ছিক)
                </label>
                <input
                  type="url"
                  inputMode="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={formData.youtube}
                  onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                  pattern="https?://(www\.)?(youtube\.com|youtu\.be)/.+"
                  title="একটি ইউটিউব লিংক দিন"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-base sm:text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none font-sans"
                />
                <p className="text-[11px] text-slate-400 mt-1">ভিডিও আপলোড করতে হবে না — শুধু ইউটিউব লিংক পেস্ট করুন।</p>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-emerald-700 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  নিরাপদ ও এনক্রিপ্টেড ডাটা
                </span>

                <Button type="submit" variant="primary" size="lg" className="font-bengali font-bold px-8">
                  বিজ্ঞাপন পাবলিশ করুন
                </Button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}

