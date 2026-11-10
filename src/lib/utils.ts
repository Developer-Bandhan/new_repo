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
 * Generates direct WhatsApp chat URL with pre-filled inquiry text.
 */
export function getWhatsAppInquiryUrl(phoneNumber: string, productTitle: string, location?: string): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const formattedPhone = cleanPhone.startsWith('880') ? cleanPhone : `880${cleanPhone.replace(/^0/, '')}`;
  const message = `Hello, I saw your listing "${productTitle}" on Paikari Bazar${location ? ` (${location})` : ''}. I am interested in wholesale procurement. Please share more details.`;
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
}

