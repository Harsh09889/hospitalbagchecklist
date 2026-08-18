import { forwardRef, type ReactNode } from 'react';
import type { BagId } from '../../data/types';
import { useStore } from '@nanostores/react';
import { bagPulse, bagWiggle } from '../../stores/checklist-store';

const RING_COLORS: Record<BagId, { stroke: string; pill: string }> = {
  labour: { stroke: '#f4907c', pill: 'bg-brand-coral text-on-coral' },
  mum: { stroke: '#f2a2b8', pill: 'bg-brand-pink text-on-primary' },
  baby: { stroke: '#9ecbe8', pill: 'bg-brand-sky text-on-sky' },
  partner: { stroke: '#b9a8e8', pill: 'bg-brand-lavender text-on-lavender' },
};

interface CircularProgressRingProps {
  percent: number;
  ready: number;
  total: number;
  activeBag: BagId | 'all';
  children?: ReactNode;
}

export const CircularProgressRing = forwardRef<HTMLDivElement, CircularProgressRingProps>(
  function CircularProgressRing({ percent, ready, total, activeBag, children }, ref) {
    const wiggle = useStore(bagWiggle);
    const pulse = useStore(bagPulse);
    const bagKey = activeBag === 'all' ? 'labour' : activeBag;
    const colors = RING_COLORS[bagKey];

    const size = 220;
    const strokeWidth = 14;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    const animationClass = wiggle
      ? 'animate-ring-bounce'
      : pulse
        ? 'animate-bag-pulse'
        : '';

    return (
      <div
        ref={ref}
        id="bag-hero-target"
        className={`relative mx-auto will-change-transform ${animationClass}`}
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          className="absolute inset-0 -rotate-90"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${percent}% ready, ${ready} of ${total} packed`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-surface-card)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-500"
            style={{ transitionTimingFunction: 'var(--ease-clay)' }}
          />
        </svg>

        <span className="absolute top-3 right-6 text-brand-butter text-sm animate-sparkle" aria-hidden="true">✦</span>
        <span className="absolute top-8 left-4 text-brand-mint text-xs animate-sparkle" aria-hidden="true">✦</span>
        <span className="absolute bottom-12 right-4 text-brand-sage text-xs animate-sparkle" aria-hidden="true">✦</span>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {children}
          <p className="text-xs text-muted mt-1">You&apos;ve packed</p>
          <p className="text-4xl font-display font-semibold text-ink leading-none">{ready}</p>
          <p className="text-sm text-muted">of {total}</p>
          <span className={`mt-2 px-3 py-0.5 rounded-full text-xs font-semibold ${colors.pill}`}>
            {percent}% ready
          </span>
        </div>
      </div>
    );
  },
);
