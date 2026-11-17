import React from 'react';

export const inputCls =
  'w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-base sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue';

interface FieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Field: React.FC<FieldProps> = ({ label, required, children, className }) => (
  <div className={className}>
    <label className="block text-xs font-semibold text-slate-700 mb-1 font-bengali">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    {children}
  </div>
);
