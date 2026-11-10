'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronDown, 
  ShoppingBag, 
  PlusCircle, 
  Store, 
  Menu, 
  X, 
  Search,
  Home,
  FileEdit,
  ClipboardList
} from 'lucide-react';
import { mockCategories } from '@/data/mockData';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-lg bg-gradient-to-br from-brand-navy to-brand-blue flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              <span className="tracking-tighter">PB</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-brand-navy text-lg md:text-xl tracking-tight leading-none group-hover:text-brand-blue transition-colors">
                Paikari Bazar
              </span>
              <span className="font-bengali text-[11px] md:text-xs text-slate-500 font-medium leading-tight mt-0.5">
                বাংলাদেশের সবচেয়ে বড় পাইকারী ও স্ক্র্যাপ মার্কেটপ্লেস
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href="/"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/' ? 'text-brand-orange' : 'text-slate-700 hover:text-brand-navy'
              }`}
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <button 
                className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-brand-navy transition-colors py-2"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {categoriesOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {mockCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories?slug=${cat.slug}`}
                      className="flex items-center justify-between px-4 py-2.5 text-xs md:text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-blue transition-colors"
                    >
                      <span className="font-bengali font-medium">{cat.nameBn}</span>
                      <span className="text-[11px] text-slate-400 font-mono">({cat.productCount})</span>
                    </Link>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <Link 
                      href="/categories" 
                      className="block px-4 py-2 text-xs font-semibold text-brand-orange hover:underline"
                    >
                      View All Categories →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/buy-leads"
              className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                pathname === '/buy-leads' ? 'text-brand-orange' : 'text-slate-700 hover:text-brand-navy'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-brand-blue" />
              <span>Buy Leads</span>
            </Link>

            <Link
              href="/seller/seller-1"
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-brand-navy transition-colors"
            >
              <Store className="w-4 h-4 text-emerald-600" />
              <span>Seller Hub</span>
            </Link>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/post-ad"
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orangeHover text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Ad</span>
            </Link>
          </div>

          {/* Mobile Right Quick Action Icons (Matches Image 1: Home, Post Ad, Orders) */}
          <div className="flex lg:hidden items-center gap-3 sm:gap-4">
            <Link 
              href="/" 
              className="flex flex-col items-center text-slate-600 hover:text-brand-navy transition-colors"
            >
              <Home className="w-5 h-5 text-brand-blue" />
              <span className="text-[10px] font-medium mt-0.5">Home</span>
            </Link>

            <Link 
              href="/post-ad" 
              className="flex flex-col items-center text-slate-600 hover:text-brand-navy transition-colors"
            >
              <FileEdit className="w-5 h-5 text-brand-orange" />
              <span className="text-[10px] font-medium mt-0.5">Post Ad</span>
            </Link>

            <Link 
              href="/buy-leads" 
              className="flex flex-col items-center text-slate-600 hover:text-brand-navy transition-colors"
            >
              <ClipboardList className="w-5 h-5 text-slate-600" />
              <span className="text-[10px] font-medium mt-0.5">Orders</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search wholesale lots, scrap..."
              className="w-full bg-slate-100 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-semibold text-slate-800 hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              href="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-semibold text-slate-800 hover:bg-slate-50"
            >
              All Categories
            </Link>
            <Link
              href="/buy-leads"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-semibold text-slate-800 hover:bg-slate-50"
            >
              Buy Leads / RFQ
            </Link>
            <Link
              href="/seller/seller-1"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-semibold text-slate-800 hover:bg-slate-50"
            >
              Seller Hub (Shuvo Battery Solution)
            </Link>
          </div>

          <div className="pt-2">
            <Link
              href="/post-ad"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-brand-orange text-white py-2.5 rounded-lg font-bold text-sm shadow"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Scrap Ad</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

