import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B2A4A] text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-brand-orange flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                <span>PB</span>
              </div>
              <span className="font-extrabold text-white text-xl tracking-tight">
                Paikari Bazar
              </span>
            </div>
            
            <p className="text-sm text-slate-300 font-bengali leading-relaxed max-w-sm">
              বাংলাদেশের বৃহত্তম ও বিশ্বস্ত বিটুবি স্ক্র্যাপ মার্কেটপ্লেস। ভেরিফাইড সেলার এবং ১০০% নিরাপদ লেনদেনের নিশ্চয়তায় পাইকারি কেনাবেচা করুন।
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-blue flex items-center justify-center text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-sky-500 flex items-center justify-center text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center text-white transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Features</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/seller/seller-1" className="hover:text-white transition-colors">Paikari Bazar Partners</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Scrap Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Scrap Sectors</h4>
            <ul className="space-y-2 text-xs md:text-sm font-bengali">
              <li><Link href="/categories?slug=scrap-batteries" className="hover:text-white transition-colors">Scrap Batteries (পুরাতন ব্যাটারি)</Link></li>
              <li><Link href="/categories?slug=lead-ingots" className="hover:text-white transition-colors">Lead Broken (সীসা ইনগট)</Link></li>
              <li><Link href="/categories?slug=solar-electronics" className="hover:text-white transition-colors">Solar & Electronics</Link></li>
              <li><Link href="/categories?slug=machinery" className="hover:text-white transition-colors">Heavy Machinery</Link></li>
            </ul>
          </div>

          {/* Policy & Trust */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Legal & Trust</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/post-ad" className="hover:text-white transition-colors">Post Scrap Listing</Link></li>
              <li><Link href="/buy-leads" className="hover:text-white transition-colors">Verified Buy Leads</Link></li>
            </ul>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-700/50 px-2.5 py-1 rounded">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Trading Shield
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 ® Trusted Trading Platform # | Paikari Bazar Bangladesh</p>
          <p className="font-mono text-[11px]">Next.js Enterprise Marketplace Edition</p>
        </div>
      </div>
    </footer>
  );
};

