'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, ClipboardList, Store, Plus } from 'lucide-react';
import { openPostDemand } from '@/lib/postDemand';

const items = [
  { href: '/', label: 'হোম', icon: Home },
  { href: '/categories', label: 'ক্যাটাগরি', icon: LayoutGrid },
  null, // centre action
  { href: '/buy-leads', label: 'চাহিদা', icon: ClipboardList },
  { href: '/post-ad', label: 'বিক্রি করুন', icon: Store },
];

/** Mobile-only thumb-reach navigation. Hidden on product pages (they have their own action bar). */
export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  if (pathname.startsWith('/products/')) return null;

  return (
    <nav
      aria-label="Main"
      className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-200 shadow-[0_-4px_16px_rgba(11,37,71,0.08)] pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5 items-center h-16">
        {items.map((item, i) => {
          if (!item) {
            return (
              <li key="demand" className="flex justify-center">
                <button
                  onClick={openPostDemand}
                  aria-label="চাহিদা পোস্ট করুন"
                  className="h-16 w-full flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-transform"
                >
                  <span className="w-9 h-7 rounded-lg bg-brand-orange text-white flex items-center justify-center">
                    <Plus className="w-5 h-5" strokeWidth={2.5} />
                  </span>
                  <span className="text-[10px] font-semibold text-brand-orange font-bengali">চাহিদা পোস্ট</span>
                </button>
              </li>
            );
          }
          const { href, label, icon: Icon } = item;
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`h-16 flex flex-col items-center justify-center gap-0.5 ${
                  active ? 'text-brand-orange' : 'text-slate-500'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-semibold font-bengali">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
