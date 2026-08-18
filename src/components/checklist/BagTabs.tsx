import type { Bag, BagId } from '../../data/types';

interface BagTabsProps {
  bags: Bag[];
  active: BagId | 'all';
  onChange: (bagId: BagId | 'all') => void;
  counts: Record<string, number>;
}

export function BagTabs({ bags, active, onChange, counts }: BagTabsProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide"
      role="tablist"
      aria-label="Filter by bag"
    >
      <button
        role="tab"
        aria-selected={active === 'all'}
        onClick={() => onChange('all')}
        className={`category-tab ${active === 'all' ? 'category-tab-active' : ''}`}
      >
        All ({counts.all ?? 0})
      </button>
      {bags.map((bag) => (
        <button
          key={bag.id}
          role="tab"
          aria-selected={active === bag.id}
          onClick={() => onChange(bag.id)}
          className={`category-tab ${active === bag.id ? 'category-tab-active' : ''}`}
        >
          {bag.emoji} {bag.name} ({counts[bag.id] ?? 0})
        </button>
      ))}
    </div>
  );
}
