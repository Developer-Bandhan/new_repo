'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, ArrowRight, Store, CheckCircle, Search, ClipboardList } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <>
    {/* Mobile Hero */}
    <section className="lg:hidden relative overflow-hidden bg-[#0B2547] text-white px-4 pt-7 pb-8 text-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=70')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B2547]/60 via-[#0B2547]/85 to-[#0B2547]" />
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-brand-blue/30 blur-3xl" />

      <div className="relative">
        <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-4">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[10px] font-semibold tracking-wider uppercase text-emerald-300">Trusted Trading Platform</span>
        </div>

        <h1 className="font-bengali font-bold text-[28px] leading-[1.3] [text-shadow:0_2px_10px_rgba(0,0,0,0.4)]">
          বাংলাদেশের বৃহত্তম পাইকারি<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">ও স্ক্র্যাপ মার্কেটপ্লেস</span>
        </h1>
        <p className="font-bengali text-[15px] text-slate-200 leading-relaxed mt-3">
          ভেরিফাইড সেলার এবং ১০০% নিরাপদ লেনদেনের নিশ্চয়তা
        </p>

        <div className="mt-5 flex flex-col gap-2.5 max-w-xs mx-auto">
          <Link
            href="/categories"
            className="flex items-center justify-center gap-2 bg-brand-blue active:bg-brand-blueHover text-white py-3 rounded-xl text-sm font-bold uppercase shadow-lg"
          >
            <span>Find Wholesale Lots</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/post-ad"
              className="flex items-center justify-center gap-1.5 bg-brand-orange active:bg-brand-orangeHover text-white py-3 rounded-xl text-xs font-bold uppercase shadow-lg"
            >
              <Store className="w-4 h-4" />
              Open Free Shop
            </Link>
            <Link
              href="/buy-leads"
              className="flex items-center justify-center gap-1.5 border border-white/60 text-white py-3 rounded-xl text-xs font-bengali font-semibold active:bg-white/10"
            >
              <ClipboardList className="w-4 h-4" />
              Buy Leads
            </Link>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 divide-x divide-white/15 border-t border-white/15 pt-4">
          {[['১০০%', 'ভেরিফাইড সেলার'], ['৫০০+', 'পাইকারি লট'], ['২৪/৭', 'সাপোর্ট']].map(([n, l]) => (
            <div key={l} className="px-1">
              <div className="text-lg font-extrabold text-amber-300 font-bengali">{n}</div>
              <div className="text-[10px] text-slate-300 font-bengali leading-tight">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="hidden lg:block relative bg-[#07192C] text-white overflow-hidden py-14 sm:py-20 lg:py-24">
      {/* Background Graphic Elements & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07192C] via-[#07192C]/90 to-[#0B2A4A]/80" />

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs md:text-sm text-emerald-300 shadow-inner">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold tracking-wide uppercase text-[11px] md:text-xs">
                TRUSTED TRADING PLATFORM
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-bengali tracking-tight leading-[1.2] text-white">
              বাংলাদেশের প্রথম ও বৃহত্তম <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">
                বিটুবি স্ক্র্যাপ মার্কেটপ্লেস
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-bengali max-w-2xl mx-auto lg:mx-0 font-normal">
              ভেরিফাইড সেলার এবং ১০০% নিরাপদ লেনদেনের নিশ্চয়তা
            </p>

            {/* Search Input Bar for Quick Procurement */}
            <div className="max-w-xl mx-auto lg:mx-0 bg-white p-1.5 rounded-xl shadow-2xl flex items-center gap-2">
              <div className="pl-3 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="স্ক্র্যাপ আইটেম, ব্যাটারি বা মেশিনারি খুঁজুন..."
                className="w-full text-slate-800 text-sm font-bengali placeholder-slate-400 focus:outline-none"
              />
              <Link
                href="/categories"
                className="bg-brand-navy hover:bg-brand-blue text-white px-5 py-2.5 rounded-lg text-xs md:text-sm font-bold flex-shrink-0 transition-colors"
              >
                Search
              </Link>
            </div>

            {/* CTA Buttons (Matches Image 2) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/categories"
                className="inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blueHover text-white px-7 py-3.5 rounded-xl font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>FIND WHOLESALE LOTS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/post-ad"
                className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orangeHover text-white px-7 py-3.5 rounded-xl font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <Store className="w-4 h-4" />
                <span>OPEN FREE SHOP</span>
              </Link>
            </div>

            {/* Indicator Dots */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-4">
              <span className="w-6 h-2 bg-brand-blue rounded-full" />
              <span className="w-2 h-2 bg-white/40 rounded-full" />
              <span className="w-2 h-2 bg-white/40 rounded-full" />
            </div>
          </div>

          {/* Right Visual Inset (Factory & Equipment Badge) */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center">
            <div className="relative w-72 h-72 rounded-full border-4 border-white/20 p-2 shadow-2xl bg-gradient-to-tr from-brand-orange/30 to-brand-blue/30 backdrop-blur-sm">
              <div 
                className="w-full h-full rounded-full bg-cover bg-center overflow-hidden shadow-inner border-2 border-white/40"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80')`,
                }}
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0B2A4A] border border-amber-400/60 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                100% Verified Bangladesh Scrap
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    </>
  );
};

