/**
 * Named accents keep the pastel palette rotating predictably across sections
 * so no two adjacent cards land on the same colour.
 */

export type AccentName = 'mint' | 'sky' | 'coral' | 'butter' | 'lavender' | 'sage';

export interface Accent {
  /** Full-saturation fill for feature cards. */
  fill: string;
  /** Text colour that clears 4.5:1 on `fill`. */
  onFill: string;
  /** Tinted wash for soft cards and icon chips. */
  wash: string;
  /** Small solid element, e.g. a bullet or badge dot. */
  dot: string;
  /** Border tint for outlined cards. */
  border: string;
}

export const ACCENTS: Record<AccentName, Accent> = {
  mint: {
    fill: 'bg-brand-mint',
    onFill: 'text-on-mint',
    wash: 'bg-brand-mint/20',
    dot: 'bg-brand-mint',
    border: 'border-brand-mint/45',
  },
  sky: {
    fill: 'bg-brand-sky',
    onFill: 'text-on-sky',
    wash: 'bg-brand-sky/20',
    dot: 'bg-brand-sky',
    border: 'border-brand-sky/45',
  },
  coral: {
    fill: 'bg-brand-coral',
    onFill: 'text-on-coral',
    wash: 'bg-brand-coral/20',
    dot: 'bg-brand-coral',
    border: 'border-brand-coral/45',
  },
  butter: {
    fill: 'bg-brand-butter',
    onFill: 'text-on-butter',
    wash: 'bg-brand-butter/25',
    dot: 'bg-brand-butter',
    border: 'border-brand-butter/50',
  },
  lavender: {
    fill: 'bg-brand-lavender',
    onFill: 'text-on-lavender',
    wash: 'bg-brand-lavender/20',
    dot: 'bg-brand-lavender',
    border: 'border-brand-lavender/45',
  },
  sage: {
    fill: 'bg-brand-sage',
    onFill: 'text-on-sage',
    wash: 'bg-brand-sage/25',
    dot: 'bg-brand-sage',
    border: 'border-brand-sage/50',
  },
};

export const ACCENT_CYCLE: AccentName[] = ['mint', 'coral', 'sky', 'butter', 'lavender', 'sage'];

export function accentAt(index: number): Accent {
  return ACCENTS[ACCENT_CYCLE[index % ACCENT_CYCLE.length]!]!;
}
