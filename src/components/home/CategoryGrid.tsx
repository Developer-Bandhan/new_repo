'use client';

import React from 'react';
import Link from 'next/link';
import { BatteryCharging, Factory, SunMedium, Sprout, Wrench, Layers } from 'lucide-react';
import { mockCategories } from '@/data/mockData';

// Illustrated duotone icons for the mobile category cards (white shapes + accent colour)
const CATEGORY_ACCENTS: Record<string, string> = {"scrap-batteries": "#E65A0B", "machinery": "#1D4ED8", "solar-electronics": "#0E7490", "agri-raw-materials": "#15803D", "misc-scrap": "#475569"};

const CategoryIllustration: React.FC<{ slug: string; className?: string }> = ({ slug, className }) => {
  const accent = CATEGORY_ACCENTS[slug] ?? CATEGORY_ACCENTS['misc-scrap'];
  switch (slug) {
    case 'scrap-batteries':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden>
          <rect x="18" y="12" width="9" height="8" rx="2.5" fill="#fff" opacity=".85" /><rect x="37" y="12" width="9" height="8" rx="2.5" fill="#fff" opacity=".85" /><rect x="9" y="19" width="46" height="34" rx="7" fill="#fff" /><rect x="9" y="45" width="46" height="8" rx="4" fill={accent} opacity=".16" /><path d="M35.5 23 L22 38.5 H30.5 L28 50 L43 32 H34 Z" fill={accent} />
        </svg>
      );
    case 'machinery':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden>
          <path d="M8 53 V31 L22 39 V31 L36 39 V31 L47 37 V13 H55 V53 Z" fill="#fff" /><rect x="47" y="13" width="8" height="5" fill={accent} opacity=".25" /><rect x="13" y="43" width="9" height="10" rx="1.5" fill={accent} opacity=".4" /><rect x="27" y="43" width="9" height="10" rx="1.5" fill={accent} opacity=".4" /><rect x="41" y="43" width="9" height="10" rx="1.5" fill={accent} opacity=".4" /><circle cx="51" cy="7" r="3.5" fill="#fff" opacity=".55" />
        </svg>
      );
    case 'solar-electronics':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden>
          <g><line x1="18" y1="5" x2="18" y2="9" stroke="#FFE9A8" strokeWidth="2.4" strokeLinecap="round" transform="rotate(0 18 17)" /><line x1="18" y1="5" x2="18" y2="9" stroke="#FFE9A8" strokeWidth="2.4" strokeLinecap="round" transform="rotate(45 18 17)" /><line x1="18" y1="5" x2="18" y2="9" stroke="#FFE9A8" strokeWidth="2.4" strokeLinecap="round" transform="rotate(90 18 17)" /><line x1="18" y1="5" x2="18" y2="9" stroke="#FFE9A8" strokeWidth="2.4" strokeLinecap="round" transform="rotate(135 18 17)" /><line x1="18" y1="5" x2="18" y2="9" stroke="#FFE9A8" strokeWidth="2.4" strokeLinecap="round" transform="rotate(180 18 17)" /><line x1="18" y1="5" x2="18" y2="9" stroke="#FFE9A8" strokeWidth="2.4" strokeLinecap="round" transform="rotate(225 18 17)" /><line x1="18" y1="5" x2="18" y2="9" stroke="#FFE9A8" strokeWidth="2.4" strokeLinecap="round" transform="rotate(270 18 17)" /><line x1="18" y1="5" x2="18" y2="9" stroke="#FFE9A8" strokeWidth="2.4" strokeLinecap="round" transform="rotate(315 18 17)" /></g><circle cx="18" cy="17" r="6" fill="#FFE08A" /><path d="M9 54 L19 31 H56 L46 54 Z" fill="#fff" /><g stroke={accent} strokeWidth="1.8" opacity=".55" fill="none"><path d="M31.5 31 L21.5 54" /><path d="M43.5 31 L33.5 54" /><path d="M14 42.5 H51" /></g>
        </svg>
      );
    case 'agri-raw-materials':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden>
          <ellipse cx="32" cy="54" rx="18" ry="4" fill="#fff" opacity=".45" /><path d="M32 53 V30" stroke="#fff" strokeWidth="4" strokeLinecap="round" /><path d="M32 41 C19 41 11 33 11 21 C24 21 32 29 32 41 Z" fill="#fff" /><path d="M32 33 C32 20 40 11 54 11 C54 24 45 33 32 33 Z" fill="#fff" opacity=".88" /><path d="M32 41 C27 36 22 31 16 25" stroke={accent} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity=".5" /><path d="M32 33 C38 27 43 21 49 16" stroke={accent} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity=".5" />
        </svg>
      );
    case 'misc-scrap':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden>
          <rect x="28.5" y="8" width="7" height="48" rx="2" fill="#fff" transform="rotate(0 32 32)" /><rect x="28.5" y="8" width="7" height="48" rx="2" fill="#fff" transform="rotate(45 32 32)" /><rect x="28.5" y="8" width="7" height="48" rx="2" fill="#fff" transform="rotate(90 32 32)" /><rect x="28.5" y="8" width="7" height="48" rx="2" fill="#fff" transform="rotate(135 32 32)" /><circle cx="32" cy="32" r="17" fill="#fff" /><circle cx="32" cy="32" r="7.5" fill={accent} /><circle cx="32" cy="32" r="3" fill="#fff" opacity=".7" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden>
          <rect x="28.5" y="8" width="7" height="48" rx="2" fill="#fff" transform="rotate(0 32 32)" /><rect x="28.5" y="8" width="7" height="48" rx="2" fill="#fff" transform="rotate(45 32 32)" /><rect x="28.5" y="8" width="7" height="48" rx="2" fill="#fff" transform="rotate(90 32 32)" /><rect x="28.5" y="8" width="7" height="48" rx="2" fill="#fff" transform="rotate(135 32 32)" /><circle cx="32" cy="32" r="17" fill="#fff" /><circle cx="32" cy="32" r="7.5" fill={accent} /><circle cx="32" cy="32" r="3" fill="#fff" opacity=".7" />
        </svg>
      );
  }
};

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
    <>
    {/* Mobile Categories */}
    <section className="lg:hidden bg-gradient-to-b from-[#F4E3CC] to-[#EFD8BA] pt-6 pb-6">
      <div className="px-4 mb-4">
        <h2 className="font-bengali font-bold text-xl text-slate-900">কল-টু-অ্যাকশন</h2>
        <p className="text-[11px] text-slate-600">Bangladesh&apos;s Largest Wholesale &amp; Scrap Marketplace</p>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-pl-4 px-4 pb-3">
        {mockCategories.slice(0, 5).map((cat, i) => {
          const grads = ['from-amber-400 via-orange-500 to-orange-600', 'from-sky-400 via-blue-600 to-blue-800', 'from-yellow-300 via-teal-500 to-sky-700', 'from-lime-400 via-green-500 to-emerald-700', 'from-slate-400 via-slate-500 to-slate-700'];
          return (
            <Link
              key={cat.id}
              href={`/categories?slug=${cat.slug}`}
              className="snap-start flex-shrink-0 w-[104px] bg-gradient-to-b from-white to-[#FAF5EE] rounded-2xl px-2 py-3.5 flex flex-col items-center text-center border border-white shadow-[0_8px_18px_-6px_rgba(120,80,30,0.4)] active:scale-95 transition-transform"
            >
              <div className={`relative w-[60px] h-[60px] rounded-[18px] bg-gradient-to-br ${grads[i]} flex items-center justify-center mb-2.5 shadow-[0_8px_14px_-6px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.45)] ring-2 ring-white`}>
                <span className="absolute inset-x-1 top-1 h-1/2 rounded-t-[14px] bg-gradient-to-b from-white/30 to-transparent" />
                <CategoryIllustration slug={cat.slug} className="relative w-9 h-9 drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]" />
              </div>
              <span className="font-bengali text-xs font-semibold text-slate-900 leading-tight line-clamp-2 min-h-[2rem] flex items-center">
                {cat.nameBn}
              </span>
            </Link>
          );
        })}
      </div>
    </section>

    <section className="hidden lg:block py-8 md:py-12 bg-[#F6F1EA] border-y border-[#E8DFC9]">
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
    </>
  );
};

