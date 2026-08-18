import { useStore } from '@nanostores/react';
import type { ActivePanel } from '../../data/types';
import {
  activePanel,
  closeSearch,
  openSearch,
} from '../../stores/checklist-store';

const TABS: { id: ActivePanel | 'add'; label: string; emoji: string }[] = [
  { id: 'bag', label: 'My Bag', emoji: '🧳' },
  { id: 'todo', label: 'To Do', emoji: '✓' },
  { id: 'search', label: 'Search', emoji: '🔍' },
  { id: 'add', label: 'Add', emoji: '+' },
];

interface BottomNavProps {
  onNavigate: (panel: ActivePanel) => void;
  onAddItem: () => void;
}

export function BottomNav({ onNavigate, onAddItem }: BottomNavProps) {
  const panel = useStore(activePanel);

  const handleTab = (id: ActivePanel | 'add') => {
    if (id === 'search') {
      openSearch();
    } else if (id === 'add') {
      closeSearch();
      onAddItem();
    } else {
      closeSearch();
      activePanel.set(id);
      onNavigate(id);
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[60] bg-canvas-pure border-t border-hairline pb-[env(safe-area-inset-bottom,0px)] no-print"
      aria-label="Checklist navigation"
    >
      <div className="flex justify-around items-stretch max-w-lg mx-auto">
        {TABS.map((tab) => {
          const isActive = tab.id === 'search' || tab.id === 'add' ? false : panel === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] text-xs font-medium transition-colors ${
                isActive ? 'text-ink' : 'text-muted'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="text-lg" aria-hidden="true">{tab.emoji}</span>
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
