import { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import type { Bag, BagId } from '../../data/types';
import type { ChecklistItemView } from '../../data/types';
import {
  closeSearch,
  searchOpen,
  searchQuery,
  toggleItemFromCard,
} from '../../stores/checklist-store';
import { SwipeableItemRow } from './SwipeableItemRow';

interface FloatingSearchProps {
  bags: Bag[];
  results: ChecklistItemView[];
  onAssignBag: (id: string, bagId: BagId) => void;
  onRemove?: (id: string) => void;
}

export function FloatingSearch({
  bags,
  results,
  onAssignBag,
  onRemove,
}: FloatingSearchProps) {
  const open = useStore(searchOpen);
  const query = useStore(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 top-0 bottom-(--bottom-nav-height) z-50 bg-canvas-pure no-print">
      <div className="mx-auto w-full max-w-lg h-full flex flex-col px-5">
        <div className="py-4 border-b border-hairline flex gap-2 items-center">
          <span aria-hidden="true">🔍</span>
          <input
            ref={inputRef}
            type="search"
            placeholder="Search your checklist"
            value={query}
            onChange={(event) => searchQuery.set(event.target.value)}
            className="field-input flex-1"
          />
          <button
            type="button"
            onClick={closeSearch}
            className="text-sm font-medium text-muted px-2 min-h-[44px]"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-2">
          {query.trim() && (
            <p className="text-sm text-muted mb-2">
              {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
          )}
          {query.trim() && results.length === 0 && (
            <p className="text-center text-muted py-8">No items found.</p>
          )}
          {results.map((item) => (
            <SwipeableItemRow
              key={item.id}
              item={item}
              bags={bags}
              onToggle={toggleItemFromCard}
              onAssignBag={onAssignBag}
              onRemove={onRemove}
              showBagInSearch
            />
          ))}
        </div>
      </div>
    </div>
  );
}
