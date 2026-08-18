import { useState } from 'react';
import type { WizardStep as WizardStepType } from '../../data/types';
import type { UserProfile } from '../../data/types';

interface WizardStepProps {
  step: WizardStepType;
  profile: UserProfile;
  onUpdate: (field: keyof UserProfile, value: UserProfile[keyof UserProfile]) => void;
}

function getDefaultDueDateBounds() {
  const today = new Date();
  const min = new Date(today);
  min.setDate(min.getDate() - 140);
  const max = new Date(today);
  max.setDate(max.getDate() + 140);

  const toInput = (date: Date) => date.toISOString().slice(0, 10);
  return { min: toInput(min), max: toInput(max) };
}

export function WizardStep({ step, profile, onUpdate }: WizardStepProps) {
  const currentValue = profile[step.field];
  const { min, max } = getDefaultDueDateBounds();

  const isSelected = (value: string) => {
    if (step.type === 'multi') {
      return (currentValue as string[]).includes(value);
    }
    return currentValue === value;
  };

  const handleSelect = (value: string) => {
    if (step.type === 'multi') {
      const current = currentValue as string[];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      onUpdate(step.field, updated as UserProfile[typeof step.field]);
    } else {
      onUpdate(step.field, value as UserProfile[typeof step.field]);
    }
  };

  if (step.type === 'date') {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="display-sm text-ink">{step.question}</h2>
          <p className="text-muted text-base max-w-md mx-auto">{step.subtitle}</p>
        </div>

        <div className="max-w-sm mx-auto">
          <label htmlFor="due-date-input" className="sr-only">
            Due date
          </label>
          <input
            id="due-date-input"
            type="date"
            min={min}
            max={max}
            value={(currentValue as string | undefined) ?? ''}
            onChange={(event) => onUpdate(step.field, event.target.value)}
            className="field-input text-center"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="display-sm text-ink">{step.question}</h2>
        <p className="text-muted text-base max-w-md mx-auto">{step.subtitle}</p>
      </div>

      <div className="grid gap-3">
        {(step.options ?? []).map((option) => {
          const selected = isSelected(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full text-left rounded-xl p-4 sm:p-5 transition-all min-h-[72px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${
                selected
                  ? `${option.color ?? 'bg-brand-pink'} ring-2 ring-ink ring-offset-2 scale-[1.01]`
                  : 'bg-surface-card border border-hairline hover:bg-surface-soft'
              }`}
              aria-pressed={selected}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0" aria-hidden="true">
                  {option.emoji}
                </span>
                <div>
                  <div className={`font-semibold text-base ${selected && option.color?.includes('teal') ? 'text-on-dark' : selected && option.color?.includes('pink') ? 'text-on-primary' : 'text-ink'}`}>
                    {option.label}
                  </div>
                  {option.description && (
                    <div className={`text-sm mt-0.5 ${selected && (option.color?.includes('teal') || option.color?.includes('pink')) ? 'opacity-90' : 'text-muted'}`}>
                      {option.description}
                    </div>
                  )}
                </div>
                {selected && (
                  <span className="ml-auto text-lg shrink-0" aria-hidden="true">✓</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function WizardProgress({ current, total }: { current: number; total: number }) {
  const percent = ((current + 1) / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted">
        <span>Step {current + 1} of {total}</span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div
        className="h-2 bg-surface-card rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        <div
          className="h-full bg-brand-pink rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
