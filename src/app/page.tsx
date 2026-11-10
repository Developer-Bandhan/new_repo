import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { VerifiedSuppliers } from '@/components/home/VerifiedSuppliers';
import { FeaturedInventory } from '@/components/home/FeaturedInventory';
import { ShieldCheck, Truck, Headphones, BadgePercent, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
      <section className="bg-gradient-to-r from-brand-navy to-brand-darkNavy text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
            
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">১০০% ভেরিফাইড সেলার</h4>
                <p className="text-xs text-slate-400 font-bengali">জাতীয় পরিচয়পত্র ও লাইসেন্স যাচাইকৃত</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 flex-shrink-0">
                <BadgePercent className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">সরাসরি পাইকারি মূল্য</h4>
                <p className="text-xs text-slate-400 font-bengali">কোনো মধ্যস্বত্বভোগী বা দালালি নেই</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">সারাদেশে ডেলিভারি নেটওয়ার্ক</h4>
                <p className="text-xs text-slate-400 font-bengali">ঢাকা, চট্টগ্রাম ও শিল্পাঞ্চল কাভারেজ</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-orange-400 flex-shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">২৪/৭ ডেডিকেটেড সাপোর্ট</h4>
                <p className="text-xs text-slate-400 font-bengali">যেকোনো বিরোধ নিষ্পত্তিতে সহযোগিতা</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Call To Action for Sellers */}
      <section className="bg-brand-orange py-10 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-extrabold font-bengali mb-2">
            আপনার কাছে কি পুরাতন ব্যাটারি বা স্ক্র্যাপ মেটাল আছে?
          </h3>
          <p className="text-sm md:text-base font-bengali opacity-95 mb-6">
            আজই পাইকারি বাজারে ফ্রি দোকান খুলুন এবং সারাদেশের শত শত পাইকারি ক্রেতার কাছে দ্রুত বিক্রি করুন।
          </p>
          <Link
            href="/post-ad"
            className="inline-flex items-center gap-2 bg-white text-brand-orange hover:bg-slate-100 font-bold px-8 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 text-sm md:text-base"
          >
            <span>ফ্রি বিজ্ঞাপন দিন (Post Free Ad)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

