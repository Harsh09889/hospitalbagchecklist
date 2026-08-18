import { useEffect, useRef, useState } from 'react';

export type SwipeDirection = 'idle' | 'pack' | 'options';

interface SwipeHandlers {
  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
  onTap?: () => void;
  disabled?: boolean;
}

const SWIPE_THRESHOLD = 60;
const DIRECTION_LOCK = 10;
const TAP_THRESHOLD = 10;

export function useSwipeActions({
  onSwipeRight,
  onSwipeLeft,
  onTap,
  disabled = false,
}: SwipeHandlers) {
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const offsetRef = useRef(0);
  const maxDeltaRef = useRef(0);
  const locked = useRef(false);
  const isHorizontal = useRef(false);
  const suppressClickRef = useRef(false);
  const activeTouch = useRef(false);
  const activePointer = useRef(false);
  const callbacksRef = useRef({ onSwipeRight, onSwipeLeft, onTap, disabled });
  const [offsetX, setOffsetX] = useState(0);
  const [direction, setDirection] = useState<SwipeDirection>('idle');
  const [isDragging, setIsDragging] = useState(false);

  callbacksRef.current = { onSwipeRight, onSwipeLeft, onTap, disabled };

  const suppressClick = () => {
    suppressClickRef.current = true;
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 400);
  };

  const resetDrag = () => {
    offsetRef.current = 0;
    maxDeltaRef.current = 0;
    locked.current = false;
    isHorizontal.current = false;
    activeTouch.current = false;
    activePointer.current = false;
    setOffsetX(0);
    setDirection('idle');
    setIsDragging(false);
  };

  const updateDrag = (clientX: number, clientY: number, preventDefault?: () => void) => {
    const deltaX = clientX - startX.current;
    const deltaY = clientY - startY.current;

    maxDeltaRef.current = Math.max(
      maxDeltaRef.current,
      Math.abs(deltaX),
      Math.abs(deltaY),
    );

    if (!locked.current) {
      if (Math.abs(deltaX) > DIRECTION_LOCK || Math.abs(deltaY) > DIRECTION_LOCK) {
        locked.current = true;
        isHorizontal.current = Math.abs(deltaX) > Math.abs(deltaY);
      }
    }

    if (!isHorizontal.current) return;

    preventDefault?.();

    const resisted = Math.abs(deltaX) > SWIPE_THRESHOLD ? deltaX * 0.6 : deltaX;
    offsetRef.current = resisted;
    setOffsetX(resisted);
    setDirection(resisted > 0 ? 'pack' : resisted < 0 ? 'options' : 'idle');
  };

  const finishDrag = () => {
    const { onSwipeRight: swipeRight, onSwipeLeft: swipeLeft, onTap: tap, disabled: isDisabled } =
      callbacksRef.current;

    if (isDisabled) {
      resetDrag();
      return;
    }

    const finalOffset = offsetRef.current;
    if (finalOffset > SWIPE_THRESHOLD) {
      suppressClick();
      swipeRight?.();
    } else if (finalOffset < -SWIPE_THRESHOLD) {
      suppressClick();
      swipeLeft?.();
    } else if (maxDeltaRef.current < TAP_THRESHOLD) {
      tap?.();
    }
    resetDrag();
  };

  const beginDrag = (clientX: number, clientY: number) => {
    startX.current = clientX;
    startY.current = clientY;
    offsetRef.current = 0;
    maxDeltaRef.current = 0;
    locked.current = false;
    isHorizontal.current = false;
    setOffsetX(0);
    setDirection('idle');
    setIsDragging(true);
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const onTouchStart = (event: TouchEvent) => {
      if (callbacksRef.current.disabled || activeTouch.current || event.touches.length !== 1) return;

      activeTouch.current = true;
      const touch = event.touches[0];
      beginDrag(touch.clientX, touch.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!activeTouch.current || event.touches.length !== 1) return;

      const touch = event.touches[0];
      updateDrag(touch.clientX, touch.clientY, () => event.preventDefault());
    };

    const onTouchEnd = () => {
      if (!activeTouch.current) return;
      finishDrag();
    };

    const onTouchCancel = () => {
      if (!activeTouch.current) return;
      resetDrag();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (
        callbacksRef.current.disabled ||
        activePointer.current ||
        event.pointerType === 'touch'
      ) {
        return;
      }

      activePointer.current = true;
      beginDrag(event.clientX, event.clientY);
      element.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!activePointer.current) return;
      updateDrag(event.clientX, event.clientY, () => event.preventDefault());
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!activePointer.current) return;
      if (element.hasPointerCapture(event.pointerId)) {
        element.releasePointerCapture(event.pointerId);
      }
      finishDrag();
    };

    const onPointerCancel = (event: PointerEvent) => {
      if (!activePointer.current) return;
      if (element.hasPointerCapture(event.pointerId)) {
        element.releasePointerCapture(event.pointerId);
      }
      resetDrag();
    };

    element.addEventListener('touchstart', onTouchStart, { passive: true });
    element.addEventListener('touchmove', onTouchMove, { passive: false });
    element.addEventListener('touchend', onTouchEnd, { passive: true });
    element.addEventListener('touchcancel', onTouchCancel, { passive: true });
    element.addEventListener('pointerdown', onPointerDown);
    element.addEventListener('pointermove', onPointerMove);
    element.addEventListener('pointerup', onPointerUp);
    element.addEventListener('pointercancel', onPointerCancel);

    return () => {
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
      element.removeEventListener('touchcancel', onTouchCancel);
      element.removeEventListener('pointerdown', onPointerDown);
      element.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('pointerup', onPointerUp);
      element.removeEventListener('pointercancel', onPointerCancel);
    };
  }, []);

  return {
    containerRef,
    offsetX,
    direction,
    isDragging,
    suppressClickRef,
  };
}
