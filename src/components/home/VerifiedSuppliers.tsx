'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MessageSquare, PhoneCall, ShieldCheck, ChevronRight, Store, CheckCircle2 } from 'lucide-react';
import { mockSellers } from '@/data/mockData';
import { NidVerifiedApprovedBadge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export const VerifiedSuppliers: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'message' | 'callback' | null>(null);
  const [selectedSellerName, setSelectedSellerName] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const openInquiryModal = (type: 'message' | 'callback', sellerName: string) => {
    setSelectedSellerName(sellerName);
    setActiveModal(type);
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setActiveModal(null);
      setFormSubmitted(false);
    }, 1800);
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-slate-100 gap-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold font-bengali text-brand-navy tracking-tight">
              ভেরিফাইড সাপ্লায়ার সেকশন
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-bengali mt-1">
              জাতীয় পরিচয়পত্র ও ট্রেড লাইসেন্স যাচাইকৃত নির্ভরযোগ্য পাইকারি ডিলারবৃন্দ
            </p>
          </div>
          <Link
            href="/seller/seller-1"
            className="inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-brand-blue hover:text-brand-navy transition-colors font-bengali"
          >
            <span>সব ভেরিফাইড সেলার দেখুন</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockSellers.map((seller) => (
            <div
              key={seller.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                {/* NID Verified Banner on Top */}
                <div className="mb-4">
                  <NidVerifiedApprovedBadge />
                </div>

                {/* Seller Info Row */}
                <div className="flex items-start gap-4">
                  <Link href={`/seller/${seller.id}`} className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                    <Image
                      src={seller.logo}
                      alt={seller.businessNameBn}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={`/seller/${seller.id}`}>
                        <h3 className="text-base md:text-lg font-bold font-bengali text-brand-navy hover:text-brand-blue transition-colors">
                          {seller.businessNameBn}
                        </h3>
                      </Link>

                      {/* Rating Stars */}
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: Math.round(seller.rating) }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>

                      {seller.isTrusted && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-blue bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                          <ShieldCheck className="w-3 h-3 text-brand-blue" />
                          Trusted Seller
                        </span>
                      )}
                    </div>

                    <p className="text-xs md:text-sm text-slate-600 font-bengali leading-relaxed line-clamp-2">
                      {seller.bioBn}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons (Matches Image 2) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-5 mt-4 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openInquiryModal('message', seller.businessNameBn)}
                  leftIcon={<MessageSquare className="w-3.5 h-3.5 text-brand-blue" />}
                  className="font-bengali text-xs"
                >
                  Message Supplier
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openInquiryModal('callback', seller.businessNameBn)}
                  leftIcon={<PhoneCall className="w-3.5 h-3.5 text-emerald-600" />}
                  className="font-bengali text-xs"
                >
                  Callback Request
                </Button>

                <Link
                  href={`/seller/${seller.id}`}
                  className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-1 bg-brand-navy hover:bg-brand-blue text-white rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors font-bengali shadow-sm"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>দোকান দেখুন</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Inquiries */}
        <Modal
          isOpen={activeModal !== null}
          onClose={() => setActiveModal(null)}
          title={activeModal === 'message' ? `মেসেজ পাঠান: ${selectedSellerName}` : `কলব্যাক রিকোয়েস্ট: ${selectedSellerName}`}
          description="আপনার নাম ও মোবাইল নম্বর প্রদান করুন, বিক্রেতা সরাসরি যোগাযোগ করবেন।"
        >
          {formSubmitted ? (
            <div className="py-6 text-center space-y-3 font-bengali">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800">আপনার অনুরোধ সফলভাবে পাঠানো হয়েছে!</h4>
              <p className="text-xs text-slate-500">বিক্রেতা শীঘ্রই আপনার সাথে ফোনে যোগাযোগ করবেন।</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 font-bengali">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মোঃ কামরুল ইসলাম"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  required
                  placeholder="01XXXXXXXXX"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none font-sans"
                />
              </div>

              {activeModal === 'message' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">আপনার বার্তা</label>
                  <textarea
                    rows={3}
                    placeholder="আপনার কি পরিমাণ স্ক্র্যাপ বা পণ্য প্রয়োজন লিখুন..."
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              )}

              <Button type="submit" variant="primary" fullWidth className="font-bengali text-sm font-bold">
                {activeModal === 'message' ? 'মেসেজ পাঠান' : 'অনুরোধ নিশ্চিত করুন'}
              </Button>
            </form>
          )}
        </Modal>

      </div>
    </section>
  );
};

