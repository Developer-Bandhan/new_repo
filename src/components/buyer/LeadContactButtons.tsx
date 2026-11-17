import React from 'react';
import { PhoneCall } from 'lucide-react';
import { BuyLead } from '@/types';
import { getTelUrl, getWhatsAppLeadUrl } from '@/lib/utils';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

interface LeadContactButtonsProps {
  lead: BuyLead;
  className?: string;
  /** Icon-only round buttons (for compact lists) */
  compact?: boolean;
}

/** WhatsApp + Call buttons for a buyer's demand. */
export const LeadContactButtons: React.FC<LeadContactButtonsProps> = ({ lead, className = '', compact = false }) => {
  const waUrl = getWhatsAppLeadUrl(lead.buyerWhatsapp || lead.buyerPhone, lead.titleBn);
  const telUrl = getTelUrl(lead.buyerPhone);

  if (compact) {
    return (
      <div className={`flex items-center gap-2 flex-shrink-0 ${className}`}>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="হোয়াটসঅ্যাপ"
          className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center active:scale-95 transition"
        >
          <WhatsAppIcon className="w-5 h-5" />
        </a>
        <a
          href={telUrl}
          aria-label="কল করুন"
          className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center active:scale-95 transition"
        >
          <PhoneCall className="w-[18px] h-[18px]" />
        </a>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-lg bg-[#25D366] hover:bg-[#1fbd5b] text-white text-xs font-bold shadow-sm active:scale-[0.98] transition"
      >
        <WhatsAppIcon className="w-4 h-4" />
        <span className="font-bengali">হোয়াটসঅ্যাপ</span>
      </a>
      <a
        href={telUrl}
        className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-lg bg-brand-navy hover:bg-brand-darkNavy text-white text-xs font-bold shadow-sm active:scale-[0.98] transition"
      >
        <PhoneCall className="w-4 h-4" />
        <span className="font-bengali">কল করুন</span>
      </a>
    </div>
  );
};
