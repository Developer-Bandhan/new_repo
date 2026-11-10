'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts, mockSellers } from '@/data/mockData';
import { formatBDT, getWhatsAppInquiryUrl } from '@/lib/utils';
import { NidVerifiedApprovedBadge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { 
  MessageCircle, 
  PhoneCall, 
  MapPin, 
  ShieldCheck, 
  Store, 
  Calendar, 
  Box, 
  Truck, 
  ChevronRight,
  Share2,
  CheckCircle2
} from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = mockProducts.find((p) => p.id === params.id) || mockProducts[0];
  const seller = mockSellers.find((s) => s.id === product?.sellerId) || mockSellers[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!product) notFound();

  const whatsappUrl = getWhatsAppInquiryUrl(
    product.sellerWhatsapp,
    product.titleBn || product.title,
    product.locationBn || product.location
  );

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsCallbackOpen(false);
      setIsSubmitted(false);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-bengali mb-6">
          <Link href="/" className="hover:text-brand-navy">হোম</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/categories" className="hover:text-brand-navy">পণ্য তালিকা</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate max-w-xs">{product.titleBn}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.titleBn}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnail switcher if multiple images */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-brand-orange shadow-md scale-105' : 'border-slate-200 opacity-70'
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold font-bengali text-brand-navy">পণ্যের বিস্তারিত বিবরণ</h3>
              <p className="text-sm text-slate-700 font-bengali leading-relaxed">
                {product.descriptionBn || product.description}
              </p>

              {product.specifications && (
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">টেকনিক্যাল স্পেসিফিকেশন</h4>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="bg-slate-50 p-2.5 rounded-lg flex justify-between">
                        <dt className="text-slate-500 font-medium">{key}:</dt>
                        <dd className="font-bold text-slate-800">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Pricing, Seller & CTAs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Purchase / Price Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <h1 className="text-xl sm:text-2xl font-bold font-bengali text-slate-900 leading-snug">
                {product.titleBn}
              </h1>

              <div className="flex items-baseline gap-2 pb-2 border-b border-slate-100">
                <span className="text-3xl font-extrabold text-brand-navy">
                  {formatBDT(product.price)}
                </span>
                <span className="text-sm font-semibold text-slate-500">/{product.unit}</span>
              </div>

              {/* Volume details */}
              <div className="space-y-2 text-xs sm:text-sm font-bengali text-slate-600">
                <div className="flex items-center justify-between">
                  <span>ন্যূনতম ক্রয়ের পরিমাণ:</span>
                  <span className="font-bold text-slate-900">{product.minimumOrderQuantity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>মজুদ বা লট সাইজ:</span>
                  <span className="font-bold text-emerald-700">{product.availableQuantity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>গোডাউনের অবস্থান:</span>
                  <span className="font-bold text-slate-900">{product.locationBn}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-emerald-600 text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>হোয়াটসঅ্যাপে সরাসরি কথা বলুন</span>
                </a>

                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={() => setIsCallbackOpen(true)}
                  leftIcon={<PhoneCall className="w-4 h-4 text-brand-blue" />}
                  className="font-bengali font-bold"
                >
                  কলব্যাক রিকোয়েস্ট পাঠান
                </Button>
              </div>
            </div>

            {/* Seller Profile Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ভেরিফাইড সাপ্লায়ার</span>
                <NidVerifiedApprovedBadge />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                  <Image src={seller.logo} alt={seller.businessNameBn} fill className="object-cover" />
                </div>
                <div>
                  <Link href={`/seller/${seller.id}`} className="font-bold text-base font-bengali text-brand-navy hover:text-brand-blue">
                    {seller.businessNameBn}
                  </Link>
                  <p className="text-xs text-slate-500 font-bengali flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {seller.locationBn}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-bengali leading-relaxed line-clamp-2">
                {seller.bioBn}
              </p>

              <div className="pt-2">
                <Link
                  href={`/seller/${seller.id}`}
                  className="w-full flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 rounded-lg transition-colors font-bengali"
                >
                  <Store className="w-4 h-4" />
                  <span>বিক্রেতার পুরো ইনভেন্টরি ও দোকান দেখুন</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Callback Modal */}
        <Modal
          isOpen={isCallbackOpen}
          onClose={() => setIsCallbackOpen(false)}
          title="কলব্যাক রিকোয়েস্ট পাঠান"
          description={`পণ্য: ${product.titleBn}`}
        >
          {isSubmitted ? (
            <div className="py-6 text-center space-y-2 font-bengali">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <p className="text-base font-bold text-slate-800">কলব্যাক রিকোয়েস্ট পাঠানো হয়েছে!</p>
              <p className="text-xs text-slate-500">বিক্রেতা খুব শীঘ্রই যোগাযোগ করবেন।</p>
            </div>
          ) : (
            <form onSubmit={handleCallbackSubmit} className="space-y-4 font-bengali">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="আপনার পূর্ণ নাম"
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
                কল রিকোয়েস্ট নিশ্চিত করুন
              </Button>
            </form>
          )}
        </Modal>

      </div>
    </div>
  );
}

