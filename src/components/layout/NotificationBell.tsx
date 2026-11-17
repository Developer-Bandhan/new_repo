'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Bell, ClipboardList, Tag, Sparkles } from 'lucide-react';
import { mockNotifications } from '@/data/mockData';
import { AppNotification } from '@/types';

const ICONS = { lead: ClipboardList, offer: Tag, system: Sparkles };

interface NotificationBellProps {
  tone?: 'dark' | 'light';
}

// UI-only for now: reads mock data. Real in-app + push (OneSignal/FCM) needs the backend.
export const NotificationBell: React.FC<NotificationBellProps> = ({ tone = 'light' }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<AppNotification[]>(mockNotifications);
  const ref = useRef<HTMLDivElement>(null);

  const unread = items.filter((n) => !n.read).length;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, [open]);

  const markAllRead = () => setItems(items.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => {
    setItems(items.map((n) => (n.id === id ? { ...n, read: true } : n)));
    setOpen(false);
  };

  const btn =
    tone === 'dark'
      ? 'bg-white/10 hover:bg-white/20 text-white'
      : 'bg-slate-100 hover:bg-slate-200 text-slate-700';

  return (
    <div ref={ref} className="lg:relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label={`Notifications${unread ? ` (${unread} new)` : ''}`}
        aria-expanded={open}
        className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${btn}`}
      >
        <Bell className="w-[18px] h-[18px]" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-[10px] font-bold leading-[18px] text-center ring-2 ring-white lg:ring-white">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-x-3 top-16 lg:absolute lg:inset-x-auto lg:right-0 lg:top-full lg:mt-2 lg:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-brand-navy font-bengali">নোটিফিকেশন</h3>
            {unread > 0 && (
              <button onClick={markAllRead} className="text-xs font-semibold text-brand-blue font-bengali">
                সব পড়া হয়েছে
              </button>
            )}
          </div>

          <ul className="max-h-[60vh] overflow-y-auto divide-y divide-slate-100">
            {items.map((n) => {
              const Icon = ICONS[n.type];
              return (
                <li key={n.id}>
                  <Link
                    href={n.href}
                    onClick={() => markRead(n.id)}
                    className={`flex gap-3 px-4 py-3 hover:bg-slate-50 transition-colors ${
                      n.read ? '' : 'bg-orange-50/60'
                    }`}
                  >
                    <span className="w-9 h-9 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="min-w-0 flex-1 font-bengali">
                      <span className="block text-[13px] font-bold text-slate-900 leading-snug">{n.titleBn}</span>
                      <span className="block text-xs text-slate-600 leading-snug mt-0.5">{n.bodyBn}</span>
                      <span className="block text-[11px] text-slate-400 mt-1">{n.timeAgoBn}</span>
                    </span>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-brand-orange mt-1.5 flex-shrink-0" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
