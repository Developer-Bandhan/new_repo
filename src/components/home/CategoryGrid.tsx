'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BatteryCharging, 
  Factory, 
  SunMedium, 
  Sprout, 
  Wrench,
  Layers
} from 'lucide-react';
import { mockCategories } from '@/data/mockData';

export const CategoryGrid: React.FC = () => {
  // Mapping icons to category slugs
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'scrap-batteries':
        return <BatteryCharging className="w-8 h-8 text-amber-700" />;
      case 'machinery':
        return <Factory className="w-8 h-8 text-blue-800" />;
      case 'solar-electronics':
        return <SunMedium className="w-8 h-8 text-sky-700" />;
      case 'agri-raw-materials':
        return <Sprout className="w-8 h-8 text-emerald-700" />;
      case 'misc-scrap':
      default:
        return <Wrench className="w-8 h-8 text-slate-700" />;
    }
  };

  return (
    <section className="py-8 md:py-12 bg-[#F6F1EA] border-y border-[#E8DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {mockCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories?slug=${cat.slug}`}
              className="group bg-[#FFFDF9] hover:bg-white border border-[#E5DAC6] hover:border-brand-orange/60 rounded-2xl p-4 md:p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Category Icon Container */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-[#F4EDE0] group-hover:bg-amber-50 flex items-center justify-center mb-3 transition-colors shadow-inner">
                {getCategoryIcon(cat.slug)}
              </div>

              {/* Title in Bengali */}
              <h3 className="font-bengali font-bold text-slate-800 text-xs sm:text-sm md:text-base leading-tight group-hover:text-brand-orange transition-colors">
                {cat.nameBn}
              </h3>

              {/* Product volume count */}
              <span className="text-[11px] text-slate-500 font-mono mt-1">
                {cat.productCount} টি লট
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

