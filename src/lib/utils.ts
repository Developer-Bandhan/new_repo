import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines Tailwind class names cleanly without duplicate conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format currency in Bangladeshi Taka (BDT).
 */
export function formatBDT(amount: number): string {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0,
  }).format(amount).replace('BDT', '৳');
}

/**
 * Convert standard ASCII numbers to Bengali numerical digits.
 */
export function toBengaliNumber(num: number | string): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, (d) => bengaliDigits[parseInt(d, 10)]);
}

/**
 * Normalises a phone number to digits-only international format (no '+').
 * - "+968 9900 0003" / "00968..." -> "96899000003"
 * - "8801711223344"               -> unchanged
 * - "01711223344" (no prefix)     -> assumed Bangladesh -> "8801711223344"
 */
export function normalizePhone(input: string): string {
  const raw = input.trim();
  const digits = raw.replace(/\D/g, '');
  if (raw.startsWith('+')) return digits;
  if (raw.startsWith('00')) return digits.slice(2);
  if (digits.startsWith('880')) return digits;
  return `880${digits.replace(/^0/, '')}`;
}

/** tel: link that works for any country. */
export function getTelUrl(phoneNumber: string): string {
  return `tel:+${normalizePhone(phoneNumber)}`;
}

/**
 * Generates direct WhatsApp chat URL with pre-filled inquiry text.
 */
export function getWhatsAppInquiryUrl(phoneNumber: string, productTitle: string, location?: string): string {
  const message = `Hello, I saw your listing "${productTitle}" on Paikari Bazar${location ? ` (${location})` : ''}. I am interested in wholesale procurement. Please share more details.`;
  return `https://wa.me/${normalizePhone(phoneNumber)}?text=${encodeURIComponent(message)}`;
}

/** WhatsApp link for a buyer's demand (seller contacting the buyer). */
export function getWhatsAppLeadUrl(phoneNumber: string, leadTitle: string): string {
  const message = `Hello, I saw your requirement "${leadTitle}" on Paikari Bazar. I can supply this. Please share details.`;
  return `https://wa.me/${normalizePhone(phoneNumber)}?text=${encodeURIComponent(message)}`;
}
