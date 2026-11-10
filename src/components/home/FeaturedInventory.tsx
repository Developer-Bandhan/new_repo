'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { mockProducts } from '@/data/mockData';
import { Sparkles, Filter, ChevronRight } from 'lucide-react';

export const FeaturedInventory: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredProducts = selectedFilter === 'all'
    ? mockProducts
    : mockProducts.filter((p) => p.categorySlug === selectedFilter);

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-slate-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-brand-orange text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>WHOLESALE LISTINGS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold font-bengali text-brand-navy tracking-tight">
              Featured Inventory / পাইকারি ইনভেন্টরি
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-bengali mt-0.5">
              সরাসরি বিক্রেতার সাথে কথা বলে সেরা পাইকারি রেটে স্ক্র্যাপ সংগ্রহ করুন
            </p>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none font-bengali text-xs">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              সব পণ্য ({mockProducts.length})
            </button>
            <button
              onClick={() => setSelectedFilter('scrap-batteries')}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                selectedFilter === 'scrap-batteries'
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              পুরাতন ব্যাটারি
            </button>
            <button
              onClick={() => setSelectedFilter('misc-scrap')}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                selectedFilter === 'misc-scrap'
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              মেটাল ও তার স্ক্র্যাপ
            </button>
            <button
              onClick={() => setSelectedFilter('machinery')}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                selectedFilter === 'machinery'
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              মেশিনারিজ
            </button>
          </div>
        </div>

        {/* Product Grid (Matches Image 1 & 2: 2 cols on mobile, 3-4 cols on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA to View More */}
        <div className="mt-10 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-brand-navy border border-slate-300 px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:shadow transition-all font-bengali"
          >
            <span>মার্কেটপ্লেসের সমস্ত {mockProducts.length}+ টি লট দেখুন</span>
            <ChevronRight className="w-4 h-4 text-brand-orange" />
          </Link>
        </div>

      </div>
    </section>
  );
};

