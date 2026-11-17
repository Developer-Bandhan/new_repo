'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockCategories, mockProducts } from '@/data/mockData';
import { ProductCard } from '@/components/product/ProductCard';
import { Layers, Search, MapPin, Globe, X } from 'lucide-react';
import { Dropdown, type DropdownOption } from '@/components/ui/Dropdown';
import { BD_DISTRICTS, COUNTRIES } from '@/data/countries';

const COUNTRY_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'সব দেশ', sub: 'All Countries' },
  ...COUNTRIES.map((c) => ({ value: c.code, label: c.nameBn, sub: c.name })),
];

const DISTRICT_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'সমগ্র বাংলাদেশ', sub: 'All Districts' },
  ...BD_DISTRICTS,
];

const CONDITIONS = [
  { value: 'all', label: 'সব' },
  { value: 'new', label: 'নতুন' },
  { value: 'used', label: 'পুরাতন' },
] as const;

type ConditionFilter = (typeof CONDITIONS)[number]['value'];

const TRIGGER =
  'h-12 pl-11 pr-10 text-[15px] font-bengali text-slate-800 bg-white border border-slate-200 rounded-xl shadow-sm';
const TRIGGER_OPEN = 'border-brand-orange/50 ring-4 ring-brand-orange/10';

function CategoriesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('slug') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') || '');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [condition, setCondition] = useState<ConditionFilter>('all');

  const showDistrict = selectedCountry === 'all' || selectedCountry === 'BD';

  const filteredProducts = mockProducts.filter((product) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesCategory = selectedCategory === 'all' || product.categorySlug === selectedCategory;
    const matchesQuery =
      q === '' ||
      product.title.toLowerCase().includes(q) ||
      product.titleBn.includes(searchQuery.trim()) ||
      product.locationBn.includes(searchQuery.trim());
    const matchesCountry = selectedCountry === 'all' || product.country === selectedCountry;
    const matchesDistrict =
      !showDistrict || selectedDistrict === 'all' || product.location.includes(selectedDistrict);
    const matchesCondition = condition === 'all' || product.condition === condition;
    return matchesCategory && matchesQuery && matchesCountry && matchesDistrict && matchesCondition;
  });

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedCountry('all');
    setSelectedDistrict('all');
    setCondition('all');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-bengali text-brand-navy">
            ক্যাটাগরি ও পণ্য তালিকা
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-bengali mt-1">
            দেশ, এলাকা ও পণ্যের অবস্থা (নতুন / পুরাতন) অনুযায়ী বাছাই করে সঠিক পাইকারি ডিল খুঁজুন
          </p>
        </div>

        {/* Search */}
        <div className="group relative mb-2.5">
          <Search className="w-[18px] h-[18px] text-slate-400 group-focus-within:text-brand-orange transition-colors absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="পণ্য খুঁজুন..."
            className="w-full h-12 bg-white pl-11 pr-10 text-[15px] font-bengali text-slate-800 placeholder-slate-400 focus:outline-none border border-slate-200 rounded-xl shadow-sm focus:border-brand-orange/50 focus:ring-4 focus:ring-brand-orange/10"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Country + district */}
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <Dropdown
            value={selectedCountry}
            onChange={(v) => {
              setSelectedCountry(v);
              setSelectedDistrict('all');
            }}
            options={COUNTRY_OPTIONS}
            icon={<Globe className="w-[18px] h-[18px]" />}
            triggerClassName={TRIGGER}
            openTriggerClassName={TRIGGER_OPEN}
          />
          {showDistrict && (
            <Dropdown
              value={selectedDistrict}
              onChange={setSelectedDistrict}
              options={DISTRICT_OPTIONS}
              icon={<MapPin className="w-[18px] h-[18px]" />}
              triggerClassName={TRIGGER}
              openTriggerClassName={TRIGGER_OPEN}
            />
          )}
        </div>

        {/* Condition: new / used */}
        <div className="mb-4 flex items-center gap-2 font-bengali text-xs">
          <span className="text-slate-500 font-semibold mr-1">অবস্থা:</span>
          {CONDITIONS.map((c) => (
            <button
              key={c.value}
              onClick={() => setCondition(c.value)}
              className={`px-4 py-2 rounded-full font-bold transition-colors ${
                condition === c.value
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none font-bengali text-xs mb-4">
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

        <p className="text-xs text-slate-500 font-bengali mb-3">{filteredProducts.length} টি পণ্য পাওয়া গেছে</p>

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
            <h3 className="text-lg font-bold text-slate-700">কোনো পণ্য পাওয়া যায়নি</h3>
            <p className="text-sm text-slate-500">অনুগ্রহ করে ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
            <button
              onClick={resetFilters}
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
