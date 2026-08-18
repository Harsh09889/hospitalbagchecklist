import type { Bag, BagId, ChecklistItemView } from '../../data/types';
import { isCustomItem } from '../../data/types';
import { isActionItem } from '../../data/engine';
import { itemOptionsOpen } from '../../stores/checklist-store';
import { ChecklistItemCard } from './ChecklistItem';

interface SwipeableItemRowProps {
  item: ChecklistItemView;
  bags: Bag[];
  onToggle: (id: string, sourceRect?: DOMRect) => void;
  onAssignBag?: (id: string, bagId: BagId) => void;
  onRemove?: (id: string) => void;
  showBagInSearch?: boolean;
  pulseId?: string | null;
}

export function SwipeableItemRow({
  item,
  bags,
  onToggle,
  onAssignBag,
  onRemove,
  showBagInSearch = false,
  pulseId,
}: SwipeableItemRowProps) {
  const actionItem = isActionItem(item);
  const packLabel = actionItem ? 'Done' : 'Packed';

  return (
    <ChecklistItemCard
      item={item}
      bags={bags}
      onToggle={onToggle}
      onAssignBag={onAssignBag}
      onRemove={onRemove}
      showBagInSearch={showBagInSearch}
      pulseId={pulseId}
      swipeEnabled
      packLabel={packLabel}
      onOpenOptions={() => itemOptionsOpen.set(item.id)}
    />
  );
}
