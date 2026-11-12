'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatBDT, getWhatsAppInquiryUrl } from '@/lib/utils';
import { MapPin, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const whatsappUrl = getWhatsAppInquiryUrl(
    product.sellerWhatsapp,
    product.titleBn || product.title,
    product.locationBn || product.location
  );

  return (
    <div className="group bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Product Image */}
        <Link href={`/products/${product.id}`} className="block relative aspect-[4/3] bg-slate-100 overflow-hidden">
          <Image
            src={product.images[0] || 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=600&q=80'}
            alt={product.titleBn || product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.isFeatured && (
            <span className="absolute top-2 left-2 bg-brand-orange text-white text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded shadow">
              FEATURED
            </span>
          )}
        </Link>

        {/* Product Details */}
        <div className="p-3 md:p-3.5 flex flex-col gap-1.5">
          <Link href={`/products/${product.id}`} className="block">
            <h4 className="font-bengali font-bold text-slate-900 text-xs md:text-sm leading-snug line-clamp-2 hover:text-brand-blue transition-colors">
              {product.titleBn || product.title}
            </h4>
          </Link>

          {/* Pricing & Min Order */}
          <div className="flex items-baseline justify-between gap-1 pt-1">
            <span className="text-brand-navy font-extrabold text-sm md:text-base">
              {formatBDT(product.price)}
              <span className="text-[11px] font-normal text-slate-500 ml-1">/{product.unit}</span>
            </span>
            <span className="text-[10px] md:text-xs text-slate-500 font-bengali bg-slate-100 px-1.5 py-0.5 rounded">
              ন্যূনতম: {product.minimumOrderQuantity}
            </span>
          </div>

          {/* Location & Seller info */}
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-bengali pt-0.5">
            <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="truncate">{product.locationBn || product.location}</span>
          </div>
        </div>
      </div>

      {/* WhatsApp Action Button */}
      <div className="px-3 pb-3 pt-1">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full flex items-center justify-center gap-1.5 bg-[#25D366]/15 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/40 hover:border-transparent py-1.5 md:py-2 px-3 rounded-full font-medium text-xs md:text-sm transition-all duration-200 shadow-sm"
        >
          <WhatsAppIcon className="w-[18px] h-[18px] flex-shrink-0 text-[#25D366] group-hover:text-white transition-colors" />
          <span className="font-semibold lowercase tracking-wide">whatsapp</span>
        </a>
      </div>
    </div>
  );
};

