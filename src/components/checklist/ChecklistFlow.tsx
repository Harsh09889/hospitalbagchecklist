import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { checklistState, loadExistingChecklist } from '../../stores/checklist-store';
import { WizardApp } from '../wizard/WizardApp';
import { ChecklistApp } from './ChecklistApp';

/**
 * The generator is self-contained: it shows the wizard until a checklist exists,
 * then swaps to the checklist itself. Nothing on the content site depends on it.
 *
 * `ready` gates the first paint so the server-rendered markup matches the
 * client's first render, before localStorage has been read.
 */
export function ChecklistFlow() {
  const state = useStore(checklistState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadExistingChecklist();
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="space-y-4" aria-busy="true" aria-live="polite">
        <span className="sr-only">Loading your checklist</span>
        <div className="h-3 w-2/5 rounded-full bg-surface-card" />
        <div className="h-28 rounded-[20px] bg-surface-card" />
        <div className="h-28 rounded-[20px] bg-surface-card" />
      </div>
    );
  }

  if (!state) {
    return (
      <div>
        <div className="mb-8">
          <p className="eyebrow">Step 1 of 2</p>
          <h2 className="display-md mt-3">A few quick questions</h2>
          <p className="mt-3 text-[0.9375rem] text-muted">
            Six short questions so the checklist matches your delivery plan, your stay and who you
            are packing for.
          </p>
        </div>
        <WizardApp onComplete={() => undefined} />
      </div>
    );
  }

  return <ChecklistApp />;
}
