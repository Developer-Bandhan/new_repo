'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Tag, Store, ShieldCheck, ClipboardList, Clock, XCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth';

const TABS = [
  { href: '/dashboard', label: 'ওভারভিউ', icon: LayoutDashboard },
  { href: '/dashboard/products', label: 'আমার পণ্য', icon: Package },
  { href: '/dashboard/offers', label: 'অফার', icon: Tag },
  { href: '/dashboard/leads', label: 'ক্রেতার চাহিদা', icon: ClipboardList },
  { href: '/dashboard/shop', label: 'আমার দোকান', icon: Store },
  { href: '/dashboard/verification', label: 'ভেরিফিকেশন', icon: ShieldCheck },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const pathname = usePathname();

  if (!ready) return <div className="min-h-[60vh]" />;

  if (!user || user.role !== 'seller') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-12 font-bengali">
        <div className="max-w-sm text-center bg-white rounded-2xl border border-slate-200 p-6">
          <Store className="w-10 h-10 text-brand-orange mx-auto" />
          <h1 className="mt-3 text-lg font-bold text-slate-900">সেলার ড্যাশবোর্ড</h1>
          <p className="mt-1 text-sm text-slate-500">
            {user ? 'এটি দেখতে একটি বিক্রেতা অ্যাকাউন্ট লাগবে।' : 'ড্যাশবোর্ড দেখতে লগইন করুন।'}
          </p>
          <div className="mt-5 flex flex-col gap-2">
            {!user && (
              <Link href="/login" className="h-11 rounded-xl bg-brand-navy text-white font-bold flex items-center justify-center">
                লগইন
              </Link>
            )}
            <Link href="/register?role=seller" className="h-11 rounded-xl bg-brand-orange text-white font-bold flex items-center justify-center">
              ফ্রি দোকান খুলুন
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 lg:pt-8 font-bengali">
        <div className="mb-4">
          <p className="text-xs text-slate-500">স্বাগতম,</p>
          <h1 className="text-xl lg:text-2xl font-bold text-brand-navy">{user.name}</h1>
        </div>

        {user.shopStatus === 'pending' && (
          <div className="mb-4 flex gap-3 items-start rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-sm text-amber-800">
            <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>
              আপনার দোকান <strong>অ্যাডমিন অনুমোদনের অপেক্ষায়</strong>। অনুমোদনের পর দোকান ও পণ্য ক্রেতারা দেখতে পাবেন।
              এর মধ্যে দোকানের তথ্য ও পণ্য যোগ করে রাখুন।
            </p>
          </div>
        )}
        {user.shopStatus === 'rejected' && (
          <div className="mb-4 flex gap-3 items-start rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">
            <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>আপনার দোকান অনুমোদন পায়নি। তথ্য ঠিক করে আবার জমা দিন।</p>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-6">
          {/* Tabs: horizontal scroll on mobile, sidebar on desktop */}
          <nav className="-mx-4 px-4 lg:mx-0 lg:px-0 mb-4 lg:mb-0 flex lg:flex-col gap-2 lg:gap-1 overflow-x-auto scrollbar-none lg:self-start lg:sticky lg:top-28">
            {TABS.map(({ href, label, icon: Icon }) => {
              const active = href === '/dashboard' ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex-shrink-0 inline-flex items-center gap-2 px-3.5 h-10 rounded-xl text-sm font-semibold whitespace-nowrap transition ${
                    active
                      ? 'bg-brand-navy text-white'
                      : 'bg-white lg:bg-transparent border border-slate-200 lg:border-0 text-slate-600 hover:bg-white hover:text-brand-navy'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
