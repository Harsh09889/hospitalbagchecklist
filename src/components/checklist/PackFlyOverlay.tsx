import { useLayoutEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { finishFlyingPack, flyingPack } from '../../stores/checklist-store';
import { prefersReducedMotion } from '../../lib/animations';

export function PackFlyOverlay() {
  const fly = useStore(flyingPack);
  const ghostRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!fly) return;

    const ghost = ghostRef.current;
    const target = document.getElementById('bag-hero-target');

    if (!ghost || !target) {
      finishFlyingPack();
      return;
    }

    if (prefersReducedMotion()) {
      finishFlyingPack();
      return;
    }

    const from = fly.fromRect;
    const to = target.getBoundingClientRect();
    const startX = from.left + from.width / 2;
    const startY = from.top + from.height / 2;
    const endX = to.left + to.width / 2;
    const endY = to.top + to.height / 2;
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    ghost.style.left = `${startX}px`;
    ghost.style.top = `${startY}px`;
    ghost.style.opacity = '1';
    ghost.style.transform = 'translate(-50%, -50%) scale(1)';

    let finished = false;
    const complete = () => {
      if (finished) return;
      finished = true;
      finishFlyingPack();
    };

    let animation: Animation | undefined;
    try {
      animation = ghost.animate(
        [
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
          {
            transform: `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.25)`,
            opacity: 0,
          },
        ],
        {
          duration: 550,
          easing: 'cubic-bezier(0.32, 0.72, 0, 1)',
          fill: 'forwards',
        },
      );
      animation.onfinish = complete;
    } catch {
      complete();
      return;
    }

    const fallback = window.setTimeout(complete, 650);

    return () => {
      window.clearTimeout(fallback);
      if (animation && !finished) {
        animation.cancel();
      }
    };
  }, [fly?.itemId]);

  if (!fly) return null;

  return (
    <div
      ref={ghostRef}
      className="pack-fly-ghost fixed z-[60] rounded-xl bg-brand-coral/95 text-on-coral px-3 py-2 text-sm font-semibold shadow-clay-lg max-w-[200px] truncate pointer-events-none no-print"
      aria-hidden="true"
    >
      {fly.label}
    </div>
  );
}
