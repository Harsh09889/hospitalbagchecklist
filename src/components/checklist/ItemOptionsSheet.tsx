import { useState } from 'react';
import type { Bag, ChecklistItemView } from '../../data/types';
import { isCustomItem } from '../../data/types';
import { isActionItem } from '../../data/engine';
import {
  assignBag,
  removeCustomItem,
  toggleItemWithFeedback,
} from '../../stores/checklist-store';
import { ItemDetailsSheet } from './ItemDetailsSheet';

interface ItemOptionsSheetProps {
  item: ChecklistItemView | null;
  bags: Bag[];
  open: boolean;
  onClose: () => void;
}

export function ItemOptionsSheet({ item, bags, open, onClose }: ItemOptionsSheetProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  if (!open || !item) return null;

  const isCustom = isCustomItem(item);
  const actionItem = isActionItem(item);
  const statusLabel = actionItem ? 'done' : 'packed';

  const handleClose = () => {
    setDetailsOpen(false);
    onClose();
  };

  return (
    <>
      <button
        type="button"
        className="checklist-overlay-backdrop bg-ink/40 no-print"
        aria-label="Close options"
        onClick={handleClose}
      />
      <div className="checklist-bottom-sheet bg-canvas-pure rounded-t-2xl p-6 space-y-1 shadow-clay-lg no-print">
        <h3 className="font-semibold text-ink mb-3 truncate">{item.name}</h3>

        {!item.checked && (
          <button
            type="button"
            onClick={() => {
              toggleItemWithFeedback(item.id);
              handleClose();
            }}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-surface-soft font-medium text-ink"
          >
            Mark as {statusLabel}
          </button>
        )}

        {item.checked && (
          <button
            type="button"
            onClick={() => {
              toggleItemWithFeedback(item.id, true);
              handleClose();
            }}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-surface-soft font-medium text-ink"
          >
            Mark as not {statusLabel}
          </button>
        )}

        <div className="px-4 py-3">
          <p className="text-xs text-muted mb-2">Move to another bag</p>
          <div className="flex flex-wrap gap-2">
            {bags.map((bag) => (
              <button
                key={bag.id}
                type="button"
                onClick={() => {
                  assignBag(item.id, bag.id);
                  handleClose();
                }}
                className={`px-3 py-1.5 rounded-full text-sm border ${
                  item.assignedBag === bag.id
                    ? 'bg-ink text-on-primary border-ink'
                    : 'border-hairline text-ink hover:bg-surface-soft'
                }`}
              >
                {bag.emoji} {bag.name}
              </button>
            ))}
          </div>
        </div>

        {!isCustom && (
          <button
            type="button"
            onClick={() => setDetailsOpen(true)}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-surface-soft font-medium text-ink"
          >
            View details
          </button>
        )}

        {isCustom && (
          <button
            type="button"
            onClick={() => {
              removeCustomItem(item.id);
              handleClose();
            }}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-surface-soft font-medium text-error"
          >
            Remove item
          </button>
        )}

        <button
          type="button"
          onClick={handleClose}
          className="w-full mt-2 min-h-11 rounded-full border border-hairline text-muted font-medium"
        >
          Cancel
        </button>
      </div>

      {!isCustom && (
        <ItemDetailsSheet
          item={item}
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
        />
      )}
    </>
  );
}
