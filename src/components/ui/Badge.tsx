import React from 'react';
import { cn } from '@/lib/utils';
import { ShieldCheck, CheckCircle2, Star, Shield } from 'lucide-react';

interface BadgeProps {
  variant?: 'nid' | 'trusted' | 'category' | 'trend-up' | 'trend-down' | 'active' | 'warning';
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'category',
  children,
  className,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs md:text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-sm md:text-base px-3 py-1.5 gap-2',
  }[size];

  const variantClasses = {
    nid: 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold',
    trusted: 'bg-blue-50 text-brand-blue border border-blue-200 font-medium',
    category: 'bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors',
    'trend-up': 'bg-emerald-50 text-emerald-700 font-semibold',
    'trend-down': 'bg-red-50 text-red-600 font-semibold',
    active: 'bg-green-100 text-green-800 font-medium',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
  }[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-bengali transition-all duration-200 shadow-sm',
        sizeClasses,
        variantClasses,
        className
      )}
    >
      {variant === 'nid' && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
      {variant === 'trusted' && <Shield className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />}
      {children}
    </span>
  );
};

export const NidVerifiedApprovedBadge: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 bg-[#2E7D32]/10 border border-[#2E7D32]/40 rounded-xl px-3.5 py-1.5 shadow-sm text-left',
        className
      )}
    >
      <div className="w-6 h-6 rounded-full bg-[#2E7D32] flex items-center justify-center text-white flex-shrink-0 shadow">
        <CheckCircle2 className="w-4 h-4 stroke-[3]" />
      </div>
      <div className="flex flex-col">
        <span className="text-[#1B5E20] font-bold text-xs md:text-sm tracking-tight leading-tight">
          NID Verified & Paikari Bazar Approved
        </span>
        <span className="text-[#2E7D32] font-bengali text-[11px] md:text-xs leading-tight">
          এনআইডি ভেরিফাইড এবং পাইকারি বাজার অনুমোদিত
        </span>
      </div>
    </div>
  );
};

