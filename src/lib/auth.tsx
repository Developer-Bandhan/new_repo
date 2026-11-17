'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api, refreshSession, setAccessToken, setRefreshListener } from '@/lib/api';

export type Role = 'buyer' | 'seller';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface AuthUser {
  id: string;
  name: string;
  /** E.164 WhatsApp number, used for OTP login */
  phone: string;
  email?: string | null;
  role: Role | 'admin';
  country: string;
  /** Seller only: shop goes live after admin approval */
  shopId?: string;
  shopStatus?: ApprovalStatus | 'suspended';
  /** Seller only: NID / trade licence review */
  verification?: 'none' | ApprovalStatus;
}

export interface RegisterInput {
  phone: string;
  otp: string;
  name: string;
  role: Role;
  country: string;
  email?: string;
  shopName?: string;
}

interface Session {
  user: AuthUser;
  accessToken: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  ready: boolean;
  /** Sends a code to the WhatsApp number. Returns seconds until a resend is allowed. */
  requestOtp: (phone: string, purpose: 'login' | 'register') => Promise<{ resendIn: number; expiresIn: number }>;
  login: (phone: string, otp: string) => Promise<AuthUser>;
  register: (data: RegisterInput) => Promise<AuthUser>;
  /** Re-reads the user (e.g. after shop / verification changes). */
  reload: () => Promise<void>;
  /** Local-only patch, for screens not yet wired to the API. */
  updateUser: (patch: Partial<AuthUser>) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  const applySession = useCallback((s: Session) => {
    setAccessToken(s.accessToken);
    setUser(s.user);
    return s.user;
  }, []);

  // Restore the session from the httpOnly refresh cookie on page load
  useEffect(() => {
    setRefreshListener((data) => setUser((data as Session).user));
    refreshSession().finally(() => setReady(true));
    return () => setRefreshListener(null);
  }, []);

  const requestOtp: AuthContextValue['requestOtp'] = (phone, purpose) =>
    api('/auth/otp/request', { method: 'POST', body: { phone, purpose } });

  const login: AuthContextValue['login'] = async (phone, otp) =>
    applySession(await api<Session>('/auth/login', { method: 'POST', body: { phone, otp } }));

  const register: AuthContextValue['register'] = async (data) =>
    applySession(await api<Session>('/auth/register', { method: 'POST', body: data }));

  const reload = async () => {
    try {
      setUser(await api<AuthUser>('/auth/me'));
    } catch {
      /* keep current user */
    }
  };

  const updateUser = (patch: Partial<AuthUser>) => setUser((u) => (u ? { ...u, ...patch } : u));

  const logout = async () => {
    try {
      await api('/auth/logout', { method: 'POST' });
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, ready, requestOtp, login, register, reload, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
