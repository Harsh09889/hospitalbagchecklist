import type { Bag, BagId, BagVisualState } from '../../data/types';

const BAG_COLORS: Record<BagId, { light: string; dark: string; stroke: string }> = {
  labour: { light: '#f4907c', dark: '#e06b55', stroke: '#56190f' },
  mum: { light: '#f2a2b8', dark: '#d97a96', stroke: '#4a1020' },
  baby: { light: '#9ecbe8', dark: '#6baed4', stroke: '#10374c' },
  partner: { light: '#b9a8e8', dark: '#9580d4', stroke: '#2b1e52' },
};

interface HospitalBagIllustrationProps {
  bagId: BagId | 'all';
  bags: Bag[];
  visualState: BagVisualState;
  wiggle?: boolean;
  pulse?: boolean;
  className?: string;
}

function getActiveBag(bagId: BagId | 'all', bags: Bag[]): Bag {
  if (bagId === 'all') return bags[0];
  return bags.find((bag) => bag.id === bagId) ?? bags[0];
}

function getFillLevel(state: BagVisualState): number {
  switch (state) {
    case 'complete':
      return 1;
    case 'threeQuarter':
      return 0.75;
    case 'half':
      return 0.5;
    case 'quarter':
      return 0.25;
    default:
      return 0;
  }
}

export function HospitalBagIllustration({
  bagId,
  bags,
  visualState,
  wiggle = false,
  pulse = false,
  className = '',
}: HospitalBagIllustrationProps) {
  const bag = getActiveBag(bagId, bags);
  const colors = BAG_COLORS[bag.id];
  const fill = getFillLevel(visualState);
  const isComplete = visualState === 'complete';
  const uid = `bag-${bag.id}`;

  const animationClass = wiggle
    ? 'animate-bag-wiggle'
    : pulse
      ? 'animate-bag-pulse'
      : '';

  return (
    <svg
      viewBox="0 0 300 240"
      fill="none"
      role="img"
      aria-label={`${bag.name}, ${Math.round(fill * 100)}% ready`}
      className={`mx-auto w-48 sm:w-56 ${animationClass} ${className}`}
    >
      <defs>
        <linearGradient id={`${uid}-bag`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor={colors.light} />
          <stop offset="1" stopColor={colors.dark} />
        </linearGradient>
      </defs>

      <ellipse cx="150" cy="214" rx="112" ry="18" fill="#1c1b18" opacity="0.06" />

      {fill >= 0.75 && !isComplete && (
        <>
          <rect x="62" y="60" width="58" height="26" rx="13" fill="#f9b3a3" transform="rotate(-18 91 73)" opacity="0.9" />
          <rect x="180" y="52" width="64" height="26" rx="13" fill="#b9a8e8" transform="rotate(14 212 65)" opacity="0.9" />
          <rect x="126" y="34" width="52" height="24" rx="12" fill="#8fd3bd" />
        </>
      )}

      <path
        d="M110 106c0-16 12-28 28-28h24c16 0 28 12 28 28"
        stroke={colors.dark}
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />

      <path
        d="M64 128c0-13 11-23 24-23h124c13 0 24 10 24 23v44c0 22-18 40-40 40h-92c-22 0-40-18-40-40v-44Z"
        fill={`url(#${uid}-bag)`}
      />

      {fill >= 0.25 && (
        <rect
          x="88"
          y="146"
          width="34"
          height="42"
          rx="16"
          fill="#fffdf8"
          opacity={fill >= 0.5 ? 0.95 : 0.7}
          className="transition-opacity duration-500"
        />
      )}
      {fill >= 0.5 && (
        <rect x="132" y="146" width="34" height="42" rx="16" fill="#f7cf72" className="transition-opacity duration-500" />
      )}
      {fill >= 0.75 && (
        <rect x="176" y="146" width="34" height="42" rx="16" fill="#9ecbe8" className="transition-opacity duration-500" />
      )}

      <path
        d={isComplete ? 'M70 132h160' : 'M70 132h160'}
        stroke={colors.stroke}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={isComplete ? undefined : fill >= 0.75 ? '14 9' : undefined}
      />

      {isComplete && (
        <>
          <circle cx="238" cy="86" r="24" fill="#f7cf72" className="animate-sparkle" />
          <path
            d="m228 87 7 7 13-15"
            stroke="#473205"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}
