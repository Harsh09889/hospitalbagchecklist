export function getProgressMessage(percent: number): string {
  if (percent >= 100) return 'Your bag is ready.';
  if (percent >= 90) return 'Just a few things left.';
  if (percent >= 75) return 'Almost ready.';
  if (percent >= 50) return 'Halfway there!';
  if (percent >= 25) return "You're getting there.";
  if (percent >= 10) return 'First few things are ready.';
  return "Let's get started.";
}

export function getCompletionMessage(percent: number): string {
  if (percent >= 100) return "You're ready for the big day.";
  return getProgressMessage(percent);
}

export function getMotivationSubtext(percent: number): string {
  if (percent >= 100) return 'You are ready for the big day.';
  if (percent >= 75) return 'The finish line is in sight.';
  if (percent >= 50) return 'Every item you pack brings peace of mind.';
  if (percent >= 25) return 'Small steps add up to a ready bag.';
  if (percent >= 10) return 'Great start — keep going at your own pace.';
  return 'Start with the essentials and build from there.';
}
