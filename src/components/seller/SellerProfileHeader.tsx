'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Seller } from '@/types';
import { NidVerifiedApprovedBadge } from '@/components/ui/Badge';
import { Star, ShieldCheck, MessageSquare, PhoneCall, UserPlus, Check, Share2, MapPin } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface SellerProfileHeaderProps {
  seller: Seller;
}

export const SellerProfileHeader: React.FC<SellerProfileHeaderProps> = ({ seller }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeModal, setActiveModal] = useState<'message' | 'callback' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setActiveModal(null);
      setIsSubmitted(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden mb-8">
      {/* Top Banner Notice (Matches Image 1 Header Subtitle) */}
      <div className="bg-slate-100/80 px-4 py-2 border-b border-slate-200 text-center">
        <p className="text-xs md:text-sm font-bengali font-semibold text-slate-700">
          বিক্রেতা প্রোফাইল ভেরিফিকেশন ও বিশদ বিবরণ
        </p>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-5">
        {/* NID Verified Banner (Matches Image 1) */}
        <div className="flex justify-start">
          <NidVerifiedApprovedBadge />
        </div>

        {/* Seller Info Container */}
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          {/* Logo with battery icon styling */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900 border-2 border-slate-200 flex flex-col items-center justify-center text-white overflow-hidden flex-shrink-0 shadow-md">
            <div className="w-8 h-8 rounded bg-emerald-600 flex items-center justify-center font-bold text-xs mb-1">
              শুভ
            </div>
            <span className="text-[10px] text-center font-bengali font-bold leading-tight px-1 text-slate-200">
              ব্যাটারি সলিউশন
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h1 className="text-xl sm:text-2xl font-extrabold font-bengali text-brand-navy">
                {seller.businessNameBn}
              </h1>

              {/* Stars (Matches Image 1: 2 stars) */}
              <div className="flex items-center text-amber-500">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                ))}
              </div>

              {seller.isTrusted && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" />
                  Trusted Seller
                </span>
              )}
            </div>

            {/* Seller Bio */}
            <p className="text-xs sm:text-sm md:text-base text-slate-700 font-bengali leading-relaxed max-w-3xl">
              {seller.bioBn}
            </p>

            {/* Location & Contact info */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-bengali pt-1">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {seller.fullAddress}
              </span>
              <span>•</span>
              <span>যুক্ত হয়েছেন: {seller.joinedDate}</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">সক্রিয় ডিলার</span>
            </div>
          </div>
        </div>

        {/* Action Buttons (Matches Image 1: Message, Callback request, Follow) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={() => setActiveModal('message')}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-brand-blue transition-colors shadow-sm"
            aria-label="Send message"
            title="Message Seller"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveModal('callback')}
            leftIcon={<PhoneCall className="w-4 h-4 text-emerald-600" />}
            className="font-bengali text-xs sm:text-sm font-semibold"
          >
            Callback request
          </Button>

          <Button
            variant={isFollowing ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setIsFollowing(!isFollowing)}
            leftIcon={isFollowing ? <Check className="w-4 h-4" /> : <UserPlus className="w-4 h-4 text-brand-blue" />}
            className="font-bengali text-xs sm:text-sm font-semibold"
          >
            {isFollowing ? 'Following' : '+ Follow'}
          </Button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: seller.businessNameBn,
                  url: window.location.href,
                }).catch(() => {});
              }
            }}
            className="ml-auto inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">শেয়ার করুন</span>
          </button>
        </div>
      </div>

      {/* Callback / Message Modal */}
      <Modal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        title={activeModal === 'callback' ? 'কলব্যাক রিকোয়েস্ট' : 'সরাসরি মেসেজ পাঠান'}
        description={`${seller.businessNameBn} এর সাথে দ্রুত যোগাযোগ করতে আপনার তথ্য দিন`}
      >
        {isSubmitted ? (
          <div className="py-6 text-center space-y-2 font-bengali">
            <p className="text-emerald-700 font-bold text-sm">অনুরোধ জমা হয়েছে!</p>
            <p className="text-xs text-slate-500">বিক্রেতা শীঘ্রই আপনার সাথে যোগাযোগ করবেন।</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-bengali">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">আপনার নাম *</label>
              <input
                type="text"
                required
                placeholder="যেমন: আল-আমিন"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">মোবাইল নম্বর *</label>
              <input
                type="tel"
                required
                placeholder="017XXXXXXXX"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none font-sans"
              />
            </div>
            <Button type="submit" variant="primary" fullWidth className="font-bengali font-bold">
              সাবমিট করুন
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
};

