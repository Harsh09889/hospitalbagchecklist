import { useState } from 'react';

interface ItemTooltipProps {
  text: string;
}

export function ItemTooltip({ text }: ItemTooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-6 h-6 rounded-full bg-surface-card text-muted text-xs font-semibold flex items-center justify-center hover:bg-surface-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        aria-label="Why do I need this?"
        aria-expanded={open}
      >
        i
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-lg bg-ink text-on-primary text-sm shadow-lg"
            role="tooltip"
          >
            <p className="font-medium mb-1">Why do I need this?</p>
            <p className="opacity-90">{text}</p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-ink" />
          </div>
        </>
      )}
    </div>
  );
}
