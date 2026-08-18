import { activePanel } from '../../stores/checklist-store';

interface ChecklistHeaderProps {
  title: string;
  emoji: string;
}

export function ChecklistHeader({ title, emoji }: ChecklistHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3">
      <a
        href="/"
        className="w-10 h-10 rounded-full bg-canvas-pure shadow-clay-sm flex items-center justify-center text-lg shrink-0 no-print"
        aria-label="Back to home"
      >
        ←
      </a>

      <div className="flex items-center gap-2 min-w-0 flex-1 justify-center">
        <span className="text-xl shrink-0" aria-hidden="true">{emoji}</span>
        <h1 className="display-sm text-ink truncate">{title}</h1>
      </div>

      <button
        type="button"
        onClick={() => activePanel.set('more')}
        className="w-10 h-10 rounded-full bg-canvas-pure shadow-clay-sm flex items-center justify-center text-lg shrink-0 no-print"
        aria-label="More options"
      >
        ⋯
      </button>
    </header>
  );
}
