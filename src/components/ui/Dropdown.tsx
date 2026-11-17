'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  sub?: string;
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  /** Icon shown at the left of the trigger */
  icon?: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  openTriggerClassName?: string;
}

/**
 * Custom select: smooth open/close animation, keyboard support
 * (arrows / Enter / Esc), closes on outside click.
 */
export const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
  icon,
  className = '',
  triggerClassName = '',
  openTriggerClassName = '',
}) => {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedIdx = Math.max(0, options.findIndex((o) => o.value === value));
  const selected = options[selectedIdx];

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, [open]);

  // Start keyboard focus on the selected option; keep it scrolled into view
  useEffect(() => {
    if (open) setActiveIdx(selectedIdx);
  }, [open, selectedIdx]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.children[activeIdx] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx, open]);

  const choose = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      else setActiveIdx((i) => (i + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) setOpen(true);
      else setActiveIdx((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === 'Enter' && open) {
      e.preventDefault();
      choose(options[activeIdx].value);
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`} onKeyDown={onKeyDown}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`relative w-full flex items-center text-left focus:outline-none transition-all ${triggerClassName} ${
          open ? openTriggerClassName : ''
        }`}
      >
        {icon && (
          <span
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
              open ? 'text-brand-orange' : 'text-slate-400'
            }`}
          >
            {icon}
          </span>
        )}
        <span className="truncate">
          {selected?.label}
          {selected?.sub && <span className="ml-1.5 text-[13px] text-slate-400">({selected.sub})</span>}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-300 ease-out ${
            open ? 'rotate-180 text-brand-orange' : ''
          }`}
        />
      </button>

      <div
        ref={listRef}
        role="listbox"
        aria-hidden={!open}
        className={`absolute z-30 left-0 right-0 top-full mt-2 origin-top rounded-2xl bg-white border border-slate-200/80 p-1.5 max-h-72 overflow-y-auto shadow-[0_24px_48px_-16px_rgba(11,37,71,0.3)] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? 'opacity-100 translate-y-0 scale-100 visible'
            : 'opacity-0 -translate-y-2 scale-[0.97] invisible pointer-events-none'
        }`}
      >
        {options.map((opt, i) => {
          const isSelected = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={isSelected}
              tabIndex={-1}
              onMouseEnter={() => setActiveIdx(i)}
              onClick={() => choose(opt.value)}
              className={`w-full flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-[15px] font-bengali transition-colors ${
                isSelected
                  ? 'bg-orange-50 text-brand-orange font-semibold'
                  : i === activeIdx
                  ? 'bg-slate-50 text-slate-900'
                  : 'text-slate-700'
              }`}
            >
              <span className="truncate">
                {opt.label}
                {opt.sub && (
                  <span className={`ml-1.5 text-[13px] font-normal ${isSelected ? 'text-orange-300' : 'text-slate-400'}`}>
                    {opt.sub}
                  </span>
                )}
              </span>
              {isSelected && <Check className="w-4 h-4 flex-shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
