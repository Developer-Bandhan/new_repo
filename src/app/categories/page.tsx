'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockCategories, mockProducts } from '@/data/mockData';
import { ProductCard } from '@/components/product/ProductCard';
import { Filter, Layers, Search, MapPin } from 'lucide-react';

function CategoriesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('slug') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  // Filter products based on selected criteria
  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.categorySlug === selectedCategory;
    const matchesQuery = 
      searchQuery === '' ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.titleBn.includes(searchQuery) ||
      product.locationBn.includes(searchQuery);
    const matchesDistrict = selectedDistrict === 'all' || product.location.includes(selectedDistrict);
    return matchesCategory && matchesQuery && matchesDistrict;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-bengali text-brand-navy">
            স্ক্র্যাপ ক্যাটাগরি ও পণ্য তালিকা
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-bengali mt-1">
            নির্দিষ্ট ক্যাটাগরি এবং এলাকা অনুযায়ী বাছাই করে সঠিক পাইকারি ডিল খুঁজুন
          </p>
        </div>

        {/* Filter Controls Row */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="পণ্য বা স্ক্র্যাপ খুঁজুন..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm font-bengali focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          {/* District selector */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm font-bengali text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-blue w-full md:w-48"
            >
              <option value="all">সমগ্র বাংলাদেশ (All Districts)</option>
              <option value="Dhaka">ঢাকা (Dhaka)</option>
              <option value="Chittagong">চট্টগ্রাম (Chittagong)</option>
              <option value="Gazipur">গাজীপুর (Gazipur)</option>
              <option value="Narayanganj">নারায়ণগঞ্জ (Narayanganj)</option>
            </select>
          </div>

        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none font-bengali text-xs mb-6">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-colors shadow-sm ${
              selectedCategory === 'all'
                ? 'bg-brand-navy text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            সব ক্যাটাগরি ({mockProducts.length})
          </button>
          {mockCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-colors shadow-sm ${
                selectedCategory === cat.slug
                  ? 'bg-brand-navy text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.nameBn} ({cat.productCount})
            </button>
          ))}
        </div>

        {/* Product Results Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center font-bengali space-y-3">
            <Layers className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-700">কোনো পণ্য পাওয়া যায়নি</h3>
            <p className="text-sm text-slate-500">অনুগ্রহ করে ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedDistrict('all');
              }}
              className="inline-block mt-2 text-xs font-bold text-brand-blue hover:underline"
            >
              সব ফিল্টার রিসেট করুন
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center font-bengali text-slate-500">লোড হচ্ছে...</div>
      </div>
    }>
      <CategoriesContent />
    </Suspense>
  );
}
