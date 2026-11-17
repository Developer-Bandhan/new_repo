'use client';

import { useCallback, useEffect, useState } from 'react';

// TODO(backend): sync wishlist to the user's account via API.
const KEY = 'pb_wishlist';
const EVENT = 'paikari:wishlist';

const read = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
};

export function useWishlist(productId: string) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sync = () => setSaved(read().includes(productId));
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, [productId]);

  const toggle = useCallback(() => {
    const list = read();
    const next = list.includes(productId) ? list.filter((id) => id !== productId) : [...list, productId];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  }, [productId]);

  return { saved, toggle };
}

/** Native share sheet on mobile; falls back to copying the link. Returns 'copied' when copied. */
export async function shareLink(title: string, url: string): Promise<'shared' | 'copied' | 'failed'> {
  try {
    if (navigator.share) {
      await navigator.share({ title, url });
      return 'shared';
    }
    await navigator.clipboard.writeText(url);
    return 'copied';
  } catch {
    return 'failed';
  }
}
