import type { Bag, BagId } from '../../data/types';

interface BagSelectorProps {
  value: BagId;
  bags: Bag[];
  onChange: (bagId: BagId) => void;
}

export function BagSelector({ value, bags, onChange }: BagSelectorProps) {
  const current = bags.find((b) => b.id === value);

  return (
    <label className="inline-flex items-center gap-1.5 text-sm">
      <span className="text-muted shrink-0">Packed in</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as BagId)}
        className="h-8 pl-2 pr-7 rounded-md bg-surface-soft border border-hairline text-ink text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ink appearance-none cursor-pointer"
        aria-label={`Packed in ${current?.name ?? 'bag'}`}
      >
        {bags.map((bag) => (
          <option key={bag.id} value={bag.id}>
            {bag.emoji} {bag.name}
          </option>
        ))}
      </select>
    </label>
  );
}
