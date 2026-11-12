import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { VerifiedSuppliers } from '@/components/home/VerifiedSuppliers';
import { FeaturedInventory } from '@/components/home/FeaturedInventory';
import { ShieldCheck, Truck, Headphones, BadgePercent, Store } from 'lucide-react';
import Link from 'next/link';

const trustItems = [
  { icon: ShieldCheck, color: 'text-emerald-400', title: '১০০% ভেরিফাইড সেলার', desc: 'জাতীয় পরিচয়পত্র ও লাইসেন্স যাচাইকৃত' },
  { icon: BadgePercent, color: 'text-amber-400', title: 'সরাসরি পাইকারি মূল্য', desc: 'কোনো মধ্যস্বত্বভোগী বা দালালি নেই' },
  { icon: Truck, color: 'text-blue-400', title: 'সারাদেশে ডেলিভারি নেটওয়ার্ক', desc: 'ঢাকা, চট্টগ্রাম ও শিল্পাঞ্চল কাভারেজ' },
  { icon: Headphones, color: 'text-orange-400', title: '২৪/৭ ডেডিকেটেড সাপোর্ট', desc: 'যেকোনো বিরোধ নিষ্পত্তিতে সহযোগিতা' },
];

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero Section (Image 2) */}
      <HeroSection />

      {/* 2. Category Section (Image 2) */}
      <CategoryGrid />

      {/* 3. Verified Supplier Section (Image 2) */}
      <VerifiedSuppliers />

      {/* 4. Featured Inventory & Wholesale Lots (Image 1 & 2) */}
      <FeaturedInventory />

      {/* 5. Trust & Quality Assurance Banner */}
      <section className="bg-gradient-to-r from-brand-navy to-brand-darkNavy text-white py-7 md:py-14 overflow-hidden">
        {/* Desktop: 4 columns */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-6 text-left">
            {trustItems.map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{title}</h4>
                  <p className="text-xs text-slate-400 font-bengali">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: one line, continuously scrolling */}
        <div className="md:hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
          <div
            className="flex w-max animate-marquee motion-reduce:animate-none active:[animation-play-state:paused]"
            style={{ animationDuration: '24s' }}
          >
            {[...trustItems, ...trustItems].map(({ icon: Icon, color, title, desc }, i) => (
              <div
                key={`${title}-${i}`}
                className="mr-3 flex items-center gap-3 flex-shrink-0 bg-white/[0.07] border border-white/10 rounded-2xl pl-3 pr-5 py-3"
              >
                <div className={`w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="whitespace-nowrap">
                  <h4 className="font-bold text-[13px] leading-snug">{title}</h4>
                  <p className="text-[11px] text-slate-400 font-bengali leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call To Action for Sellers */}
      <section className="bg-brand-orange py-10 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-extrabold font-bengali mb-2">
            আপনার কাছে কি ব্যাটারি বা স্ক্র্যাপ মেটাল আছে?
          </h3>
          <p className="text-sm md:text-base font-bengali opacity-95 mb-6">
            আজই পাইকারি বাজারে ফ্রি দোকান খুলুন এবং সারাদেশের শত শত পাইকারি ক্রেতার কাছে দ্রুত বিক্রি করুন।
          </p>
          <Link
            href="/post-ad"
            className="inline-flex items-center gap-2 bg-white text-brand-orange hover:bg-slate-100 font-bold px-8 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 text-sm md:text-base"
          >
            <Store className="w-4 h-4" />
            <span className="uppercase">Open Free Shop</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

