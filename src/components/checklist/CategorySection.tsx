import { useEffect, useState } from 'react';
import type { Bag, BagId, Category, ChecklistItemView } from '../../data/types';
import { SwipeableItemRow } from './SwipeableItemRow';

const SHORT_NAMES: Record<string, string> = {
  documents: 'Important documents',
  labor: 'Labor comfort',
  postpartum: "Mum's recovery",
  newborn: 'Newborn essentials',
  partner: 'Partner bag',
  tech: 'Tech & snacks',
};

interface CategorySectionProps {
  category: Category;
  items: ChecklistItemView[];
  bags: Bag[];
  onToggle: (id: string, sourceRect?: DOMRect) => void;
  onAssignBag: (id: string, bagId: BagId) => void;
  onRemove?: (id: string) => void;
  defaultOpen?: boolean;
  showBagInSearch?: boolean;
  sectionRef?: (el: HTMLElement | null) => void;
  pulseId?: string | null;
}

export function CategorySection({
  category,
  items,
  bags,
  onToggle,
  onAssignBag,
  onRemove,
  defaultOpen = false,
  showBagInSearch = false,
  sectionRef,
  pulseId,
}: CategorySectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [justCompleted, setJustCompleted] = useState(false);

  const readyCount = items.filter((i) => i.checked).length;
  const percent = items.length === 0 ? 0 : Math.round((readyCount / items.length) * 100);
  const shortName = SHORT_NAMES[category.id] ?? category.name;
  const allReady = items.length > 0 && readyCount === items.length;

  useEffect(() => {
    if (allReady && open) {
      setJustCompleted(true);
      const timer = window.setTimeout(() => setJustCompleted(false), 800);
      return () => window.clearTimeout(timer);
    }
  }, [allReady, open]);

  if (items.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className={`rounded-xl border border-hairline bg-canvas-pure overflow-hidden print-section ${
        justCompleted ? 'animate-section-complete' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink hover:bg-surface-soft/50"
        aria-expanded={open}
        aria-label={`${category.name}, ${readyCount} of ${items.length} ready`}
      >
        <span className="text-xl shrink-0" aria-hidden="true">{category.emoji}</span>
        <div className="flex-1 min-w-0 space-y-1.5">
          <h3 className="font-semibold text-base text-ink truncate">{shortName}</h3>
          <p className="text-sm text-muted">{readyCount} / {items.length} ready</p>
          <div className="h-1.5 bg-surface-card rounded-full overflow-hidden">
            <div
              className="h-full bg-success rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
        <span className="text-muted shrink-0 text-sm" aria-hidden="true">
          {open ? '˅' : '›'}
        </span>
      </button>

      {open && (
        <div className="px-3 pb-3 space-y-2 border-t border-hairline-soft pt-3">
          {allReady && (
            <p className="text-sm font-medium text-success text-center py-1">All packed!</p>
          )}
          {items.map((item) => (
            <SwipeableItemRow
              key={item.id}
              item={item}
              bags={bags}
              onToggle={onToggle}
              onAssignBag={onAssignBag}
              onRemove={onRemove}
              showBagInSearch={showBagInSearch}
              pulseId={pulseId}
            />
          ))}
        </div>
      )}
    </section>
  );
}
