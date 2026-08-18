import type { ChecklistItemView } from '../../data/types';
import { isCustomItem } from '../../data/types';
import { Badge } from '../ui/Badge';

interface ItemDetailsSheetProps {
  item: ChecklistItemView;
  open: boolean;
  onClose: () => void;
}

export function ItemDetailsSheet({ item, open, onClose }: ItemDetailsSheetProps) {
  if (!open || isCustomItem(item)) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center no-print">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40"
        aria-label="Close details"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-canvas-pure rounded-t-2xl sm:rounded-2xl p-6 space-y-4 shadow-clay-lg max-h-[80vh] overflow-y-auto">
        <h3 className="font-semibold text-lg text-ink">{item.name}</h3>

        {item.quantity && (
          <p className="text-sm text-muted">{item.quantity}</p>
        )}

        <Badge priority={item.priority} />

        {item.packTiming && (
          <p className="text-sm text-muted">
            <span className="font-medium text-ink">When to pack:</span> {item.packTiming}
          </p>
        )}

        {item.whyNeeded && (
          <p className="text-sm text-body">{item.whyNeeded}</p>
        )}

        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-[44px] rounded-full bg-ink text-on-primary font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
}
