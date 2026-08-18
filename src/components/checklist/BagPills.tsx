import type { Bag, BagId } from '../../data/types';

const BAG_COLOR_CLASSES: Record<BagId, string> = {
  labour: 'bg-brand-coral text-on-coral',
  mum: 'bg-brand-pink text-on-primary',
  baby: 'bg-brand-sky text-on-sky',
  partner: 'bg-brand-lavender text-on-lavender',
};

interface BagPillsProps {
  bags: Bag[];
  active: BagId | 'all';
  onChange: (bagId: BagId | 'all') => void;
}

export function BagPills({ bags, active, onChange }: BagPillsProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-muted uppercase tracking-wide">Your bags</h2>
      <div
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
        role="tablist"
        aria-label="Select bag"
      >
        <button
          type="button"
          role="tab"
          aria-selected={active === 'all'}
          onClick={() => onChange('all')}
          className={`category-tab ${active === 'all' ? 'category-tab-active' : ''}`}
        >
          All
        </button>
        {bags.map((bag) => (
          <button
            key={bag.id}
            type="button"
            role="tab"
            aria-selected={active === bag.id}
            onClick={() => onChange(bag.id)}
            className={`category-tab ${
              active === bag.id ? BAG_COLOR_CLASSES[bag.id] : ''
            }`}
          >
            {bag.emoji} {bag.name.replace("'s Bag", '').replace(' Bag', '')}
          </button>
        ))}
      </div>
    </div>
  );
}
