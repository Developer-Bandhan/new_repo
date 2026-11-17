'use client';

import React, { useRef, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts, mockSellers } from '@/data/mockData';
import { getWhatsAppInquiryUrl, getTelUrl } from '@/lib/utils';
import { useWishlist, shareLink } from '@/lib/wishlist';
import { PhoneInput, emptyPhone } from '@/components/ui/PhoneInput';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/product/ProductCard';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import {
  PhoneCall,
  MapPin,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Lock,
  BadgeCheck,
  Heart,
  Share2,
  Star,
  Store,
  Package,
  Boxes,
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
  const [callbackPhone, setCallbackPhone] = useState(emptyPhone());
  const [toast, setToast] = useState('');
  const sliderRef = useRef<HTMLDivElement>(null);
  const { saved, toggle } = useWishlist(product?.id ?? '');

  if (!product) notFound();

  const whatsappUrl = getWhatsAppInquiryUrl(
    product.sellerWhatsapp,
    product.titleBn || product.title,
    product.locationBn || product.location
  );
  const telUrl = getTelUrl(product.sellerWhatsapp);
  const unitLabel = toUnitLabel(product.unit);
  const rating = Math.round(seller.rating);

  const related = mockProducts
    .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
    .concat(mockProducts.filter((p) => p.id !== product.id && p.categorySlug !== product.categorySlug))
    .slice(0, 4);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 1800);
  };

  const handleShare = async () => {
    const r = await shareLink(product.titleBn, window.location.href);
    if (r === 'copied') showToast('লিংক কপি হয়েছে');
  };

  const handleWishlist = () => {
    showToast(saved ? 'পছন্দের তালিকা থেকে সরানো হয়েছে' : 'পছন্দের তালিকায় যোগ হয়েছে');
    toggle();
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsCallbackOpen(false);
      setIsSubmitted(false);
    }, 1500);
  };

  const onSliderScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    setActiveImageIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goToImage = (idx: number) => {
    setActiveImageIndex(idx);
    const el = sliderRef.current;
    if (el) el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' });
  };

  const iconBtn =
    'w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 bg-white hover:bg-slate-50 transition active:scale-90';

  const actionIcons = (
    <div className="flex items-center gap-2 flex-shrink-0">
      <button onClick={handleWishlist} aria-label="পছন্দের তালিকা" className={iconBtn}>
        <Heart className={`w-5 h-5 ${saved ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
      </button>
      <button onClick={handleShare} aria-label="শেয়ার" className={iconBtn}>
        <Share2 className="w-5 h-5 text-slate-600" />
      </button>
    </div>
  );

  const infoRows = [
    { icon: Package, label: 'ন্যূনতম অর্ডার', value: product.minimumOrderQuantity },
    { icon: Boxes, label: 'মজুদ', value: product.availableQuantity },
    { icon: MapPin, label: 'গোডাউন', value: product.locationBn || product.location },
  ];

  return (
    <div className="bg-slate-100 lg:bg-white min-h-screen pb-24 lg:pb-16">
      <div className="max-w-6xl mx-auto lg:px-8 lg:pt-8">
        {/* Breadcrumb (desktop) */}
        <nav className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 font-bengali mb-7">
          <Link href="/" className="hover:text-brand-navy transition-colors">হোম</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/categories" className="hover:text-brand-navy transition-colors">পণ্য তালিকা</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600 truncate max-w-xs">{product.titleBn}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-14">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-28 space-y-3">
              <div className="relative bg-white lg:rounded-3xl overflow-hidden">
                <div
                  ref={sliderRef}
                  onScroll={onSliderScroll}
                  className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {product.images.map((img, idx) => (
                    <div key={idx} className="relative w-full flex-shrink-0 snap-center aspect-square lg:aspect-[4/3]">
                      <Image
                        src={img}
                        alt={product.titleBn}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover"
                        priority={idx === 0}
                      />
                    </div>
                  ))}
                </div>

                {/* Mobile back button */}
                <button
                  onClick={() => history.back()}
                  aria-label="ফিরে যান"
                  className="lg:hidden absolute top-3 left-3 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {product.isFeatured && (
                  <span className="absolute top-3 right-3 lg:top-4 lg:left-4 lg:right-auto bg-white/95 text-brand-orange text-[10px] font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
                    FEATURED
                  </span>
                )}

                {/* Condition + counter */}
                <span
                  className={`absolute bottom-3 left-3 px-3 py-1 rounded-lg text-xs font-bold font-bengali shadow ${
                    product.condition === 'new' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-white'
                  }`}
                >
                  {product.condition === 'new' ? 'নতুন মাল' : 'পুরাতন মাল'}
                </span>
                {product.images.length > 1 && (
                  <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                    {activeImageIndex + 1}/{product.images.length}
                  </span>
                )}
              </div>

              {/* Thumbnails (desktop) */}
              {product.images.length > 1 && (
                <div className="hidden lg:flex items-center gap-2.5">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToImage(idx)}
                      aria-label={`ছবি ${idx + 1}`}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden transition-all duration-200 ${
                        activeImageIndex === idx ? 'ring-2 ring-brand-orange ring-offset-2' : 'opacity-60 hover:opacity-100'
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
            {/* Price band */}
            <div className="bg-white px-4 pt-4 pb-3 border-b border-slate-100 lg:px-0 lg:pt-0 flex items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-bengali text-slate-500">পাইকারি দাম</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[28px] leading-none font-extrabold tracking-tight text-brand-orange">
                    ৳{product.price.toLocaleString('en-US')}
                  </span>
                  <span className="text-sm text-slate-500 font-bengali">/ {unitLabel}</span>
                </div>
              </div>
              <div className="text-right font-bengali rounded-lg bg-orange-50 border border-orange-100 px-2.5 py-1.5">
                <p className="text-[10px] text-slate-500">ন্যূনতম অর্ডার</p>
                <p className="text-sm font-bold text-slate-900">{product.minimumOrderQuantity}</p>
              </div>
            </div>

            {/* Title block */}
            <div className="bg-white px-4 pt-3.5 pb-4 lg:px-0">
              <div className="flex items-center gap-2 text-xs font-semibold font-bengali">
                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  <BadgeCheck className="w-3.5 h-3.5" /> ভেরিফাইড লট
                </span>
                {seller.isNidVerified && (
                  <span className="inline-flex items-center gap-1 text-brand-blue bg-blue-50 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5" /> ভেরিফাইড সাপ্লায়ার
                  </span>
                )}
              </div>

              <h1 className="mt-2 text-lg sm:text-2xl font-bold font-bengali text-slate-900 leading-snug">
                {product.titleBn}
              </h1>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{seller.rating.toFixed(1)}</span>
                  <span className="text-slate-300">|</span>
                  <span className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    ))}
                  </span>
                </div>
                {actionIcons}
              </div>
            </div>

            {/* Info rows */}
            <div className="mt-2 lg:mt-4 bg-white px-4 lg:px-0">
              <div className="rounded-xl bg-slate-50 divide-y divide-slate-200/70">
                {infoRows.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 px-3.5 py-3 text-sm font-bengali">
                    <Icon className="w-[18px] h-[18px] text-slate-400 flex-shrink-0" />
                    <span className="text-slate-500">{label}</span>
                    <span className="ml-auto font-semibold text-slate-900 text-right">{value}</span>
                  </div>
                ))}
              </div>

              {/* Desktop actions */}
              <div className="hidden lg:grid grid-cols-2 gap-2 mt-5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fbd5b] text-white h-12 rounded-xl font-bold text-sm"
                >
                  <WhatsAppIcon className="w-[18px] h-[18px]" />
                  <span className="font-bengali">WhatsApp চ্যাট</span>
                </a>
                <a
                  href={telUrl}
                  className="flex items-center justify-center gap-2 bg-brand-navy text-white h-12 rounded-xl font-bold text-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span className="font-bengali">কল করুন</span>
                </a>
              </div>

              <button
                onClick={() => setIsCallbackOpen(true)}
                className="mt-3 w-full flex items-center gap-3 px-3.5 py-3 rounded-xl border border-slate-200 text-sm font-bengali text-left hover:bg-slate-50"
              >
                <PhoneCall className="w-[18px] h-[18px] text-brand-blue" />
                <span className="flex-1">
                  <span className="block font-semibold text-slate-800">কলব্যাক রিকোয়েস্ট</span>
                  <span className="block text-[11px] text-slate-400 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> আপনার নম্বর শুধু বিক্রেতার কাছেই যাবে
                  </span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>
              <div className="h-4" />
            </div>

            {/* Seller */}
            <div className="mt-2 lg:mt-3 bg-white px-4 py-4 lg:px-0">
              <Link
                href={`/seller/${seller.id}`}
                className="group flex items-center gap-3.5 rounded-2xl border border-slate-200 p-3.5 hover:shadow-md transition-all"
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <Image src={seller.logo} alt={seller.businessNameBn} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[15px] font-bengali text-slate-900 truncate">{seller.businessNameBn}</span>
                    {seller.isNidVerified && <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-500 font-bengali flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    {seller.locationBn}
                  </p>
                </div>
                <span className="text-xs font-bold font-bengali text-brand-orange border border-brand-orange/40 rounded-lg px-2.5 py-1.5">
                  দোকান দেখুন
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Description & specs */}
        <section className="mt-2 lg:mt-16 bg-white px-4 py-5 lg:px-0 lg:pt-10 lg:border-t lg:border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 className="text-base lg:text-lg font-bold font-bengali text-slate-900">পণ্যের বিবরণ</h2>
            <p className="mt-3 text-sm lg:text-[15px] text-slate-600 font-bengali leading-[1.85]">
              {product.descriptionBn || product.description}
            </p>
          </div>

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="lg:col-span-5">
              <h2 className="text-base lg:text-lg font-bold font-bengali text-slate-900">স্পেসিফিকেশন</h2>
              <dl className="mt-3 divide-y divide-slate-100 text-sm">
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
          <section className="mt-2 lg:mt-16 bg-slate-100 lg:bg-white px-4 py-5 lg:px-0 lg:pt-10 lg:border-t lg:border-slate-100">
            <h2 className="text-base lg:text-lg font-bold font-bengali text-slate-900 mb-4">আরও পণ্য দেখুন</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

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
                <label className="block text-xs font-semibold text-slate-700 mb-1">মোবাইল নম্বর (কান্ট্রি কোড সহ) *</label>
                <PhoneInput value={callbackPhone} onChange={setCallbackPhone} required />
              </div>
              <Button type="submit" variant="primary" fullWidth className="font-bengali font-bold">
                কল রিকোয়েস্ট নিশ্চিত করুন
              </Button>
            </form>
          )}
        </Modal>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-sm font-bengali px-4 py-2 rounded-full shadow-lg">
          {toast}
        </div>
      )}

      {/* Mobile sticky bar (Daraz style): Store | Wishlist | WhatsApp chat | Call */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-200 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-1.5">
          <Link
            href={`/seller/${seller.id}`}
            className="w-14 flex flex-col items-center justify-center gap-0.5 text-[10px] text-slate-600 font-bengali"
          >
            <Store className="w-5 h-5" />
            দোকান
          </Link>
          <button
            onClick={handleWishlist}
            className="w-14 flex flex-col items-center justify-center gap-0.5 text-[10px] text-slate-600 font-bengali"
          >
            <Heart className={`w-5 h-5 ${saved ? 'fill-red-500 text-red-500' : ''}`} />
            পছন্দ
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-12 rounded-lg bg-[#25D366] text-white text-sm font-bold font-bengali flex items-center justify-center gap-1.5 active:scale-95 transition"
          >
            <WhatsAppIcon className="w-4 h-4" />
            চ্যাট
          </a>
          <a
            href={telUrl}
            className="flex-1 h-12 rounded-lg bg-brand-orange text-white text-sm font-bold font-bengali flex items-center justify-center gap-1.5 active:scale-95 transition"
          >
            <PhoneCall className="w-4 h-4" />
            কল করুন
          </a>
        </div>
      </div>
    </div>
  );
}
