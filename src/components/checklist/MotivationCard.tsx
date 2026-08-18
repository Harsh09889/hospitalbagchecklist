import { getMotivationSubtext, getProgressMessage } from '../../lib/progress-messaging';

interface MotivationCardProps {
  percent: number;
}

export function MotivationCard({ percent }: MotivationCardProps) {
  const title = getProgressMessage(percent);
  const subtext = getMotivationSubtext(percent);

  return (
    <div className="flex items-start gap-3 rounded-xl bg-brand-pink/15 px-4 py-3 border border-brand-pink/20">
      <span className="text-2xl shrink-0" aria-hidden="true">❤️</span>
      <div>
        <p className="font-semibold text-ink">{title}</p>
        <p className="text-sm text-muted mt-0.5">{subtext}</p>
      </div>
    </div>
  );
}
