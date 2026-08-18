import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { CATEGORIES } from '../../data/categories';
import { getProgressStats } from '../../data/engine';
import { getTodayFocus } from '../../lib/timeline';
import { useScrollCompact } from '../../hooks/useScrollCompact';
import {
  activeBagFilter,
  activePanel,
  activeViewFilter,
  addCustomItem,
  assignBag,
  checkboxPulseId,
  checklistState,
  filterItems,
  itemOptionsOpen,
  loadExistingChecklist,
  removeCustomItem,
  resetChecklist,
  searchQuery,
  toggleItemFromCard,
} from '../../stores/checklist-store';
import { BagHero } from './BagHero';
import { StickyBagBar } from './StickyBagBar';
import { TodaySection } from './TodaySection';
import { WhatsLeftFilters } from './WhatsLeftFilters';
import { CategorySection } from './CategorySection';
import { AddCustomItem } from './AddCustomItem';
import { ExportMenu } from './ExportMenu';
import { FloatingSearch } from './FloatingSearch';
import { PackToast } from './PackToast';
import { PackFlyOverlay } from './PackFlyOverlay';
import { ItemOptionsSheet } from './ItemOptionsSheet';
import { BottomNav } from './BottomNav';
import { Button } from '../ui/Button';
import type { BagId } from '../../data/types';

export function ChecklistApp() {
  const state = useStore(checklistState);
  const bagFilter = useStore(activeBagFilter);
  const viewFilter = useStore(activeViewFilter);
  const panel = useStore(activePanel);
  const query = useStore(searchQuery);
  const pulseId = useStore(checkboxPulseId);
  const optionsItemId = useStore(itemOptionsOpen);
  const { sentinelRef, isCompact } = useScrollCompact();
  const todoRef = useRef<HTMLDivElement>(null);
  const firstSectionRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [addItemOpen, setAddItemOpen] = useState(false);

  useEffect(() => {
    loadExistingChecklist();
  }, []);

  useEffect(() => {
    if (panel === 'todo' && todoRef.current) {
      todoRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [panel]);

  if (!state) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-muted text-lg">No checklist found yet.</p>
        <Button onClick={() => window.location.reload()}>Create your checklist</Button>
      </div>
    );
  }

  const allItems = [...state.items, ...state.customItems];
  const stats = getProgressStats(state.items, state.customItems, bagFilter);
  const filteredItems = filterItems(state, bagFilter, query, viewFilter);
  const focusItems = getTodayFocus(allItems, state.profile);
  const bagScopedItems =
    bagFilter === 'all'
      ? allItems
      : allItems.filter((item) => item.assignedBag === bagFilter);
  const remaining = bagScopedItems.filter((item) => !item.checked).length;
  const searchResults = filterItems(state, 'all', query, 'all');

  const optionsItem = optionsItemId
    ? allItems.find((item) => item.id === optionsItemId) ?? null
    : null;

  const activeBagEmoji =
    bagFilter === 'all'
      ? '🧳'
      : state.bags.find((b) => b.id === bagFilter)?.emoji ?? '🧳';

  const defaultBag: BagId = bagFilter === 'all' ? 'mum' : bagFilter;

  const firstIncompleteCategory = CATEGORIES.find((category) => {
    const categoryItems = filteredItems.filter((item) => item.category === category.id);
    return categoryItems.some((item) => !item.checked);
  });

  return (
    <div className="pb-24 space-y-6">
      <StickyBagBar stats={stats} emoji={activeBagEmoji} visible={isCompact} />

      <div ref={sentinelRef} aria-hidden="true" className="h-px" />

      {(panel === 'bag' || panel === 'todo') && (
        <>
          <BagHero
            ref={heroRef}
            stats={stats}
            activeBag={bagFilter}
            bags={state.bags}
            state={state}
            onAddItem={() => setAddItemOpen(true)}
            onSelectBag={(id: BagId) => activeBagFilter.set(id)}
          />

          <div ref={todoRef} className="space-y-6">
            <TodaySection
              profile={state.profile}
              focusItems={focusItems}
              bags={state.bags}
            />

            <WhatsLeftFilters remaining={remaining} active={viewFilter} />
          </div>

          <div className="space-y-3">
            {CATEGORIES.map((category) => {
              const categoryItems = filteredItems.filter(
                (item) => item.category === category.id,
              );
              const isFirstIncomplete = category.id === firstIncompleteCategory?.id;

              return (
                <CategorySection
                  key={category.id}
                  category={category}
                  items={categoryItems}
                  bags={state.bags}
                  onToggle={toggleItemFromCard}
                  onAssignBag={assignBag}
                  onRemove={removeCustomItem}
                  defaultOpen={isFirstIncomplete}
                  pulseId={pulseId}
                  sectionRef={
                    isFirstIncomplete
                      ? (el) => {
                          firstSectionRef.current = el;
                        }
                      : undefined
                  }
                />
              );
            })}
          </div>
        </>
      )}

      {panel === 'more' && (
        <div className="space-y-6">
          <h2 className="display-sm text-ink">More</h2>
          <ExportMenu state={state} />
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => {
                if (confirm('Start over? This will delete your current checklist.')) {
                  resetChecklist();
                }
              }}
              className="text-sm text-muted hover:text-error underline"
            >
              Start over with a new checklist
            </button>
          </div>
        </div>
      )}

      <AddCustomItem
        open={addItemOpen}
        onClose={() => setAddItemOpen(false)}
        bags={state.bags}
        onAdd={addCustomItem}
        defaultBag={defaultBag}
      />
      <FloatingSearch
        bags={state.bags}
        results={searchResults}
        onAssignBag={assignBag}
        onRemove={removeCustomItem}
      />
      <PackToast bags={state.bags} />
      <PackFlyOverlay />
      <ItemOptionsSheet
        item={optionsItem}
        bags={state.bags}
        open={optionsItemId !== null}
        onClose={() => itemOptionsOpen.set(null)}
      />
      <BottomNav onNavigate={() => {}} onAddItem={() => setAddItemOpen(true)} />
    </div>
  );
}
