'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ChevronDown, 
  ShoppingBag, 
  PlusCircle, 
  Store, 
  Menu, 
  X, 
  Search,
  Home,
  ClipboardList,
  LayoutGrid,
  ChevronRight
} from 'lucide-react';
import { mockCategories } from '@/data/mockData';
import { openPostDemand } from '@/lib/postDemand';
import { LanguageSwitcher } from './LanguageSwitcher';
import { NotificationBell } from './NotificationBell';
import { AccountButton, DrawerAccount } from './AccountButton';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  // Close drawer when the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock page scroll while the drawer is open + close on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileMenuOpen]);

  const drawerLinks = [
    { href: '/', label: 'হোম', sub: 'Home', icon: Home },
    { href: '/categories', label: 'সব ক্যাটাগরি', sub: 'All Categories', icon: LayoutGrid },
    { href: '/buy-leads', label: 'ক্রেতার চাহিদা / অর্ডার পোস্ট', sub: 'Buy Leads / RFQ', icon: ClipboardList },
    { href: '/seller/seller-1', label: 'সেলার হাব', sub: 'Seller Hub', icon: Store },
  ];

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchText.trim();
    setMobileMenuOpen(false);
    router.push(q ? `/categories?q=${encodeURIComponent(q)}` : '/categories');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B2547] lg:bg-white border-b border-[#0B2547] lg:border-slate-200/90 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Bar */}
        <div className="flex lg:hidden items-center justify-between h-14 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 -ml-1 text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link href="/" className="flex items-center gap-2 min-w-0">
              <Image
                src="/logo.png" unoptimized
                alt="Paikari Bazar"
                width={35}
                height={35}
                priority
                className="h-7 w-auto flex-shrink-0"
              />
              <span translate="no" className="font-extrabold text-white text-lg leading-none truncate">Paikari Bazar</span>
            </Link>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <NotificationBell tone="dark" />
            <LanguageSwitcher tone="dark" />
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>

        {/* Desktop Bar */}
        <div className="hidden lg:flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/logo.png" unoptimized
              alt="Paikari Bazar"
              width={48}
              height={48}
              priority
              className="h-11 md:h-12 w-auto p-1.5 rounded-lg bg-[#041D3C] shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span translate="no" className="font-extrabold text-brand-navy text-lg md:text-xl tracking-tight leading-none group-hover:text-brand-blue transition-colors">
                Paikari Bazar
              </span>
              <span className="font-bengali text-[11px] md:text-xs text-slate-500 font-medium leading-tight mt-0.5">
                নতুন ও পুরাতন পাইকারি বাজার
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
              হোম
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
                <span className="font-bengali">ক্যাটাগরি</span>
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
                      সব ক্যাটাগরি দেখুন →
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
              <span className="font-bengali">ক্রেতার চাহিদা</span>
            </Link>

            <Link
              href="/seller/seller-1"
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-brand-navy transition-colors"
            >
              <Store className="w-4 h-4 text-emerald-600" />
              <span className="font-bengali">সেলার হাব</span>
            </Link>
          </nav>

          {/* Desktop Right: search, bell, language, CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              href="/categories"
              aria-label="Search"
              className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
            >
              <Search className="w-[18px] h-[18px]" />
            </Link>
            <NotificationBell />
            <LanguageSwitcher showLabel />
            <AccountButton />
            <button
              onClick={openPostDemand}
              className="inline-flex items-center gap-2 border-2 border-brand-orange text-brand-orange hover:bg-orange-50 px-4 py-2 rounded-lg font-bold text-sm font-bengali transition-colors"
            >
              <ClipboardList className="w-4 h-4" />
              <span>চাহিদা পোস্ট</span>
            </button>
            <Link
              href="/post-ad"
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orangeHover text-white px-4 py-2.5 rounded-lg font-bold text-sm font-bengali shadow-md hover:shadow-lg transition-all duration-200"
            >
              <PlusCircle className="w-4 h-4" />
              <span>বিজ্ঞাপন দিন</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {/* Backdrop: soft blur, fades in/out */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden
        className={`lg:hidden fixed inset-0 z-[60] bg-[#071B30]/55 backdrop-blur-[3px] transition-opacity duration-300 ease-out ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Side drawer: slides in from the left (GPU transform only) */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!mobileMenuOpen}
        className={`lg:hidden fixed inset-y-0 left-0 z-[70] w-[84%] max-w-[330px] bg-white flex flex-col rounded-r-3xl shadow-[8px_0_40px_rgba(7,27,48,0.35)] will-change-transform transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between bg-[#0B2547] px-4 h-14 rounded-tr-3xl flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" unoptimized alt="Paikari Bazar" width={32} height={36} className="h-9 w-auto" />
            <span translate="no" className="font-extrabold text-white text-lg leading-none">Paikari Bazar</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 transition flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
          {/* Search */}
          <form
            onSubmit={submitSearch}
            className={`relative transition-all duration-500 ease-out ${
              mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ transitionDelay: mobileMenuOpen ? '120ms' : '0ms' }}
          >
            <input
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="পণ্য, ব্যাটারি, মেশিনারি খুঁজুন..."
              className="w-full bg-slate-100 border border-transparent rounded-xl pl-10 pr-4 py-3 text-base font-bengali text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-brand-blue/40 focus:ring-4 focus:ring-brand-blue/10 transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </form>

          {/* Account */}
          <div className="mt-4">
            <DrawerAccount onNavigate={() => setMobileMenuOpen(false)} />
          </div>

          {/* Links */}
          <nav className="mt-4 space-y-1.5">
            {drawerLinks.map(({ href, label, sub, icon: Icon }, i) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-500 ease-out active:scale-[0.98] ${
                    active ? 'bg-orange-50' : 'hover:bg-slate-50'
                  } ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: mobileMenuOpen ? `${180 + i * 60}ms` : '0ms' }}
                >
                  <span
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      active ? 'bg-brand-orange text-white' : 'bg-slate-100 text-brand-navy group-hover:bg-brand-navy group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className={`block text-[15px] font-semibold leading-tight ${active ? 'text-brand-orange' : 'text-slate-900'}`}>
                      {label}
                    </span>
                    <span className="block text-[11px] text-slate-500 font-bengali truncate">{sub}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-orange group-hover:translate-x-0.5 transition" />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* CTA */}
        <div
          className={`px-4 pb-5 pt-3 border-t border-slate-100 flex-shrink-0 transition-all duration-500 ease-out ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
          style={{ transitionDelay: mobileMenuOpen ? '440ms' : '0ms' }}
        >
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openPostDemand();
            }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-orange to-orange-500 active:scale-[0.98] text-white py-3.5 rounded-xl font-bold text-sm font-bengali shadow-lg shadow-orange-500/30 transition"
          >
            <ClipboardList className="w-4 h-4" />
            <span>আপনার চাহিদা পোস্ট করুন</span>
          </button>
          <Link
            href="/post-ad"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 w-full flex items-center justify-center gap-2 border border-slate-300 text-slate-700 active:scale-[0.98] py-3 rounded-xl font-bold text-sm font-bengali transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>বিজ্ঞাপন দিন / ফ্রি দোকান খুলুন</span>
          </Link>
        </div>
      </aside>
    </header>
  );
};

