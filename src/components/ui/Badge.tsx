import type { ItemPriority } from '../../data/types';

interface BadgeProps {
  priority: ItemPriority;
}

const BADGE_CONFIG: Record<ItemPriority, { label: string; className: string }> = {
  essential: {
    label: 'Must-Have',
    className: 'bg-brand-coral/15 text-brand-coral',
  },
  recommended: {
    label: 'Recommended',
    className: 'bg-brand-ochre/20 text-body-strong',
  },
  optional: {
    label: 'Nice-to-Have',
    className: 'bg-surface-strong text-muted',
  },
  'hospital-provided': {
    label: 'Hospital Provides',
    className: 'bg-brand-mint/30 text-brand-teal dark:text-brand-mint',
  },
};

export function Badge({ priority }: BadgeProps) {
  const config = BADGE_CONFIG[priority];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
