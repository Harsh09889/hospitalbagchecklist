import type { ProgressStats } from '../../data/engine';

interface StickyBagBarProps {
  stats: ProgressStats;
  emoji?: string;
  visible?: boolean;
}

export function StickyBagBar({ stats, emoji = '🧳', visible = true }: StickyBagBarProps) {
  return (
    <div
      className={`fixed top-(--site-header-height) left-0 right-0 z-40 bg-canvas/95 backdrop-blur-sm border-b border-hairline no-print transition-transform duration-200 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto w-full max-w-lg px-5 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span aria-hidden="true">{emoji}</span>
          <span className="badge-wash-coral inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold">
            {stats.percent}% ready
          </span>
        </div>
        <span className="text-sm text-muted shrink-0">
          {stats.ready} / {stats.total}
        </span>
      </div>
    </div>
  );
}
