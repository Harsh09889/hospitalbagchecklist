import { atom } from 'nanostores';
import { applyViewFilter, generateChecklist, getDefaultBags } from '../data/engine';
import { getAnimationTier, prefersReducedMotion } from '../lib/animations';
import type {
  ActivePanel,
  BagId,
  CategoryId,
  ChecklistState,
  CustomItem,
  PackToastState,
  PersonalizedItem,
  UserProfile,
  ViewFilter,
} from '../data/types';

const STORAGE_KEY = 'hospital-bag-checklist';
const ANIMATION_COUNT_KEY = 'hospital-bag-animation-count';

function loadFromStorage(): ChecklistState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ChecklistState;
  } catch {
    return null;
  }
}

function saveToStorage(state: ChecklistState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadAnimationCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = sessionStorage.getItem(ANIMATION_COUNT_KEY);
    return raw ? Number.parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

function saveAnimationCount(count: number) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(ANIMATION_COUNT_KEY, String(count));
}

export const checklistState = atom<ChecklistState | null>(loadFromStorage());
export const activeBagFilter = atom<BagId | 'all'>('labour');
export const activeViewFilter = atom<ViewFilter>('all');
export const activePanel = atom<ActivePanel>('bag');
export const searchQuery = atom('');
export const searchOpen = atom(false);
export const toast = atom<PackToastState | null>(null);
export const packAnimationCount = atom(loadAnimationCount());
export const bagWiggle = atom(false);
export const bagPulse = atom(false);
export const checkboxPulseId = atom<string | null>(null);
export const itemOptionsOpen = atom<string | null>(null);

export interface FlyingPackState {
  itemId: string;
  label: string;
  fromRect: { top: number; left: number; width: number; height: number };
}

export const flyingPack = atom<FlyingPackState | null>(null);

let flyFallbackTimer: number | undefined;

checklistState.subscribe((state) => {
  if (state) saveToStorage(state);
});

packAnimationCount.subscribe((count) => {
  saveAnimationCount(count);
});

export function initializeChecklist(profile: UserProfile) {
  const state: ChecklistState = {
    profile,
    items: generateChecklist(profile),
    customItems: [],
    bags: getDefaultBags(),
    createdAt: new Date().toISOString(),
  };
  checklistState.set(state);
  return state;
}

export function loadExistingChecklist(): ChecklistState | null {
  const existing = loadFromStorage();
  if (existing) {
    checklistState.set(existing);
  }
  return existing;
}

function findItem(state: ChecklistState, itemId: string) {
  const master = state.items.find((item) => item.id === itemId);
  if (master) return master;
  return state.customItems.find((item) => item.id === itemId);
}

export function toggleItem(itemId: string) {
  const state = checklistState.get();
  if (!state) return;

  const items = state.items.map((item) =>
    item.id === itemId ? { ...item, checked: !item.checked } : item,
  );

  const customItems = state.customItems.map((item) =>
    item.id === itemId ? { ...item, checked: !item.checked } : item,
  );

  checklistState.set({ ...state, items, customItems });
}

function showPackToast(item: PersonalizedItem | CustomItem, itemId: string) {
  toast.set({
    message: `${item.name} added`,
    bagId: item.assignedBag,
    itemId,
  });
  window.setTimeout(() => {
    if (toast.get()?.itemId === itemId) toast.set(null);
  }, 4000);
}

function triggerPackFeedback(tier: 'full' | 'short' | 'none', itemId: string) {
  const count = packAnimationCount.get() + 1;
  packAnimationCount.set(count);

  if (tier === 'full') {
    bagWiggle.set(false);
    requestAnimationFrame(() => {
      bagWiggle.set(true);
      window.setTimeout(() => bagWiggle.set(false), 600);
    });
  } else if (tier === 'short') {
    checkboxPulseId.set(itemId);
    window.setTimeout(() => checkboxPulseId.set(null), 300);
    bagPulse.set(false);
    requestAnimationFrame(() => {
      bagPulse.set(true);
      window.setTimeout(() => bagPulse.set(false), 300);
    });
  }
}

export function finishFlyingPack() {
  if (flyFallbackTimer !== undefined) {
    window.clearTimeout(flyFallbackTimer);
    flyFallbackTimer = undefined;
  }
  flyingPack.set(null);
}

function playFlyAnimation(
  itemId: string,
  label: string,
  flyRect: DOMRect,
) {
  flyingPack.set({
    itemId,
    label,
    fromRect: {
      top: flyRect.top,
      left: flyRect.left,
      width: flyRect.width,
      height: flyRect.height,
    },
  });

  if (flyFallbackTimer !== undefined) {
    window.clearTimeout(flyFallbackTimer);
  }
  flyFallbackTimer = window.setTimeout(() => {
    finishFlyingPack();
  }, 700);
}

