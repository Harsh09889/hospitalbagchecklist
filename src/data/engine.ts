import { MASTER_ITEMS, DEFAULT_BAGS } from './items';
import type {
  BagId,
  BagVisualState,
  ChecklistState,
  CustomItem,
  ItemCondition,
  ItemPriority,
  MasterItem,
  PersonalizedItem,
  UserProfile,
  ViewFilter,
} from './types';
import { isCustomItem, type ChecklistItemView } from './types';
import { getGestationalWeek, getThisWeekItems } from '../lib/timeline';
import { getProgressMessage } from '../lib/progress-messaging';

const PRIORITY_ORDER: ItemPriority[] = [
  'essential',
  'recommended',
  'optional',
  'hospital-provided',
];

function getProfileValue(profile: UserProfile, type: ItemCondition['type']): string | string[] {
  switch (type) {
    case 'deliveryType':
      return profile.deliveryType;
    case 'stayDuration':
      return profile.stayDuration;
    case 'season':
      return profile.season;
    case 'feedingPlan':
      return profile.feedingPlan;
    case 'hospitalType':
      return profile.hospitalType;
    case 'packingFor':
      return profile.packingFor;
    default:
      return '';
  }
}

function conditionMatches(profile: UserProfile, condition: ItemCondition): boolean {
  const profileValue = getProfileValue(profile, condition.type);

  if (Array.isArray(profileValue)) {
    return profileValue.includes(condition.value as never);
  }

  return profileValue === condition.value;
}

function shouldIncludeItem(item: MasterItem, profile: UserProfile): boolean {
  const includeConditions = item.conditions.filter((c) => c.effect === 'include');
  const excludeConditions = item.conditions.filter((c) => c.effect === 'exclude');

  if (excludeConditions.some((c) => conditionMatches(profile, c))) {
    return false;
  }

  if (includeConditions.length > 0) {
    return includeConditions.some((c) => conditionMatches(profile, c));
  }

  return true;
}

function isApplicableToProfile(item: MasterItem, profile: UserProfile): boolean {
  return item.applicableTo.some((person) => profile.packingFor.includes(person));
}

function applyQuantityAdjustments(item: MasterItem, profile: UserProfile): string {
  let quantity = item.quantity;

  for (const condition of item.conditions) {
    if (condition.effect === 'addQuantity' && condition.extra && conditionMatches(profile, condition)) {
      quantity = `${quantity} ${condition.extra}`;
    }
  }

  if (profile.stayDuration === 'extended' && item.category === 'postpartum' && item.id === 'post-comfortable-pjs') {
    quantity = '4–5 sets';
  }

  if (profile.stayDuration === 'extended' && item.category === 'partner' && item.id === 'partner-clothes') {
    quantity = '4–5 sets';
  }

  return quantity;
}

function applyPriorityAdjustments(item: MasterItem, profile: UserProfile): ItemPriority {
  let priority = item.priority;

  for (const condition of item.conditions) {
    if (condition.effect === 'upgradePriority' && conditionMatches(profile, condition)) {
      if (priority === 'recommended') priority = 'essential';
      if (priority === 'optional') priority = 'recommended';
    }
  }

  return priority;
}

export function generateChecklist(profile: UserProfile): PersonalizedItem[] {
  const items = MASTER_ITEMS.filter(
    (item) => isApplicableToProfile(item, profile) && shouldIncludeItem(item, profile),
  ).map<PersonalizedItem>((item) => ({
    ...item,
    priority: applyPriorityAdjustments(item, profile),
    quantity: applyQuantityAdjustments(item, profile),
    checked: false,
    assignedBag: item.defaultBag,
  }));

  return items.sort((a, b) => {
    const priorityDiff = PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority);
    if (priorityDiff !== 0) return priorityDiff;
    return a.name.localeCompare(b.name);
  });
}

export function getDefaultBags() {
  return DEFAULT_BAGS.map((bag) => ({ ...bag }));
}

export function calculateProgress(items: PersonalizedItem[], customItems: { checked: boolean }[]): number {
  const all = [...items, ...customItems];
  if (all.length === 0) return 0;
  const checked = all.filter((item) => item.checked).length;
  return Math.round((checked / all.length) * 100);
}

export function getBagName(bagId: string): string {
  return DEFAULT_BAGS.find((bag) => bag.id === bagId)?.name ?? bagId;
}

export function getBagEmoji(bagId: string): string {
  return DEFAULT_BAGS.find((bag) => bag.id === bagId)?.emoji ?? '🧳';
}

export interface ProgressStats {
  ready: number;
  total: number;
  percent: number;
  remaining: number;
}

export function getProgressStats(
  items: PersonalizedItem[],
  customItems: CustomItem[],
  bagFilter: BagId | 'all' = 'all',
): ProgressStats {
  let all: ChecklistItemView[] = [...items, ...customItems];

  if (bagFilter !== 'all') {
    all = all.filter((item) => item.assignedBag === bagFilter);
  }

  const total = all.length;
  const ready = all.filter((item) => item.checked).length;
  const percent = total === 0 ? 0 : Math.round((ready / total) * 100);
  const remaining = total - ready;

  return { ready, total, percent, remaining };
}

export function getBagVisualState(percent: number): BagVisualState {
  if (percent >= 100) return 'complete';
  if (percent >= 75) return 'threeQuarter';
  if (percent >= 50) return 'half';
  if (percent >= 25) return 'quarter';
  return 'empty';
}

export function getEssentials(items: ChecklistItemView[]): ChecklistItemView[] {
  return items.filter((item) => !item.checked && !isCustomItem(item) && item.priority === 'essential');
}

export function getUncheckedCount(items: ChecklistItemView[]): number {
  return items.filter((item) => !item.checked).length;
}

export function applyViewFilter(
  items: ChecklistItemView[],
  filter: ViewFilter,
  profile: UserProfile,
): ChecklistItemView[] {
  if (filter === 'all') return items;

  const gestationalWeek = getGestationalWeek(profile.dueDate);

  switch (filter) {
    case 'essential':
      return items.filter((item) => !isCustomItem(item) && item.priority === 'essential');
    case 'this-week':
      return getThisWeekItems(items, gestationalWeek);
    case 'optional':
      return items.filter((item) => !isCustomItem(item) && item.priority === 'optional');
    default:
      return items;
  }
}

export function getBagProgress(
  state: ChecklistState,
  bagId: BagId,
): ProgressStats {
  return getProgressStats(state.items, state.customItems, bagId);
}

export function isActionItem(item: ChecklistItemView): boolean {
  const actionWords = ['confirm', 'download', 'wash', 'charge', 'call', 'register'];
  const name = item.name.toLowerCase();
  return actionWords.some((word) => name.includes(word));
}

export { getProgressMessage };
