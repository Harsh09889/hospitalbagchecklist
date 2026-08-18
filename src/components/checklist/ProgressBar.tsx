interface ProgressBarProps {
  percent: number;
  checked: number;
  total: number;
}

export function ProgressBar({ percent, checked, total }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-semibold text-ink">{percent}% Packed</span>
        <span className="text-sm text-muted">
          {checked} of {total} items
        </span>
      </div>
      <div
        className="h-3 bg-surface-card rounded-full overflow-hidden border border-hairline"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${percent}% of items packed`}
      >
        <div
          className="h-full bg-success rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
