import { forwardRef } from 'react';
import type { Bag, BagId, ChecklistState } from '../../data/types';
import { getBagVisualState, type ProgressStats } from '../../data/engine';
import { getPackByWeekLabel } from '../../lib/timeline';
import { ChecklistHeader } from './ChecklistHeader';
import { CircularProgressRing } from './CircularProgressRing';
import { BagHeroStats } from './BagHeroStats';
import { BagSelectorGrid } from './BagSelectorGrid';
import { HospitalBagIllustration } from './HospitalBagIllustration';
import { Button } from '../ui/Button';

interface BagHeroProps {
  stats: ProgressStats;
  activeBag: BagId | 'all';
  bags: Bag[];
  state: ChecklistState;
  onAddItem?: () => void;
  onSelectBag: (bagId: BagId) => void;
}

export const BagHero = forwardRef<HTMLDivElement, BagHeroProps>(function BagHero(
  { stats, activeBag, bags, state, onAddItem, onSelectBag },
  ref,
) {
  const visualState = getBagVisualState(stats.percent);
  const activeBagData =
    activeBag === 'all' ? bags[0] : bags.find((b) => b.id === activeBag) ?? bags[0];
  const title = activeBag === 'all' ? 'Your hospital bag' : activeBagData.name;
  const allItems = [...state.items, ...state.customItems];
  const packByLabel = getPackByWeekLabel(state.profile, allItems, activeBag);

  return (
    <section
      ref={ref}
      className="rounded-2xl bg-canvas-pure shadow-clay border border-hairline-soft p-4 sm:p-5 space-y-5"
    >
      <ChecklistHeader title={title} emoji={activeBagData.emoji} />

      <p className="text-sm text-muted text-center -mt-2">
        Pack at your own pace. We&apos;ll keep track.
      </p>

      <CircularProgressRing
        percent={stats.percent}
        ready={stats.ready}
        total={stats.total}
        activeBag={activeBag}
      >
        <div className="mb-1">
          <HospitalBagIllustration
            bagId={activeBag}
            bags={bags}
            visualState={visualState}
            className="!w-16 !h-auto mx-auto"
          />
        </div>
      </CircularProgressRing>

      <BagHeroStats remaining={stats.remaining} packByLabel={packByLabel} />

      {onAddItem && (
        <Button fullWidth onClick={onAddItem}>
          Add your item
        </Button>
      )}

      {stats.percent >= 100 && (
        <p className="text-center text-base font-semibold text-success">
          Your hospital bag is ready!
        </p>
      )}

      <BagSelectorGrid
        state={state}
        active={activeBag}
        onSelectBag={onSelectBag}
      />
    </section>
  );
});
