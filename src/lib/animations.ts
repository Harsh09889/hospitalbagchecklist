export type AnimationTier = 'full' | 'short' | 'none';

const FULL_ANIMATION_LIMIT = 3;
const SHORT_ANIMATION_LIMIT = 15;

export function getAnimationTier(packAnimationCount: number, skipAnimation = false): AnimationTier {
  if (skipAnimation) return 'none';
  if (packAnimationCount < FULL_ANIMATION_LIMIT) return 'full';
  if (packAnimationCount < SHORT_ANIMATION_LIMIT) return 'short';
  return 'none';
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
