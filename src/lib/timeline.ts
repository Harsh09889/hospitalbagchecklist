import { PACKING_TIMELINE } from '../data/content/checklists';
import type { BagId, UserProfile } from '../data/types';
import { isCustomItem, type ChecklistItemView } from '../data/types';

const MS_PER_DAY = 86_400_000;
const GESTATION_DAYS = 280;

export function getGestationalWeek(dueDate?: string, now = new Date()): number | null {
  if (!dueDate) return null;

  const due = new Date(`${dueDate}T12:00:00`);
  if (Number.isNaN(due.getTime())) return null;

  const daysUntilDue = Math.round((due.getTime() - now.getTime()) / MS_PER_DAY);
  const gestationalDays = GESTATION_DAYS - daysUntilDue;
  const week = Math.floor(gestationalDays / 7);

  return Math.max(1, Math.min(42, week));
}

export function parsePackTimingWeek(packTiming: string): number | null {
  const match = packTiming.match(/(\d+)\s*weeks?/i);
  return match ? Number.parseInt(match[1], 10) : null;
}

export function getThisWeekItems(
  items: ChecklistItemView[],
  gestationalWeek: number | null,
): ChecklistItemView[] {
  if (gestationalWeek === null) return [];

  return items.filter((item) => {
    if (item.checked || isCustomItem(item)) return false;
    const week = parsePackTimingWeek(item.packTiming);
    if (week === null) return false;
    return week <= gestationalWeek;
  });
}

export function getTodayFocus(
  items: ChecklistItemView[],
  profile: UserProfile,
  limit = 5,
): ChecklistItemView[] {
  const gestationalWeek = getGestationalWeek(profile.dueDate);
  const unchecked = items.filter((item) => !item.checked);

  const essentials = unchecked.filter(
    (item) => !isCustomItem(item) && item.priority === 'essential',
  );
  const thisWeek = getThisWeekItems(unchecked, gestationalWeek);

  const seen = new Set<string>();
  const combined: ChecklistItemView[] = [];

  for (const item of [...essentials, ...thisWeek, ...unchecked]) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    combined.push(item);
    if (combined.length >= limit) break;
  }

  return combined;
}

export function getTimelineStepForWeek(gestationalWeek: number | null) {
  if (gestationalWeek === null) {
    return PACKING_TIMELINE[0];
  }

  if (gestationalWeek >= 37) return PACKING_TIMELINE[3];
  if (gestationalWeek >= 36) return PACKING_TIMELINE[2];
  if (gestationalWeek >= 34) return PACKING_TIMELINE[1];
  return PACKING_TIMELINE[0];
}

export function formatGestationalLabel(dueDate?: string): string | null {
  const week = getGestationalWeek(dueDate);
  if (week === null) return null;
  return `You're ${week} weeks pregnant.`;
}

export function getPackByWeekLabel(
  profile: UserProfile,
  items: ChecklistItemView[],
  bagFilter: 'all' | BagId = 'all',
): string {
  if (!profile.dueDate) return 'Set due date';

  let scoped = items.filter((item) => !item.checked && !isCustomItem(item));
  if (bagFilter !== 'all') {
    scoped = scoped.filter((item) => item.assignedBag === bagFilter);
  }

  const packWeeks = scoped
    .map((item) => parsePackTimingWeek(item.packTiming))
    .filter((week): week is number => week !== null);

  if (packWeeks.length > 0) {
    const earliest = Math.min(...packWeeks);
    return `Pack by ${earliest} weeks`;
  }

  const gestationalWeek = getGestationalWeek(profile.dueDate);
  const timeline = getTimelineStepForWeek(gestationalWeek);
  if (gestationalWeek !== null && gestationalWeek >= 36) return 'Pack by 36 weeks';
  if (gestationalWeek !== null && gestationalWeek >= 34) return 'Pack by 34 weeks';
  return timeline.week.replace(' +', '+');
}
