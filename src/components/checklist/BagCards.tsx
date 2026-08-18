import type { Bag, BagId } from '../../data/types';
import { getBagProgress, type ProgressStats } from '../../data/engine';
import type { ChecklistState } from '../../data/types';

const BAG_ACCENT: Record<BagId, string> = {
  labour: 'border-brand-coral/40',
  mum: 'border-brand-pink/40',
  baby: 'border-brand-sky/40',
  partner: 'border-brand-lavender/40',
};

interface BagCardsProps {
  state: ChecklistState;
  active: BagId | 'all';
  onSelectBag: (bagId: BagId) => void;
}

function BagCard({
  bag,
  stats,
  onClick,
  prominent = false,
}: {
  bag: Bag;
  stats: ProgressStats;
  onClick: () => void;
  prominent?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-xl p-4 border-2 bg-canvas-pure shadow-clay-sm transition-transform active:scale-[0.99] ${BAG_ACCENT[bag.id]} ${
        prominent ? 'ring-2 ring-ink/10' : ''
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl" aria-hidden="true">{bag.emoji}</span>
        <span className="font-semibold text-ink">{bag.name}</span>
      </div>
      <p className="text-sm text-muted mb-2">
        {stats.ready} / {stats.total} ready
      </p>
      <div className="h-2 bg-surface-card rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-success rounded-full transition-all duration-500"
          style={{ width: `${stats.percent}%` }}
        />
      </div>
      <p className="text-xs text-muted">{stats.remaining} left</p>
    </button>
  );
}

export function BagCards({ state, active, onSelectBag }: BagCardsProps) {
  const bagsToShow = active === 'all' ? state.bags : state.bags.filter((b) => b.id === active);

  return (
    <div className={`grid gap-3 ${active === 'all' ? 'sm:grid-cols-2' : ''}`}>
      {bagsToShow.map((bag) => (
        <BagCard
          key={bag.id}
          bag={bag}
          stats={getBagProgress(state, bag.id)}
          onClick={() => onSelectBag(bag.id)}
          prominent={active === bag.id}
        />
      ))}
    </div>
  );
}
