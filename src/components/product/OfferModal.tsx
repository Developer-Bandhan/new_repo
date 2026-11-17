'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Field, inputCls } from '@/components/ui/Field';
import { PhoneInput, emptyPhone, toE164 } from '@/components/ui/PhoneInput';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  listedPrice: string;
  unitLabel: string;
}

export const OfferModal: React.FC<OfferModalProps> = ({ isOpen, onClose, productTitle, listedPrice, unitLabel }) => {
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState(emptyPhone());
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toE164(phone)) {
      setError('কান্ট্রি কোড সহ মোবাইল নম্বর দিন।');
      return;
    }
    setError('');
    // TODO(backend): send the offer to the seller. Currently UI-only.
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setPhone(emptyPhone());
    }, 1800);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="আপনার রেট জানান" description={`পণ্য: ${productTitle}`}>
      {submitted ? (
        <div className="py-6 text-center space-y-2 font-bengali">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <p className="text-base font-bold text-slate-800">আপনার প্রস্তাব পাঠানো হয়েছে!</p>
          <p className="text-xs text-slate-500">বিক্রেতা আপনার সাথে যোগাযোগ করবেন।</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 font-bengali">
          <p className="text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-2">
            বিক্রেতার রেট: <strong className="text-slate-800">{listedPrice} / {unitLabel}</strong>
          </p>

          <div className="grid grid-cols-2 gap-3">
            <Field label={`আপনার রেট (প্রতি ${unitLabel})`} required>
              <input required inputMode="decimal" placeholder="যেমন: ১৩০" className={`${inputCls} font-sans`} />
            </Field>
            <Field label="কত পরিমাণ লাগবে" required>
              <input required placeholder="যেমন: ২ টন" className={inputCls} />
            </Field>
          </div>

          <Field label="আপনার নাম" required>
            <input required placeholder="আপনার পূর্ণ নাম" className={inputCls} />
          </Field>

          <Field label="মোবাইল নম্বর (কান্ট্রি কোড সহ)" required>
            <PhoneInput value={phone} onChange={setPhone} />
          </Field>

          <Field label="বার্তা (ঐচ্ছিক)">
            <textarea rows={2} placeholder="ডেলিভারি বা পেমেন্ট সম্পর্কে কিছু বলতে চাইলে..." className={inputCls} />
          </Field>

          {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}

          <Button type="submit" variant="primary" fullWidth size="lg" className="font-bengali font-bold">
            প্রস্তাব পাঠান
          </Button>
        </form>
      )}
    </Modal>
  );
};
