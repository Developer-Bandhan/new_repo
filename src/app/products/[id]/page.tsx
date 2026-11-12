'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts, mockSellers } from '@/data/mockData';
import { getWhatsAppInquiryUrl } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/product/ProductCard';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import {
  PhoneCall,
  MapPin,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Lock,
  BadgeCheck,
} from 'lucide-react';

const UNIT_BN: Record<string, string> = { KG: 'কেজি', PCS: 'পিস', PC: 'পিস', TON: 'টন', TONS: 'টন' };
const toUnitLabel = (unit: string) => {
  const part = (unit.split('/')[1] ?? unit).trim();
  return UNIT_BN[part.toUpperCase()] ?? part;
};

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

  const unitLabel = toUnitLabel(product.unit);

  const related = mockProducts
    .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
    .concat(mockProducts.filter((p) => p.id !== product.id && p.categorySlug !== product.categorySlug))
    .slice(0, 4);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsCallbackOpen(false);
      setIsSubmitted(false);
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 font-bengali mb-5 sm:mb-7">
          <Link href="/" className="hover:text-brand-navy transition-colors">হোম</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/categories" className="hover:text-brand-navy transition-colors">পণ্য তালিকা</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600 truncate max-w-[12rem] sm:max-w-xs">{product.titleBn}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-28 space-y-3">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 shadow-[0_20px_40px_-24px_rgba(11,37,71,0.35)]">
                <Image
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.titleBn}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                  priority
                />
                {product.isFeatured && (
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-brand-orange text-[10px] font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
                    FEATURED
                  </span>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex items-center gap-2.5">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`ছবি ${idx + 1}`}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden transition-all duration-200 ${
                        activeImageIndex === idx
                          ? 'ring-2 ring-brand-orange ring-offset-2'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 font-bengali">
              <BadgeCheck className="w-4 h-4" />
              <span>ভেরিফাইড লট</span>
            </div>

            <h1 className="mt-2 text-2xl sm:text-[28px] font-bold font-bengali text-slate-900 leading-snug tracking-tight">
              {product.titleBn}
            </h1>

            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-[32px] leading-none font-bold text-brand-navy tracking-tight">
                ৳{product.price.toLocaleString('en-US')}
              </span>
              <span className="text-sm text-slate-400 font-bengali">/ {unitLabel}</span>
            </div>

            <dl className="mt-6 divide-y divide-slate-100 border-y border-slate-100 text-sm">
              {[
                ['ন্যূনতম অর্ডার', product.minimumOrderQuantity],
                ['মজুদ', product.availableQuantity],
                ['গোডাউন', product.locationBn || product.location],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 py-3.5">
                  <dt className="text-slate-500 font-bengali">{label}</dt>
                  <dd className="font-semibold text-slate-900 font-bengali text-right">{value}</dd>
                </div>
              ))}
            </dl>

            {/* Actions */}
            <div className="mt-5 space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fbd5b] text-white h-11 rounded-xl font-semibold text-sm shadow-md shadow-emerald-500/20 transition-all active:scale-[0.98]"
              >
                <WhatsAppIcon className="w-[18px] h-[18px]" />
                <span className="font-bengali">হোয়াটসঅ্যাপে কথা বলুন</span>
              </a>

              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={() => setIsCallbackOpen(true)}
                leftIcon={<PhoneCall className="w-[15px] h-[15px] text-brand-blue" />}
                className="font-bengali font-medium !h-11 !rounded-xl !text-sm"
              >
                কলব্যাক রিকোয়েস্ট
              </Button>
            </div>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-bengali">
              <Lock className="w-3 h-3" />
              আপনার নম্বর শুধু বিক্রেতার কাছেই যাবে
            </p>

            {/* Seller */}
            <Link
              href={`/seller/${seller.id}`}
              className="group mt-7 flex items-center gap-3.5 rounded-2xl border border-slate-200 p-3.5 hover:border-brand-navy/30 hover:shadow-md transition-all"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                <Image src={seller.logo} alt={seller.businessNameBn} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[15px] font-bengali text-slate-900 truncate">
                    {seller.businessNameBn}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                </div>
                <p className="text-xs text-slate-500 font-bengali flex items-center gap-1 mt-0.5 truncate">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  {seller.locationBn}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-orange group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>
          </div>
        </div>

        {/* Description & specs */}
        <section className="mt-12 lg:mt-16 pt-10 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 className="text-lg font-bold font-bengali text-slate-900">পণ্যের বিবরণ</h2>
            <div className="mt-2 h-[3px] w-8 rounded-full bg-brand-orange" />
            <p className="mt-4 text-[15px] text-slate-600 font-bengali leading-[1.85]">
              {product.descriptionBn || product.description}
            </p>
          </div>

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="lg:col-span-5">
              <h2 className="text-lg font-bold font-bengali text-slate-900">স্পেসিফিকেশন</h2>
              <div className="mt-2 h-[3px] w-8 rounded-full bg-brand-orange" />
              <dl className="mt-4 divide-y divide-slate-100 text-sm">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-slate-500">{key}</dt>
                    <dd className="font-semibold text-slate-900 text-right">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12 lg:mt-16 pt-10 border-t border-slate-100">
            <h2 className="text-lg font-bold font-bengali text-slate-900">আরও পণ্য দেখুন</h2>
            <div className="mt-2 mb-6 h-[3px] w-8 rounded-full bg-brand-orange" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

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
