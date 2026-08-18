interface BagHeroStatsProps {
  remaining: number;
  packByLabel: string;
}

export function BagHeroStats({ remaining, packByLabel }: BagHeroStatsProps) {
  const isDueDatePrompt = packByLabel === 'Set due date';

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex items-center gap-2 rounded-xl bg-surface-soft px-3 py-2.5">
        <span className="text-lg shrink-0" aria-hidden="true">🧳</span>
        <p className="text-sm text-body">
          <span className="font-semibold text-ink">{remaining} items</span>
          <span className="text-muted"> to go</span>
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-xl bg-surface-soft px-3 py-2.5">
        <span className="text-lg shrink-0" aria-hidden="true">📅</span>
        <p className="text-sm text-body">
          {isDueDatePrompt ? (
            <span className="font-semibold text-ink">{packByLabel}</span>
          ) : (
            <>
              <span className="text-muted">Pack by </span>
              <span className="font-semibold text-ink">{packByLabel.replace('Pack by ', '')}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
