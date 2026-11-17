'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, LayoutDashboard, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/lib/auth';

/** Desktop header account menu. */
export const AccountButton: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold font-bengali transition-colors"
      >
        <User className="w-[18px] h-[18px]" />
        লগইন
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative font-bengali">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Account"
        className="w-9 h-9 rounded-full bg-brand-navy text-white font-bold text-sm flex items-center justify-center"
      >
        {user.name.charAt(0).toUpperCase()}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50">
          <div className="px-4 py-2 border-b border-slate-100">
            <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
            <p className="text-xs text-slate-500 truncate font-sans" translate="no">{user.phone}</p>
          </div>
          {user.role === 'seller' && (
            <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
              <LayoutDashboard className="w-4 h-4" /> সেলার ড্যাশবোর্ড
            </Link>
          )}
          <button
            onClick={() => {
              logout();
              setOpen(false);
              router.push('/');
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-slate-50"
          >
            <LogOut className="w-4 h-4" /> লগআউট
          </button>
        </div>
      )}
    </div>
  );
};

/** Mobile drawer account block. */
export const DrawerAccount: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="grid grid-cols-2 gap-2 font-bengali">
        <Link href="/login" onClick={onNavigate} className="h-11 rounded-xl bg-brand-navy text-white text-sm font-bold flex items-center justify-center gap-1.5">
          <LogIn className="w-4 h-4" /> লগইন
        </Link>
        <Link href="/register" onClick={onNavigate} className="h-11 rounded-xl border border-slate-300 text-slate-700 text-sm font-bold flex items-center justify-center gap-1.5">
          <UserPlus className="w-4 h-4" /> রেজিস্টার
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-slate-50 p-3 font-bengali">
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-full bg-brand-navy text-white font-bold flex items-center justify-center">
          {user.name.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
          <p className="text-xs text-slate-500">{user.role === 'seller' ? 'বিক্রেতা' : 'ক্রেতা'}</p>
        </div>
        <button onClick={() => { logout(); onNavigate(); }} aria-label="লগআউট" className="w-9 h-9 rounded-lg text-red-600 flex items-center justify-center">
          <LogOut className="w-4 h-4" />
        </button>
      </div>
      {user.role === 'seller' && (
        <Link href="/dashboard" onClick={onNavigate} className="mt-3 h-10 rounded-lg bg-white border border-slate-200 text-sm font-bold text-brand-navy flex items-center justify-center gap-1.5">
          <LayoutDashboard className="w-4 h-4" /> সেলার ড্যাশবোর্ড
        </Link>
      )}
    </div>
  );
};
