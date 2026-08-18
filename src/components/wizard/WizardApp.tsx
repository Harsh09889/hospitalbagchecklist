import { useStore } from '@nanostores/react';
import { useState } from 'react';
import {
  wizardStep,
  wizardProfile,
  updateProfileField,
  nextStep,
  prevStep,
  resetWizard,
} from '../../stores/wizard-store';
import { initializeChecklist } from '../../stores/checklist-store';
import { WIZARD_STEPS } from './steps';
import { WizardStep, WizardProgress } from './WizardStep';
import { Button } from '../ui/Button';

interface WizardAppProps {
  onComplete?: () => void;
}

export function WizardApp({ onComplete }: WizardAppProps) {
  const currentStep = useStore(wizardStep);
  const profile = useStore(wizardProfile);
  const [error, setError] = useState('');

  const step = WIZARD_STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === WIZARD_STEPS.length - 1;

  const canProceed = () => {
    if (step.type === 'multi') {
      return (profile[step.field] as string[]).length > 0;
    }
    if (step.type === 'date') {
      return Boolean(profile.dueDate);
    }
    return Boolean(profile[step.field]);
  };

  const handleNext = () => {
    if (!canProceed()) {
      setError('Please select at least one option to continue.');
      return;
    }
    setError('');

    if (isLast) {
      initializeChecklist(profile);
      resetWizard();
      if (onComplete) {
        onComplete();
      } else {
        window.location.href = '/checklist';
      }
      return;
    }

    nextStep(WIZARD_STEPS.length);
  };

  const handleBack = () => {
    setError('');
    prevStep();
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-8">
      <WizardProgress current={currentStep} total={WIZARD_STEPS.length} />

      <WizardStep
        step={step}
        profile={profile}
        onUpdate={(field, value) => {
          setError('');
          updateProfileField(field, value);
        }}
      />

      {error && (
        <p className="text-error text-sm text-center" role="alert">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        {!isFirst && (
          <Button variant="secondary" onClick={handleBack} className="flex-1">
            Back
          </Button>
        )}
        <Button
          onClick={handleNext}
          fullWidth={isFirst}
          className={isFirst ? '' : 'flex-1'}
          disabled={!canProceed()}
        >
          {isLast ? 'Generate My Checklist' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
