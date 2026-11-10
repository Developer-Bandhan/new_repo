import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'ghost' | 'navy';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
    md: 'text-sm px-4 py-2 gap-2 h-10',
    lg: 'text-base px-6 py-3 gap-2.5 h-12 font-semibold',
  }[size];

  const variantStyles = {
    primary: 'bg-brand-orange text-white hover:bg-brand-orangeHover shadow-sm hover:shadow',
    secondary: 'bg-brand-blue text-white hover:bg-brand-blueHover shadow-sm hover:shadow',
    navy: 'bg-brand-navy text-white hover:bg-brand-darkNavy shadow-sm hover:shadow',
    outline: 'border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 shadow-sm',
    ghost: 'text-slate-700 hover:bg-slate-100',
    whatsapp: 'bg-brand-whatsapp text-white hover:bg-emerald-600 shadow-sm font-semibold tracking-wide',
  }[variant];

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles,
        variantStyles,
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
};

