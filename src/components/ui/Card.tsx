import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  color?: 'cream' | 'pink' | 'teal' | 'lavender' | 'peach' | 'ochre' | 'mint';
}

const colorClasses = {
  cream: 'bg-surface-card text-ink border border-hairline',
  pink: 'bg-brand-pink text-on-primary',
  teal: 'bg-brand-teal text-on-dark',
  lavender: 'bg-brand-lavender text-ink',
  peach: 'bg-brand-peach text-ink',
  ochre: 'bg-brand-ochre text-ink',
  mint: 'bg-brand-mint text-ink',
};

export function Card({ children, className = '', color = 'cream' }: CardProps) {
  return (
    <div className={`rounded-xl p-5 sm:p-6 ${colorClasses[color]} ${className}`}>
      {children}
    </div>
  );
}
