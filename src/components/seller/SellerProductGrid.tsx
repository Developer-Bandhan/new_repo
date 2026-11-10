'use client';

import React from 'react';
import { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { Boxes } from 'lucide-react';

interface SellerProductGridProps {
  products: Product[];
}

export const SellerProductGrid: React.FC<SellerProductGridProps> = ({ products }) => {
  return (
    <div className="space-y-6">
      {/* Section Header (Matches Image 1 Title) */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Boxes className="w-5 h-5 text-brand-navy" />
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-bengali text-brand-navy tracking-tight">
            Available Inventory / Product Showcase
          </h2>
        </div>
        <span className="text-xs md:text-sm font-semibold font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {products.length} Items Listed
        </span>
      </div>

      {/* 2-Column Responsive Grid on Mobile, expanding gracefully to 3-4 cols on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

