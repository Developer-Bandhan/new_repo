'use client';

import React from 'react';
import { TickerRate } from '@/types';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

interface PriceTickerProps {
  rates: TickerRate[];
}

export const PriceTicker: React.FC<PriceTickerProps> = ({ rates }) => {
  const activeRates = rates.filter((r) => r.active);
  // Duplicate for seamless infinite marquee loop
  const displayRates = [...activeRates, ...activeRates];

  return (
    <div className="bg-[#071B30] text-slate-200 border-b border-white/10 text-xs py-1.5 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        {/* Ticker Lead Tag */}
        <div className="flex items-center gap-1.5 bg-brand-orange text-white text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm mr-3 flex-shrink-0 shadow-sm z-10">
          <TrendingUp className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">LIVE RATES:</span>
          <span className="sm:hidden">RATES:</span>
        </div>

        {/* Scrolling Ticker Line */}
        <div className="relative w-full overflow-hidden whitespace-nowrap">
          <div className="inline-flex animate-marquee hover:[animation-play-state:paused] gap-8 items-center">
            {displayRates.map((rate, idx) => (
              <div key={`${rate.id}-${idx}`} className="inline-flex items-center gap-2 font-mono text-xs">
                <span className="font-semibold text-white tracking-wide">{rate.name}:</span>
                <span className="text-amber-400 font-bold">
                  {rate.price} {rate.unit}
                </span>
                {rate.trend === 'up' && (
                  <span className="text-emerald-400 inline-flex items-center text-[10px] font-semibold">
                    <ArrowUpRight className="w-3 h-3" />+{rate.changePercent}%
                  </span>
                )}
                {rate.trend === 'down' && (
                  <span className="text-red-400 inline-flex items-center text-[10px] font-semibold">
                    <ArrowDownRight className="w-3 h-3" />
                    {rate.changePercent}%
                  </span>
                )}
                <span className="text-slate-600 font-sans mx-1">|</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

