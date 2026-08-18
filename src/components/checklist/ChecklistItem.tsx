import { useRef, useState } from 'react';
import type { Bag, BagId, ChecklistItemView } from '../../data/types';
import { isCustomItem } from '../../data/types';
import { isActionItem } from '../../data/engine';
import { useSwipeActions } from '../../hooks/useSwipeActions';
import { Badge } from '../ui/Badge';
import { ItemDetailsSheet } from './ItemDetailsSheet';

interface ChecklistItemProps {
  item: ChecklistItemView;
  bags: Bag[];
  onToggle: (id: string, sourceRect?: DOMRect) => void;
  onAssignBag?: (id: string, bagId: BagId) => void;
  onRemove?: (id: string) => void;
  showBagInSearch?: boolean;
  onOpenOptions?: () => void;
  swipeEnabled?: boolean;
  packLabel?: string;
  pulseId?: string | null;
}

export function ChecklistItemCard({
  item,
  bags,
  onToggle,
  onRemove,
  showBagInSearch = false,
  onOpenOptions,
  swipeEnabled = false,
  packLabel: packLabelProp,
  pulseId,
}: ChecklistItemProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const bag = bags.find((b) => b.id === item.assignedBag);
  const isCustom = isCustomItem(item);
  const actionItem = isActionItem(item);
  const statusLabel = packLabelProp ?? (actionItem ? 'done' : 'packed');
  const isPulsing = pulseId === item.id;

  const getRect = () => rowRef.current?.getBoundingClientRect();

  const { containerRef, offsetX, direction, isDragging, suppressClickRef } = useSwipeActions({
    disabled: !swipeEnabled || item.checked,
    onSwipeRight: () => {
      if (!item.checked) onToggle(item.id, getRect());
    },
    onSwipeLeft: () => {
      onOpenOptions?.();
      if (!onOpenOptions && !isCustom) setDetailsOpen(true);
    },
    onTap: () => {
      if (!item.checked) onToggle(item.id, getRect());
    },
  });

  const handleToggle = () => {
    if (suppressClickRef.current) return;
    onToggle(item.id, getRect());
  };

  const cardClickHandler = swipeEnabled && !item.checked ? undefined : handleToggle;

  const clampedOffset = Math.max(-100, Math.min(100, offsetX));
  const packReveal = Math.min(1, Math.max(0, clampedOffset / 80));
  const optionsReveal = Math.min(1, Math.max(0, -clampedOffset / 80));

  const card = (
    <div
      data-item-id={item.id}
      className={`rounded-xl border border-hairline p-3 transition-all bg-canvas-pure cursor-pointer ${
        item.checked ? 'bg-surface-soft' : 'shadow-clay-sm'
      }`}
      onClick={cardClickHandler}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleToggle();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleToggle();
          }}
          className={`mt-0.5 w-6 h-6 shrink-0 rounded-md border-2 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
            item.checked
              ? 'bg-success border-success text-white'
              : 'border-hairline bg-canvas hover:border-muted'
          } ${isPulsing ? 'animate-check-pulse' : ''}`}
          aria-label={`Mark ${item.name} as ${item.checked ? `not ${statusLabel.toLowerCase()}` : statusLabel.toLowerCase()}`}
          aria-pressed={item.checked}
        >
          {item.checked && <span className="text-sm">✓</span>}
        </button>

        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h4 className={`font-medium text-base ${item.checked ? 'text-body' : 'text-ink'}`}>
              {item.name}
            </h4>
            <div className="flex items-center gap-1 shrink-0">
              {swipeEnabled && onOpenOptions && (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onOpenOptions();
                  }}
                  className="text-muted hover:text-ink text-sm w-8 h-8 rounded-full border border-hairline"
                  aria-label={`Options for ${item.name}`}
                >
                  ⋯
                </button>
              )}
              {isCustom && onRemove && (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onRemove(item.id);
                  }}
                  className="text-muted hover:text-error text-sm"
                  aria-label={`Remove ${item.name}`}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {item.quantity && (
            <p className="text-sm text-muted">{item.quantity}</p>
          )}

          {!item.checked && !isCustom && item.priority === 'essential' && (
            <div className="flex items-center gap-2">
              <Badge priority={item.priority} />
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setDetailsOpen(true);
                }}
                className="text-xs text-muted hover:text-ink w-6 h-6 rounded-full border border-hairline"
                aria-label={`Details for ${item.name}`}
              >
                ⓘ
              </button>
            </div>
          )}

          {item.checked && bag && (
            <p className="text-xs text-muted">
              {actionItem ? 'Done' : 'Packed'} in {bag.emoji} {bag.name}
            </p>
          )}

          {showBagInSearch && bag && !item.checked && (
            <p className="text-sm font-medium text-brand-teal dark:text-brand-mint">
              {bag.emoji} {bag.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  if (!swipeEnabled) {
    return (
      <>
        <div ref={rowRef}>{card}</div>
        {!isCustom && (
          <ItemDetailsSheet item={item} open={detailsOpen} onClose={() => setDetailsOpen(false)} />
        )}
      </>
    );
  }

  return (
    <>
      <div
        ref={(node) => {
          rowRef.current = node;
          containerRef.current = node;
        }}
        data-item-id={item.id}
        className={`relative overflow-hidden rounded-xl ${isDragging ? 'touch-none select-none' : 'touch-pan-y'}`}
      >
        <div
          className="absolute inset-y-0 left-0 flex items-center px-4 bg-success text-white text-sm font-semibold rounded-xl pointer-events-none select-none"
          style={{ width: '100%', opacity: packReveal, transform: `translateX(${(-1 + packReveal) * 20}px)` }}
          aria-hidden="true"
        >
          ✓ {statusLabel}
        </div>
        <div
          className="absolute inset-y-0 right-0 flex items-center justify-end px-4 bg-surface-strong text-ink text-sm font-semibold rounded-xl pointer-events-none select-none"
          style={{ width: '100%', opacity: optionsReveal, transform: `translateX(${(1 - optionsReveal) * 20}px)` }}
          aria-hidden="true"
        >
          Options ←
        </div>
        <div
          className="relative z-10"
          style={{
            transform: clampedOffset ? `translateX(${clampedOffset}px)` : undefined,
            transition: direction === 'idle' && offsetX === 0 ? 'transform 200ms var(--ease-clay)' : undefined,
          }}
        >
          {card}
        </div>
      </div>

      {!isCustom && (
        <ItemDetailsSheet item={item} open={detailsOpen} onClose={() => setDetailsOpen(false)} />
      )}
    </>
  );
}
