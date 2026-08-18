import type { Bag, BagId } from '../../data/types';
import { getBagProgress } from '../../data/engine';
import type { ChecklistState } from '../../data/types';
import { activeBagFilter } from '../../stores/checklist-store';

const BAG_BAR_COLORS: Record<BagId, string> = {
  labour: 'bg-brand-coral',
  mum: 'bg-brand-pink',
  baby: 'bg-brand-sky',
  partner: 'bg-brand-lavender',
};

const BAG_BORDER: Record<BagId, string> = {
  labour: 'border-brand-coral ring-brand-coral/30',
  mum: 'border-brand-pink ring-brand-pink/30',
  baby: 'border-brand-sky ring-brand-sky/30',
  partner: 'border-brand-lavender ring-brand-lavender/30',
};

interface BagSelectorGridProps {
  state: ChecklistState;
  active: BagId | 'all';
  onSelectBag: (bagId: BagId) => void;
}

function shortLabel(name: string): string {
  return name.replace("'s Bag", '').replace(' Bag', '');
}

export function BagSelectorGrid({ state, active, onSelectBag }: BagSelectorGridProps) {
  return (
    <div className="space-y-2">
      {active === 'all' ? (
        <p className="text-xs text-muted text-center">Viewing all bags</p>
      ) : (
        <button
          type="button"
          onClick={() => activeBagFilter.set('all')}
          className="text-xs font-medium text-brand-teal dark:text-brand-mint underline underline-offset-2 mx-auto block"
        >
          View all bags
        </button>
      )}

      <div className="rounded-2xl bg-canvas-pure shadow-clay-sm border border-hairline-soft p-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {state.bags.map((bag) => {
          const stats = getBagProgress(state, bag.id);
          const isSelected = active === bag.id;

          return (
            <BagCell
              key={bag.id}
              bag={bag}
              stats={stats}
              isSelected={isSelected}
              onClick={() => onSelectBag(bag.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

function BagCell({
  bag,
  stats,
  isSelected,
  onClick,
}: {
  bag: Bag;
  stats: ReturnType<typeof getBagProgress>;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl p-2.5 text-left transition-all ${
        isSelected
          ? `border-2 ring-2 ${BAG_BORDER[bag.id]} bg-surface-soft/50`
          : 'border border-transparent hover:bg-surface-soft/50'
      }`}
      aria-pressed={isSelected}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-base" aria-hidden="true">{bag.emoji}</span>
        <span className="text-xs font-semibold text-ink truncate">{shortLabel(bag.name)}</span>
      </div>
      <p className="text-xs text-muted mb-1.5">
        {stats.ready} / {stats.total}
      </p>
      <div className="h-1 bg-surface-card rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${BAG_BAR_COLORS[bag.id]}`}
          style={{ width: `${stats.percent}%` }}
        />
      </div>
    </button>
  );
}
