import { atom } from 'nanostores';
import type { UserProfile } from '../data/types';

export const defaultProfile: UserProfile = {
  packingFor: [],
  deliveryType: 'unsure',
  stayDuration: '2-3days',
  season: 'summer',
  feedingPlan: 'undecided',
  hospitalType: 'public',
};

export const wizardStep = atom(0);
export const wizardProfile = atom<UserProfile>({ ...defaultProfile });

export function resetWizard() {
  wizardStep.set(0);
  wizardProfile.set({ ...defaultProfile });
}

export function updateProfileField<K extends keyof UserProfile>(
  field: K,
  value: UserProfile[K],
) {
  wizardProfile.set({ ...wizardProfile.get(), [field]: value });
}

export function nextStep(maxSteps: number) {
  const current = wizardStep.get();
  if (current < maxSteps - 1) {
    wizardStep.set(current + 1);
  }
}

export function prevStep() {
  const current = wizardStep.get();
  if (current > 0) {
    wizardStep.set(current - 1);
  }
}