export function toggleItemFromCard(itemId: string, sourceRect?: DOMRect) {
  return toggleItemWithFeedback(itemId, false, sourceRect);
}

export function toggleItemWithFeedback(
  itemId: string,
  skipAnimation = false,
  sourceRect?: DOMRect,
) {
  const state = checklistState.get();
  if (!state) return;

  const item = findItem(state, itemId);
  if (!item) return;

  const wasChecked = item.checked;

  if (wasChecked) {
    toggleItem(itemId);
    toast.set(null);
    bagPulse.set(true);
    window.setTimeout(() => bagPulse.set(false), 200);
    return;
  }

  if (skipAnimation) {
    toggleItem(itemId);
    showPackToast(item, itemId);
    return;
  }

  const reducedMotion = prefersReducedMotion();
  const tier = getAnimationTier(packAnimationCount.get());

  const flyRect =
    sourceRect ??
    document.querySelector<HTMLElement>(`[data-item-id="${itemId}"]`)?.getBoundingClientRect();

  if (!reducedMotion && tier === 'full' && flyRect) {
    toggleItem(itemId);
    triggerPackFeedback('full', itemId);
    showPackToast(item, itemId);
    playFlyAnimation(itemId, item.name, flyRect);
    return;
  }

  toggleItem(itemId);
  triggerPackFeedback(reducedMotion ? 'short' : tier === 'none' ? 'short' : tier, itemId);
  showPackToast(item, itemId);
}

export function assignBag(itemId: string, bagId: BagId) {
  const state = checklistState.get();
  if (!state) return;

  const items = state.items.map((item) =>
    item.id === itemId ? { ...item, assignedBag: bagId } : item,
  );

  const customItems = state.customItems.map((item) =>
    item.id === itemId ? { ...item, assignedBag: bagId } : item,
  );

  checklistState.set({ ...state, items, customItems });

  const item = findItem({ ...state, items, customItems }, itemId);
  if (item?.checked) {
    const bag = state.bags.find((b) => b.id === bagId);
    toast.set({
      message: `${item.name} moved`,
      bagId,
      itemId,
    });
  }
}

export function setDueDate(date: string) {
  const state = checklistState.get();
  if (!state) return;

  checklistState.set({
    ...state,
    profile: { ...state.profile, dueDate: date },
  });
}

export function addCustomItem(data: {
  name: string;
  category: CategoryId;
  quantity?: string;
  assignedBag: BagId;
}) {
  const state = checklistState.get();
  if (!state) return;

  const customItem: CustomItem = {
    id: `custom-${Date.now()}`,
    name: data.name,
    category: data.category,
    quantity: data.quantity,
    assignedBag: data.assignedBag,
    checked: false,
  };

  checklistState.set({
    ...state,
    customItems: [...state.customItems, customItem],
  });
}

export function removeCustomItem(itemId: string) {
  const state = checklistState.get();
  if (!state) return;

  checklistState.set({
    ...state,
    customItems: state.customItems.filter((item) => item.id !== itemId),
  });
}

export function resetChecklist() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(ANIMATION_COUNT_KEY);
  }
  checklistState.set(null);
  activeBagFilter.set('labour');
  activeViewFilter.set('all');
  activePanel.set('bag');
  searchQuery.set('');
  searchOpen.set(false);
  toast.set(null);
  packAnimationCount.set(0);
  flyingPack.set(null);
  if (flyFallbackTimer !== undefined) {
    window.clearTimeout(flyFallbackTimer);
    flyFallbackTimer = undefined;
  }
  checkboxPulseId.set(null);
  itemOptionsOpen.set(null);
}

export function getAllItems(state: ChecklistState): (PersonalizedItem | CustomItem)[] {
  return [...state.items, ...state.customItems];
}

export function filterItems(
  state: ChecklistState,
  bagFilter: BagId | 'all',
  query: string,
  viewFilter: ViewFilter = 'all',
): (PersonalizedItem | CustomItem)[] {
  let items = getAllItems(state);

  if (bagFilter !== 'all') {
    items = items.filter((item) => item.assignedBag === bagFilter);
  }

  items = applyViewFilter(items, viewFilter, state.profile);

  if (viewFilter === 'all' && query.trim()) {
    const lower = query.toLowerCase();
    items = items.filter((item) => item.name.toLowerCase().includes(lower));
  } else if (viewFilter !== 'all' && query.trim()) {
    const lower = query.toLowerCase();
    items = items.filter((item) => item.name.toLowerCase().includes(lower));
  }

  return items;
}

export function dismissToast() {
  toast.set(null);
}

export function openSearch() {
  searchOpen.set(true);
  activePanel.set('search');
}

export function closeSearch() {
  searchOpen.set(false);
  if (activePanel.get() === 'search') {
    activePanel.set('bag');
  }
  searchQuery.set('');
}
