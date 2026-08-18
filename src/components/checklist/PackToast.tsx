import { useStore } from '@nanostores/react';
import { assignBag, dismissToast, toast } from '../../stores/checklist-store';
import type { Bag, BagId } from '../../data/types';

interface PackToastProps {
  bags: Bag[];
}

export function PackToast({ bags }: PackToastProps) {
  const toastState = useStore(toast);

  if (!toastState) return null;

  const bag = toastState.bagId
    ? bags.find((b) => b.id === toastState.bagId)
    : undefined;

  return (
    <div
      className="fixed bottom-24 left-4 right-4 z-50 mx-auto max-w-md no-print"
      role="status"
      aria-live="polite"
    >
      <div className="rounded-xl bg-ink text-on-primary px-4 py-3 shadow-clay-lg flex items-center gap-3">
        <span className="text-success shrink-0">✓</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{toastState.message}</p>
          {bag && (
            <p className="text-xs opacity-80">
              Packed in {bag.emoji} {bag.name}
            </p>
          )}
        </div>
        {toastState.itemId && toastState.bagId && (
          <label className="shrink-0 text-xs">
            <span className="sr-only">Change bag</span>
            <select
              className="bg-transparent border border-on-primary/30 rounded px-1 py-0.5 text-xs"
              value={toastState.bagId}
              onChange={(event) => {
                assignBag(toastState.itemId!, event.target.value as BagId);
              }}
            >
              {bags.map((b) => (
                <option key={b.id} value={b.id} className="text-ink">
                  {b.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <button
          type="button"
          onClick={dismissToast}
          className="shrink-0 text-xs opacity-70 hover:opacity-100"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
