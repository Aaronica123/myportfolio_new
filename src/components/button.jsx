import React from 'react';

export default function Button({
  variant = 'primary',
  size = 'md',
  children = 'Action Button',
  className = '',
  ...props
}) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-semibold',
    md: 'px-4 py-2 text-xs sm:text-sm font-semibold',
    lg: 'px-5 py-2.5 text-sm sm:text-base font-bold',
  }[size] || 'px-4 py-2 text-xs sm:text-sm font-semibold';

  const variantClasses = {
    primary:
      'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow transition-all',
    secondary:
      'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200',
    outline:
      'border border-indigo-300 text-indigo-700 hover:bg-indigo-50',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white',
    success:
      'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs',
  }[variant] || 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs';

  return (
    <button
      className={`rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
