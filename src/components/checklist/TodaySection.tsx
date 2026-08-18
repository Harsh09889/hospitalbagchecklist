import type { Bag, ChecklistItemView, UserProfile } from '../../data/types';
import {
  formatGestationalLabel,
  getTimelineStepForWeek,
  getGestationalWeek,
} from '../../lib/timeline';
import { activeViewFilter, setDueDate, toggleItemFromCard } from '../../stores/checklist-store';
import { Button } from '../ui/Button';
import { SwipeableItemRow } from './SwipeableItemRow';

interface TodaySectionProps {
  profile: UserProfile;
  focusItems: ChecklistItemView[];
  bags: Bag[];
}

export function TodaySection({ profile, focusItems, bags }: TodaySectionProps) {
  const gestationalWeek = getGestationalWeek(profile.dueDate);
  const timeline = getTimelineStepForWeek(gestationalWeek);
  const gestationalLabel = formatGestationalLabel(profile.dueDate);

  if (!profile.dueDate) {
    return (
      <section className="card-cream p-4 space-y-3">
        <h2 className="font-semibold text-ink">Today</h2>
        <p className="text-sm text-muted">
          Add your due date to see what to focus on each week.
        </p>
        <input
          type="date"
          className="field-input"
          aria-label="Due date"
          onChange={(event) => {
            if (event.target.value) setDueDate(event.target.value);
          }}
        />
      </section>
    );
  }

  return (
    <section className="card-cream p-4 space-y-4">
      <div>
        <h2 className="font-semibold text-ink">Today</h2>
        {gestationalLabel && (
          <p className="text-sm text-muted mt-1">{gestationalLabel}</p>
        )}
        <p className="text-sm text-body mt-2">
          <span className="font-medium">{timeline.title}:</span> {timeline.body}
        </p>
      </div>

      {focusItems.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-ink">Focus on these next:</p>
          <ul className="space-y-2">
            {focusItems.map((item) => (
              <li key={item.id}>
                <SwipeableItemRow
                  item={item}
                  bags={bags}
                  onToggle={toggleItemFromCard}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button
        variant="secondary"
        fullWidth
        onClick={() => activeViewFilter.set('this-week')}
      >
        Things to do this week →
      </Button>
    </section>
  );
}
