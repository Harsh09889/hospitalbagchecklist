import type { ViewFilter } from '../../data/types';
import { activeViewFilter } from '../../stores/checklist-store';

const FILTERS: { id: ViewFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'essential', label: 'Must-have' },
  { id: 'this-week', label: 'This week' },
  { id: 'optional', label: 'Optional' },
];

interface WhatsLeftFiltersProps {
  remaining: number;
  active: ViewFilter;
}

export function WhatsLeftFilters({ remaining, active }: WhatsLeftFiltersProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-ink">
        {remaining} thing{remaining !== 1 ? 's' : ''} left
      </h2>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => activeViewFilter.set(filter.id)}
            className={`category-tab ${active === filter.id ? 'category-tab-active' : ''}`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </section>
  );
}
