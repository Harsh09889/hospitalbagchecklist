import { useEffect, useRef, useState } from 'react';

const DEBOUNCE_MS = 100;

export function useScrollCompact(rootMargin = '-68px 0px 0px 0px') {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isCompact, setIsCompact] = useState(false);
  const pendingRef = useRef<boolean | null>(null);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const commitCompact = (next: boolean) => {
      pendingRef.current = next;
      if (timerRef.current !== undefined) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        if (pendingRef.current !== null) {
          setIsCompact(pendingRef.current);
          pendingRef.current = null;
        }
        timerRef.current = undefined;
      }, DEBOUNCE_MS);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          commitCompact(false);
        } else if (entry.intersectionRatio === 0) {
          commitCompact(true);
        }
      },
      { rootMargin, threshold: [0, 1] },
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      if (timerRef.current !== undefined) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [rootMargin]);

  return { sentinelRef, isCompact };
}
