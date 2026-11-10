import React from 'react';
import { notFound } from 'next/navigation';
import { mockSellers, mockProducts } from '@/data/mockData';
import { SellerProfileHeader } from '@/components/seller/SellerProfileHeader';
import { SellerProductGrid } from '@/components/seller/SellerProductGrid';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface SellerPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return mockSellers.map((seller) => ({
    id: seller.id,
  }));
}

export default function SellerPage({ params }: SellerPageProps) {
  const seller = mockSellers.find((s) => s.id === params.id) || mockSellers[0];
  if (!seller) notFound();

  // Find products belonging to this seller or show all if default demo
  const sellerProducts = mockProducts.filter((p) => p.sellerId === seller.id);
  const displayProducts = sellerProducts.length > 0 ? sellerProducts : mockProducts;

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-bengali mb-4 sm:mb-6">
          <Link href="/" className="hover:text-brand-navy flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>হোম</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span>ভেরিফাইড সেলার</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-semibold">{seller.businessNameBn}</span>
        </nav>

        {/* 1. Seller Profile Header Card (Matches Image 1) */}
        <SellerProfileHeader seller={seller} />

        {/* 2. Available Inventory / Product Showcase (Matches Image 1) */}
        <SellerProductGrid products={displayProducts} />

      </div>
    </div>
  );
}

